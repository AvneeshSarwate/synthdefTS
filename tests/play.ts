/**
 * Live playback tests for synthdefTS.
 *
 * Assumes scsynth is already running on UDP port 57110 (the default).
 * Start it with:
 *   scsynth -u 57110
 *
 * Run this file with:
 *   deno task play
 */

import { Buffer } from "node:buffer";
import { Client, Message } from "node-osc";
import {
  synthDef,
  kr,
  tr,
  SynthDef,
} from "../src/graph/builder.ts";
import {
  SinOsc,
  Out,
  Pan2,
  EnvGen,
  LPF,
  WhiteNoise,
  Saw,
  FreeVerb,
  CombC,
  LFNoise1,
  Dust,
  RLPF,
  Line,
  Impulse,
  Blip,
  Pulse,
  LFSaw,
} from "../src/ugens/generated.ts";
import { mul, add, midicps } from "../src/ugens/ops.ts";
import { adsr, perc, asr, env } from "../src/ugens/envelope.ts";
import type { UGenInput, UGenOutput } from "../src/graph/types.ts";

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
  // Give scsynth a moment to compile
  await sleep(50);
}

/** Create a synth on the server.  Controls are key-value pairs. */
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

/** Set controls on an existing synth. */
function setNode(nodeId: number, controls: Record<string, number>): void {
  const args: (string | number)[] = [nodeId];
  for (const [k, v] of Object.entries(controls)) {
    args.push(k, v);
  }
  client.send("/n_set", ...args);
}

/** Free a synth node. */
function freeNode(nodeId: number): void {
  client.send("/n_free", nodeId);
}

let nextNodeId = 2000;
function allocNodeId(): number {
  return nextNodeId++;
}

// ---------------------------------------------------------------------------
// SynthDef definitions
// ---------------------------------------------------------------------------

/** 1. Simple sine — fixed frequency, self-freeing via perc envelope */
const simpleSineDef = synthDef(
  "ts_simpleSine",
  { freq: kr(440), amp: kr(0.3) },
  (p) => {
    const env = EnvGen.kr({
      envelope: perc({ attack: 0.01, release: 0.5 }),
      doneAction: 2,
    });
    const sig = SinOsc.ar({ freq: p.freq as UGenInput }) as UGenOutput;
    Out.ar({ bus: 0, channelsArray: mul(mul(sig, env as UGenInput), p.amp as UGenInput) });
  },
);

/** 2. Gate-controlled pad — sustains until gate goes to 0 */
const padDef = synthDef(
  "ts_pad",
  { freq: kr(220), amp: kr(0.15), gate: kr(1) },
  (p) => {
    const env = EnvGen.kr({
      envelope: adsr({ attack: 0.3, decay: 0.2, sustain: 0.7, release: 1.0 }),
      gate: p.gate as UGenInput,
      doneAction: 2,
    });
    const sig = Saw.ar({ freq: p.freq as UGenInput, mul: p.amp as UGenInput }) as UGenOutput;
    const filt = LPF.ar({ in: sig as UGenInput, freq: 1500 }) as UGenOutput;
    const wet = FreeVerb.ar({ in: filt as UGenInput, mix: 0.35, room: 0.6 }) as UGenOutput;
    Out.ar({ bus: 0, channelsArray: mul(wet, env as UGenInput) });
  },
);

/** 3. Filtered noise blip — self-freeing */
const noiseDef = synthDef(
  "ts_noiseBlip",
  { freq: kr(1000), amp: kr(0.2) },
  (p) => {
    const env = EnvGen.kr({
      envelope: perc({ attack: 0.005, release: 0.3 }),
      doneAction: 2,
    });
    const noise = WhiteNoise.ar({}) as UGenOutput;
    const filt = RLPF.ar({
      in: noise as UGenInput,
      freq: p.freq as UGenInput,
      rq: 0.1,
    }) as UGenOutput;
    Out.ar({ bus: 0, channelsArray: mul(mul(filt, env as UGenInput), p.amp as UGenInput) });
  },
);

