# SuperCollider UGen Reference (synthdefTS)

Signatures + one-line summaries for the 399 UGens exposed by synthdefTS, grouped by SuperCollider category. Summaries are lifted verbatim from the SC help files. **Generated — do not edit by hand.**

## How to call a UGen

Each UGen is an object with rate methods (`ar` audio, `kr` control, `ir` init, `new` demand). Every method takes a single **named-parameter object**; every parameter has a default, so you only pass what you change. Defaults are shown in each signature below.

```ts
import { synthDef, kr } from "../src/graph/builder.ts";
import { SinOsc, Out } from "../src/ugens/generated.ts";

const def = synthDef(
  "mySine",
  { freq: kr(440), amp: kr(0.3) },        // synth parameters
  (p) => {
    const sig = SinOsc.ar({ freq: p.freq, mul: p.amp });
    Out.ar({ bus: 0, channelsArray: sig });
  },
);
```

- Pass an **array** for any parameter to trigger multichannel expansion (returns an array of outputs).
- `mul` / `add` scale and offset the output (`signal * mul + add`).

## Categories

- [Generators](./generators.md) — 76
- [Filters](./filters.md) — 55
- [FFT](./fft.md) — 48
- [Buffer](./buffer.md) — 29
- [Demand](./demand.md) — 25
- [Delays](./delays.md) — 21
- [Info](./info.md) — 17
- [Triggers](./triggers.md) — 17
- [Analysis](./analysis.md) — 16
- [Multichannel](./multichannel.md) — 15
- [InOut](./inout.md) — 14
- [Maths](./maths.md) — 12
- [Random](./random.md) — 9
- [Synth control](./synth-control.md) — 8
- [User interaction](./user-interaction.md) — 7
- [Bela](./bela.md) — 7
- [Conversion](./conversion.md) — 5
- [Envelopes](./envelopes.md) — 5
- [Dynamics](./dynamics.md) — 4
- [Reverbs](./reverbs.md) — 3
- [Clock](./clock.md) — 3
- [Base](./base.md) — 2
- [Convolution](./convolution.md) — 1

## All UGens (A–Z)

