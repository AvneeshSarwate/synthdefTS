# Demand

_25 UGens. Generated from SuperCollider help files — do not edit by hand._

### Dbrown — Demand rate brownian movement generator.
- `Dbrown.new({ lo=0, hi=1, step=0.01, length=inf })`

> Dbrown returns numbers in the continuous range between lo and hi, Dibrown returns integer values. The arguments can be a number or any other UGen. See Pbrown, BrownNoise for structurally related equivalents.

### Dconst — Constrain a demand-rate stream to a given sum
- `Dconst.new({ sum, in, tolerance=0.001 })`

> A demand-rate analog to Pconst. It outputs values from the child demand stream until the sum of those values reaches or exceeds a given total. The last value will be truncated so that the sum of Dconst's output values will match the total exactly.

### Ddup — Demand rate input replicator
- `Ddup.new({ n, in })`

> A demand-rate value latch with a variable repeat count: on each demand trigger, if the internal counter m_repeatCount >= m_repeats, it pulls the next value from the input stream and a new repeat count n (rounded to nearest integer via floor(n+0.5)), resets the counter to 0, and outputs that value; otherwise it outputs the cached value and increments the counter. Because m_repeats is initialized to -1 and m_repeatCount to 0, the very first demand always fetches immediately. The repeat-count argument n may itself be a demand UGen, so a fresh n is consumed from that stream each time a new input value is latched. Either stream returning NaN terminates output with NaN, propagating end-of-stream correctly through chains.

### Demand — Demand results from demand rate UGens.
- `Demand.ar({ trig, reset, demandUGens })`
- `Demand.kr({ trig, reset, demandUGens })`

> When there is a trigger at the trig input, a value is demanded each UGen in the list and output. The unit generators in the list should be 'demand' rate. When there is a trigger at the reset input, the demand rate UGens in the list are reset.

### DemandEnvGen — Demand rate envelope generator
- `DemandEnvGen.ar({ level, dur, shape=1, curve=0, gate=1, reset=1, levelScale=1, levelBias=0, timeScale=1, doneAction=0 })`
- `DemandEnvGen.kr({ level, dur, shape=1, curve=0, gate=1, reset=1, levelScale=1, levelBias=0, timeScale=1, doneAction=0 })`

> Plays back break point envelope contours (levels, times, shapes) given by demand ugens. The next values are called when the next node is reached.

### Dgeom — Demand rate geometric series UGen.
- `Dgeom.new({ start=1, grow=2, length=inf })`

> On each demand tick, outputs the current accumulator then multiplies it in-place: y[n] = start * grow^n, implemented as state update m_value *= m_grow after output. The grow argument is re-polled from its demand-rate input every tick (slot 2), so grow can itself be a dynamic sequence — but start and length are latched only once at sequence initialization (when m_repeats &lt; 0), meaning retrigger/reset resamples them. Exhaustion is signalled by NaN output once repeatCount reaches length (rounded to nearest integer); length=inf stores as double infinity so the count never catches it, running forever. With grow=1 it degenerates to a constant; grow&gt;1 produces unbounded exponential growth that will overflow float range if length is large, so callers must bound or scale externally.

### Dibrown — Demand rate brownian movement generator.
- `Dibrown.new({ lo=0, hi=1, step=0.01, length=inf })`

> Dbrown returns numbers in the continuous range between lo and hi, Dibrown returns integer values. The arguments can be a number or any other UGen. See Pbrown, BrownNoise for structurally related equivalents.

### Diwhite — Demand rate white noise random generator.
- `Diwhite.new({ lo=0, hi=1, length=inf })`

> Dwhite returns numbers in the continuous range between lo and hi . Diwhite returns integer values. The arguments can be a number or any other UGen. See Pwhite, WhiteNoise for structurally related equivalents.

### Dpoll — Print the current output value of a demand rate UGen
- `Dpoll.new({ in, label, run=1, trigid=-1 })`

> Print the current output value of a demand rate UGen. WARNING:: Printing values from the Server in intensive for the CPU. Poll should be used for debugging purposes. ::

