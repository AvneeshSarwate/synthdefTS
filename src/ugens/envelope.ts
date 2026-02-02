export interface EnvSpec {
  levels: number[];
  times: number[];
  curves?: (number | string)[];
  releaseNode?: number;
  loopNode?: number;
  offset?: number;
}

const curveMap: Record<string, number> = {
  step: 0,
  lin: 1,
  linear: 1,
  exp: 2,
  exponential: 2,
  sin: 3,
  sine: 3,
  wel: 4,
  welch: 4,
  sqr: 6,
  squared: 6,
  cub: 7,
  cubed: 7,
  hold: 8,
};

function encodeCurve(curve: number | string): [number, number] {
  if (typeof curve === "number") {
    return [5, curve];
  }
  const key = curve.toLowerCase();
  const type = curveMap[key];
  if (type === undefined) {
    throw new Error(`Unsupported curve type: ${curve}`);
  }
  return [type, 0];
}

export function env(spec: EnvSpec): number[] {
  const { levels, times } = spec;
  if (levels.length !== times.length + 1) {
    throw new Error("EnvSpec levels must be one longer than times");
  }

  const numSegments = times.length;
  const releaseNode = spec.releaseNode ?? -99;
  const loopNode = spec.loopNode ?? -99;

  const curves = spec.curves && spec.curves.length > 0 ? spec.curves.slice() : ["lin"];

  const output: number[] = [levels[0], numSegments, releaseNode, loopNode];
  for (let i = 0; i < numSegments; i += 1) {
    const [curveType, curveValue] = encodeCurve(curves[i % curves.length]);
    output.push(levels[i + 1], times[i], curveType, curveValue);
  }

  return output;
}

export function envForInterpolation(spec: EnvSpec): number[] {
  const { levels, times } = spec;
  if (levels.length !== times.length + 1) {
    throw new Error("EnvSpec levels must be one longer than times");
  }

  const numSegments = times.length;
  const curves = spec.curves && spec.curves.length > 0 ? spec.curves.slice() : ["lin"];
  const offset = spec.offset ?? 0;

  let totalTime = 0;
  for (const time of times) {
    totalTime += time;
  }

  const output: number[] = [offset, levels[0], numSegments, totalTime];
  for (let i = 0; i < numSegments; i += 1) {
    const [curveType, curveValue] = encodeCurve(curves[i % curves.length]);
    output.push(times[i], curveType, curveValue, levels[i + 1]);
  }

  return output;
}

export function adsr(params: {
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  peak?: number;
  curve?: number;
  bias?: number;
} = {}): number[] {
  const attack = params.attack ?? 0.01;
  const decay = params.decay ?? 0.3;
  const sustain = params.sustain ?? 0.5;
  const release = params.release ?? 1.0;
  const peak = params.peak ?? 1.0;
  const curve = params.curve ?? -4.0;
  const bias = params.bias ?? 0.0;

  return env({
    levels: [0 + bias, peak + bias, peak * sustain + bias, 0 + bias],
    times: [attack, decay, release],
    curves: [curve],
    releaseNode: 2,
  });
}

export function asr(params: {
  attack?: number;
  sustain?: number;
  release?: number;
  curve?: number;
} = {}): number[] {
  const attack = params.attack ?? 0.01;
  const sustain = params.sustain ?? 1.0;
  const release = params.release ?? 1.0;
  const curve = params.curve ?? -4.0;

  return env({
    levels: [0, sustain, 0],
    times: [attack, release],
    curves: [curve],
    releaseNode: 1,
  });
}

export function perc(params: {
  attack?: number;
  release?: number;
  level?: number;
  curve?: number;
} = {}): number[] {
  const attack = params.attack ?? 0.01;
  const release = params.release ?? 1.0;
  const level = params.level ?? 1.0;
  const curve = params.curve ?? -4.0;

  return env({
    levels: [0, level, 0],
    times: [attack, release],
    curves: [curve],
  });
}

export function linen(params: {
  attack?: number;
  sustain?: number;
  release?: number;
  level?: number;
  curve?: number | string;
} = {}): number[] {
  const attack = params.attack ?? 0.01;
  const sustain = params.sustain ?? 1.0;
  const release = params.release ?? 1.0;
  const level = params.level ?? 1.0;
  const curve = params.curve ?? "lin";

  return env({
    levels: [0, level, level, 0],
    times: [attack, sustain, release],
    curves: [curve],
  });
}
