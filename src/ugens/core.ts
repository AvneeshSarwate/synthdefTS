import { getActiveBuilder } from "../graph/context.ts";
import { Rate, UGenInput, UGenOutput } from "../graph/types.ts";

export function newUGen(
  name: string,
  rate: Rate,
  inputs: UGenInput[],
  numOutputs: number,
  specialIndex = 0
): UGenOutput | UGenOutput[] | void {
  const builder = getActiveBuilder();
  if (!builder) {
    throw new Error(`UGen ${name} created outside of a synthDef build context`);
  }

  const outputs = builder.addUGen(name, rate, inputs, numOutputs, specialIndex);
  if (numOutputs === 0) return;
  if (numOutputs === 1) return outputs[0];
  return outputs;
}

function assertExpandableArg(arg: UGenInput | UGenInput[] | UGenInput[][]): UGenInput[] {
  if (!Array.isArray(arg)) return [arg];
  for (const item of arg) {
    if (Array.isArray(item)) {
      throw new Error("Nested arrays are not supported for multichannel expansion");
    }
  }
  return arg as UGenInput[];
}

export function multiNew(
  name: string,
  rate: Rate,
  args: (UGenInput | UGenInput[])[],
  numOutputs: number,
  expandableIndices: number[],
  specialIndex = 0
): UGenOutput | UGenOutput[] | (UGenOutput | UGenOutput[])[] | void {
  const expandable = new Set(expandableIndices);
  const argArrays: (UGenInput[] | null)[] = args.map((arg, index) => {
    if (!Array.isArray(arg)) return null;
    if (!expandable.has(index)) {
      throw new Error(`Argument at index ${index} is not expandable`);
    }
    return assertExpandableArg(arg);
  });

  let maxLength = 1;
  for (const list of argArrays) {
    if (list) maxLength = Math.max(maxLength, list.length);
  }

  if (maxLength === 1) {
    return newUGen(name, rate, args as UGenInput[], numOutputs, specialIndex);
  }

  const results: (UGenOutput | UGenOutput[] | void)[] = [];
  for (let i = 0; i < maxLength; i += 1) {
    const inputs: UGenInput[] = args.map((arg, index) => {
      const list = argArrays[index];
      if (!list) return arg as UGenInput;
      const item = list[i % list.length];
      return item as UGenInput;
    });
    results.push(newUGen(name, rate, inputs, numOutputs, specialIndex));
  }

  return results as (UGenOutput | UGenOutput[])[];
}
