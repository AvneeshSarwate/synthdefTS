# Info

_17 UGens. Generated from SuperCollider help files — do not edit by hand._

### BlockSize — Outputs the server's block size (samples per control-rate period).
- `BlockSize.ir({})`

### CheckBadValues — Test for infinity, not-a-number, and denormals
- `CheckBadValues.ar({ in=0, id=0, post=2 })`
- `CheckBadValues.kr({ in=0, id=0, post=2 })`

> This UGen tests for infinity, NaN (not a number), and denormals. If one of these is found, it posts a warning. Its output is as follows: 0 = a normal float, 1 = NaN, 2 = infinity, and 3 = a denormal.

### ControlDur — Duration of one block
- `ControlDur.ir({})`

> Returns the current block duration of the server in seconds. Equivalent to 1 / ControlRate.

### ControlRate — Server control rate.
- `ControlRate.ir({})`

> Get the current control rate of the server.

### NodeID — Outputs the node ID of the synth containing this UGen.
- `NodeID.ir({})`

### NumAudioBuses — Number of audio busses.
- `NumAudioBuses.ir({})`

> Number of audio busses.

### NumBuffers — Number of open buffers.
- `NumBuffers.ir({})`

> Number of open buffers.

### NumControlBuses — Number of control busses.
- `NumControlBuses.ir({})`

> Number of control busses.

### NumInputBuses — Number of input busses.
- `NumInputBuses.ir({})`

> Number of input busses.

### NumOutputBuses — Number of output busses.
- `NumOutputBuses.ir({})`

> Number of output busses.

### NumRunningSynths — Number of currently running synths.
- `NumRunningSynths.kr({})`
- `NumRunningSynths.ir({})`

> Number of currently running synths.

### Poll — Print the current output value of a UGen
- `Poll.ar({ trig, in, label, trigid=-1 })`
- `Poll.kr({ trig, in, label, trigid=-1 })`
- `Poll.new({ trig, in, label, trigid=-1 })`

> Print the current output value of a UGen, useful for debugging SynthDefs. WARNING:: Printing values from the Server in intensive for the CPU. Poll should be used for debugging purposes.::

### RadiansPerSample — Number of radians per sample.
- `RadiansPerSample.ir({})`

> Returns the number of radians per sample.

### SampleDur — Duration of one sample.
- `SampleDur.ir({})`

> Returns the current sample duration of the server. Equivalent to 1/SampleRate.

### SampleRate — Server sample rate.
- `SampleRate.ir({})`

> Returns the current sample rate of the server.

### Sanitize — Remove infinity, NaN, and denormals
- `Sanitize.ar({ in=0, replace=0 })`
- `Sanitize.kr({ in=0, replace=0 })`

> Replaces infinities, NaNs, and subnormal numbers (denormals) with a given signal, zero by default. The method -sanitize provides a shorthand for this. See also CheckBadValues, which allows you to discriminate specific kinds of bad values and print information about them to the post window.

### SubsampleOffset — Offset from synth start within one sample.
- `SubsampleOffset.ir({})`

> When a synth is created from a time stamped osc-bundle, it starts calculation at the next possible block (normally 64 samples). Using an OffsetOut UGen, one can delay the audio so that it matches sample accurately. For some synthesis methods, one needs subsample accuracy. SubsampleOffset provides the information where, within the current sample, the synth was scheduled. It can be used to offset envelopes or resample the audio output.
