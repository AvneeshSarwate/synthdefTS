/**
 * Grain Chord Lerp - tests synth def creation and timed playback
 *
 * Creates a simple synth with:
 * - Sawtooth oscillator
 * - Amplitude envelope
 * - Resonant low pass filter
 * - Filter envelope
 *
 * Playback runs in realtime, firing notes every 50ms for 10 seconds.
 * Two chords: A [60, 64, 67] and B [63, 66, 69]
 * Probability of picking from chord A vs B transitions from 1 to 0.
 *
 * Assumes scsynth is already running on UDP port 57110.
 * Run with: deno task grainChordLerp
 */

import { Buffer } from "node:buffer";
import { Client, Message } from "node-osc";
import {
  synthDef,
  kr,
  SynthDef,
} from "../src/graph/builder.ts";
import {
  Saw,
  Out,
  EnvGen,
  RLPF,
} from "../src/ugens/generated.ts";
import { mul, add, midicps } from "../src/ugens/ops.ts";
import { perc, env } from "../src/ugens/envelope.ts";
import { launch, type DateTimeContext } from "../src/tools/offline_time_context.ts";

// ---------------------------------------------------------------------------
// OSC helpers
// ---------------------------------------------------------------------------

const SC_PORT = 57110;
const SC_HOST = "127.0.0.1";

const client = new Client(SC_HOST, SC_PORT);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Send a compiled SynthDef to scsynth via /d_recv */
async function sendDef(def: SynthDef): Promise<void> {
  const binary = def.encode();
  const buf = Buffer.from(binary);
  const msg = new Message("/d_recv", buf);
  await client.send(msg);
  await sleep(50);
}

/** Create a synth on the server. Controls are key-value pairs. */
function newSynth(
  defName: string,
  nodeId: number,
  controls: Record<string, number> = {},
  addAction = 1,
  target = 1,
): void {
  const args: (string | number)[] = [defName, nodeId, addAction, target];
  for (const [k, v] of Object.entries(controls)) {
    args.push(k, v);
  }
  client.send("/s_new", ...args);
}

let nextNodeId = 3000;
function allocNodeId(): number {
  return nextNodeId++;
}

// ---------------------------------------------------------------------------
// SynthDef: Filtered Saw with amplitude and filter envelopes
// ---------------------------------------------------------------------------

const filteredSawDef = synthDef(
  "ts_filteredSaw",
  {
    freq: kr(440),
    amp: kr(0.3),
    // Amplitude envelope params
    attack: kr(0.005),
    release: kr(0.1),
    // Filter params
    filterFreq: kr(2000),
    filterRes: kr(0.3),
    // Filter envelope params
    filterAttack: kr(0.005),
    filterRelease: kr(0.15),
    filterEnvAmt: kr(2000),
  },
  (p) => {
    // Amplitude envelope - percussive, self-freeing
    const ampEnv = EnvGen.kr({
      envelope: perc({ attack: 0.005, release: 0.1 }),
      doneAction: 2,
    });

    // Filter envelope - separate percussive shape for filter cutoff modulation
    const filterEnv = EnvGen.kr({
      envelope: perc({ attack: 0.005, release: 0.15 }),
    });

    // Calculate filter frequency: base + envelope * amount
    const modulatedFilterFreq = add(p.filterFreq, mul(filterEnv, p.filterEnvAmt));

    // Sawtooth oscillator
    const osc = Saw.ar({ freq: p.freq });

    // Resonant low pass filter
    const filtered = RLPF.ar({
      in: osc,
      freq: modulatedFilterFreq,
      rq: p.filterRes,
    });

    // Apply amplitude envelope and output
    Out.ar({ bus: 0, channelsArray: mul(mul(filtered, ampEnv), p.amp) });
  },
);

// ---------------------------------------------------------------------------
// Chord definitions (MIDI notes)
// ---------------------------------------------------------------------------

const chordA = [60, 64, 67]; // C major
const chordB = [63, 66, 69]; // Eb minor (D#m)

// ---------------------------------------------------------------------------
// Helper: MIDI to frequency
// ---------------------------------------------------------------------------

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// ---------------------------------------------------------------------------
// Main grain loop test
// ---------------------------------------------------------------------------

async function runGrainChordLerp() {
  console.log("Grain Chord Lerp test");
  console.log("Sending synthdef to scsynth at %s:%d\n", SC_HOST, SC_PORT);

  await sendDef(filteredSawDef);

  const totalDurationSec = 10;
  const noteIntervalMs = 10;
  const noteIntervalSec = noteIntervalMs / 1000;
  const totalNotes = Math.floor((totalDurationSec * 1000) / noteIntervalMs);

  console.log(`Playing ${totalNotes} notes over ${totalDurationSec} seconds`);
  console.log("Chord A: [60, 64, 67] (C major)");
  console.log("Chord B: [63, 66, 69] (Eb minor)");
  console.log("Probability shifts from Chord A to Chord B over time\n");

  // Track notes played from each chord
  let chordACount = 0;
  let chordBCount = 0;

  await launch(
    async (ctx: DateTimeContext) => {
      for (let i = 0; i < totalNotes; i++) {
        // Calculate probability of choosing chord A (starts at 1, ends at 0)
        const progress = i / (totalNotes - 1);
        const probChordA = 1 - progress;

        // Pick chord based on probability
        const useChordA = ctx.random() < probChordA;
        const chord = useChordA ? chordA : chordB;

        if (useChordA) {
          chordACount++;
        } else {
          chordBCount++;
        }

        // Pick random note from selected chord
        const noteIndex = Math.floor(ctx.random() * chord.length);
        const midiNote = chord[noteIndex];
        const freq = midiToFreq(midiNote);

        // Random synth parameters
        const amp = 0.15 + ctx.random() * 0.15; // 0.15 - 0.30
        const release = 0.05 + ctx.random() * 0.15; // 0.05 - 0.20
        const filterFreq = 500 + ctx.random() * 2000; // 500 - 2500 Hz
        const filterRes = 0.1 + ctx.random() * 0.4; // 0.1 - 0.5 (rq)
        const filterEnvAmt = 1000 + ctx.random() * 3000; // 1000 - 4000 Hz

        // Play the note
        const nodeId = allocNodeId();
        newSynth("ts_filteredSaw", nodeId, {
          freq,
          amp,
          release,
          filterFreq,
          filterRes,
          filterEnvAmt,
        });

        // Wait for next note
        await ctx.waitSec(noteIntervalSec);
      }
    },
    {
      bpm: 120,
      seed: "grainChordLerp",
    }
  );

  // Wait for final notes to finish their envelopes
  await sleep(500);

  console.log("\nPlayback complete!");
  console.log(`Notes from Chord A: ${chordACount}`);
  console.log(`Notes from Chord B: ${chordBCount}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  try {
    await runGrainChordLerp();
  } finally {
    client.close();
  }
}

main();
