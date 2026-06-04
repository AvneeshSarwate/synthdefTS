# Generators

_76 UGens. Generated from SuperCollider help files — do not edit by hand._

## Generators › Chaotic

### CuspL — Cusp map chaotic generator
- `CuspL.ar({ freq=22050, a=1, b=1.9, xi=0, mul=1, add=0 })`

> A linear-interpolating sound generator based on the difference equation: x(n+1) = a - b * sqrt(|x(n)|) sclang code translation: ( var a = 1.0, b = 1.9, xi = 0, size = 64; plot(size.collect { xi = a - (b * sqrt(abs(xi))) }); )

### CuspN — Cusp map chaotic generator
- `CuspN.ar({ freq=22050, a=1, b=1.9, xi=0, mul=1, add=0 })`

> A non-interpolating sound generator based on the difference equation: x(n+1) = a - b * sqrt(|x(n)|) sclang code translation: ( var a = 1.0, b = 1.9, xi = 0, size = 64; plot(size.collect { xi = a - (b * sqrt(abs(xi))) }); )

### FBSineC — Feedback sine with chaotic phase indexing
- `FBSineC.ar({ freq=22050, im=1, fb=0.1, a=1.1, c=0.5, xi=0.1, yi=0.1, mul=1, add=0 })`

> A cubic-interpolating sound generator based on the difference equations: x(n+1) = sin(im * y(n) + fb * x(n)) y(n+1) = (a * y(n) + c) % 2pi This uses a linear congruential function to drive the phase indexing of a sine wave. For im = 1 , fb = 0 , and a = 1 a normal sinewave results. sclang code translation: ( var im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, size = 64; plot(size.collect { xi = sin((im * yi) + (fb * xi)); yi = (a * yi + c) % 2pi; xi }); )

### FBSineL — Feedback sine with chaotic phase indexing
- `FBSineL.ar({ freq=22050, im=1, fb=0.1, a=1.1, c=0.5, xi=0.1, yi=0.1, mul=1, add=0 })`

> A linear-interpolating sound generator based on the difference equations: x(n+1) = sin(im * y(n) + fb * x(n)) y(n+1) = (a * y(n) + c) % 2pi This uses a linear congruential function to drive the phase indexing of a sine wave. For im = 1 , fb = 0 , and a = 1 a normal sinewave results. sclang code translation: ( var im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, size = 64; plot(size.collect { xi = sin((im * yi) + (fb * xi)); yi = (a * yi + c) % 2pi; xi }); )

### FBSineN — Feedback sine with chaotic phase indexing
- `FBSineN.ar({ freq=22050, im=1, fb=0.1, a=1.1, c=0.5, xi=0.1, yi=0.1, mul=1, add=0 })`

> A non-interpolating sound generator based on the difference equations: x(n+1) = sin(im * y(n) + fb * x(n)) y(n+1) = (a * y(n) + c) % 2pi This uses a linear congruential function to drive the phase indexing of a sine wave. For im = 1 , fb = 0 , and a = 1 a normal sinewave results. sclang code translation: ( var im = 1, fb = 0.1, a = 1.1, c = 0.5, xi = 0.1, yi = 0.1, size = 64; plot(size.collect { xi = sin((im * yi) + (fb * xi)); yi = (a * yi + c) % 2pi; xi }); )

### GbmanL — Gingerbreadman map chaotic generator
- `GbmanL.ar({ freq=22050, xi=1.2, yi=2.1, mul=1, add=0 })`

> A linear-interpolating sound generator based on the difference equations: x(n+1) = 1 - y(n) + |x(n)| y(n+1) = x(n) The behavior of the system is dependent only on its initial conditions and cannot be changed once it's started. sclang code translation: ( var xi = 1.2, yi = 2.1, size = 64; plot(size.collect { var x; xi = 1 - yi + abs(x = xi); yi = x; xi }); ) Reference: Devaney, R. L. "The Gingerbreadman." Algorithm 3, 15-16, Jan. 1992.

### GbmanN — Gingerbreadman map chaotic generator
- `GbmanN.ar({ freq=22050, xi=1.2, yi=2.1, mul=1, add=0 })`

> A non-interpolating sound generator based on the difference equations: x(n+1) = 1 - y(n) + |x(n)| y(n+1) = x(n) The behavior of the system is only dependent on its initial conditions. sclang code translation: ( var xi = 1.2, yi = 2.1, size = 64; plot(size.collect { var x; xi = 1 - yi + abs(x = xi); yi = x; xi }); ) Reference: Devaney, R. L. "The Gingerbreadman." Algorithm 3, 15-16, Jan. 1992.

### HenonC — Henon map chaotic generator
- `HenonC.ar({ freq=22050, a=1.4, b=0.3, x0=0, x1=0, mul=1, add=0 })`

> A cubic-interpolating sound generator based on the difference equation: x(n+2) = 1 - a * x(n+1)^2 + b * x(n) This equation was discovered by French astronomer Michel Hénon while studying the orbits of stars in globular clusters. for more information on chaos theory henon formulas: "https://en.wikipedia.org/wiki/Chaos_theory" "https://en.wikipedia.org/wiki/Hénon_map" sclang code translation: ( var a = 1.4, b = 0.3, x0 = 0, x1 = 1, size = 64; plot(size.collect { var aux = 1 - (a * (x1 ** 2)) + (b * x0); x0 = x1; x1 = aux; aux }); )

### HenonL — Henon map chaotic generator
- `HenonL.ar({ freq=22050, a=1.4, b=0.3, x0=0, x1=0, mul=1, add=0 })`

