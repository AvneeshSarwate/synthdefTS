# Delays

_21 UGens. Generated from SuperCollider help files — do not edit by hand._

### AllpassC — Schroeder allpass delay line with cubic interpolation.
- `AllpassC.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`
- `AllpassC.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> A Schroeder allpass filter is given by the difference equations s(t) = x(t) + k * s(t - D) y(t) = -k * s(t) + s(t - D) where x(t) is the input signal, y(t) is the output signal, D is the delay time, and k is the allpass coefficient. In this UGen, k is computed as k == 0.001 ** (delay / decay.abs) * decay.sign (0.001 is -60 dBFS). See also AllpassN which uses no interpolation, and AllpassL which uses linear interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### AllpassL — Schroeder allpass delay line with linear interpolation.
- `AllpassL.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`
- `AllpassL.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> A Schroeder allpass filter is given by the difference equations s(t) = x(t) + k * s(t - D) y(t) = -k * s(t) + s(t - D) where x(t) is the input signal, y(t) is the output signal, D is the delay time, and k is the allpass coefficient. In this UGen, k is computed as k == 0.001 ** (delay / decay.abs) * decay.sign (0.001 is -60 dBFS). See also AllpassN which uses no interpolation, and AllpassC which uses cubic interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### AllpassN — Schroeder allpass delay line with no interpolation.
- `AllpassN.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`
- `AllpassN.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> A Schroeder allpass filter is given by the difference equations s(t) = x(t) + k * s(t - D) y(t) = -k * s(t) + s(t - D) where x(t) is the input signal, y(t) is the output signal, D is the delay time, and k is the allpass coefficient. In this UGen, k is computed as k == 0.001 ** (delay / decay.abs) * decay.sign (0.001 is -60 dBFS). This UGen quantizes the delay time to the nearest sample period, and will produce aliasing artifacts if the delay time is modulated. If these are undesirable properties, the more CPU-expensive alternatives are AllpassL which uses linear interpolation, and AllpassC which uses cubic interpolation.

### CombC — Comb delay line with cubic interpolation.
- `CombC.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`
- `CombC.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> Comb delay line with cubic interpolation. See also CombN which uses no interpolation, and CombL which uses linear interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate. The feedback coefficient is given by the equation fb == 0.001 ** (delay / decay.abs) * decay.sign where 0.001 is -60 dBFS.

### CombL — Comb delay line with linear interpolation.
- `CombL.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`
- `CombL.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> Comb delay line with linear interpolation. See also CombN which uses no interpolation, and CombC which uses cubic interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate. The feedback coefficient is given by the equation fb == 0.001 ** (delay / decay.abs) * decay.sign where 0.001 is -60 dBFS.

### CombN — Comb delay line with no interpolation.
- `CombN.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`
- `CombN.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> Comb delay line with no interpolation. See also CombL which uses linear interpolation, and CombC which uses cubic interpolation. Cubic and linear interpolation are more computationally expensive, but more accurate. This UGen will create aliasing artifacts if you modulate the delay time, which is also quantized to the nearest sample period. If these are undesirable properties, use CombL or CombC. But if your delay time is fixed and sub-sample accuracy is not needed, this is the most CPU-efficient choice with no loss in quality. The feedback coefficient is given by the equation fb == 0.001 ** (delay / decay.abs) * decay.sign where 0.001 is -60 dBFS.

### Delay1 — Single sample delay.
- `Delay1.ar({ in=0, mul=1, add=0, x1=0 })`
- `Delay1.kr({ in=0, mul=1, add=0, x1 })`

> Delays the input by one audio frame or control period.

### Delay2 — Two sample delay.
- `Delay2.ar({ in=0, mul=1, add=0, x1=0, x2=0 })`
- `Delay2.kr({ in=0, mul=1, add=0, x1, x2 })`

> A two-sample integer delay: y[n] = x[n-2], implemented via a two-register shift (m_x1, m_x2 stored as floats in the struct, promoted to double locals in _next to avoid accumulation). The constructor initializes both registers from explicit x1/x2 arguments (defaulting to 0 at audio rate, first input sample at control rate), so the output sequence is strictly [x2, x1, x[0], x[1], ...] with no transient artifact if predelay samples are supplied correctly. The inner loop uses mFilterLoops (three samples per LOOP iteration, unrolled: each iteration reads 3 input samples and writes 3 output samples interleaved), with mFilterRemain handling leftover samples using the simple shift x2=x1, x1=x0. There are no feedback paths, no stability concerns, and no parameters beyond the predelay init values — behavior is fully deterministic and linear at any sample rate.

### DelayC — Simple delay line with cubic interpolation.
- `DelayC.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, mul=1, add=0 })`
- `DelayC.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, mul=1, add=0 })`

> Simple delay line with cubic interpolation. See also DelayN which uses no interpolation, and DelayL which uses linear interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate. The term "delay" is often used in electronic music to refer to a delay line with feedback. If you are looking for that, try CombC.

### DelayL — Simple delay line with linear interpolation.
- `DelayL.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, mul=1, add=0 })`
- `DelayL.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, mul=1, add=0 })`

> Simple delay line with linear interpolation. See also DelayN which uses no interpolation, and DelayC which uses cubic interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate. The term "delay" is often used in electronic music to refer to a delay line with feedback. If you are looking for that, try CombL.

