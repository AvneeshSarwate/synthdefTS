import { Rate, UGenInput, UGenOutput } from "./types.ts";

export interface BuilderContext {
  addUGen(
    name: string,
    rate: Rate,
    inputs: UGenInput[],
    numOutputs: number,
    specialIndex: number
  ): UGenOutput[];
  registerLocalBuf?(): UGenOutput;
}

let activeBuilder: BuilderContext | null = null;

export function setActiveBuilder(builder: BuilderContext | null): void {
  activeBuilder = builder;
}

export function getActiveBuilder(): BuilderContext | null {
  return activeBuilder;
}