> A linear-interpolating sound generator based on the difference equation: x(n+2) = 1 - a * x(n+1)^2 + b * x(n) This equation was discovered by French astronomer Michel Hénon while studying the orbits of stars in globular clusters. sclang code translation: ( var a = 1.4, b = 0.3, x0 = 0, x1 = 1, size = 64; plot(size.collect { var aux = 1 - (a * (x1 ** 2)) + (b * x0); x0 = x1; x1 = aux; aux }); )

### HenonN — Henon map chaotic generator
- `HenonN.ar({ freq=22050, a=1.4, b=0.3, x0=0, x1=0, mul=1, add=0 })`

> A non-interpolating sound generator based on the difference equation: x(n+2) = 1 - a * x(n+1)^2 + b * x(n) This equation was discovered by French astronomer Michel Hénon while studying the orbits of stars in globular clusters. sclang code translation: ( var a = 1.4, b = 0.3, x0 = 0, x1 = 1, size = 64; plot(size.collect { var aux = 1 - (a * (x1 ** 2)) + (b * x0); x0 = x1; x1 = aux; aux }); )

### LatoocarfianC — Latoocarfian chaotic generator
- `LatoocarfianC.ar({ freq=22050, a=1, b=3, c=0.5, d=0.5, xi=0.5, yi=0.5, mul=1, add=0 })`

> Coupled two-state chaotic map iterated at `freq` Hz with cubic interpolation. Recurrence: x(n+1) = sin(b·y(n)) + c·sin(b·x(n)), y(n+1) = sin(a·x(n)) + d·sin(a·y(n)); output is x. Parameters a and b (range ±3) appear in both cross and self terms; c and d (range 0.5–1.5) scale the self-feedback (second sin) terms. Depending on parameters, output is continuous chaos, silence (convergence to a fixed value), or a cyclic tone; CPU cost is high as the UGen is unoptimized.

### LatoocarfianL — Latoocarfian chaotic generator
- `LatoocarfianL.ar({ freq=22050, a=1, b=3, c=0.5, d=0.5, xi=0.5, yi=0.5, mul=1, add=0 })`

> Discrete-time chaotic oscillator iterated at an arbitrary freq (Hz), outputting the x sequence with linear interpolation between steps. Recurrence: x[n+1] = sin(b·y[n]) + c·sin(b·x[n]); y[n+1] = sin(a·x[n]) + d·sin(a·y[n]). Parameters a, b in [-3, 3] scale the sinusoidal arguments in their respective output equations; c, d in [0.5, 1.5] scale the self-feedback terms. Depending on parameter values, the map produces continuous chaos, converges to a fixed point (silence), or locks into a periodic cycle (tone); all four params and freq are modulatable.

### LatoocarfianN — Latoocarfian chaotic generator
- `LatoocarfianN.ar({ freq=22050, a=1, b=3, c=0.5, d=0.5, xi=0.5, yi=0.5, mul=1, add=0 })`

> Coupled 2D discrete chaotic map iterated at a user-set freq (not per-sample by default): x(n+1) = sin(b*y(n)) + c*sin(b*x(n)), y(n+1) = sin(a*x(n)) + d*sin(a*y(n)), outputting x. Recommended parameter ranges: a,b in [-3, +3] and c,d in [0.5, 1.5]; depending on parameters the map can produce continuous chaotic output, converge to a fixed point (silence), or oscillate in a cycle (tonal output). The N variant is non-interpolating (zero-order hold), so staircase artifacts appear at low iteration frequencies.

### LinCongC — Linear congruential chaotic generator
- `LinCongC.ar({ freq=22050, a=1.1, c=0.13, m=1, xi=0, mul=1, add=0 })`

> A cubic-interpolating sound generator based on the difference equation: x(n+1) = (a * x(n) + c) % m The output signal is automatically scaled to a range of [-1, 1]. sclang code translation: ( var a = 1.1, c = 0.13, m = 1, xi = 0, size = 64; plot(size.collect { xi = (a * xi + c) % m }); )

### LinCongL — Linear congruential chaotic generator
- `LinCongL.ar({ freq=22050, a=1.1, c=0.13, m=1, xi=0, mul=1, add=0 })`

> A linear-interpolating sound generator based on the difference equation: x(n+1) = (a * x(n) + c) % m The output signal is automatically scaled to a range of [-1, 1]. sclang code translation: ( var a = 1.1, c = 0.13, m = 1, xi = 0, size = 64; plot(size.collect { xi = (a * xi + c) % m }); )

### LinCongN — Linear congruential chaotic generator
- `LinCongN.ar({ freq=22050, a=1.1, c=0.13, m=1, xi=0, mul=1, add=0 })`

> A non-interpolating sound generator based on the difference equation: x(n+1) = (a * x(n) + c) % m The output signal is automatically scaled to a range of [-1, 1]. sclang code translation: ( var a = 1.1, c = 0.13, m = 1, xi = 0, size = 64; plot(size.collect { xi = (a * xi + c) % m }); )

### Logistic — Chaotic noise function
- `Logistic.ar({ chaosParam=3, freq=1000, init=0.5, mul=1, add=0 })`
- `Logistic.kr({ chaosParam=3, freq=1000, init=0.5, mul=1, add=0 })`

> Iterates y[n] = r * y[n-1] * (1 - y[n-1]) in double precision, where r is chaosParam and y is initialized to the init argument; output stays in [0,1] for r in [0,4] but diverges outside that range. The ctor selects between two calc functions: if chaosParam is scalar-rate AND freq >= sampleRate, every sample is a new iteration (Logistic_next_1); otherwise freq controls iteration rate (sampleRate/freq samples per step, minimum 1), holding y between steps (Logistic_next_k). Chaos onset is near r=3.57; the output has a DC offset, so LeakDC or a mul/add rescale is recommended for AC-coupled contexts.

### LorenzL — Lorenz chaotic generator
- `LorenzL.ar({ freq=22050, s=10, r=28, b=2.667, h=0.05, xi=0.1, yi=0, zi=0, mul=1, add=0 })`

