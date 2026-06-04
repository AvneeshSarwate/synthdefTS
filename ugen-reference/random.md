# Random

_9 UGens. Generated from SuperCollider help files — do not edit by hand._

### ExpRand — Exponential single random number generator.
- `ExpRand.new({ lo=0.01, hi=1 })`

> Generates a single random float value in an exponential distributions from lo to hi . It generates this when the SynthDef first starts playing, and remains fixed for the duration of the synth's existence.

### IRand — Single integer random number generator.
- `IRand.new({ lo=0, hi=127 })`

> Generates a single random integer value in uniform distribution from lo to hi . It generates this when the SynthDef first starts playing, and remains fixed for the duration of the synth's existence.

### LinRand — Skewed random number generator.
- `LinRand.new({ lo=0, hi=1, minmax=0 })`

> Generates a single random float value in linear distribution from lo to hi, skewed towards lo if minmax < 0, otherwise skewed towards hi .

### NRand — Sum of uniform distributions.
- `NRand.new({ lo=0, hi=1, n=0 })`

> Init-rate only — the value is computed once at synth creation and never updated. Sums n independent uniform [0,1) draws via frand(), averages them (sum/n), then linearly maps to [lo, hi): output = (sum/n) * (hi-lo) + lo. This keeps the mean fixed at (lo+hi)/2 for all n while reducing variance by factor 1/n, producing a distribution that converges toward Gaussian by the CLT (n=1 uniform, n=2 triangular, n≥3 increasingly bell-shaped). n is cast to int at ctor time; fractional or negative values are silently truncated, and n=0 produces NaN (float 0.0/0 division) rather than a valid output.

### Rand — Single random number generator.
- `Rand.new({ lo=0, hi=1 })`

> Generates a single random float value in uniform distribution from lo to hi . It generates this when the SynthDef first starts playing, and remains fixed for the duration of the synth's existence.

### TExpRand — Triggered exponential random number generator.
- `TExpRand.ar({ lo=0.01, hi=1, trig=0 })`
- `TExpRand.kr({ lo=0.01, hi=1, trig=0 })`

> Generates a random float value in exponential distribution from lo to hi each time the trigger signal changes from nonpositive to positive values lo and hi must both have the same sign and be non-zero.

### TIRand — Triggered integer random number generator.
- `TIRand.ar({ lo=0, hi=127, trig=0 })`
- `TIRand.kr({ lo=0, hi=127, trig=0 })`

> Generates a random integer value in uniform distribution from lo to hi each time the trigger signal changes from nonpositive to positive values.

### TRand — Triggered random number generator.
- `TRand.ar({ lo=0, hi=1, trig=0 })`
- `TRand.kr({ lo=0, hi=1, trig=0 })`

> Generates a random float value in uniform distribution from lo to hi each time the trigger signal changes from nonpositive to positive values.

### TWindex — Triggered windex.
- `TWindex.ar({ in, array, normalize=0 })`
- `TWindex.kr({ in, array, normalize=0 })`

> When triggered, returns a random index value based on array as a list of probabilities. By default the list of probabilities should sum to 1.0, when the normalize flag is set to 1, the values get normalized by the UGen (less efficient).