### Drand — Demand rate random sequence generator.
- `Drand.new({ list, repeats=1 })`

> Dxrand never plays the same value twice, whereas Drand chooses any value in the list. See Prand for structurally related equivalent.

### Dreset — demand rate reset
- `Dreset.new({ in, reset=0 })`

> The reset of a demand ugen can be controlled "from the outside" by the reset input of the Demand or Duty UGen, which consumes the chain of demands. Dreset allows to reset a subset of the chain internally.

### Dseq — Demand rate sequence generator.
- `Dseq.new({ list, repeats=1 })`

> A demand-rate sequencer that steps through its list inputs one element per trigger, cycling for `repeats` full passes before emitting NaN (the demand-rate end-of-sequence sentinel). `repeats` is itself demand-readable and is latched on first demand (stored as `floor(x+0.5)`; a NaN input collapses to 0 repeats). When a list slot is a demand UGen, Dseq pulls one value per trigger and advances the outer index only when that child returns NaN; a `m_needToResetChild` flag is set at that point and RESETINPUT is called deferred — just before the next read from the newly-advanced slot — not immediately on NaN. Non-demand list slots are read and the index is immediately advanced; `repeats=inf` runs indefinitely because the comparison is against a double, and the empty-sequence guard aborts after `mNumInputs` fruitless iterations to prevent infinite spin.

### Dser — Demand rate sequence generator.
- `Dser.new({ list, repeats=1 })`

> Demand-rate sequencer that iterates through its list input-by-input, yielding exactly `repeats` individual values total before outputting NaN to signal exhaustion. Unlike Dseq — where `repeats` counts full passes through the list — Dser increments its repeat counter once per element consumed, so `Dser([a,b,c], 5)` yields a,b,c,a,b and stops mid-cycle. When a list element is itself a demand UGen, it is pulled until it returns NaN (exhausted), at which point the index advances, the child is reset via RESETINPUT, and the repeat counter increments. The `repeats` argument is itself demand-readable and is latched on the first trigger (NaN from repeats resolves to 0, outputting NaN immediately); non-integer values are rounded via floor(x+0.5).

### Dseries — Demand rate arithmetic series UGen.
- `Dseries.new({ start=1, step=1, length=inf })`

> On each demand trigger, outputs the current accumulator value then increments it: y[0]=start, y[n]=y[n-1]+step (double-precision accumulation). The `length` input is sampled only once per sequence run — at the first trigger after reset (m_repeats < 0), it is rounded to the nearest integer via floor(x+0.5); once exhausted, the UGen emits NaN to signal end-of-sequence to the Demand UGen upstream. The `step` input is re-sampled on every trigger (before the length-init check), so a demand-rate step source can modulate stride mid-sequence, but a NaN step is silently ignored and the previous step value is retained. Setting length=inf produces an unbounded series; finite length sequences restart from scratch only when the parent Demand UGen resets the demand chain.

### Dshuf — Demand rate random sequence generator
- `Dshuf.new({ list, repeats=1 })`

> Demand-rate UGen that performs a single Fisher-Yates shuffle of its input list at construction/reset time (via irand on the server RNG), then outputs each element in that fixed shuffled order on successive demand ticks. The shuffle is not re-randomized between repeat passes: all `repeats` passes traverse the same permutation, advancing a sequential index into the stored `m_indices` array. Nested demand UGens in list slots are drained to NaN exhaustion before the index advances, enabling embedded pattern hierarchies. When `m_repeatCount >= repeats`, NaN is emitted to signal downstream exhaustion; `repeats` is read lazily from input slot 0 on the first demand tick (sentinel -1 until then), so a UGen-rate repeats argument is sampled only once per reset cycle.

### Dstutter — Demand rate input replicator
- `Dstutter.new({ n, in })`

> A demand-rate value-replication unit: on each demand tick it checks whether m_repeatCount >= m_repeats; if so, it pulls one new value from the input stream and a new repeat count (rounded to nearest integer via floor(n+0.5)), resets m_repeatCount to 0, then outputs m_value and increments m_repeatCount. The upstream input and repeat-count inputs are themselves demand UGens, so both can vary per block. Either input going NaN propagates NaN downstream and halts further pulls. Initialised with m_repeats=-1 so the very first demand tick always fetches a fresh value and repeat count. At runtime this class is identical to Ddup; the help file notes Dstutter is retained only for backward compatibility and its constructor actually returns a Ddup instance.

