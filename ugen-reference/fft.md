# FFT

_48 UGens. Generated from SuperCollider help files — do not edit by hand._

### Convolution — Real-time convolver.
- `Convolution.ar({ in, kernel, framesize=512, mul=1, add=0 })`

> Strict convolution of two continuously changing inputs. Also see Convolution2 for a cheaper CPU cost alternative for the case of a fixed kernel which can be changed with a trigger message. See also link::http://www.dspguide.com/ch18.htm:: by Steven W. Smith.

### Convolution2 — Real-time fixed kernel convolver.
- `Convolution2.ar({ in, kernel, trigger=0, framesize=2048, mul=1, add=0 })`

> Strict convolution with fixed kernel which can be updated using a trigger signal. Internally, this unit uses FFT to accelerate the calculation, which means that (a) you must specify a "framesize", and (b) if the kernel is longer than this framesize, the end of it will be ignored. See also link::http://www.dspguide.com/ch18.htm:: by Steven W. Smith.

### Convolution2L — Real-time convolver with linear interpolation
- `Convolution2L.ar({ in, kernel, trigger=0, framesize=2048, crossfade=1, mul=1, add=0 })`

> Strict convolution with fixed kernel which can be updated using a trigger signal. There is a linear crossfade between the buffers upon change. See Steven W Smith, The Scientist and Engineer's Guide to Digital Signal Processing: chapter 18 - http://www.dspguide.com/ch18.htm

### FFT — Fast Fourier Transform
- `FFT.new({ buffer, in=0, hop=0.5, wintype=0, active=1, winsize=0 })`

> Accumulates incoming audio into overlapping frames of power-of-two size, applies a window (rectangular=-1, sine=0, Hann=1), and writes the complex spectrum into a mono buffer for in-place manipulation by PV UGens before IFFT reconstruction. The hop parameter sets frame advance as a fraction of buffer size (default 0.5 = 50% overlap); output is a kr-rate chain signal, not audio. For phase-vocoder use, the doc recommends sine windowing (default) at hop 0.5; changing either hop or wintype from their defaults will typically cause windowing artifacts on resynthesis (a hop of 0.25 with Hann windowing is noted as a useful alternative). Zero-padding is supported by setting winsize smaller than buffer size (both must be powers of two).

### FFTTrigger — Outputs the necessary signal for FFT chains, without doing an FFT on a signal
- `FFTTrigger.new({ buffer, hop=0.5, polar=0 })`

> Emits a periodic trigger signal for the FFT chain bus without performing any FFT: the output is -1 every control-rate block except once per hop period, when it outputs the buffer number (signaling downstream UGens such as PackFFT/IFFT to process the buffer). The trigger period is computed as `m_numPeriods = floor((bufSize * hop) / blockSize) - 1` control blocks, so the trigger fires every `bufSize * hop` samples. On the trigger block `m_pos` is reset to 0 and `m_periodsRemain` reloaded; in all other blocks only the decrement occurs, costing essentially nothing. The `polar` argument is applied once at construction by setting `buf->coord` to `coord_Polar` or `coord_Complex` and is never re-evaluated, so changing it at runtime has no effect; mismatching this flag with what PackFFT writes will silently corrupt the spectral data passed to IFFT.

### IFFT — Inverse Fast Fourier Transform
- `IFFT.ar({ buffer, wintype=0, winsize=0 })`
- `IFFT.kr({ buffer, wintype=0, winsize=0 })`
- `IFFT.new({ buffer, wintype=0, winsize=0 })`

> The inverse fast fourier transform converts from frequency content to a signal. The fast fourier transform analyzes the frequency content of a signal. The IFFT UGen converts this frequency-domain information back into time-domain audio data. Most often this is used as the end of a process which begins with FFT, followed by frequency-domain processing using PV (phase-vocoder) UGens, followed by IFFT.

### PackFFT — Pack separate demand-rate FFT bin streams into an FFT chain buffer
- `PackFFT.new({ chain, bufsize, magsphases, frombin=0, tobin, zeroothers=0 })`

