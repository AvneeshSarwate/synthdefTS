# Reverbs

_3 UGens. Generated from SuperCollider help files — do not edit by hand._

### FreeVerb — A reverb
- `FreeVerb.ar({ in, mix=0.33, room=0.5, damp=0.5, mul=1, add=0 })`

> Eight parallel Schroeder comb filters (delay lengths 1617, 1557, 1491, 1422, 1277, 1116, 1188, 1356 samples at 44.1 kHz) feed a series of four allpass diffusers in order 556, 441, 341, 225 samples. Each comb filter embeds a one-pole lowpass damper: damper[n] = (1-g)*delay_out[n] + g*damper[n-1] where g = 0.4*damp, and writes back input*0.015 + feedback_coef*damper[n]; feedback_coef = 0.7 + 0.28*room, so room=1 gives 0.98, approaching but not reaching instability. Each allpass stage uses fixed coefficient 0.5: output = delay_out - cascade_input, write = 0.5*delay_out + cascade_input. Parameters are hard-clipped to [0,1] per block (not per sample), so automation artifacts can occur at the clip boundary; raising room toward 1 dramatically extends decay because comb feedback is near unity gain, while damp above ~0.5 increasingly rolls off HF energy on every recirculation pass.

### FreeVerb2 — A two-channel reverb
- `FreeVerb2.ar({ in, in2, mix=0.33, room=0.5, damp=0.5, mul=1, add=0 })`

> Stereo Schroeder reverb with two fully independent banks (L/R use slightly different delay lengths), each consisting of 8 parallel feedback comb filters followed by 4 series allpass filters. Both stereo inputs are first summed to mono and scaled by 0.015 before feeding both banks, so the reverb tail is mono-sourced even though decorrelated by differing comb lengths (L: 1617,1557,1491,1422,1277,1116,1188,1356 samples; R: 1640,1580,1514,1445,1300,1139,1211,1379 samples). Each comb uses a one-pole lowpass in the feedback path — the comb feedback coefficient is g = 0.7 + 0.28*room (range [0.7, 0.98]), and damping is a leaky integrator with coefficients (1 - 0.4*damp) for the direct term and 0.4*damp for the integrated term; at room=1 g=0.98 produces a very long tail and the comb approaches marginal stability with sustained tonal inputs. The four allpass stages per channel use a fixed scattering coefficient of 0.5 (Schroeder allpass: write = 0.5*R + input, output = R - input); all three parameters are hard-clipped to [0,1] each block.

### GVerb — A two-channel reverb
- `GVerb.ar({ in, roomsize=10, revtime=3, damping=0.5, inputbw=0.5, spread=15, drylevel=1, earlyreflevel=0.7, taillevel=0.5, maxroomsize=300, mul=1, add=0 })`

> A two-channel reverb UGen, based on the "GVerb" LADSPA effect by Juhana Sadeharju (kouhia at nic.funet.fi). Known issues There is a large CPU spike when the synth is instantiated while all the delay lines are zeroed out.; Changes in roomsize result in pitch shifting and noise.
