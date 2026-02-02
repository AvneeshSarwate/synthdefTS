import { Rate, UGenInput, UGenOutput } from "../graph/types.ts";
import { multiNew, newUGen } from "./core.ts";
import { applyMulAdd } from "./ops.ts";
import { getActiveBuilder } from "../graph/context.ts";

export const A2K = {
  kr(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("A2K", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const AccelerometerX = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("AccelerometerX", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const AccelerometerY = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("AccelerometerY", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const AccelerometerZ = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("AccelerometerZ", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const AllpassC = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("AllpassC", Rate.Audio, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("AllpassC", Rate.Control, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const AllpassL = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("AllpassL", Rate.Audio, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("AllpassL", Rate.Control, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const AllpassN = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("AllpassN", Rate.Audio, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("AllpassN", Rate.Control, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const AmpComp = {
  ar(params: { freq: UGenInput | UGenInput[]; root: UGenInput | UGenInput[]; exp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { freq, root, exp = 0.3333 } = params;
    return multiNew("AmpComp", Rate.Audio, [freq, root, exp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq: UGenInput | UGenInput[]; root: UGenInput | UGenInput[]; exp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { freq, root, exp = 0.3333 } = params;
    return multiNew("AmpComp", Rate.Control, [freq, root, exp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  ir(params: { freq: UGenInput | UGenInput[]; root: UGenInput | UGenInput[]; exp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { freq, root, exp = 0.3333 } = params;
    return multiNew("AmpComp", Rate.Scalar, [freq, root, exp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const AmpCompA = {
  ar(params: { freq?: UGenInput | UGenInput[]; root?: UGenInput | UGenInput[]; minAmp?: UGenInput | UGenInput[]; rootAmp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 1000, root = 0, minAmp = 0.32, rootAmp = 1 } = params;
    return multiNew("AmpCompA", Rate.Audio, [freq, root, minAmp, rootAmp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; root?: UGenInput | UGenInput[]; minAmp?: UGenInput | UGenInput[]; rootAmp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 1000, root = 0, minAmp = 0.32, rootAmp = 1 } = params;
    return multiNew("AmpCompA", Rate.Control, [freq, root, minAmp, rootAmp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  ir(params: { freq?: UGenInput | UGenInput[]; root?: UGenInput | UGenInput[]; minAmp?: UGenInput | UGenInput[]; rootAmp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 1000, root = 0, minAmp = 0.32, rootAmp = 1 } = params;
    return multiNew("AmpCompA", Rate.Scalar, [freq, root, minAmp, rootAmp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const Amplitude = {
  ar(params: { "in"?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; releaseTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, attackTime = 0.01, releaseTime = 0.01, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Amplitude", Rate.Audio, [in_, attackTime, releaseTime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; releaseTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, attackTime = 0.01, releaseTime = 0.01, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Amplitude", Rate.Control, [in_, attackTime, releaseTime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const AnalogIn = {
  ar(params: { analogPin?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { analogPin = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("AnalogIn", Rate.Audio, [analogPin], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { analogPin?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { analogPin = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("AnalogIn", Rate.Control, [analogPin], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const AnalogOut = {
  ar(params: { analogPin?: UGenInput | UGenInput[]; output?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): void {
    const { analogPin = 0, output = 0, mul = 1, add = 0 } = params;
    multiNew("AnalogOut", Rate.Audio, [analogPin, output], 0, [0, 1]);
  },
  kr(params: { analogPin?: UGenInput | UGenInput[]; output?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): void {
    const { analogPin = 0, output = 0, mul = 1, add = 0 } = params;
    multiNew("AnalogOut", Rate.Control, [analogPin, output], 0, [0, 1]);
  },
};

export const APF = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, radius = 0.8, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("APF", Rate.Audio, [in_, freq, radius], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, radius = 0.8, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("APF", Rate.Control, [in_, freq, radius], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Balance2 = {
  ar(params: { left: UGenInput | UGenInput[]; right: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { left, right, pos = 0, level = 1 } = params;
    return multiNew("Balance2", Rate.Audio, [left, right, pos, level], 2, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { left: UGenInput | UGenInput[]; right: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { left, right, pos = 0, level = 1 } = params;
    return multiNew("Balance2", Rate.Control, [left, right, pos, level], 2, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
};

export const Ball = {
  ar(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, g = 1, damp = 0, friction = 0.01 } = params;
    return multiNew("Ball", Rate.Audio, [in_, g, damp, friction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, g = 1, damp = 0, friction = 0.01 } = params;
    return multiNew("Ball", Rate.Control, [in_, g, damp, friction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const BAllPass = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BAllPass", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BBandPass = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bw?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, bw = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BBandPass", Rate.Audio, [in_, freq, bw], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BBandStop = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bw?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, bw = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BBandStop", Rate.Audio, [in_, freq, bw], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BeatTrack = {
  kr(params: { chain: UGenInput | UGenInput[]; lock?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, lock = 0 } = params;
    return multiNew("BeatTrack", Rate.Control, [chain, lock], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const BeatTrack2 = {
  kr(params: { busindex: UGenInput | UGenInput[]; numfeatures: UGenInput | UGenInput[]; windowsize?: UGenInput | UGenInput[]; phaseaccuracy?: UGenInput | UGenInput[]; lock?: UGenInput | UGenInput[]; weightingscheme: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { busindex, numfeatures, windowsize = 2, phaseaccuracy = 0.02, lock = 0, weightingscheme } = params;
    return multiNew("BeatTrack2", Rate.Control, [busindex, numfeatures, windowsize, phaseaccuracy, lock, weightingscheme], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
};

export const BelaScopeOut = {
  ar(params: { offset?: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { offset = 0, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [offset, ...channelsArrayList];
    newUGen("BelaScopeOut", Rate.Audio, inputs as UGenInput[], 0);
  },
};

export const BHiPass = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BHiPass", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BHiShelf = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rs?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rs = 1, db = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BHiShelf", Rate.Audio, [in_, freq, rs, db], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BiPanB2 = {
  ar(params: { inA: UGenInput | UGenInput[]; inB: UGenInput | UGenInput[]; azimuth: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { inA, inB, azimuth, gain = 1 } = params;
    return multiNew("BiPanB2", Rate.Audio, [inA, inB, azimuth, gain], 3, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { inA: UGenInput | UGenInput[]; inB: UGenInput | UGenInput[]; azimuth: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { inA, inB, azimuth, gain = 1 } = params;
    return multiNew("BiPanB2", Rate.Control, [inA, inB, azimuth, gain], 3, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
};

export const Blip = {
  ar(params: { freq?: UGenInput | UGenInput[]; numharm?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, numharm = 200, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Blip", Rate.Audio, [freq, numharm], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; numharm?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, numharm = 200, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Blip", Rate.Control, [freq, numharm], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BlockSize = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("BlockSize", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const BLowPass = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BLowPass", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BLowShelf = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rs?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rs = 1, db = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BLowShelf", Rate.Audio, [in_, freq, rs, db], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BPeakEQ = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rq = 1, db = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BPeakEQ", Rate.Audio, [in_, freq, rq, db], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BPF = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BPF", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BPF", Rate.Control, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BPZ2 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BPZ2", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BPZ2", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BRF = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BRF", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BRF", Rate.Control, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BrownNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BrownNoise", Rate.Audio, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BrownNoise", Rate.Control, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BRZ2 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BRZ2", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BRZ2", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufAllpassC = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufAllpassC", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufAllpassL = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufAllpassL", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufAllpassN = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufAllpassN", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufChannels = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufChannels", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufChannels", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const BufCombC = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufCombC", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufCombL = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufCombL", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufCombN = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufCombN", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufDelayC = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufDelayC", Rate.Audio, [buf, in_, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufDelayC", Rate.Control, [buf, in_, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufDelayL = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufDelayL", Rate.Audio, [buf, in_, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufDelayL", Rate.Control, [buf, in_, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufDelayN = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufDelayN", Rate.Audio, [buf, in_, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufDelayN", Rate.Control, [buf, in_, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const BufDur = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufDur", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufDur", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const BufFrames = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufFrames", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufFrames", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const BufInfoUGenBase = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufInfoUGenBase", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufInfoUGenBase", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const BufRateScale = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufRateScale", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufRateScale", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const BufRd = {
  ar(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; interpolation?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum = 0, phase = 0, loop = 1, interpolation = 2 } = params;
    return multiNew("BufRd", Rate.Audio, [bufnum, phase, loop, interpolation], numChannels, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; interpolation?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum = 0, phase = 0, loop = 1, interpolation = 2 } = params;
    return multiNew("BufRd", Rate.Control, [bufnum, phase, loop, interpolation], numChannels, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
};

export const BufSampleRate = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufSampleRate", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufSampleRate", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const BufSamples = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufSamples", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufSamples", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const BufWr = {
  ar(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inputArray, bufnum = 0, phase = 0, loop = 1 } = params;
    const inputArrayList = Array.isArray(inputArray) ? inputArray : [inputArray];
    const inputs: (UGenInput | UGenInput[])[] = [bufnum, phase, loop, ...inputArrayList];
    return multiNew("BufWr", Rate.Audio, inputs, 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inputArray, bufnum = 0, phase = 0, loop = 1 } = params;
    const inputArrayList = Array.isArray(inputArray) ? inputArray : [inputArray];
    const inputs: (UGenInput | UGenInput[])[] = [bufnum, phase, loop, ...inputArrayList];
    return multiNew("BufWr", Rate.Control, inputs, 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Changed = {
  ar(params: { input: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { input, threshold = 0 } = params;
    return multiNew("Changed", Rate.Audio, [input, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { input: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { input, threshold = 0 } = params;
    return multiNew("Changed", Rate.Control, [input, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const CheckBadValues = {
  ar(params: { "in"?: UGenInput | UGenInput[]; id?: UGenInput | UGenInput[]; post?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, id = 0, post = 2 } = params;
    return multiNew("CheckBadValues", Rate.Audio, [in_, id, post], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; id?: UGenInput | UGenInput[]; post?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, id = 0, post = 2 } = params;
    return multiNew("CheckBadValues", Rate.Control, [in_, id, post], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const ClearBuf = {
  new(params: { buf: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buf } = params;
    return multiNew("ClearBuf", Rate.Scalar, [buf], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Clip = {
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, lo = 0, hi = 1 } = params;
    return multiNew("Clip", Rate.Audio, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("Clip", Rate.Control, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("Clip", Rate.Scalar, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const ClipNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("ClipNoise", Rate.Audio, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("ClipNoise", Rate.Control, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const CoinGate = {
  ar(params: { prob: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { prob, in: in_ } = params;
    return multiNew("CoinGate", Rate.Audio, [prob, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { prob: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { prob, in: in_ } = params;
    return multiNew("CoinGate", Rate.Control, [prob, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const CombC = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CombC", Rate.Audio, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CombC", Rate.Control, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const CombL = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CombL", Rate.Audio, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CombL", Rate.Control, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const CombN = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CombN", Rate.Audio, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CombN", Rate.Control, [in_, maxdelaytime, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Compander = {
  ar(params: { "in"?: UGenInput | UGenInput[]; control?: UGenInput | UGenInput[]; thresh?: UGenInput | UGenInput[]; slopeBelow?: UGenInput | UGenInput[]; slopeAbove?: UGenInput | UGenInput[]; clampTime?: UGenInput | UGenInput[]; relaxTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, control = 0, thresh = 0.5, slopeBelow = 1, slopeAbove = 1, clampTime = 0.01, relaxTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Compander", Rate.Audio, [in_, control, thresh, slopeBelow, slopeAbove, clampTime, relaxTime], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const CompanderD = {
  ar(params: { "in"?: UGenInput | UGenInput[]; thresh?: UGenInput | UGenInput[]; slopeBelow?: UGenInput | UGenInput[]; slopeAbove?: UGenInput | UGenInput[]; clampTime?: UGenInput | UGenInput[]; relaxTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, thresh = 0.5, slopeBelow = 1, slopeAbove = 1, clampTime = 0.01, relaxTime = 0.01, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CompanderD", Rate.Audio, [in_, thresh, slopeBelow, slopeAbove, clampTime, relaxTime], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const ControlDur = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("ControlDur", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const ControlRate = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("ControlRate", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const Convolution = {
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, kernel, framesize = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Convolution", Rate.Audio, [in_, kernel, framesize], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Convolution2 = {
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, kernel, trigger = 0, framesize = 2048, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Convolution2", Rate.Audio, [in_, kernel, trigger, framesize], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Convolution2L = {
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; crossfade?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, kernel, trigger = 0, framesize = 2048, crossfade = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Convolution2L", Rate.Audio, [in_, kernel, trigger, framesize, crossfade], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Convolution3 = {
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, kernel, trigger = 0, framesize = 2048, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Convolution3", Rate.Audio, [in_, kernel, trigger, framesize], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, kernel, trigger = 0, framesize = 2048, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Convolution3", Rate.Control, [in_, kernel, trigger, framesize], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const COsc = {
  ar(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; beats?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, freq = 440, beats = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("COsc", Rate.Audio, [bufnum, freq, beats], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; beats?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, freq = 440, beats = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("COsc", Rate.Control, [bufnum, freq, beats], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Crackle = {
  ar(params: { chaosParam?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { chaosParam = 1.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Crackle", Rate.Audio, [chaosParam], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { chaosParam?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { chaosParam = 1.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Crackle", Rate.Control, [chaosParam], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const CuspL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 1.9, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CuspL", Rate.Audio, [freq, a, b, xi], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const CuspN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 1.9, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CuspN", Rate.Audio, [freq, a, b, xi], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Dbrown = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, step = 0.01, length = Infinity } = params;
    return multiNew("Dbrown", Rate.Demand, [lo, hi, step, length], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const Dbufrd = {
  new(params: { bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { bufnum = 0, phase = 0, loop = 1 } = params;
    return multiNew("Dbufrd", Rate.Demand, [bufnum, phase, loop], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Dbufwr = {
  new(params: { input?: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { input = 0, bufnum = 0, phase = 0, loop = 1 } = params;
    return multiNew("Dbufwr", Rate.Demand, [input, bufnum, phase, loop], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const DC = {
  ar(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("DC", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("DC", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dconst = {
  new(params: { sum: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; tolerance?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { sum, in: in_, tolerance = 0.001 } = params;
    return multiNew("Dconst", Rate.Demand, [sum, in_, tolerance], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Ddup = {
  new(params: { n: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { n, in: in_ } = params;
    return multiNew("Ddup", Rate.Demand, [n, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Decay = {
  ar(params: { "in"?: UGenInput | UGenInput[]; decayTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, decayTime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Decay", Rate.Audio, [in_, decayTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; decayTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, decayTime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Decay", Rate.Control, [in_, decayTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Decay2 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; decayTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, attackTime = 0.01, decayTime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Decay2", Rate.Audio, [in_, attackTime, decayTime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; decayTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, attackTime = 0.01, decayTime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Decay2", Rate.Control, [in_, attackTime, decayTime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DecodeB2 = {
  ar(params: { numChans: UGenInput | UGenInput[]; w: UGenInput | UGenInput[]; x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans, w, x, y, orientation = 0.5 } = params;
    return multiNew("DecodeB2", Rate.Audio, [numChans, w, x, y, orientation], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { numChans: UGenInput | UGenInput[]; w: UGenInput | UGenInput[]; x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans, w, x, y, orientation = 0.5 } = params;
    return multiNew("DecodeB2", Rate.Control, [numChans, w, x, y, orientation], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const DegreeToKey = {
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; octave?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, octave = 12, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DegreeToKey", Rate.Audio, [bufnum, in_, octave], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; octave?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, octave = 12, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DegreeToKey", Rate.Control, [bufnum, in_, octave], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Delay1 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; x1?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0, x1 = 0 } = params;
    const ugenOutput = multiNew("Delay1", Rate.Audio, [in_, x1], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; x1: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0, x1 } = params;
    const ugenOutput = multiNew("Delay1", Rate.Control, [in_, x1], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Delay2 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; x1?: UGenInput | UGenInput[]; x2?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0, x1 = 0, x2 = 0 } = params;
    const ugenOutput = multiNew("Delay2", Rate.Audio, [in_, x1, x2], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; x1: UGenInput | UGenInput[]; x2: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0, x1, x2 } = params;
    const ugenOutput = multiNew("Delay2", Rate.Control, [in_, x1, x2], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DelayC = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DelayC", Rate.Audio, [in_, maxdelaytime, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DelayC", Rate.Control, [in_, maxdelaytime, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DelayL = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DelayL", Rate.Audio, [in_, maxdelaytime, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DelayL", Rate.Control, [in_, maxdelaytime, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DelayN = {
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DelayN", Rate.Audio, [in_, maxdelaytime, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, maxdelaytime = 0.2, delaytime = 0.2, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DelayN", Rate.Control, [in_, maxdelaytime, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DelTapRd = {
  ar(params: { buffer: UGenInput | UGenInput[]; phase: UGenInput | UGenInput[]; delTime: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { buffer, phase, delTime, interp = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DelTapRd", Rate.Audio, [buffer, phase, delTime, interp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { buffer: UGenInput | UGenInput[]; phase: UGenInput | UGenInput[]; delTime: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { buffer, phase, delTime, interp = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DelTapRd", Rate.Control, [buffer, phase, delTime, interp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DelTapWr = {
  ar(params: { buffer: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, in: in_ } = params;
    return multiNew("DelTapWr", Rate.Audio, [buffer, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { buffer: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, in: in_ } = params;
    return multiNew("DelTapWr", Rate.Control, [buffer, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Demand = {
  ar(params: { trig: UGenInput | UGenInput[]; reset: UGenInput | UGenInput[]; demandUGens: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { trig, reset, demandUGens } = params;
    const demandUGensList = Array.isArray(demandUGens) ? demandUGens : [demandUGens];
    const inputs: (UGenInput | UGenInput[])[] = [trig, reset, ...demandUGensList];
    return multiNew("Demand", Rate.Audio, inputs, 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig: UGenInput | UGenInput[]; reset: UGenInput | UGenInput[]; demandUGens: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { trig, reset, demandUGens } = params;
    const demandUGensList = Array.isArray(demandUGens) ? demandUGens : [demandUGens];
    const inputs: (UGenInput | UGenInput[])[] = [trig, reset, ...demandUGensList];
    return multiNew("Demand", Rate.Control, inputs, 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const DemandEnvGen = {
  ar(params: { level: UGenInput | UGenInput[]; dur: UGenInput | UGenInput[]; shape?: UGenInput | UGenInput[]; curve?: UGenInput | UGenInput[]; gate?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; levelScale?: UGenInput | UGenInput[]; levelBias?: UGenInput | UGenInput[]; timeScale?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { level, dur, shape = 1, curve = 0, gate = 1, reset = 1, levelScale = 1, levelBias = 0, timeScale = 1, doneAction = 0 } = params;
    return multiNew("DemandEnvGen", Rate.Audio, [level, dur, shape, curve, gate, reset, levelScale, levelBias, timeScale, doneAction], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) as UGenOutput | UGenOutput[];
  },
  kr(params: { level: UGenInput | UGenInput[]; dur: UGenInput | UGenInput[]; shape?: UGenInput | UGenInput[]; curve?: UGenInput | UGenInput[]; gate?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; levelScale?: UGenInput | UGenInput[]; levelBias?: UGenInput | UGenInput[]; timeScale?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { level, dur, shape = 1, curve = 0, gate = 1, reset = 1, levelScale = 1, levelBias = 0, timeScale = 1, doneAction = 0 } = params;
    return multiNew("DemandEnvGen", Rate.Control, [level, dur, shape, curve, gate, reset, levelScale, levelBias, timeScale, doneAction], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) as UGenOutput | UGenOutput[];
  },
};

export const DetectIndex = {
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DetectIndex", Rate.Audio, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DetectIndex", Rate.Control, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DetectSilence = {
  ar(params: { "in"?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, amp = 0.0001, time = 0.1, doneAction = 0 } = params;
    return multiNew("DetectSilence", Rate.Audio, [in_, amp, time, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, amp = 0.0001, time = 0.1, doneAction = 0 } = params;
    return multiNew("DetectSilence", Rate.Control, [in_, amp, time, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const Dgeom = {
  new(params: { start?: UGenInput | UGenInput[]; grow?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { start = 1, grow = 2, length = Infinity } = params;
    return multiNew("Dgeom", Rate.Demand, [start, grow, length], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Dibrown = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, step = 0.01, length = Infinity } = params;
    return multiNew("Dibrown", Rate.Demand, [lo, hi, step, length], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const DigitalIn = {
  ar(params: { digitalPin?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { digitalPin = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DigitalIn", Rate.Audio, [digitalPin], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { digitalPin?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { digitalPin = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DigitalIn", Rate.Control, [digitalPin], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DigitalIO = {
  ar(params: { digitalPin?: UGenInput | UGenInput[]; output?: UGenInput | UGenInput[]; pinMode?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { digitalPin = 0, output = 0, pinMode = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DigitalIO", Rate.Audio, [digitalPin, output, pinMode], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { digitalPin?: UGenInput | UGenInput[]; output?: UGenInput | UGenInput[]; pinMode?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { digitalPin = 0, output = 0, pinMode = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("DigitalIO", Rate.Control, [digitalPin, output, pinMode], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const DigitalOut = {
  ar(params: { digitalPin?: UGenInput | UGenInput[]; output?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): void {
    const { digitalPin = 0, output = 0, mul = 1, add = 0 } = params;
    multiNew("DigitalOut", Rate.Audio, [digitalPin, output], 0, [0, 1]);
  },
  kr(params: { digitalPin?: UGenInput | UGenInput[]; output?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): void {
    const { digitalPin = 0, output = 0, mul = 1, add = 0 } = params;
    multiNew("DigitalOut", Rate.Control, [digitalPin, output], 0, [0, 1]);
  },
};

export const DiskIn = {
  ar(params: { numChannels: number; bufnum: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum, loop = 0 } = params;
    return multiNew("DiskIn", Rate.Audio, [bufnum, loop], numChannels, [0, 1]) as UGenOutput[] | UGenOutput[][];
  },
};

export const DiskOut = {
  ar(params: { bufnum: UGenInput | UGenInput[]; channelsArray: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: (UGenInput | UGenInput[])[] = [bufnum, ...channelsArrayList];
    return multiNew("DiskOut", Rate.Audio, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Diwhite = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, length = Infinity } = params;
    return multiNew("Diwhite", Rate.Demand, [lo, hi, length], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Done = {
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { src } = params;
    return multiNew("Done", Rate.Control, [src], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dpoll = {
  new(params: { in: UGenInput | UGenInput[]; label?: string; run?: UGenInput | UGenInput[]; trigid?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: input, label, run = 1, trigid = -1 } = params;
    const inList = Array.isArray(input) ? input : [input];
    const runList = Array.isArray(run) ? run : [run];
    const trigidList = Array.isArray(trigid) ? trigid : [trigid];
    const count = Math.max(inList.length, runList.length, trigidList.length);
    const outputs: UGenOutput[] = [];
    for (let i = 0; i < count; i += 1) {
      const inValue = inList[i % inList.length];
      const labelText = label ?? (typeof inValue === "number" ? "DemandUGen(Number)" : `DemandUGen(${inValue.ugen.name})`);
      const ascii = Array.from(new TextEncoder().encode(labelText));
      const inputs: UGenInput[] = [inValue, trigidList[i % trigidList.length], runList[i % runList.length], ascii.length, ...ascii];
      outputs.push(newUGen("Dpoll", Rate.Demand, inputs, 1) as UGenOutput);
    }
    return outputs.length === 1 ? outputs[0] : outputs;
  },
};

export const Drand = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Drand", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dreset = {
  new(params: { "in": UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, reset = 0 } = params;
    return multiNew("Dreset", Rate.Demand, [in_, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Dseq = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Dseq", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dser = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Dser", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dseries = {
  new(params: { start?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { start = 1, step = 1, length = Infinity } = params;
    return multiNew("Dseries", Rate.Demand, [start, step, length], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Dshuf = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Dshuf", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dstutter = {
  new(params: { n: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { n, in: in_ } = params;
    return multiNew("Dstutter", Rate.Demand, [n, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Dswitch = {
  new(params: { list: UGenInput | UGenInput[]; index: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, index } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [index, ...listList];
    return multiNew("Dswitch", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dswitch1 = {
  new(params: { list: UGenInput | UGenInput[]; index: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, index } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [index, ...listList];
    return multiNew("Dswitch1", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dunique = {
  new(params: { source: UGenInput | UGenInput[]; maxBufferSize?: UGenInput | UGenInput[]; "protected": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { source, maxBufferSize = 1024, protected: protected_ } = params;
    return multiNew("Dunique", Rate.Scalar, [source, maxBufferSize, protected_], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Dust = {
  ar(params: { density?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { density = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Dust", Rate.Audio, [density], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { density?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { density = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Dust", Rate.Control, [density], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Dust2 = {
  ar(params: { density?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { density = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Dust2", Rate.Audio, [density], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { density?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { density = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Dust2", Rate.Control, [density], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Duty = {
  ar(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { dur = 1, reset = 0, level = 1, doneAction = 0 } = params;
    return multiNew("Duty", Rate.Audio, [dur, reset, level, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { dur = 1, reset = 0, level = 1, doneAction = 0 } = params;
    return multiNew("Duty", Rate.Control, [dur, reset, level, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const Dwhite = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, length = Infinity } = params;
    return multiNew("Dwhite", Rate.Demand, [lo, hi, length], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Dwrand = {
  new(params: { list: UGenInput | UGenInput[]; weights: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, weights, repeats = 1 } = params;
    const listValues = Array.isArray(list) ? list : [list];
    const size = listValues.length;
    const weightValues = (Array.isArray(weights) ? weights : [weights]).slice(0, size);
    while (weightValues.length < size) weightValues.push(0);
    const inputs: (UGenInput | UGenInput[])[] = [repeats, size, ...weightValues, ...listValues];
    return multiNew("Dwrand", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Dxrand = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Dxrand", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const DynKlang = {
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, freqscale = 1, freqoffset = 0 } = params;
    return multiNew("DynKlang", Rate.Audio, [specificationsArrayRef, freqscale, freqoffset], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, freqscale = 1, freqoffset = 0 } = params;
    return multiNew("DynKlang", Rate.Control, [specificationsArrayRef, freqscale, freqoffset], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const DynKlank = {
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, input, freqscale = 1, freqoffset = 0, decayscale = 1 } = params;
    return multiNew("DynKlank", Rate.Audio, [specificationsArrayRef, input, freqscale, freqoffset, decayscale], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, input, freqscale = 1, freqoffset = 0, decayscale = 1 } = params;
    return multiNew("DynKlank", Rate.Control, [specificationsArrayRef, input, freqscale, freqoffset, decayscale], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const EnvGen = {
  ar(params: {
    envelope: number[];
    gate?: UGenInput;
    levelScale?: UGenInput;
    levelBias?: UGenInput;
    timeScale?: UGenInput;
    doneAction?: UGenInput;
  }): UGenOutput {
    const { envelope, gate = 1, levelScale = 1, levelBias = 0, timeScale = 1, doneAction = 0 } = params;
    const inputs: UGenInput[] = [gate, levelScale, levelBias, timeScale, doneAction, ...envelope];
    return newUGen("EnvGen", Rate.Audio, inputs, 1) as UGenOutput;
  },
  kr(params: {
    envelope: number[];
    gate?: UGenInput;
    levelScale?: UGenInput;
    levelBias?: UGenInput;
    timeScale?: UGenInput;
    doneAction?: UGenInput;
  }): UGenOutput {
    const { envelope, gate = 1, levelScale = 1, levelBias = 0, timeScale = 1, doneAction = 0 } = params;
    const inputs: UGenInput[] = [gate, levelScale, levelBias, timeScale, doneAction, ...envelope];
    return newUGen("EnvGen", Rate.Control, inputs, 1) as UGenOutput;
  },
};

export const ExpRand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0.01, hi = 1 } = params;
    return multiNew("ExpRand", Rate.Scalar, [lo, hi], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const FBSineC = {
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FBSineC", Rate.Audio, [freq, im, fb, a, c, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const FBSineL = {
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FBSineL", Rate.Audio, [freq, im, fb, a, c, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const FBSineN = {
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FBSineN", Rate.Audio, [freq, im, fb, a, c, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const FFT = {
  new(params: { buffer: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; hop?: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; active?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, in: in_ = 0, hop = 0.5, wintype = 0, active = 1, winsize = 0 } = params;
    return multiNew("FFT", Rate.Scalar, [buffer, in_, hop, wintype, active, winsize], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
};

export const FFTTrigger = {
  new(params: { buffer: UGenInput | UGenInput[]; hop?: UGenInput | UGenInput[]; polar?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, hop = 0.5, polar = 0 } = params;
    return multiNew("FFTTrigger", Rate.Scalar, [buffer, hop, polar], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Fold = {
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, lo = 0, hi = 1 } = params;
    return multiNew("Fold", Rate.Audio, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("Fold", Rate.Control, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("Fold", Rate.Scalar, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const FoldIndex = {
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FoldIndex", Rate.Audio, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FoldIndex", Rate.Control, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Formant = {
  ar(params: { fundfreq?: UGenInput | UGenInput[]; formfreq?: UGenInput | UGenInput[]; bwfreq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { fundfreq = 440, formfreq = 1760, bwfreq = 880, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Formant", Rate.Audio, [fundfreq, formfreq, bwfreq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Formlet = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; attacktime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, attacktime = 1, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Formlet", Rate.Audio, [in_, freq, attacktime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; attacktime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, attacktime = 1, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Formlet", Rate.Control, [in_, freq, attacktime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const FOS = {
  ar(params: { "in"?: UGenInput | UGenInput[]; a0?: UGenInput | UGenInput[]; a1?: UGenInput | UGenInput[]; b1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, a0 = 0, a1 = 0, b1 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FOS", Rate.Audio, [in_, a0, a1, b1], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; a0?: UGenInput | UGenInput[]; a1?: UGenInput | UGenInput[]; b1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, a0 = 0, a1 = 0, b1 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FOS", Rate.Control, [in_, a0, a1, b1], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Free = {
  kr(params: { trig: UGenInput | UGenInput[]; id: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { trig, id } = params;
    return multiNew("Free", Rate.Control, [trig, id], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const FreeSelf = {
  kr(params: { "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_ } = params;
    return multiNew("FreeSelf", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const FreeSelfWhenDone = {
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { src } = params;
    return multiNew("FreeSelfWhenDone", Rate.Control, [src], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const FreeVerb = {
  ar(params: { "in": UGenInput | UGenInput[]; mix?: UGenInput | UGenInput[]; room?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, mix = 0.33, room = 0.5, damp = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FreeVerb", Rate.Audio, [in_, mix, room, damp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const FreeVerb2 = {
  ar(params: { "in": UGenInput | UGenInput[]; in2: UGenInput | UGenInput[]; mix?: UGenInput | UGenInput[]; room?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, in2, mix = 0.33, room = 0.5, damp = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FreeVerb2", Rate.Audio, [in_, in2, mix, room, damp], 2, [0, 1, 2, 3, 4]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
};

export const FreqShift = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 0, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FreqShift", Rate.Audio, [in_, freq, phase], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const FSinOsc = {
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FSinOsc", Rate.Audio, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FSinOsc", Rate.Control, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Gate = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Gate", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Gate", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const GbmanL = {
  ar(params: { freq?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, xi = 1.2, yi = 2.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GbmanL", Rate.Audio, [freq, xi, yi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const GbmanN = {
  ar(params: { freq?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, xi = 1.2, yi = 2.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GbmanN", Rate.Audio, [freq, xi, yi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Gendy1 = {
  ar(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; minfreq?: UGenInput | UGenInput[]; maxfreq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { ampdist = 1, durdist = 1, adparam = 1, ddparam = 1, minfreq = 440, maxfreq = 660, ampscale = 0.5, durscale = 0.5, initCPs = 12, knum, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Gendy1", Rate.Audio, [ampdist, durdist, adparam, ddparam, minfreq, maxfreq, ampscale, durscale, initCPs, knum], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; minfreq?: UGenInput | UGenInput[]; maxfreq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { ampdist = 1, durdist = 1, adparam = 1, ddparam = 1, minfreq = 20, maxfreq = 1000, ampscale = 0.5, durscale = 0.5, initCPs = 12, knum, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Gendy1", Rate.Control, [ampdist, durdist, adparam, ddparam, minfreq, maxfreq, ampscale, durscale, initCPs, knum], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Gendy2 = {
  ar(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; minfreq?: UGenInput | UGenInput[]; maxfreq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { ampdist = 1, durdist = 1, adparam = 1, ddparam = 1, minfreq = 440, maxfreq = 660, ampscale = 0.5, durscale = 0.5, initCPs = 12, knum, a = 1.17, c = 0.31, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Gendy2", Rate.Audio, [ampdist, durdist, adparam, ddparam, minfreq, maxfreq, ampscale, durscale, initCPs, knum, a, c], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; minfreq?: UGenInput | UGenInput[]; maxfreq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { ampdist = 1, durdist = 1, adparam = 1, ddparam = 1, minfreq = 20, maxfreq = 1000, ampscale = 0.5, durscale = 0.5, initCPs = 12, knum, a = 1.17, c = 0.31, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Gendy2", Rate.Control, [ampdist, durdist, adparam, ddparam, minfreq, maxfreq, ampscale, durscale, initCPs, knum, a, c], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Gendy3 = {
  ar(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { ampdist = 1, durdist = 1, adparam = 1, ddparam = 1, freq = 440, ampscale = 0.5, durscale = 0.5, initCPs = 12, knum, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Gendy3", Rate.Audio, [ampdist, durdist, adparam, ddparam, freq, ampscale, durscale, initCPs, knum], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { ampdist = 1, durdist = 1, adparam = 1, ddparam = 1, freq = 440, ampscale = 0.5, durscale = 0.5, initCPs = 12, knum, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Gendy3", Rate.Control, [ampdist, durdist, adparam, ddparam, freq, ampscale, durscale, initCPs, knum], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const GrainBuf = {
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; sndbuf: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, trigger = 0, dur = 1, sndbuf, rate = 1, pos = 0, interp = 2, pan = 0, envbufnum = -1, maxGrains = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrainBuf", Rate.Audio, [trigger, dur, sndbuf, rate, pos, interp, pan, envbufnum, maxGrains], numChannels, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
};

export const GrainFM = {
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; carfreq?: UGenInput | UGenInput[]; modfreq?: UGenInput | UGenInput[]; index?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, trigger = 0, dur = 1, carfreq = 440, modfreq = 200, index = 1, pan = 0, envbufnum = -1, maxGrains = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrainFM", Rate.Audio, [trigger, dur, carfreq, modfreq, index, pan, envbufnum, maxGrains], numChannels, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
};

export const GrainIn = {
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, trigger = 0, dur = 1, in: in_, pan = 0, envbufnum = -1, maxGrains = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrainIn", Rate.Audio, [trigger, dur, in_, pan, envbufnum, maxGrains], numChannels, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
};

export const GrainSin = {
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, trigger = 0, dur = 1, freq = 440, pan = 0, envbufnum = -1, maxGrains = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrainSin", Rate.Audio, [trigger, dur, freq, pan, envbufnum, maxGrains], numChannels, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
};

export const GrayNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrayNoise", Rate.Audio, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrayNoise", Rate.Control, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const GVerb = {
  ar(params: { "in": UGenInput | UGenInput[]; roomsize?: UGenInput | UGenInput[]; revtime?: UGenInput | UGenInput[]; damping?: UGenInput | UGenInput[]; inputbw?: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; drylevel?: UGenInput | UGenInput[]; earlyreflevel?: UGenInput | UGenInput[]; taillevel?: UGenInput | UGenInput[]; maxroomsize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, roomsize = 10, revtime = 3, damping = 0.5, inputbw = 0.5, spread = 15, drylevel = 1, earlyreflevel = 0.7, taillevel = 0.5, maxroomsize = 300, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GVerb", Rate.Audio, [in_, roomsize, revtime, damping, inputbw, spread, drylevel, earlyreflevel, taillevel, maxroomsize], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Hasher = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Hasher", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Hasher", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const HenonC = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.4, b = 0.3, x0 = 0, x1 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HenonC", Rate.Audio, [freq, a, b, x0, x1], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const HenonL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.4, b = 0.3, x0 = 0, x1 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HenonL", Rate.Audio, [freq, a, b, x0, x1], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const HenonN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.4, b = 0.3, x0 = 0, x1 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HenonN", Rate.Audio, [freq, a, b, x0, x1], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Hilbert = {
  ar(params: { "in": UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Hilbert", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const HilbertFIR = {
  ar(params: { "in": UGenInput | UGenInput[]; buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, buffer } = params;
    return multiNew("HilbertFIR", Rate.Audio, [in_, buffer], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const HPF = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HPF", Rate.Audio, [in_, freq], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HPF", Rate.Control, [in_, freq], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const HPZ1 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HPZ1", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HPZ1", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const HPZ2 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HPZ2", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HPZ2", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const IEnvGen = {
  ar(params: { envelope: number[]; index: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { envelope, index, mul = 1, add = 0 } = params;
    const inputs: (UGenInput | UGenInput[])[] = [index, ...envelope];
    const ugenOutput = multiNew("IEnvGen", Rate.Audio, inputs, 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { envelope: number[]; index: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { envelope, index, mul = 1, add = 0 } = params;
    const inputs: (UGenInput | UGenInput[])[] = [index, ...envelope];
    const ugenOutput = multiNew("IEnvGen", Rate.Control, inputs, 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const IFFT = {
  ar(params: { buffer: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wintype = 0, winsize = 0 } = params;
    return multiNew("IFFT", Rate.Audio, [buffer, wintype, winsize], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { buffer: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wintype = 0, winsize = 0 } = params;
    return multiNew("IFFT", Rate.Control, [buffer, wintype, winsize], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  new(params: { buffer: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wintype = 0, winsize = 0 } = params;
    return multiNew("IFFT", Rate.Scalar, [buffer, wintype, winsize], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Impulse = {
  ar(params: { freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Impulse", Rate.Audio, [freq, phase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Impulse", Rate.Control, [freq, phase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const In = {
  ar(params: { bus?: UGenInput | UGenInput[]; numChannels?: number } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1 } = params;
    return multiNew("In", Rate.Audio, [bus], numChannels, [0]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1 } = params;
    return multiNew("In", Rate.Control, [bus], numChannels, [0]) as UGenOutput[] | UGenOutput[][];
  },
};

export const Index = {
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Index", Rate.Audio, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Index", Rate.Control, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const IndexInBetween = {
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("IndexInBetween", Rate.Audio, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("IndexInBetween", Rate.Control, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const IndexL = {
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("IndexL", Rate.Audio, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("IndexL", Rate.Control, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const InFeedback = {
  ar(params: { bus?: UGenInput | UGenInput[]; numChannels?: number } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1 } = params;
    return multiNew("InFeedback", Rate.Audio, [bus], numChannels, [0]) as UGenOutput[] | UGenOutput[][];
  },
};

export const InfoUGenBase = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("InfoUGenBase", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const InRange = {
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, lo = 0, hi = 1 } = params;
    return multiNew("InRange", Rate.Audio, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("InRange", Rate.Control, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("InRange", Rate.Scalar, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const InRect = {
  ar(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; rect: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { x, y, rect } = params;
    return multiNew("InRect", Rate.Audio, [x, y, rect], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; rect: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { x = 0, y = 0, rect } = params;
    return multiNew("InRect", Rate.Control, [x, y, rect], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Integrator = {
  ar(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, coef = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Integrator", Rate.Audio, [in_, coef], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, coef = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Integrator", Rate.Control, [in_, coef], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const InTrig = {
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1 } = params;
    return multiNew("InTrig", Rate.Control, [bus], numChannels, [0]) as UGenOutput[] | UGenOutput[][];
  },
};

export const IRand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 127 } = params;
    return multiNew("IRand", Rate.Scalar, [lo, hi], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const K2A = {
  ar(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("K2A", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const KeyState = {
  kr(params: { keycode?: UGenInput | UGenInput[]; minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { keycode = 0, minval = 0, maxval = 1, lag = 0.2 } = params;
    return multiNew("KeyState", Rate.Control, [keycode, minval, maxval, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const KeyTrack = {
  kr(params: { chain: UGenInput | UGenInput[]; keydecay?: UGenInput | UGenInput[]; chromaleak?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, keydecay = 2, chromaleak = 0.5 } = params;
    return multiNew("KeyTrack", Rate.Control, [chain, keydecay, chromaleak], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Klang = {
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, freqscale = 1, freqoffset = 0 } = params;
    return multiNew("Klang", Rate.Audio, [specificationsArrayRef, freqscale, freqoffset], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Klank = {
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, input, freqscale = 1, freqoffset = 0, decayscale = 1 } = params;
    return multiNew("Klank", Rate.Audio, [specificationsArrayRef, input, freqscale, freqoffset, decayscale], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const Lag = {
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag", Rate.Audio, [in_, lagTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag", Rate.Control, [in_, lagTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Lag2 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag2", Rate.Audio, [in_, lagTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag2", Rate.Control, [in_, lagTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Lag2UD = {
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTimeU = 0.1, lagTimeD = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag2UD", Rate.Audio, [in_, lagTimeU, lagTimeD], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTimeU = 0.1, lagTimeD = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag2UD", Rate.Control, [in_, lagTimeU, lagTimeD], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Lag3 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag3", Rate.Audio, [in_, lagTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag3", Rate.Control, [in_, lagTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Lag3UD = {
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTimeU = 0.1, lagTimeD = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag3UD", Rate.Audio, [in_, lagTimeU, lagTimeD], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTimeU = 0.1, lagTimeD = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Lag3UD", Rate.Control, [in_, lagTimeU, lagTimeD], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LagIn = {
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number; lag?: UGenInput | UGenInput[] } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1, lag = 0.1 } = params;
    return multiNew("LagIn", Rate.Control, [bus, lag], numChannels, [0, 1]) as UGenOutput[] | UGenOutput[][];
  },
};

export const LagUD = {
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTimeU = 0.1, lagTimeD = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LagUD", Rate.Audio, [in_, lagTimeU, lagTimeD], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTimeU = 0.1, lagTimeD = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LagUD", Rate.Control, [in_, lagTimeU, lagTimeD], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LastValue = {
  ar(params: { "in"?: UGenInput | UGenInput[]; diff?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, diff = 0.01 } = params;
    return multiNew("LastValue", Rate.Audio, [in_, diff], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; diff?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, diff = 0.01 } = params;
    return multiNew("LastValue", Rate.Control, [in_, diff], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Latch = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Latch", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Latch", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const LatoocarfianC = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 3, c = 0.5, d = 0.5, xi = 0.5, yi = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LatoocarfianC", Rate.Audio, [freq, a, b, c, d, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LatoocarfianL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 3, c = 0.5, d = 0.5, xi = 0.5, yi = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LatoocarfianL", Rate.Audio, [freq, a, b, c, d, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LatoocarfianN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 3, c = 0.5, d = 0.5, xi = 0.5, yi = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LatoocarfianN", Rate.Audio, [freq, a, b, c, d, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LeakDC = {
  ar(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, coef = 0.995, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LeakDC", Rate.Audio, [in_, coef], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, coef = 0.9, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LeakDC", Rate.Control, [in_, coef], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LeastChange = {
  ar(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { a = 0, b = 0 } = params;
    return multiNew("LeastChange", Rate.Audio, [a, b], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { a = 0, b = 0 } = params;
    return multiNew("LeastChange", Rate.Control, [a, b], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const LFClipNoise = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFClipNoise", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFClipNoise", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFCub = {
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFCub", Rate.Audio, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFCub", Rate.Control, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFDClipNoise = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFDClipNoise", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFDClipNoise", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFDNoise0 = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFDNoise0", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFDNoise0", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFDNoise1 = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFDNoise1", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFDNoise1", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFDNoise3 = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFDNoise3", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFDNoise3", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFGauss = {
  ar(params: { duration?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { duration = 1, width = 0.1, iphase = 0, loop = 1, doneAction = 0 } = params;
    return multiNew("LFGauss", Rate.Audio, [duration, width, iphase, loop, doneAction], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { duration?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { duration = 1, width = 0.1, iphase = 0, loop = 1, doneAction = 0 } = params;
    return multiNew("LFGauss", Rate.Control, [duration, width, iphase, loop, doneAction], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const LFNoise0 = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFNoise0", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFNoise0", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFNoise1 = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFNoise1", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFNoise1", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFNoise2 = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFNoise2", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 500, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFNoise2", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFPar = {
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFPar", Rate.Audio, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFPar", Rate.Control, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFPulse = {
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, width = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFPulse", Rate.Audio, [freq, iphase, width], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, width = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFPulse", Rate.Control, [freq, iphase, width], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFSaw = {
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFSaw", Rate.Audio, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFSaw", Rate.Control, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LFTri = {
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFTri", Rate.Audio, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LFTri", Rate.Control, [freq, iphase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Limiter = {
  ar(params: { "in"?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, level = 1, dur = 0.01 } = params;
    return multiNew("Limiter", Rate.Audio, [in_, level, dur], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const LinCongC = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.1, c = 0.13, m = 1, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LinCongC", Rate.Audio, [freq, a, c, m, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LinCongL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.1, c = 0.13, m = 1, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LinCongL", Rate.Audio, [freq, a, c, m, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LinCongN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.1, c = 0.13, m = 1, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LinCongN", Rate.Audio, [freq, a, c, m, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Line = {
  ar(params: { start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { start = 0, end = 1, dur = 1, mul = 1, add = 0, doneAction = 0 } = params;
    const ugenOutput = multiNew("Line", Rate.Audio, [start, end, dur, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { start = 0, end = 1, dur = 1, mul = 1, add = 0, doneAction = 0 } = params;
    const ugenOutput = multiNew("Line", Rate.Control, [start, end, dur, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Linen = {
  kr(params: { gate?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; susLevel?: UGenInput | UGenInput[]; releaseTime?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { gate = 1, attackTime = 0.01, susLevel = 1, releaseTime = 1, doneAction = 0 } = params;
    return multiNew("Linen", Rate.Control, [gate, attackTime, susLevel, releaseTime, doneAction], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const LinExp = {
  ar(params: { "in"?: UGenInput | UGenInput[]; srclo?: UGenInput | UGenInput[]; srchi?: UGenInput | UGenInput[]; dstlo?: UGenInput | UGenInput[]; dsthi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, srclo = 0, srchi = 1, dstlo = 1, dsthi = 2 } = params;
    return multiNew("LinExp", Rate.Audio, [in_, srclo, srchi, dstlo, dsthi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; srclo?: UGenInput | UGenInput[]; srchi?: UGenInput | UGenInput[]; dstlo?: UGenInput | UGenInput[]; dsthi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, srclo = 0, srchi = 1, dstlo = 1, dsthi = 2 } = params;
    return multiNew("LinExp", Rate.Control, [in_, srclo, srchi, dstlo, dsthi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const LinkJump = {
  kr(params: { gate?: UGenInput | UGenInput[]; beat?: UGenInput | UGenInput[]; quantum?: UGenInput | UGenInput[]; force?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { gate = 0, beat = 0, quantum = 4, force = 0 } = params;
    return multiNew("LinkJump", Rate.Control, [gate, beat, quantum, force], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const LinkPhase = {
  kr(params: { quantum?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { quantum = 4 } = params;
    return multiNew("LinkPhase", Rate.Control, [quantum], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const LinkTempo = {
  kr(params: { gate?: UGenInput | UGenInput[]; tempo?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { gate = 0, tempo = 1 } = params;
    return multiNew("LinkTempo", Rate.Control, [gate, tempo], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const LinPan2 = {
  ar(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, pos = 0, level = 1 } = params;
    return multiNew("LinPan2", Rate.Audio, [in_, pos, level], 2, [0, 1, 2]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, pos = 0, level = 1 } = params;
    return multiNew("LinPan2", Rate.Control, [in_, pos, level], 2, [0, 1, 2]) as UGenOutput[] | UGenOutput[][];
  },
};

export const LinRand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; minmax?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, minmax = 0 } = params;
    return multiNew("LinRand", Rate.Scalar, [lo, hi, minmax], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const LinXFade2 = {
  ar(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inA, inB = 0, pan = 0, level = 1 } = params;
    return multiNew("LinXFade2", Rate.Audio, [inA, inB, pan, level], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inA, inB = 0, pan = 0, level = 1 } = params;
    return multiNew("LinXFade2", Rate.Control, [inA, inB, pan, level], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const ListDUGen = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("ListDUGen", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const LocalBuf = {
  new(params: { numFrames?: UGenInput; numChannels?: UGenInput } = {}): UGenOutput {
    const { numFrames = 1, numChannels = 1 } = params;
    const builder = getActiveBuilder();
    if (!builder || !builder.registerLocalBuf) {
      throw new Error("LocalBuf requires an active synthDef builder");
    }
    const maxLocalBufs = builder.registerLocalBuf();
    return newUGen("LocalBuf", Rate.Scalar, [numChannels, numFrames, maxLocalBufs], 1) as UGenOutput;
  },
};

export const LocalIn = {
  ar(params: { numChannels?: number; default?: UGenInput | UGenInput[] } = {}): UGenOutput[] {
    const { numChannels = 1, default: defaultValue = 0 } = params;
    const defaults = (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) as UGenInput[];
    return newUGen("LocalIn", Rate.Audio, defaults, numChannels) as UGenOutput[];
  },
  kr(params: { numChannels?: number; default?: UGenInput | UGenInput[] } = {}): UGenOutput[] {
    const { numChannels = 1, default: defaultValue = 0 } = params;
    const defaults = (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) as UGenInput[];
    return newUGen("LocalIn", Rate.Control, defaults, numChannels) as UGenOutput[];
  },
};

export const LocalOut = {
  ar(params: { channelsArray: UGenInput | UGenInput[] }): void {
    const { channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [...channelsArrayList];
    newUGen("LocalOut", Rate.Audio, inputs as UGenInput[], 0);
  },
  kr(params: { channelsArray: UGenInput | UGenInput[] }): void {
    const { channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [...channelsArrayList];
    newUGen("LocalOut", Rate.Control, inputs as UGenInput[], 0);
  },
};

export const Logistic = {
  ar(params: { chaosParam?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; init?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { chaosParam = 3, freq = 1000, init = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Logistic", Rate.Audio, [chaosParam, freq, init], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { chaosParam?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; init?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { chaosParam = 3, freq = 1000, init = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Logistic", Rate.Control, [chaosParam, freq, init], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LorenzL = {
  ar(params: { freq?: UGenInput | UGenInput[]; s?: UGenInput | UGenInput[]; r?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; h?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; zi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, s = 10, r = 28, b = 2.667, h = 0.05, xi = 0.1, yi = 0, zi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LorenzL", Rate.Audio, [freq, s, r, b, h, xi, yi, zi], 1, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Loudness = {
  kr(params: { chain: UGenInput | UGenInput[]; smask?: UGenInput | UGenInput[]; tmask?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, smask = 0.25, tmask = 1 } = params;
    return multiNew("Loudness", Rate.Control, [chain, smask, tmask], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const LPF = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LPF", Rate.Audio, [in_, freq], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LPF", Rate.Control, [in_, freq], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LPZ1 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LPZ1", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LPZ1", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const LPZ2 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LPZ2", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LPZ2", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const MantissaMask = {
  ar(params: { "in"?: UGenInput | UGenInput[]; bits?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, bits = 3, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("MantissaMask", Rate.Audio, [in_, bits], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; bits?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, bits = 3, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("MantissaMask", Rate.Control, [in_, bits], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Median = {
  ar(params: { length?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { length = 3, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Median", Rate.Audio, [length, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { length?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { length = 3, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Median", Rate.Control, [length, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const MFCC = {
  kr(params: { chain: UGenInput | UGenInput[]; numcoeff?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, numcoeff = 13 } = params;
    return multiNew("MFCC", Rate.Control, [chain, numcoeff], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const MidEQ = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, db = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("MidEQ", Rate.Audio, [in_, freq, rq, db], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, db = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("MidEQ", Rate.Control, [in_, freq, rq, db], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const ModDif = {
  ar(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; mod?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { x = 0, y = 0, mod = 1 } = params;
    return multiNew("ModDif", Rate.Audio, [x, y, mod], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; mod?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { x = 0, y = 0, mod = 1 } = params;
    return multiNew("ModDif", Rate.Control, [x, y, mod], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  ir(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; mod?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { x = 0, y = 0, mod = 1 } = params;
    return multiNew("ModDif", Rate.Scalar, [x, y, mod], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const MoogFF = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 100, gain = 2, reset = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("MoogFF", Rate.Audio, [in_, freq, gain, reset], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 100, gain = 2, reset = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("MoogFF", Rate.Control, [in_, freq, gain, reset], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const MostChange = {
  ar(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { a = 0, b = 0 } = params;
    return multiNew("MostChange", Rate.Audio, [a, b], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { a = 0, b = 0 } = params;
    return multiNew("MostChange", Rate.Control, [a, b], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const MouseButton = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, lag = 0.2 } = params;
    return multiNew("MouseButton", Rate.Control, [minval, maxval, lag], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const MouseX = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("MouseX", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const MouseY = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("MouseY", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const MultiplexAnalogIn = {
  ar(params: { analogPin?: UGenInput | UGenInput[]; muxChannel?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { analogPin = 0, muxChannel = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("MultiplexAnalogIn", Rate.Audio, [analogPin, muxChannel], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { analogPin?: UGenInput | UGenInput[]; muxChannel?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { analogPin = 0, muxChannel = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("MultiplexAnalogIn", Rate.Control, [analogPin, muxChannel], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const NodeID = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("NodeID", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const Normalizer = {
  ar(params: { "in"?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, level = 1, dur = 0.01 } = params;
    return multiNew("Normalizer", Rate.Audio, [in_, level, dur], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const NRand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; n?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, n = 0 } = params;
    return multiNew("NRand", Rate.Scalar, [lo, hi, n], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const NumAudioBuses = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("NumAudioBuses", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const NumBuffers = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("NumBuffers", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const NumControlBuses = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("NumControlBuses", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const NumInputBuses = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("NumInputBuses", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const NumOutputBuses = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("NumOutputBuses", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const NumRunningSynths = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("NumRunningSynths", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
  kr(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("NumRunningSynths", Rate.Control, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const OffsetOut = {
  ar(params: { bus: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { bus, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [bus, ...channelsArrayList];
    newUGen("OffsetOut", Rate.Audio, inputs as UGenInput[], 0);
  },
  kr(params: {  } = {}): void {
    const {  } = params;
    newUGen("OffsetOut", Rate.Control, [] as UGenInput[], 0);
  },
};

export const OnePole = {
  ar(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, coef = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("OnePole", Rate.Audio, [in_, coef], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, coef = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("OnePole", Rate.Control, [in_, coef], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const OneZero = {
  ar(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, coef = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("OneZero", Rate.Audio, [in_, coef], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, coef = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("OneZero", Rate.Control, [in_, coef], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Onsets = {
  kr(params: { chain: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; odftype: UGenInput | UGenInput[]; relaxtime?: UGenInput | UGenInput[]; floor?: UGenInput | UGenInput[]; mingap?: UGenInput | UGenInput[]; medianspan?: UGenInput | UGenInput[]; whtype?: UGenInput | UGenInput[]; rawodf?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, threshold = 0.5, odftype, relaxtime = 1, floor = 0.1, mingap = 10, medianspan = 11, whtype = 1, rawodf = 0 } = params;
    return multiNew("Onsets", Rate.Control, [chain, threshold, odftype, relaxtime, floor, mingap, medianspan, whtype, rawodf], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput | UGenOutput[];
  },
};

export const Osc = {
  ar(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Osc", Rate.Audio, [bufnum, freq, phase], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Osc", Rate.Control, [bufnum, freq, phase], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const OscN = {
  ar(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("OscN", Rate.Audio, [bufnum, freq, phase], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("OscN", Rate.Control, [bufnum, freq, phase], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Out = {
  ar(params: { bus: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { bus, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [bus, ...channelsArrayList];
    newUGen("Out", Rate.Audio, inputs as UGenInput[], 0);
  },
  kr(params: { bus: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { bus, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [bus, ...channelsArrayList];
    newUGen("Out", Rate.Control, inputs as UGenInput[], 0);
  },
};

export const PackFFT = {
  new(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; magsphases: UGenInput | UGenInput[]; frombin?: UGenInput | UGenInput[]; tobin: UGenInput | UGenInput[]; zeroothers?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, bufsize, magsphases, frombin = 0, tobin, zeroothers = 0 } = params;
    const magsphasesList = Array.isArray(magsphases) ? magsphases : [magsphases];
    const inputs: (UGenInput | UGenInput[])[] = [chain, bufsize, frombin, tobin, zeroothers, magsphasesList.length, ...magsphasesList];
    return multiNew("PackFFT", Rate.Scalar, inputs, 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const Pan2 = {
  ar(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, pos = 0, level = 1 } = params;
    return multiNew("Pan2", Rate.Audio, [in_, pos, level], 2, [0, 1, 2]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, pos = 0, level = 1 } = params;
    return multiNew("Pan2", Rate.Control, [in_, pos, level], 2, [0, 1, 2]) as UGenOutput[] | UGenOutput[][];
  },
};

export const Pan4 = {
  ar(params: { "in": UGenInput | UGenInput[]; xpos?: UGenInput | UGenInput[]; ypos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, xpos = 0, ypos = 0, level = 1 } = params;
    return multiNew("Pan4", Rate.Audio, [in_, xpos, ypos, level], 4, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { "in": UGenInput | UGenInput[]; xpos?: UGenInput | UGenInput[]; ypos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, xpos = 0, ypos = 0, level = 1 } = params;
    return multiNew("Pan4", Rate.Control, [in_, xpos, ypos, level], 4, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
};

export const PanAz = {
  ar(params: { numChans: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans, in: in_, pos = 0, level = 1, width = 2, orientation = 0.5 } = params;
    return multiNew("PanAz", Rate.Audio, [numChans, in_, pos, level, width, orientation], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
  kr(params: { numChans: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans, in: in_, pos = 0, level = 1, width = 2, orientation = 0.5 } = params;
    return multiNew("PanAz", Rate.Control, [numChans, in_, pos, level, width, orientation], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
};

export const PanB = {
  ar(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; elevation?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, azimuth = 0, elevation = 0, gain = 1 } = params;
    return multiNew("PanB", Rate.Audio, [in_, azimuth, elevation, gain], 4, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; elevation?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, azimuth = 0, elevation = 0, gain = 1 } = params;
    return multiNew("PanB", Rate.Control, [in_, azimuth, elevation, gain], 4, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
};

export const PanB2 = {
  ar(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, azimuth = 0, gain = 1 } = params;
    return multiNew("PanB2", Rate.Audio, [in_, azimuth, gain], 3, [0, 1, 2]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, azimuth = 0, gain = 1 } = params;
    return multiNew("PanB2", Rate.Control, [in_, azimuth, gain], 3, [0, 1, 2]) as UGenOutput[] | UGenOutput[][];
  },
};

export const PartConv = {
  ar(params: { "in": UGenInput | UGenInput[]; fftsize: UGenInput | UGenInput[]; irbufnum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, fftsize, irbufnum, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("PartConv", Rate.Audio, [in_, fftsize, irbufnum], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Pause = {
  kr(params: { gate: UGenInput | UGenInput[]; id: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { gate, id } = params;
    return multiNew("Pause", Rate.Control, [gate, id], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PauseSelf = {
  kr(params: { "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_ } = params;
    return multiNew("PauseSelf", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const PauseSelfWhenDone = {
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { src } = params;
    return multiNew("PauseSelfWhenDone", Rate.Control, [src], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Peak = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Peak", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Peak", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PeakFollower = {
  ar(params: { "in"?: UGenInput | UGenInput[]; decay?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, decay = 0.999 } = params;
    return multiNew("PeakFollower", Rate.Audio, [in_, decay], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; decay?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, decay = 0.999 } = params;
    return multiNew("PeakFollower", Rate.Control, [in_, decay], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Phasor = {
  ar(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; resetPos?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, rate = 1, start = 0, end = 1, resetPos = 0 } = params;
    return multiNew("Phasor", Rate.Audio, [trig, rate, start, end, resetPos], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; resetPos?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, rate = 1, start = 0, end = 1, resetPos = 0 } = params;
    return multiNew("Phasor", Rate.Control, [trig, rate, start, end, resetPos], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const PinkNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("PinkNoise", Rate.Audio, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("PinkNoise", Rate.Control, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Pitch = {
  kr(params: { "in"?: UGenInput | UGenInput[]; initFreq?: UGenInput | UGenInput[]; minFreq?: UGenInput | UGenInput[]; maxFreq?: UGenInput | UGenInput[]; execFreq?: UGenInput | UGenInput[]; maxBinsPerOctave?: UGenInput | UGenInput[]; median?: UGenInput | UGenInput[]; ampThreshold?: UGenInput | UGenInput[]; peakThreshold?: UGenInput | UGenInput[]; downSample?: UGenInput | UGenInput[]; clar?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, initFreq = 440, minFreq = 60, maxFreq = 4000, execFreq = 100, maxBinsPerOctave = 16, median = 1, ampThreshold = 0.01, peakThreshold = 0.5, downSample = 1, clar = 0 } = params;
    return multiNew("Pitch", Rate.Control, [in_, initFreq, minFreq, maxFreq, execFreq, maxBinsPerOctave, median, ampThreshold, peakThreshold, downSample, clar], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) as UGenOutput | UGenOutput[];
  },
};

export const PitchShift = {
  ar(params: { "in"?: UGenInput | UGenInput[]; windowSize?: UGenInput | UGenInput[]; pitchRatio?: UGenInput | UGenInput[]; pitchDispersion?: UGenInput | UGenInput[]; timeDispersion?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, windowSize = 0.2, pitchRatio = 1, pitchDispersion = 0, timeDispersion = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("PitchShift", Rate.Audio, [in_, windowSize, pitchRatio, pitchDispersion, timeDispersion], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const PlayBuf = {
  ar(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; startPos?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum = 0, rate = 1, trigger = 1, startPos = 0, loop = 0, doneAction = 0 } = params;
    return multiNew("PlayBuf", Rate.Audio, [bufnum, rate, trigger, startPos, loop, doneAction], numChannels, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; startPos?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum = 0, rate = 1, trigger = 1, startPos = 0, loop = 0, doneAction = 0 } = params;
    return multiNew("PlayBuf", Rate.Control, [bufnum, rate, trigger, startPos, loop, doneAction], numChannels, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
  },
};

export const Pluck = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 1, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, coef = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Pluck", Rate.Audio, [in_, trig, maxdelaytime, delaytime, decaytime, coef], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Poll = {
  ar(params: { trig?: UGenInput | UGenInput[]; in: UGenInput | UGenInput[]; label?: string; trigid?: UGenInput | UGenInput[] }): UGenInput | UGenInput[] {
    const { trig = 0, in: input, label, trigid = -1 } = params;
    const trigList = Array.isArray(trig) ? trig : [trig];
    const inList = Array.isArray(input) ? input : [input];
    const trigidList = Array.isArray(trigid) ? trigid : [trigid];
    const count = Math.max(trigList.length, inList.length, trigidList.length);
    for (let i = 0; i < count; i += 1) {
      const inValue = inList[i % inList.length];
      const labelText = label ?? (typeof inValue === "number" ? "UGen(Number)" : `UGen(${inValue.ugen.name})`);
      const ascii = Array.from(new TextEncoder().encode(labelText));
      const inputs: UGenInput[] = [trigList[i % trigList.length], inValue, trigidList[i % trigidList.length], ascii.length, ...ascii];
      newUGen("Poll", Rate.Audio, inputs, 1);
    }
    return input;
  },
  kr(params: { trig?: UGenInput | UGenInput[]; in: UGenInput | UGenInput[]; label?: string; trigid?: UGenInput | UGenInput[] }): UGenInput | UGenInput[] {
    const { trig = 0, in: input, label, trigid = -1 } = params;
    const trigList = Array.isArray(trig) ? trig : [trig];
    const inList = Array.isArray(input) ? input : [input];
    const trigidList = Array.isArray(trigid) ? trigid : [trigid];
    const count = Math.max(trigList.length, inList.length, trigidList.length);
    for (let i = 0; i < count; i += 1) {
      const inValue = inList[i % inList.length];
      const labelText = label ?? (typeof inValue === "number" ? "UGen(Number)" : `UGen(${inValue.ugen.name})`);
      const ascii = Array.from(new TextEncoder().encode(labelText));
      const inputs: UGenInput[] = [trigList[i % trigList.length], inValue, trigidList[i % trigidList.length], ascii.length, ...ascii];
      newUGen("Poll", Rate.Control, inputs, 1);
    }
    return input;
  },
  new(params: { trig?: UGenInput | UGenInput[]; in: UGenInput | UGenInput[]; label?: string; trigid?: UGenInput | UGenInput[] }): UGenInput | UGenInput[] {
    const input = params.in;
    let rate = Rate.Scalar;
    if (Array.isArray(input)) {
      for (const item of input) {
        const itemRate = typeof item === "number" ? Rate.Scalar : item.rate;
        if (itemRate > rate) rate = itemRate;
      }
    } else {
      rate = typeof input === "number" ? Rate.Scalar : input.rate;
    }
    return rate === Rate.Audio ? Poll.ar(params) : Poll.kr(params);
  },
};

export const PSinGrain = {
  ar(params: { freq?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, dur = 0.2, amp = 0.1 } = params;
    return multiNew("PSinGrain", Rate.Audio, [freq, dur, amp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Pulse = {
  ar(params: { freq?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, width = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Pulse", Rate.Audio, [freq, width], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, width = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Pulse", Rate.Control, [freq, width], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const PulseCount = {
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0 } = params;
    return multiNew("PulseCount", Rate.Audio, [trig, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0 } = params;
    return multiNew("PulseCount", Rate.Control, [trig, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PulseDivider = {
  ar(params: { trig?: UGenInput | UGenInput[]; div?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, div = 2, start = 0 } = params;
    return multiNew("PulseDivider", Rate.Audio, [trig, div, start], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; div?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, div = 2, start = 0 } = params;
    return multiNew("PulseDivider", Rate.Control, [trig, div, start], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const PV_Add = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Add", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_BinScramble = {
  new(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wipe = 0, width = 0.2, trig = 0 } = params;
    return multiNew("PV_BinScramble", Rate.Scalar, [buffer, wipe, width, trig], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const PV_BinShift = {
  new(params: { buffer: UGenInput | UGenInput[]; stretch?: UGenInput | UGenInput[]; shift?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, stretch = 1, shift = 0, interp = 0 } = params;
    return multiNew("PV_BinShift", Rate.Scalar, [buffer, stretch, shift, interp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const PV_BinWipe = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB, wipe = 0 } = params;
    return multiNew("PV_BinWipe", Rate.Scalar, [bufferA, bufferB, wipe], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const PV_BrickWall = {
  new(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wipe = 0 } = params;
    return multiNew("PV_BrickWall", Rate.Scalar, [buffer, wipe], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_ConformalMap = {
  new(params: { buffer: UGenInput | UGenInput[]; areal?: UGenInput | UGenInput[]; aimag?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, areal = 0, aimag = 0 } = params;
    return multiNew("PV_ConformalMap", Rate.Scalar, [buffer, areal, aimag], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const PV_Conj = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_Conj", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const PV_Copy = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Copy", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_CopyPhase = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_CopyPhase", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_Diffuser = {
  new(params: { buffer: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, trig = 0 } = params;
    return multiNew("PV_Diffuser", Rate.Scalar, [buffer, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_Div = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Div", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_HainsworthFoote = {
  ar(params: { buffer: UGenInput | UGenInput[]; proph?: UGenInput | UGenInput[]; propf?: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; waittime?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, proph = 0, propf = 0, threshold = 1, waittime = 0.04 } = params;
    return multiNew("PV_HainsworthFoote", Rate.Audio, [buffer, proph, propf, threshold, waittime], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const PV_JensenAndersen = {
  ar(params: { buffer: UGenInput | UGenInput[]; propsc?: UGenInput | UGenInput[]; prophfe?: UGenInput | UGenInput[]; prophfc?: UGenInput | UGenInput[]; propsf?: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; waittime?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, propsc = 0.25, prophfe = 0.25, prophfc = 0.25, propsf = 0.25, threshold = 1, waittime = 0.04 } = params;
    return multiNew("PV_JensenAndersen", Rate.Audio, [buffer, propsc, prophfe, prophfc, propsf, threshold, waittime], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
  },
};

export const PV_LocalMax = {
  new(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, threshold = 0 } = params;
    return multiNew("PV_LocalMax", Rate.Scalar, [buffer, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagAbove = {
  new(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, threshold = 0 } = params;
    return multiNew("PV_MagAbove", Rate.Scalar, [buffer, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagBelow = {
  new(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, threshold = 0 } = params;
    return multiNew("PV_MagBelow", Rate.Scalar, [buffer, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagClip = {
  new(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, threshold = 0 } = params;
    return multiNew("PV_MagClip", Rate.Scalar, [buffer, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagDiv = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; zeroed?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB, zeroed = 0.0001 } = params;
    return multiNew("PV_MagDiv", Rate.Scalar, [bufferA, bufferB, zeroed], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagFreeze = {
  new(params: { buffer: UGenInput | UGenInput[]; freeze?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, freeze = 0 } = params;
    return multiNew("PV_MagFreeze", Rate.Scalar, [buffer, freeze], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagMul = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_MagMul", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagNoise = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_MagNoise", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagShift = {
  new(params: { buffer: UGenInput | UGenInput[]; stretch?: UGenInput | UGenInput[]; shift?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, stretch = 1, shift = 0 } = params;
    return multiNew("PV_MagShift", Rate.Scalar, [buffer, stretch, shift], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagSmear = {
  new(params: { buffer: UGenInput | UGenInput[]; bins?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, bins = 0 } = params;
    return multiNew("PV_MagSmear", Rate.Scalar, [buffer, bins], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_MagSquared = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_MagSquared", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const PV_Max = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Max", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_Min = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Min", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_Mul = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Mul", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const PV_PhaseShift = {
  new(params: { buffer: UGenInput | UGenInput[]; shift: UGenInput | UGenInput[]; integrate?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, shift, integrate = 0 } = params;
    return multiNew("PV_PhaseShift", Rate.Scalar, [buffer, shift, integrate], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const PV_PhaseShift270 = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_PhaseShift270", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const PV_PhaseShift90 = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_PhaseShift90", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const PV_RandComb = {
  new(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wipe = 0, trig = 0 } = params;
    return multiNew("PV_RandComb", Rate.Scalar, [buffer, wipe, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const PV_RandWipe = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB, wipe = 0, trig = 0 } = params;
    return multiNew("PV_RandWipe", Rate.Scalar, [bufferA, bufferB, wipe, trig], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const PV_RectComb = {
  new(params: { buffer: UGenInput | UGenInput[]; numTeeth?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, numTeeth = 0, phase = 0, width = 0.5 } = params;
    return multiNew("PV_RectComb", Rate.Scalar, [buffer, numTeeth, phase, width], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const PV_RectComb2 = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; numTeeth?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB, numTeeth = 0, phase = 0, width = 0.5 } = params;
    return multiNew("PV_RectComb2", Rate.Scalar, [bufferA, bufferB, numTeeth, phase, width], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const QuadC = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = -1, c = -0.75, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("QuadC", Rate.Audio, [freq, a, b, c, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const QuadL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = -1, c = -0.75, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("QuadL", Rate.Audio, [freq, a, b, c, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const QuadN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = -1, c = -0.75, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("QuadN", Rate.Audio, [freq, a, b, c, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const RadiansPerSample = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("RadiansPerSample", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const Ramp = {
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Ramp", Rate.Audio, [in_, lagTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lagTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Ramp", Rate.Control, [in_, lagTime], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Rand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1 } = params;
    return multiNew("Rand", Rate.Scalar, [lo, hi], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const RandID = {
  kr(params: { id?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { id = 0 } = params;
    return multiNew("RandID", Rate.Control, [id], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { id?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { id = 0 } = params;
    return multiNew("RandID", Rate.Scalar, [id], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const RandSeed = {
  ar(params: { trig?: UGenInput | UGenInput[]; seed?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, seed = 56789 } = params;
    return multiNew("RandSeed", Rate.Audio, [trig, seed], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; seed?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, seed = 56789 } = params;
    return multiNew("RandSeed", Rate.Control, [trig, seed], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  ir(params: { trig?: UGenInput | UGenInput[]; seed?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, seed = 56789 } = params;
    return multiNew("RandSeed", Rate.Scalar, [trig, seed], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const RecordBuf = {
  ar(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[]; recLevel?: UGenInput | UGenInput[]; preLevel?: UGenInput | UGenInput[]; run?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inputArray, bufnum = 0, offset = 0, recLevel = 1, preLevel = 0, run = 1, loop = 1, trigger = 1, doneAction = 0 } = params;
    const inputArrayList = Array.isArray(inputArray) ? inputArray : [inputArray];
    const inputs: (UGenInput | UGenInput[])[] = [bufnum, offset, recLevel, preLevel, run, loop, trigger, doneAction, ...inputArrayList];
    return multiNew("RecordBuf", Rate.Audio, inputs, 1, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[]; recLevel?: UGenInput | UGenInput[]; preLevel?: UGenInput | UGenInput[]; run?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inputArray, bufnum = 0, offset = 0, recLevel = 1, preLevel = 0, run = 1, loop = 1, trigger = 1, doneAction = 0 } = params;
    const inputArrayList = Array.isArray(inputArray) ? inputArray : [inputArray];
    const inputs: (UGenInput | UGenInput[])[] = [bufnum, offset, recLevel, preLevel, run, loop, trigger, doneAction, ...inputArrayList];
    return multiNew("RecordBuf", Rate.Control, inputs, 1, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput | UGenOutput[];
  },
};

export const ReplaceOut = {
  ar(params: { bus: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { bus, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [bus, ...channelsArrayList];
    newUGen("ReplaceOut", Rate.Audio, inputs as UGenInput[], 0);
  },
  kr(params: { bus: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { bus, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [bus, ...channelsArrayList];
    newUGen("ReplaceOut", Rate.Control, inputs as UGenInput[], 0);
  },
};

export const Resonz = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bwr?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, bwr = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Resonz", Rate.Audio, [in_, freq, bwr], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bwr?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, bwr = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Resonz", Rate.Control, [in_, freq, bwr], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const RHPF = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("RHPF", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("RHPF", Rate.Control, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Ringz = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Ringz", Rate.Audio, [in_, freq, decaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Ringz", Rate.Control, [in_, freq, decaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const RLPF = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("RLPF", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("RLPF", Rate.Control, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Rotate2 = {
  ar(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { x, y, pos = 0 } = params;
    return multiNew("Rotate2", Rate.Audio, [x, y, pos], 2, [0, 1, 2]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { x, y, pos = 0 } = params;
    return multiNew("Rotate2", Rate.Control, [x, y, pos], 2, [0, 1, 2]) as UGenOutput[] | UGenOutput[][];
  },
};

export const RunningMax = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("RunningMax", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("RunningMax", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const RunningMin = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("RunningMin", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("RunningMin", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const RunningSum = {
  ar(params: { "in": UGenInput | UGenInput[]; numsamp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, numsamp = 40 } = params;
    return multiNew("RunningSum", Rate.Audio, [in_, numsamp], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; numsamp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, numsamp = 40 } = params;
    return multiNew("RunningSum", Rate.Control, [in_, numsamp], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const SampleDur = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("SampleDur", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const SampleRate = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("SampleRate", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const Sanitize = {
  ar(params: { "in"?: UGenInput | UGenInput[]; replace?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, replace = 0 } = params;
    return multiNew("Sanitize", Rate.Audio, [in_, replace], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; replace?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, replace = 0 } = params;
    return multiNew("Sanitize", Rate.Control, [in_, replace], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Saw = {
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Saw", Rate.Audio, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Saw", Rate.Control, [freq], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Schmidt = {
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, lo = 0, hi = 1 } = params;
    return multiNew("Schmidt", Rate.Audio, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("Schmidt", Rate.Control, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("Schmidt", Rate.Scalar, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const ScopeOut = {
  ar(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inputArray, bufnum = 0 } = params;
    const inputArrayList = Array.isArray(inputArray) ? inputArray : [inputArray];
    const inputs: (UGenInput | UGenInput[])[] = [bufnum, ...inputArrayList];
    return multiNew("ScopeOut", Rate.Audio, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inputArray, bufnum = 0 } = params;
    const inputArrayList = Array.isArray(inputArray) ? inputArray : [inputArray];
    const inputs: (UGenInput | UGenInput[])[] = [bufnum, ...inputArrayList];
    return multiNew("ScopeOut", Rate.Control, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const ScopeOut2 = {
  ar(params: { inputArray: UGenInput | UGenInput[]; scopeNum?: UGenInput | UGenInput[]; maxFrames?: UGenInput | UGenInput[]; scopeFrames: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inputArray, scopeNum = 0, maxFrames = 4096, scopeFrames } = params;
    const inputArrayList = Array.isArray(inputArray) ? inputArray : [inputArray];
    const inputs: (UGenInput | UGenInput[])[] = [scopeNum, maxFrames, scopeFrames, ...inputArrayList];
    return multiNew("ScopeOut2", Rate.Audio, inputs, 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inputArray: UGenInput | UGenInput[]; scopeNum?: UGenInput | UGenInput[]; maxFrames?: UGenInput | UGenInput[]; scopeFrames: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inputArray, scopeNum = 0, maxFrames = 4096, scopeFrames } = params;
    const inputArrayList = Array.isArray(inputArray) ? inputArray : [inputArray];
    const inputs: (UGenInput | UGenInput[])[] = [scopeNum, maxFrames, scopeFrames, ...inputArrayList];
    return multiNew("ScopeOut2", Rate.Control, inputs, 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Select = {
  ar(params: { which: UGenInput | UGenInput[]; array: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { which, array } = params;
    const arrayList = Array.isArray(array) ? array : [array];
    const inputs: (UGenInput | UGenInput[])[] = [which, ...arrayList];
    return multiNew("Select", Rate.Audio, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { which: UGenInput | UGenInput[]; array: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { which, array } = params;
    const arrayList = Array.isArray(array) ? array : [array];
    const inputs: (UGenInput | UGenInput[])[] = [which, ...arrayList];
    return multiNew("Select", Rate.Control, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const SendPeakRMS = {
  ar(params: { sig: UGenInput | UGenInput[]; replyRate?: UGenInput; peakLag?: UGenInput; cmdName?: string; replyID?: UGenInput } ): void {
    const { sig, replyRate = 20, peakLag = 3, cmdName = "/reply", replyID = -1 } = params;
    const ascii = Array.from(new TextEncoder().encode(cmdName));
    const sigList = Array.isArray(sig) ? sig : [sig];
    const inputs: UGenInput[] = [replyRate, peakLag, replyID, sigList.length, ...sigList, ascii.length, ...ascii];
    newUGen("SendPeakRMS", Rate.Audio, inputs, 0);
  },
  kr(params: { sig: UGenInput | UGenInput[]; replyRate?: UGenInput; peakLag?: UGenInput; cmdName?: string; replyID?: UGenInput } ): void {
    const { sig, replyRate = 20, peakLag = 3, cmdName = "/reply", replyID = -1 } = params;
    const ascii = Array.from(new TextEncoder().encode(cmdName));
    const sigList = Array.isArray(sig) ? sig : [sig];
    const inputs: UGenInput[] = [replyRate, peakLag, replyID, sigList.length, ...sigList, ascii.length, ...ascii];
    newUGen("SendPeakRMS", Rate.Control, inputs, 0);
  },
};

export const SendReply = {
  ar(params: { trig?: UGenInput | UGenInput[]; cmdName?: string; values?: UGenInput | UGenInput[]; replyID?: UGenInput | UGenInput[] } = {}): void {
    const { trig = 0, cmdName = "/reply", values, replyID = -1 } = params;
    const ascii = Array.from(new TextEncoder().encode(cmdName));
    const valueList = values === undefined ? [] : (Array.isArray(values) ? values : [values]);
    const trigList = Array.isArray(trig) ? trig : [trig];
    const replyList = Array.isArray(replyID) ? replyID : [replyID];
    const count = Math.max(trigList.length, replyList.length);
    for (let i = 0; i < count; i += 1) {
      const inputs: UGenInput[] = [trigList[i % trigList.length], replyList[i % replyList.length], ascii.length, ...ascii, ...valueList];
      newUGen("SendReply", Rate.Audio, inputs, 0);
    }
  },
  kr(params: { trig?: UGenInput | UGenInput[]; cmdName?: string; values?: UGenInput | UGenInput[]; replyID?: UGenInput | UGenInput[] } = {}): void {
    const { trig = 0, cmdName = "/reply", values, replyID = -1 } = params;
    const ascii = Array.from(new TextEncoder().encode(cmdName));
    const valueList = values === undefined ? [] : (Array.isArray(values) ? values : [values]);
    const trigList = Array.isArray(trig) ? trig : [trig];
    const replyList = Array.isArray(replyID) ? replyID : [replyID];
    const count = Math.max(trigList.length, replyList.length);
    for (let i = 0; i < count; i += 1) {
      const inputs: UGenInput[] = [trigList[i % trigList.length], replyList[i % replyList.length], ascii.length, ...ascii, ...valueList];
      newUGen("SendReply", Rate.Control, inputs, 0);
    }
  },
};

export const SendTrig = {
  ar(params: { "in"?: UGenInput | UGenInput[]; id?: UGenInput | UGenInput[]; value?: UGenInput | UGenInput[] } = {}): void {
    const { in: in_ = 0, id = 0, value = 0 } = params;
    multiNew("SendTrig", Rate.Audio, [in_, id, value], 0, [0, 1, 2]);
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; id?: UGenInput | UGenInput[]; value?: UGenInput | UGenInput[] } = {}): void {
    const { in: in_ = 0, id = 0, value = 0 } = params;
    multiNew("SendTrig", Rate.Control, [in_, id, value], 0, [0, 1, 2]);
  },
};

export const SetBuf = {
  new(params: { buf: UGenInput | UGenInput[]; values: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buf, values, offset = 0 } = params;
    const valuesList = Array.isArray(values) ? values : [values];
    const inputs: (UGenInput | UGenInput[])[] = [buf, offset, valuesList.length, ...valuesList];
    return multiNew("SetBuf", Rate.Scalar, inputs, 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const SetResetFF = {
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0 } = params;
    return multiNew("SetResetFF", Rate.Audio, [trig, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0 } = params;
    return multiNew("SetResetFF", Rate.Control, [trig, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Shaper = {
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Shaper", Rate.Audio, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Shaper", Rate.Control, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const SinOsc = {
  ar(params: { freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("SinOsc", Rate.Audio, [freq, phase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("SinOsc", Rate.Control, [freq, phase], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const SinOscFB = {
  ar(params: { freq?: UGenInput | UGenInput[]; feedback?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, feedback = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("SinOscFB", Rate.Audio, [freq, feedback], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; feedback?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, feedback = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("SinOscFB", Rate.Control, [freq, feedback], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Slew = {
  ar(params: { "in"?: UGenInput | UGenInput[]; up?: UGenInput | UGenInput[]; dn?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, up = 1, dn = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Slew", Rate.Audio, [in_, up, dn], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; up?: UGenInput | UGenInput[]; dn?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, up = 1, dn = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Slew", Rate.Control, [in_, up, dn], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Slope = {
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Slope", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Slope", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const SOS = {
  ar(params: { "in"?: UGenInput | UGenInput[]; a0?: UGenInput | UGenInput[]; a1?: UGenInput | UGenInput[]; a2?: UGenInput | UGenInput[]; b1?: UGenInput | UGenInput[]; b2?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, a0 = 0, a1 = 0, a2 = 0, b1 = 0, b2 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("SOS", Rate.Audio, [in_, a0, a1, a2, b1, b2], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; a0?: UGenInput | UGenInput[]; a1?: UGenInput | UGenInput[]; a2?: UGenInput | UGenInput[]; b1?: UGenInput | UGenInput[]; b2?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, a0 = 0, a1 = 0, a2 = 0, b1 = 0, b2 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("SOS", Rate.Control, [in_, a0, a1, a2, b1, b2], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const SpecCentroid = {
  kr(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("SpecCentroid", Rate.Control, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const SpecFlatness = {
  kr(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("SpecFlatness", Rate.Control, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const SpecPcile = {
  kr(params: { buffer: UGenInput | UGenInput[]; fraction?: UGenInput | UGenInput[]; interpolate?: UGenInput | UGenInput[]; binout?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, fraction = 0.5, interpolate = 0, binout = 0 } = params;
    return multiNew("SpecPcile", Rate.Control, [buffer, fraction, interpolate, binout], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const Splay = {
  ar(params: { inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inArray, spread = 1, level = 1, center = 0, levelComp } = params;
    const inArrayList = Array.isArray(inArray) ? inArray : [inArray];
    const inputs: (UGenInput | UGenInput[])[] = [spread, level, center, levelComp, ...inArrayList];
    return multiNew("Splay", Rate.Audio, inputs, 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inArray, spread = 1, level = 1, center = 0, levelComp } = params;
    const inArrayList = Array.isArray(inArray) ? inArray : [inArray];
    const inputs: (UGenInput | UGenInput[])[] = [spread, level, center, levelComp, ...inArrayList];
    return multiNew("Splay", Rate.Control, inputs, 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const SplayAz = {
  ar(params: { numChans?: UGenInput | UGenInput[]; inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans = 4, inArray, spread = 1, level = 1, width = 2, center = 0, orientation = 0.5, levelComp } = params;
    return multiNew("SplayAz", Rate.Audio, [numChans, inArray, spread, level, width, center, orientation, levelComp], 1, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput | UGenOutput[];
  },
  kr(params: { numChans?: UGenInput | UGenInput[]; inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans = 4, inArray, spread = 1, level = 1, width = 2, center = 0, orientation = 0.5, levelComp } = params;
    return multiNew("SplayAz", Rate.Control, [numChans, inArray, spread, level, width, center, orientation, levelComp], 1, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput | UGenOutput[];
  },
};

export const Spring = {
  ar(params: { "in"?: UGenInput | UGenInput[]; spring?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, spring = 1, damp = 0 } = params;
    return multiNew("Spring", Rate.Audio, [in_, spring, damp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; spring?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, spring = 1, damp = 0 } = params;
    return multiNew("Spring", Rate.Control, [in_, spring, damp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const StandardL = {
  ar(params: { freq?: UGenInput | UGenInput[]; k?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, k = 1, xi = 0.5, yi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("StandardL", Rate.Audio, [freq, k, xi, yi], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const StandardN = {
  ar(params: { freq?: UGenInput | UGenInput[]; k?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, k = 1, xi = 0.5, yi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("StandardN", Rate.Audio, [freq, k, xi, yi], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Stepper = {
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; min?: UGenInput | UGenInput[]; max?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; resetval: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0, min = 0, max = 7, step = 1, resetval } = params;
    return multiNew("Stepper", Rate.Audio, [trig, reset, min, max, step, resetval], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; min?: UGenInput | UGenInput[]; max?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; resetval: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0, min = 0, max = 7, step = 1, resetval } = params;
    return multiNew("Stepper", Rate.Control, [trig, reset, min, max, step, resetval], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
};

export const StereoConvolution2L = {
  ar(params: { "in": UGenInput | UGenInput[]; kernelL: UGenInput | UGenInput[]; kernelR: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; crossfade?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[] | UGenOutput[][] {
    const { in: in_, kernelL, kernelR, trigger = 0, framesize = 2048, crossfade = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("StereoConvolution2L", Rate.Audio, [in_, kernelL, kernelR, trigger, framesize, crossfade], 2, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
};

export const SubsampleOffset = {
  ir(params: {  } = {}): UGenOutput | UGenOutput[] {
    const {  } = params;
    return multiNew("SubsampleOffset", Rate.Scalar, [], 1, []) as UGenOutput | UGenOutput[];
  },
};

export const Sweep = {
  ar(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, rate = 1 } = params;
    return multiNew("Sweep", Rate.Audio, [trig, rate], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, rate = 1 } = params;
    return multiNew("Sweep", Rate.Control, [trig, rate], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const SyncSaw = {
  ar(params: { syncFreq?: UGenInput | UGenInput[]; sawFreq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { syncFreq = 440, sawFreq = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("SyncSaw", Rate.Audio, [syncFreq, sawFreq], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { syncFreq?: UGenInput | UGenInput[]; sawFreq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { syncFreq = 440, sawFreq = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("SyncSaw", Rate.Control, [syncFreq, sawFreq], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const T2A = {
  ar(params: { "in"?: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, offset = 0 } = params;
    return multiNew("T2A", Rate.Audio, [in_, offset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const T2K = {
  kr(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("T2K", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const Tap = {
  ar(params: { bufnum?: UGenInput | UGenInput[]; numChannels?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { bufnum = 0, numChannels = 1, delaytime = 0.2 } = params;
    return multiNew("Tap", Rate.Audio, [bufnum, numChannels, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const TBall = {
  ar(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, g = 10, damp = 0, friction = 0.01 } = params;
    return multiNew("TBall", Rate.Audio, [in_, g, damp, friction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, g = 10, damp = 0, friction = 0.01 } = params;
    return multiNew("TBall", Rate.Control, [in_, g, damp, friction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const TDelay = {
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("TDelay", Rate.Audio, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("TDelay", Rate.Control, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const TDuty = {
  ar(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[]; gapFirst?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { dur = 1, reset = 0, level = 1, doneAction = 0, gapFirst = 0 } = params;
    return multiNew("TDuty", Rate.Audio, [dur, reset, level, doneAction, gapFirst], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[]; gapFirst?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { dur = 1, reset = 0, level = 1, doneAction = 0, gapFirst = 0 } = params;
    return multiNew("TDuty", Rate.Control, [dur, reset, level, doneAction, gapFirst], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
};

export const TExpRand = {
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0.01, hi = 1, trig = 0 } = params;
    return multiNew("TExpRand", Rate.Audio, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0.01, hi = 1, trig = 0 } = params;
    return multiNew("TExpRand", Rate.Control, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const TGrains = {
  ar(params: { numChannels: number; trigger?: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; centerPos?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, trigger = 0, bufnum = 0, rate = 1, centerPos = 0, dur = 0.1, pan = 0, amp = 0.1, interp = 4 } = params;
    return multiNew("TGrains", Rate.Audio, [trigger, bufnum, rate, centerPos, dur, pan, amp, interp], numChannels, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput[] | UGenOutput[][];
  },
};

export const Timer = {
  ar(params: { trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0 } = params;
    return multiNew("Timer", Rate.Audio, [trig], 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0 } = params;
    return multiNew("Timer", Rate.Control, [trig], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const TIRand = {
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 127, trig = 0 } = params;
    return multiNew("TIRand", Rate.Audio, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 127, trig = 0 } = params;
    return multiNew("TIRand", Rate.Control, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const ToggleFF = {
  ar(params: { trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0 } = params;
    return multiNew("ToggleFF", Rate.Audio, [trig], 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0 } = params;
    return multiNew("ToggleFF", Rate.Control, [trig], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

export const TRand = {
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, trig = 0 } = params;
    return multiNew("TRand", Rate.Audio, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, trig = 0 } = params;
    return multiNew("TRand", Rate.Control, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const Trig = {
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("Trig", Rate.Audio, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("Trig", Rate.Control, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const Trig1 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("Trig1", Rate.Audio, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("Trig1", Rate.Control, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const TWindex = {
  ar(params: { "in": UGenInput | UGenInput[]; array: UGenInput | UGenInput[]; normalize?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, array, normalize = 0 } = params;
    const arrayList = Array.isArray(array) ? array : [array];
    const inputs: (UGenInput | UGenInput[])[] = [in_, normalize, ...arrayList];
    return multiNew("TWindex", Rate.Audio, inputs, 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; array: UGenInput | UGenInput[]; normalize?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, array, normalize = 0 } = params;
    const arrayList = Array.isArray(array) ? array : [array];
    const inputs: (UGenInput | UGenInput[])[] = [in_, normalize, ...arrayList];
    return multiNew("TWindex", Rate.Control, inputs, 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
};

export const TwoPole = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, radius = 0.8, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("TwoPole", Rate.Audio, [in_, freq, radius], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, radius = 0.8, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("TwoPole", Rate.Control, [in_, freq, radius], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const TwoZero = {
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, radius = 0.8, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("TwoZero", Rate.Audio, [in_, freq, radius], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, freq = 440, radius = 0.8, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("TwoZero", Rate.Control, [in_, freq, radius], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Unpack1FFT = {
  new(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; binindex: UGenInput | UGenInput[]; whichmeasure?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, bufsize, binindex, whichmeasure = 0 } = params;
    return multiNew("Unpack1FFT", Rate.Scalar, [chain, bufsize, binindex, whichmeasure], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const UnpackFFT = {
  new(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; frombin?: UGenInput | UGenInput[]; tobin: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, bufsize, frombin = 0, tobin } = params;
    return multiNew("UnpackFFT", Rate.Scalar, [chain, bufsize, frombin, tobin], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const VarLag = {
  ar(params: { "in"?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; curvature?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; start: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, time = 0.1, curvature = 0, warp = 5, start, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("VarLag", Rate.Audio, [in_, time, curvature, warp, start], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; curvature?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; start: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, time = 0.1, curvature = 0, warp = 5, start, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("VarLag", Rate.Control, [in_, time, curvature, warp, start], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const VarSaw = {
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, width = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("VarSaw", Rate.Audio, [freq, iphase, width], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, iphase = 0, width = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("VarSaw", Rate.Control, [freq, iphase, width], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const VDiskIn = {
  ar(params: { numChannels: number; bufnum: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; sendID?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum, rate = 1, loop = 0, sendID = 0 } = params;
    return multiNew("VDiskIn", Rate.Audio, [bufnum, rate, loop, sendID], numChannels, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
};

export const Vibrato = {
  ar(params: { freq?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; depth?: UGenInput | UGenInput[]; delay?: UGenInput | UGenInput[]; onset?: UGenInput | UGenInput[]; rateVariation?: UGenInput | UGenInput[]; depthVariation?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, rate = 6, depth = 0.02, delay = 0, onset = 0, rateVariation = 0.04, depthVariation = 0.1, iphase = 0, trig = 0 } = params;
    return multiNew("Vibrato", Rate.Audio, [freq, rate, depth, delay, onset, rateVariation, depthVariation, iphase, trig], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; depth?: UGenInput | UGenInput[]; delay?: UGenInput | UGenInput[]; onset?: UGenInput | UGenInput[]; rateVariation?: UGenInput | UGenInput[]; depthVariation?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, rate = 6, depth = 0.02, delay = 0, onset = 0, rateVariation = 0.04, depthVariation = 0.1, iphase = 0, trig = 0 } = params;
    return multiNew("Vibrato", Rate.Control, [freq, rate, depth, delay, onset, rateVariation, depthVariation, iphase, trig], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput | UGenOutput[];
  },
};

export const VOsc = {
  ar(params: { bufpos: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufpos, freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("VOsc", Rate.Audio, [bufpos, freq, phase], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufpos: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufpos, freq = 440, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("VOsc", Rate.Control, [bufpos, freq, phase], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const VOsc3 = {
  ar(params: { bufpos: UGenInput | UGenInput[]; freq1?: UGenInput | UGenInput[]; freq2?: UGenInput | UGenInput[]; freq3?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufpos, freq1 = 110, freq2 = 220, freq3 = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("VOsc3", Rate.Audio, [bufpos, freq1, freq2, freq3], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufpos: UGenInput | UGenInput[]; freq1?: UGenInput | UGenInput[]; freq2?: UGenInput | UGenInput[]; freq3?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufpos, freq1 = 110, freq2 = 220, freq3 = 440, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("VOsc3", Rate.Control, [bufpos, freq1, freq2, freq3], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Warp1 = {
  ar(params: { numChannels?: number; bufnum?: UGenInput | UGenInput[]; pointer?: UGenInput | UGenInput[]; freqScale?: UGenInput | UGenInput[]; windowSize?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; overlaps?: UGenInput | UGenInput[]; windowRandRatio?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, bufnum = 0, pointer = 0, freqScale = 1, windowSize = 0.2, envbufnum = -1, overlaps = 8, windowRandRatio = 0, interp = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Warp1", Rate.Audio, [bufnum, pointer, freqScale, windowSize, envbufnum, overlaps, windowRandRatio, interp], numChannels, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
};

export const WhiteNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("WhiteNoise", Rate.Audio, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("WhiteNoise", Rate.Control, [], 1, []) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const Wrap = {
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, lo = 0, hi = 1 } = params;
    return multiNew("Wrap", Rate.Audio, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("Wrap", Rate.Control, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, lo = 0, hi = 1 } = params;
    return multiNew("Wrap", Rate.Scalar, [in_, lo, hi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
};

export const WrapIndex = {
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("WrapIndex", Rate.Audio, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { bufnum, in: in_ = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("WrapIndex", Rate.Control, [bufnum, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const XFade2 = {
  ar(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inA, inB = 0, pan = 0, level = 1 } = params;
    return multiNew("XFade2", Rate.Audio, [inA, inB, pan, level], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inA, inB = 0, pan = 0, level = 1 } = params;
    return multiNew("XFade2", Rate.Control, [inA, inB, pan, level], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
};

export const XLine = {
  ar(params: { start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { start = 1, end = 2, dur = 1, mul = 1, add = 0, doneAction = 0 } = params;
    const ugenOutput = multiNew("XLine", Rate.Audio, [start, end, dur, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
  kr(params: { start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { start = 1, end = 2, dur = 1, mul = 1, add = 0, doneAction = 0 } = params;
    const ugenOutput = multiNew("XLine", Rate.Control, [start, end, dur, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
};

export const XOut = {
  ar(params: { bus: UGenInput; xfade: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { bus, xfade, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [bus, xfade, ...channelsArrayList];
    newUGen("XOut", Rate.Audio, inputs as UGenInput[], 0);
  },
  kr(params: { bus: UGenInput; xfade: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { bus, xfade, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [bus, xfade, ...channelsArrayList];
    newUGen("XOut", Rate.Control, inputs as UGenInput[], 0);
  },
};

export const ZeroCrossing = {
  ar(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("ZeroCrossing", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("ZeroCrossing", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
};