> Takes an array of magnitudes and phases, and packs them into an FFT buffer ready for transforming back into time-domain audio using IFFT. Most people won't need to use this directly - instead, use pvcollect, pvcalc, or pvcalc2 methods from the PV_ChainUGen base class.

### PartConv — Real-time partitioned convolution
- `PartConv.ar({ in, fftsize, irbufnum, mul=1, add=0 })`

> Partitioned convolution. Various additional buffers must be supplied. Mono impulse response only! If inputting multiple channels, you'll need independent PartConvs, one for each channel. But the charm is: impulse response can be as large as you like (CPU load increases with IR size. Various tradeoffs based on fftsize choice, due to rarer but larger FFTs. This plug-in uses amortisation to spread processing and avoid spikes). Normalisation factors difficult to anticipate; convolution piles up multiple copies of the input on top of itself, so can easily overload.

### PV_Add — Complex addition.
- `PV_Add.new({ bufferA, bufferB })`

> Performs bin-wise complex addition of two FFT frames directly in rectangular (real/imaginary) form — no polar conversion — operating on buf1 in-place: real_out[k] = real_A[k] + real_B[k], imag_out[k] = imag_A[k] + imag_B[k], with dc and nyq bins handled as scalar reals. Because addition in the complex domain corresponds to linear superposition of spectra, the result is identical to mixing the two time-domain signals before analysis, so it yields no novel spectral interaction; however, applied post-FFT it allows mixing processed chains independently before IFFT. Magnitude and phase at each bin depend on the vector sum, so bins where the two signals are near phase-opposition cancel, making phase coherence between the two chains the dominant behavioral variable — unrelated or asynchronously windowed sources will exhibit frame-to-frame phase variation that produces comb-like amplitude fluctuation after IFFT. No stability concerns; no feedback path.

### PV_BinScramble — Scramble bins.
- `PV_BinScramble.new({ buffer, wipe=0, width=0.2, trig=0 })`

> Each trigger fires a Fisher-Yates shuffle producing destination-index array to[] over all bins, then for each destination k = to[i], a source index from[i] is drawn uniformly from [max(0, k − width), min(N−1, k + width)] where width = floor(param * N), so the width parameter directly constrains spectral locality. At render time, wipe determines scrambleBins = floor(N * wipe): bins j < scrambleBins are remapped via q[to[j]] = p[from[j]], while bins j >= scrambleBins copy identity as q[to[j]] = p[to[j]], meaning even the "unscrambled" portion is permuted through to[] unless wipe == 1. DC and Nyquist are always passed through unmodified. If FFT buffer size changes mid-stream, that frame is silently skipped; arrays are allocated and first shuffle run on the first processed frame, not at construction.

### PV_BinShift — Shift and stretch bin position.
- `PV_BinShift.new({ buffer, stretch=1, shift=0, interp=0 })`

> Remaps each input FFT bin i to output position fpos = shift + i*stretch, writing the complex bin value there (zeroing unused output bins first). Without interpolation, fpos is rounded to the nearest integer bin; with interp=1, the complex value is linearly split between floor(fpos) and floor(fpos)+1 with weights (1-beta) and beta where beta = fpos - floor(fpos), allowing multiple source bins to accumulate into the same destination. Bins mapping outside [0, numbins) are silently discarded, DC and Nyquist are copied verbatim. Stretch > 1 expands the spectrum (pitch-scales up, losing high bins past Nyquist); stretch < 1 compresses it toward DC; non-integer shift adds a linear frequency offset in bin units (one bin = sampleRate/FFTSize Hz); combining both simultaneously produces an affine frequency warp that is NOT a phase-coherent pitch shift.

### PV_BinWipe — Combine low and high bins from two inputs.
- `PV_BinWipe.new({ bufferA, bufferB, wipe=0 })`