### DelayN — Simple delay line with no interpolation.
- `DelayN.ar({ in=0, maxdelaytime=0.2, delaytime=0.2, mul=1, add=0 })`
- `DelayN.kr({ in=0, maxdelaytime=0.2, delaytime=0.2, mul=1, add=0 })`

> Simple delay line with no interpolation. See also DelayL which uses linear interpolation, and DelayC which uses cubic interpolation. This UGen will create aliasing artifacts if you modulate the delay time, which is also quantized to the nearest sample period. If these are undesirable properties, use DelayL or DelayC. But if your delay time is fixed and sub-sample accuracy is not needed, this is the most CPU-efficient choice with no loss in quality. The term "delay" is often used in electronic music to refer to a delay line with feedback. If you are looking for that, try CombN.

### Pluck — A Karplus-Strong UGen
- `Pluck.ar({ in=0, trig=1, maxdelaytime=0.2, delaytime=0.2, decaytime=1, coef=0.5, mul=1, add=0 })`

> Karplus-Strong feedback delay with an in-loop one-pole filter. Each sample: a cubic-interpolated tap `value` is filtered as `onepole = (1 - |coef|)*value + coef*lastsamp`, then `thisin + feedbk*onepole` is written back to the delay buffer and `onepole` is output. The loop gain is `feedbk = exp(ln(0.001) * delaytime / |decaytime|)`, with the sign of decaytime copied to feedbk so negative decaytime inverts the feedback polarity (boosting odd harmonics). On a negative-to-positive trigger edge, the excitation input is admitted for exactly `round(delaytime * sampleRate)` samples with a hard rectangular window and zero elsewhere; the schelp's "n/2" claim is incorrect — the code uses the full delay length. `coef` drives timbre: near 0 it is a nearly flat loop filter; as |coef| approaches 1 the `(1-|coef|)` gain term vanishes and output converges toward the previous sample (strong low-pass/integrator effect); values outside (-1, 1) are admitted without clamping and will cause exponential blow-up.

## Delays › Buffer

### BufAllpassC — Buffer based all pass delay line with cubic interpolation.
- `BufAllpassC.ar({ buf=0, in=0, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> All pass delay line with cubic interpolation which uses a buffer for its internal memory. See also BufAllpassN which uses no interpolation, and which BufAllpassL uses linear interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### BufAllpassL — Buffer based all pass delay line with linear interpolation.
- `BufAllpassL.ar({ buf=0, in=0, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> All pass delay line with linear interpolation which uses a buffer for its internal memory. See also BufAllpassN which uses no interpolation, and which BufAllpassC uses cubic interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### BufAllpassN — Buffer based all pass delay line with no interpolation.
- `BufAllpassN.ar({ buf=0, in=0, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> All pass delay line with no interpolation which uses a buffer for its internal memory. See also BufAllpassC which uses cubic interpolation, and which BufAllpassL uses linear interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### BufCombC — Buffer based comb delay line with cubic interpolation.
- `BufCombC.ar({ buf=0, in=0, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> Comb delay line with cubic interpolation which uses a buffer for its internal memory. See also BufCombN which uses no interpolation, and BufCombL which uses linear interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### BufCombL — Buffer based comb delay line with linear interpolation.
- `BufCombL.ar({ buf=0, in=0, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> Comb delay line with linear interpolation which uses a buffer for its internal memory. See also BufCombN which uses no interpolation, and BufCombC which uses cubic interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### BufCombN — Buffer based comb delay line with no interpolation.
- `BufCombN.ar({ buf=0, in=0, delaytime=0.2, decaytime=1, mul=1, add=0 })`

> Comb delay line with no interpolation which uses a buffer for its internal memory. See also BufCombL which uses linear interpolation, and BufCombC which uses cubic interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### BufDelayC — Buffer based simple delay line with cubic interpolation.
- `BufDelayC.ar({ buf=0, in=0, delaytime=0.2, mul=1, add=0 })`
- `BufDelayC.kr({ buf=0, in=0, delaytime=0.2, mul=1, add=0 })`

> Simple delay line with cubic interpolation which uses a buffer for its internal memory. See also BufDelayN which uses no interpolation, and BufDelayL which uses linear interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### BufDelayL — Buffer based simple delay line with linear interpolation.
- `BufDelayL.ar({ buf=0, in=0, delaytime=0.2, mul=1, add=0 })`
- `BufDelayL.kr({ buf=0, in=0, delaytime=0.2, mul=1, add=0 })`

> Simple delay line with linear interpolation which uses a buffer for its internal memory. See also BufDelayN which uses no interpolation, and BufDelayC which uses cubic interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.

### BufDelayN — Buffer based simple delay line with no interpolation.
- `BufDelayN.ar({ buf=0, in=0, delaytime=0.2, mul=1, add=0 })`
- `BufDelayN.kr({ buf=0, in=0, delaytime=0.2, mul=1, add=0 })`

> Simple delay line with no interpolation which uses a buffer for its internal memory. See also BufDelayL which uses linear interpolation, and BufDelayC which uses cubic interpolation. Cubic interpolation is more computationally expensive than linear, but more accurate.
