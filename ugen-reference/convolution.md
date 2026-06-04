# Convolution

_1 UGen. Generated from SuperCollider help files — do not edit by hand._

### Convolution3 — Time based convolver.
- `Convolution3.ar({ in, kernel, trigger=0, framesize=2048, mul=1, add=0 })`
- `Convolution3.kr({ in, kernel, trigger=0, framesize=2048, mul=1, add=0 })`

> Strict convolution with fixed kernel which can be updated using a trigger signal. The convolution is performed in the time domain. Doing convolution in time domain is highly inefficient, and probably only useful for either very short kernel sizes, or for control rate signals. See Convolution2 and Convolution2L for more efficient convolution UGens. ::