> Performs a hard spectral crossfade by replacing complex FFT bins in bufA with those from bufB. The integer wipe count is computed as (int)(wipe * numbins) — C truncation toward zero, not floor — clamped to [-numbins, numbins]. When wipe > 0, DC plus the bottom `wipe` complex bins [0..wipe-1] are overwritten from bufB (nyquist copied only when wipe == numbins). When wipe < 0, the top |wipe| complex bins [numbins+wipe..numbins-1] and nyquist are always overwritten from bufB (DC copied only when wipe == -numbins). At wipe==0 the output is identical to bufA; the transition is a sharp bin-boundary cut, so spectral discontinuities at the wipe boundary are expected. The operation works directly on bufA's complex (not polar) data in place.

### PV_BrickWall — Zero bins.
- `PV_BrickWall.new({ buffer, wipe=0 })`

> Operates per FFT frame by zeroing a contiguous range of complex spectral bins in-place. The integer bin count is computed as `(int)(wipe * numbins)` (C truncation toward zero, not floor — these differ for negative wipe); for wipe > 0 (highpass), DC and bins [0, count) are zeroed, with Nyquist also cleared only when count reaches numbins; for wipe < 0 (lowpass), bins from index (numbins + count) to numbins-1 are zeroed, Nyquist is always cleared, and DC only when the full range is wiped (wipe == -1). Cutoff is hard (rectangular window in frequency domain = sinc ringing in time domain after IFFT). Because wipe is re-evaluated each FFT hop, fast modulation causes per-frame discontinuities with no smoothing or interpolation between frames.

### PV_ConformalMap — Complex plane attack.
- `PV_ConformalMap.new({ buffer, areal=0, aimag=0 })`

> Applies the conformal mapping z → (z - a) / (1 - za*) to the phase vocoder bins z with a given by the real and imag inputs to the UGen. Makes a transformation of the complex plane so the output is full of phase vocoder artifacts but may be musically fun. Usually keep |a| < 1 but you can of course try bigger values to make it really noisy. a = 0 should give back the input mostly unperturbed. See link::http://mathworld.wolfram.com/ConformalMapping.html:: .

### PV_Conj — Complex conjugate
- `PV_Conj.new({ buffer })`

> Converts the FFT frames to their complex conjugate (i.e. reverses the sign of their imaginary part). This is not usually a useful audio effect in itself, but may be a component of other analysis or transformation processes...

### PV_Copy — Copy an FFT buffer
- `PV_Copy.new({ bufferA, bufferB })`

> Copies the spectral frame in bufferA to bufferB. This allows for parallel processing of spectral data without the need for multiple FFT UGens. Further it allows to extract data at a given point in the FFT chain e.g. for monitoring purposes. As of SC 3.7 instances of PV_Copy are added automatically where necessary for parallel processing. Please see FFT-Overview for the current implementation. This document is provided for legacy purposes only. Existing code explicitly using PV_Copy should continue to work.::

### PV_CopyPhase — Copy magnitudes and phases.
- `PV_CopyPhase.new({ bufferA, bufferB })`

> Operates per FFT frame on bufferA's polar representation in-place: for each non-DC/Nyquist bin, magnitude is taken from bufferA and phase is replaced wholesale with bufferB's phase (p->bin[i].mag unchanged, p->bin[i].phase = q->bin[i].phase). Both buffers are converted via ToPolarApx (LUT-based approximate polar, not exact hypot/atan2), introducing a small magnitude approximation. For the real-only DC and Nyquist bins, the implementation negates bufferA's value when its sign disagrees with bufferB's (aligning polarity). The output buffer is bufferA (buf1); bufferB is read but not written.

### PV_Diffuser — Random phase shifting.
- `PV_Diffuser.new({ buffer, trig=0 })`

> Adds a different constant random phase shift to each bin. When triggered, it selects a new set of random phases.

### PV_Div — Complex division
- `PV_Div.new({ bufferA, bufferB })`

