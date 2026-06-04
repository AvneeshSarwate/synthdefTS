# Triggers

_17 UGens. Generated from SuperCollider help files — do not edit by hand._

### Changed — Triggers when a value changes
- `Changed.ar({ input, threshold=0 })`
- `Changed.kr({ input, threshold=0 })`

> Triggers when a value changes.

### Gate — Gate or hold.
- `Gate.ar({ in=0, trig=0 })`
- `Gate.kr({ in=0, trig=0 })`

> Allows input signal value to pass when gate is positive, otherwise holds last value.

### LastValue — Output the last value before the input changed
- `LastValue.ar({ in=0, diff=0.01 })`
- `LastValue.kr({ in=0, diff=0.01 })`

> Output the last value before the input changed more than a threshold.

### Latch — Sample and hold
- `Latch.ar({ in=0, trig=0 })`
- `Latch.kr({ in=0, trig=0 })`

> Holds input signal value when triggered. Latch will output 0 until it receives its first trigger.

### Phasor — A resettable linear ramp between two levels.
- `Phasor.ar({ trig=0, rate=1, start=0, end=1, resetPos=0 })`
- `Phasor.kr({ trig=0, rate=1, start=0, end=1, resetPos=0 })`

> Phasor is a linear ramp between start and end values. When its trigger input crosses from non-positive to positive, Phasor's output will jump to its reset position. Upon reaching the end of its ramp Phasor will wrap back to its start. N.B. Since end is defined as the wrap point, its value is never actually output. :: If one wants Phasor to output a signal with frequency freq oscillating between start and end, then the rate should be (end - start) * freq / sr where sr is the sampling rate. :: Phasor is commonly used as an index control with BufRd and BufWr.

### PulseCount — Pulse counter.
- `PulseCount.ar({ trig=0, reset=0 })`
- `PulseCount.kr({ trig=0, reset=0 })`

> Each trigger increments a counter which is output as a signal.

### PulseDivider — Pulse divider.
- `PulseDivider.ar({ trig=0, div=2, start=0 })`
- `PulseDivider.kr({ trig=0, div=2, start=0 })`

> Increments an integer counter on each positive-going zero-crossing of the trigger input (prevtrig <= 0, curtrig > 0); when counter >= div the counter resets to 0 and a single-sample unit impulse (1.0) is emitted, otherwise output is 0. The div argument is integer-truncated per block (not rounded), while the start argument is rounded to the nearest integer at construction — so a negative start offsets the first fire by |start| additional input triggers beyond the normal div count. No sample-rate smoothing or interpolation is applied to div changes, so live-modulating div mid-count can cause an early or late first output if the new value crosses the current counter state.

### SendReply — Send an array of values from the server to all notified clients
- `SendReply.ar({ trig=0, cmdName, values, replyID=-1 })`
- `SendReply.kr({ trig=0, cmdName, values, replyID=-1 })`

> A message is sent to all notified clients. See Server. cmdName list ## int - node ID ## int - reply ID ## ... floats - values. :: ::

### SendTrig — Send a trigger message from the server back to the client.
- `SendTrig.ar({ in=0, id=0, value=0 })`
- `SendTrig.kr({ in=0, id=0, value=0 })`

> On receiving a trigger (a non-positive to positive transition), send a trigger message from the server back to the client. The trigger message sent back to the client is this: table:: ## /tr || A trigger message. ## int: || Node ID. ## int: || Trigger ID. ## float: || Trigger value. :: This command is the mechanism that synths can use to trigger events in clients. The node ID is the node that is sending the trigger. The trigger ID and value are determined by inputs to the SendTrig unit generator which is the originator of this message.

### SetResetFF — Set-reset flip flop.
- `SetResetFF.ar({ trig=0, reset=0 })`
- `SetResetFF.kr({ trig=0, reset=0 })`

> Output is set to 1.0 upon receiving a trigger in the trig input, and to 0.0 upon receiving a trigger in the reset input. Once the flip flop is set to zero or one further triggers in the same input are have no effect. One use of this is to have some precipitating event cause something to happen until you reset it. If both inputs receive a trigger at the same time, the reset input takes precedence. The output will be 0. See the examples below.

### Stepper — Pulse counter.
- `Stepper.ar({ trig=0, reset=0, min=0, max=7, step=1, resetval })`
- `Stepper.kr({ trig=0, reset=0, min=0, max=7, step=1, resetval })`

> Each trigger increments a counter which is output as a signal. The counter wraps between min and max .

### Sweep — Triggered linear ramp
- `Sweep.ar({ trig=0, rate=1 })`
- `Sweep.kr({ trig=0, rate=1 })`

> Starts a linear raise by rate/sec from zero when trig input crosses from non-positive to positive. When rate == 1, Sweep may be used to get a continually-updating measurement of the time (in seconds) since the last trigger.

### TDelay — Trigger delay.
- `TDelay.ar({ in=0, dur=0.1 })`
- `TDelay.kr({ in=0, dur=0.1 })`

> Delays a trigger by a given time. Any triggers which arrive in the time between an input trigger and its delayed output, are ignored.

### Timer — Returns time since last triggered.
- `Timer.ar({ trig=0 })`
- `Timer.kr({ trig=0 })`

> When triggered, Timer measures the time (in seconds) elapsed since the previous trigger, and outputs this time value as a constant. Its output will not change until the next trigger. The initial value is 0. If you need the time since the last trigger, where the time is continually updated, see Sweep.

### ToggleFF — Toggle flip flop.
- `ToggleFF.ar({ trig=0 })`
- `ToggleFF.kr({ trig=0 })`

> Toggles between 0 and 1 upon receiving a trigger.

### Trig — Timed trigger.
- `Trig.ar({ in=0, dur=0.1 })`
- `Trig.kr({ in=0, dur=0.1 })`

> When a nonpositive to positive transition occurs at the input, Trig outputs the level of the triggering input for the specified duration, otherwise it outputs zero.

### Trig1 — Timed trigger.
- `Trig1.ar({ in=0, dur=0.1 })`
- `Trig1.kr({ in=0, dur=0.1 })`

> When a nonpositive to positive transition occurs at the input, Trig1 outputs 1 for the specified duration, otherwise outputs 0.
