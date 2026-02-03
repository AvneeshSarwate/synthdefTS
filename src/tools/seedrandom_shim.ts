// Deno-compatible seedrandom shim using @std/random under the hood.
import { randomSeeded } from "@std/random";

export type RandomSeed = string | number;

export type SeedrandomState = {
  seed: string;
  calls: number;
};

export type SeedrandomCallback = (prng: PRNG, seed: string) => unknown;

export type SeedrandomOptions = {
  entropy?: boolean;
  global?: boolean;
  pass?: SeedrandomCallback;
  state?: boolean | SeedrandomState;
};

export type PRNG = (() => number) & {
  int32: () => number;
  double: () => number;
  quick: () => number;
  state: () => SeedrandomState;
};

export type Seedrandom = {
  (seed?: RandomSeed, options?: SeedrandomOptions, callback?: SeedrandomCallback): PRNG;
  alea: Seedrandom;
  xor128: Seedrandom;
  xorwow: Seedrandom;
  xorshift7: Seedrandom;
  tychei: Seedrandom;
};

function normalizeSeed(seed?: RandomSeed): string {
  if (seed === undefined || seed === null) return crypto.randomUUID();
  return typeof seed === "string" ? seed : String(seed);
}

// Stable 32-bit FNV-1a hash for string seeds.
function hashSeedToUint32(seed: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

const seedrandom: Seedrandom = ((seed?: RandomSeed, options?: SeedrandomOptions, callback?: SeedrandomCallback): PRNG => {
  const opts = options ?? {};
  let seedStr = normalizeSeed(seed);

  if (opts.entropy) {
    seedStr = `${seedStr}::entropy:${crypto.randomUUID()}`;
  }

  let calls = 0;
  if (opts.state && typeof opts.state === "object") {
    if (typeof opts.state.seed === "string") seedStr = opts.state.seed;
    if (typeof opts.state.calls === "number" && Number.isFinite(opts.state.calls)) {
      calls = Math.max(0, Math.floor(opts.state.calls));
    }
  }

  const prngBase = randomSeeded(BigInt(hashSeedToUint32(seedStr)));

  // Advance if restoring state via call count.
  for (let i = 0; i < calls; i++) prngBase();

  const prng = (() => {
    calls++;
    return prngBase();
  }) as PRNG;

  prng.double = () => prng();
  prng.quick = () => prng();
  prng.int32 = () => (prng() * 0x100000000) | 0;
  prng.state = () => ({ seed: seedStr, calls });

  if (opts.global) {
    Math.random = prng;
  }

  const pass = opts.pass ?? callback;
  return pass ? (pass(prng, seedStr) as PRNG) : prng;
}) as Seedrandom;

seedrandom.alea = seedrandom;
seedrandom.xor128 = seedrandom;
seedrandom.xorwow = seedrandom;
seedrandom.xorshift7 = seedrandom;
seedrandom.tychei = seedrandom;

export default seedrandom;