> Performs bin-wise complex division of bufA by bufB, writing results back into bufA. For each non-DC/Nyquist bin, the result is computed as true complex division: re_out = (re_A * re_B + im_A * im_B) / |B|^2, im_out = (im_A * re_B - re_A * im_B) / |B|^2, where |B|^2 = re_B^2 + im_B^2 (no hypot call — raw sum-of-squares). DC and Nyquist are divided as reals. No zero-guard is applied to the denominator magnitude, so near-zero bins in bufB produce ±Inf or NaN, which will silently corrupt subsequent PV processing; callers must pre-condition bufB (e.g., add a small epsilon) if spectral nulls are possible.

### PV_HainsworthFoote — FFT onset detector.
- `PV_HainsworthFoote.ar({ buffer, proph=0, propf=0, threshold=1, waittime=0.04 })`

> FFT onset detector based on work described in Hainsworth, S. (2003) Techniques for the Automated Analysis of Musical Audio. PhD, University of Cambridge engineering dept. See especially p128. The Hainsworth metric is a modification of the Kullback Liebler distance. The onset detector has general ability to spot spectral change, so may have some ability to track chord changes aside from obvious transient jolts, but there's no guarantee it won't be confused by frequency modulation artifacts. Hainsworth metric on it's own gives good results but Foote might be useful in some situations: experimental.

### PV_JensenAndersen — FFT feature detector for onset detection.
- `PV_JensenAndersen.ar({ buffer, propsc=0.25, prophfe=0.25, prophfc=0.25, propsf=0.25, threshold=1, waittime=0.04 })`

> FFT feature detector for onset detection based on work described in Jensen, K. & Andersen, T. H. (2003). Real-time Beat Estimation Using Feature Extraction. In Proceedings of the Computer Music Modeling and Retrieval Symposium, Lecture Notes in Computer Science. Springer Verlag. First order derivatives of the features are taken. threshold may need to be set low to pick up on changes.

### PV_LocalMax — Pass bins which are a local maximum.
- `PV_LocalMax.new({ buffer, threshold=0 })`

> Operates on each FFT frame in polar-approximate form (ToPolarApx): a bin survives if its magnitude is >= the scalar threshold AND >= both immediate neighbors (using strict < in the comparison, so equal neighbors do not cause zeroing). Bins that fail either test have only their magnitude zeroed, leaving phase untouched. DC is compared against threshold and bin[0].mag (via std::abs(p->dc)); Nyquist is compared against threshold and the last regular bin's magnitude (via std::abs(p->nyq)). The result is a sparse spectral frame retaining local magnitude peaks above threshold; a plateau of equal-magnitude adjacent bins all survive since the neighbor comparison is < (not <=).

### PV_MagAbove — Pass bins above a threshold.
- `PV_MagAbove.new({ buffer, threshold=0 })`

> Operates on the approximate polar form of the FFT frame (ToPolarApx — LUT-based magnitude approximation, not exact hypot). For every bin including DC and Nyquist, if mag < threshold the magnitude is set to 0.0 while the phase is left untouched; bins at or above threshold pass through unmodified. This is a hard spectral gate with no interpolation or fade, so sweeping the threshold produces discontinuous amplitude jumps at frame boundaries. Threshold is sampled once per FFT frame (ZIN0), so modulating it at audio rate has no effect — changes only take hold on the next hop boundary.

### PV_MagBelow — Pass bins below a threshold.
- `PV_MagBelow.new({ buffer, threshold=0 })`

> Operates per FFT frame in approximate polar form (ToPolarApx): for each bin, if mag > threshold, mag is zeroed; otherwise the bin passes through unchanged. The DC and Nyquist real components are treated as magnitudes directly (|dc| > thresh → dc = 0, same for nyq). The threshold is sampled once per FFT frame (ZIN0), so modulating it at audio rate has no effect within a frame. Because zeroing is hard (not a smooth taper), the filter has a binary pass/reject characteristic with no frequency-selectivity — it retains only the spectral residue below the amplitude floor, useful for isolating noise or low-level partials.

### PV_MagClip — Clip bins to a threshold.
- `PV_MagClip.new({ buffer, threshold=0 })`

