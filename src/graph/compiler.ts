import { Rate, UGenInput, UGenNode, UGenOutput } from "./types.ts";
import type { SynthDefData } from "./builder.ts";

export interface CompiledInput {
  src: number;
  index: number;
}

export interface CompiledUGen {
  name: string;
  rate: Rate;
  specialIndex: number;
  inputs: CompiledInput[];
  outputs: Rate[];
}

export interface CompiledSynthDef {
  name: string;
  constants: number[];
  paramValues: number[];
  paramNames: { name: string; index: number }[];
  ugens: CompiledUGen[];
  variants: Map<string, number[]>;
}

function isUGenOutput(input: UGenInput): input is UGenOutput {
  return typeof input !== "number";
}

export function compileSynthDef(data: SynthDefData): CompiledSynthDef {
  const constants: number[] = [];
  const constantMap = new Map<number, number>();

  const addConstant = (value: number): number => {
    const existing = constantMap.get(value);
    if (existing !== undefined) return existing;
    const index = constants.length;
    constants.push(value);
    constantMap.set(value, index);
    return index;
  };

  // Collect constants in build order (before topo sort), mirroring SC's collectConstants.
  for (const ugen of data.ugens) {
    for (const input of ugen.inputs) {
      if (typeof input === "number") {
        addConstant(input);
      }
    }
  }

  const nodes = data.ugens;
  const buildIndex = new Map<UGenNode, number>();
  nodes.forEach((node, index) => buildIndex.set(node, index));

  const antecedents = new Map<UGenNode, Set<UGenNode>>();
  const descendants = new Map<UGenNode, Set<UGenNode>>();
  for (const node of nodes) {
    antecedents.set(node, new Set());
    descendants.set(node, new Set());
  }

  const addEdge = (src: UGenNode, dst: UGenNode): void => {
    if (src === dst) return;
    const dstSet = antecedents.get(dst);
    if (!dstSet) return;
    if (!dstSet.has(src)) {
      dstSet.add(src);
      descendants.get(src)?.add(dst);
    }
  };

  for (const node of nodes) {
    for (const input of node.inputs) {
      if (isUGenOutput(input)) {
        addEdge(input.ugen, node);
      }
    }
    if (node.widthFirstAntecedents) {
      for (const antecedent of node.widthFirstAntecedents) {
        addEdge(antecedent, node);
      }
    }
  }

  // Topological sort in the same style as SC (available as LIFO, descendants reversed).
  const available: UGenNode[] = [];
  for (let i = nodes.length - 1; i >= 0; i -= 1) {
    const node = nodes[i];
    if ((antecedents.get(node)?.size ?? 0) === 0) {
      available.push(node);
    }
  }

  const sorted: UGenNode[] = [];
  while (available.length > 0) {
    const node = available.pop();
    if (!node) break;
    sorted.push(node);

    const descSet = descendants.get(node);
    if (!descSet) continue;
    const descList = Array.from(descSet).sort((a, b) => {
      return (buildIndex.get(a) ?? 0) - (buildIndex.get(b) ?? 0);
    });

    for (let i = descList.length - 1; i >= 0; i -= 1) {
      const desc = descList[i];
      const set = antecedents.get(desc);
      if (!set) continue;
      set.delete(node);
      if (set.size === 0) {
        available.push(desc);
      }
    }
  }

  if (sorted.length !== nodes.length) {
    throw new Error("UGen graph contains a cycle or unresolved dependencies");
  }

  sorted.forEach((node, index) => {
    node.synthIndex = index;
  });

  const compiledUGens: CompiledUGen[] = sorted.map((node) => {
    const inputs: CompiledInput[] = node.inputs.map((input) => {
      if (typeof input === "number") {
        const index = constantMap.get(input);
        if (index === undefined) {
          return { src: -1, index: addConstant(input) };
        }
        return { src: -1, index };
      }
      const srcIndex = input.ugen.synthIndex;
      if (srcIndex === undefined) {
        throw new Error("UGen missing synthIndex during compilation");
      }
      return { src: srcIndex, index: input.outputIndex };
    });

    return {
      name: node.name,
      rate: node.rate,
      specialIndex: node.specialIndex,
      inputs,
      outputs: node.outputs.map((output) => output.rate),
    };
  });

  return {
    name: data.name,
    constants,
    paramValues: data.paramValues.slice(),
    paramNames: data.controlNames.map((cn) => ({ name: cn.name, index: cn.index })),
    ugens: compiledUGens,
    variants: data.variants,
  };
}
