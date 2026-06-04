# Clock

_3 UGens. Generated from SuperCollider help files — do not edit by hand._

### LinkJump — UGen that jumps to a position within a quantum of the server's Link clock
- `LinkJump.kr({ gate=0, beat=0, quantum=4, force=0 })`

> A control-rate UGen that imperatively repositions the Ableton Link timeline by remapping the beat/time relationship on a gate trigger (gate > 0). The beat argument b must satisfy 0 <= b < quantum (q); on trigger, the server requests that beat b align to the current moment within the grid defined by q. With force > 0 this "rudely" overwrites the shared timeline for all peers; without force, the remap is a cooperative request whose effect depends on whether other Link clients are present. Returns -1.0 if LinkPhase.start has not been called on the server, otherwise 0.0; repeated or dense triggering (e.g. via Dust) will produce audible clock jitter.

### LinkPhase — UGen to access the phase of the server's Link clock
- `LinkPhase.kr({ quantum=4 })`

> Outputs the server's shared Ableton Link clock phase as a ramp over [0, quantum), where quantum is the modulus applied to the global Link step count — all clients sharing the same quantum value share identical phase. Tempo is set in cps (not BPM). To derive sub-quantum or super-quantum pulse signals without changing quantum, apply phase arithmetic on the output (e.g., LinkPhase.kr(4)*16 % 1.0) rather than selecting a smaller quantum. Returns -1.0 if the server has not joined a Link session via LinkPhase.start.

### LinkTempo — UGen that gets and sets the tempo of the server's Link clock in cycles per second
- `LinkTempo.kr({ gate=0, tempo=1 })`

> An UGen that gets and sets the tempo of the server's Link clock in cycles per second (cps), such that the tempo can be modulated through a signal. Ableton Link internally uses BPM which gets converted by the server to cps by dividing the BPM value by 60. See LINK::Classes/LinkPhase:: for examples.
