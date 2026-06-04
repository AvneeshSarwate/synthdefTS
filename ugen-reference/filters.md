# Filters

_55 UGens. Generated from SuperCollider help files — do not edit by hand._

### Lag2UD — Exponential lag
- `Lag2UD.ar({ in=0, lagTimeU=0.1, lagTimeD=0.1, mul=1, add=0 })`
- `Lag2UD.kr({ in=0, lagTimeU=0.1, lagTimeD=0.1, mul=1, add=0 })`

> Lag2 is equivalent to Lag.kr(Lag.kr(in, time), time), thus resulting in a smoother transition. This saves on CPU as you only have to calculate the decay factor once instead of twice. See Lag for more details.

### Lag3UD — Exponential lag
- `Lag3UD.ar({ in=0, lagTimeU=0.1, lagTimeD=0.1, mul=1, add=0 })`
- `Lag3UD.kr({ in=0, lagTimeU=0.1, lagTimeD=0.1, mul=1, add=0 })`

> Lag3UD is equivalent to LagUD.kr(LagUD.kr(LagUD.kr(in, timeU, timeD), timeU, timeD), timeU, timeD), thus resulting in a smoother transition. This saves on CPU as you only have to calculate the decay factor once instead of three times. See LagUD for more details.

### LagUD — Exponential lag
- `LagUD.ar({ in=0, lagTimeU=0.1, lagTimeD=0.1, mul=1, add=0 })`
- `LagUD.kr({ in=0, lagTimeU=0.1, lagTimeD=0.1, mul=1, add=0 })`

> This is essentially the same as Lag except that you can supply a different 60 dB time for when the signal goes up, from when the signal goes down. This is useful for smoothing out control signals, where "fade in" should be different from "fade out".

### MoogFF — Moog VCF implementation, designed by Federico Fontana
- `MoogFF.ar({ in, freq=100, gain=2, reset=0, mul=1, add=0 })`
- `MoogFF.kr({ in, freq=100, gain=2, reset=0, mul=1, add=0 })`

> A digital implementation of the Moog VCF (filter). Preserving the Digital Structure of the Moog VCF::. In Proc. ICMC07, Copenhagen, 25-31 August 2007. ::

## Filters › BEQSuite

### BAllPass — All Pass Filter
- `BAllPass.ar({ in, freq=1200, rq=1, mul=1, add=0 })`

> The B equalization suite is based on the Second Order Section (SOS) biquad UGen. Biquad coefficient calculations imply certain amount of CPU overhead. These plugin UGens contain optimizations such that the coefficients get updated only when there has been a change to one of the filter's parameters. This can cause spikes in CPU performance and should be considered when using several of these units. ::

### BBandPass — Band Pass Filter
- `BBandPass.ar({ in, freq=1200, bw=1, mul=1, add=0 })`

> The B equalization suite is based on the Second Order Section (SOS) biquad UGen. Biquad coefficient calculations imply certain amount of CPU overhead. These plugin UGens contain optimizations such that the coefficients get updated only when there has been a change to one of the filter's parameters. This can cause spikes in CPU performance and should be considered when using several of these units. ::

### BBandStop — Band reject filter
- `BBandStop.ar({ in, freq=1200, bw=1, mul=1, add=0 })`

> The B equalization suite is based on the Second Order Section (SOS) biquad UGen. Biquad coefficient calculations imply certain amount of CPU overhead. These plugin UGens contain optimizations such that the coefficients get updated only when there has been a change to one of the filter's parameters. This can cause spikes in CPU performance and should be considered when using several of these units. ::

### BHiPass — 12db/oct rolloff - 2nd order resonant  Hi Pass Filter
- `BHiPass.ar({ in, freq=1200, rq=1, mul=1, add=0 })`

> The B equalization suite is based on the Second Order Section (SOS) biquad UGen. Biquad coefficient calculations imply certain amount of CPU overhead. These plugin UGens contain optimizations such that the coefficients get updated only when there has been a change to one of the filter's parameters. This can cause spikes in CPU performance and should be considered when using several of these units. ::

### BHiShelf — Hi Shelf
- `BHiShelf.ar({ in, freq=1200, rs=1, db=0, mul=1, add=0 })`