> A strange attractor discovered by Edward N. Lorenz while studying mathematical models of the atmosphere. The system is composed of three ordinary differential equations: x' = s * (y - x) y' = x * (r - z) - y z' = x * y - b * z The time step amount h determines the rate at which the ODE is evaluated. Higher values will increase the rate, but cause more instability. A safe choice is the default amount of 0.05.

### QuadC — General quadratic map chaotic generator
- `QuadC.ar({ freq=22050, a=1, b=-1, c=-0.75, xi=0, mul=1, add=0 })`

> A cubic-interpolating sound generator based on the difference equation: x(n+1) = a * x(n)^2 + b * x(n) + c sclang code translation: ( var a = 1, b = -1, c = -0.75, xi = 0, size = 64; plot(size.collect { xi = (a * (xi ** 2)) + (b * xi) + c; xi }); )

### QuadL — General quadratic map chaotic generator
- `QuadL.ar({ freq=22050, a=1, b=-1, c=-0.75, xi=0, mul=1, add=0 })`

> A linear-interpolating sound generator based on the difference equation: x(n+1) = a * x(n)^2 + b * x(n) + c sclang code translation: ( var a = 1, b = -1, c = -0.75, xi = 0, size = 64; plot(size.collect { xi = (a * (xi ** 2)) + (b * xi) + c; xi }); )

### QuadN — General quadratic map chaotic generator
- `QuadN.ar({ freq=22050, a=1, b=-1, c=-0.75, xi=0, mul=1, add=0 })`

> A non-interpolating sound generator based on the difference equation: x(n+1) = a * x(n)^2 + b * x(n) + c sclang code translation: ( var a = 1, b = -1, c = -0.75, xi = 0, size = 64; plot(size.collect { xi = (a * (xi ** 2)) + (b * xi) + c; xi }); )

### StandardL — Standard map chaotic generator
- `StandardL.ar({ freq=22050, k=1, xi=0.5, yi=0, mul=1, add=0 })`

> A linear-interpolating sound generator based on the difference equations: x(n+1) = (x(n) + y(n+1)) % 2pi y(n+1) = (y(n) + k * sin(x(n))) % 2pi The standard map is an area preserving map of a cylinder discovered by the plasma physicist Boris Chirikov. sclang code translation: ( var k = 1, xi = 0.5, yi = 0, size = 64; plot(size.collect { yi = yi + (k * sin(xi)) % 2pi; xi = (xi + yi) % 2pi; xi - pi * 0.3183098861837907 }); )

### StandardN — Standard map chaotic generator
- `StandardN.ar({ freq=22050, k=1, xi=0.5, yi=0, mul=1, add=0 })`

> A non-interpolating sound generator based on the difference equations: x(n+1) = (x(n) + y(n+1)) % 2pi y(n+1) = (y(n) + k * sin(x(n))) % 2pi The standard map is an area preserving map of a cylinder discovered by the plasma physicist Boris Chirikov. sclang code translation: ( var k = 1, xi = 0.5, yi = 0, size = 64; plot(size.collect { yi = yi + (k * sin(xi)) % 2pi; xi = (xi + yi) % 2pi; xi - pi * 0.3183098861837907 }); )

## Generators › Deterministic

### Blip — Band limited impulse oscillator.
- `Blip.ar({ freq=440, numharm=200, mul=1, add=0 })`
- `Blip.kr({ freq=440, numharm=200, mul=1, add=0 })`

> Band Limited ImPulse generator. All harmonics have equal amplitude. This is the equivalent of 'buzz' in MusicN languages. Synth-O-Matic (1990) had an impulse generator called blip, hence that name here rather than 'buzz'. It is improved from other implementations in that it will crossfade in a control period when the number of harmonics changes, so that there are no audible pops. It also eliminates the divide in the formula by using a 1/sin table (with special precautions taken for 1/0). The lookup tables are linearly interpolated for better quality. This waveform in its raw form could be damaging to your ears at high amplitudes or for long periods. ::

### COsc — Chorusing wavetable oscillator.
- `COsc.ar({ bufnum, freq=440, beats=0.5, mul=1, add=0 })`
- `COsc.kr({ bufnum, freq=440, beats=0.5, mul=1, add=0 })`

> Chorusing wavetable lookup oscillator. Produces sum of two signals at (freq ± (beats / 2)). Due to summing, the peak amplitude is not the same as the wavetable and can be twice of that.

### DynKlang — Dynamic sine oscillator bank
- `DynKlang.ar({ specificationsArrayRef, freqscale=1, freqoffset=0 })`
- `DynKlang.kr({ specificationsArrayRef, freqscale=1, freqoffset=0 })`

> DynKlang is a bank of sine oscillators. It is less efficient than Klang, as it is basically a wrapper around SinOsc UGens in order to provide a similar interface to Klang. Unlike Klang, parameters in specificationsArrayRef can be changed after it has been started.

### DynKlank — Bank of resonators.
- `DynKlank.ar({ specificationsArrayRef, input, freqscale=1, freqoffset=0, decayscale=1 })`
- `DynKlank.kr({ specificationsArrayRef, input, freqscale=1, freqoffset=0, decayscale=1 })`

> DynKlank is a bank of frequency resonators which can be used to simulate the resonant modes of an object. Each mode is given a ring time, which is the time for the mode to decay by 60 dB. Unlike Klank, all parameters in DynKlank can be changed in real-time after it has been started. Note:: The amplitude of the resulting signal depends on the server's sample rate. See link::Classes/Ringz#Interaction with sample rate#Ringz: Interaction with sample rate:: for details. ::

### Formant — Formant oscillator
- `Formant.ar({ fundfreq=440, formfreq=1760, bwfreq=880, mul=1, add=0 })`

