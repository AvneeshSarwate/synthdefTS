import {
  ControlName,
  ParamDef,
  ParamDefs,
  ParamProxy,
  ParamValue,
  ParameterRate,
  Rate,
  UGenInput,
  UGenNode,
  UGenOutput,
} from "./types.ts";
import { BuilderContext, setActiveBuilder } from "./context.ts";
import { compileSynthDef, CompiledSynthDef } from "./compiler.ts";
import { encodeSynthDef } from "../binary/encoder.ts";

export interface SynthDefData {
  name: string;
  ugens: UGenNode[];
  controlNames: ControlName[];
  paramValues: number[];
  variants: Map<string, number[]>;
}

export class SynthDef {
  readonly name: string;
  private readonly data: SynthDefData;

  constructor(data: SynthDefData) {
    this.data = data;
    this.name = data.name;
  }

  compile(): CompiledSynthDef {
    return compileSynthDef(this.data);
  }

  encode(): Uint8Array {
    return encodeSynthDef(this.compile());
  }

  get graph(): SynthDefData {
    return this.data;
  }
}

const WIDTH_FIRST_UGENS = new Set([
  "IFFT",
  "LocalBuf",
  "MaxLocalBufs",
  "SetBuf",
  "ClearBuf",
  "RandSeed",
  "RandID",
]);

class SynthDefBuilder implements BuilderContext {
  private readonly name: string;
  private nextId = 0;
  private readonly ugens: UGenNode[] = [];
  private readonly controlNames: ControlName[] = [];
  private readonly paramValues: number[] = [];
  private readonly widthFirstUGens: UGenNode[] = [];
  private maxLocalBufsNode: UGenNode | null = null;
  private maxLocalBufsCount = 0;

  constructor(name: string) {
    this.name = name;
  }

  addUGen(
    name: string,
    rate: Rate,
    inputs: UGenInput[],
    numOutputs: number,
    specialIndex: number
  ): UGenOutput[] {
    const node: UGenNode = {
      id: this.nextId++,
      name,
      rate,
      specialIndex,
      inputs,
      outputs: [],
      widthFirstAntecedents: this.widthFirstUGens.slice(),
    };

    const outputs: UGenOutput[] = [];
    for (let i = 0; i < numOutputs; i += 1) {
      outputs.push({ ugen: node, outputIndex: i, rate });
    }
    node.outputs = outputs;
    this.ugens.push(node);

    if (WIDTH_FIRST_UGENS.has(name)) {
      this.widthFirstUGens.push(node);
    }

    return outputs;
  }

  registerLocalBuf(): UGenOutput {
    if (!this.maxLocalBufsNode) {
      const outputs = this.addUGen("MaxLocalBufs", Rate.Scalar, [0], 1, 0);
      this.maxLocalBufsNode = outputs[0].ugen;
      this.maxLocalBufsCount = 0;
    }
    this.maxLocalBufsCount += 1;
    this.maxLocalBufsNode.inputs[0] = this.maxLocalBufsCount;
    return this.maxLocalBufsNode.outputs[0];
  }

  buildControls(paramDefs: ParamDefs): ParamProxy {
    const proxy: ParamProxy = {};
    const entries = Object.entries(paramDefs);
    let controlIndex = 0;

    const buildGroup = (
      rate: ParameterRate,
      ugenName: string,
      ugenRate: Rate
    ): void => {
      const group = entries.filter(([, def]) => def.rate === rate);
      if (group.length === 0) return;

      const values: number[] = [];
      for (const [, def] of group) {
        if (Array.isArray(def.defaultValue)) {
          values.push(...def.defaultValue);
        } else {
          values.push(def.defaultValue);
        }
      }

      const outputs = this.addUGen(ugenName, ugenRate, [], values.length, controlIndex);

      let offset = 0;
      for (const [name, def] of group) {
        const size = Array.isArray(def.defaultValue) ? def.defaultValue.length : 1;
        const slice = outputs.slice(offset, offset + size);
        const value: ParamValue = size === 1 ? slice[0] : slice;
        proxy[name] = value;

        this.controlNames.push({
          name,
          index: controlIndex + offset,
          rate: def.rate,
          defaultValue: def.defaultValue,
        });

        if (Array.isArray(def.defaultValue)) {
          this.paramValues.push(...def.defaultValue);
        } else {
          this.paramValues.push(def.defaultValue);
        }

        offset += size;
      }

      controlIndex += values.length;
    };

    // Match SynthDef.buildControls order: scalar, trigger, audio, control
    buildGroup(ParameterRate.Scalar, "Control", Rate.Scalar);
    buildGroup(ParameterRate.Trigger, "TrigControl", Rate.Control);
    buildGroup(ParameterRate.Audio, "AudioControl", Rate.Audio);
    buildGroup(ParameterRate.Control, "Control", Rate.Control);

    return proxy;
  }

  finish(): SynthDefData {
    return {
      name: this.name,
      ugens: this.ugens,
      controlNames: this.controlNames,
      paramValues: this.paramValues,
      variants: new Map(),
    };
  }
}

export function ir(defaultValue: number | number[]): ParamDef {
  return { rate: ParameterRate.Scalar, defaultValue };
}

export function kr(defaultValue: number | number[], lag?: number | number[]): ParamDef {
  return { rate: ParameterRate.Control, defaultValue, lag };
}

export function tr(defaultValue: number | number[]): ParamDef {
  return { rate: ParameterRate.Trigger, defaultValue };
}

export function ar(defaultValue: number | number[]): ParamDef {
  return { rate: ParameterRate.Audio, defaultValue };
}

export function synthDef(
  name: string,
  graphFn: (params: ParamProxy) => void
): SynthDef;
export function synthDef(
  name: string,
  paramDefs: ParamDefs,
  graphFn: (params: ParamProxy) => void
): SynthDef;
export function synthDef(
  name: string,
  paramDefsOrGraphFn: ParamDefs | ((params: ParamProxy) => void),
  maybeGraphFn?: (params: ParamProxy) => void
): SynthDef {
  const builder = new SynthDefBuilder(name);
  const graphFn = typeof paramDefsOrGraphFn === "function" ? paramDefsOrGraphFn : maybeGraphFn;
  const paramDefs = typeof paramDefsOrGraphFn === "function" ? {} : paramDefsOrGraphFn;

  if (!graphFn) {
    throw new Error("synthDef requires a graph function");
  }

  setActiveBuilder(builder);
  try {
    const params = builder.buildControls(paramDefs ?? {});
    graphFn(params);
  } finally {
    setActiveBuilder(null);
  }

  return new SynthDef(builder.finish());
}
