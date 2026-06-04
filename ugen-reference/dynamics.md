# Dynamics

_4 UGens. Generated from SuperCollider help files — do not edit by hand._

### Compander — Compressor, expander, limiter, gate, ducker
- `Compander.ar({ in=0, control=0, thresh=0.5, slopeBelow=1, slopeAbove=1, clampTime=0.01, relaxTime=0.1, mul=1, add=0 })`

> Hard-knee dynamics processor: peak-follows the control signal with abs(), using separate one-pole coefficients exp(log(0.1)/(time*sr)) for attack (clampTime, upward) and release (relaxTime, downward). Gain scalar pow(envelope/thresh, slope-1) is computed once per control block and linearly interpolated per sample; slope==1.0 short-circuits to unity. The help doc claims RMS; the source uses abs().

### CompanderD — Compressor, expander, limiter, gate, ducker.
- `CompanderD.ar({ in=0, thresh=0.5, slopeBelow=1, slopeAbove=1, clampTime=0.01, relaxTime=0.01, mul=1, add=0 })`

> CompanderD passes the signal directly to the control input, but adds a delay to the process input so that the lag in the gain clamping will not lag the attacks in the input sound.

### Limiter — Peak limiter
- `Limiter.ar({ in=0, level=1, dur=0.01 })`

> Limits the input amplitude to the given level. Limiter will not overshoot like Compander will, but it needs to look ahead in the audio. Thus there is a delay equal to twice the value of the dur parameter. Limiter, unlike Compander, is completely transparent for an in range signal.

### Normalizer — Flattens dynamics.
- `Normalizer.ar({ in=0, level=1, dur=0.01 })`

> Normalizes the input amplitude to the given level. Normalizer will not overshoot like Compander will, but it needs to look ahead in the audio. Thus there is a delay equal to twice the value of the dur parameter.