> Converts each FFT frame to approximate polar form (ToPolarApx), then hard-clamps every bin's magnitude: bin[i].mag = min(bin[i].mag, thresh), leaving phase untouched. DC and Nyquist real bins receive a signed clamp — sign(x)*thresh when |x|>thresh — preserving polarity. Because only magnitudes are bounded, dominant partials are attenuated to the ceiling while quieter bins pass through unchanged, producing spectral flattening/brightening at low thresholds. No cross-bin coupling, no feedback; ToPolarApx is a fast approximation, so clipping acts on approximate (not exact) magnitudes.

### PV_MagDiv — Division of magnitudes
- `PV_MagDiv.new({ bufferA, bufferB, zeroed=0.0001 })`

> Performs per-bin spectral division in polar-approximate form: for each FFT bin i, output magnitude = magA[i] / max(magB[i], zeroed), with DC and Nyquist bins handled identically; phases are taken unchanged from bufferA. The zeroed parameter (default 0.0001) acts as a floor on the denominator, preventing division-by-zero rather than clamping the output ratio — so with a near-silent bufferB and a small zeroed value, output magnitudes can blow up dramatically (reciprocal of the floor). Because ToPolarApx uses a fast magnitude approximation, the division is approximate; exact magnitude fidelity is not guaranteed. Phase incoherence between bufferA and bufferB introduces no artifact here since only bufferA phases are retained.

### PV_MagFreeze — Freeze magnitudes.
- `PV_MagFreeze.new({ buffer, freeze=0 })`

> Operates per FFT frame in polar-approximate form (ToPolarApx). When freeze > 0, every bin magnitude plus the DC and Nyquist scalars are replaced by a snapshot from the most recent unfrozen frame; phases are left untouched, so the live phase accumulation continues rotating, producing smearing/vibrato rather than a true static freeze. On the first processed frame, freeze is forced to 0 (m_mags is null, allocated lazily), ensuring the magnitude buffer is populated before any frozen read. If numbins changes between frames (e.g. FFT buffer resize), the function returns early and skips processing regardless of freeze state — output stalls until the bin count matches again.

### PV_MagMul — Multiply magnitudes.
- `PV_MagMul.new({ bufferA, bufferB })`

> Converts both FFT buffers to approximate polar form (ToPolarApx) each analysis frame, then multiplies magnitudes bin-by-bin — including the DC and Nyquist real terms — writing results back into bufA while leaving bufA's phases entirely untouched. Effectively: |A'[k]| = |A[k]| * |B[k]|, phase[k] = phase_A[k]. Because ToPolarApx is used (not exact polar conversion), there is a small approximation error in the magnitude extraction, but it is symmetric across both buffers and negligible for most audio use. No division or clamping is applied, so if bufB magnitudes are large the product is unbounded; callers must scale outputs to avoid overflow before IFFT reconstruction.

### PV_MagNoise — Multiply magnitudes by noise.
- `PV_MagNoise.new({ buffer })`

> Each FFT frame, every bin's magnitude (and dc/nyq scalars) is multiplied by an independent uniform random scalar drawn from [-1, +1). In polar-coordinate buffers only the magnitude is touched, leaving phase intact; in complex-coordinate buffers the same scalar multiplies both real and imaginary parts, so a negative draw also flips the bin's phase by pi — a non-obvious side effect that adds phase randomisation on top of spectral smearing. The noise is i.i.d. per bin per hop, producing a spectrally diffuse, noise-modulated output whose long-term average power is reduced to one-third of the input (E[r^2] = 1/3 for U[-1,1]).

### PV_MagShift — shift and stretch magnitude bin position.
- `PV_MagShift.new({ buffer, stretch=1, shift=0 })`

> Shift and stretch the positions of only the magnitude of the bins. Can be used as a very crude frequency shifter/scaler.

### PV_MagSmear — Average magnitudes across bins.
- `PV_MagSmear.new({ buffer, bins=0 })`