/** 4. Panned sine — demonstrates Pan2 and parameter ramping */
const pannedSineDef = synthDef(
  "ts_pannedSine",
  { freq: kr(440), amp: kr(0.25), pan: kr(0), gate: kr(1) },
  (p) => {
    const env = EnvGen.kr({
      envelope: asr({ attack: 0.01, release: 0.3 }),
      gate: p.gate as UGenInput,
      doneAction: 2,
    });
    const sig = SinOsc.ar({ freq: p.freq as UGenInput }) as UGenOutput;
    const panned = Pan2.ar({
      in: mul(sig, mul(p.amp as UGenInput, env as UGenInput)) as UGenInput,
      pos: p.pan as UGenInput,
    }) as UGenOutput[];
    Out.ar({ bus: 0, channelsArray: panned as UGenInput[] });
  },
);

/** 5. Comb delay feedback texture — self-freeing via Line */
const combTextureDef = synthDef(
  "ts_combTexture",
  { amp: kr(0.2) },
  (p) => {
    const envLine = Line.kr({ start: 1, end: 0, dur: 4, doneAction: 2 }) as UGenOutput;
    const dust = Dust.ar({ density: 3 }) as UGenOutput;
    const noise = mul(dust, 0.5) as UGenOutput;
    const comb = CombC.ar({
      in: noise as UGenInput,
      maxdelaytime: 0.2,
      delaytime: 0.1,
      decaytime: 3.0,
    }) as UGenOutput;
    Out.ar({
      bus: 0,
      channelsArray: mul(mul(comb, envLine as UGenInput), p.amp as UGenInput),
    });
  },
);

// ---------------------------------------------------------------------------
// Test scenarios
// ---------------------------------------------------------------------------

async function test1_simpleMelody() {
  console.log("--- Test 1: Simple sine melody ---");
  await sendDef(simpleSineDef);

  // Play a short ascending scale: C4 D4 E4 F4 G4
  const notes = [60, 62, 64, 65, 67];
  for (const midi of notes) {
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const id = allocNodeId();
    newSynth("ts_simpleSine", id, { freq, amp: 0.3 });
    await sleep(300);
  }
  // Notes self-free via perc envelope
  await sleep(600);
}

async function test2_gatedPad() {
  console.log("--- Test 2: Gate-controlled pad with note off ---");
  await sendDef(padDef);

  const id = allocNodeId();
  // Note on
  newSynth("ts_pad", id, { freq: 220, amp: 0.15, gate: 1 });
  console.log("  pad note ON  (node %d)", id);
  await sleep(2000);

  // Note off — set gate to 0 triggers release portion of ADSR
  setNode(id, { gate: 0 });
  console.log("  pad note OFF (node %d)", id);
  await sleep(1500); // wait for release tail
}

async function test3_noiseRhythm() {
  console.log("--- Test 3: Rhythmic noise blips ---");
  await sendDef(noiseDef);

  // Trigger noise blips at varying filter frequencies
  const freqs = [2000, 4000, 800, 3000, 1500, 5000, 1000, 6000];
  for (const freq of freqs) {
    const id = allocNodeId();
    newSynth("ts_noiseBlip", id, { freq, amp: 0.2 });
    await sleep(150);
  }
  await sleep(500);
}

async function test4_parameterRamp() {
  console.log("--- Test 4: Panned sine with JS-side parameter ramping ---");
  await sendDef(pannedSineDef);

  const id = allocNodeId();
  newSynth("ts_pannedSine", id, { freq: 440, amp: 0.25, pan: -1, gate: 1 });

  // Ramp pan from left (-1) to right (+1) over ~2 seconds
  const steps = 200;
  const intervalMs = 10;
  let step = 0;
  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      const pan = -1 + (2 * step) / steps;
      const freq = 440 + 220 * Math.sin((step / steps) * Math.PI * 4);
      setNode(id, { pan, freq });
      step++;
      if (step > steps) {
        clearInterval(interval);
        resolve();
      }
    }, intervalMs);
  });

  // Release
  setNode(id, { gate: 0 });
  await sleep(500);
}

async function test5_combTexture() {
  console.log("--- Test 5: Comb delay dust texture (self-freeing) ---");
  await sendDef(combTextureDef);

  const id = allocNodeId();
  newSynth("ts_combTexture", id, { amp: 0.2 });
  // This synth self-frees after 4 seconds via Line doneAction
  await sleep(4500);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("synthdefTS live playback tests");
  console.log("Sending to scsynth at %s:%d\n", SC_HOST, SC_PORT);

  try {
    await test1_simpleMelody();
    await test2_gatedPad();
    await test3_noiseRhythm();
    await test4_parameterRamp();
    await test5_combTexture();

    console.log("\nAll tests completed.");
  } finally {
    client.close();
  }
}

main();