| UGen | Category | Summary |
|---|---|---|
| [`A2K`](./conversion.md) | Conversion | Audio to control rate converter. |
| [`AccelerometerX`](./user-interaction.md) | User interaction | Accelerometer X-axis sensor input (device builds), scaled via minval/maxval/warp/lag. |
| [`AccelerometerY`](./user-interaction.md) | User interaction | Accelerometer Y-axis sensor input (device builds), scaled via minval/maxval/warp/lag. |
| [`AccelerometerZ`](./user-interaction.md) | User interaction | Accelerometer Z-axis sensor input (device builds), scaled via minval/maxval/warp/lag. |
| [`AllpassC`](./delays.md) | Delays | Schroeder allpass delay line with cubic interpolation. |
| [`AllpassL`](./delays.md) | Delays | Schroeder allpass delay line with linear interpolation. |
| [`AllpassN`](./delays.md) | Delays | Schroeder allpass delay line with no interpolation. |
| [`AmpComp`](./analysis.md) | Analysis | Basic psychoacoustic amplitude compensation. |
| [`AmpCompA`](./analysis.md) | Analysis | Basic psychoacoustic amplitude compensation (ANSI A-weighting curve). |
| [`Amplitude`](./analysis.md) | Analysis | Amplitude follower |
| [`AnalogIn`](./bela.md) | Bela | Read data from an analog input |
| [`AnalogOut`](./bela.md) | Bela | Write data to an analog output |
| [`APF`](./filters.md) | Filters | FIXME: APF purpose. |
| [`Balance2`](./multichannel.md) | Multichannel | Stereo signal balancer |
| [`Ball`](./filters.md) | Filters | physical model of bouncing object |
| [`BAllPass`](./filters.md) | Filters | All Pass Filter |
| [`BBandPass`](./filters.md) | Filters | Band Pass Filter |
| [`BBandStop`](./filters.md) | Filters | Band reject filter |
| [`BeatTrack`](./analysis.md) | Analysis | Autocorrelation beat tracker |
| [`BeatTrack2`](./analysis.md) | Analysis | Template matching beat tracker |
| [`BelaScopeOut`](./bela.md) | Bela | Bela's Oscilloscope interface |
| [`BHiPass`](./filters.md) | Filters | 12db/oct rolloff - 2nd order resonant  Hi Pass Filter |
| [`BHiShelf`](./filters.md) | Filters | Hi Shelf |
| [`BiPanB2`](./multichannel.md) | Multichannel | 2D Ambisonic B-format panner. |
| [`Blip`](./generators.md) | Generators | Band limited impulse oscillator. |
| [`BlockSize`](./info.md) | Info | Outputs the server's block size (samples per control-rate period). |
| [`BLowPass`](./filters.md) | Filters | 12db/oct rolloff - 2nd order resonant Low Pass Filter |
| [`BLowShelf`](./filters.md) | Filters | Low Shelf |
| [`BPeakEQ`](./filters.md) | Filters | Parametric equalizer |
| [`BPF`](./filters.md) | Filters | 2nd order Butterworth bandpass filter. |
| [`BPZ2`](./filters.md) | Filters | Two zero fixed midpass. |
| [`BRF`](./filters.md) | Filters | 2nd order Butterworth band reject filter. |
| [`BrownNoise`](./generators.md) | Generators | Brown Noise. |
| [`BRZ2`](./filters.md) | Filters | Two zero fixed midcut. |
| [`BufAllpassC`](./delays.md) | Delays | Buffer based all pass delay line with cubic interpolation. |
| [`BufAllpassL`](./delays.md) | Delays | Buffer based all pass delay line with linear interpolation. |
| [`BufAllpassN`](./delays.md) | Delays | Buffer based all pass delay line with no interpolation. |
| [`BufChannels`](./buffer.md) | Buffer | Current number of channels of soundfile in buffer. |
| [`BufCombC`](./delays.md) | Delays | Buffer based comb delay line with cubic interpolation. |
| [`BufCombL`](./delays.md) | Delays | Buffer based comb delay line with linear interpolation. |
| [`BufCombN`](./delays.md) | Delays | Buffer based comb delay line with no interpolation. |
| [`BufDelayC`](./delays.md) | Delays | Buffer based simple delay line with cubic interpolation. |
| [`BufDelayL`](./delays.md) | Delays | Buffer based simple delay line with linear interpolation. |
| [`BufDelayN`](./delays.md) | Delays | Buffer based simple delay line with no interpolation. |
| [`BufDur`](./buffer.md) | Buffer | Current duration of soundfile in buffer. |
| [`BufFrames`](./buffer.md) | Buffer | Current number of frames allocated in the buffer. |
| [`BufInfoUGenBase`](./base.md) | Base | Base class for buffer info ugens |
| [`BufRateScale`](./buffer.md) | Buffer | Buffer rate scaling in respect to server samplerate. |
| [`BufRd`](./buffer.md) | Buffer | Buffer reading oscillator. |
| [`BufSampleRate`](./buffer.md) | Buffer | Buffer sample rate. |
| [`BufSamples`](./buffer.md) | Buffer | Current number of samples in buffer. |
| [`BufWr`](./buffer.md) | Buffer | Buffer writing oscillator. |
| [`Changed`](./triggers.md) | Triggers | Triggers when a value changes |
| [`CheckBadValues`](./info.md) | Info | Test for infinity, not-a-number, and denormals |
| [`ClearBuf`](./buffer.md) | Buffer | Zeroes the contents of a buffer. |
| [`Clip`](./maths.md) | Maths | Clip a signal outside given thresholds. |
| [`ClipNoise`](./generators.md) | Generators | Clip Noise. |
| [`CoinGate`](./generators.md) | Generators | Statistical gate. |
| [`CombC`](./delays.md) | Delays | Comb delay line with cubic interpolation. |
| [`CombL`](./delays.md) | Delays | Comb delay line with linear interpolation. |
| [`CombN`](./delays.md) | Delays | Comb delay line with no interpolation. |
| [`Compander`](./dynamics.md) | Dynamics | Compressor, expander, limiter, gate, ducker |
| [`CompanderD`](./dynamics.md) | Dynamics | Compressor, expander, limiter, gate, ducker. |
| [`ControlDur`](./info.md) | Info | Duration of one block |
| [`ControlRate`](./info.md) | Info | Server control rate. |
| [`Convolution`](./fft.md) | FFT | Real-time convolver. |
| [`Convolution2`](./fft.md) | FFT | Real-time fixed kernel convolver. |
| [`Convolution2L`](./fft.md) | FFT | Real-time convolver with linear interpolation |
| [`Convolution3`](./convolution.md) | Convolution | Time based convolver. |
| [`COsc`](./generators.md) | Generators | Chorusing wavetable oscillator. |
| [`Crackle`](./generators.md) | Generators | Chaotic noise function. |
| [`CuspL`](./generators.md) | Generators | Cusp map chaotic generator |
| [`CuspN`](./generators.md) | Generators | Cusp map chaotic generator |
| [`Dbrown`](./demand.md) | Demand | Demand rate brownian movement generator. |
| [`Dbufrd`](./buffer.md) | Buffer | Buffer read demand ugen |
| [`Dbufwr`](./buffer.md) | Buffer | Buffer write demand ugen |
| [`DC`](./generators.md) | Generators | Create a constant amplitude signal |
| [`Dconst`](./demand.md) | Demand | Constrain a demand-rate stream to a given sum |
| [`Ddup`](./demand.md) | Demand | Demand rate input replicator |
| [`Decay`](./filters.md) | Filters | Exponential decay |
| [`Decay2`](./filters.md) | Filters | Exponential decay |
| [`DecodeB2`](./multichannel.md) | Multichannel | 2D Ambisonic B-format decoder. |
| [`DegreeToKey`](./conversion.md) | Conversion | Convert signal to modal pitch. |
| [`Delay1`](./delays.md) | Delays | Single sample delay. |
| [`Delay2`](./delays.md) | Delays | Two sample delay. |
| [`DelayC`](./delays.md) | Delays | Simple delay line with cubic interpolation. |
| [`DelayL`](./delays.md) | Delays | Simple delay line with linear interpolation. |
| [`DelayN`](./delays.md) | Delays | Simple delay line with no interpolation. |
| [`DelTapRd`](./buffer.md) | Buffer | Tap a delay line from a DelTapWr UGen |
| [`DelTapWr`](./buffer.md) | Buffer | Write to a buffer for a DelTapRd UGen |
| [`Demand`](./demand.md) | Demand | Demand results from demand rate UGens. |
| [`DemandEnvGen`](./demand.md) | Demand | Demand rate envelope generator |
| [`DetectIndex`](./buffer.md) | Buffer | Search a buffer for a value |
| [`DetectSilence`](./synth-control.md) | Synth control | Detect when input falls below an amplitude threshold |
| [`Dgeom`](./demand.md) | Demand | Demand rate geometric series UGen. |
| [`Dibrown`](./demand.md) | Demand | Demand rate brownian movement generator. |
| [`DigitalIn`](./bela.md) | Bela | Read data from a digital input |
| [`DigitalIO`](./bela.md) | Bela | Read or write data to a digital pin |
| [`DigitalOut`](./bela.md) | Bela | Write data to a digital output |
| [`DiskIn`](./inout.md) | InOut | Stream in audio from a file. |
| [`DiskOut`](./inout.md) | InOut | Record to a soundfile to disk. |
| [`Diwhite`](./demand.md) | Demand | Demand rate white noise random generator. |
| [`Done`](./synth-control.md) | Synth control | Monitors another UGen to see when it is finished |
| [`Dpoll`](./demand.md) | Demand | Print the current output value of a demand rate UGen |
| [`Drand`](./demand.md) | Demand | Demand rate random sequence generator. |
| [`Dreset`](./demand.md) | Demand | demand rate reset |
| [`Dseq`](./demand.md) | Demand | Demand rate sequence generator. |
| [`Dser`](./demand.md) | Demand | Demand rate sequence generator. |
| [`Dseries`](./demand.md) | Demand | Demand rate arithmetic series UGen. |
| [`Dshuf`](./demand.md) | Demand | Demand rate random sequence generator |
| [`Dstutter`](./demand.md) | Demand | Demand rate input replicator |
| [`Dswitch`](./demand.md) | Demand | Demand rate generator for embedding different inputs |
| [`Dswitch1`](./demand.md) | Demand | Demand rate generator for switching between inputs. |
| [`Dunique`](./demand.md) | Demand | Return the same unique series of values for several demand streams |
| [`Dust`](./generators.md) | Generators | Random impulses. |
| [`Dust2`](./generators.md) | Generators | Random impulses. |
| [`Duty`](./demand.md) | Demand | Demand results from demand rate UGens. |
| [`Dwhite`](./demand.md) | Demand | Demand rate white noise random generator. |
| [`Dwrand`](./demand.md) | Demand | Demand rate weighted random sequence generator |
| [`Dxrand`](./demand.md) | Demand | Demand rate random sequence generator. |
| [`DynKlang`](./generators.md) | Generators | Dynamic sine oscillator bank |
| [`DynKlank`](./generators.md) | Generators | Bank of resonators. |
| [`EnvGen`](./envelopes.md) | Envelopes | Envelope generator |
| [`ExpRand`](./random.md) | Random | Exponential single random number generator. |
| [`FBSineC`](./generators.md) | Generators | Feedback sine with chaotic phase indexing |
| [`FBSineL`](./generators.md) | Generators | Feedback sine with chaotic phase indexing |
| [`FBSineN`](./generators.md) | Generators | Feedback sine with chaotic phase indexing |
| [`FFT`](./fft.md) | FFT | Fast Fourier Transform |
| [`FFTTrigger`](./fft.md) | FFT | Outputs the necessary signal for FFT chains, without doing an FFT on a signal |
| [`Fold`](./maths.md) | Maths | Fold a signal outside given thresholds. |
| [`FoldIndex`](./buffer.md) | Buffer | Index into a table with a signal. |
| [`Formant`](./generators.md) | Generators | Formant oscillator |
| [`Formlet`](./filters.md) | Filters | FOF-like filter. |
| [`FOS`](./filters.md) | Filters | First order filter section. |
| [`Free`](./synth-control.md) | Synth control | When triggered, frees a node. |
| [`FreeSelf`](./synth-control.md) | Synth control | When triggered, free enclosing synth. |
| [`FreeSelfWhenDone`](./synth-control.md) | Synth control | Free the enclosing synth when a UGen is finished |
| [`FreeVerb`](./reverbs.md) | Reverbs | A reverb |
| [`FreeVerb2`](./reverbs.md) | Reverbs | A two-channel reverb |
| [`FreqShift`](./filters.md) | Filters | Frequency Shifter. |
| [`FSinOsc`](./generators.md) | Generators | Fast sine oscillator. |
| [`Gate`](./triggers.md) | Triggers | Gate or hold. |
| [`GbmanL`](./generators.md) | Generators | Gingerbreadman map chaotic generator |
| [`GbmanN`](./generators.md) | Generators | Gingerbreadman map chaotic generator |
| [`Gendy1`](./generators.md) | Generators | Dynamic stochastic synthesis generator. |
| [`Gendy2`](./generators.md) | Generators | Dynamic stochastic synthesis generator. |
| [`Gendy3`](./generators.md) | Generators | Dynamic stochastic synthesis generator. |
| [`GrainBuf`](./buffer.md) | Buffer | Granular synthesis with sound stored in a buffer |
| [`GrainFM`](./generators.md) | Generators | Granular synthesis with frequency modulated sine tones |
| [`GrainIn`](./generators.md) | Generators | Granulate an input signal |
| [`GrainSin`](./generators.md) | Generators | Granular synthesis with sine tones |
| [`GrayNoise`](./generators.md) | Generators | Bit-flipping Noise |
| [`GVerb`](./reverbs.md) | Reverbs | A two-channel reverb |
| [`Hasher`](./filters.md) | Filters | Scrambled value with a hash function. |
| [`HenonC`](./generators.md) | Generators | Henon map chaotic generator |
| [`HenonL`](./generators.md) | Generators | Henon map chaotic generator |
| [`HenonN`](./generators.md) | Generators | Henon map chaotic generator |
| [`Hilbert`](./filters.md) | Filters | Applies the Hilbert transform to an input signal. |
| [`HilbertFIR`](./filters.md) | Filters | Applies the Hilbert transform to an input signal. |
| [`HPF`](./filters.md) | Filters | 2nd order Butterworth highpass filter. |
| [`HPZ1`](./filters.md) | Filters | Two point difference filter |
| [`HPZ2`](./filters.md) | Filters | Two zero fixed midcut. |
| [`IEnvGen`](./envelopes.md) | Envelopes | Envelope generator for polling values from an Env |
| [`IFFT`](./fft.md) | FFT | Inverse Fast Fourier Transform |
| [`Impulse`](./generators.md) | Generators | Impulse oscillator. |
| [`In`](./inout.md) | InOut | Read a signal from a bus. |
| [`Index`](./buffer.md) | Buffer | Index into a table with a signal |
| [`IndexInBetween`](./buffer.md) | Buffer | Finds the (lowest) point in the Buffer at which the input signal lies in-between the two values |
| [`IndexL`](./buffer.md) | Buffer | Index into a table with a signal, linear interpolated |
| [`InFeedback`](./inout.md) | InOut | Read signal from a bus with a current or one cycle old timestamp. |
| [`InfoUGenBase`](./base.md) | Base | Base class for info ugens |
| [`InRange`](./maths.md) | Maths | Tests if a signal is within a given range. |
| [`InRect`](./maths.md) | Maths | Test if a point is within a given rectangle. |
| [`Integrator`](./filters.md) | Filters | A leaky integrator. |
| [`InTrig`](./inout.md) | InOut | Generate a trigger anytime a bus is set. |
| [`IRand`](./random.md) | Random | Single integer random number generator. |
| [`K2A`](./conversion.md) | Conversion | Control to audio rate converter. |
| [`KeyState`](./user-interaction.md) | User interaction | Respond to the state of a key |
| [`KeyTrack`](./analysis.md) | Analysis | Key tracker |
| [`Klang`](./generators.md) | Generators | Sine oscillator bank |
| [`Klank`](./generators.md) | Generators | Bank of resonators |
| [`Lag`](./filters.md) | Filters | Exponential lag |
| [`Lag2`](./filters.md) | Filters | Exponential lag |
| [`Lag2UD`](./filters.md) | Filters | Exponential lag |
| [`Lag3`](./filters.md) | Filters | Exponential lag |
| [`Lag3UD`](./filters.md) | Filters | Exponential lag |
| [`LagIn`](./inout.md) | InOut | Read a control signal from a bus with a lag |
| [`LagUD`](./filters.md) | Filters | Exponential lag |
| [`LastValue`](./triggers.md) | Triggers | Output the last value before the input changed |
| [`Latch`](./triggers.md) | Triggers | Sample and hold |
| [`LatoocarfianC`](./generators.md) | Generators | Latoocarfian chaotic generator |
| [`LatoocarfianL`](./generators.md) | Generators | Latoocarfian chaotic generator |
| [`LatoocarfianN`](./generators.md) | Generators | Latoocarfian chaotic generator |
| [`LeakDC`](./filters.md) | Filters | Remove DC |
| [`LeastChange`](./maths.md) | Maths | Output least changed |
| [`LFClipNoise`](./generators.md) | Generators | Clipped noise |
| [`LFCub`](./generators.md) | Generators | A sine like shape made of two cubic pieces |
| [`LFDClipNoise`](./generators.md) | Generators | Dynamic clipped noise |
| [`LFDNoise0`](./generators.md) | Generators | Dynamic step noise |
| [`LFDNoise1`](./generators.md) | Generators | Dynamic ramp noise |
| [`LFDNoise3`](./generators.md) | Generators | Dynamic cubic noise |
| [`LFGauss`](./generators.md) | Generators | Gaussian function oscillator |
| [`LFNoise0`](./generators.md) | Generators | Step noise |
| [`LFNoise1`](./generators.md) | Generators | Ramp noise |
| [`LFNoise2`](./generators.md) | Generators | Quadratic noise. |
| [`LFPar`](./generators.md) | Generators | Parabolic oscillator |
| [`LFPulse`](./generators.md) | Generators | pulse oscillator |
| [`LFSaw`](./generators.md) | Generators | Sawtooth oscillator |
| [`LFTri`](./generators.md) | Generators | Triangle oscillator |
| [`Limiter`](./dynamics.md) | Dynamics | Peak limiter |
| [`LinCongC`](./generators.md) | Generators | Linear congruential chaotic generator |
| [`LinCongL`](./generators.md) | Generators | Linear congruential chaotic generator |
| [`LinCongN`](./generators.md) | Generators | Linear congruential chaotic generator |
| [`Line`](./envelopes.md) | Envelopes | Line generator. |
| [`Linen`](./envelopes.md) | Envelopes | Simple linear envelope generator. |
| [`LinExp`](./maths.md) | Maths | Map a linear range to an exponential range |
| [`LinkJump`](./clock.md) | Clock | UGen that jumps to a position within a quantum of the server's Link clock |
| [`LinkPhase`](./clock.md) | Clock | UGen to access the phase of the server's Link clock |
| [`LinkTempo`](./clock.md) | Clock | UGen that gets and sets the tempo of the server's Link clock in cycles per second |
| [`LinPan2`](./multichannel.md) | Multichannel | Two channel linear pan. |
| [`LinRand`](./random.md) | Random | Skewed random number generator. |
| [`LinXFade2`](./multichannel.md) | Multichannel | Two channel linear crossfade. |
| [`ListDUGen`](./demand.md) | Demand | Base for demand-rate list UGens that sequence values from a list. |
| [`LocalBuf`](./buffer.md) | Buffer | Allocate a buffer local to the synth |
| [`LocalIn`](./inout.md) | InOut | Define and read from buses local to a synth. |
| [`LocalOut`](./inout.md) | InOut | Write to buses local to a synth. |
| [`Logistic`](./generators.md) | Generators | Chaotic noise function |
| [`LorenzL`](./generators.md) | Generators | Lorenz chaotic generator |
| [`Loudness`](./analysis.md) | Analysis | Extraction of instantaneous loudness in sones |
| [`LPF`](./filters.md) | Filters | 2nd order Butterworth lowpass filter |
| [`LPZ1`](./filters.md) | Filters | Two point average filter |
| [`LPZ2`](./filters.md) | Filters | Two zero fixed lowpass |
| [`MantissaMask`](./filters.md) | Filters | Reduce precision. |
| [`Median`](./filters.md) | Filters | Median filter. |
| [`MFCC`](./analysis.md) | Analysis | Mel frequency cepstral coefficients |
| [`MidEQ`](./filters.md) | Filters | Parametric filter. |
| [`ModDif`](./maths.md) | Maths | Minimum difference of two values in modulo arithmetics |
| [`MoogFF`](./filters.md) | Filters | Moog VCF implementation, designed by Federico Fontana |
| [`MostChange`](./maths.md) | Maths | Output most changed. |
| [`MouseButton`](./user-interaction.md) | User interaction | Mouse button UGen. |
| [`MouseX`](./user-interaction.md) | User interaction | Cursor tracking UGen. |
| [`MouseY`](./user-interaction.md) | User interaction | Cursor tracking UGen. |
| [`MultiplexAnalogIn`](./bela.md) | Bela | Read data from an analog input of the Bela board |
| [`NodeID`](./info.md) | Info | Outputs the node ID of the synth containing this UGen. |
| [`Normalizer`](./dynamics.md) | Dynamics | Flattens dynamics. |
| [`NRand`](./random.md) | Random | Sum of uniform distributions. |
| [`NumAudioBuses`](./info.md) | Info | Number of audio busses. |
| [`NumBuffers`](./info.md) | Info | Number of open buffers. |
| [`NumControlBuses`](./info.md) | Info | Number of control busses. |
| [`NumInputBuses`](./info.md) | Info | Number of input busses. |
| [`NumOutputBuses`](./info.md) | Info | Number of output busses. |
| [`NumRunningSynths`](./info.md) | Info | Number of currently running synths. |
| [`OffsetOut`](./inout.md) | InOut | Write a signal to a bus with sample accurate timing. |
| [`OnePole`](./filters.md) | Filters | One pole filter. |
| [`OneZero`](./filters.md) | Filters | One zero filter. |
| [`Onsets`](./analysis.md) | Analysis | Onset detector |
| [`Osc`](./generators.md) | Generators | Interpolating wavetable oscillator. |
| [`OscN`](./generators.md) | Generators | Noninterpolating wavetable oscillator. |
| [`Out`](./inout.md) | InOut | Write a signal to a bus. |
| [`PackFFT`](./fft.md) | FFT | Pack separate demand-rate FFT bin streams into an FFT chain buffer |
| [`Pan2`](./multichannel.md) | Multichannel | Two channel equal power pan. |
| [`Pan4`](./multichannel.md) | Multichannel | Four channel equal power pan. |
| [`PanAz`](./multichannel.md) | Multichannel | Azimuth panner |
| [`PanB`](./multichannel.md) | Multichannel | Ambisonic B-format panner. |
| [`PanB2`](./multichannel.md) | Multichannel | 2D Ambisonic B-format panner. |
| [`PartConv`](./fft.md) | FFT | Real-time partitioned convolution |
| [`Pause`](./synth-control.md) | Synth control | When triggered, pauses a node. |
| [`PauseSelf`](./synth-control.md) | Synth control | When triggered, pause enclosing synth. |
| [`PauseSelfWhenDone`](./synth-control.md) | Synth control | FIXME: PauseSelfWhenDone purpose. |
| [`Peak`](./analysis.md) | Analysis | Track peak signal amplitude. |
| [`PeakFollower`](./analysis.md) | Analysis | Track peak signal amplitude. |
| [`Phasor`](./triggers.md) | Triggers | A resettable linear ramp between two levels. |
| [`PinkNoise`](./generators.md) | Generators | Pink Noise. |
| [`Pitch`](./analysis.md) | Analysis | Autocorrelation pitch follower |
| [`PitchShift`](./filters.md) | Filters | Time domain pitch shifter. |
| [`PlayBuf`](./buffer.md) | Buffer | Sample playback oscillator. |
| [`Pluck`](./delays.md) | Delays | A Karplus-Strong UGen |
| [`Poll`](./info.md) | Info | Print the current output value of a UGen |
| [`PSinGrain`](./generators.md) | Generators | Very fast sine grain with a parabolic envelope |
| [`Pulse`](./generators.md) | Generators | Band limited pulse wave. |
| [`PulseCount`](./triggers.md) | Triggers | Pulse counter. |
| [`PulseDivider`](./triggers.md) | Triggers | Pulse divider. |
| [`PV_Add`](./fft.md) | FFT | Complex addition. |
| [`PV_BinScramble`](./fft.md) | FFT | Scramble bins. |
| [`PV_BinShift`](./fft.md) | FFT | Shift and stretch bin position. |
| [`PV_BinWipe`](./fft.md) | FFT | Combine low and high bins from two inputs. |
| [`PV_BrickWall`](./fft.md) | FFT | Zero bins. |
| [`PV_ConformalMap`](./fft.md) | FFT | Complex plane attack. |
| [`PV_Conj`](./fft.md) | FFT | Complex conjugate |
| [`PV_Copy`](./fft.md) | FFT | Copy an FFT buffer |
| [`PV_CopyPhase`](./fft.md) | FFT | Copy magnitudes and phases. |
| [`PV_Diffuser`](./fft.md) | FFT | Random phase shifting. |
| [`PV_Div`](./fft.md) | FFT | Complex division |
| [`PV_HainsworthFoote`](./fft.md) | FFT | FFT onset detector. |
| [`PV_JensenAndersen`](./fft.md) | FFT | FFT feature detector for onset detection. |
| [`PV_LocalMax`](./fft.md) | FFT | Pass bins which are a local maximum. |
| [`PV_MagAbove`](./fft.md) | FFT | Pass bins above a threshold. |
| [`PV_MagBelow`](./fft.md) | FFT | Pass bins below a threshold. |
| [`PV_MagClip`](./fft.md) | FFT | Clip bins to a threshold. |
| [`PV_MagDiv`](./fft.md) | FFT | Division of magnitudes |
| [`PV_MagFreeze`](./fft.md) | FFT | Freeze magnitudes. |
| [`PV_MagMul`](./fft.md) | FFT | Multiply magnitudes. |
| [`PV_MagNoise`](./fft.md) | FFT | Multiply magnitudes by noise. |
| [`PV_MagShift`](./fft.md) | FFT | shift and stretch magnitude bin position. |
| [`PV_MagSmear`](./fft.md) | FFT | Average magnitudes across bins. |
| [`PV_MagSquared`](./fft.md) | FFT | Square magnitudes. |
| [`PV_Max`](./fft.md) | FFT | Maximum magnitude. |
| [`PV_Min`](./fft.md) | FFT | Minimum magnitude. |
| [`PV_Mul`](./fft.md) | FFT | Complex multiply. |
| [`PV_PhaseShift`](./fft.md) | FFT | Shift phase. |
| [`PV_PhaseShift270`](./fft.md) | FFT | Shift phase by 270 degrees. |
| [`PV_PhaseShift90`](./fft.md) | FFT | Shift phase by 90 degrees. |
| [`PV_RandComb`](./fft.md) | FFT | Pass random bins. |
| [`PV_RandWipe`](./fft.md) | FFT | Crossfade in random bin order. |
| [`PV_RectComb`](./fft.md) | FFT | Make gaps in spectrum. |
| [`PV_RectComb2`](./fft.md) | FFT | Make gaps in spectrum. |
| [`QuadC`](./generators.md) | Generators | General quadratic map chaotic generator |
| [`QuadL`](./generators.md) | Generators | General quadratic map chaotic generator |
| [`QuadN`](./generators.md) | Generators | General quadratic map chaotic generator |
| [`RadiansPerSample`](./info.md) | Info | Number of radians per sample. |
| [`Ramp`](./filters.md) | Filters | Break a continuous signal into line segments |
| [`Rand`](./random.md) | Random | Single random number generator. |
| [`RandID`](./generators.md) | Generators | Set the synth's random generator ID. |
| [`RandSeed`](./generators.md) | Generators | Sets the synth's random generator seed. |
| [`RecordBuf`](./buffer.md) | Buffer | Record or overdub into a Buffer. |
| [`ReplaceOut`](./inout.md) | InOut | Send signal to a bus, overwriting previous contents. |
| [`Resonz`](./filters.md) | Filters | Resonant filter. |
| [`RHPF`](./filters.md) | Filters | A resonant high pass filter. |
| [`Ringz`](./filters.md) | Filters | Ringing filter. |
| [`RLPF`](./filters.md) | Filters | A resonant low pass filter. |
| [`Rotate2`](./multichannel.md) | Multichannel | Rotate a sound field. |
| [`RunningMax`](./maths.md) | Maths | Track maximum level. |
| [`RunningMin`](./maths.md) | Maths | Track minimum level. |
| [`RunningSum`](./analysis.md) | Analysis | Running sum over n frames |
| [`SampleDur`](./info.md) | Info | Duration of one sample. |
| [`SampleRate`](./info.md) | Info | Server sample rate. |
| [`Sanitize`](./info.md) | Info | Remove infinity, NaN, and denormals |
| [`Saw`](./generators.md) | Generators | Band limited sawtooth. |
| [`Schmidt`](./maths.md) | Maths | Schmidt trigger. |
| [`ScopeOut`](./buffer.md) | Buffer | FIXME: ScopeOut purpose. |
| [`ScopeOut2`](./inout.md) | InOut | Writes a signal to a ScopeBuffer for oscilloscope display. |
| [`Select`](./multichannel.md) | Multichannel | Select output from an array of inputs. |
| [`SendPeakRMS`](./analysis.md) | Analysis | Track peak and power of a signal for GUI applications. |
| [`SendReply`](./triggers.md) | Triggers | Send an array of values from the server to all notified clients |
| [`SendTrig`](./triggers.md) | Triggers | Send a trigger message from the server back to the client. |
| [`SetBuf`](./buffer.md) | Buffer | Writes a list of values into a buffer at init time. |
| [`SetResetFF`](./triggers.md) | Triggers | Set-reset flip flop. |
| [`Shaper`](./buffer.md) | Buffer | Wave shaper. |
| [`SinOsc`](./generators.md) | Generators | Interpolating sine wavetable oscillator. |
| [`SinOscFB`](./generators.md) | Generators | Feedback FM oscillator |
| [`Slew`](./filters.md) | Filters | Slew rate limiter. |
| [`Slope`](./analysis.md) | Analysis | Slope of signal |
| [`SOS`](./filters.md) | Filters | Second order filter section (biquad). |
| [`SpecCentroid`](./fft.md) | FFT | Spectral centroid |
| [`SpecFlatness`](./fft.md) | FFT | Spectral Flatness measure |
| [`SpecPcile`](./fft.md) | FFT | Find a percentile of FFT magnitude spectrum |
| [`Splay`](./multichannel.md) | Multichannel | Splay spreads an array of channels across the stereo field |
| [`SplayAz`](./multichannel.md) | Multichannel | Spreads an array of channels across a ring of channels |
| [`Spring`](./filters.md) | Filters | physical model of resonating spring |
| [`StandardL`](./generators.md) | Generators | Standard map chaotic generator |
| [`StandardN`](./generators.md) | Generators | Standard map chaotic generator |
| [`Stepper`](./triggers.md) | Triggers | Pulse counter. |
| [`StereoConvolution2L`](./fft.md) | FFT | Stereo real-time convolver with linear interpolation |
| [`SubsampleOffset`](./info.md) | Info | Offset from synth start within one sample. |
| [`Sweep`](./triggers.md) | Triggers | Triggered linear ramp |
| [`SyncSaw`](./generators.md) | Generators | Hard sync sawtooth wave. |
| [`T2A`](./conversion.md) | Conversion | Control rate trigger to audio rate trigger converter |
| [`T2K`](./conversion.md) | Conversion | Audio rate trigger to control rate trigger converter |
| [`Tap`](./buffer.md) | Buffer | Single tap into a delay line |
| [`TBall`](./filters.md) | Filters | physical model of bouncing object |
| [`TDelay`](./triggers.md) | Triggers | Trigger delay. |
| [`TDuty`](./demand.md) | Demand | Demand results as trigger from demand rate UGens. |
| [`TExpRand`](./random.md) | Random | Triggered exponential random number generator. |
| [`TGrains`](./buffer.md) | Buffer | Buffer granulator. |
| [`Timer`](./triggers.md) | Triggers | Returns time since last triggered. |
| [`TIRand`](./random.md) | Random | Triggered integer random number generator. |
| [`ToggleFF`](./triggers.md) | Triggers | Toggle flip flop. |
| [`TRand`](./random.md) | Random | Triggered random number generator. |
| [`Trig`](./triggers.md) | Triggers | Timed trigger. |
| [`Trig1`](./triggers.md) | Triggers | Timed trigger. |
| [`TWindex`](./random.md) | Random | Triggered windex. |
| [`TwoPole`](./filters.md) | Filters | Two pole filter. |
| [`TwoZero`](./filters.md) | Filters | Two zero filter. |
| [`Unpack1FFT`](./fft.md) | FFT | Unpack a single value (magnitude or phase) from an FFT chain |
| [`UnpackFFT`](./fft.md) | FFT | Unpack an FFT chain into separate demand-rate FFT bin streams |
| [`VarLag`](./filters.md) | Filters | Variable shaped lag |
| [`VarSaw`](./generators.md) | Generators | Variable duty saw |
| [`VDiskIn`](./inout.md) | InOut | Stream in audio from a file, with variable rate |
| [`Vibrato`](./generators.md) | Generators | The Vibrato oscillator models a slow frequency modulation. |
| [`VOsc`](./generators.md) | Generators | Variable wavetable oscillator. |
| [`VOsc3`](./generators.md) | Generators | Three variable wavetable oscillators. |
| [`Warp1`](./buffer.md) | Buffer | Warp a buffer with a time pointer |
| [`WhiteNoise`](./generators.md) | Generators | White noise. |
| [`Wrap`](./maths.md) | Maths | Wrap a signal outside given thresholds. |
| [`WrapIndex`](./buffer.md) | Buffer | Index into a table with a signal. |
| [`XFade2`](./multichannel.md) | Multichannel | Equal power two channel cross fade. |
| [`XLine`](./envelopes.md) | Envelopes | Exponential line generator. |
| [`XOut`](./inout.md) | InOut | Send signal to a bus, crossfading with previous contents. |
| [`ZeroCrossing`](./analysis.md) | Analysis | Zero crossing frequency follower |