> Produces a sine wave at formfreq (phase2), phase-locked and reset every fundfreq (f0) cycle, windowed by a raised-cosine envelope (1 - cos(phase3)) derived from a third oscillator advancing at max(fundfreq, bwfreq); output is zeroed when phase3 exceeds one full cycle, so the duty cycle of the active window narrows as bwfreq increases relative to f0. All three integer phases are synchronised on each f0 period boundary: phase2 and phase3 are set proportionally to phase1's overshoot (phase2 = overshoot * freq2/freq1; phase3 = overshoot * freq3/freq1), ensuring harmonic coherence across tempo or pitch changes. bwfreq must be >= fundfreq (enforced by the max(freq1, freq3) clamp on the window rate); setting bwfreq < fundfreq collapses the window rate to f0, giving a full-duty-cycle raised-cosine pulse at the formant. No anti-aliasing is applied, so high formfreq/fundfreq ratios can alias badly at low sample rates.

### FSinOsc — Fast sine oscillator.
- `FSinOsc.ar({ freq=440, iphase=0, mul=1, add=0 })`
- `FSinOsc.kr({ freq=440, iphase=0, mul=1, add=0 })`

> Very fast sine wave generator (2 PowerPC instructions per output sample!) implemented using a ringing filter. This generates a much cleaner sine wave than a table lookup oscillator and is a lot faster. However, the amplitude of the wave will vary with frequency. Generally the amplitude will go down as you raise the frequency and go up as you lower the frequency. In the current implementation, the amplitude can blow up if the frequency is modulated by certain alternating signals. ::

### Impulse — Impulse oscillator.
- `Impulse.ar({ freq=440, phase=0, mul=1, add=0 })`
- `Impulse.kr({ freq=440, phase=0, mul=1, add=0 })`

> Outputs non-bandlimited single sample impulses.

### Klang — Sine oscillator bank
- `Klang.ar({ specificationsArrayRef, freqscale=1, freqoffset=0 })`

> Klang is a bank of fixed frequency sine oscillators. Klang is more efficient than creating individual oscillators but offers less flexibility.

### Klank — Bank of resonators
- `Klank.ar({ specificationsArrayRef, input, freqscale=1, freqoffset=0, decayscale=1 })`

> Klank is a fixed-parameter bank of parallel Ringz resonators (constant-skirt-gain IIR filters) driven by the same input; each partial specifies center frequency, per-band amplitude, and a 60 dB ring-decay time (t60). Frequencies and decay times are scaled once at init via freqscale/freqoffset and decayscale; runtime modulation is not possible (use DynKlank). For non-impulse inputs, output amplitude scales linearly with sample rate — 88.2 kHz yields double the amplitude of 44.1 kHz — so cross-rate work requires normalizing by (nominalSr / SampleRate.ir). A Formlet bank is efficiently realized as Klank(decaySpecs) - Klank(attackSpecs).

### LFCub — A sine like shape made of two cubic pieces
- `LFCub.ar({ freq=440, iphase=0, mul=1, add=0 })`
- `LFCub.kr({ freq=440, iphase=0, mul=1, add=0 })`

> A sine like shape made of two cubic pieces. Smoother than LFPar .

### LFGauss — Gaussian function oscillator
- `LFGauss.ar({ duration=1, width=0.1, iphase=0, loop=1, doneAction=0 })`
- `LFGauss.kr({ duration=1, width=0.1, iphase=0, loop=1, doneAction=0 })`

> A non-band-limited gaussian function oscillator. LFGauss implements the formula: f(x) = exp((x - iphase)^2 / (-2.0 * width^2)) where x in this context is the phase, which cycles in a range -1 to 1 over the period duration. The Gaussian function in this form is a bell-shaped link::https://mathworld.wolfram.com/ApodizationFunction.html##apodization function::, making it convenient for use as an envelope. Its minimum value occurs when the phase x = -1 and x = 1, and its maximum occurs when x = 0.

### LFPar — Parabolic oscillator
- `LFPar.ar({ freq=440, iphase=0, mul=1, add=0 })`
- `LFPar.kr({ freq=440, iphase=0, mul=1, add=0 })`

> A sine-like shape made of two parabolas and the integral of a triangular wave. It has audible odd harmonics and is non-band-limited. Output ranges from -1 to +1.

### LFPulse — pulse oscillator
- `LFPulse.ar({ freq=440, iphase=0, width=0.5, mul=1, add=0 })`
- `LFPulse.kr({ freq=440, iphase=0, width=0.5, mul=1, add=0 })`

> Non-band-limited pulse oscillator with a double-precision phase accumulator: each sample, phase += freq * sampleDur; when phase >= 1, phase -= 1 (subtraction, not modulo), duty is updated, and one sample of opposite polarity is forced (1 if duty <= 0.5, else 0) — guaranteeing a transition but producing a one-sample artifact when duty is near 0 or 1. Normal output is 1 when phase < duty, else 0. No anti-aliasing; hard 0/1 transitions produce full-spectrum harmonics, causing severe aliasing above ~1–2 kHz.

### LFSaw — Sawtooth oscillator
- `LFSaw.ar({ freq=440, iphase=0, mul=1, add=0 })`
- `LFSaw.kr({ freq=440, iphase=0, mul=1, add=0 })`

> A non-band-limited sawtooth oscillator. Output ranges from -1 to +1.

### LFTri — Triangle oscillator
- `LFTri.ar({ freq=440, iphase=0, mul=1, add=0 })`
- `LFTri.kr({ freq=440, iphase=0, mul=1, add=0 })`

> A non-band-limited triangle oscillator. Output ranges from -1 to +1.

