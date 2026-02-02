export enum Rate {
  Scalar = 0,
  Control = 1,
  Audio = 2,
  Demand = 3,
}

export enum ParameterRate {
  Scalar = 0,
  Control = 1,
  Trigger = 2,
  Audio = 3,
}

export interface UGenOutput {
  ugen: UGenNode;
  outputIndex: number;
  rate: Rate;
}

export type UGenInput = UGenOutput | number;

export interface UGenNode {
  id: number;
  name: string;
  rate: Rate;
  specialIndex: number;
  inputs: UGenInput[];
  outputs: UGenOutput[];
  widthFirstAntecedents?: UGenNode[];
  synthIndex?: number;
}

export interface ControlName {
  name: string;
  index: number;
  rate: ParameterRate;
  defaultValue: number | number[];
}

export interface ParamDef {
  rate: ParameterRate;
  defaultValue: number | number[];
  lag?: number | number[];
}

export type ParamDefs = Record<string, ParamDef>;

export type ParamValue = UGenOutput | UGenOutput[];

export type ParamProxy = Record<string, ParamValue>;