> Applies a uniform rectangular (boxcar) averaging kernel to FFT bin magnitudes while leaving phases untouched. For each bin j with integer half-width W (clipped to [0, numbins-1]), the output magnitude is (1/(2W+1)) * sum of p[j-W..j+W].mag, with out-of-range bins excluded from the sum but the divisor staying fixed at (2W+1) — so boundary bins near DC and Nyquist are attenuated rather than renormalized. DC and Nyquist scalar values are passed through unchanged. Smearing is applied once per FFT frame from a temporary buffer, so there is no cross-frame accumulation — purely intra-frame spatial smoothing that spreads spectral energy into neighboring bins, blurring sharp peaks and raising the noise floor between harmonics without any phase modification.

### PV_MagSquared — Square magnitudes.
- `PV_MagSquared.new({ buffer })`

> Operates on the polar-approximation form of the FFT buffer (ToPolarApx), replacing every bin's magnitude with its square: mag[i] = mag[i]^2, and squaring DC and Nyquist real components directly (p->dc * p->dc, p->nyq * p->nyq); phases are untouched. No renormalization is performed in PV_MagSquared_next — the help-doc claim of "renormalizes to previous peak" is absent from the source. Squaring expands the dynamic range contrast in the spectral domain: weak bins (mag << 1) are driven strongly toward zero while bins near 1 are barely attenuated, yielding a spectral sharpening / noise-gating effect. Output energy grows if any bin's magnitude exceeds 1.0 (squaring amplifies values > 1), so upstream gain staging is critical to avoid spectral blowup.

### PV_Max — Maximum magnitude.
- `PV_Max.new({ bufferA, bufferB })`

> Compares two FFT frames bin-by-bin in approximate polar form (ToPolarApx) and retains, for each bin, whichever complex value has the greater magnitude; the winner's full complex bin (both mag and phase) is written to bufferA, discarding the other. DC and Nyquist are handled separately by absolute-value comparison of their real scalars. Because phase is dragged wholesale from the dominant frame, the output spectrum's phase coherence tracks whichever source is louder per bin per FFT hop, producing discontinuous phase across hops when the dominant source alternates — expect transient smearing in IFFT reconstruction. No smoothing or hysteresis is applied, so rapid alternation between sources at similar magnitudes yields maximum per-hop instability.

### PV_Min — Minimum magnitude.
- `PV_Min.new({ bufferA, bufferB })`

> Operates per-FFT-frame in approximate polar form (ToPolarApx): for each spectral bin i, if magB[i] < magA[i], the entire polar bin — both magnitude and phase — is copied from bufB into bufA; otherwise bufA's bin is retained unchanged. DC and Nyquist are real scalars only (no phase), compared by absolute value, and the smaller scalar replaces the larger — there is no phase to carry for these bins. Because the winning bin's phase is carried wholesale for regular bins, the output phase is a hard switch rather than a blend, so combining two sources with very different phase relationships can produce abrupt timbral artifacts. The result is written in-place to bufA's buffer, leaving bufB unmodified; bufA is the output chain handle.

### PV_Mul — Complex multiply.
- `PV_Mul.new({ bufferA, bufferB })`

> Performs per-bin complex multiplication of two FFT frames in-place into bufferA. DC and Nyquist bins are real scalars multiplied directly (dc_A *= dc_B, nyq_A *= nyq_B). Each complex bin uses a 3-multiply Karatsuba form: real_out = Re_A*Re_B - Im_A*Im_B, imag_out = (Re_A+Im_A)*(Re_B+Im_B) - Re_A*Re_B - Im_A*Im_B. This is circular convolution of the two time-domain signals, so output magnitude = |A||B| and phase = arg(A)+arg(B) at each bin.

### PV_PhaseShift — Shift phase.
- `PV_PhaseShift.new({ buffer, shift, integrate=0 })`

> Operates in the polar-approximate domain (ToPolarApx), adding a single scalar `shift` (radians) to every spectral bin's phase each FFT frame, leaving magnitudes untouched. With integrate=0, the same offset is applied independently each frame — a static uniform-phase rotation with no temporal accumulation. With integrate>0, `shift` is accumulated into a running sum (wrapped via fmod mod 2π each frame) and the accumulated value is applied to all bins, so total phase grows linearly at `shift` radians per hop.