### Osc — Interpolating wavetable oscillator.
- `Osc.ar({ bufnum, freq=440, phase=0, mul=1, add=0 })`
- `Osc.kr({ bufnum, freq=440, phase=0, mul=1, add=0 })`

> Linear-interpolating wavetable lookup oscillator. The buffer must be pre-converted to SC's internal wavetable format (via asWavetable or b_gen with wavetable=true), which stores interleaved pairs (2·a[n]−a[n+1], a[n+1]−a[n]) per slot — not (a[n], a[n+1]−a[n]) — because the fixed-point fractional accumulator (PhaseFrac1) yields values in [1,2) rather than [0,1), requiring this pre-distorted base; buffer size must be a power of 2. A fixed-point phase accumulator (cpstoinc = bufSize * SAMPLEDUR * 65536) advances per sample, and the fractional remainder drives linear interpolation via lookupi1: val1 + val2 * pfrac. The phase argument adds a radians offset at audio or control rate (valid range ±8pi; wrap with .mod(2pi) for large modulation); both freq and phase are audio-rate-modulatable, supporting FM and PM synthesis directly.

### OscN — Noninterpolating wavetable oscillator.
- `OscN.ar({ bufnum, freq=440, phase=0, mul=1, add=0 })`
- `OscN.kr({ bufnum, freq=440, phase=0, mul=1, add=0 })`

> Noninterpolating wavetable lookup oscillator with frequency and phase modulation inputs. It is usually better to use the interpolating oscillator Osc .

### PSinGrain — Very fast sine grain with a parabolic envelope
- `PSinGrain.ar({ freq=440, dur=0.2, amp=0.1 })`

> Generates a single sine grain using a 2-pole IIR resonator (no table lookup): y[n] = b1·y[n-1] − y[n-2], b1 = 2·cos(ω), with initial conditions y[-1] = −sin(ω)·amp, y[-2] = −sin(2ω)·amp, producing a sine-phase (zero-crossing start) output at freq Hz. The amplitude envelope is a running quadratic: level[n+1] = level[n] + slope[n], slope[n+1] = slope[n] + curve, where slope₀ = 4·(1/N − 1/N²) and curve = −8/N² (N = duration in samples), giving a smooth zero-to-zero arc peaking near the midpoint. All three parameters (freq, dur, amp) are read only at construction time and fixed for the grain's lifetime; the UGen self-terminates via NodeEnd when the sample counter expires. Amp scales the initial conditions directly, so the envelope peak approximates amp; the resonator accumulates floating-point drift over long grains.

### Pulse — Band limited pulse wave.
- `Pulse.ar({ freq=440, width=0.5, mul=1, add=0 })`
- `Pulse.kr({ freq=440, width=0.5, mul=1, add=0 })`

> Band limited pulse wave generator with pulse width modulation.

### Saw — Band limited sawtooth.
- `Saw.ar({ freq=440, mul=1, add=0 })`
- `Saw.kr({ freq=440, mul=1, add=0 })`

> Band limited sawtooth wave generator.

### SinOsc — Interpolating sine wavetable oscillator.
- `SinOsc.ar({ freq=440, phase=0, mul=1, add=0 })`
- `SinOsc.kr({ freq=440, phase=0, mul=1, add=0 })`

> Generates a sine wave. Uses a wavetable lookup oscillator with linear interpolation. Frequency and phase modulation are provided for audio-rate modulation. Technically, SinOsc uses the same implementation as Osc except that its table is fixed to be a sine wave made of 8192 samples. Other sinewaves oscillators LIST:: ## FSinOsc – fast sinewave oscillator ## SinOscFB – sinewave with phase feedback ## PMOsc – phase modulation sine oscillator ## Klang – bank of sinewave oscillators ## DynKlang – modulable bank of sinewave oscillators ::

### SinOscFB — Feedback FM oscillator
- `SinOscFB.ar({ freq=440, feedback=0, mul=1, add=0 })`
- `SinOscFB.kr({ freq=440, feedback=0, mul=1, add=0 })`

> A sine oscillator with single-operator phase-modulation feedback: each output sample is fed back as phase input for the next sample, scaled by the feedback argument (in radians). At low feedback the waveform transitions from sine toward sawtooth-like as feedback amplitude increases; overmodulation causes chaotic, non-periodic oscillation. The feedback equation in the source is phase[n] = sin(phase_accum + feedback_radians * out[n-1]), with feedback converted from radians to internal phase units. Frequency is updated only at control rate (default 64-sample blocks), so audio-rate frequency modulation at higher modulation frequencies produces audible aliasing artifacts.

### SyncSaw — Hard sync sawtooth wave.
- `SyncSaw.ar({ syncFreq=440, sawFreq=440, mul=1, add=0 })`
- `SyncSaw.kr({ syncFreq=440, sawFreq=440, mul=1, add=0 })`

> A sawtooth wave that is hard synched to a fundamental pitch. This produces an effect similar to moving formants or pulse width modulation. The sawtooth oscillator has its phase reset when the sync oscillator completes a cycle. This is not a band limited waveform, so it may alias.

### VarSaw — Variable duty saw
- `VarSaw.ar({ freq=440, iphase=0, width=0.5, mul=1, add=0 })`
- `VarSaw.kr({ freq=440, iphase=0, width=0.5, mul=1, add=0 })`

> A phasor-based sawtooth-triangle oscillator using a single normalized phase accumulator (incremented by freq/sampleRate per sample). Output is computed piecewise each sample: when phase < duty, out = phase*(2/duty) - 1 (rising ramp from -1 to +1); when phase >= duty, out = (1-phase)*(2/(1-duty)) - 1 (falling ramp from +1 to -1). The duty parameter (clamped to [0.001, 0.999]) is only latched at cycle boundaries (phase wrap), so width changes take effect at the next wrap rather than immediately, and audio-rate width modulation produces stepped updates once per cycle rather than continuous reshaping. No anti-aliasing is applied; if freq exceeds sampleRate the accumulator grows by more than 1.0 per sample but the wrap logic only subtracts 1.f once per sample, so phase can exceed the valid [0,1] range, causing incorrect output — the documented instability above the sampling rate.