> The B equalization suite is based on the Second Order Section (SOS) biquad UGen. Biquad coefficient calculations imply certain amount of CPU overhead. These plugin UGens contain optimizations such that the coefficients get updated only when there has been a change to one of the filter's parameters. This can cause spikes in CPU performance and should be considered when using several of these units. ::

### BLowPass — 12db/oct rolloff - 2nd order resonant Low Pass Filter
- `BLowPass.ar({ in, freq=1200, rq=1, mul=1, add=0 })`

> The B equalization suite is based on the Second Order Section (SOS) biquad UGen. Biquad coefficient calculations imply certain amount of CPU overhead. These plugin UGens contain optimizations such that the coefficients get updated only when there has been a change to one of the filter's parameters. This can cause spikes in CPU performance and should be considered when using several of these units. ::

### BLowShelf — Low Shelf
- `BLowShelf.ar({ in, freq=1200, rs=1, db=0, mul=1, add=0 })`

> The B equalization suite is based on the Second Order Section (SOS) biquad UGen. Biquad coefficient calculations imply certain amount of CPU overhead. These plugin UGens contain optimizations such that the coefficients get updated only when there has been a change to one of the filter's parameters. This can cause spikes in CPU performance and should be considered when using several of these units. ::

### BPeakEQ — Parametric equalizer
- `BPeakEQ.ar({ in, freq=1200, rq=1, db=0, mul=1, add=0 })`

> The B equalization suite is based on the Second Order Section (SOS) biquad UGen. Biquad coefficient calculations imply certain amount of CPU overhead. These plugin UGens contain optimizations such that the coefficients get updated only when there has been a change to one of the filter's parameters. This can cause spikes in CPU performance and should be considered when using several of these units. ::

## Filters › Linear

### APF — FIXME: APF purpose.
- `APF.ar({ in=0, freq=440, radius=0.8, mul=1, add=0 })`
- `APF.kr({ in=0, freq=440, radius=0.8, mul=1, add=0 })`

> Second-order IIR all-pass filter: y[n] = x[n] + b1*(y[n-1]-x[n-1]) + b2*(y[n-2]-x[n-2]), where b1 = 2*radius*cos(freq*radiansPerSample) and b2 = -(radius^2). Unity magnitude at all frequencies; phase rotation centered at freq. Parameter changes interpolate b1/b2 over the control period; radius >= 1.0 places poles on or outside the unit circle (marginally stable or unstable).

### BPF — 2nd order Butterworth bandpass filter.
- `BPF.ar({ in=0, freq=440, rq=1, mul=1, add=0 })`
- `BPF.kr({ in=0, freq=440, rq=1, mul=1, add=0 })`

> Bilinear-transform 2nd-order IIR BP (Direct Form II): C = 1/tan(rq·ω/2), D = 2·cos(ω); a0 = 1/(1+C), b1 = C·D·a0, b2 = (1−C)·a0; output = a0·(y0−y2). rq = bandwidth/freq gives constant-Q behavior. Coefficients are linearly interpolated each control period; as freq→0, pbw→0 and C = 1/tan(pbw) diverges, causing documented instability.

### BPZ2 — Two zero fixed midpass.
- `BPZ2.ar({ in=0, mul=1, add=0 })`
- `BPZ2.kr({ in=0, mul=1, add=0 })`

> A special case fixed filter. Implements the formula: out(i) = 0.5 * (in(i) - in(i - 2)). This filter cuts out 0 Hz and the Nyquist frequency.

### BRF — 2nd order Butterworth band reject filter.
- `BRF.ar({ in=0, freq=440, rq=1, mul=1, add=0 })`
- `BRF.kr({ in=0, freq=440, rq=1, mul=1, add=0 })`

> Second-order IIR notch (2-pole/2-zero Butterworth band-reject): C = tan(rq * freq_radians / 2), D = 2*cos(freq_radians), a0 = 1/(1+C), a1 = -D*a0, b2 = (1-C)*a0. Per-sample: y0 = in - a1*y1 - b2*y2; out = a0*(y0+y2) + a1*y1. Fixed rq gives proportionally wider notch at higher frequencies (pbw = rq*pfreq/2). On freq/rq change, coefficients are linearly interpolated over the filter sub-buffer; the help warns that very low center frequencies may cause glitches.

