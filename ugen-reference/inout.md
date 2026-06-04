# InOut

_14 UGens. Generated from SuperCollider help files — do not edit by hand._

### DiskIn — Stream in audio from a file.
- `DiskIn.ar({ numChannels, bufnum, loop=0 })`

> Continuously play a longer soundfile from disk. This requires a buffer to be preloaded with one buffer size of sound. DiskIn cannot alter playback rate. See VDiskIn for a disk-streaming UGen with rate control.

### DiskOut — Record to a soundfile to disk.
- `DiskOut.ar({ bufnum, channelsArray })`

> Writes audio to disk via a server-side Buffer that acts as a staging ring buffer; smaller buffers increase disk-access frequency and risk dropouts. Buffer numFrames must be a power of two and at least 65536 (131072–262144 preferred). Channel count mismatch between the buffer and channelsArray causes silent failure with no audio written. The file header is not finalized until b.close is called after stopping the synth; skipping this step renders the output file unreadable.

### In — Read a signal from a bus.
- `In.ar({ bus=0, numChannels=1 })`
- `In.kr({ bus=0, numChannels=1 })`

> Reads numChannels consecutive bus values starting at bus index. In.ar enforces strict within-cycle ordering: it reads only samples written by nodes earlier in the node tree during the current block, returning zeros for buses written by later nodes, eliminating unintentional feedback loops (use InFeedback for deliberate audio-rate feedback). In.kr is cycle-agnostic: it reads whatever value is currently on the control bus regardless of whether it was written this cycle, last cycle, or set directly by the client, so control-rate feedback through the node graph is inherently possible. numChannels is fixed at SynthDef compile time and cannot be modulated at runtime.

### InFeedback — Read signal from a bus with a current or one cycle old timestamp.
- `InFeedback.ar({ bus=0, numChannels=1 })`

> Reads audio-rate bus data without zeroing previous-cycle samples, adding one block of latency (~1.45 ms at 64/44100). Unlike In.ar (which zeros stale data on read), InFeedback passes bus contents regardless of age, enabling cross-node feedback. Node order matters: a writer before InFeedback overwrites previous-cycle data (only its signal feeds back); writers after InFeedback both contribute previous-cycle samples. For Karplus-Strong, subtract ControlRate.ir.reciprocal from target delay—otherwise delay is too long and pitch will be flat.

### InTrig — Generate a trigger anytime a bus is set.
- `InTrig.kr({ bus=0, numChannels=1 })`

> Any time the bus is "touched", ie. has its value set (using "/c_set" etc.), a single impulse trigger will be generated. Its amplitude is the value that the bus was set to. If the bus is set synchronously no trigger will be generated.

### LagIn — Read a control signal from a bus with a lag
- `LagIn.kr({ bus=0, numChannels=1, lag=0.1 })`

> Reads a control-rate bus and applies a one-pole leaky-integrator lowpass per channel: y[n] = z + b1*(y[n-1] - z), where z is the raw bus value and b1 = exp(log(0.001)/(lag*sampleRate)), so the step response decays to 0.1% (-60 dB) in exactly `lag` seconds. When lag==0, b1 is forced to 0, giving instantaneous pass-through with no filter state. The lag coefficient is computed once at construction and is not modulatable at runtime; zapgremlins is applied each sample to flush denormals. The first sample is initialized by a pass-through call (LagIn_next_0), so the filter state y1 starts at the current bus value rather than zero, preventing an initial transient step.

### LocalIn — Define and read from buses local to a synth.
- `LocalIn.ar({ numChannels=1, default=0 })`
- `LocalIn.kr({ numChannels=1, default=0 })`