### PV_PhaseShift270 — Shift phase by 270 degrees.
- `PV_PhaseShift270.new({ buffer })`

> Rotates every FFT bin by 270° (-90°) via exact complex multiplication by -j: for each bin (a + jb), the output is (b - ja), implemented as `real = imag; imag = -real` (old real). This is the discrete Hilbert-transform complement to PV_PhaseShift90, and together they form a quadrature pair. Operation is exact (no polar conversion, no approximation), parameter-free, and has no stability edge-cases; DC and Nyquist bins in the SCComplexApx layout are not explicitly treated, so their behavior follows whatever values occupy those slots after `ToComplexApx`.

### PV_PhaseShift90 — Shift phase by 90 degrees.
- `PV_PhaseShift90.new({ buffer })`

> Applies a uniform +90° phase rotation to every FFT bin via the complex swap (re, im) → (−im, re), equivalent to multiplying each bin by j (e^{jπ/2}). This is lossless and magnitude-preserving: no bin's amplitude changes, only its phase. The transform is applied identically to all bins (including DC and Nyquist) regardless of frequency — it is not a true Hilbert transform, which would require frequency-dependent handling of positive vs. negative frequency bins. No parameters; the only operational constraint is that the FFT buffer must be valid at each control-rate trigger.

### PV_RandComb — Pass random bins.
- `PV_RandComb.new({ buffer, wipe=0, trig=0 })`

> Operates on the FFT complex bins each hop: on first hop (or a rising trigger edge) a random shuffle is run over the numbins bins — iterating i from 0 to numbins-1 and swapping m_ordering[i] with a randomly chosen index j in [0, numbins-i-1] — producing a permutation stored in m_ordering[]. Each hop, n = clip(int(wipe * numbins), 0, numbins) bins are zeroed (both real and imaginary) by indexing that permuted list in order, so wipe sweeps a deterministic-but-randomly-sequenced comb of nulled bins from 0% to 100% of the spectrum. DC and Nyquist are excluded from the shuffle and only forced to zero when n reaches numbins exactly. Triggering mid-wipe re-shuffles without resetting n, so zeroed-bin density is preserved but spectral positions change discontinuously.

### PV_RandWipe — Crossfade in random bin order.
- `PV_RandWipe.new({ bufferA, bufferB, wipe=0, trig=0 })`

> Each FFT frame, a random permutation of bin indices is computed (the shuffle picks j in [0, numbins-i) each iteration — not a standard Fisher-Yates); `wipe`, scaled to `n = sc_clip(floor(wipe * numbins), 0, numbins)`, selects the first n entries. For each selected bin index k, the complex bin (magnitude and phase) from bufferB is written directly into the corresponding bin of bufferA with no interpolation — hard per-bin replacement. The output is bufferA modified in-place. A positive-going edge on `trig` re-shuffles the permutation; without a trigger the ordering is frozen (a buffer-size change silently no-ops that frame).

### PV_RectComb — Make gaps in spectrum.
- `PV_RectComb.new({ buffer, numTeeth=0, phase=0, width=0.5 })`

> Each FFT frame, a rectangular comb mask is swept across the numbins+2 spectral slots (DC, bins 0..numbins-1, Nyquist) by accumulating a normalized frequency step freq = numTeeth / (numbins+1) per slot, starting at the user-supplied phase (range 0..1, wrapping modulo 1). Any slot whose running phase strictly exceeds width has its value zeroed; slots where phase <= width are passed unchanged. The result is numTeeth evenly spaced passbands per spectrum, each occupying a fraction width of the total bandwidth. Because phase and width are plain floats re-read every FFT hop, the comb pattern can shift continuously mid-frame with no interpolation, causing abrupt spectral jumps at hop boundaries; width >= 1.0 passes all bins while width < 0.0 zeros all bins (at width = 0.0, a slot with phase exactly 0.0 still passes).