### BRZ2 — Two zero fixed midcut.
- `BRZ2.ar({ in=0, mul=1, add=0 })`
- `BRZ2.kr({ in=0, mul=1, add=0 })`

> A special case fixed filter. Implements the formula: out(i) = 0.5 * (in(i) + in(i - 2)). This filter cuts out frequencies around ½ of the Nyquist frequency.

### Decay — Exponential decay
- `Decay.ar({ in=0, decayTime=1, mul=1, add=0 })`
- `Decay.kr({ in=0, decayTime=1, mul=1, add=0 })`

> An integrating filter which, if given an impulse, will produce an exponentially decaying envelope. Decay is essentially the same as Integrator, but instead of specifying the integration coefficient directly, it is calculated from the decayTime—the time required for input signal to attentuate 60 dB, or decay to 99.9% of its value.

### Decay2 — Exponential decay
- `Decay2.ar({ in=0, attackTime=0.01, decayTime=1, mul=1, add=0 })`
- `Decay2.kr({ in=0, attackTime=0.01, decayTime=1, mul=1, add=0 })`

> An integrating filter like Decay, but both the onset time and decay time can be specified. Decay2.ar(in, attackTime, decayTime) is equivalent to: Decay.ar(in, decayTime) - Decay.ar(in, attackTime) For precise control over the attack, decay, and level of Decay2 see Onset control and normalizing the envelope of Decay2 and Calculating rise time and maximum rise time of Decay2 below.

### Formlet — FOF-like filter.
- `Formlet.ar({ in=0, freq=440, attacktime=1, decaytime=1, mul=1, add=0 })`
- `Formlet.kr({ in=0, freq=440, attacktime=1, decaytime=1, mul=1, add=0 })`

> This is a resonant filter whose impulse response is like that of a sine wave with a Decay2 envelope over it. It is possible to control the attacktime and decaytime. Formlet is equivalent to: Ringz(in, freq, decaytime) - Ringz(in, freq, attacktime) The great advantage to this filter over FOF is that there is no limit to the number of overlapping grains since the grain is just the impulse response of the filter. Note:: The amplitude of the resulting signal depends on the server's sample rate. See link::Classes/Ringz#Interaction with sample rate#Ringz: Interaction with sample rate:: for details. ::

### FOS — First order filter section.
- `FOS.ar({ in=0, a0=0, a1=0, b1=0, mul=1, add=0 })`
- `FOS.kr({ in=0, a0=0, a1=0, b1=0, mul=1, add=0 })`

> A standard first order filter section. Filter coefficients are given directly rather than calculated for you. Formula is equivalent to: out(i) = (a0 * in(i)) + (a1 * in(i-1)) + (b1 * out(i-1))

### HPF — 2nd order Butterworth highpass filter.
- `HPF.ar({ in=0, freq=440, mul=1, add=0 })`
- `HPF.kr({ in=0, freq=440, mul=1, add=0 })`

> A second order high pass filter.

### HPZ1 — Two point difference filter
- `HPZ1.ar({ in=0, mul=1, add=0 })`
- `HPZ1.kr({ in=0, mul=1, add=0 })`

> A special case fixed filter. Implements the formula: out(i) = 0.5 * (in(i) - in(i-1)) Which is a two point differentiator.

### HPZ2 — Two zero fixed midcut.
- `HPZ2.ar({ in=0, mul=1, add=0 })`
- `HPZ2.kr({ in=0, mul=1, add=0 })`

> A special case fixed filter. Implements the formula: out(i) = 0.25 * (in(i) - (2 * in(i - 1)) + in(i - 2)).

### Integrator — A leaky integrator.
- `Integrator.ar({ in=0, coef=1, mul=1, add=0 })`
- `Integrator.kr({ in=0, coef=1, mul=1, add=0 })`

> Integrates an input signal with a leak. The formula implemented is: out(0) = in(0) + (coef * out(-1))

### Lag — Exponential lag
- `Lag.ar({ in=0, lagTime=0.1, mul=1, add=0 })`
- `Lag.kr({ in=0, lagTime=0.1, mul=1, add=0 })`

