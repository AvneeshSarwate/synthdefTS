# User interaction

_7 UGens. Generated from SuperCollider help files — do not edit by hand._

### AccelerometerX — Accelerometer X-axis sensor input (device builds), scaled via minval/maxval/warp/lag.
- `AccelerometerX.kr({ minval=0, maxval=1, warp=0, lag=0.2 })`

### AccelerometerY — Accelerometer Y-axis sensor input (device builds), scaled via minval/maxval/warp/lag.
- `AccelerometerY.kr({ minval=0, maxval=1, warp=0, lag=0.2 })`

### AccelerometerZ — Accelerometer Z-axis sensor input (device builds), scaled via minval/maxval/warp/lag.
- `AccelerometerZ.kr({ minval=0, maxval=1, warp=0, lag=0.2 })`

### KeyState — Respond to the state of a key
- `KeyState.kr({ keycode=0, minval=0, maxval=1, lag=0.2 })`

> Control-rate UGen that polls the OS global keyboard state for a given keycode each control period and outputs minval when the key is up or maxval when it is pressed — a binary step function at control rate. The lag argument applies a one-pole smoothing filter (Lag.kr) to soften the hard 0/1 transition, so non-zero lag introduces an exponential glide rather than an instantaneous switch. No signal-rate output is available; timing resolution is therefore limited to the control-block period. On Wayland the poll always returns 0.0 regardless of key state.

### MouseButton — Mouse button UGen.
- `MouseButton.kr({ minval=0, maxval=1, lag=0.2 })`

> Mouse button UGen. WARNING:: This UGen will not work for Linux users using Wayland, as the Wayland protocol does not allow a global keyboard or mouse state to be captured. The UGen will return MATH::0.0:: as constant value. For more information see https://github.com/supercollider/supercollider/issues/4544 ::

### MouseX — Cursor tracking UGen.
- `MouseX.kr({ minval=0, maxval=1, warp=0, lag=0.2 })`

> Cursor tracking UGen. WARNING:: This UGen will not work for Linux users using Wayland, as the Wayland protocol does not allow a global keyboard or mouse state to be captured. The UGen will return a constant random value between MATH::0.0:: and MATH::1.0::. For more information see https://github.com/supercollider/supercollider/issues/4544 ::

### MouseY — Cursor tracking UGen.
- `MouseY.kr({ minval=0, maxval=1, warp=0, lag=0.2 })`

> Cursor tracking UGen. WARNING:: This UGen will not work for Linux users using Wayland, as the Wayland protocol does not allow a global keyboard or mouse state to be captured. The UGen will return a constant random value between MATH::0.0:: and MATH::1.0::. For more information see https://github.com/supercollider/supercollider/issues/4544 ::
