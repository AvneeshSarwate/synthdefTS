# Envelopes

_5 UGens. Generated from SuperCollider help files — do not edit by hand._

### EnvGen — Envelope generator
- `EnvGen.ar({ envelope, gate=1, levelScale=1, levelBias=0, timeScale=1, doneAction=0 })`
- `EnvGen.kr({ envelope, gate=1, levelScale=1, levelBias=0, timeScale=1, doneAction=0 })`

> Plays back break point envelopes. The envelopes are instances of the Env class. The envelope and the arguments for levelScale, levelBias, and timeScale are polled when the EnvGen is triggered, and at the start of a new envelope segment. All values remain constant for the duration of each segment. { PinkNoise.ar(EnvGen.kr(Env.perc, doneAction: Done.freeSelf)) }.play

### IEnvGen — Envelope generator for polling values from an Env
- `IEnvGen.ar({ envelope, index, mul=1, add=0 })`
- `IEnvGen.kr({ envelope, index, mul=1, add=0 })`

> Envelope generator for polling values from an envelope. IEnvGen plays back break point envelopes from the index point. The envelopes are instances of the Env class.

### Line — Line generator.
- `Line.ar({ start=0, end=1, dur=1, mul=1, add=0, doneAction=0 })`
- `Line.kr({ start=0, end=1, dur=1, mul=1, add=0, doneAction=0 })`

> Outputs a finite linear ramp computed entirely at construction time: counter = round(dur * sampleRate), clamped to a minimum of 1; slope = (end - start) / counter. Each sample tick outputs level, then level += slope (double-precision accumulation). Once counter reaches zero the output freezes at the stored end value (float precision, not the accumulated double), and doneAction fires. If dur rounds to zero samples, level is initialized to end and slope is 0, so the UGen immediately outputs end and fires doneAction on the first block. Parameters are read only at Ctor — changing start/end/dur after instantiation has no effect.

### Linen — Simple linear envelope generator.
- `Linen.kr({ gate=1, attackTime=0.01, susLevel=1, releaseTime=1, doneAction=0 })`

> Control-rate only, four-stage linear envelope (idle → attack → sustain → release) driven by a gate signal. On a low-to-high gate edge, attack slope is computed as `(susLevel - currentLevel) / attackSamples` and accumulated each k-rate block, meaning a retrigger mid-envelope ramps from the current running level rather than resetting to zero, avoiding discontinuities. Sustain holds the last level; gate dropping to ≤ 0 computes release slope as `-currentLevel / releaseSamples` (always targeting 0, never a user-set end level), while gate ≤ -1 triggers forced release with `releaseTime = -gate - 1`. Both susLevel and attackTime are latched at the trigger edge and are not modulatable mid-stage; releaseTime is read only at release onset.

### XLine — Exponential line generator.
- `XLine.ar({ start=1, end=2, dur=1, mul=1, add=0, doneAction=0 })`
- `XLine.kr({ start=1, end=2, dur=1, mul=1, add=0, doneAction=0 })`

> Generates an exponential curve from the start value to the end value. Both the start and end values must be non-zero and have the same sign.