### PV_RectComb2 — Make gaps in spectrum.
- `PV_RectComb2.new({ bufferA, bufferB, numTeeth=0, phase=0, width=0.5 })`

> Performs a rectangular spectral interleave between two FFT buffers, writing the result into bufferA. DC, each bin, then Nyquist are each tested: if the running phase (starting at user-supplied `phase`, incrementing by `freq = numTeeth / (numbins + 1)` per bin, wrapping modulo 1) exceeds `width`, that bin is taken from bufferB, otherwise bufferA's value is kept. The phase cursor is read fresh from control-rate inputs each FFT frame — no state accumulates across frames.

### SpecCentroid — Spectral centroid
- `SpecCentroid.kr({ buffer })`

> Given an FFT chain, this measures the spectral centroid, which is the weighted mean frequency, or the "centre of mass" of the spectrum. (DC is ignored.) This can be a useful indicator of the perceptual brightness of a signal.

### SpecFlatness — Spectral Flatness measure
- `SpecFlatness.kr({ buffer })`

> Given an FFT chain this calculates the Spectral Flatness measure, defined as a power spectrum's geometric mean divided by its arithmetic mean. This gives a measure which ranges from approx 0 for a pure sinusoid, to approx 1 for white noise. The measure is calculated linearly. For some applications you may wish to convert the value to a decibel scale - an example of such conversion is shown below.

### SpecPcile — Find a percentile of FFT magnitude spectrum
- `SpecPcile.kr({ buffer, fraction=0.5, interpolate=0, binout=0 })`

> Operates on an FFT chain (kr rate): accumulates a cumulative distribution function over bin magnitudes from DC to Nyquist, then finds the bin index where the CDF first meets or exceeds the target fraction (0–1). Output is that bin's center frequency in Hz (or raw bin index if binout=1). With interpolate=1, linear interpolation on the bin number refines the estimate at modest CPU cost. Useful as a spectral roll-off detector (e.g. fraction=0.9 gives the frequency below which 90% of spectral energy sits).

### StereoConvolution2L — Stereo real-time convolver with linear interpolation
- `StereoConvolution2L.ar({ in, kernelL, kernelR, trigger=0, framesize=2048, crossfade=1, mul=1, add=0 })`

> Strict convolution with fixed kernel which can be updated using a trigger signal. There is a linear crossfade between the buffers upon change. Like Convolution2L, but convolves with two buffers and outputs a stereo signal. This saves one FFT transformation per period, as compared to using two copies of Convolution2L. Useful applications could include stereo reverberation or HRTF convolution. See Steven W Smith, The Scientist and Engineer's Guide to Digital Signal Processing, chapter 18: link::http://www.dspguide.com/ch18.htm::

### Unpack1FFT — Unpack a single value (magnitude or phase) from an FFT chain
- `Unpack1FFT.new({ chain, bufsize, binindex, whichmeasure=0 })`

> Takes an FFT chain and extracts a single scalar value as a demand-rate stream. To call it, a "demander" is needed, which fires whenever the FFT chain fires - this is normally achieved using PackFFT but can also be done using Demand. Note:: This UGen is commonly not used directly. Its main purpose is as a component in -pvcollect, -pvcalc, and -pvcalc2 processes. You're welcome to use it on its own - the example below shows how. ::

### UnpackFFT — Unpack an FFT chain into separate demand-rate FFT bin streams
- `UnpackFFT.new({ chain, bufsize, frombin=0, tobin })`

> Takes an FFT chain and separates the magnitude and phase data into separate demand-rate streams, for arithmetic manipulation etc. This is technically a demand-rate UGen. The actual "demand" is usually created by PackFFT later on in the graph, which requests the values in order to re-pack the data. This allows for processing to occur in between. See also -pvcollect, -pvcalc, and -pvcalc2, which provide convenient ways to process audio in the frequency domain. The help for pvcollect includes notes on efficiency considerations.
