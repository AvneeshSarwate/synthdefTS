# Maths

_12 UGens. Generated from SuperCollider help files — do not edit by hand._

### Clip — Clip a signal outside given thresholds.
- `Clip.ar({ in, lo=0, hi=1 })`
- `Clip.kr({ in=0, lo=0, hi=1 })`
- `Clip.ir({ in=0, lo=0, hi=1 })`

> Hard-clips each sample to [lo, hi] via sc_clip (hard clamp, no saturation). Control-rate lo/hi are linearly interpolated across the block using CALCSLOPE, ramping from the previous value to the new kr value within the same block. Audio-rate lo/hi are applied per-sample with no interpolation.

### Fold — Fold a signal outside given thresholds.
- `Fold.ar({ in, lo=0, hi=1 })`
- `Fold.kr({ in=0, lo=0, hi=1 })`
- `Fold.ir({ in=0, lo=0, hi=1 })`

> Applies hard-boundary triangular folding to each sample: values within [lo, hi] pass through unchanged; a single overshoot is reflected back by mirror arithmetic (e.g. if in >= hi, out = 2*hi - in), which handles most real-signal cases at zero cost. For larger excursions, the general path normalizes the offset x = in - lo into one period of range2 = 2*(hi-lo) via c = x - range2*floor(x/range2), then folds the upper half back as range2 - c, yielding a piecewise-linear triangle wave mapped onto [lo, hi]; when lo==hi the output is clamped to lo (avoids division by zero). Control-rate lo/hi are linearly interpolated per sample (CALCSLOPE) in the kk/ak/ka variants, so modulating the boundaries smoothly is safe; audio-rate boundaries (aa variant) use the raw per-sample value with no interpolation.

### InRange — Tests if a signal is within a given range.
- `InRange.ar({ in, lo=0, hi=1 })`
- `InRange.kr({ in=0, lo=0, hi=1 })`
- `InRange.ir({ in=0, lo=0, hi=1 })`

> Per-sample comparator: outputs 1.0 if lo <= in <= hi (inclusive on both bounds), else 0.0. The `lo` and `hi` thresholds are read once per control block (ZIN0), not interpolated, so rapid modulation of thresholds at audio rate produces staircase quantization artifacts rather than smooth window sweeps. No state is maintained between samples — output is purely a combinational boolean with no hysteresis, meaning signals hovering at a threshold boundary will produce high-frequency toggling at the control-rate update grid.

### InRect — Test if a point is within a given rectangle.
- `InRect.ar({ x, y, rect })`
- `InRect.kr({ x=0, y=0, rect })`

> A pair of signals x and y are treated as a point (x, y) in 2-D; if they fall within the bounds of the rectangle, then this UGen outputs a one; else it outputs zero.

### LeastChange — Output least changed
- `LeastChange.ar({ a=0, b=0 })`
- `LeastChange.kr({ a=0, b=0 })`

> Given two inputs a and b, let da[t] = abs(a[t] - a[t - 1]) and db[t] = abs(b[t] - b[t - 1]). Output a[t] if da[t] is smaller, and output b[t] if db[t] is smaller. If da[t] == db[t], use whichever input was used last (assume a for the first sample of output).

### LinExp — Map a linear range to an exponential range
- `LinExp.ar({ in=0, srclo=0, srchi=1, dstlo=1, dsthi=2 })`
- `LinExp.kr({ in=0, srclo=0, srchi=1, dstlo=1, dsthi=2 })`

> Maps a linear input range to an exponential output range per-sample using out = dstlo * (dsthi/dstlo)^((in - srclo)/(srchi - srclo)), which is a pure power-of-ratio lookup with no state or feedback. The precomputed coefficients are dstratio = dsthi/dstlo, rsrcrange = 1/(srchi - srclo), and rrminuslo = -srclo * rsrcrange, collapsing the per-sample work to a single pow() call: out = dstlo * pow(dstratio, in * rsrcrange + rrminuslo). Because dstratio = dsthi/dstlo appears as the base of the exponent, dstlo and dsthi must be nonzero and same-sign — if they differ in sign dstratio is negative and pow() of a negative base is undefined for non-integer exponents, producing NaN. When srclo equals srchi, rsrcrange becomes infinity and the output is undefined; similarly, input values outside [srclo, srchi] are extrapolated along the same exponential curve rather than clamped. Boundary parameters (srclo, srchi, dstlo, dsthi) can be modulated at audio rate, in which case coefficients are recomputed every sample with no smoothing, so abrupt parameter jumps cause instantaneous output discontinuities.

### ModDif — Minimum difference of two values in modulo arithmetics
- `ModDif.ar({ x=0, y=0, mod=1 })`
- `ModDif.kr({ x=0, y=0, mod=1 })`
- `ModDif.ir({ x=0, y=0, mod=1 })`

> Returns the minimum difference of two values in modulo arithmetics. On a circle, there are two distances between two points. This UGen returns the smaller value of the two. { var a = Line.ar(0, 4, 0.01), d = ModDif.ar(a); [a, d] }.plot; { var a = Line.ar(0, 4, 0.01); ModDif.ar(a, 0, (1..4)) }.plot; { var a = Line.ar(0, 4, 0.01); ModDif.ar(a, (0, 0.25 .. 1), 1) }.plot;

### MostChange — Output most changed.
- `MostChange.ar({ a=0, b=0 })`
- `MostChange.kr({ a=0, b=0 })`

> Given two inputs a and b, let da[t] = abs(a[t] - a[t - 1]) and db[t] = abs(b[t] - b[t - 1]). Output a[t] if da[t] is larger, and output b[t] if db[t] is larger. If da[t] == db[t], use whichever input was used last (assume a for the first sample of output).

### RunningMax — Track maximum level.
- `RunningMax.ar({ in=0, trig=0 })`
- `RunningMax.kr({ in=0, trig=0 })`

> Outputs the maximum value received at the input. When a trigger occurs at the reset input, the maximum output value is reset to the current value.

### RunningMin — Track minimum level.
- `RunningMin.ar({ in=0, trig=0 })`
- `RunningMin.kr({ in=0, trig=0 })`

> Outputs the minimum value received at the input. When a trigger occurs at the reset input, the minimum output value is reset to the current value.

### Schmidt — Schmidt trigger.
- `Schmidt.ar({ in, lo=0, hi=1 })`
- `Schmidt.kr({ in=0, lo=0, hi=1 })`
- `Schmidt.ir({ in=0, lo=0, hi=1 })`

> If in > hi, output 1. If in < lo, output 0. Otherwise, repeat the last sample of output, assumed to be 0 at initialization. In sclang-flavored pseudocode: out[i] = if(in[i] < lo[i]) { 0 } { if(in[i] > hi[i]) { 1 } { out[i-1] } };

### Wrap — Wrap a signal outside given thresholds.
- `Wrap.ar({ in, lo=0, hi=1 })`
- `Wrap.kr({ in=0, lo=0, hi=1 })`
- `Wrap.ir({ in=0, lo=0, hi=1 })`

> Performs sample-by-sample modular wrapping into [lo, hi): out = in - range * floor((in - lo) / range), where range = hi - lo. A fast single-subtraction/addition shortcut handles the common case where the input overshoots by less than one range width; the floor-based formula fires only for larger excursions. When lo == hi, the output is clamped to lo. When lo and hi are control-rate, they are linearly interpolated per sample via CALCSLOPE; audio-rate bounds (aa/ak/ka variants) are read per sample with no interpolation. Driving hi below lo makes range negative, which is not guarded against and produces undefined/unpredictable output, not a clean inversion.