> This is essentially the same as OnePole except that instead of supplying the coefficient directly, it is calculated from a 60 dB lag time. This is the time required for the filter to converge to within 0.01% of a value. This is useful for smoothing out control signals. For linear and other alternatives, see VarLag.

### Lag2 — Exponential lag
- `Lag2.ar({ in=0, lagTime=0.1, mul=1, add=0 })`
- `Lag2.kr({ in=0, lagTime=0.1, mul=1, add=0 })`

> Lag2 is equivalent to Lag.kr(Lag.kr(in, time), time) , thus resulting in a smoother transition. This saves on CPU as you only have to calculate the decay factor once instead of twice. See Lag for more details.

### Lag3 — Exponential lag
- `Lag3.ar({ in=0, lagTime=0.1, mul=1, add=0 })`
- `Lag3.kr({ in=0, lagTime=0.1, mul=1, add=0 })`

> Lag3 is equivalent to Lag.kr(Lag.kr(Lag.kr(in, time), time), time) , thus resulting in a smoother transition. This saves on CPU as you only have to calculate the decay factor once instead of three times. See Lag for more details.

### LeakDC — Remove DC
- `LeakDC.ar({ in=0, coef=0.995, mul=1, add=0 })`
- `LeakDC.kr({ in=0, coef=0.9, mul=1, add=0 })`

> This is a linear filter that removes DC bias from a signal. Specifically, this is a one-pole highpass filter implementing the formula y[n] = x[n] - x[n-1] + coef * y[n-1] . The frequency response of this filter is dependent on the sample rate of the server and the calculation rate of the UGen.

### LPF — 2nd order Butterworth lowpass filter
- `LPF.ar({ in=0, freq=440, mul=1, add=0 })`
- `LPF.kr({ in=0, freq=440, mul=1, add=0 })`

> A second order low pass filter.

### LPZ1 — Two point average filter
- `LPZ1.ar({ in=0, mul=1, add=0 })`
- `LPZ1.kr({ in=0, mul=1, add=0 })`

> A special case fixed filter. Implements the formula: out(i) = 0.5 * (in(i) + in(i-1)) which is a two point averager.

### LPZ2 — Two zero fixed lowpass
- `LPZ2.ar({ in=0, mul=1, add=0 })`
- `LPZ2.kr({ in=0, mul=1, add=0 })`

> A special case fixed filter. Implements the formula: out(i) = 0.25 * (in(i) + (2 * in(i - 1)) + in(i - 2)).

### MidEQ — Parametric filter.
- `MidEQ.ar({ in=0, freq=440, rq=1, db=0, mul=1, add=0 })`
- `MidEQ.kr({ in=0, freq=440, rq=1, db=0, mul=1, add=0 })`

> Parametric peaking EQ implemented as dry-path-plus-scaled-bandpass: output = x[n] + a0*(y0 - y2), where y0 = x[n] + b1*y1 + b2*y2 is the recursive two-pole resonator state and (y0 - y2) is its bandpass output. Coefficients: C = 1/tan(rq * freq * pi / sr), D = 2*cos(2*pi*freq/sr), b1 = C*D/(1+C), b2 = (1-C)/(1+C), a0 = (10^(db/20) - 1)/(1+C); db=0 gives a0=0 and unity passthrough. At very low rq (narrow band) or high freq, the half-bandwidth argument rq*freq*pi/sr approaches zero, driving tan toward zero and C toward infinity, collapsing b2 toward -1 and risking marginal resonator stability; parameters are linearly interpolated over the control block (mFilterSlope) to suppress coefficient-discontinuity clicks.

### OnePole — One pole filter.
- `OnePole.ar({ in=0, coef=0.5, mul=1, add=0 })`
- `OnePole.kr({ in=0, coef=0.5, mul=1, add=0 })`

> A one pole filter. Implements the formula: out(i) = ((1 - abs(coef)) * in(i)) + (coef * out(i-1)).

### OneZero — One zero filter.
- `OneZero.ar({ in=0, coef=0.5, mul=1, add=0 })`
- `OneZero.kr({ in=0, coef=0.5, mul=1, add=0 })`