### Vibrato — The Vibrato oscillator models a slow frequency modulation.
- `Vibrato.ar({ freq=440, rate=6, depth=0.02, delay=0, onset=0, rateVariation=0.04, depthVariation=0.1, iphase=0, trig=0 })`
- `Vibrato.kr({ freq=440, rate=6, depth=0.02, delay=0, onset=0, rateVariation=0.04, depthVariation=0.1, iphase=0, trig=0 })`

> Outputs a frequency (Hz) by adding a squared-envelope LFO deviation to the fundamental; the LFO ramps 0→1→0→-1→0 per cycle, scaled by `depth` (a proportion of `freq`, e.g. 0.02 = 2%). After a `delay` period, an onset ramp scales modulation depth from zero to full; `rateVariation` and `depthVariation` inject per-cycle noise as proportions of their parameters, with `depthVariation` applied independently to up and down half-cycles. Since `rate` is sampled only at cycle boundaries, setting it to 0 mid-cycle stalls the oscillator indefinitely.

### VOsc — Variable wavetable oscillator.
- `VOsc.ar({ bufpos, freq=440, phase=0, mul=1, add=0 })`
- `VOsc.kr({ bufpos, freq=440, phase=0, mul=1, add=0 })`

> Wavetable lookup oscillator that interpolates linearly between two adjacent, consecutively allocated buffers based on a fractional bufpos parameter; integer bufpos selects a single table, fractional values crossfade between floor(bufpos) and ceil(bufpos). All buffers must be the same power-of-two size and stored in SuperCollider's interleaved wavetable format (Signal:-asWavetable or b_gen with wavetable flag). Phase modulation is additive in radians at the lookup stage. Frequency argument runs at control rate only (non-interpolated), so audio-rate FM requires an external phase accumulator rather than the freq input.

### VOsc3 — Three variable wavetable oscillators.
- `VOsc3.ar({ bufpos, freq1=110, freq2=220, freq3=440, mul=1, add=0 })`
- `VOsc3.kr({ bufpos, freq1=110, freq2=220, freq3=440, mul=1, add=0 })`

> Three wavetable oscillators running at independent, non-interpolated control-rate frequencies (freq1/2/3), mixed to a single output. The bufpos argument is a fractional buffer index that interpolates between two adjacent wavetable-format buffers of the same power-of-two size, enabling continuous timbral morphing. Buffers must be pre-converted to SC's internal wavetable format (asWavetable or wavetable:true) and can be allocated consecutively (Buffer.allocConsecutive) for contiguous bufpos sweeping.

## Generators › Granular

### GrainFM — Granular synthesis with frequency modulated sine tones
- `GrainFM.ar({ numChannels=1, trigger=0, dur=1, carfreq=440, modfreq=200, index=1, pan=0, envbufnum=-1, maxGrains=512, mul=1, add=0 })`

> Each grain runs two integer-phase sine oscillators (carrier and modulator) read from SC's global sine wavetable via linear interpolation. At grain init, deviation = index * modfreq (Hz); per sample, the modulator output thismod = sin(moscphase) * deviation is added to carfreq to get the carrier's instantaneous frequency: cfreq = cpstoinc * (carfreq + thismod), so the modulation depth in Hz is purely index * modfreq with no carrier-ratio scaling. Both oscillator phases are reset to zero at every grain onset — there is no phase randomization — which means pitched grain clouds can exhibit comb-filtering artifacts at high trigger rates unless carfreq or modfreq are varied. The built-in envelope (envbufnum = -1) is a recursive quadrature sine resonator initialised as b1 = 2*cos(pi/N), y1 = sin(pi/N), y2 = 0, iterated as y0 = b1*y1 - y2 with amp = y1^2, producing a half-sine-squared (Hann) shape; all grain parameters including FM index are sampled once at trigger time and held fixed for the grain's lifetime.

### GrainIn — Granulate an input signal
- `GrainIn.ar({ numChannels=1, trigger=0, dur=1, in, pan=0, envbufnum=-1, maxGrains=512, mul=1, add=0 })`

> On each positive zero-crossing of the trigger, a grain of (int)(dur * sampleRate) samples (floored to a minimum of 4) is captured from the live input and multiplied sample-by-sample by an amplitude envelope, then accumulated into output buffers. The default envelope (envbufnum = -1, i.e. winType < 0) is a Hann window generated by a 2-pole sinusoidal resonator: w = pi/N, b1 = 2*cos(w), y1_init = sin(w), y2_init = 0, with recurrence y0 = b1*y1 - y2 and amp = y1^2 per sample; a user buffer selects instead a linearly interpolated table-lookup envelope with winInc = windowSamples/N stepping through the table each sample. All parameters except numChannels and the trigger rate are frozen at grain-spawn time, so changes to dur, pan, or envbufnum take effect only on subsequent triggers; exceeding maxGrains prints "Too many grains!" and silently drops the new grain.

### GrainSin — Granular synthesis with sine tones
- `GrainSin.ar({ numChannels=1, trigger=0, dur=1, freq=440, pan=0, envbufnum=-1, maxGrains=512, mul=1, add=0 })`

