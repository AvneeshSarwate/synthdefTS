# Multichannel

_15 UGens. Generated from SuperCollider help files — do not edit by hand._

## Multichannel › Ambisonics

### BiPanB2 — 2D Ambisonic B-format panner.
- `BiPanB2.ar({ inA, inB, azimuth, gain=1 })`
- `BiPanB2.kr({ inA, inB, azimuth, gain=1 })`

> Encode a two channel signal to two dimensional ambisonic B-format. This puts two channels at opposite poles of a 2D ambisonic field. This is one way to map a stereo sound onto a soundfield. It is equivalent to: PanB2(inA, azimuth, gain) + PanB2(inB, azimuth + 1, gain)

### DecodeB2 — 2D Ambisonic B-format decoder.
- `DecodeB2.ar({ numChans, w, x, y, orientation=0.5 })`
- `DecodeB2.kr({ numChans, w, x, y, orientation=0.5 })`

> Decode a two dimensional ambisonic B-format signal to a set of speakers in a regular polygon. The outputs will be in clockwise order. The position of the first speaker is either center or left of center.

### PanB — Ambisonic B-format panner.
- `PanB.ar({ in, azimuth=0, elevation=0, gain=1 })`
- `PanB.kr({ in, azimuth=0, elevation=0, gain=1 })`

> Encodes a mono source into first-order B-format (W, X, Y, Z) using the standard Furse-Malham amplitude coefficients: W = (1/sqrt(2))·gain·in, X = cos(az)·cos(el)·gain·in, Y = −sin(az)·cos(el)·gain·in, Z = sin(el)·gain·in. Azimuth and elevation are looked up via a table-based sin/cos (no per-sample trig), computed once per control block; when any parameter changes, all four channel amplitudes are linearly interpolated across the block via CALCSLOPE, giving zipper-free modulation at the cost of one-block lag. Because angles are sampled at block boundaries rather than per-sample, fast audio-rate azimuth sweeps will alias at the block rate. The W channel is direction-independent (omnidirectional pressure), always scaled by 1/sqrt(2); gain scales all four outputs uniformly with no additional normalization.

### PanB2 — 2D Ambisonic B-format panner.
- `PanB2.ar({ in, azimuth=0, gain=1 })`
- `PanB2.kr({ in, azimuth=0, gain=1 })`

> Encodes mono to B-format (W, X, Y): W = in*(1/sqrt(2))*level, X = in*cos(θ)*level, Y = in*(-sin(θ))*level, where θ is derived from azimuth via a kSineSize sine-table lookup (cosine from a quarter-period offset). Azimuth and level are read once per block (ZIN0); if either changes, all three channel amplitudes are linearly interpolated sample-by-sample to suppress clicks. The negative-sin Y convention places azimuth=+0.5 to the right, matching the help doc. The UGen is memoryless (no feedback).

### Rotate2 — Rotate a sound field.
- `Rotate2.ar({ x, y, pos=0 })`
- `Rotate2.kr({ x, y, pos=0 })`

> Rotate2 can be used for rotating an ambisonic B-format sound field around an axis. Rotate2 does an equal power rotation so it also works well on stereo sounds. It takes two audio inputs (x, y) and an angle control (pos). It outputs two channels (x, y). It computes this: xout = cos(angle) * xin + sin(angle) * yin; yout = cos(angle) * yin - sin(angle) * xin; where angle = pos * pi, so that -1 becomes -pi and +1 becomes +pi. This allows you to use an LFSaw to do continuous rotation around a circle.

## Multichannel › Panners

### Balance2 — Stereo signal balancer
- `Balance2.ar({ left, right, pos=0, level=1 })`
- `Balance2.kr({ left, right, pos=0, level=1 })`

> Equal power panning balances two channels. By panning from left (pos = -1) to right (pos = 1) you are decrementing the level of the left channel from 1 to 0 taking the square root of the linear scaling factor, while at the same time incrementing the level of the right channel from 0 to 1 using the same curve. In the center position (pos = 0) this results in a level for both channels of 0.5.sqrt (~=0.707 or -3dB). The output of Balance2 remains a stereo signal.

### LinPan2 — Two channel linear pan.
- `LinPan2.ar({ in, pos=0, level=1 })`
- `LinPan2.kr({ in, pos=0, level=1 })`

> Two channel linear panner. The signal is lowered as it pans from left (or right) to center using a straight line from 1 (left or right) to 0.5 (center) for a 6dB reduction in the middle. A problem inherent to linear panning is that the perceived volume of the signal drops in the middle. Pan2 solves this by taking the square root of the linear scaling factor going from 1 (left or right) to 0.5.sqrt (~=0.707) in the center, which is about 3dB reduction. This is equal power panning. LinPan2 sounds more like the Rhodes tremolo than Pan2.

### Pan2 — Two channel equal power pan.
- `Pan2.ar({ in, pos=0, level=1 })`
- `Pan2.kr({ in, pos=0, level=1 })`

> Two channel equal power panner. Pan2 takes the square root of the linear scaling factor going from 1 (left or right) to 0.5.sqrt (~=0.707) in the center, which is about 3dB reduction. With linear panning (LinPan2) the signal is lowered as it approaches center using a straight line from 1 (left or right) to 0.5 (center) for a 6dB reduction in the middle. A problem inherent to linear panning is that the perceived volume of the signal drops in the middle. Pan2 solves this.

### Pan4 — Four channel equal power pan.
- `Pan4.ar({ in, xpos=0, ypos=0, level=1 })`
- `Pan4.kr({ in, xpos=0, ypos=0, level=1 })`

