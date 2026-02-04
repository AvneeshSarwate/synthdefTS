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
  Pan2,
} from "../src/ugens/generated.ts";
import { mul, add, midicps } from "../src/ugens/ops.ts";
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
    detune: kr(0), // detune in Hz (added to freq)
    amp: kr(0.3),
    pan: kr(0),
    // Amplitude envelope params
    attack: kr(0.005),
    release: kr(0.1),
    curve: kr(-4), // envelope curve: negative=plucky, positive=soft, 0=linear
    // Filter params
    filterFreq: kr(2000),
    filterRes: kr(0.3),
    // Filter envelope params
    filterAttack: kr(0.005),
    filterRelease: kr(0.15),
    filterEnvAmt: kr(2000),
  },
  (p) => {
    // Build envelope arrays manually to allow dynamic parameters
    // Perc envelope format: [startLevel, numSegments, releaseNode, loopNode,
    //                        level1, time1, curveType, curveValue, ...]
    // curveType 5 = numeric curve, curveValue controls shape
    const ampEnvArray = [0, 2, -99, -99, 1, p.attack, 5, p.curve, 0, p.release, 5, p.curve];
    const filterEnvArray = [0, 2, -99, -99, 1, p.filterAttack, 5, p.curve, 0, p.filterRelease, 5, p.curve];

    // Amplitude envelope - percussive, self-freeing
    const ampEnv = EnvGen.kr({
      envelope: ampEnvArray as number[],
      doneAction: 2,
    });

    // Filter envelope - separate percussive shape for filter cutoff modulation
    const filterEnv = EnvGen.kr({
      envelope: filterEnvArray as number[],
    });

    // Calculate filter frequency: base + envelope * amount
    const modulatedFilterFreq = add(p.filterFreq, mul(filterEnv, p.filterEnvAmt));

    // Apply detune to frequency
    const detunedFreq = add(p.freq, p.detune);

    // Sawtooth oscillator
    const osc = Saw.ar({ freq: detunedFreq });

    // Resonant low pass filter
    const filtered = RLPF.ar({
      in: osc,
      freq: modulatedFilterFreq,
      rq: p.filterRes,
    });

    // Apply amplitude envelope and pan to stereo
    const sig = mul(mul(filtered, ampEnv), p.amp);
    const panned = Pan2.ar({ in: sig, pos: p.pan });
    Out.ar({ bus: 0, channelsArray: panned });
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
// Sigmoid helper for smooth chord transitions
// ---------------------------------------------------------------------------

/**
 * Logistic sigmoid for probability shaping.
 * @param x - input value (0 to 1 for progress)
 * @param steepness - controls transition sharpness:
 *   - 0: flat at 0.5 (no transition)
 *   - 1-5: gradual transition
 *   - 10: moderate transition
 *   - 20+: sharp/abrupt transition
 * @param center - where the transition happens (default 0.5 = middle)
 * @returns value from ~1 (at x=0) to ~0 (at x=1)
 */
function sigmoidProb(x: number, steepness: number, center = 0.5): number {
  return 1 / (1 + Math.exp(steepness * (x - center)));
}

// ---------------------------------------------------------------------------
// Main grain loop test
// ---------------------------------------------------------------------------

async function runGrainChordLerp() {
  console.log("Grain Chord Lerp test");
  console.log("Sending synthdef to scsynth at %s:%d\n", SC_HOST, SC_PORT);

  await sendDef(filteredSawDef);

  const totalDurationSec = 10;
  const noteIntervalMs = 20;
  const noteIntervalSec = noteIntervalMs / 1000;
  const totalNotes = Math.floor((totalDurationSec * 1000) / noteIntervalMs);

  // Transition sharpness: higher = sharper transition between chords
  // Try values: 5 (gradual), 10 (moderate), 20 (sharp), 50 (very abrupt)
  const transitionSteepness = 10;

  console.log(`Playing ${totalNotes} notes over ${totalDurationSec} seconds`);
  console.log("Chord A: [60, 64, 67] (C major)");
  console.log("Chord B: [63, 66, 69] (Eb minor)");
  console.log(`Transition steepness: ${transitionSteepness}`);
  console.log("Probability shifts from Chord A to Chord B over time\n");

  // Track notes played from each chord
  let chordACount = 0;
  let chordBCount = 0;

  await launch(
    async (ctx: DateTimeContext) => {
      for (let i = 0; i < totalNotes; i++) {
        // Calculate probability of choosing chord A using sigmoid
        // Starts near 1, transitions to near 0, with tunable sharpness
        const progress = i / (totalNotes - 1);
        const probChordA = sigmoidProb(progress, transitionSteepness);

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

        const detune = (ctx.random() * 2 - 1) * 0.1; // -10 to 10 cents

        const freq = midiToFreq(midiNote + detune);

        // Random synth parameters
        const amp = 0.15 + ctx.random() * 0.15; // 0.15 - 0.30
        
        const pan = ctx.random() * 2 - 1; // -1 to 1 (left to right)
        const attack = 0.05 + ctx.random() * 0.2; // 0.05 - 0.25 sec
        const release = 0.05 + ctx.random() * 4.25; // 0.05 - 1.30 sec (note duration)
        const curve = 1; // -8 to -2 (plucky to less plucky)
        const filterFreq = 500 + ctx.random() * 2000; // 500 - 2500 Hz
        const filterRes = 0.1 + ctx.random() * 0.4; // 0.1 - 0.5 (rq)
        const filterAttack = 0.001 + ctx.random() * 0.1; // 0.001 - 0.101 sec
        const filterRelease = 0.03 + ctx.random() * 0.75; // 0.03 - 0.78 sec
        const filterEnvAmt = 1000 + ctx.random() * 3000; // 1000 - 4000 Hz

        // Play the note
        const nodeId = allocNodeId();
        newSynth("ts_filteredSaw", nodeId, {
          freq,
          detune,
          amp,
          pan,
          attack,
          release,
          curve,
          filterFreq,
          filterRes,
          filterAttack,
          filterRelease,
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