> Defines synth-local feedback buses, paired with LocalOut to form an explicit single-sample-block feedback loop: values written by LocalOut appear at LocalIn exactly one block period later (latency = blockSize / sampleRate). Only one audio-rate and one control-rate LocalIn may exist per SynthDef; channel count is fixed at graph-compile time. The mandatory one-block delay must be compensated when targeting frequencies above ~20 Hz — in a Karplus-Strong/resonator context this means subtracting ControlRate.ir.reciprocal from the desired delay time. Initial bus values are set by the `default` argument, written once before the first LocalOut overwrite, preventing undefined feedback on the first cycle.

### LocalOut — Write to buses local to a synth.
- `LocalOut.ar({ channelsArray })`
- `LocalOut.kr({ channelsArray })`

> Writes an array of signals into synth-local feedback buses defined by a paired LocalIn, enabling self-contained feedback loops without consuming global bus resources. The critical constraint is a mandatory one-block latency: audio written by LocalOut is not available to LocalIn until the next control block, so the effective minimum round-trip delay is blockSize/sampleRate. For pitched feedback paths (Karplus-Strong style resonators), this one-block offset must be explicitly subtracted from the desired delay time — e.g., DelayC.ar(sig, maxDel, freq.reciprocal - ControlRate.ir.reciprocal) — or pitch will be flat. Channel count is fixed at SynthDef compile time and must match the LocalIn declaration exactly.

### OffsetOut — Write a signal to a bus with sample accurate timing.
- `OffsetOut.ar({ bus, channelsArray })`
- `OffsetOut.kr({})`

> Output signal to a bus, the sample offset within the bus is kept exactly; i.e. if the synth is scheduled to be started part way through a control cycle, OffsetOut will maintain the correct offset by buffering the output and delaying it until the exact time that the synth was scheduled for. For achieving subsample accuracy see SubsampleOffset Note that if you have an input to the synth, it will be coming in and its normal time, then mixed in your synth, and then delayed with the output. So you shouldn't use OffsetOut for effects or gating. :: See the Server-Architecture and Bus helpfiles for more information on buses and how they are used.

### Out — Write a signal to a bus.
- `Out.ar({ bus, channelsArray })`
- `Out.kr({ bus, channelsArray })`

> Writes (adds) a signal to a numbered audio or control bus by summing into the bus buffer — contents from earlier nodes are accumulated, not replaced. The lowest bus indices are written to hardware outputs. Channel count is fixed at SynthDef compile time; mismatched widths silently read/write past intended bus boundaries, as SC does not enforce channel alignment. Subject to control-rate block-boundary jitter at audio rate — use OffsetOut where sample-accurate scheduling is required.

### ReplaceOut — Send signal to a bus, overwriting previous contents.
- `ReplaceOut.ar({ bus, channelsArray })`
- `ReplaceOut.kr({ bus, channelsArray })`

> Out adds it's output to a given bus, making it available to all nodes later in the node tree (See Synth and Order-of-execution for more information). ReplaceOut overwrites those contents. This can make it useful for processing. See the Server-Architecture and Bus helpfiles for more information on buses and how they are used.

### ScopeOut2 — Writes a signal to a ScopeBuffer for oscilloscope display.
- `ScopeOut2.ar({ inputArray, scopeNum=0, maxFrames=4096, scopeFrames })`
- `ScopeOut2.kr({ inputArray, scopeNum=0, maxFrames=4096, scopeFrames })`

### VDiskIn — Stream in audio from a file, with variable rate
- `VDiskIn.ar({ numChannels, bufnum, rate=1, loop=0, sendID=0 })`

> Continuously play a longer soundfile from disk. This requires a buffer to be preloaded with one buffer size of sound.

### XOut — Send signal to a bus, crossfading with previous contents.
- `XOut.ar({ bus, xfade, channelsArray })`
- `XOut.kr({ bus, xfade, channelsArray })`

> Send signal to a bus, crossfading with previous contents. xfade is a level for the crossfade between what is on the bus and what you are sending. The algorithm is equivalent to this: bus_signal = (input_signal * xfade) + (bus_signal * (1 - xfade)); See the Server-Architecture and Bus helpfiles for more information on buses and how they are used.