> A one zero filter. Implements the formula: out(i) = ((1 - abs(coef)) * in(i)) + (coef * in(i-1)).

### Ramp — Break a continuous signal into line segments
- `Ramp.ar({ in=0, lagTime=0.1, mul=1, add=0 })`
- `Ramp.kr({ in=0, lagTime=0.1, mul=1, add=0 })`

> Break a continuous signal into linearly interpolated segments with specific durations. Feeding Ramp with noise is similar to LFNoise1 Ramp.kr(WhiteNoise.kr(1), 0.5) is equal to: LFNoise1.kr(1 / 0.5) For smoothing out control signals, take a look at Lag and VarLag

### Resonz — Resonant filter.
- `Resonz.ar({ in=0, freq=440, bwr=1, mul=1, add=0 })`
- `Resonz.kr({ in=0, freq=440, bwr=1, mul=1, add=0 })`

> This is the same as Ringz, except that it has a constant gain at 0 dB instead of being constant skirt. It is a two pole resonant filter with zeroes at z = ±1 Based on K. Steiglitz, "A Note on Constant-Gain Digital Resonators", Computer Music Journal, vol 18, no. 4, pp. 8-10, Winter 1994.

### RHPF — A resonant high pass filter.
- `RHPF.ar({ in=0, freq=440, rq=1, mul=1, add=0 })`
- `RHPF.kr({ in=0, freq=440, rq=1, mul=1, add=0 })`

> Second-order resonant high-pass filter implemented as a direct-form IIR biquad with bilinear-transform-derived coefficients: D = tan(ω·rq/2), C = (1−D)/(1+D), b1 = (1+C)·cos(ω), b2 = −C, a0 = (1+C+b1)/4, where ω = 2πf/sr. State update is y0 = a0·x + b1·y1 + b2·y2, and the high-pass output is extracted as y0 − 2·y1 + y2, encoding the feedforward numerator in the state difference rather than separate feedforward taps. rq is clamped to 0.001 to prevent D collapsing to zero (which would make C=1 and destabilize the denominator); near-zero freq produces near-zero ω, making D≈0, C≈1, b1≈2, b2≈−1 — a nearly-marginally-stable resonator that causes the documented glitching. Coefficient changes are smoothed by linear interpolation across the block (mFilterSlope), and denormals are suppressed on y1/y2 via zapgremlins each block.

### Ringz — Ringing filter.
- `Ringz.ar({ in=0, freq=440, decaytime=1, mul=1, add=0 })`
- `Ringz.kr({ in=0, freq=440, decaytime=1, mul=1, add=0 })`

> This is the same as Resonz, except that it is a constant skirt gain filter, meaning that the peak gain depends on the value of Q. Also, instead of the resonance parameter in Resonz, the bandwidth is specified in a 60dB ring decay time. One Ringz is equivalent to one component of the Klank UGen.

### RLPF — A resonant low pass filter.
- `RLPF.ar({ in=0, freq=440, rq=1, mul=1, add=0 })`
- `RLPF.kr({ in=0, freq=440, rq=1, mul=1, add=0 })`

> Second-order IIR resonant lowpass implemented as a biquad with a double zero at Nyquist (z = -1). Coefficients are computed from pfreq = freq * radiansPerSample and D = tan(pfreq * rq * 0.5): C = (1-D)/(1+D), b1 = (1+C)*cos(pfreq), b2 = -C, a0 = (1+C-b1)*0.25; state update is y0 = a0*x + b1*y1 + b2*y2 with output y0 + 2*y1 + y2 (numerator [a0, 2a0, a0]). rq (reciprocal-Q = BW/fc) is clamped to 0.001 to prevent division-by-zero instability, but freq near 0 still risks blowup since tan(pfreq*rq/2) collapses. At audio rate, coefficients are interpolated in 3-sample sub-blocks across the control block (via mFilterSlope/mFilterLoops) when freq or rq change, avoiding zipper noise but not guaranteeing stability mid-transition.

