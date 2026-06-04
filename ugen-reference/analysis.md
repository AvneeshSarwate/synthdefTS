# Analysis

_16 UGens. Generated from SuperCollider help files — do not edit by hand._

### BeatTrack — Autocorrelation beat tracker
- `BeatTrack.kr({ chain, lock=0 })`

> Operates on a 1024-bin FFT chain (44.1/48 kHz) using autocorrelation over a 6-second window to estimate tactus, emitting four k-rate outputs: quarter, eighth, sixteenth ticks, and tempo in BPM. Biased toward 100–120 BPM via internal weighting; detects tactus only, no meter. When lock > 0.5 the model still updates phase/period internally but the outputs are frozen; dropping lock below 0.5 releases the latest solution to output.

### BeatTrack2 — Template matching beat tracker
- `BeatTrack2.kr({ busindex, numfeatures, windowsize=2, phaseaccuracy=0.02, lock=0, weightingscheme })`

> Cross-correlates straight/swung-triplet 16th-note templates (60-180 bpm) every 0.5 s over a configurable window (default 2 s); outputs six k-rate signals: beattick, eighthtick, groovetick, tempo, phase, groove. Features enter via consecutive control buses; latency ~2.8 s (2.5 s base + 0.3 s block amortization, with consistency check adding 0.5 s to suppress wild tempo jumps). Lock > 0.5 freezes tick output at current phase/period while internal model continues updating; ticks resume from updated state when lock drops below 0.5.

### MFCC — Mel frequency cepstral coefficients
- `MFCC.kr({ chain, numcoeff=13 })`

> Takes a pre-computed FFT chain and maps spectral magnitude bins onto up to 42 Mel-scale triangular filterbanks (80 Hz–18 kHz, equally spaced in Mel: mel = 1127·ln(1 + f/700)), where each band uses linear triangular overlap weighting between consecutive peak centres. Band energies are then passed through a DCT (cosine basis cos(π/42·(n+0.5)·k), k=1..numcoeff) to produce decorrelated cepstral coefficients; the zeroth DCT coefficient is intentionally omitted. Outputs 1–42 coefficients (default 13), loosely normalised to 0–1 with coefficient 1 typically dominant; expects FFT size 1024 at 44.1/48 kHz or 2048 at 88.2/96 kHz for accurate Mel spacing.

### Onsets — Onset detector
- `Onsets.kr({ chain, threshold=0.5, odftype, relaxtime=1, floor=0.1, mingap=10, medianspan=11, whtype=1, rawodf=0 })`

> An onset detector for musical audio signals - detects the beginning of notes/drumbeats/etc. Outputs a control-rate trigger signal which is 1 when an onset is detected, and 0 otherwise. For more details of all the processes involved, the different onset detection functions, and their evaluation, see: D. Stowell and M. D. Plumbley. Adaptive whitening for improved real-time audio onset detection. Proceedings of the International Computer Music Conference (ICMC2007), Copenhagen, Denmark, August 2007. See http://c4dm.eecs.qmul.ac.uk/papers/2007/StowellPlumbley07-icmc.pdf

### RunningSum — Running sum over n frames
- `RunningSum.ar({ in, numsamp=40 })`
- `RunningSum.kr({ in, numsamp=40 })`

> Rectangular-window sliding sum over a `numsamp`-length circular buffer (init-only): each sample, the oldest entry is subtracted, the new input written in its place and added — giving y[n] = sum(x[n-numsamp+1..n]) at O(1) cost. A dual-accumulator (Ross Bencina): additions also accumulate in `sum2`; every `numsamp` samples the primary sum resets to `sum2` and `sum2` clears, bounding drift to one window's rounding. For RMS: `(RunningSum.ar(input.squared, n) / n).sqrt`.

### Slope — Slope of signal
- `Slope.ar({ in=0, mul=1, add=0 })`
- `Slope.kr({ in=0, mul=1, add=0 })`

> Measures the rate of change per second of a signal. Formula implemented is: out[i] = (in[i] - in[i-1]) * sampling_rate

## Analysis › Amplitude

### AmpComp — Basic psychoacoustic amplitude compensation.
- `AmpComp.ar({ freq, root, exp=0.3333 })`
- `AmpComp.kr({ freq, root, exp=0.3333 })`
- `AmpComp.ir({ freq, root, exp=0.3333 })`

> Implements the (optimized) formula: compensationFactor = (root / freq) ** exp Higher frequencies are normally perceived as louder, which AmpComp compensates.

### AmpCompA — Basic psychoacoustic amplitude compensation (ANSI A-weighting curve).
- `AmpCompA.ar({ freq=1000, root=0, minAmp=0.32, rootAmp=1 })`
- `AmpCompA.kr({ freq=1000, root=0, minAmp=0.32, rootAmp=1 })`
- `AmpCompA.ir({ freq=1000, root=0, minAmp=0.32, rootAmp=1 })`