> Each trigger spawns a grain: a sine wavetable oscillator (32-bit integer phase accumulator, linear interpolation via lookupi1) multiplied sample-by-sample by a Hann envelope generated with a 2-pole IIR resonator — b1 = 2·cos(π/N), y1[0] = sin(π/N), y2[0] = 0, then y0 = b1·y1 − y2, amp = y1² — yielding sin²(kπ/N) exactly. With a custom envbufnum (≥ 0), the envelope is instead linearly interpolated from a user buffer stepped at winInc = bufferSamples/grainSamples. All parameters (freq, dur, pan, envbuf) are latched at grain onset and cannot be modulated mid-grain; oscillator phase always resets to zero at grain start, so synchronous triggers at a fixed rate produce fully coherent partials and audible comb-filtering artifacts unless freq or timing is dithered. maxGrains is a fixed RTAlloc at first k-rate call and cannot change thereafter; exceeding it silently drops new grains.

## Generators › Single-value

### DC — Create a constant amplitude signal
- `DC.ar({ in=0 })`
- `DC.kr({ in=0 })`

> This UGen simply outputs the initial value you give it.

## Generators › Stochastic

### BrownNoise — Brown Noise.
- `BrownNoise.ar({ mul=1, add=0 })`
- `BrownNoise.kr({ mul=1, add=0 })`

> Generates noise whose spectrum falls off in power by 6 dB per octave.

### ClipNoise — Clip Noise.
- `ClipNoise.ar({ mul=1, add=0 })`
- `ClipNoise.kr({ mul=1, add=0 })`

> Generates noise whose values are either -1 or 1. This produces the maximum energy for the least peak to peak amplitude.

### CoinGate — Statistical gate.
- `CoinGate.ar({ prob, in })`
- `CoinGate.kr({ prob, in })`

> When CoinGate receives a trigger, it tosses a coin and either passes the trigger or doesn't.

### Crackle — Chaotic noise function.
- `Crackle.ar({ chaosParam=1.5, mul=1, add=0 })`
- `Crackle.kr({ chaosParam=1.5, mul=1, add=0 })`

> A noise generator based on a chaotic function.

### Dust — Random impulses.
- `Dust.ar({ density=0, mul=1, add=0 })`
- `Dust.kr({ density=0, mul=1, add=0 })`

> Generates random impulses from 0 to +1.

### Dust2 — Random impulses.
- `Dust2.ar({ density=0, mul=1, add=0 })`
- `Dust2.kr({ density=0, mul=1, add=0 })`

> Generates random impulses from -1 to +1.

### Gendy1 — Dynamic stochastic synthesis generator.
- `Gendy1.ar({ ampdist=1, durdist=1, adparam=1, ddparam=1, minfreq=440, maxfreq=660, ampscale=0.5, durscale=0.5, initCPs=12, knum, mul=1, add=0 })`
- `Gendy1.kr({ ampdist=1, durdist=1, adparam=1, ddparam=1, minfreq=20, maxfreq=1000, ampscale=0.5, durscale=0.5, initCPs=12, knum, mul=1, add=0 })`

> Gendy1 linearly interpolates between N control points (initCPs, default 12 per Xenakis), random-walking each point's amplitude and inter-point duration every period via a chosen distribution (Linear, Cauchy, Logistic, Hyperbolic Cosine, Arcsine, Exponential, or external oscillator), with adparam/ddparam (0.0001–1) shaping the distribution and ampscale/durscale (0–1) scaling the delta step size. The period equals the sum of all inter-point durations and varies continuously unless durscale=0; minfreq/maxfreq clamp the oscillator frequency. knum=1 produces noise; knum=2 yields a crude oscillator. CPU cost rises with both initCPs and frequency, since a new breakpoint perturbation fires every sample when breakpoints are dense.

### Gendy2 — Dynamic stochastic synthesis generator.
- `Gendy2.ar({ ampdist=1, durdist=1, adparam=1, ddparam=1, minfreq=440, maxfreq=660, ampscale=0.5, durscale=0.5, initCPs=12, knum, a=1.17, c=0.31, mul=1, add=0 })`
- `Gendy2.kr({ ampdist=1, durdist=1, adparam=1, ddparam=1, minfreq=20, maxfreq=1000, ampscale=0.5, durscale=0.5, initCPs=12, knum, a=1.17, c=0.31, mul=1, add=0 })`

> See Gendy1 help file for background. This variant of GENDYN is closer to that presented in Hoffmann, Peter. (2000) The New GENDYN Program. Computer Music Journal 24:2, pp 31-38. Random walk is of the amplitude and time delta, not the amp and time directly. The amplitude step random walk uses a Lehmer style number generator whose parameters are accessible. :: SuperCollider implementation by Nick Collins

### Gendy3 — Dynamic stochastic synthesis generator.
- `Gendy3.ar({ ampdist=1, durdist=1, adparam=1, ddparam=1, freq=440, ampscale=0.5, durscale=0.5, initCPs=12, knum, mul=1, add=0 })`
- `Gendy3.kr({ ampdist=1, durdist=1, adparam=1, ddparam=1, freq=440, ampscale=0.5, durscale=0.5, initCPs=12, knum, mul=1, add=0 })`

> See Gendy1 help file for background. This variant of GENDYN normalises the durations in each period to force oscillation at the desired pitch. The breakpoints still get perturbed as in Gendy1 . There is some glitching in the oscillator caused by the stochastic effects - control points as they vary cause big local jumps of amplitude. Put ampscale and durscale low to minimise the rate of this. SuperCollider implementation by Nick Collins

### GrayNoise — Bit-flipping Noise
- `GrayNoise.ar({ mul=1, add=0 })`
- `GrayNoise.kr({ mul=1, add=0 })`

> Generates noise via a bit-flip recurrence: X_0 = 0; X_{n+1} = X_n XOR (1 << r), where r is a uniformly random integer in [0, 31], flipping one bit of the 32-bit integer accumulator each sample. Output is the integer state multiplied by 4.65661287308e-10 (~1/2^31), mapping to roughly [-1, 1]. The spectrum is emphasized toward lower frequencies and the RMS level is high relative to peak-to-peak level; gray noise has no standard definition like pink or white noise.