### Dswitch — Demand rate generator for embedding different inputs
- `Dswitch.new({ list, index })`

> Demand rate generator for embedding different inputs. In difference to Dswitch1, Dswitch embeds all items of an input demand ugen first before looking up the next index.

### Dswitch1 — Demand rate generator for switching between inputs.
- `Dswitch1.new({ list, index })`

> Demand rate generator for switching between inputs. See Pswitch1 for structurally related equivalent.

### Dunique — Return the same unique series of values for several demand streams
- `Dunique.new({ source, maxBufferSize=1024, protected })`

> Wraps a demand UGen so that multiple downstream demand streams all receive the same value sequence rather than each consuming their own interleaved subset of that UGen's output. Internally, it buffers produced values up to maxBufferSize; if one consumer runs faster than another, values are replayed from the buffer. With protected=true (default), the series terminates if the buffer is overrun, relying on a float32 counter that caps safe playback at 16,777,216 events. Set protected=false to allow looping from the buffer start instead of terminating, sizing maxBufferSize appropriately for mismatched-rate consumers.

### Duty — Demand results from demand rate UGens.
- `Duty.ar({ dur=1, reset=0, level=1, doneAction=0 })`
- `Duty.kr({ dur=1, reset=0, level=1, doneAction=0 })`

> A value is demanded of each UGen in the list and output according to a stream of duration values. The unit generators in the list should be 'demand' rate. When there is a trigger at the reset input, the demand rate UGens in the list and the duration are reset. The reset input may also be a demand UGen, providing a stream of reset times.

### Dwhite — Demand rate white noise random generator.
- `Dwhite.new({ lo=0, hi=1, length=inf })`

> Dwhite returns numbers in the continuous range between lo and hi . Diwhite returns integer values. The arguments can be a number or any other UGen. See Pwhite, WhiteNoise for structurally related equivalents.

### Dwrand — Demand rate weighted random sequence generator
- `Dwrand.new({ list, weights, repeats=1 })`

> Demand-rate weighted random selector: on each trigger, draws a uniform random float r in [0,1) and walks the weights array accumulating a running sum, selecting the first index i where sum >= r (O(N) per trigger, no alias table). If the selected slot is a scalar, it is output immediately, WINDEX runs again (new random pick), and repeatCount increments. If it is a sub-demand-UGen, that child is polled trigger-by-trigger until it returns NaN (signaling exhaustion), at which point WINDEX picks a new random slot and repeatCount increments; the exhausted child is reset at the start of its next visit. Weights are read live from inputs each trigger rather than pre-accumulated, so they can be modulated; if they sum to less than 1.0 the CDF walk may exhaust without breaking, leaving m_index stale and silently reusing the previously selected slot. The repeats argument is a demand input read lazily on the first trigger (rounded to nearest integer via floor(x+0.5)); output becomes NaN once repeatCount reaches that value.

### Dxrand — Demand rate random sequence generator.
- `Dxrand.new({ list, repeats=1 })`

> Dxrand never plays the same value twice, whereas Drand chooses any value in the list. See Pxrand for structurally related equivalent.

### ListDUGen — Base for demand-rate list UGens that sequence values from a list.
- `ListDUGen.new({ list, repeats=1 })`

### TDuty — Demand results as trigger from demand rate UGens.
- `TDuty.ar({ dur=1, reset=0, level=1, doneAction=0, gapFirst=0 })`
- `TDuty.kr({ dur=1, reset=0, level=1, doneAction=0, gapFirst=0 })`

> A value is demanded each UGen in the list and output as a trigger according to a stream of duration values. The unit generators in the list should be 'demand' rate. When there is a trigger at the reset input, the demand rate UGens in the list and the duration are reset. The reset input may also be a demand UGen, providing a stream of reset times.
