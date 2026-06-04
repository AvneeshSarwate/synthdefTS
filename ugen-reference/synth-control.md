# Synth control

_8 UGens. Generated from SuperCollider help files — do not edit by hand._

### DetectSilence — Detect when input falls below an amplitude threshold
- `DetectSilence.ar({ in=0, amp=0.0001, time=0.1, doneAction=0 })`
- `DetectSilence.kr({ in=0, amp=0.0001, time=0.1, doneAction=0 })`

> Monitors whether abs(in) stays continuously below the amp threshold for the full time window; outputs 0 while any sample exceeds the threshold, then latches to 1 once silence persists for the required duration and fires doneAction on that 0→1 transition. The UGen does not start its silence timer until the input has been non-silent at least once, so a permanently-zero input at synth start will hang indefinitely — prepend Impulse.ar(0) to force an immediate non-silence event. DC bias is treated identically to a loud signal (no AC coupling internally), so wrap in LeakDC before use if bias is present. Multichannel expansion creates independent UGens that each fire doneAction separately (OR semantics); for AND semantics, multiply their 1/0 outputs and gate FreeSelf.kr on the product.

### Done — Monitors another UGen to see when it is finished
- `Done.kr({ src })`

> A control-rate UGen that monitors the internal "done" flag of a supported source UGen (PlayBuf, Line, XLine, EnvGen, Linen, BufRd/BufWr, DiskIn/VDiskIn, Demand, RecordBuf, Dbufrd/Dbufwr) and outputs 0 until that flag is set, then outputs 1 permanently. Output is a binary latch: once high it never resets within the synth's lifetime. Primary use is to gate or trigger other signal-graph branches on completion of a finite UGen, or to feed into FreeSelf/TDelay chains to schedule delayed node cleanup — enabling reverb-tail patterns that doneAction alone cannot produce, since doneAction fires immediately on the source UGen's completion without the ability to insert a delay.

### Free — When triggered, frees a node.
- `Free.kr({ trig, id })`

> When triggered, frees a node.

### FreeSelf — When triggered, free enclosing synth.
- `FreeSelf.kr({ in })`

> Free enclosing synth when input signal crosses from non-positive to positive.

### FreeSelfWhenDone — Free the enclosing synth when a UGen is finished
- `FreeSelfWhenDone.kr({ src })`

> Some UGens set a 'done' flag when they are finished playing. FreeSelfWhenDone will free the enclosing synth when this flag is set to true. See Done for a complete list of these UGens. Note that many of these UGens have doneActions, which are another way of accomplishing the same thing. See Done for more detail. One must be careful when using binary operations on UGens with done flags, as these will return a BinaryOpUGen, and thus prevent the done flag from being accessible. See example below. ::

### Pause — When triggered, pauses a node.
- `Pause.kr({ gate, id })`

> When triggered, pauses a node.

### PauseSelf — When triggered, pause enclosing synth.
- `PauseSelf.kr({ in })`

> Pause enclosing synth when input signal crosses from non-positive to positive.

### PauseSelfWhenDone — FIXME: PauseSelfWhenDone purpose.
- `PauseSelfWhenDone.kr({ src })`

> FIXME: PauseSelfWhenDone description.