### SOS — Second order filter section (biquad).
- `SOS.ar({ in=0, a0=0, a1=0, a2=0, b1=0, b2=0, mul=1, add=0 })`
- `SOS.kr({ in=0, a0=0, a1=0, a2=0, b1=0, b2=0, mul=1, add=0 })`

> A standard second order filter section. Filter coefficients are given directly rather than calculated for you. Formula is equivalent to: out(i) = (a0 * in(i)) + (a1 * in(i-1)) + (a2 * in(i-2)) + (b1 * out(i-1)) + (b2 * out(i-2))

### TwoPole — Two pole filter.
- `TwoPole.ar({ in=0, freq=440, radius=0.8, mul=1, add=0 })`
- `TwoPole.kr({ in=0, freq=440, radius=0.8, mul=1, add=0 })`

> A two pole filter. This provides lower level access to setting of pole location. For general purposes Resonz is better.

### TwoZero — Two zero filter.
- `TwoZero.ar({ in=0, freq=440, radius=0.8, mul=1, add=0 })`
- `TwoZero.kr({ in=0, freq=440, radius=0.8, mul=1, add=0 })`

> Second-order FIR (all-zero, no feedback) implementing y[n] = x[n] + b1*x[n-1] + b2*x[n-2], where b1 = -2*radius*cos(freq*radiansPerSample) and b2 = radius^2; the zero pair sits at complex conjugate positions on the z-plane at angle freq*radiansPerSample and radial distance radius. At radius=1 the zeros land exactly on the unit circle, producing a complete spectral null at freq; values below 1 move zeros inside the circle, softening the notch. When freq or radius changes mid-block, b1 and b2 are linearly interpolated every 3 samples across the block (the LOOP macro unrolls 3 samples per iteration; mFilterSlope = 1/mFilterLoops, mFilterLoops = bufLength/3), so coefficient updates are smooth but the filter remains FIR throughout — no stability concern, but gain is not normalized, so output magnitude scales with radius^2 as radius grows.

### VarLag — Variable shaped lag
- `VarLag.ar({ in=0, time=0.1, curvature=0, warp=5, start, mul=1, add=0 })`
- `VarLag.kr({ in=0, time=0.1, curvature=0, warp=5, start, mul=1, add=0 })`

> Similar to Lag but with other curve shapes than exponential. A change on the input will take the specified time to reach the new value. Useful for smoothing out control (not audio) signals. VarLag.ar currently accepts audio-rate input, but the underlying implementation treats the input as control rate. Effectively, then, the "sampling rate" of VarLag's input is ControlRate.ir or server.sampleRate / server.options.blockSize, and the maximum safe frequency to feed into VarLag is half of this. VarLag does not currently yield correct results for full-bandwidth audio-rate signals. Use VarLag.ar at your own risk.::

## Filters › Nonlinear

### Ball — physical model of bouncing object
- `Ball.ar({ in=0, g=1, damp=0, friction=0.01 })`
- `Ball.kr({ in=0, g=1, damp=0, friction=0.01 })`

> Each sample: subtract gravity from velocity, advance position, then resolve collision. On collision (pos <= floor), velocity is set to (floorVel - vel) * damping; dither (scaled by g_in) is always added. A sticky zone (|dist| < k, where k is scaled by g_in) either snaps vel=0/pos=floor+g or interpolates toward floor velocity.

### FreqShift — Frequency Shifter.
- `FreqShift.ar({ in, freq=0, phase=0, mul=1, add=0 })`

> FreqShift implements single sideband amplitude modulation, also known as frequency shifting, but not to be confused with pitch shifting. Frequency shifting moves all the components of a signal by a fixed amount but does not preserve the original harmonic relationships.

### Hasher — Scrambled value with a hash function.
- `Hasher.ar({ in=0, mul=1, add=0 })`
- `Hasher.kr({ in=0, mul=1, add=0 })`

> Returns a unique output value from -1 to +1 for each input value according to a hash function. The same input value will always produce the same output value. The input need not be in the range -1 to +1.

### Hilbert — Applies the Hilbert transform to an input signal.
- `Hilbert.ar({ in, mul=1, add=0 })`