> Higher frequencies are normally perceived as louder, which AmpCompA compensates. Following the measurements by Fletcher and Munson, the ANSI standard describes a function for loudness vs. frequency. Note that this curve is only valid for standardized amplitude. ( var k = 3.5041384e16; var c1 = 424.31867740601; var c2 = 11589.093052022; var c3 = 544440.67046057; var c4 = 148698928.24309; f = { |f| var r = squared(f); var m1 = pow(r, 4); var n1 = squared(c1 + r); var n2 = c2 + r; var n3 = c3 + r; var n4 = squared(c4 + r); var level = k * m1 / (n1 * n2 * n3 * n4); sqrt(level) }; ) :: :: For a simpler but more flexible curve, see AmpComp

### Amplitude — Amplitude follower
- `Amplitude.ar({ in=0, attackTime=0.01, releaseTime=0.01, mul=1, add=0 })`
- `Amplitude.kr({ in=0, attackTime=0.01, releaseTime=0.01, mul=1, add=0 })`

> Tracks the relative amplitude of a signal, using an envelope follower algorithm. An envelope follower converges toward rising amplitude according to attackTime, and toward falling amplitude according to releaseTime. See the plot under Examples.

### Loudness — Extraction of instantaneous loudness in sones
- `Loudness.kr({ chain, smask=0.25, tmask=1 })`

> A perceptual loudness function which outputs loudness in sones; this is a variant of an MP3 perceptual model, summing excitation in ERB bands. It models simple spectral and temporal masking, with equal loudness contour correction in ERB bands to obtain phons (relative dB), then a phon to sone transform. The final output is typically in the range of 0 to 64 sones, though higher values can occur with specific synthesised stimuli. Research note: This UGen is an informal juxtaposition of perceptual coding, and a Zwicker and Glasberg/Moore/Stone loudness model.::

### Peak — Track peak signal amplitude.
- `Peak.ar({ in=0, trig=0 })`
- `Peak.kr({ in=0, trig=0 })`

> Outputs the peak amplitude of the signal received at the input. When a trigger occurs at the reset input, the maximum output value is reset to the current value. The reported peak will always be positive, i.e. the absolute value of the signal at its peak amplitude, even when that peak is negative. To obtain the minimum and maximum values of the signal as is, use the RunningMin and RunningMax UGens.

### PeakFollower — Track peak signal amplitude.
- `PeakFollower.ar({ in=0, decay=0.999 })`
- `PeakFollower.kr({ in=0, decay=0.999 })`

> Outputs the peak amplitude of the signal received at the input. If level is below maximum, the level decreases by the factor given in decay . Internally, the absolute value of the signal is used, to prevent underreporting the peak value if there is a negative DC offset. To obtain the minimum and maximum values of the signal as is, use the RunningMin and RunningMax UGens.

### SendPeakRMS — Track peak and power of a signal for GUI applications.
- `SendPeakRMS.ar({ sig, replyRate=20, peakLag=3, cmdName, replyID=-1 })`
- `SendPeakRMS.kr({ sig, replyRate=20, peakLag=3, cmdName, replyID=-1 })`

> The SendPeakRMS unit generator computes peak and power of a signal and sends the computed values back to the clients. It does not produce any output.

## Analysis › Pitch

### KeyTrack — Key tracker
- `KeyTrack.kr({ chain, keydecay=2, chromaleak=0.5 })`

> A (12TET major/minor) key tracker based on a pitch class profile of energy across FFT bins and matching this to templates for major and minor scales in all transpositions. It assumes a 440 Hz concert A reference. Output is 0-11 C major to B major, 12-23 C minor to B minor.

### Pitch — Autocorrelation pitch follower
- `Pitch.kr({ in=0, initFreq=440, minFreq=60, maxFreq=4000, execFreq=100, maxBinsPerOctave=16, median=1, ampThreshold=0.01, peakThreshold=0.5, downSample=1, clar=0 })`

> This is a better pitch follower than ZeroCrossing, but more costly of CPU. For most purposes the default settings can be used and only in needs to be supplied. Pitch returns two values (via an Array of OutputProxys, see the OutputProxy help file), a freq which is the pitch estimate and hasFreq, which tells whether a pitch was found. Some vowels are still problematic, for instance a wide open mouth sound somewhere between a low pitched short 'a' sound as in 'sat', and long 'i' sound as in 'fire', contains enough overtone energy to confuse the algorithm.

### ZeroCrossing — Zero crossing frequency follower
- `ZeroCrossing.ar({ in=0 })`
- `ZeroCrossing.kr({ in=0 })`

> Outputs a frequency based upon the distance between interceptions of the X axis. The X intercepts are determined via linear interpolation so this gives better than just integer wavelength resolution. This is a very crude pitch follower, but can be useful in some situations.
