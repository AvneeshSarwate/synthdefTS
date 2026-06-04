# Conversion

_5 UGens. Generated from SuperCollider help files — do not edit by hand._

### A2K — Audio to control rate converter.
- `A2K.kr({ in=0 })`

> Audio to control rate converter. Only needed in specific cases.

### DegreeToKey — Convert signal to modal pitch.
- `DegreeToKey.ar({ bufnum, in=0, octave=12, mul=1, add=0 })`
- `DegreeToKey.kr({ bufnum, in=0, octave=12, mul=1, add=0 })`

> The input signal value is truncated to an integer value and used as an index into an octave repeating table of note values. Indices wrap around the table and shift octaves as they do.

### K2A — Control to audio rate converter.
- `K2A.ar({ in=0 })`

> To be able to play a control rate UGen into an audio rate UGen, sometimes the rate must be converted. K2A converts via linear interpolation.

### T2A — Control rate trigger to audio rate trigger converter
- `T2A.ar({ in=0, offset=0 })`

> Converts control rate trigger into audio rate trigger (maximally one per control period).

### T2K — Audio rate trigger to control rate trigger converter
- `T2K.kr({ in=0 })`

> Converts audio rate trigger into control rate trigger, using the maximum trigger level in the input during each control period.