> Returns two channels with the original signal and a copy of that signal that has been shifted in phase by 90 degrees (0.5 pi radians). Hilbert outputs two channels containing the input signal and the transformed signal. Due to the method used, distortion occurs in the upper octave of the frequency spectrum (See HilbertFIR for an FFT implementation that avoids this, but introduces a significant delay).

### HilbertFIR — Applies the Hilbert transform to an input signal.
- `HilbertFIR.ar({ in, buffer })`

> Returns two channels with the original signal and a copy of that signal that has been shifted in phase by 90 degrees (0.5 pi radians). HilbertFIR outputs two channels containing the input signal and the transformed signal. HilbertFIR uses FFTs and a 90 degree phase shift to transform the signal, and results in a delay equal to the size of the buffer used for the FFT divided by the sample rate. The Hilbert UGen has less delay, but distorts in the upper octave of the frequency spectrum.

### MantissaMask — Reduce precision.
- `MantissaMask.ar({ in=0, bits=3, mul=1, add=0 })`
- `MantissaMask.kr({ in=0, bits=3, mul=1, add=0 })`

> Masks off bits in the mantissa of the floating point sample value. This introduces a quantization noise, but is less severe than linearly quantizing the signal.

### Median — Median filter.
- `Median.ar({ length=3, in=0, mul=1, add=0 })`
- `Median.kr({ length=3, in=0, mul=1, add=0 })`

> Returns the median of the last length input points. This non-linear filter is good at reducing impulse noise from a signal.

### Slew — Slew rate limiter.
- `Slew.ar({ in=0, up=1, dn=1, mul=1, add=0 })`
- `Slew.kr({ in=0, up=1, dn=1, mul=1, add=0 })`

> Limits the slope of an input signal. The slope is expressed in units per second. For smoothing out control signals, take a look at Lag and VarLag

### Spring — physical model of resonating spring
- `Spring.ar({ in=0, spring=1, damp=0 })`
- `Spring.kr({ in=0, spring=1, damp=0 })`

> Simulates a damped mass-spring system via Euler integration: each sample computes net force as `force = (in * c) - (pos * k * c)` where c = 1/sampleRate and k is the spring constant, then updates velocity as `vel = (vel + force) * (1 - damp)` and position as `pos += vel`, outputting `force * sampleRate`. The damp parameter is a per-sample velocity multiplier subtracted from 1, so damp=0 is lossless and damp=1 kills all velocity instantly; small values (0.00001–0.1) yield ringing resonance. Both spring constant and input force are scaled by SAMPLEDUR, making resonant frequency and amplitude sample-rate-dependent — patch designed at 44.1 kHz will behave differently at 48 kHz. Stability requires damp > 0 and spring small enough that the system does not diverge; large spring values with near-zero damping will blow up.

### TBall — physical model of bouncing object
- `TBall.ar({ in=0, g=10, damp=0, friction=0.01 })`
- `TBall.kr({ in=0, g=10, damp=0, friction=0.01 })`

> Simulates a point mass bouncing on an audio-rate vibrating surface using single-sample Euler integration: each sample applies gravity (g = g_in * sampleDur) as vel -= g; pos += vel, then tests collision (dist = pos - floor). On bounce (dist <= 0), pos is reflected (pos = floor - dist), velocity becomes the relative impact velocity (vel = floorvel - vel) scaled by damping coefficient (1 - damp), and that post-damping velocity is emitted as a pulse; all non-bounce samples output 0, making the signal a sparse impulse train. A sticky-friction zone of radius k = friction * g_in pulls the ball to the floor with a stiff spring (inter = sampleDur * 10000) when within k, and hard-locks it when within 0.5% of k, preventing jitter for slow-moving surfaces. Critically, k scales with gravity, so raising g simultaneously widens the capture zone and increases bounce energy, and very high g_in combined with a slowly-moving floor risks the ball locking permanently; pos and prev_floor are computed in double precision to reduce drift over long trajectories.

## Filters › Pitch

### PitchShift — Time domain pitch shifter.
- `PitchShift.ar({ in=0, windowSize=0.2, pitchRatio=1, pitchDispersion=0, timeDispersion=0, mul=1, add=0 })`

> A time domain granular pitch shifter. Grains have a triangular amplitude envelope and an overlap of 4:1, and use linear interpolation of the buffer.
