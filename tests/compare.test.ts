import { synthDef, kr } from "../src/graph/builder.ts";
import {
  SinOsc,
  Out,
  Pan2,
  EnvGen,
  LPF,
  WhiteNoise,
  LFPulse,
  In,
  Impulse,
  SendReply,
  LocalIn,
  SendPeakRMS,
  LocalBuf,
  BufRd,
  DC,
  IEnvGen,
  Demand,
  Dwrand,
  Poll,
  Dpoll,
  Dseq,
} from "../src/ugens/generated.ts";
import { asr, envForInterpolation } from "../src/ugens/envelope.ts";
import { mul } from "../src/ugens/ops.ts";

function fixturePath(name: string): URL {
  return new URL(`./fixtures/${name}.scsyndef`, import.meta.url);
}

async function readFixture(name: string): Promise<Uint8Array> {
  const path = fixturePath(name);
  return await Deno.readFile(path);
}

function assertBytesEqual(actual: Uint8Array, expected: Uint8Array, label: string): void {
  if (actual.length !== expected.length) {
    throw new Error(`${label}: length mismatch ${actual.length} != ${expected.length}`);
  }
  for (let i = 0; i < actual.length; i += 1) {
    if (actual[i] !== expected[i]) {
      throw new Error(`${label}: byte ${i} mismatch ${actual[i]} != ${expected[i]}`);
    }
  }
}

Deno.test("binary matches SuperCollider fixtures", async () => {
  const def1 = synthDef("test1", () => {
    const sig = SinOsc.ar({ freq: 440 }) as any;
    Out.ar({ bus: 0, channelsArray: mul(sig, 0.5) });
  });

  const def2 = synthDef("test2", { freq: kr(440), amp: kr(0.5) }, (p) => {
    const sig = SinOsc.ar({ freq: p.freq as any }) as any;
    Out.ar({ bus: 0, channelsArray: mul(sig, p.amp as any) });
  });

  const def3 = synthDef("test3", { freq: kr(440) }, (p) => {
    const sig = SinOsc.ar({ freq: p.freq as any }) as any;
    const pan = Pan2.ar({ in: sig as any, pos: 0 });
    Out.ar({ bus: 0, channelsArray: pan as any });
  });

  const def4 = synthDef("test4", { gate: kr(1) }, (p) => {
    const env = EnvGen.kr({ envelope: asr(), gate: p.gate as any, doneAction: 2 });
    const sig = SinOsc.ar({ freq: 440 }) as any;
    Out.ar({ bus: 0, channelsArray: mul(sig, env as any) });
  });

  const def5 = synthDef("test5", () => {
    const noise = WhiteNoise.ar({ mul: 0.2 }) as any;
    const filtered = LPF.ar({ in: noise, freq: 1000 });
    Out.ar({ bus: 0, channelsArray: filtered as any });
  });

  const def6 = synthDef("test6", { freq: kr(220) }, (p) => {
    const pulse = LFPulse.ar({ freq: p.freq as any, iphase: 0, width: 0.5 }) as any;
    Out.ar({ bus: 0, channelsArray: pulse });
  });

  const def7 = synthDef("test7", () => {
    const input = In.ar({ bus: 0, numChannels: 2 });
    Out.ar({ bus: 0, channelsArray: input as any });
  });

  const def8 = synthDef("test8", () => {
    const trig = Impulse.kr({ freq: 1 });
    SendReply.kr({ trig, cmdName: "/hello", values: [1, 2], replyID: 7 });
  });

  const def9 = synthDef("test9", () => {
    const sig = LocalIn.ar({ numChannels: 2, default: [0.1, 0.2] });
    Out.ar({ bus: 0, channelsArray: sig as any });
  });

  const def10 = synthDef("test10", () => {
    const sig = [SinOsc.ar({ freq: 440 }), SinOsc.ar({ freq: 880 })];
    SendPeakRMS.kr({ sig: sig as any, replyRate: 10, peakLag: 2, cmdName: "/peak", replyID: 5 });
  });

  const def11 = synthDef("test11", () => {
    const buf = LocalBuf.new({ numFrames: 1024, numChannels: 1 });
    const phase = DC.ar({ in: 0 });
    const sig = BufRd.ar({ numChannels: 1, bufnum: buf as any, phase: phase as any });
    Out.ar({ bus: 0, channelsArray: sig as any });
  });

  const def12 = synthDef("test12", () => {
    const env = envForInterpolation({ levels: [0, 1, 0], times: [0.01, 0.2], curves: [-4] });
    const sig = IEnvGen.kr({ envelope: env, index: 0.1, mul: 0.5, add: 0.25 });
    Out.ar({ bus: 0, channelsArray: DC.ar({ in: sig as any }) });
  });

  const def13 = synthDef("test13", () => {
    const trig = Impulse.kr({ freq: 2 });
    const seq = Dwrand.new({ list: [1, 2, 3], weights: [0.2, 0.8], repeats: 4 });
    const sig = Demand.kr({ trig, reset: 0, demandUGens: seq as any });
    Out.kr({ bus: 0, channelsArray: sig as any });
  });

  const def14 = synthDef("test14", () => {
    const trig = Impulse.kr({ freq: 1 });
    const sig = SinOsc.kr({ freq: 2 }) as any;
    Poll.kr({ trig, in: sig, label: "poll", trigid: 3 });
    Out.ar({ bus: 0, channelsArray: DC.ar({ in: sig }) });
  });

  const def15 = synthDef("test15", () => {
    const trig = Impulse.kr({ freq: 1 });
    const seq = Dseq.new({ list: [1, 2, 3], repeats: 2 });
    const polled = Dpoll.new({ in: seq as any, label: "dpoll", run: 1, trigid: 2 });
    const sig = Demand.kr({ trig, reset: 0, demandUGens: polled as any });
    Out.kr({ bus: 0, channelsArray: sig as any });
  });

  const fixtures = await Promise.all([
    readFixture("test1"),
    readFixture("test2"),
    readFixture("test3"),
    readFixture("test4"),
    readFixture("test5"),
    readFixture("test6"),
    readFixture("test7"),
    readFixture("test8"),
    readFixture("test9"),
    readFixture("test10"),
    readFixture("test11"),
    readFixture("test12"),
    readFixture("test13"),
    readFixture("test14"),
    readFixture("test15"),
  ]);

  assertBytesEqual(def1.encode(), fixtures[0], "test1");
  assertBytesEqual(def2.encode(), fixtures[1], "test2");
  assertBytesEqual(def3.encode(), fixtures[2], "test3");
  assertBytesEqual(def4.encode(), fixtures[3], "test4");
  assertBytesEqual(def5.encode(), fixtures[4], "test5");
  assertBytesEqual(def6.encode(), fixtures[5], "test6");
  assertBytesEqual(def7.encode(), fixtures[6], "test7");
  assertBytesEqual(def8.encode(), fixtures[7], "test8");
  assertBytesEqual(def9.encode(), fixtures[8], "test9");
  assertBytesEqual(def10.encode(), fixtures[9], "test10");
  assertBytesEqual(def11.encode(), fixtures[10], "test11");
  assertBytesEqual(def12.encode(), fixtures[11], "test12");
  assertBytesEqual(def13.encode(), fixtures[12], "test13");
  assertBytesEqual(def14.encode(), fixtures[13], "test14");
  assertBytesEqual(def15.encode(), fixtures[14], "test15");
});