> Decomposes 2D position into two independent equal-power sine-table pans: x maps left/right gains as leftAmp = sine[2048 - ix], rightAmp = sine[ix] (ix = clip(int(1024*x + 1024 + 0.5), 0, 2048)); y maps front/back gains symmetrically (frontAmp = sine[iy], backAmp = sine[2048 - iy]). The sine table is a full 8192-point table, so indices 0–2048 span a quarter period (0 to π/2); at center (x=y=0) each lookup yields sin(π/4) = √2/2, making each of the four Cartesian-product gains level/2 and total power exactly level^2. When any coordinate exceeds [-1,1], the code projects (x,y) radially onto the unit-square boundary before the lookup. Any change in xpos, ypos, or level (all checked once per block) triggers per-sample linear slope interpolation across all four combined gains; level is smoothed via that same mechanism, not left unsmoothed.

### PanAz — Azimuth panner
- `PanAz.ar({ numChans, in, pos=0, level=1, width=2, orientation=0.5 })`
- `PanAz.kr({ numChans, in, pos=0, level=1, width=2, orientation=0.5 })`

> Distributes one input across N outputs using cyclic equal-power panning: for each channel i, chanpos = ((pos * N/2 + width/2 + orientation) - i) / width, then wrapped modulo N/width, and the channel gain is level * mSine[4096 * chanpos], where mSine is a full 8192-point sine table — so chanpos maps [0,1) through a half-sine hump (0→0, 0.5→peak, →1→0), not a monotonically decreasing quarter-sine. Only channels with chanpos < 1 receive signal. With control-rate pos (ak mode), gains are linearly slope-interpolated sample-by-sample across the block; with audio-rate pos (aa mode), gains are recomputed every sample with no smoothing, so fast modulation can produce zipper artifacts. The width parameter has its absolute value taken (negatives identical to positives); default width=2 covers exactly two channels with equal-power panning and no gaps at channel boundaries; values below 1 introduce silent gaps, values above 2 spread energy across more channels. orientation is a DC offset added before channel subtraction, shifting the whole mapping.

### Splay — Splay spreads an array of channels across the stereo field
- `Splay.ar({ inArray, spread=1, level=1, center=0, levelComp })`
- `Splay.kr({ inArray, spread=1, level=1, center=0, levelComp })`

> Splay spreads an array of channels across the stereo field. Optional arguments are spread and center, and equal power levelCompensation. The formula for the stereo position is ((0 .. (n - 1)) * (2 / (n - 1)) - 1) * spread + center

### SplayAz — Spreads an array of channels across a ring of channels
- `SplayAz.ar({ numChans=4, inArray, spread=1, level=1, width=2, center=0, orientation=0.5, levelComp })`
- `SplayAz.kr({ numChans=4, inArray, spread=1, level=1, width=2, center=0, orientation=0.5, levelComp })`

> SplayAz spreads an array of channels across a ring of channels. Optional spread and center controls, and flexible levelCompensation tunable for equal power and/or equal amplitude. numChans and orientation are as in PanAz. { SplayAz.ar(5, [SinOsc.ar, Saw.ar], 0, 1) }.plot;

## Multichannel › Select

### LinXFade2 — Two channel linear crossfade.
- `LinXFade2.ar({ inA, inB=0, pan=0, level=1 })`
- `LinXFade2.kr({ inA, inB=0, pan=0, level=1 })`

> Computes a mono mix via the lerp formula out = inA + amp*(inB - inA), where amp = pan*0.5 + 0.5, mapping pan [-1, +1] linearly to amp [0, 1]; this is identical to (1-amp)*inA + amp*inB but cheaper. The pan argument is hard-clipped to [-1, 1]; at control rate, amp is linearly interpolated across the block (slope = delta/blockSize) only when pan has changed, otherwise the block runs at fixed amp. At audio rate, clipping and coefficient recomputation occur per sample with no inter-sample interpolation. Unlike XFade2 (equal-power sine/cosine curves), the crossfade is linear in amplitude, so summed power dips up to 6 dB at pan=0; the struct holds only m_pos and m_amp — the documented level argument has no effect in the actual DSP code.

### Select — Select output from an array of inputs.
- `Select.ar({ which, array })`
- `Select.kr({ which, array })`

> The output is selected from an array of inputs. All the UGens are continuously running. This may not be the most efficient way if each input is CPU-expensive. :: Note that the array is fixed at the time of writing the SynthDef, and the whole array is embedded in the SynthDef file itself. For small arrays this is more efficient than reading from a buffer.

### XFade2 — Equal power two channel cross fade.
- `XFade2.ar({ inA, inB=0, pan=0, level=1 })`
- `XFade2.kr({ inA, inB=0, pan=0, level=1 })`

> Weighted sum out[n] = inA[n]*La + inB[n]*Lb where La = level * sine[2048 - ipos] and Lb = level * sine[ipos], with ipos = clip(round(1024*pan + 1024), 0, 2048) mapping pan=[-1..+1] linearly to a quarter-sine wavetable (2049 entries). This yields constant-power mixing: at pan=0 both gains are level*sin(π/4) ≈ 0.707*level; at pan=±1 one gain is level and the other is 0. When pan is control-rate and changes between blocks, gains ramp linearly sample-by-sample within the block via slope interpolation (nextamp - curamp) * slopeFactor, suppressing zipper noise; when pan is audio-rate, ipos is recomputed each sample from the wavetable so the sine-law holds instantaneously, while level itself still slope-interpolates if it changes.