### LFClipNoise — Clipped noise
- `LFClipNoise.ar({ freq=500, mul=1, add=0 })`
- `LFClipNoise.kr({ freq=500, mul=1, add=0 })`

> Randomly generates the values -1 or +1 at a rate given by the nearest integer division of the sample rate by the freq argument. It is probably pretty hard on your speakers!

### LFDClipNoise — Dynamic clipped noise
- `LFDClipNoise.ar({ freq=500, mul=1, add=0 })`
- `LFDClipNoise.kr({ freq=500, mul=1, add=0 })`

> Like LFClipNoise, it generates the values -1 or +1 at a rate given by the freq argument, with two differences: no time quantization; fast recovery from low freq values Classes/LFClipNoise, as well as LFNoise0, LFNoise1 and LFNoise2 quantize to the nearest integer division of the samplerate, and they poll the freq argument only when scheduled; thus they often seem to hang when freqs get very low. :: :: If you don't need very high or very low freqs, or use fixed freqs, LFClipNoise is more efficient.

### LFDNoise0 — Dynamic step noise
- `LFDNoise0.ar({ freq=500, mul=1, add=0 })`
- `LFDNoise0.kr({ freq=500, mul=1, add=0 })`

> Like LFNoise0, it generates random values at a rate given by the freq argument, with two differences: no time quantization; fast recovery from low freq values Classes/LFNoise0, LFNoise1 and LFNoise2 quantize to the nearest integer division of the samplerate, and they poll the freq argument only when scheduled; thus they often seem to hang when freqs get very low. :: :: If you don't need very high or very low freqs, or use fixed freqs, LFNoise0 is more efficient.

### LFDNoise1 — Dynamic ramp noise
- `LFDNoise1.ar({ freq=500, mul=1, add=0 })`
- `LFDNoise1.kr({ freq=500, mul=1, add=0 })`

> Like LFNoise1, it generates linearly interpolated random values at a rate given by the freq argument, with two differences: no time quantization; fast recovery from low freq values Classes/LFNoise0, LFNoise1 and LFNoise2 quantize to the nearest integer division of the samplerate, and they poll the freq argument only when scheduled; thus they often seem to hang when freqs get very low. :: :: If you don't need very high or very low freqs, or use fixed freqs, LFNoise1 is more efficient.

### LFDNoise3 — Dynamic cubic noise
- `LFDNoise3.ar({ freq=500, mul=1, add=0 })`
- `LFDNoise3.kr({ freq=500, mul=1, add=0 })`

> Similar to LFNoise2, it generates polynomially interpolated random values at a rate given by the freq argument, with 3 differences: no time quantization; fast recovery from low freq values Classes/LFNoise0, LFNoise1 and LFNoise2 quantize to the nearest integer division of the samplerate, and they poll the freq argument only when scheduled; thus they often seem to hang when freqs get very low. :: ## cubic instead of quadratic interpolation :: If you don't need very high or very low freqs, or use fixed freqs, LFNoise2 is more efficient.

### LFNoise0 — Step noise
- `LFNoise0.ar({ freq=500, mul=1, add=0 })`
- `LFNoise0.kr({ freq=500, mul=1, add=0 })`

> Generates random values at a rate given by the nearest integer division of the sample rate by the freq argument.

### LFNoise1 — Ramp noise
- `LFNoise1.ar({ freq=500, mul=1, add=0 })`
- `LFNoise1.kr({ freq=500, mul=1, add=0 })`

> Generates linearly interpolated random values at a rate given by the nearest integer division of the sample rate by the freq argument.

### LFNoise2 — Quadratic noise.
- `LFNoise2.ar({ freq=500, mul=1, add=0 })`
- `LFNoise2.kr({ freq=500, mul=1, add=0 })`

> Generates quadratically interpolated random values at a rate given by the nearest integer division of the sample rate by the freq argument. quadratic interpolation means that the noise values can occasionally extend beyond the normal range of +-1, if the freq varies in certain ways. If this is undesirable then you might like to clip2 the values, or use a linearly-interpolating unit instead. ::

### PinkNoise — Pink Noise.
- `PinkNoise.ar({ mul=1, add=0 })`
- `PinkNoise.kr({ mul=1, add=0 })`

> Generates noise whose spectrum falls off in power by 3 dB per octave, which gives equal power over the span of each octave. This version is band-limited to 8 octaves. Internally, this UGen calculates its output by means of the Voss-McCartney algorithm. link::http://www.firstpr.com.au/dsp/pink-noise/allan-2/spectrum2.html:: The values produced by this UGen were observed to lie with very high probability between approximately -0.65 and +0.81 (before being multiplied by mul). The signal's RMS is approximately -16 dB. ::

### RandID — Set the synth's random generator ID.
- `RandID.kr({ id=0 })`
- `RandID.ir({ id=0 })`

> Choose which random number generator to use for this synth. All synths that use the same generator reproduce the same sequence of numbers when the same seed is set again.

### RandSeed — Sets the synth's random generator seed.
- `RandSeed.ar({ trig=0, seed=56789 })`
- `RandSeed.kr({ trig=0, seed=56789 })`
- `RandSeed.ir({ trig=0, seed=56789 })`

> When the trigger signal changes from nonpositive to positive, the synth's random generator seed is reset to the given value. All synths that use the same random number generator reproduce the same sequence of numbers again. See RandID UGen for setting the randgen id and randomSeed for the client side equivalent.

### WhiteNoise — White noise.
- `WhiteNoise.ar({ mul=1, add=0 })`
- `WhiteNoise.kr({ mul=1, add=0 })`

> Generates noise whose spectrum has equal power at all frequencies.
