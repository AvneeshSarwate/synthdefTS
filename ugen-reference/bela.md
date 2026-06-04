# Bela

_7 UGens. Generated from SuperCollider help files — do not edit by hand._

### AnalogIn — Read data from an analog input
- `AnalogIn.ar({ analogPin=0, mul=1, add=0 })`
- `AnalogIn.kr({ analogPin=0, mul=1, add=0 })`

> Read a DC-coupled analog input connected to a sensor (e.g.: a potentiometer or CV in). This UGen only works on Bela ::

### AnalogOut — Write data to an analog output
- `AnalogOut.ar({ analogPin=0, output=0, mul=1, add=0 })`
- `AnalogOut.kr({ analogPin=0, output=0, mul=1, add=0 })`

> Writes an output to a DC-coupled analog output (e.g.: CV out). This UGen only works on Bela ::

### BelaScopeOut — Bela's Oscilloscope interface
- `BelaScopeOut.ar({ offset=0, channelsArray })`

> This UGen only works on Bela :: This UGen effectively sends audio signals to Bela Oscilloscope, analogously to how Out writes to a bus. It can be used directly, or through -belaScope, -belaScope, -belaScope, -belaScope and -belaScope convenience functions.

### DigitalIn — Read data from a digital input
- `DigitalIn.ar({ digitalPin=0, mul=1, add=0 })`
- `DigitalIn.kr({ digitalPin=0, mul=1, add=0 })`

> Reads digital data from a digital sensor input (e.g.: a button or trigger input). This UGen only works on Bela. :: If you want to modulate the pin number, you should use the UGen DigitalIO ::

### DigitalIO — Read or write data to a digital pin
- `DigitalIO.ar({ digitalPin=0, output=0, pinMode=0, mul=1, add=0 })`
- `DigitalIO.kr({ digitalPin=0, output=0, pinMode=0, mul=1, add=0 })`

> Reads or writes digital data from or to a digital pin. The pin number of this UGen can be modulated, as well as its I/O mode, which allows to tri-state the pin. This UGen only works on Bela. :: If you do not need to change the pin mode or the pin, you should use the UGen DigitalIn or DigitalOut ::

### DigitalOut — Write data to a digital output
- `DigitalOut.ar({ digitalPin=0, output=0, mul=1, add=0 })`
- `DigitalOut.kr({ digitalPin=0, output=0, mul=1, add=0 })`

> Writes digital data to a digital output (e.g.: an LED or a trigger/gate output). This UGen only works on Bela. :: If you want to modulate the pin number, you should use the UGen DigitalIO ::

### MultiplexAnalogIn — Read data from an analog input of the Bela board
- `MultiplexAnalogIn.ar({ analogPin=0, muxChannel=0, mul=1, add=0 })`
- `MultiplexAnalogIn.kr({ analogPin=0, muxChannel=0, mul=1, add=0 })`

> Reads analog data from a multiplexed analog input of the Bela board, with the additional Multiplexer board. This UGen only works on Bela ::
