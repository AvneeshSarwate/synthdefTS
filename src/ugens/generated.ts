import { Rate, UGenInput, UGenOutput, Stereo, Trio, Quad } from "../graph/types.ts";
import { multiNew, newUGen } from "./core.ts";
import { applyMulAdd } from "./ops.ts";
import { getActiveBuilder } from "../graph/context.ts";

interface A2KType {
  kr(params?: { "in"?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const A2K = {
  kr(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("A2K", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as A2KType;

interface AccelerometerXType {
  kr(params?: { minval?: UGenInput; maxval?: UGenInput; warp?: UGenInput; lag?: UGenInput }): UGenOutput;
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const AccelerometerX = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("AccelerometerX", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as AccelerometerXType;

interface AccelerometerYType {
  kr(params?: { minval?: UGenInput; maxval?: UGenInput; warp?: UGenInput; lag?: UGenInput }): UGenOutput;
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const AccelerometerY = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("AccelerometerY", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as AccelerometerYType;

interface AccelerometerZType {
  kr(params?: { minval?: UGenInput; maxval?: UGenInput; warp?: UGenInput; lag?: UGenInput }): UGenOutput;
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const AccelerometerZ = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("AccelerometerZ", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as AccelerometerZType;

interface AllpassCType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as AllpassCType;

interface AllpassLType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as AllpassLType;

interface AllpassNType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as AllpassNType;

interface AmpCompType {
  ar(params: { freq: UGenInput; root: UGenInput; exp?: UGenInput }): UGenOutput;
  ar(params: { freq: UGenInput | UGenInput[]; root: UGenInput | UGenInput[]; exp?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { freq: UGenInput; root: UGenInput; exp?: UGenInput }): UGenOutput;
  kr(params: { freq: UGenInput | UGenInput[]; root: UGenInput | UGenInput[]; exp?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params: { freq: UGenInput; root: UGenInput; exp?: UGenInput }): UGenOutput;
  ir(params: { freq: UGenInput | UGenInput[]; root: UGenInput | UGenInput[]; exp?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as AmpCompType;

interface AmpCompAType {
  ar(params?: { freq?: UGenInput; root?: UGenInput; minAmp?: UGenInput; rootAmp?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; root?: UGenInput | UGenInput[]; minAmp?: UGenInput | UGenInput[]; rootAmp?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { freq?: UGenInput; root?: UGenInput; minAmp?: UGenInput; rootAmp?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; root?: UGenInput | UGenInput[]; minAmp?: UGenInput | UGenInput[]; rootAmp?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { freq?: UGenInput; root?: UGenInput; minAmp?: UGenInput; rootAmp?: UGenInput }): UGenOutput;
  ir(params: { freq?: UGenInput | UGenInput[]; root?: UGenInput | UGenInput[]; minAmp?: UGenInput | UGenInput[]; rootAmp?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as AmpCompAType;

interface AmplitudeType {
  ar(params?: { "in"?: UGenInput; attackTime?: UGenInput; releaseTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; releaseTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; attackTime?: UGenInput; releaseTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; releaseTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as AmplitudeType;

interface AnalogInType {
  ar(params?: { analogPin?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { analogPin?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { analogPin?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { analogPin?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as AnalogInType;

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

interface APFType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; radius?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; radius?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as APFType;

interface Balance2Type {
  ar(params: { left: UGenInput; right: UGenInput; pos?: UGenInput; level?: UGenInput }): Stereo;
  ar(params: { left: UGenInput | UGenInput[]; right: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo[];
  kr(params: { left: UGenInput; right: UGenInput; pos?: UGenInput; level?: UGenInput }): Stereo;
  kr(params: { left: UGenInput | UGenInput[]; right: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo[];
}

export const Balance2 = {
  ar(params: { left: UGenInput | UGenInput[]; right: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo | Stereo[] {
    const { left, right, pos = 0, level = 1 } = params;
    return multiNew("Balance2", Rate.Audio, [left, right, pos, level], 2, [0, 1, 2, 3]) as Stereo | Stereo[];
  },
  kr(params: { left: UGenInput | UGenInput[]; right: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo | Stereo[] {
    const { left, right, pos = 0, level = 1 } = params;
    return multiNew("Balance2", Rate.Control, [left, right, pos, level], 2, [0, 1, 2, 3]) as Stereo | Stereo[];
  },
} as unknown as Balance2Type;

interface BallType {
  ar(params?: { "in"?: UGenInput; g?: UGenInput; damp?: UGenInput; friction?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; g?: UGenInput; damp?: UGenInput; friction?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Ball = {
  ar(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, g = 1, damp = 0, friction = 0.01 } = params;
    return multiNew("Ball", Rate.Audio, [in_, g, damp, friction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, g = 1, damp = 0, friction = 0.01 } = params;
    return multiNew("Ball", Rate.Control, [in_, g, damp, friction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as BallType;

interface BAllPassType {
  ar(params: { "in": UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BAllPass = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BAllPass", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BAllPassType;

interface BBandPassType {
  ar(params: { "in": UGenInput; freq?: UGenInput; bw?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bw?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BBandPass = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bw?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, bw = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BBandPass", Rate.Audio, [in_, freq, bw], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BBandPassType;

interface BBandStopType {
  ar(params: { "in": UGenInput; freq?: UGenInput; bw?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bw?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BBandStop = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bw?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, bw = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BBandStop", Rate.Audio, [in_, freq, bw], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BBandStopType;

interface BeatTrackType {
  kr(params: { chain: UGenInput; lock?: UGenInput }): UGenOutput;
  kr(params: { chain: UGenInput | UGenInput[]; lock?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BeatTrack = {
  kr(params: { chain: UGenInput | UGenInput[]; lock?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, lock = 0 } = params;
    return multiNew("BeatTrack", Rate.Control, [chain, lock], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as BeatTrackType;

interface BeatTrack2Type {
  kr(params: { busindex: UGenInput; numfeatures: UGenInput; windowsize?: UGenInput; phaseaccuracy?: UGenInput; lock?: UGenInput; weightingscheme: UGenInput }): UGenOutput;
  kr(params: { busindex: UGenInput | UGenInput[]; numfeatures: UGenInput | UGenInput[]; windowsize?: UGenInput | UGenInput[]; phaseaccuracy?: UGenInput | UGenInput[]; lock?: UGenInput | UGenInput[]; weightingscheme: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BeatTrack2 = {
  kr(params: { busindex: UGenInput | UGenInput[]; numfeatures: UGenInput | UGenInput[]; windowsize?: UGenInput | UGenInput[]; phaseaccuracy?: UGenInput | UGenInput[]; lock?: UGenInput | UGenInput[]; weightingscheme: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { busindex, numfeatures, windowsize = 2, phaseaccuracy = 0.02, lock = 0, weightingscheme } = params;
    return multiNew("BeatTrack2", Rate.Control, [busindex, numfeatures, windowsize, phaseaccuracy, lock, weightingscheme], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
} as unknown as BeatTrack2Type;

export const BelaScopeOut = {
  ar(params: { offset?: UGenInput; channelsArray: UGenInput | UGenInput[] }): void {
    const { offset = 0, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: UGenInput[] = [offset, ...channelsArrayList];
    newUGen("BelaScopeOut", Rate.Audio, inputs as UGenInput[], 0);
  },
};

interface BHiPassType {
  ar(params: { "in": UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BHiPass = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BHiPass", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BHiPassType;

interface BHiShelfType {
  ar(params: { "in": UGenInput; freq?: UGenInput; rs?: UGenInput; db?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rs?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BHiShelf = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rs?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rs = 1, db = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BHiShelf", Rate.Audio, [in_, freq, rs, db], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BHiShelfType;

interface BiPanB2Type {
  ar(params: { inA: UGenInput; inB: UGenInput; azimuth: UGenInput; gain?: UGenInput }): Trio;
  ar(params: { inA: UGenInput | UGenInput[]; inB: UGenInput | UGenInput[]; azimuth: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Trio[];
  kr(params: { inA: UGenInput; inB: UGenInput; azimuth: UGenInput; gain?: UGenInput }): Trio;
  kr(params: { inA: UGenInput | UGenInput[]; inB: UGenInput | UGenInput[]; azimuth: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Trio[];
}

export const BiPanB2 = {
  ar(params: { inA: UGenInput | UGenInput[]; inB: UGenInput | UGenInput[]; azimuth: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Trio | Trio[] {
    const { inA, inB, azimuth, gain = 1 } = params;
    return multiNew("BiPanB2", Rate.Audio, [inA, inB, azimuth, gain], 3, [0, 1, 2, 3]) as Trio | Trio[];
  },
  kr(params: { inA: UGenInput | UGenInput[]; inB: UGenInput | UGenInput[]; azimuth: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Trio | Trio[] {
    const { inA, inB, azimuth, gain = 1 } = params;
    return multiNew("BiPanB2", Rate.Control, [inA, inB, azimuth, gain], 3, [0, 1, 2, 3]) as Trio | Trio[];
  },
} as unknown as BiPanB2Type;

interface BlipType {
  ar(params?: { freq?: UGenInput; numharm?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; numharm?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; numharm?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; numharm?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as BlipType;

export const BlockSize = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("BlockSize", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

interface BLowPassType {
  ar(params: { "in": UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BLowPass = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rq = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BLowPass", Rate.Audio, [in_, freq, rq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BLowPassType;

interface BLowShelfType {
  ar(params: { "in": UGenInput; freq?: UGenInput; rs?: UGenInput; db?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rs?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BLowShelf = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rs?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rs = 1, db = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BLowShelf", Rate.Audio, [in_, freq, rs, db], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BLowShelfType;

interface BPeakEQType {
  ar(params: { "in": UGenInput; freq?: UGenInput; rq?: UGenInput; db?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BPeakEQ = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 1200, rq = 1, db = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BPeakEQ", Rate.Audio, [in_, freq, rq, db], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BPeakEQType;

interface BPFType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as BPFType;

interface BPZ2Type {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as BPZ2Type;

interface BRFType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as BRFType;

export const BrownNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BrownNoise", Rate.Audio, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BrownNoise", Rate.Control, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
};

interface BRZ2Type {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as BRZ2Type;

interface BufAllpassCType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BufAllpassC = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufAllpassC", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BufAllpassCType;

interface BufAllpassLType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BufAllpassL = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufAllpassL", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BufAllpassLType;

interface BufAllpassNType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BufAllpassN = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufAllpassN", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BufAllpassNType;

interface BufChannelsType {
  kr(params: { bufnum: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params: { bufnum: UGenInput }): UGenOutput;
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BufChannels = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufChannels", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufChannels", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as BufChannelsType;

interface BufCombCType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BufCombC = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufCombC", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BufCombCType;

interface BufCombLType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BufCombL = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufCombL", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BufCombLType;

interface BufCombNType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const BufCombN = {
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { buf = 0, in: in_ = 0, delaytime = 0.2, decaytime = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("BufCombN", Rate.Audio, [buf, in_, delaytime, decaytime], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as BufCombNType;

interface BufDelayCType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as BufDelayCType;

interface BufDelayLType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as BufDelayLType;

interface BufDelayNType {
  ar(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { buf?: UGenInput; "in"?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { buf?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as BufDelayNType;

interface BufDurType {
  kr(params: { bufnum: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params: { bufnum: UGenInput }): UGenOutput;
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BufDur = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufDur", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufDur", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as BufDurType;

interface BufFramesType {
  kr(params: { bufnum: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params: { bufnum: UGenInput }): UGenOutput;
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BufFrames = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufFrames", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufFrames", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as BufFramesType;

interface BufInfoUGenBaseType {
  kr(params: { bufnum: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params: { bufnum: UGenInput }): UGenOutput;
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BufInfoUGenBase = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufInfoUGenBase", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufInfoUGenBase", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as BufInfoUGenBaseType;

interface BufRateScaleType {
  kr(params: { bufnum: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params: { bufnum: UGenInput }): UGenOutput;
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BufRateScale = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufRateScale", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufRateScale", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as BufRateScaleType;

interface BufRdType {
  ar(params: { numChannels: number; bufnum?: UGenInput; phase?: UGenInput; loop?: UGenInput; interpolation?: UGenInput }): UGenOutput[];
  ar(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; interpolation?: UGenInput | UGenInput[] }): UGenOutput[][];
  kr(params: { numChannels: number; bufnum?: UGenInput; phase?: UGenInput; loop?: UGenInput; interpolation?: UGenInput }): UGenOutput[];
  kr(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; interpolation?: UGenInput | UGenInput[] }): UGenOutput[][];
}

export const BufRd = {
  ar(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; interpolation?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum = 0, phase = 0, loop = 1, interpolation = 2 } = params;
    return multiNew("BufRd", Rate.Audio, [bufnum, phase, loop, interpolation], numChannels, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; interpolation?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum = 0, phase = 0, loop = 1, interpolation = 2 } = params;
    return multiNew("BufRd", Rate.Control, [bufnum, phase, loop, interpolation], numChannels, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as BufRdType;

interface BufSampleRateType {
  kr(params: { bufnum: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params: { bufnum: UGenInput }): UGenOutput;
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BufSampleRate = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufSampleRate", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufSampleRate", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as BufSampleRateType;

interface BufSamplesType {
  kr(params: { bufnum: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params: { bufnum: UGenInput }): UGenOutput;
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput[];
}

export const BufSamples = {
  kr(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufSamples", Rate.Control, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { bufnum: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum } = params;
    return multiNew("BufSamples", Rate.Scalar, [bufnum], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as BufSamplesType;

interface BufWrType {
  ar(params: { inputArray: UGenInput; bufnum?: UGenInput; phase?: UGenInput; loop?: UGenInput }): UGenOutput;
  ar(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { inputArray: UGenInput; bufnum?: UGenInput; phase?: UGenInput; loop?: UGenInput }): UGenOutput;
  kr(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as BufWrType;

interface ChangedType {
  ar(params: { input: UGenInput; threshold?: UGenInput }): UGenOutput;
  ar(params: { input: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { input: UGenInput; threshold?: UGenInput }): UGenOutput;
  kr(params: { input: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Changed = {
  ar(params: { input: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { input, threshold = 0 } = params;
    return multiNew("Changed", Rate.Audio, [input, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { input: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { input, threshold = 0 } = params;
    return multiNew("Changed", Rate.Control, [input, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as ChangedType;

interface CheckBadValuesType {
  ar(params?: { "in"?: UGenInput; id?: UGenInput; post?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; id?: UGenInput | UGenInput[]; post?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; id?: UGenInput; post?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; id?: UGenInput | UGenInput[]; post?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const CheckBadValues = {
  ar(params: { "in"?: UGenInput | UGenInput[]; id?: UGenInput | UGenInput[]; post?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, id = 0, post = 2 } = params;
    return multiNew("CheckBadValues", Rate.Audio, [in_, id, post], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; id?: UGenInput | UGenInput[]; post?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, id = 0, post = 2 } = params;
    return multiNew("CheckBadValues", Rate.Control, [in_, id, post], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as CheckBadValuesType;

interface ClearBufType {
  "new"(params: { buf: UGenInput }): UGenOutput;
  "new"(params: { buf: UGenInput | UGenInput[] }): UGenOutput[];
}

export const ClearBuf = {
  new(params: { buf: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buf } = params;
    return multiNew("ClearBuf", Rate.Scalar, [buf], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as ClearBufType;

interface ClipType {
  ar(params: { "in": UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as ClipType;

export const ClipNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("ClipNoise", Rate.Audio, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("ClipNoise", Rate.Control, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
};

interface CoinGateType {
  ar(params: { prob: UGenInput; "in": UGenInput }): UGenOutput;
  ar(params: { prob: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { prob: UGenInput; "in": UGenInput }): UGenOutput;
  kr(params: { prob: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput[];
}

export const CoinGate = {
  ar(params: { prob: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { prob, in: in_ } = params;
    return multiNew("CoinGate", Rate.Audio, [prob, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { prob: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { prob, in: in_ } = params;
    return multiNew("CoinGate", Rate.Control, [prob, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as CoinGateType;

interface CombCType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as CombCType;

interface CombLType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as CombLType;

interface CombNType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as CombNType;

interface CompanderType {
  ar(params?: { "in"?: UGenInput; control?: UGenInput; thresh?: UGenInput; slopeBelow?: UGenInput; slopeAbove?: UGenInput; clampTime?: UGenInput; relaxTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; control?: UGenInput | UGenInput[]; thresh?: UGenInput | UGenInput[]; slopeBelow?: UGenInput | UGenInput[]; slopeAbove?: UGenInput | UGenInput[]; clampTime?: UGenInput | UGenInput[]; relaxTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const Compander = {
  ar(params: { "in"?: UGenInput | UGenInput[]; control?: UGenInput | UGenInput[]; thresh?: UGenInput | UGenInput[]; slopeBelow?: UGenInput | UGenInput[]; slopeAbove?: UGenInput | UGenInput[]; clampTime?: UGenInput | UGenInput[]; relaxTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, control = 0, thresh = 0.5, slopeBelow = 1, slopeAbove = 1, clampTime = 0.01, relaxTime = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Compander", Rate.Audio, [in_, control, thresh, slopeBelow, slopeAbove, clampTime, relaxTime], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as CompanderType;

interface CompanderDType {
  ar(params?: { "in"?: UGenInput; thresh?: UGenInput; slopeBelow?: UGenInput; slopeAbove?: UGenInput; clampTime?: UGenInput; relaxTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; thresh?: UGenInput | UGenInput[]; slopeBelow?: UGenInput | UGenInput[]; slopeAbove?: UGenInput | UGenInput[]; clampTime?: UGenInput | UGenInput[]; relaxTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const CompanderD = {
  ar(params: { "in"?: UGenInput | UGenInput[]; thresh?: UGenInput | UGenInput[]; slopeBelow?: UGenInput | UGenInput[]; slopeAbove?: UGenInput | UGenInput[]; clampTime?: UGenInput | UGenInput[]; relaxTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, thresh = 0.5, slopeBelow = 1, slopeAbove = 1, clampTime = 0.01, relaxTime = 0.01, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CompanderD", Rate.Audio, [in_, thresh, slopeBelow, slopeAbove, clampTime, relaxTime], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as CompanderDType;

export const ControlDur = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("ControlDur", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

export const ControlRate = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("ControlRate", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

interface ConvolutionType {
  ar(params: { "in": UGenInput; kernel: UGenInput; framesize?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const Convolution = {
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, kernel, framesize = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Convolution", Rate.Audio, [in_, kernel, framesize], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as ConvolutionType;

interface Convolution2Type {
  ar(params: { "in": UGenInput; kernel: UGenInput; trigger?: UGenInput; framesize?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const Convolution2 = {
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, kernel, trigger = 0, framesize = 2048, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Convolution2", Rate.Audio, [in_, kernel, trigger, framesize], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as Convolution2Type;

interface Convolution2LType {
  ar(params: { "in": UGenInput; kernel: UGenInput; trigger?: UGenInput; framesize?: UGenInput; crossfade?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; crossfade?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const Convolution2L = {
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; crossfade?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, kernel, trigger = 0, framesize = 2048, crossfade = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Convolution2L", Rate.Audio, [in_, kernel, trigger, framesize, crossfade], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as Convolution2LType;

interface Convolution3Type {
  ar(params: { "in": UGenInput; kernel: UGenInput; trigger?: UGenInput; framesize?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { "in": UGenInput; kernel: UGenInput; trigger?: UGenInput; framesize?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in": UGenInput | UGenInput[]; kernel: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Convolution3Type;

interface COscType {
  ar(params: { bufnum: UGenInput; freq?: UGenInput; beats?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; beats?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; freq?: UGenInput; beats?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; beats?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as COscType;

interface CrackleType {
  ar(params?: { chaosParam?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { chaosParam?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { chaosParam?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { chaosParam?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as CrackleType;

interface CuspLType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; xi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const CuspL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 1.9, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CuspL", Rate.Audio, [freq, a, b, xi], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as CuspLType;

interface CuspNType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; xi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const CuspN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 1.9, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("CuspN", Rate.Audio, [freq, a, b, xi], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as CuspNType;

interface DbrownType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput; step?: UGenInput; length?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dbrown = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, step = 0.01, length = Infinity } = params;
    return multiNew("Dbrown", Rate.Demand, [lo, hi, step, length], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as DbrownType;

interface DbufrdType {
  "new"(params?: { bufnum?: UGenInput; phase?: UGenInput; loop?: UGenInput }): UGenOutput;
  "new"(params: { bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dbufrd = {
  new(params: { bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { bufnum = 0, phase = 0, loop = 1 } = params;
    return multiNew("Dbufrd", Rate.Demand, [bufnum, phase, loop], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as DbufrdType;

interface DbufwrType {
  "new"(params?: { input?: UGenInput; bufnum?: UGenInput; phase?: UGenInput; loop?: UGenInput }): UGenOutput;
  "new"(params: { input?: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dbufwr = {
  new(params: { input?: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { input = 0, bufnum = 0, phase = 0, loop = 1 } = params;
    return multiNew("Dbufwr", Rate.Demand, [input, bufnum, phase, loop], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as DbufwrType;

interface DCType {
  ar(params?: { "in"?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const DC = {
  ar(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("DC", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("DC", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DCType;

interface DconstType {
  "new"(params: { sum: UGenInput; "in": UGenInput; tolerance?: UGenInput }): UGenOutput;
  "new"(params: { sum: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; tolerance?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dconst = {
  new(params: { sum: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; tolerance?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { sum, in: in_, tolerance = 0.001 } = params;
    return multiNew("Dconst", Rate.Demand, [sum, in_, tolerance], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as DconstType;

interface DdupType {
  "new"(params: { n: UGenInput; "in": UGenInput }): UGenOutput;
  "new"(params: { n: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput[];
}

export const Ddup = {
  new(params: { n: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { n, in: in_ } = params;
    return multiNew("Ddup", Rate.Demand, [n, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as DdupType;

interface DecayType {
  ar(params?: { "in"?: UGenInput; decayTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; decayTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; decayTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; decayTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DecayType;

interface Decay2Type {
  ar(params?: { "in"?: UGenInput; attackTime?: UGenInput; decayTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; decayTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; attackTime?: UGenInput; decayTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; decayTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Decay2Type;

interface DecodeB2Type {
  ar(params: { numChans: UGenInput; w: UGenInput; x: UGenInput; y: UGenInput; orientation?: UGenInput }): UGenOutput;
  ar(params: { numChans: UGenInput | UGenInput[]; w: UGenInput | UGenInput[]; x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { numChans: UGenInput; w: UGenInput; x: UGenInput; y: UGenInput; orientation?: UGenInput }): UGenOutput;
  kr(params: { numChans: UGenInput | UGenInput[]; w: UGenInput | UGenInput[]; x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const DecodeB2 = {
  ar(params: { numChans: UGenInput | UGenInput[]; w: UGenInput | UGenInput[]; x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans, w, x, y, orientation = 0.5 } = params;
    return multiNew("DecodeB2", Rate.Audio, [numChans, w, x, y, orientation], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { numChans: UGenInput | UGenInput[]; w: UGenInput | UGenInput[]; x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans, w, x, y, orientation = 0.5 } = params;
    return multiNew("DecodeB2", Rate.Control, [numChans, w, x, y, orientation], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as DecodeB2Type;

interface DegreeToKeyType {
  ar(params: { bufnum: UGenInput; "in"?: UGenInput; octave?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; octave?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; "in"?: UGenInput; octave?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; octave?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DegreeToKeyType;

interface Delay1Type {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput; x1?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; x1?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput; x1: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; x1: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as Delay1Type;

interface Delay2Type {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput; x1?: UGenInput; x2?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; x1?: UGenInput | UGenInput[]; x2?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput; x1: UGenInput; x2: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; x1: UGenInput | UGenInput[]; x2: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as Delay2Type;

interface DelayCType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DelayCType;

interface DelayLType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DelayLType;

interface DelayNType {
  ar(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DelayNType;

interface DelTapRdType {
  ar(params: { buffer: UGenInput; phase: UGenInput; delTime: UGenInput; interp?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { buffer: UGenInput | UGenInput[]; phase: UGenInput | UGenInput[]; delTime: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { buffer: UGenInput; phase: UGenInput; delTime: UGenInput; interp?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { buffer: UGenInput | UGenInput[]; phase: UGenInput | UGenInput[]; delTime: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DelTapRdType;

interface DelTapWrType {
  ar(params: { buffer: UGenInput; "in": UGenInput }): UGenOutput;
  ar(params: { buffer: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { buffer: UGenInput; "in": UGenInput }): UGenOutput;
  kr(params: { buffer: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput[];
}

export const DelTapWr = {
  ar(params: { buffer: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, in: in_ } = params;
    return multiNew("DelTapWr", Rate.Audio, [buffer, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { buffer: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, in: in_ } = params;
    return multiNew("DelTapWr", Rate.Control, [buffer, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as DelTapWrType;

interface DemandType {
  ar(params: { trig: UGenInput; reset: UGenInput; demandUGens: UGenInput }): UGenOutput;
  ar(params: { trig: UGenInput | UGenInput[]; reset: UGenInput | UGenInput[]; demandUGens: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { trig: UGenInput; reset: UGenInput; demandUGens: UGenInput }): UGenOutput;
  kr(params: { trig: UGenInput | UGenInput[]; reset: UGenInput | UGenInput[]; demandUGens: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as DemandType;

interface DemandEnvGenType {
  ar(params: { level: UGenInput; dur: UGenInput; shape?: UGenInput; curve?: UGenInput; gate?: UGenInput; reset?: UGenInput; levelScale?: UGenInput; levelBias?: UGenInput; timeScale?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  ar(params: { level: UGenInput | UGenInput[]; dur: UGenInput | UGenInput[]; shape?: UGenInput | UGenInput[]; curve?: UGenInput | UGenInput[]; gate?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; levelScale?: UGenInput | UGenInput[]; levelBias?: UGenInput | UGenInput[]; timeScale?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { level: UGenInput; dur: UGenInput; shape?: UGenInput; curve?: UGenInput; gate?: UGenInput; reset?: UGenInput; levelScale?: UGenInput; levelBias?: UGenInput; timeScale?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  kr(params: { level: UGenInput | UGenInput[]; dur: UGenInput | UGenInput[]; shape?: UGenInput | UGenInput[]; curve?: UGenInput | UGenInput[]; gate?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; levelScale?: UGenInput | UGenInput[]; levelBias?: UGenInput | UGenInput[]; timeScale?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const DemandEnvGen = {
  ar(params: { level: UGenInput | UGenInput[]; dur: UGenInput | UGenInput[]; shape?: UGenInput | UGenInput[]; curve?: UGenInput | UGenInput[]; gate?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; levelScale?: UGenInput | UGenInput[]; levelBias?: UGenInput | UGenInput[]; timeScale?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { level, dur, shape = 1, curve = 0, gate = 1, reset = 1, levelScale = 1, levelBias = 0, timeScale = 1, doneAction = 0 } = params;
    return multiNew("DemandEnvGen", Rate.Audio, [level, dur, shape, curve, gate, reset, levelScale, levelBias, timeScale, doneAction], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) as UGenOutput | UGenOutput[];
  },
  kr(params: { level: UGenInput | UGenInput[]; dur: UGenInput | UGenInput[]; shape?: UGenInput | UGenInput[]; curve?: UGenInput | UGenInput[]; gate?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; levelScale?: UGenInput | UGenInput[]; levelBias?: UGenInput | UGenInput[]; timeScale?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { level, dur, shape = 1, curve = 0, gate = 1, reset = 1, levelScale = 1, levelBias = 0, timeScale = 1, doneAction = 0 } = params;
    return multiNew("DemandEnvGen", Rate.Control, [level, dur, shape, curve, gate, reset, levelScale, levelBias, timeScale, doneAction], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) as UGenOutput | UGenOutput[];
  },
} as unknown as DemandEnvGenType;

interface DetectIndexType {
  ar(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DetectIndexType;

interface DetectSilenceType {
  ar(params?: { "in"?: UGenInput; amp?: UGenInput; time?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; amp?: UGenInput; time?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const DetectSilence = {
  ar(params: { "in"?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, amp = 0.0001, time = 0.1, doneAction = 0 } = params;
    return multiNew("DetectSilence", Rate.Audio, [in_, amp, time, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, amp = 0.0001, time = 0.1, doneAction = 0 } = params;
    return multiNew("DetectSilence", Rate.Control, [in_, amp, time, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as DetectSilenceType;

interface DgeomType {
  "new"(params?: { start?: UGenInput; grow?: UGenInput; length?: UGenInput }): UGenOutput;
  "new"(params: { start?: UGenInput | UGenInput[]; grow?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dgeom = {
  new(params: { start?: UGenInput | UGenInput[]; grow?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { start = 1, grow = 2, length = Infinity } = params;
    return multiNew("Dgeom", Rate.Demand, [start, grow, length], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as DgeomType;

interface DibrownType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput; step?: UGenInput; length?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dibrown = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, step = 0.01, length = Infinity } = params;
    return multiNew("Dibrown", Rate.Demand, [lo, hi, step, length], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as DibrownType;

interface DigitalInType {
  ar(params?: { digitalPin?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { digitalPin?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { digitalPin?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { digitalPin?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DigitalInType;

interface DigitalIOType {
  ar(params?: { digitalPin?: UGenInput; output?: UGenInput; pinMode?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { digitalPin?: UGenInput | UGenInput[]; output?: UGenInput | UGenInput[]; pinMode?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { digitalPin?: UGenInput; output?: UGenInput; pinMode?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { digitalPin?: UGenInput | UGenInput[]; output?: UGenInput | UGenInput[]; pinMode?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DigitalIOType;

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

interface DiskInType {
  ar(params: { numChannels: number; bufnum: UGenInput; loop?: UGenInput }): UGenOutput[];
  ar(params: { numChannels: number; bufnum: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput[][];
}

export const DiskIn = {
  ar(params: { numChannels: number; bufnum: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum, loop = 0 } = params;
    return multiNew("DiskIn", Rate.Audio, [bufnum, loop], numChannels, [0, 1]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as DiskInType;

interface DiskOutType {
  ar(params: { bufnum: UGenInput; channelsArray: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; channelsArray: UGenInput | UGenInput[] }): UGenOutput[];
}

export const DiskOut = {
  ar(params: { bufnum: UGenInput | UGenInput[]; channelsArray: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufnum, channelsArray } = params;
    const channelsArrayList = Array.isArray(channelsArray) ? channelsArray : [channelsArray];
    const inputs: (UGenInput | UGenInput[])[] = [bufnum, ...channelsArrayList];
    return multiNew("DiskOut", Rate.Audio, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DiskOutType;

interface DiwhiteType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput; length?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Diwhite = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, length = Infinity } = params;
    return multiNew("Diwhite", Rate.Demand, [lo, hi, length], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as DiwhiteType;

interface DoneType {
  kr(params: { src: UGenInput }): UGenOutput;
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Done = {
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { src } = params;
    return multiNew("Done", Rate.Control, [src], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DoneType;

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

interface DrandType {
  "new"(params: { list: UGenInput; repeats?: UGenInput }): UGenOutput;
  "new"(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Drand = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Drand", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DrandType;

interface DresetType {
  "new"(params: { "in": UGenInput; reset?: UGenInput }): UGenOutput;
  "new"(params: { "in": UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dreset = {
  new(params: { "in": UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, reset = 0 } = params;
    return multiNew("Dreset", Rate.Demand, [in_, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as DresetType;

interface DseqType {
  "new"(params: { list: UGenInput; repeats?: UGenInput }): UGenOutput;
  "new"(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dseq = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Dseq", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DseqType;

interface DserType {
  "new"(params: { list: UGenInput; repeats?: UGenInput }): UGenOutput;
  "new"(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dser = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Dser", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DserType;

interface DseriesType {
  "new"(params?: { start?: UGenInput; step?: UGenInput; length?: UGenInput }): UGenOutput;
  "new"(params: { start?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dseries = {
  new(params: { start?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { start = 1, step = 1, length = Infinity } = params;
    return multiNew("Dseries", Rate.Demand, [start, step, length], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as DseriesType;

interface DshufType {
  "new"(params: { list: UGenInput; repeats?: UGenInput }): UGenOutput;
  "new"(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dshuf = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Dshuf", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DshufType;

interface DstutterType {
  "new"(params: { n: UGenInput; "in": UGenInput }): UGenOutput;
  "new"(params: { n: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dstutter = {
  new(params: { n: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { n, in: in_ } = params;
    return multiNew("Dstutter", Rate.Demand, [n, in_], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as DstutterType;

interface DswitchType {
  "new"(params: { list: UGenInput; index: UGenInput }): UGenOutput;
  "new"(params: { list: UGenInput | UGenInput[]; index: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dswitch = {
  new(params: { list: UGenInput | UGenInput[]; index: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, index } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [index, ...listList];
    return multiNew("Dswitch", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DswitchType;

interface Dswitch1Type {
  "new"(params: { list: UGenInput; index: UGenInput }): UGenOutput;
  "new"(params: { list: UGenInput | UGenInput[]; index: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dswitch1 = {
  new(params: { list: UGenInput | UGenInput[]; index: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, index } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [index, ...listList];
    return multiNew("Dswitch1", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as Dswitch1Type;

interface DuniqueType {
  "new"(params: { source: UGenInput; maxBufferSize?: UGenInput; "protected": UGenInput }): UGenOutput;
  "new"(params: { source: UGenInput | UGenInput[]; maxBufferSize?: UGenInput | UGenInput[]; "protected": UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dunique = {
  new(params: { source: UGenInput | UGenInput[]; maxBufferSize?: UGenInput | UGenInput[]; "protected": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { source, maxBufferSize = 1024, protected: protected_ } = params;
    return multiNew("Dunique", Rate.Scalar, [source, maxBufferSize, protected_], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as DuniqueType;

interface DustType {
  ar(params?: { density?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { density?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { density?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { density?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as DustType;

interface Dust2Type {
  ar(params?: { density?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { density?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { density?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { density?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Dust2Type;

interface DutyType {
  ar(params?: { dur?: UGenInput; reset?: UGenInput; level?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  ar(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { dur?: UGenInput; reset?: UGenInput; level?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  kr(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Duty = {
  ar(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { dur = 1, reset = 0, level = 1, doneAction = 0 } = params;
    return multiNew("Duty", Rate.Audio, [dur, reset, level, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { dur = 1, reset = 0, level = 1, doneAction = 0 } = params;
    return multiNew("Duty", Rate.Control, [dur, reset, level, doneAction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as DutyType;

interface DwhiteType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput; length?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dwhite = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; length?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, length = Infinity } = params;
    return multiNew("Dwhite", Rate.Demand, [lo, hi, length], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as DwhiteType;

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

interface DxrandType {
  "new"(params: { list: UGenInput; repeats?: UGenInput }): UGenOutput;
  "new"(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Dxrand = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("Dxrand", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as DxrandType;

interface DynKlangType {
  ar(params: { specificationsArrayRef: UGenInput; freqscale?: UGenInput; freqoffset?: UGenInput }): UGenOutput;
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { specificationsArrayRef: UGenInput; freqscale?: UGenInput; freqoffset?: UGenInput }): UGenOutput;
  kr(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const DynKlang = {
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, freqscale = 1, freqoffset = 0 } = params;
    return multiNew("DynKlang", Rate.Audio, [specificationsArrayRef, freqscale, freqoffset], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, freqscale = 1, freqoffset = 0 } = params;
    return multiNew("DynKlang", Rate.Control, [specificationsArrayRef, freqscale, freqoffset], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as DynKlangType;

interface DynKlankType {
  ar(params: { specificationsArrayRef: UGenInput; input: UGenInput; freqscale?: UGenInput; freqoffset?: UGenInput; decayscale?: UGenInput }): UGenOutput;
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { specificationsArrayRef: UGenInput; input: UGenInput; freqscale?: UGenInput; freqoffset?: UGenInput; decayscale?: UGenInput }): UGenOutput;
  kr(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const DynKlank = {
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, input, freqscale = 1, freqoffset = 0, decayscale = 1 } = params;
    return multiNew("DynKlank", Rate.Audio, [specificationsArrayRef, input, freqscale, freqoffset, decayscale], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, input, freqscale = 1, freqoffset = 0, decayscale = 1 } = params;
    return multiNew("DynKlank", Rate.Control, [specificationsArrayRef, input, freqscale, freqoffset, decayscale], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as DynKlankType;

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

interface ExpRandType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const ExpRand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0.01, hi = 1 } = params;
    return multiNew("ExpRand", Rate.Scalar, [lo, hi], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as ExpRandType;

interface FBSineCType {
  ar(params?: { freq?: UGenInput; im?: UGenInput; fb?: UGenInput; a?: UGenInput; c?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const FBSineC = {
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FBSineC", Rate.Audio, [freq, im, fb, a, c, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as FBSineCType;

interface FBSineLType {
  ar(params?: { freq?: UGenInput; im?: UGenInput; fb?: UGenInput; a?: UGenInput; c?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const FBSineL = {
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FBSineL", Rate.Audio, [freq, im, fb, a, c, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as FBSineLType;

interface FBSineNType {
  ar(params?: { freq?: UGenInput; im?: UGenInput; fb?: UGenInput; a?: UGenInput; c?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const FBSineN = {
  ar(params: { freq?: UGenInput | UGenInput[]; im?: UGenInput | UGenInput[]; fb?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FBSineN", Rate.Audio, [freq, im, fb, a, c, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as FBSineNType;

interface FFTType {
  "new"(params: { buffer: UGenInput; "in"?: UGenInput; hop?: UGenInput; wintype?: UGenInput; active?: UGenInput; winsize?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; hop?: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; active?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const FFT = {
  new(params: { buffer: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; hop?: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; active?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, in: in_ = 0, hop = 0.5, wintype = 0, active = 1, winsize = 0 } = params;
    return multiNew("FFT", Rate.Scalar, [buffer, in_, hop, wintype, active, winsize], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
} as unknown as FFTType;

interface FFTTriggerType {
  "new"(params: { buffer: UGenInput; hop?: UGenInput; polar?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; hop?: UGenInput | UGenInput[]; polar?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const FFTTrigger = {
  new(params: { buffer: UGenInput | UGenInput[]; hop?: UGenInput | UGenInput[]; polar?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, hop = 0.5, polar = 0 } = params;
    return multiNew("FFTTrigger", Rate.Scalar, [buffer, hop, polar], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as FFTTriggerType;

interface FoldType {
  ar(params: { "in": UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as FoldType;

interface FoldIndexType {
  ar(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as FoldIndexType;

interface FormantType {
  ar(params?: { fundfreq?: UGenInput; formfreq?: UGenInput; bwfreq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { fundfreq?: UGenInput | UGenInput[]; formfreq?: UGenInput | UGenInput[]; bwfreq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const Formant = {
  ar(params: { fundfreq?: UGenInput | UGenInput[]; formfreq?: UGenInput | UGenInput[]; bwfreq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { fundfreq = 440, formfreq = 1760, bwfreq = 880, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Formant", Rate.Audio, [fundfreq, formfreq, bwfreq], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as FormantType;

interface FormletType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; attacktime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; attacktime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; attacktime?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; attacktime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as FormletType;

interface FOSType {
  ar(params?: { "in"?: UGenInput; a0?: UGenInput; a1?: UGenInput; b1?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; a0?: UGenInput | UGenInput[]; a1?: UGenInput | UGenInput[]; b1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; a0?: UGenInput; a1?: UGenInput; b1?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; a0?: UGenInput | UGenInput[]; a1?: UGenInput | UGenInput[]; b1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as FOSType;

interface FreeType {
  kr(params: { trig: UGenInput; id: UGenInput }): UGenOutput;
  kr(params: { trig: UGenInput | UGenInput[]; id: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Free = {
  kr(params: { trig: UGenInput | UGenInput[]; id: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { trig, id } = params;
    return multiNew("Free", Rate.Control, [trig, id], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as FreeType;

interface FreeSelfType {
  kr(params: { "in": UGenInput }): UGenOutput;
  kr(params: { "in": UGenInput | UGenInput[] }): UGenOutput[];
}

export const FreeSelf = {
  kr(params: { "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_ } = params;
    return multiNew("FreeSelf", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as FreeSelfType;

interface FreeSelfWhenDoneType {
  kr(params: { src: UGenInput }): UGenOutput;
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput[];
}

export const FreeSelfWhenDone = {
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { src } = params;
    return multiNew("FreeSelfWhenDone", Rate.Control, [src], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as FreeSelfWhenDoneType;

interface FreeVerbType {
  ar(params: { "in": UGenInput; mix?: UGenInput; room?: UGenInput; damp?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; mix?: UGenInput | UGenInput[]; room?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const FreeVerb = {
  ar(params: { "in": UGenInput | UGenInput[]; mix?: UGenInput | UGenInput[]; room?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, mix = 0.33, room = 0.5, damp = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FreeVerb", Rate.Audio, [in_, mix, room, damp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as FreeVerbType;

interface FreeVerb2Type {
  ar(params: { "in": UGenInput; in2: UGenInput; mix?: UGenInput; room?: UGenInput; damp?: UGenInput; mul?: UGenInput; add?: UGenInput }): Stereo;
  ar(params: { "in": UGenInput | UGenInput[]; in2: UGenInput | UGenInput[]; mix?: UGenInput | UGenInput[]; room?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): Stereo[];
}

export const FreeVerb2 = {
  ar(params: { "in": UGenInput | UGenInput[]; in2: UGenInput | UGenInput[]; mix?: UGenInput | UGenInput[]; room?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): Stereo | Stereo[] {
    const { in: in_, in2, mix = 0.33, room = 0.5, damp = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FreeVerb2", Rate.Audio, [in_, in2, mix, room, damp], 2, [0, 1, 2, 3, 4]) as Stereo | Stereo[];
    return applyMulAdd(ugenOutput as any, mul, add) as Stereo | Stereo[];
  },
} as unknown as FreeVerb2Type;

interface FreqShiftType {
  ar(params: { "in": UGenInput; freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const FreqShift = {
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, freq = 0, phase = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("FreqShift", Rate.Audio, [in_, freq, phase], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as FreqShiftType;

interface FSinOscType {
  ar(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as FSinOscType;

interface GateType {
  ar(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Gate = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Gate", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Gate", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as GateType;

interface GbmanLType {
  ar(params?: { freq?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const GbmanL = {
  ar(params: { freq?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, xi = 1.2, yi = 2.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GbmanL", Rate.Audio, [freq, xi, yi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as GbmanLType;

interface GbmanNType {
  ar(params?: { freq?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const GbmanN = {
  ar(params: { freq?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, xi = 1.2, yi = 2.1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GbmanN", Rate.Audio, [freq, xi, yi], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as GbmanNType;

interface Gendy1Type {
  ar(params: { ampdist?: UGenInput; durdist?: UGenInput; adparam?: UGenInput; ddparam?: UGenInput; minfreq?: UGenInput; maxfreq?: UGenInput; ampscale?: UGenInput; durscale?: UGenInput; initCPs?: UGenInput; knum: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; minfreq?: UGenInput | UGenInput[]; maxfreq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { ampdist?: UGenInput; durdist?: UGenInput; adparam?: UGenInput; ddparam?: UGenInput; minfreq?: UGenInput; maxfreq?: UGenInput; ampscale?: UGenInput; durscale?: UGenInput; initCPs?: UGenInput; knum: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; minfreq?: UGenInput | UGenInput[]; maxfreq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Gendy1Type;

interface Gendy2Type {
  ar(params: { ampdist?: UGenInput; durdist?: UGenInput; adparam?: UGenInput; ddparam?: UGenInput; minfreq?: UGenInput; maxfreq?: UGenInput; ampscale?: UGenInput; durscale?: UGenInput; initCPs?: UGenInput; knum: UGenInput; a?: UGenInput; c?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; minfreq?: UGenInput | UGenInput[]; maxfreq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { ampdist?: UGenInput; durdist?: UGenInput; adparam?: UGenInput; ddparam?: UGenInput; minfreq?: UGenInput; maxfreq?: UGenInput; ampscale?: UGenInput; durscale?: UGenInput; initCPs?: UGenInput; knum: UGenInput; a?: UGenInput; c?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; minfreq?: UGenInput | UGenInput[]; maxfreq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Gendy2Type;

interface Gendy3Type {
  ar(params: { ampdist?: UGenInput; durdist?: UGenInput; adparam?: UGenInput; ddparam?: UGenInput; freq?: UGenInput; ampscale?: UGenInput; durscale?: UGenInput; initCPs?: UGenInput; knum: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { ampdist?: UGenInput; durdist?: UGenInput; adparam?: UGenInput; ddparam?: UGenInput; freq?: UGenInput; ampscale?: UGenInput; durscale?: UGenInput; initCPs?: UGenInput; knum: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { ampdist?: UGenInput | UGenInput[]; durdist?: UGenInput | UGenInput[]; adparam?: UGenInput | UGenInput[]; ddparam?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; ampscale?: UGenInput | UGenInput[]; durscale?: UGenInput | UGenInput[]; initCPs?: UGenInput | UGenInput[]; knum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Gendy3Type;

interface GrainBufType {
  ar(params: { numChannels?: number; trigger?: UGenInput; dur?: UGenInput; sndbuf: UGenInput; rate?: UGenInput; pos?: UGenInput; interp?: UGenInput; pan?: UGenInput; envbufnum?: UGenInput; maxGrains?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; sndbuf: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[][];
}

export const GrainBuf = {
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; sndbuf: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, trigger = 0, dur = 1, sndbuf, rate = 1, pos = 0, interp = 2, pan = 0, envbufnum = -1, maxGrains = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrainBuf", Rate.Audio, [trigger, dur, sndbuf, rate, pos, interp, pan, envbufnum, maxGrains], numChannels, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as GrainBufType;

interface GrainFMType {
  ar(params?: { numChannels?: number; trigger?: UGenInput; dur?: UGenInput; carfreq?: UGenInput; modfreq?: UGenInput; index?: UGenInput; pan?: UGenInput; envbufnum?: UGenInput; maxGrains?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; carfreq?: UGenInput | UGenInput[]; modfreq?: UGenInput | UGenInput[]; index?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[][];
}

export const GrainFM = {
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; carfreq?: UGenInput | UGenInput[]; modfreq?: UGenInput | UGenInput[]; index?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, trigger = 0, dur = 1, carfreq = 440, modfreq = 200, index = 1, pan = 0, envbufnum = -1, maxGrains = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrainFM", Rate.Audio, [trigger, dur, carfreq, modfreq, index, pan, envbufnum, maxGrains], numChannels, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as GrainFMType;

interface GrainInType {
  ar(params: { numChannels?: number; trigger?: UGenInput; dur?: UGenInput; "in": UGenInput; pan?: UGenInput; envbufnum?: UGenInput; maxGrains?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[][];
}

export const GrainIn = {
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, trigger = 0, dur = 1, in: in_, pan = 0, envbufnum = -1, maxGrains = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrainIn", Rate.Audio, [trigger, dur, in_, pan, envbufnum, maxGrains], numChannels, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as GrainInType;

interface GrainSinType {
  ar(params?: { numChannels?: number; trigger?: UGenInput; dur?: UGenInput; freq?: UGenInput; pan?: UGenInput; envbufnum?: UGenInput; maxGrains?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[][];
}

export const GrainSin = {
  ar(params: { numChannels?: number; trigger?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; maxGrains?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, trigger = 0, dur = 1, freq = 440, pan = 0, envbufnum = -1, maxGrains = 512, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrainSin", Rate.Audio, [trigger, dur, freq, pan, envbufnum, maxGrains], numChannels, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as GrainSinType;

export const GrayNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrayNoise", Rate.Audio, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GrayNoise", Rate.Control, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
};

interface GVerbType {
  ar(params: { "in": UGenInput; roomsize?: UGenInput; revtime?: UGenInput; damping?: UGenInput; inputbw?: UGenInput; spread?: UGenInput; drylevel?: UGenInput; earlyreflevel?: UGenInput; taillevel?: UGenInput; maxroomsize?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; roomsize?: UGenInput | UGenInput[]; revtime?: UGenInput | UGenInput[]; damping?: UGenInput | UGenInput[]; inputbw?: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; drylevel?: UGenInput | UGenInput[]; earlyreflevel?: UGenInput | UGenInput[]; taillevel?: UGenInput | UGenInput[]; maxroomsize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const GVerb = {
  ar(params: { "in": UGenInput | UGenInput[]; roomsize?: UGenInput | UGenInput[]; revtime?: UGenInput | UGenInput[]; damping?: UGenInput | UGenInput[]; inputbw?: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; drylevel?: UGenInput | UGenInput[]; earlyreflevel?: UGenInput | UGenInput[]; taillevel?: UGenInput | UGenInput[]; maxroomsize?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, roomsize = 10, revtime = 3, damping = 0.5, inputbw = 0.5, spread = 15, drylevel = 1, earlyreflevel = 0.7, taillevel = 0.5, maxroomsize = 300, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("GVerb", Rate.Audio, [in_, roomsize, revtime, damping, inputbw, spread, drylevel, earlyreflevel, taillevel, maxroomsize], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as GVerbType;

interface HasherType {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as HasherType;

interface HenonCType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; x0?: UGenInput; x1?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const HenonC = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.4, b = 0.3, x0 = 0, x1 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HenonC", Rate.Audio, [freq, a, b, x0, x1], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as HenonCType;

interface HenonLType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; x0?: UGenInput; x1?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const HenonL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.4, b = 0.3, x0 = 0, x1 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HenonL", Rate.Audio, [freq, a, b, x0, x1], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as HenonLType;

interface HenonNType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; x0?: UGenInput; x1?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const HenonN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; x0?: UGenInput | UGenInput[]; x1?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.4, b = 0.3, x0 = 0, x1 = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("HenonN", Rate.Audio, [freq, a, b, x0, x1], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as HenonNType;

interface HilbertType {
  ar(params: { "in": UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const Hilbert = {
  ar(params: { "in": UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Hilbert", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as HilbertType;

interface HilbertFIRType {
  ar(params: { "in": UGenInput; buffer: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; buffer: UGenInput | UGenInput[] }): UGenOutput[];
}

export const HilbertFIR = {
  ar(params: { "in": UGenInput | UGenInput[]; buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, buffer } = params;
    return multiNew("HilbertFIR", Rate.Audio, [in_, buffer], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as HilbertFIRType;

interface HPFType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as HPFType;

interface HPZ1Type {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as HPZ1Type;

interface HPZ2Type {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as HPZ2Type;

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

interface IFFTType {
  ar(params: { buffer: UGenInput; wintype?: UGenInput; winsize?: UGenInput }): UGenOutput;
  ar(params: { buffer: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { buffer: UGenInput; wintype?: UGenInput; winsize?: UGenInput }): UGenOutput;
  kr(params: { buffer: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput[];
  "new"(params: { buffer: UGenInput; wintype?: UGenInput; winsize?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; wintype?: UGenInput | UGenInput[]; winsize?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as IFFTType;

interface ImpulseType {
  ar(params?: { freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as ImpulseType;

interface InType {
  ar(params?: { bus?: UGenInput; numChannels?: number }): UGenOutput[];
  ar(params: { bus?: UGenInput | UGenInput[]; numChannels?: number }): UGenOutput[][];
  kr(params?: { bus?: UGenInput; numChannels?: number }): UGenOutput[];
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number }): UGenOutput[][];
}

export const In = {
  ar(params: { bus?: UGenInput | UGenInput[]; numChannels?: number } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1 } = params;
    return multiNew("In", Rate.Audio, [bus], numChannels, [0]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1 } = params;
    return multiNew("In", Rate.Control, [bus], numChannels, [0]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as InType;

interface IndexType {
  ar(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as IndexType;

interface IndexInBetweenType {
  ar(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as IndexInBetweenType;

interface IndexLType {
  ar(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as IndexLType;

interface InFeedbackType {
  ar(params?: { bus?: UGenInput; numChannels?: number }): UGenOutput[];
  ar(params: { bus?: UGenInput | UGenInput[]; numChannels?: number }): UGenOutput[][];
}

export const InFeedback = {
  ar(params: { bus?: UGenInput | UGenInput[]; numChannels?: number } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1 } = params;
    return multiNew("InFeedback", Rate.Audio, [bus], numChannels, [0]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as InFeedbackType;

export const InfoUGenBase = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("InfoUGenBase", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

interface InRangeType {
  ar(params: { "in": UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as InRangeType;

interface InRectType {
  ar(params: { x: UGenInput; y: UGenInput; rect: UGenInput }): UGenOutput;
  ar(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; rect: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { x?: UGenInput; y?: UGenInput; rect: UGenInput }): UGenOutput;
  kr(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; rect: UGenInput | UGenInput[] }): UGenOutput[];
}

export const InRect = {
  ar(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; rect: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { x, y, rect } = params;
    return multiNew("InRect", Rate.Audio, [x, y, rect], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; rect: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { x = 0, y = 0, rect } = params;
    return multiNew("InRect", Rate.Control, [x, y, rect], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as InRectType;

interface IntegratorType {
  ar(params?: { "in"?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as IntegratorType;

interface InTrigType {
  kr(params?: { bus?: UGenInput; numChannels?: number }): UGenOutput[];
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number }): UGenOutput[][];
}

export const InTrig = {
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1 } = params;
    return multiNew("InTrig", Rate.Control, [bus], numChannels, [0]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as InTrigType;

interface IRandType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const IRand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 127 } = params;
    return multiNew("IRand", Rate.Scalar, [lo, hi], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as IRandType;

interface K2AType {
  ar(params?: { "in"?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const K2A = {
  ar(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("K2A", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as K2AType;

interface KeyStateType {
  kr(params?: { keycode?: UGenInput; minval?: UGenInput; maxval?: UGenInput; lag?: UGenInput }): UGenOutput;
  kr(params: { keycode?: UGenInput | UGenInput[]; minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const KeyState = {
  kr(params: { keycode?: UGenInput | UGenInput[]; minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { keycode = 0, minval = 0, maxval = 1, lag = 0.2 } = params;
    return multiNew("KeyState", Rate.Control, [keycode, minval, maxval, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as KeyStateType;

interface KeyTrackType {
  kr(params: { chain: UGenInput; keydecay?: UGenInput; chromaleak?: UGenInput }): UGenOutput;
  kr(params: { chain: UGenInput | UGenInput[]; keydecay?: UGenInput | UGenInput[]; chromaleak?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const KeyTrack = {
  kr(params: { chain: UGenInput | UGenInput[]; keydecay?: UGenInput | UGenInput[]; chromaleak?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, keydecay = 2, chromaleak = 0.5 } = params;
    return multiNew("KeyTrack", Rate.Control, [chain, keydecay, chromaleak], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as KeyTrackType;

interface KlangType {
  ar(params: { specificationsArrayRef: UGenInput; freqscale?: UGenInput; freqoffset?: UGenInput }): UGenOutput;
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Klang = {
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, freqscale = 1, freqoffset = 0 } = params;
    return multiNew("Klang", Rate.Audio, [specificationsArrayRef, freqscale, freqoffset], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as KlangType;

interface KlankType {
  ar(params: { specificationsArrayRef: UGenInput; input: UGenInput; freqscale?: UGenInput; freqoffset?: UGenInput; decayscale?: UGenInput }): UGenOutput;
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Klank = {
  ar(params: { specificationsArrayRef: UGenInput | UGenInput[]; input: UGenInput | UGenInput[]; freqscale?: UGenInput | UGenInput[]; freqoffset?: UGenInput | UGenInput[]; decayscale?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { specificationsArrayRef, input, freqscale = 1, freqoffset = 0, decayscale = 1 } = params;
    return multiNew("Klank", Rate.Audio, [specificationsArrayRef, input, freqscale, freqoffset, decayscale], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as KlankType;

interface LagType {
  ar(params?: { "in"?: UGenInput; lagTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lagTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LagType;

interface Lag2Type {
  ar(params?: { "in"?: UGenInput; lagTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lagTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Lag2Type;

interface Lag2UDType {
  ar(params?: { "in"?: UGenInput; lagTimeU?: UGenInput; lagTimeD?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lagTimeU?: UGenInput; lagTimeD?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Lag2UDType;

interface Lag3Type {
  ar(params?: { "in"?: UGenInput; lagTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lagTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Lag3Type;

interface Lag3UDType {
  ar(params?: { "in"?: UGenInput; lagTimeU?: UGenInput; lagTimeD?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lagTimeU?: UGenInput; lagTimeD?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as Lag3UDType;

interface LagInType {
  kr(params?: { bus?: UGenInput; numChannels?: number; lag?: UGenInput }): UGenOutput[];
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number; lag?: UGenInput | UGenInput[] }): UGenOutput[][];
}

export const LagIn = {
  kr(params: { bus?: UGenInput | UGenInput[]; numChannels?: number; lag?: UGenInput | UGenInput[] } = {}): UGenOutput[] | UGenOutput[][] {
    const { bus = 0, numChannels = 1, lag = 0.1 } = params;
    return multiNew("LagIn", Rate.Control, [bus, lag], numChannels, [0, 1]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as LagInType;

interface LagUDType {
  ar(params?: { "in"?: UGenInput; lagTimeU?: UGenInput; lagTimeD?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lagTimeU?: UGenInput; lagTimeD?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTimeU?: UGenInput | UGenInput[]; lagTimeD?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LagUDType;

interface LastValueType {
  ar(params?: { "in"?: UGenInput; diff?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; diff?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; diff?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; diff?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LastValue = {
  ar(params: { "in"?: UGenInput | UGenInput[]; diff?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, diff = 0.01 } = params;
    return multiNew("LastValue", Rate.Audio, [in_, diff], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; diff?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, diff = 0.01 } = params;
    return multiNew("LastValue", Rate.Control, [in_, diff], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as LastValueType;

interface LatchType {
  ar(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Latch = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Latch", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Latch", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as LatchType;

interface LatoocarfianCType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; c?: UGenInput; d?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const LatoocarfianC = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 3, c = 0.5, d = 0.5, xi = 0.5, yi = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LatoocarfianC", Rate.Audio, [freq, a, b, c, d, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as LatoocarfianCType;

interface LatoocarfianLType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; c?: UGenInput; d?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const LatoocarfianL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 3, c = 0.5, d = 0.5, xi = 0.5, yi = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LatoocarfianL", Rate.Audio, [freq, a, b, c, d, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as LatoocarfianLType;

interface LatoocarfianNType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; c?: UGenInput; d?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const LatoocarfianN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; d?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = 3, c = 0.5, d = 0.5, xi = 0.5, yi = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LatoocarfianN", Rate.Audio, [freq, a, b, c, d, xi, yi], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as LatoocarfianNType;

interface LeakDCType {
  ar(params?: { "in"?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LeakDCType;

interface LeastChangeType {
  ar(params?: { a?: UGenInput; b?: UGenInput }): UGenOutput;
  ar(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { a?: UGenInput; b?: UGenInput }): UGenOutput;
  kr(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LeastChange = {
  ar(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { a = 0, b = 0 } = params;
    return multiNew("LeastChange", Rate.Audio, [a, b], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { a = 0, b = 0 } = params;
    return multiNew("LeastChange", Rate.Control, [a, b], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as LeastChangeType;

interface LFClipNoiseType {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFClipNoiseType;

interface LFCubType {
  ar(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFCubType;

interface LFDClipNoiseType {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFDClipNoiseType;

interface LFDNoise0Type {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFDNoise0Type;

interface LFDNoise1Type {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFDNoise1Type;

interface LFDNoise3Type {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFDNoise3Type;

interface LFGaussType {
  ar(params?: { duration?: UGenInput; width?: UGenInput; iphase?: UGenInput; loop?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  ar(params: { duration?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { duration?: UGenInput; width?: UGenInput; iphase?: UGenInput; loop?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  kr(params: { duration?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LFGauss = {
  ar(params: { duration?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { duration = 1, width = 0.1, iphase = 0, loop = 1, doneAction = 0 } = params;
    return multiNew("LFGauss", Rate.Audio, [duration, width, iphase, loop, doneAction], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { duration?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { duration = 1, width = 0.1, iphase = 0, loop = 1, doneAction = 0 } = params;
    return multiNew("LFGauss", Rate.Control, [duration, width, iphase, loop, doneAction], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as LFGaussType;

interface LFNoise0Type {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFNoise0Type;

interface LFNoise1Type {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFNoise1Type;

interface LFNoise2Type {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFNoise2Type;

interface LFParType {
  ar(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFParType;

interface LFPulseType {
  ar(params?: { freq?: UGenInput; iphase?: UGenInput; width?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; iphase?: UGenInput; width?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFPulseType;

interface LFSawType {
  ar(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFSawType;

interface LFTriType {
  ar(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; iphase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LFTriType;

interface LimiterType {
  ar(params?: { "in"?: UGenInput; level?: UGenInput; dur?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Limiter = {
  ar(params: { "in"?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, level = 1, dur = 0.01 } = params;
    return multiNew("Limiter", Rate.Audio, [in_, level, dur], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as LimiterType;

interface LinCongCType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; c?: UGenInput; m?: UGenInput; xi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const LinCongC = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.1, c = 0.13, m = 1, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LinCongC", Rate.Audio, [freq, a, c, m, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as LinCongCType;

interface LinCongLType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; c?: UGenInput; m?: UGenInput; xi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const LinCongL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.1, c = 0.13, m = 1, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LinCongL", Rate.Audio, [freq, a, c, m, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as LinCongLType;

interface LinCongNType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; c?: UGenInput; m?: UGenInput; xi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const LinCongN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; m?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1.1, c = 0.13, m = 1, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LinCongN", Rate.Audio, [freq, a, c, m, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as LinCongNType;

interface LineType {
  ar(params?: { start?: UGenInput; end?: UGenInput; dur?: UGenInput; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  ar(params: { start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { start?: UGenInput; end?: UGenInput; dur?: UGenInput; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  kr(params: { start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as LineType;

interface LinenType {
  kr(params?: { gate?: UGenInput; attackTime?: UGenInput; susLevel?: UGenInput; releaseTime?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  kr(params: { gate?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; susLevel?: UGenInput | UGenInput[]; releaseTime?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Linen = {
  kr(params: { gate?: UGenInput | UGenInput[]; attackTime?: UGenInput | UGenInput[]; susLevel?: UGenInput | UGenInput[]; releaseTime?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { gate = 1, attackTime = 0.01, susLevel = 1, releaseTime = 1, doneAction = 0 } = params;
    return multiNew("Linen", Rate.Control, [gate, attackTime, susLevel, releaseTime, doneAction], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as LinenType;

interface LinExpType {
  ar(params?: { "in"?: UGenInput; srclo?: UGenInput; srchi?: UGenInput; dstlo?: UGenInput; dsthi?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; srclo?: UGenInput | UGenInput[]; srchi?: UGenInput | UGenInput[]; dstlo?: UGenInput | UGenInput[]; dsthi?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; srclo?: UGenInput; srchi?: UGenInput; dstlo?: UGenInput; dsthi?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; srclo?: UGenInput | UGenInput[]; srchi?: UGenInput | UGenInput[]; dstlo?: UGenInput | UGenInput[]; dsthi?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LinExp = {
  ar(params: { "in"?: UGenInput | UGenInput[]; srclo?: UGenInput | UGenInput[]; srchi?: UGenInput | UGenInput[]; dstlo?: UGenInput | UGenInput[]; dsthi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, srclo = 0, srchi = 1, dstlo = 1, dsthi = 2 } = params;
    return multiNew("LinExp", Rate.Audio, [in_, srclo, srchi, dstlo, dsthi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; srclo?: UGenInput | UGenInput[]; srchi?: UGenInput | UGenInput[]; dstlo?: UGenInput | UGenInput[]; dsthi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, srclo = 0, srchi = 1, dstlo = 1, dsthi = 2 } = params;
    return multiNew("LinExp", Rate.Control, [in_, srclo, srchi, dstlo, dsthi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as LinExpType;

interface LinkJumpType {
  kr(params?: { gate?: UGenInput; beat?: UGenInput; quantum?: UGenInput; force?: UGenInput }): UGenOutput;
  kr(params: { gate?: UGenInput | UGenInput[]; beat?: UGenInput | UGenInput[]; quantum?: UGenInput | UGenInput[]; force?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LinkJump = {
  kr(params: { gate?: UGenInput | UGenInput[]; beat?: UGenInput | UGenInput[]; quantum?: UGenInput | UGenInput[]; force?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { gate = 0, beat = 0, quantum = 4, force = 0 } = params;
    return multiNew("LinkJump", Rate.Control, [gate, beat, quantum, force], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as LinkJumpType;

interface LinkPhaseType {
  kr(params?: { quantum?: UGenInput }): UGenOutput;
  kr(params: { quantum?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LinkPhase = {
  kr(params: { quantum?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { quantum = 4 } = params;
    return multiNew("LinkPhase", Rate.Control, [quantum], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as LinkPhaseType;

interface LinkTempoType {
  kr(params?: { gate?: UGenInput; tempo?: UGenInput }): UGenOutput;
  kr(params: { gate?: UGenInput | UGenInput[]; tempo?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LinkTempo = {
  kr(params: { gate?: UGenInput | UGenInput[]; tempo?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { gate = 0, tempo = 1 } = params;
    return multiNew("LinkTempo", Rate.Control, [gate, tempo], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as LinkTempoType;

interface LinPan2Type {
  ar(params: { "in": UGenInput; pos?: UGenInput; level?: UGenInput }): Stereo;
  ar(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo[];
  kr(params: { "in": UGenInput; pos?: UGenInput; level?: UGenInput }): Stereo;
  kr(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo[];
}

export const LinPan2 = {
  ar(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo | Stereo[] {
    const { in: in_, pos = 0, level = 1 } = params;
    return multiNew("LinPan2", Rate.Audio, [in_, pos, level], 2, [0, 1, 2]) as Stereo | Stereo[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo | Stereo[] {
    const { in: in_, pos = 0, level = 1 } = params;
    return multiNew("LinPan2", Rate.Control, [in_, pos, level], 2, [0, 1, 2]) as Stereo | Stereo[];
  },
} as unknown as LinPan2Type;

interface LinRandType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput; minmax?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; minmax?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LinRand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; minmax?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, minmax = 0 } = params;
    return multiNew("LinRand", Rate.Scalar, [lo, hi, minmax], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as LinRandType;

interface LinXFade2Type {
  ar(params: { inA: UGenInput; inB?: UGenInput; pan?: UGenInput; level?: UGenInput }): UGenOutput;
  ar(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { inA: UGenInput; inB?: UGenInput; pan?: UGenInput; level?: UGenInput }): UGenOutput;
  kr(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const LinXFade2 = {
  ar(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inA, inB = 0, pan = 0, level = 1 } = params;
    return multiNew("LinXFade2", Rate.Audio, [inA, inB, pan, level], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inA, inB = 0, pan = 0, level = 1 } = params;
    return multiNew("LinXFade2", Rate.Control, [inA, inB, pan, level], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as LinXFade2Type;

interface ListDUGenType {
  "new"(params: { list: UGenInput; repeats?: UGenInput }): UGenOutput;
  "new"(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const ListDUGen = {
  new(params: { list: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { list, repeats = 1 } = params;
    const listList = Array.isArray(list) ? list : [list];
    const inputs: (UGenInput | UGenInput[])[] = [repeats, ...listList];
    return multiNew("ListDUGen", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as ListDUGenType;

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

interface LogisticType {
  ar(params?: { chaosParam?: UGenInput; freq?: UGenInput; init?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { chaosParam?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; init?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { chaosParam?: UGenInput; freq?: UGenInput; init?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { chaosParam?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; init?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LogisticType;

interface LorenzLType {
  ar(params?: { freq?: UGenInput; s?: UGenInput; r?: UGenInput; b?: UGenInput; h?: UGenInput; xi?: UGenInput; yi?: UGenInput; zi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; s?: UGenInput | UGenInput[]; r?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; h?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; zi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const LorenzL = {
  ar(params: { freq?: UGenInput | UGenInput[]; s?: UGenInput | UGenInput[]; r?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; h?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; zi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, s = 10, r = 28, b = 2.667, h = 0.05, xi = 0.1, yi = 0, zi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("LorenzL", Rate.Audio, [freq, s, r, b, h, xi, yi, zi], 1, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as LorenzLType;

interface LoudnessType {
  kr(params: { chain: UGenInput; smask?: UGenInput; tmask?: UGenInput }): UGenOutput;
  kr(params: { chain: UGenInput | UGenInput[]; smask?: UGenInput | UGenInput[]; tmask?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Loudness = {
  kr(params: { chain: UGenInput | UGenInput[]; smask?: UGenInput | UGenInput[]; tmask?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, smask = 0.25, tmask = 1 } = params;
    return multiNew("Loudness", Rate.Control, [chain, smask, tmask], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as LoudnessType;

interface LPFType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LPFType;

interface LPZ1Type {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LPZ1Type;

interface LPZ2Type {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as LPZ2Type;

interface MantissaMaskType {
  ar(params?: { "in"?: UGenInput; bits?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; bits?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; bits?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; bits?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as MantissaMaskType;

interface MedianType {
  ar(params?: { length?: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { length?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { length?: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { length?: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as MedianType;

interface MFCCType {
  kr(params: { chain: UGenInput; numcoeff?: UGenInput }): UGenOutput;
  kr(params: { chain: UGenInput | UGenInput[]; numcoeff?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const MFCC = {
  kr(params: { chain: UGenInput | UGenInput[]; numcoeff?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, numcoeff = 13 } = params;
    return multiNew("MFCC", Rate.Control, [chain, numcoeff], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as MFCCType;

interface MidEQType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; db?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; db?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; db?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as MidEQType;

interface ModDifType {
  ar(params?: { x?: UGenInput; y?: UGenInput; mod?: UGenInput }): UGenOutput;
  ar(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; mod?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { x?: UGenInput; y?: UGenInput; mod?: UGenInput }): UGenOutput;
  kr(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; mod?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { x?: UGenInput; y?: UGenInput; mod?: UGenInput }): UGenOutput;
  ir(params: { x?: UGenInput | UGenInput[]; y?: UGenInput | UGenInput[]; mod?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as ModDifType;

interface MoogFFType {
  ar(params: { "in": UGenInput; freq?: UGenInput; gain?: UGenInput; reset?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { "in": UGenInput; freq?: UGenInput; gain?: UGenInput; reset?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in": UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as MoogFFType;

interface MostChangeType {
  ar(params?: { a?: UGenInput; b?: UGenInput }): UGenOutput;
  ar(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { a?: UGenInput; b?: UGenInput }): UGenOutput;
  kr(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const MostChange = {
  ar(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { a = 0, b = 0 } = params;
    return multiNew("MostChange", Rate.Audio, [a, b], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { a = 0, b = 0 } = params;
    return multiNew("MostChange", Rate.Control, [a, b], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as MostChangeType;

interface MouseButtonType {
  kr(params?: { minval?: UGenInput; maxval?: UGenInput; lag?: UGenInput }): UGenOutput;
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const MouseButton = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, lag = 0.2 } = params;
    return multiNew("MouseButton", Rate.Control, [minval, maxval, lag], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as MouseButtonType;

interface MouseXType {
  kr(params?: { minval?: UGenInput; maxval?: UGenInput; warp?: UGenInput; lag?: UGenInput }): UGenOutput;
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const MouseX = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("MouseX", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as MouseXType;

interface MouseYType {
  kr(params?: { minval?: UGenInput; maxval?: UGenInput; warp?: UGenInput; lag?: UGenInput }): UGenOutput;
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const MouseY = {
  kr(params: { minval?: UGenInput | UGenInput[]; maxval?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; lag?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { minval = 0, maxval = 1, warp = 0, lag = 0.2 } = params;
    return multiNew("MouseY", Rate.Control, [minval, maxval, warp, lag], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as MouseYType;

interface MultiplexAnalogInType {
  ar(params?: { analogPin?: UGenInput; muxChannel?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { analogPin?: UGenInput | UGenInput[]; muxChannel?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { analogPin?: UGenInput; muxChannel?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { analogPin?: UGenInput | UGenInput[]; muxChannel?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as MultiplexAnalogInType;

export const NodeID = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("NodeID", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

interface NormalizerType {
  ar(params?: { "in"?: UGenInput; level?: UGenInput; dur?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Normalizer = {
  ar(params: { "in"?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, level = 1, dur = 0.01 } = params;
    return multiNew("Normalizer", Rate.Audio, [in_, level, dur], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as NormalizerType;

interface NRandType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput; n?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; n?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const NRand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; n?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, n = 0 } = params;
    return multiNew("NRand", Rate.Scalar, [lo, hi, n], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as NRandType;

export const NumAudioBuses = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("NumAudioBuses", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

export const NumBuffers = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("NumBuffers", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

export const NumControlBuses = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("NumControlBuses", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

export const NumInputBuses = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("NumInputBuses", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

export const NumOutputBuses = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("NumOutputBuses", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

export const NumRunningSynths = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("NumRunningSynths", Rate.Scalar, [], 1, []) as UGenOutput;
  },
  kr(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("NumRunningSynths", Rate.Control, [], 1, []) as UGenOutput;
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

interface OnePoleType {
  ar(params?: { "in"?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as OnePoleType;

interface OneZeroType {
  ar(params?: { "in"?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as OneZeroType;

interface OnsetsType {
  kr(params: { chain: UGenInput; threshold?: UGenInput; odftype: UGenInput; relaxtime?: UGenInput; floor?: UGenInput; mingap?: UGenInput; medianspan?: UGenInput; whtype?: UGenInput; rawodf?: UGenInput }): UGenOutput;
  kr(params: { chain: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; odftype: UGenInput | UGenInput[]; relaxtime?: UGenInput | UGenInput[]; floor?: UGenInput | UGenInput[]; mingap?: UGenInput | UGenInput[]; medianspan?: UGenInput | UGenInput[]; whtype?: UGenInput | UGenInput[]; rawodf?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Onsets = {
  kr(params: { chain: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; odftype: UGenInput | UGenInput[]; relaxtime?: UGenInput | UGenInput[]; floor?: UGenInput | UGenInput[]; mingap?: UGenInput | UGenInput[]; medianspan?: UGenInput | UGenInput[]; whtype?: UGenInput | UGenInput[]; rawodf?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, threshold = 0.5, odftype, relaxtime = 1, floor = 0.1, mingap = 10, medianspan = 11, whtype = 1, rawodf = 0 } = params;
    return multiNew("Onsets", Rate.Control, [chain, threshold, odftype, relaxtime, floor, mingap, medianspan, whtype, rawodf], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput | UGenOutput[];
  },
} as unknown as OnsetsType;

interface OscType {
  ar(params: { bufnum: UGenInput; freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as OscType;

interface OscNType {
  ar(params: { bufnum: UGenInput; freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as OscNType;

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

interface PackFFTType {
  "new"(params: { chain: UGenInput; bufsize: UGenInput; magsphases: UGenInput; frombin?: UGenInput; tobin: UGenInput; zeroothers?: UGenInput }): UGenOutput;
  "new"(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; magsphases: UGenInput | UGenInput[]; frombin?: UGenInput | UGenInput[]; tobin: UGenInput | UGenInput[]; zeroothers?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PackFFT = {
  new(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; magsphases: UGenInput | UGenInput[]; frombin?: UGenInput | UGenInput[]; tobin: UGenInput | UGenInput[]; zeroothers?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, bufsize, magsphases, frombin = 0, tobin, zeroothers = 0 } = params;
    const magsphasesList = Array.isArray(magsphases) ? magsphases : [magsphases];
    const inputs: (UGenInput | UGenInput[])[] = [chain, bufsize, frombin, tobin, zeroothers, magsphasesList.length, ...magsphasesList];
    return multiNew("PackFFT", Rate.Scalar, inputs, 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as PackFFTType;

interface Pan2Type {
  ar(params: { "in": UGenInput; pos?: UGenInput; level?: UGenInput }): Stereo;
  ar(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo[];
  kr(params: { "in": UGenInput; pos?: UGenInput; level?: UGenInput }): Stereo;
  kr(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo[];
}

export const Pan2 = {
  ar(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo | Stereo[] {
    const { in: in_, pos = 0, level = 1 } = params;
    return multiNew("Pan2", Rate.Audio, [in_, pos, level], 2, [0, 1, 2]) as Stereo | Stereo[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Stereo | Stereo[] {
    const { in: in_, pos = 0, level = 1 } = params;
    return multiNew("Pan2", Rate.Control, [in_, pos, level], 2, [0, 1, 2]) as Stereo | Stereo[];
  },
} as unknown as Pan2Type;

interface Pan4Type {
  ar(params: { "in": UGenInput; xpos?: UGenInput; ypos?: UGenInput; level?: UGenInput }): Quad;
  ar(params: { "in": UGenInput | UGenInput[]; xpos?: UGenInput | UGenInput[]; ypos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Quad[];
  kr(params: { "in": UGenInput; xpos?: UGenInput; ypos?: UGenInput; level?: UGenInput }): Quad;
  kr(params: { "in": UGenInput | UGenInput[]; xpos?: UGenInput | UGenInput[]; ypos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Quad[];
}

export const Pan4 = {
  ar(params: { "in": UGenInput | UGenInput[]; xpos?: UGenInput | UGenInput[]; ypos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Quad | Quad[] {
    const { in: in_, xpos = 0, ypos = 0, level = 1 } = params;
    return multiNew("Pan4", Rate.Audio, [in_, xpos, ypos, level], 4, [0, 1, 2, 3]) as Quad | Quad[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; xpos?: UGenInput | UGenInput[]; ypos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): Quad | Quad[] {
    const { in: in_, xpos = 0, ypos = 0, level = 1 } = params;
    return multiNew("Pan4", Rate.Control, [in_, xpos, ypos, level], 4, [0, 1, 2, 3]) as Quad | Quad[];
  },
} as unknown as Pan4Type;

interface PanAzType {
  ar(params: { numChans: UGenInput; "in": UGenInput; pos?: UGenInput; level?: UGenInput; width?: UGenInput; orientation?: UGenInput }): UGenOutput;
  ar(params: { numChans: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { numChans: UGenInput; "in": UGenInput; pos?: UGenInput; level?: UGenInput; width?: UGenInput; orientation?: UGenInput }): UGenOutput;
  kr(params: { numChans: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PanAz = {
  ar(params: { numChans: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans, in: in_, pos = 0, level = 1, width = 2, orientation = 0.5 } = params;
    return multiNew("PanAz", Rate.Audio, [numChans, in_, pos, level, width, orientation], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
  kr(params: { numChans: UGenInput | UGenInput[]; "in": UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans, in: in_, pos = 0, level = 1, width = 2, orientation = 0.5 } = params;
    return multiNew("PanAz", Rate.Control, [numChans, in_, pos, level, width, orientation], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
} as unknown as PanAzType;

interface PanBType {
  ar(params: { "in": UGenInput; azimuth?: UGenInput; elevation?: UGenInput; gain?: UGenInput }): Quad;
  ar(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; elevation?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Quad[];
  kr(params: { "in": UGenInput; azimuth?: UGenInput; elevation?: UGenInput; gain?: UGenInput }): Quad;
  kr(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; elevation?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Quad[];
}

export const PanB = {
  ar(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; elevation?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Quad | Quad[] {
    const { in: in_, azimuth = 0, elevation = 0, gain = 1 } = params;
    return multiNew("PanB", Rate.Audio, [in_, azimuth, elevation, gain], 4, [0, 1, 2, 3]) as Quad | Quad[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; elevation?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Quad | Quad[] {
    const { in: in_, azimuth = 0, elevation = 0, gain = 1 } = params;
    return multiNew("PanB", Rate.Control, [in_, azimuth, elevation, gain], 4, [0, 1, 2, 3]) as Quad | Quad[];
  },
} as unknown as PanBType;

interface PanB2Type {
  ar(params: { "in": UGenInput; azimuth?: UGenInput; gain?: UGenInput }): Trio;
  ar(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Trio[];
  kr(params: { "in": UGenInput; azimuth?: UGenInput; gain?: UGenInput }): Trio;
  kr(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Trio[];
}

export const PanB2 = {
  ar(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Trio | Trio[] {
    const { in: in_, azimuth = 0, gain = 1 } = params;
    return multiNew("PanB2", Rate.Audio, [in_, azimuth, gain], 3, [0, 1, 2]) as Trio | Trio[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; azimuth?: UGenInput | UGenInput[]; gain?: UGenInput | UGenInput[] }): Trio | Trio[] {
    const { in: in_, azimuth = 0, gain = 1 } = params;
    return multiNew("PanB2", Rate.Control, [in_, azimuth, gain], 3, [0, 1, 2]) as Trio | Trio[];
  },
} as unknown as PanB2Type;

interface PartConvType {
  ar(params: { "in": UGenInput; fftsize: UGenInput; irbufnum: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; fftsize: UGenInput | UGenInput[]; irbufnum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const PartConv = {
  ar(params: { "in": UGenInput | UGenInput[]; fftsize: UGenInput | UGenInput[]; irbufnum: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {
    const { in: in_, fftsize, irbufnum, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("PartConv", Rate.Audio, [in_, fftsize, irbufnum], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as PartConvType;

interface PauseType {
  kr(params: { gate: UGenInput; id: UGenInput }): UGenOutput;
  kr(params: { gate: UGenInput | UGenInput[]; id: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Pause = {
  kr(params: { gate: UGenInput | UGenInput[]; id: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { gate, id } = params;
    return multiNew("Pause", Rate.Control, [gate, id], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PauseType;

interface PauseSelfType {
  kr(params: { "in": UGenInput }): UGenOutput;
  kr(params: { "in": UGenInput | UGenInput[] }): UGenOutput[];
}

export const PauseSelf = {
  kr(params: { "in": UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_ } = params;
    return multiNew("PauseSelf", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as PauseSelfType;

interface PauseSelfWhenDoneType {
  kr(params: { src: UGenInput }): UGenOutput;
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PauseSelfWhenDone = {
  kr(params: { src: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { src } = params;
    return multiNew("PauseSelfWhenDone", Rate.Control, [src], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as PauseSelfWhenDoneType;

interface PeakType {
  ar(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Peak = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Peak", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("Peak", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PeakType;

interface PeakFollowerType {
  ar(params?: { "in"?: UGenInput; decay?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; decay?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; decay?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; decay?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PeakFollower = {
  ar(params: { "in"?: UGenInput | UGenInput[]; decay?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, decay = 0.999 } = params;
    return multiNew("PeakFollower", Rate.Audio, [in_, decay], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; decay?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, decay = 0.999 } = params;
    return multiNew("PeakFollower", Rate.Control, [in_, decay], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PeakFollowerType;

interface PhasorType {
  ar(params?: { trig?: UGenInput; rate?: UGenInput; start?: UGenInput; end?: UGenInput; resetPos?: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; resetPos?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { trig?: UGenInput; rate?: UGenInput; start?: UGenInput; end?: UGenInput; resetPos?: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; resetPos?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Phasor = {
  ar(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; resetPos?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, rate = 1, start = 0, end = 1, resetPos = 0 } = params;
    return multiNew("Phasor", Rate.Audio, [trig, rate, start, end, resetPos], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; resetPos?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, rate = 1, start = 0, end = 1, resetPos = 0 } = params;
    return multiNew("Phasor", Rate.Control, [trig, rate, start, end, resetPos], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as PhasorType;

export const PinkNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("PinkNoise", Rate.Audio, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("PinkNoise", Rate.Control, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
};

interface PitchType {
  kr(params?: { "in"?: UGenInput; initFreq?: UGenInput; minFreq?: UGenInput; maxFreq?: UGenInput; execFreq?: UGenInput; maxBinsPerOctave?: UGenInput; median?: UGenInput; ampThreshold?: UGenInput; peakThreshold?: UGenInput; downSample?: UGenInput; clar?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; initFreq?: UGenInput | UGenInput[]; minFreq?: UGenInput | UGenInput[]; maxFreq?: UGenInput | UGenInput[]; execFreq?: UGenInput | UGenInput[]; maxBinsPerOctave?: UGenInput | UGenInput[]; median?: UGenInput | UGenInput[]; ampThreshold?: UGenInput | UGenInput[]; peakThreshold?: UGenInput | UGenInput[]; downSample?: UGenInput | UGenInput[]; clar?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Pitch = {
  kr(params: { "in"?: UGenInput | UGenInput[]; initFreq?: UGenInput | UGenInput[]; minFreq?: UGenInput | UGenInput[]; maxFreq?: UGenInput | UGenInput[]; execFreq?: UGenInput | UGenInput[]; maxBinsPerOctave?: UGenInput | UGenInput[]; median?: UGenInput | UGenInput[]; ampThreshold?: UGenInput | UGenInput[]; peakThreshold?: UGenInput | UGenInput[]; downSample?: UGenInput | UGenInput[]; clar?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, initFreq = 440, minFreq = 60, maxFreq = 4000, execFreq = 100, maxBinsPerOctave = 16, median = 1, ampThreshold = 0.01, peakThreshold = 0.5, downSample = 1, clar = 0 } = params;
    return multiNew("Pitch", Rate.Control, [in_, initFreq, minFreq, maxFreq, execFreq, maxBinsPerOctave, median, ampThreshold, peakThreshold, downSample, clar], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) as UGenOutput | UGenOutput[];
  },
} as unknown as PitchType;

interface PitchShiftType {
  ar(params?: { "in"?: UGenInput; windowSize?: UGenInput; pitchRatio?: UGenInput; pitchDispersion?: UGenInput; timeDispersion?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; windowSize?: UGenInput | UGenInput[]; pitchRatio?: UGenInput | UGenInput[]; pitchDispersion?: UGenInput | UGenInput[]; timeDispersion?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const PitchShift = {
  ar(params: { "in"?: UGenInput | UGenInput[]; windowSize?: UGenInput | UGenInput[]; pitchRatio?: UGenInput | UGenInput[]; pitchDispersion?: UGenInput | UGenInput[]; timeDispersion?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, windowSize = 0.2, pitchRatio = 1, pitchDispersion = 0, timeDispersion = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("PitchShift", Rate.Audio, [in_, windowSize, pitchRatio, pitchDispersion, timeDispersion], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as PitchShiftType;

interface PlayBufType {
  ar(params: { numChannels: number; bufnum?: UGenInput; rate?: UGenInput; trigger?: UGenInput; startPos?: UGenInput; loop?: UGenInput; doneAction?: UGenInput }): UGenOutput[];
  ar(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; startPos?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[][];
  kr(params: { numChannels: number; bufnum?: UGenInput; rate?: UGenInput; trigger?: UGenInput; startPos?: UGenInput; loop?: UGenInput; doneAction?: UGenInput }): UGenOutput[];
  kr(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; startPos?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[][];
}

export const PlayBuf = {
  ar(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; startPos?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum = 0, rate = 1, trigger = 1, startPos = 0, loop = 0, doneAction = 0 } = params;
    return multiNew("PlayBuf", Rate.Audio, [bufnum, rate, trigger, startPos, loop, doneAction], numChannels, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
  },
  kr(params: { numChannels: number; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; startPos?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum = 0, rate = 1, trigger = 1, startPos = 0, loop = 0, doneAction = 0 } = params;
    return multiNew("PlayBuf", Rate.Control, [bufnum, rate, trigger, startPos, loop, doneAction], numChannels, [0, 1, 2, 3, 4, 5]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as PlayBufType;

interface PluckType {
  ar(params?: { "in"?: UGenInput; trig?: UGenInput; maxdelaytime?: UGenInput; delaytime?: UGenInput; decaytime?: UGenInput; coef?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const Pluck = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[]; maxdelaytime?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; coef?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 1, maxdelaytime = 0.2, delaytime = 0.2, decaytime = 1, coef = 0.5, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Pluck", Rate.Audio, [in_, trig, maxdelaytime, delaytime, decaytime, coef], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as PluckType;

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

interface PSinGrainType {
  ar(params?: { freq?: UGenInput; dur?: UGenInput; amp?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PSinGrain = {
  ar(params: { freq?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, dur = 0.2, amp = 0.1 } = params;
    return multiNew("PSinGrain", Rate.Audio, [freq, dur, amp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as PSinGrainType;

interface PulseType {
  ar(params?: { freq?: UGenInput; width?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; width?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as PulseType;

interface PulseCountType {
  ar(params?: { trig?: UGenInput; reset?: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { trig?: UGenInput; reset?: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PulseCount = {
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0 } = params;
    return multiNew("PulseCount", Rate.Audio, [trig, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0 } = params;
    return multiNew("PulseCount", Rate.Control, [trig, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PulseCountType;

interface PulseDividerType {
  ar(params?: { trig?: UGenInput; div?: UGenInput; start?: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[]; div?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { trig?: UGenInput; div?: UGenInput; start?: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[]; div?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PulseDivider = {
  ar(params: { trig?: UGenInput | UGenInput[]; div?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, div = 2, start = 0 } = params;
    return multiNew("PulseDivider", Rate.Audio, [trig, div, start], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; div?: UGenInput | UGenInput[]; start?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, div = 2, start = 0 } = params;
    return multiNew("PulseDivider", Rate.Control, [trig, div, start], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as PulseDividerType;

interface PV_AddType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_Add = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Add", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_AddType;

interface PV_BinScrambleType {
  "new"(params: { buffer: UGenInput; wipe?: UGenInput; width?: UGenInput; trig?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_BinScramble = {
  new(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wipe = 0, width = 0.2, trig = 0 } = params;
    return multiNew("PV_BinScramble", Rate.Scalar, [buffer, wipe, width, trig], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_BinScrambleType;

interface PV_BinShiftType {
  "new"(params: { buffer: UGenInput; stretch?: UGenInput; shift?: UGenInput; interp?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; stretch?: UGenInput | UGenInput[]; shift?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_BinShift = {
  new(params: { buffer: UGenInput | UGenInput[]; stretch?: UGenInput | UGenInput[]; shift?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, stretch = 1, shift = 0, interp = 0 } = params;
    return multiNew("PV_BinShift", Rate.Scalar, [buffer, stretch, shift, interp], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_BinShiftType;

interface PV_BinWipeType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput; wipe?: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_BinWipe = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB, wipe = 0 } = params;
    return multiNew("PV_BinWipe", Rate.Scalar, [bufferA, bufferB, wipe], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_BinWipeType;

interface PV_BrickWallType {
  "new"(params: { buffer: UGenInput; wipe?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_BrickWall = {
  new(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wipe = 0 } = params;
    return multiNew("PV_BrickWall", Rate.Scalar, [buffer, wipe], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_BrickWallType;

interface PV_ConformalMapType {
  "new"(params: { buffer: UGenInput; areal?: UGenInput; aimag?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; areal?: UGenInput | UGenInput[]; aimag?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_ConformalMap = {
  new(params: { buffer: UGenInput | UGenInput[]; areal?: UGenInput | UGenInput[]; aimag?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, areal = 0, aimag = 0 } = params;
    return multiNew("PV_ConformalMap", Rate.Scalar, [buffer, areal, aimag], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_ConformalMapType;

interface PV_ConjType {
  "new"(params: { buffer: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_Conj = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_Conj", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_ConjType;

interface PV_CopyType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_Copy = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Copy", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_CopyType;

interface PV_CopyPhaseType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_CopyPhase = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_CopyPhase", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_CopyPhaseType;

interface PV_DiffuserType {
  "new"(params: { buffer: UGenInput; trig?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_Diffuser = {
  new(params: { buffer: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, trig = 0 } = params;
    return multiNew("PV_Diffuser", Rate.Scalar, [buffer, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_DiffuserType;

interface PV_DivType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_Div = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Div", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_DivType;

interface PV_HainsworthFooteType {
  ar(params: { buffer: UGenInput; proph?: UGenInput; propf?: UGenInput; threshold?: UGenInput; waittime?: UGenInput }): UGenOutput;
  ar(params: { buffer: UGenInput | UGenInput[]; proph?: UGenInput | UGenInput[]; propf?: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; waittime?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_HainsworthFoote = {
  ar(params: { buffer: UGenInput | UGenInput[]; proph?: UGenInput | UGenInput[]; propf?: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; waittime?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, proph = 0, propf = 0, threshold = 1, waittime = 0.04 } = params;
    return multiNew("PV_HainsworthFoote", Rate.Audio, [buffer, proph, propf, threshold, waittime], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_HainsworthFooteType;

interface PV_JensenAndersenType {
  ar(params: { buffer: UGenInput; propsc?: UGenInput; prophfe?: UGenInput; prophfc?: UGenInput; propsf?: UGenInput; threshold?: UGenInput; waittime?: UGenInput }): UGenOutput;
  ar(params: { buffer: UGenInput | UGenInput[]; propsc?: UGenInput | UGenInput[]; prophfe?: UGenInput | UGenInput[]; prophfc?: UGenInput | UGenInput[]; propsf?: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; waittime?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_JensenAndersen = {
  ar(params: { buffer: UGenInput | UGenInput[]; propsc?: UGenInput | UGenInput[]; prophfe?: UGenInput | UGenInput[]; prophfc?: UGenInput | UGenInput[]; propsf?: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[]; waittime?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, propsc = 0.25, prophfe = 0.25, prophfc = 0.25, propsf = 0.25, threshold = 1, waittime = 0.04 } = params;
    return multiNew("PV_JensenAndersen", Rate.Audio, [buffer, propsc, prophfe, prophfc, propsf, threshold, waittime], 1, [0, 1, 2, 3, 4, 5, 6]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_JensenAndersenType;

interface PV_LocalMaxType {
  "new"(params: { buffer: UGenInput; threshold?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_LocalMax = {
  new(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, threshold = 0 } = params;
    return multiNew("PV_LocalMax", Rate.Scalar, [buffer, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_LocalMaxType;

interface PV_MagAboveType {
  "new"(params: { buffer: UGenInput; threshold?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagAbove = {
  new(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, threshold = 0 } = params;
    return multiNew("PV_MagAbove", Rate.Scalar, [buffer, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagAboveType;

interface PV_MagBelowType {
  "new"(params: { buffer: UGenInput; threshold?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagBelow = {
  new(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, threshold = 0 } = params;
    return multiNew("PV_MagBelow", Rate.Scalar, [buffer, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagBelowType;

interface PV_MagClipType {
  "new"(params: { buffer: UGenInput; threshold?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagClip = {
  new(params: { buffer: UGenInput | UGenInput[]; threshold?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, threshold = 0 } = params;
    return multiNew("PV_MagClip", Rate.Scalar, [buffer, threshold], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagClipType;

interface PV_MagDivType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput; zeroed?: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; zeroed?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagDiv = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; zeroed?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB, zeroed = 0.0001 } = params;
    return multiNew("PV_MagDiv", Rate.Scalar, [bufferA, bufferB, zeroed], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagDivType;

interface PV_MagFreezeType {
  "new"(params: { buffer: UGenInput; freeze?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; freeze?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagFreeze = {
  new(params: { buffer: UGenInput | UGenInput[]; freeze?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, freeze = 0 } = params;
    return multiNew("PV_MagFreeze", Rate.Scalar, [buffer, freeze], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagFreezeType;

interface PV_MagMulType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagMul = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_MagMul", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagMulType;

interface PV_MagNoiseType {
  "new"(params: { buffer: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagNoise = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_MagNoise", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagNoiseType;

interface PV_MagShiftType {
  "new"(params: { buffer: UGenInput; stretch?: UGenInput; shift?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; stretch?: UGenInput | UGenInput[]; shift?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagShift = {
  new(params: { buffer: UGenInput | UGenInput[]; stretch?: UGenInput | UGenInput[]; shift?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, stretch = 1, shift = 0 } = params;
    return multiNew("PV_MagShift", Rate.Scalar, [buffer, stretch, shift], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagShiftType;

interface PV_MagSmearType {
  "new"(params: { buffer: UGenInput; bins?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; bins?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagSmear = {
  new(params: { buffer: UGenInput | UGenInput[]; bins?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, bins = 0 } = params;
    return multiNew("PV_MagSmear", Rate.Scalar, [buffer, bins], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagSmearType;

interface PV_MagSquaredType {
  "new"(params: { buffer: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_MagSquared = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_MagSquared", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MagSquaredType;

interface PV_MaxType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_Max = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Max", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MaxType;

interface PV_MinType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_Min = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Min", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MinType;

interface PV_MulType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_Mul = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB } = params;
    return multiNew("PV_Mul", Rate.Scalar, [bufferA, bufferB], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_MulType;

interface PV_PhaseShiftType {
  "new"(params: { buffer: UGenInput; shift: UGenInput; integrate?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; shift: UGenInput | UGenInput[]; integrate?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_PhaseShift = {
  new(params: { buffer: UGenInput | UGenInput[]; shift: UGenInput | UGenInput[]; integrate?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, shift, integrate = 0 } = params;
    return multiNew("PV_PhaseShift", Rate.Scalar, [buffer, shift, integrate], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_PhaseShiftType;

interface PV_PhaseShift270Type {
  "new"(params: { buffer: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_PhaseShift270 = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_PhaseShift270", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_PhaseShift270Type;

interface PV_PhaseShift90Type {
  "new"(params: { buffer: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_PhaseShift90 = {
  new(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("PV_PhaseShift90", Rate.Scalar, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_PhaseShift90Type;

interface PV_RandCombType {
  "new"(params: { buffer: UGenInput; wipe?: UGenInput; trig?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_RandComb = {
  new(params: { buffer: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, wipe = 0, trig = 0 } = params;
    return multiNew("PV_RandComb", Rate.Scalar, [buffer, wipe, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_RandCombType;

interface PV_RandWipeType {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput; wipe?: UGenInput; trig?: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_RandWipe = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; wipe?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB, wipe = 0, trig = 0 } = params;
    return multiNew("PV_RandWipe", Rate.Scalar, [bufferA, bufferB, wipe, trig], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_RandWipeType;

interface PV_RectCombType {
  "new"(params: { buffer: UGenInput; numTeeth?: UGenInput; phase?: UGenInput; width?: UGenInput }): UGenOutput;
  "new"(params: { buffer: UGenInput | UGenInput[]; numTeeth?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_RectComb = {
  new(params: { buffer: UGenInput | UGenInput[]; numTeeth?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, numTeeth = 0, phase = 0, width = 0.5 } = params;
    return multiNew("PV_RectComb", Rate.Scalar, [buffer, numTeeth, phase, width], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_RectCombType;

interface PV_RectComb2Type {
  "new"(params: { bufferA: UGenInput; bufferB: UGenInput; numTeeth?: UGenInput; phase?: UGenInput; width?: UGenInput }): UGenOutput;
  "new"(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; numTeeth?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const PV_RectComb2 = {
  new(params: { bufferA: UGenInput | UGenInput[]; bufferB: UGenInput | UGenInput[]; numTeeth?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { bufferA, bufferB, numTeeth = 0, phase = 0, width = 0.5 } = params;
    return multiNew("PV_RectComb2", Rate.Scalar, [bufferA, bufferB, numTeeth, phase, width], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as PV_RectComb2Type;

interface QuadCType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; c?: UGenInput; xi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const QuadC = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = -1, c = -0.75, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("QuadC", Rate.Audio, [freq, a, b, c, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as QuadCType;

interface QuadLType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; c?: UGenInput; xi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const QuadL = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = -1, c = -0.75, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("QuadL", Rate.Audio, [freq, a, b, c, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as QuadLType;

interface QuadNType {
  ar(params?: { freq?: UGenInput; a?: UGenInput; b?: UGenInput; c?: UGenInput; xi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const QuadN = {
  ar(params: { freq?: UGenInput | UGenInput[]; a?: UGenInput | UGenInput[]; b?: UGenInput | UGenInput[]; c?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, a = 1, b = -1, c = -0.75, xi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("QuadN", Rate.Audio, [freq, a, b, c, xi], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as QuadNType;

export const RadiansPerSample = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("RadiansPerSample", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

interface RampType {
  ar(params?: { "in"?: UGenInput; lagTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lagTime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lagTime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as RampType;

interface RandType {
  "new"(params?: { lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  "new"(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Rand = {
  new(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1 } = params;
    return multiNew("Rand", Rate.Scalar, [lo, hi], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as RandType;

interface RandIDType {
  kr(params?: { id?: UGenInput }): UGenOutput;
  kr(params: { id?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { id?: UGenInput }): UGenOutput;
  ir(params: { id?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const RandID = {
  kr(params: { id?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { id = 0 } = params;
    return multiNew("RandID", Rate.Control, [id], 1, [0]) as UGenOutput | UGenOutput[];
  },
  ir(params: { id?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { id = 0 } = params;
    return multiNew("RandID", Rate.Scalar, [id], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as RandIDType;

interface RandSeedType {
  ar(params?: { trig?: UGenInput; seed?: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[]; seed?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { trig?: UGenInput; seed?: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[]; seed?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { trig?: UGenInput; seed?: UGenInput }): UGenOutput;
  ir(params: { trig?: UGenInput | UGenInput[]; seed?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as RandSeedType;

interface RecordBufType {
  ar(params: { inputArray: UGenInput; bufnum?: UGenInput; offset?: UGenInput; recLevel?: UGenInput; preLevel?: UGenInput; run?: UGenInput; loop?: UGenInput; trigger?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  ar(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[]; recLevel?: UGenInput | UGenInput[]; preLevel?: UGenInput | UGenInput[]; run?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { inputArray: UGenInput; bufnum?: UGenInput; offset?: UGenInput; recLevel?: UGenInput; preLevel?: UGenInput; run?: UGenInput; loop?: UGenInput; trigger?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  kr(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[]; recLevel?: UGenInput | UGenInput[]; preLevel?: UGenInput | UGenInput[]; run?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as RecordBufType;

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

interface ResonzType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; bwr?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bwr?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; bwr?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; bwr?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as ResonzType;

interface RHPFType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as RHPFType;

interface RingzType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; decaytime?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; decaytime?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as RingzType;

interface RLPFType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; rq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; rq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as RLPFType;

interface Rotate2Type {
  ar(params: { x: UGenInput; y: UGenInput; pos?: UGenInput }): Stereo;
  ar(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[] }): Stereo[];
  kr(params: { x: UGenInput; y: UGenInput; pos?: UGenInput }): Stereo;
  kr(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[] }): Stereo[];
}

export const Rotate2 = {
  ar(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[] }): Stereo | Stereo[] {
    const { x, y, pos = 0 } = params;
    return multiNew("Rotate2", Rate.Audio, [x, y, pos], 2, [0, 1, 2]) as Stereo | Stereo[];
  },
  kr(params: { x: UGenInput | UGenInput[]; y: UGenInput | UGenInput[]; pos?: UGenInput | UGenInput[] }): Stereo | Stereo[] {
    const { x, y, pos = 0 } = params;
    return multiNew("Rotate2", Rate.Control, [x, y, pos], 2, [0, 1, 2]) as Stereo | Stereo[];
  },
} as unknown as Rotate2Type;

interface RunningMaxType {
  ar(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const RunningMax = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("RunningMax", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("RunningMax", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as RunningMaxType;

interface RunningMinType {
  ar(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const RunningMin = {
  ar(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("RunningMin", Rate.Audio, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, trig = 0 } = params;
    return multiNew("RunningMin", Rate.Control, [in_, trig], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as RunningMinType;

interface RunningSumType {
  ar(params: { "in": UGenInput; numsamp?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; numsamp?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { "in": UGenInput; numsamp?: UGenInput }): UGenOutput;
  kr(params: { "in": UGenInput | UGenInput[]; numsamp?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const RunningSum = {
  ar(params: { "in": UGenInput | UGenInput[]; numsamp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, numsamp = 40 } = params;
    return multiNew("RunningSum", Rate.Audio, [in_, numsamp], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in": UGenInput | UGenInput[]; numsamp?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { in: in_, numsamp = 40 } = params;
    return multiNew("RunningSum", Rate.Control, [in_, numsamp], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as RunningSumType;

export const SampleDur = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("SampleDur", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

export const SampleRate = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("SampleRate", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

interface SanitizeType {
  ar(params?: { "in"?: UGenInput; replace?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; replace?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; replace?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; replace?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Sanitize = {
  ar(params: { "in"?: UGenInput | UGenInput[]; replace?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, replace = 0 } = params;
    return multiNew("Sanitize", Rate.Audio, [in_, replace], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; replace?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, replace = 0 } = params;
    return multiNew("Sanitize", Rate.Control, [in_, replace], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as SanitizeType;

interface SawType {
  ar(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as SawType;

interface SchmidtType {
  ar(params: { "in": UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as SchmidtType;

interface ScopeOutType {
  ar(params: { inputArray: UGenInput; bufnum?: UGenInput }): UGenOutput;
  ar(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { inputArray: UGenInput; bufnum?: UGenInput }): UGenOutput;
  kr(params: { inputArray: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as ScopeOutType;

interface ScopeOut2Type {
  ar(params: { inputArray: UGenInput; scopeNum?: UGenInput; maxFrames?: UGenInput; scopeFrames: UGenInput }): UGenOutput;
  ar(params: { inputArray: UGenInput | UGenInput[]; scopeNum?: UGenInput | UGenInput[]; maxFrames?: UGenInput | UGenInput[]; scopeFrames: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { inputArray: UGenInput; scopeNum?: UGenInput; maxFrames?: UGenInput; scopeFrames: UGenInput }): UGenOutput;
  kr(params: { inputArray: UGenInput | UGenInput[]; scopeNum?: UGenInput | UGenInput[]; maxFrames?: UGenInput | UGenInput[]; scopeFrames: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as ScopeOut2Type;

interface SelectType {
  ar(params: { which: UGenInput; array: UGenInput }): UGenOutput;
  ar(params: { which: UGenInput | UGenInput[]; array: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { which: UGenInput; array: UGenInput }): UGenOutput;
  kr(params: { which: UGenInput | UGenInput[]; array: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as SelectType;

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

interface SetBufType {
  "new"(params: { buf: UGenInput; values: UGenInput; offset?: UGenInput }): UGenOutput;
  "new"(params: { buf: UGenInput | UGenInput[]; values: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const SetBuf = {
  new(params: { buf: UGenInput | UGenInput[]; values: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buf, values, offset = 0 } = params;
    const valuesList = Array.isArray(values) ? values : [values];
    const inputs: (UGenInput | UGenInput[])[] = [buf, offset, valuesList.length, ...valuesList];
    return multiNew("SetBuf", Rate.Scalar, inputs, 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as SetBufType;

interface SetResetFFType {
  ar(params?: { trig?: UGenInput; reset?: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { trig?: UGenInput; reset?: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const SetResetFF = {
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0 } = params;
    return multiNew("SetResetFF", Rate.Audio, [trig, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0 } = params;
    return multiNew("SetResetFF", Rate.Control, [trig, reset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as SetResetFFType;

interface ShaperType {
  ar(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as ShaperType;

interface SinOscType {
  ar(params?: { freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as SinOscType;

interface SinOscFBType {
  ar(params?: { freq?: UGenInput; feedback?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; feedback?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; feedback?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; feedback?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as SinOscFBType;

interface SlewType {
  ar(params?: { "in"?: UGenInput; up?: UGenInput; dn?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; up?: UGenInput | UGenInput[]; dn?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; up?: UGenInput; dn?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; up?: UGenInput | UGenInput[]; dn?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as SlewType;

interface SlopeType {
  ar(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as SlopeType;

interface SOSType {
  ar(params?: { "in"?: UGenInput; a0?: UGenInput; a1?: UGenInput; a2?: UGenInput; b1?: UGenInput; b2?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; a0?: UGenInput | UGenInput[]; a1?: UGenInput | UGenInput[]; a2?: UGenInput | UGenInput[]; b1?: UGenInput | UGenInput[]; b2?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; a0?: UGenInput; a1?: UGenInput; a2?: UGenInput; b1?: UGenInput; b2?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; a0?: UGenInput | UGenInput[]; a1?: UGenInput | UGenInput[]; a2?: UGenInput | UGenInput[]; b1?: UGenInput | UGenInput[]; b2?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as SOSType;

interface SpecCentroidType {
  kr(params: { buffer: UGenInput }): UGenOutput;
  kr(params: { buffer: UGenInput | UGenInput[] }): UGenOutput[];
}

export const SpecCentroid = {
  kr(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("SpecCentroid", Rate.Control, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as SpecCentroidType;

interface SpecFlatnessType {
  kr(params: { buffer: UGenInput }): UGenOutput;
  kr(params: { buffer: UGenInput | UGenInput[] }): UGenOutput[];
}

export const SpecFlatness = {
  kr(params: { buffer: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer } = params;
    return multiNew("SpecFlatness", Rate.Control, [buffer], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as SpecFlatnessType;

interface SpecPcileType {
  kr(params: { buffer: UGenInput; fraction?: UGenInput; interpolate?: UGenInput; binout?: UGenInput }): UGenOutput;
  kr(params: { buffer: UGenInput | UGenInput[]; fraction?: UGenInput | UGenInput[]; interpolate?: UGenInput | UGenInput[]; binout?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const SpecPcile = {
  kr(params: { buffer: UGenInput | UGenInput[]; fraction?: UGenInput | UGenInput[]; interpolate?: UGenInput | UGenInput[]; binout?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { buffer, fraction = 0.5, interpolate = 0, binout = 0 } = params;
    return multiNew("SpecPcile", Rate.Control, [buffer, fraction, interpolate, binout], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as SpecPcileType;

interface SplayType {
  ar(params: { inArray: UGenInput; spread?: UGenInput; level?: UGenInput; center?: UGenInput; levelComp: UGenInput }): UGenOutput;
  ar(params: { inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { inArray: UGenInput; spread?: UGenInput; level?: UGenInput; center?: UGenInput; levelComp: UGenInput }): UGenOutput;
  kr(params: { inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as SplayType;

interface SplayAzType {
  ar(params: { numChans?: UGenInput; inArray: UGenInput; spread?: UGenInput; level?: UGenInput; width?: UGenInput; center?: UGenInput; orientation?: UGenInput; levelComp: UGenInput }): UGenOutput;
  ar(params: { numChans?: UGenInput | UGenInput[]; inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { numChans?: UGenInput; inArray: UGenInput; spread?: UGenInput; level?: UGenInput; width?: UGenInput; center?: UGenInput; orientation?: UGenInput; levelComp: UGenInput }): UGenOutput;
  kr(params: { numChans?: UGenInput | UGenInput[]; inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput[];
}

export const SplayAz = {
  ar(params: { numChans?: UGenInput | UGenInput[]; inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans = 4, inArray, spread = 1, level = 1, width = 2, center = 0, orientation = 0.5, levelComp } = params;
    return multiNew("SplayAz", Rate.Audio, [numChans, inArray, spread, level, width, center, orientation, levelComp], 1, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput | UGenOutput[];
  },
  kr(params: { numChans?: UGenInput | UGenInput[]; inArray: UGenInput | UGenInput[]; spread?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; center?: UGenInput | UGenInput[]; orientation?: UGenInput | UGenInput[]; levelComp: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { numChans = 4, inArray, spread = 1, level = 1, width = 2, center = 0, orientation = 0.5, levelComp } = params;
    return multiNew("SplayAz", Rate.Control, [numChans, inArray, spread, level, width, center, orientation, levelComp], 1, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput | UGenOutput[];
  },
} as unknown as SplayAzType;

interface SpringType {
  ar(params?: { "in"?: UGenInput; spring?: UGenInput; damp?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; spring?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; spring?: UGenInput; damp?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; spring?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Spring = {
  ar(params: { "in"?: UGenInput | UGenInput[]; spring?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, spring = 1, damp = 0 } = params;
    return multiNew("Spring", Rate.Audio, [in_, spring, damp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; spring?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, spring = 1, damp = 0 } = params;
    return multiNew("Spring", Rate.Control, [in_, spring, damp], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as SpringType;

interface StandardLType {
  ar(params?: { freq?: UGenInput; k?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; k?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const StandardL = {
  ar(params: { freq?: UGenInput | UGenInput[]; k?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, k = 1, xi = 0.5, yi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("StandardL", Rate.Audio, [freq, k, xi, yi], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as StandardLType;

interface StandardNType {
  ar(params?: { freq?: UGenInput; k?: UGenInput; xi?: UGenInput; yi?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; k?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

export const StandardN = {
  ar(params: { freq?: UGenInput | UGenInput[]; k?: UGenInput | UGenInput[]; xi?: UGenInput | UGenInput[]; yi?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput | UGenOutput[] {
    const { freq = 22050, k = 1, xi = 0.5, yi = 0, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("StandardN", Rate.Audio, [freq, k, xi, yi], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];
  },
} as unknown as StandardNType;

interface StepperType {
  ar(params: { trig?: UGenInput; reset?: UGenInput; min?: UGenInput; max?: UGenInput; step?: UGenInput; resetval: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; min?: UGenInput | UGenInput[]; max?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; resetval: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { trig?: UGenInput; reset?: UGenInput; min?: UGenInput; max?: UGenInput; step?: UGenInput; resetval: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; min?: UGenInput | UGenInput[]; max?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; resetval: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Stepper = {
  ar(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; min?: UGenInput | UGenInput[]; max?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; resetval: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0, min = 0, max = 7, step = 1, resetval } = params;
    return multiNew("Stepper", Rate.Audio, [trig, reset, min, max, step, resetval], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; min?: UGenInput | UGenInput[]; max?: UGenInput | UGenInput[]; step?: UGenInput | UGenInput[]; resetval: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { trig = 0, reset = 0, min = 0, max = 7, step = 1, resetval } = params;
    return multiNew("Stepper", Rate.Control, [trig, reset, min, max, step, resetval], 1, [0, 1, 2, 3, 4, 5]) as UGenOutput | UGenOutput[];
  },
} as unknown as StepperType;

interface StereoConvolution2LType {
  ar(params: { "in": UGenInput; kernelL: UGenInput; kernelR: UGenInput; trigger?: UGenInput; framesize?: UGenInput; crossfade?: UGenInput; mul?: UGenInput; add?: UGenInput }): Stereo;
  ar(params: { "in": UGenInput | UGenInput[]; kernelL: UGenInput | UGenInput[]; kernelR: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; crossfade?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): Stereo[];
}

export const StereoConvolution2L = {
  ar(params: { "in": UGenInput | UGenInput[]; kernelL: UGenInput | UGenInput[]; kernelR: UGenInput | UGenInput[]; trigger?: UGenInput | UGenInput[]; framesize?: UGenInput | UGenInput[]; crossfade?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): Stereo | Stereo[] {
    const { in: in_, kernelL, kernelR, trigger = 0, framesize = 2048, crossfade = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("StereoConvolution2L", Rate.Audio, [in_, kernelL, kernelR, trigger, framesize, crossfade], 2, [0, 1, 2, 3, 4, 5]) as Stereo | Stereo[];
    return applyMulAdd(ugenOutput as any, mul, add) as Stereo | Stereo[];
  },
} as unknown as StereoConvolution2LType;

export const SubsampleOffset = {
  ir(params: {  } = {}): UGenOutput {
    const {  } = params;
    return multiNew("SubsampleOffset", Rate.Scalar, [], 1, []) as UGenOutput;
  },
};

interface SweepType {
  ar(params?: { trig?: UGenInput; rate?: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { trig?: UGenInput; rate?: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Sweep = {
  ar(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, rate = 1 } = params;
    return multiNew("Sweep", Rate.Audio, [trig, rate], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0, rate = 1 } = params;
    return multiNew("Sweep", Rate.Control, [trig, rate], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as SweepType;

interface SyncSawType {
  ar(params?: { syncFreq?: UGenInput; sawFreq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { syncFreq?: UGenInput | UGenInput[]; sawFreq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { syncFreq?: UGenInput; sawFreq?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { syncFreq?: UGenInput | UGenInput[]; sawFreq?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as SyncSawType;

interface T2AType {
  ar(params?: { "in"?: UGenInput; offset?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const T2A = {
  ar(params: { "in"?: UGenInput | UGenInput[]; offset?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, offset = 0 } = params;
    return multiNew("T2A", Rate.Audio, [in_, offset], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as T2AType;

interface T2KType {
  kr(params?: { "in"?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const T2K = {
  kr(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("T2K", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as T2KType;

interface TapType {
  ar(params?: { bufnum?: UGenInput; numChannels?: UGenInput; delaytime?: UGenInput }): UGenOutput;
  ar(params: { bufnum?: UGenInput | UGenInput[]; numChannels?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Tap = {
  ar(params: { bufnum?: UGenInput | UGenInput[]; numChannels?: UGenInput | UGenInput[]; delaytime?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { bufnum = 0, numChannels = 1, delaytime = 0.2 } = params;
    return multiNew("Tap", Rate.Audio, [bufnum, numChannels, delaytime], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as TapType;

interface TBallType {
  ar(params?: { "in"?: UGenInput; g?: UGenInput; damp?: UGenInput; friction?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; g?: UGenInput; damp?: UGenInput; friction?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const TBall = {
  ar(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, g = 10, damp = 0, friction = 0.01 } = params;
    return multiNew("TBall", Rate.Audio, [in_, g, damp, friction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; g?: UGenInput | UGenInput[]; damp?: UGenInput | UGenInput[]; friction?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, g = 10, damp = 0, friction = 0.01 } = params;
    return multiNew("TBall", Rate.Control, [in_, g, damp, friction], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as TBallType;

interface TDelayType {
  ar(params?: { "in"?: UGenInput; dur?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; dur?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const TDelay = {
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("TDelay", Rate.Audio, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("TDelay", Rate.Control, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as TDelayType;

interface TDutyType {
  ar(params?: { dur?: UGenInput; reset?: UGenInput; level?: UGenInput; doneAction?: UGenInput; gapFirst?: UGenInput }): UGenOutput;
  ar(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[]; gapFirst?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { dur?: UGenInput; reset?: UGenInput; level?: UGenInput; doneAction?: UGenInput; gapFirst?: UGenInput }): UGenOutput;
  kr(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[]; gapFirst?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const TDuty = {
  ar(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[]; gapFirst?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { dur = 1, reset = 0, level = 1, doneAction = 0, gapFirst = 0 } = params;
    return multiNew("TDuty", Rate.Audio, [dur, reset, level, doneAction, gapFirst], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
  kr(params: { dur?: UGenInput | UGenInput[]; reset?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[]; doneAction?: UGenInput | UGenInput[]; gapFirst?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { dur = 1, reset = 0, level = 1, doneAction = 0, gapFirst = 0 } = params;
    return multiNew("TDuty", Rate.Control, [dur, reset, level, doneAction, gapFirst], 1, [0, 1, 2, 3, 4]) as UGenOutput | UGenOutput[];
  },
} as unknown as TDutyType;

interface TExpRandType {
  ar(params?: { lo?: UGenInput; hi?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { lo?: UGenInput; hi?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const TExpRand = {
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0.01, hi = 1, trig = 0 } = params;
    return multiNew("TExpRand", Rate.Audio, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0.01, hi = 1, trig = 0 } = params;
    return multiNew("TExpRand", Rate.Control, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as TExpRandType;

interface TGrainsType {
  ar(params: { numChannels: number; trigger?: UGenInput; bufnum?: UGenInput; rate?: UGenInput; centerPos?: UGenInput; dur?: UGenInput; pan?: UGenInput; amp?: UGenInput; interp?: UGenInput }): UGenOutput[];
  ar(params: { numChannels: number; trigger?: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; centerPos?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[] }): UGenOutput[][];
}

export const TGrains = {
  ar(params: { numChannels: number; trigger?: UGenInput | UGenInput[]; bufnum?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; centerPos?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; amp?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, trigger = 0, bufnum = 0, rate = 1, centerPos = 0, dur = 0.1, pan = 0, amp = 0.1, interp = 4 } = params;
    return multiNew("TGrains", Rate.Audio, [trigger, bufnum, rate, centerPos, dur, pan, amp, interp], numChannels, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as TGrainsType;

interface TimerType {
  ar(params?: { trig?: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { trig?: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Timer = {
  ar(params: { trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0 } = params;
    return multiNew("Timer", Rate.Audio, [trig], 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0 } = params;
    return multiNew("Timer", Rate.Control, [trig], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as TimerType;

interface TIRandType {
  ar(params?: { lo?: UGenInput; hi?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { lo?: UGenInput; hi?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const TIRand = {
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 127, trig = 0 } = params;
    return multiNew("TIRand", Rate.Audio, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 127, trig = 0 } = params;
    return multiNew("TIRand", Rate.Control, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as TIRandType;

interface ToggleFFType {
  ar(params?: { trig?: UGenInput }): UGenOutput;
  ar(params: { trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { trig?: UGenInput }): UGenOutput;
  kr(params: { trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const ToggleFF = {
  ar(params: { trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0 } = params;
    return multiNew("ToggleFF", Rate.Audio, [trig], 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { trig = 0 } = params;
    return multiNew("ToggleFF", Rate.Control, [trig], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as ToggleFFType;

interface TRandType {
  ar(params?: { lo?: UGenInput; hi?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { lo?: UGenInput; hi?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const TRand = {
  ar(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, trig = 0 } = params;
    return multiNew("TRand", Rate.Audio, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
  kr(params: { lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { lo = 0, hi = 1, trig = 0 } = params;
    return multiNew("TRand", Rate.Control, [lo, hi, trig], 1, [0, 1, 2]) as UGenOutput | UGenOutput[];
  },
} as unknown as TRandType;

interface TrigType {
  ar(params?: { "in"?: UGenInput; dur?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; dur?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Trig = {
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("Trig", Rate.Audio, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("Trig", Rate.Control, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as TrigType;

interface Trig1Type {
  ar(params?: { "in"?: UGenInput; dur?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; dur?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Trig1 = {
  ar(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("Trig1", Rate.Audio, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0, dur = 0.1 } = params;
    return multiNew("Trig1", Rate.Control, [in_, dur], 1, [0, 1]) as UGenOutput | UGenOutput[];
  },
} as unknown as Trig1Type;

interface TWindexType {
  ar(params: { "in": UGenInput; array: UGenInput; normalize?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; array: UGenInput | UGenInput[]; normalize?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { "in": UGenInput; array: UGenInput; normalize?: UGenInput }): UGenOutput;
  kr(params: { "in": UGenInput | UGenInput[]; array: UGenInput | UGenInput[]; normalize?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as TWindexType;

interface TwoPoleType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; radius?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; radius?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as TwoPoleType;

interface TwoZeroType {
  ar(params?: { "in"?: UGenInput; freq?: UGenInput; radius?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; freq?: UGenInput; radius?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; radius?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as TwoZeroType;

interface Unpack1FFTType {
  "new"(params: { chain: UGenInput; bufsize: UGenInput; binindex: UGenInput; whichmeasure?: UGenInput }): UGenOutput;
  "new"(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; binindex: UGenInput | UGenInput[]; whichmeasure?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Unpack1FFT = {
  new(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; binindex: UGenInput | UGenInput[]; whichmeasure?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, bufsize, binindex, whichmeasure = 0 } = params;
    return multiNew("Unpack1FFT", Rate.Scalar, [chain, bufsize, binindex, whichmeasure], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as Unpack1FFTType;

interface UnpackFFTType {
  "new"(params: { chain: UGenInput; bufsize: UGenInput; frombin?: UGenInput; tobin: UGenInput }): UGenOutput;
  "new"(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; frombin?: UGenInput | UGenInput[]; tobin: UGenInput | UGenInput[] }): UGenOutput[];
}

export const UnpackFFT = {
  new(params: { chain: UGenInput | UGenInput[]; bufsize: UGenInput | UGenInput[]; frombin?: UGenInput | UGenInput[]; tobin: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { chain, bufsize, frombin = 0, tobin } = params;
    return multiNew("UnpackFFT", Rate.Scalar, [chain, bufsize, frombin, tobin], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as UnpackFFTType;

interface VarLagType {
  ar(params: { "in"?: UGenInput; time?: UGenInput; curvature?: UGenInput; warp?: UGenInput; start: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; curvature?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; start: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { "in"?: UGenInput; time?: UGenInput; curvature?: UGenInput; warp?: UGenInput; start: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; time?: UGenInput | UGenInput[]; curvature?: UGenInput | UGenInput[]; warp?: UGenInput | UGenInput[]; start: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as VarLagType;

interface VarSawType {
  ar(params?: { freq?: UGenInput; iphase?: UGenInput; width?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params?: { freq?: UGenInput; iphase?: UGenInput; width?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; width?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as VarSawType;

interface VDiskInType {
  ar(params: { numChannels: number; bufnum: UGenInput; rate?: UGenInput; loop?: UGenInput; sendID?: UGenInput }): UGenOutput[];
  ar(params: { numChannels: number; bufnum: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; sendID?: UGenInput | UGenInput[] }): UGenOutput[][];
}

export const VDiskIn = {
  ar(params: { numChannels: number; bufnum: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; loop?: UGenInput | UGenInput[]; sendID?: UGenInput | UGenInput[] }): UGenOutput[] | UGenOutput[][] {
    const { numChannels, bufnum, rate = 1, loop = 0, sendID = 0 } = params;
    return multiNew("VDiskIn", Rate.Audio, [bufnum, rate, loop, sendID], numChannels, [0, 1, 2, 3]) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as VDiskInType;

interface VibratoType {
  ar(params?: { freq?: UGenInput; rate?: UGenInput; depth?: UGenInput; delay?: UGenInput; onset?: UGenInput; rateVariation?: UGenInput; depthVariation?: UGenInput; iphase?: UGenInput; trig?: UGenInput }): UGenOutput;
  ar(params: { freq?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; depth?: UGenInput | UGenInput[]; delay?: UGenInput | UGenInput[]; onset?: UGenInput | UGenInput[]; rateVariation?: UGenInput | UGenInput[]; depthVariation?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { freq?: UGenInput; rate?: UGenInput; depth?: UGenInput; delay?: UGenInput; onset?: UGenInput; rateVariation?: UGenInput; depthVariation?: UGenInput; iphase?: UGenInput; trig?: UGenInput }): UGenOutput;
  kr(params: { freq?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; depth?: UGenInput | UGenInput[]; delay?: UGenInput | UGenInput[]; onset?: UGenInput | UGenInput[]; rateVariation?: UGenInput | UGenInput[]; depthVariation?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const Vibrato = {
  ar(params: { freq?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; depth?: UGenInput | UGenInput[]; delay?: UGenInput | UGenInput[]; onset?: UGenInput | UGenInput[]; rateVariation?: UGenInput | UGenInput[]; depthVariation?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, rate = 6, depth = 0.02, delay = 0, onset = 0, rateVariation = 0.04, depthVariation = 0.1, iphase = 0, trig = 0 } = params;
    return multiNew("Vibrato", Rate.Audio, [freq, rate, depth, delay, onset, rateVariation, depthVariation, iphase, trig], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput | UGenOutput[];
  },
  kr(params: { freq?: UGenInput | UGenInput[]; rate?: UGenInput | UGenInput[]; depth?: UGenInput | UGenInput[]; delay?: UGenInput | UGenInput[]; onset?: UGenInput | UGenInput[]; rateVariation?: UGenInput | UGenInput[]; depthVariation?: UGenInput | UGenInput[]; iphase?: UGenInput | UGenInput[]; trig?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { freq = 440, rate = 6, depth = 0.02, delay = 0, onset = 0, rateVariation = 0.04, depthVariation = 0.1, iphase = 0, trig = 0 } = params;
    return multiNew("Vibrato", Rate.Control, [freq, rate, depth, delay, onset, rateVariation, depthVariation, iphase, trig], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8]) as UGenOutput | UGenOutput[];
  },
} as unknown as VibratoType;

interface VOscType {
  ar(params: { bufpos: UGenInput; freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufpos: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufpos: UGenInput; freq?: UGenInput; phase?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufpos: UGenInput | UGenInput[]; freq?: UGenInput | UGenInput[]; phase?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as VOscType;

interface VOsc3Type {
  ar(params: { bufpos: UGenInput; freq1?: UGenInput; freq2?: UGenInput; freq3?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufpos: UGenInput | UGenInput[]; freq1?: UGenInput | UGenInput[]; freq2?: UGenInput | UGenInput[]; freq3?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufpos: UGenInput; freq1?: UGenInput; freq2?: UGenInput; freq3?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufpos: UGenInput | UGenInput[]; freq1?: UGenInput | UGenInput[]; freq2?: UGenInput | UGenInput[]; freq3?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as VOsc3Type;

interface Warp1Type {
  ar(params?: { numChannels?: number; bufnum?: UGenInput; pointer?: UGenInput; freqScale?: UGenInput; windowSize?: UGenInput; envbufnum?: UGenInput; overlaps?: UGenInput; windowRandRatio?: UGenInput; interp?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  ar(params: { numChannels?: number; bufnum?: UGenInput | UGenInput[]; pointer?: UGenInput | UGenInput[]; freqScale?: UGenInput | UGenInput[]; windowSize?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; overlaps?: UGenInput | UGenInput[]; windowRandRatio?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[][];
}

export const Warp1 = {
  ar(params: { numChannels?: number; bufnum?: UGenInput | UGenInput[]; pointer?: UGenInput | UGenInput[]; freqScale?: UGenInput | UGenInput[]; windowSize?: UGenInput | UGenInput[]; envbufnum?: UGenInput | UGenInput[]; overlaps?: UGenInput | UGenInput[]; windowRandRatio?: UGenInput | UGenInput[]; interp?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput } = {}): UGenOutput[] | UGenOutput[][] {
    const { numChannels = 1, bufnum = 0, pointer = 0, freqScale = 1, windowSize = 0.2, envbufnum = -1, overlaps = 8, windowRandRatio = 0, interp = 1, mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("Warp1", Rate.Audio, [bufnum, pointer, freqScale, windowSize, envbufnum, overlaps, windowRandRatio, interp], numChannels, [0, 1, 2, 3, 4, 5, 6, 7]) as UGenOutput[] | UGenOutput[][];
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput[] | UGenOutput[][];
  },
} as unknown as Warp1Type;

export const WhiteNoise = {
  ar(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("WhiteNoise", Rate.Audio, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
  kr(params: { mul?: UGenInput; add?: UGenInput } = {}): UGenOutput {
    const { mul = 1, add = 0 } = params;
    const ugenOutput = multiNew("WhiteNoise", Rate.Control, [], 1, []) as UGenOutput;
    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput;
  },
};

interface WrapType {
  ar(params: { "in": UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ar(params: { "in": UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
  ir(params?: { "in"?: UGenInput; lo?: UGenInput; hi?: UGenInput }): UGenOutput;
  ir(params: { "in"?: UGenInput | UGenInput[]; lo?: UGenInput | UGenInput[]; hi?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as WrapType;

interface WrapIndexType {
  ar(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  ar(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
  kr(params: { bufnum: UGenInput; "in"?: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput;
  kr(params: { bufnum: UGenInput | UGenInput[]; "in"?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput }): UGenOutput[];
}

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
} as unknown as WrapIndexType;

interface XFade2Type {
  ar(params: { inA: UGenInput; inB?: UGenInput; pan?: UGenInput; level?: UGenInput }): UGenOutput;
  ar(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params: { inA: UGenInput; inB?: UGenInput; pan?: UGenInput; level?: UGenInput }): UGenOutput;
  kr(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const XFade2 = {
  ar(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inA, inB = 0, pan = 0, level = 1 } = params;
    return multiNew("XFade2", Rate.Audio, [inA, inB, pan, level], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
  kr(params: { inA: UGenInput | UGenInput[]; inB?: UGenInput | UGenInput[]; pan?: UGenInput | UGenInput[]; level?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {
    const { inA, inB = 0, pan = 0, level = 1 } = params;
    return multiNew("XFade2", Rate.Control, [inA, inB, pan, level], 1, [0, 1, 2, 3]) as UGenOutput | UGenOutput[];
  },
} as unknown as XFade2Type;

interface XLineType {
  ar(params?: { start?: UGenInput; end?: UGenInput; dur?: UGenInput; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  ar(params: { start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { start?: UGenInput; end?: UGenInput; dur?: UGenInput; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput }): UGenOutput;
  kr(params: { start?: UGenInput | UGenInput[]; end?: UGenInput | UGenInput[]; dur?: UGenInput | UGenInput[]; mul?: UGenInput; add?: UGenInput; doneAction?: UGenInput | UGenInput[] }): UGenOutput[];
}

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
} as unknown as XLineType;

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

interface ZeroCrossingType {
  ar(params?: { "in"?: UGenInput }): UGenOutput;
  ar(params: { "in"?: UGenInput | UGenInput[] }): UGenOutput[];
  kr(params?: { "in"?: UGenInput }): UGenOutput;
  kr(params: { "in"?: UGenInput | UGenInput[] }): UGenOutput[];
}

export const ZeroCrossing = {
  ar(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("ZeroCrossing", Rate.Audio, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
  kr(params: { "in"?: UGenInput | UGenInput[] } = {}): UGenOutput | UGenOutput[] {
    const { in: in_ = 0 } = params;
    return multiNew("ZeroCrossing", Rate.Control, [in_], 1, [0]) as UGenOutput | UGenOutput[];
  },
} as unknown as ZeroCrossingType;

