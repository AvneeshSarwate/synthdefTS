import { ParsedSpec, MethodSpec, ParamSpec, ResolvedSpec } from "./parse-sc.ts";

interface Overrides {
  exclude?: string[];
  custom?: Record<string, { kind: string }>;
}

const RESERVED = new Set([
  "in",
  "default",
  "class",
  "function",
  "var",
  "let",
  "const",
  "if",
  "else",
  "switch",
  "case",
  "new",
  "return",
  "while",
  "for",
  "do",
  "try",
  "catch",
  "finally",
  "with",
  "yield",
  "await",
  "enum",
  "interface",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "implements",
  "extends",
  "super",
  "this",
]);

function isValidIdentifier(name: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
}

function formatPropName(name: string): string {
  if (!isValidIdentifier(name) || RESERVED.has(name)) {
    return `"${name}"`;
  }
  return name;
}

function safeLocalName(name: string): string {
  if (!isValidIdentifier(name) || RESERVED.has(name)) {
    return `${name}_`;
  }
  return name;
}

function rateToEnum(rate: MethodSpec["rate"], isDemand: boolean): string {
  if (rate === "ar") return "Rate.Audio";
  if (rate === "kr") return "Rate.Control";
  if (rate === "ir") return "Rate.Scalar";
  return isDemand ? "Rate.Demand" : "Rate.Scalar";
}

function paramType(param: ParamSpec, isOutputCount: boolean, isOutputUgen: boolean, isAppendParam: boolean): string {
  if (isOutputCount) return "number";
  if (isOutputUgen && !isAppendParam) return "UGenInput";
  return "UGenInput | UGenInput[]";
}

function paramDefault(param: ParamSpec): string | null {
  if (param.defaultValue === undefined) return null;
  return String(param.defaultValue);
}

function buildParamList(
  params: ParamSpec[],
  numOutputsParam: string | undefined,
  isOutputUgen: boolean,
  appendParams: string[],
  sizeParams: string[]
): {
  typeLiteral: string;
  destructure: string;
  inputArgs: string[];
  expandIndices: number[];
  outputCountVar?: string;
  mulLocal?: string;
  addLocal?: string;
  appendArgs: { name: string; local: string; needsSize: boolean }[];
} {
  const typeParts: string[] = [];
  const destructureParts: string[] = [];
  const inputArgs: string[] = [];
  const expandIndices: number[] = [];
  const appendArgs: { name: string; local: string; needsSize: boolean }[] = [];

  let outputCountVar: string | undefined;
  let mulLocal: string | undefined;
  let addLocal: string | undefined;

  const appendParamSet = new Set(appendParams);
  const sizeParamSet = new Set(sizeParams);

  params.forEach((param, index) => {
    const isOutputCount = numOutputsParam === param.name;
    const isAppendParam = appendParamSet.has(param.name);
    const propName = formatPropName(param.name);
    const localName = safeLocalName(param.name);
    const optional = !param.required;
    const isMulAdd = param.name === "mul" || param.name === "add";
    const type = isMulAdd ? "UGenInput" : paramType(param, isOutputCount, isOutputUgen, isAppendParam);
    typeParts.push(`${propName}${optional ? "?" : ""}: ${type}`);

    const defaultValue = paramDefault(param);
    if (defaultValue !== null) {
      if (localName === param.name) {
        destructureParts.push(`${localName} = ${defaultValue}`);
      } else {
        destructureParts.push(`${param.name}: ${localName} = ${defaultValue}`);
      }
    } else {
      if (localName === param.name) {
        destructureParts.push(`${localName}`);
      } else {
        destructureParts.push(`${param.name}: ${localName}`);
      }
    }

    if (param.name === "mul") {
      mulLocal = localName;
      return;
    }
    if (param.name === "add") {
      addLocal = localName;
      return;
    }

    if (isOutputCount) {
      outputCountVar = localName;
      return;
    }

    if (isAppendParam) {
      appendArgs.push({ name: param.name, local: localName, needsSize: sizeParamSet.has(param.name) });
      return;
    }

    inputArgs.push(localName);
    expandIndices.push(inputArgs.length - 1);
  });

  return {
    typeLiteral: `{ ${typeParts.join("; ")} }`,
    destructure: `{ ${destructureParts.join(", ")} }`,
    inputArgs,
    expandIndices,
    outputCountVar,
    mulLocal,
    addLocal,
    appendArgs,
  };
}

function detectNumOutputs(spec: ResolvedSpec): { count: number | "variable"; param?: string } {
  if (spec.numOutputsLiteral === 0) return { count: 0 };
  if (spec.outputProxyCount > 0) return { count: spec.outputProxyCount };
  if (spec.hasInitOutputs && spec.initParams.length > 0) {
    let first = spec.initParams[0].name;
    if (first.startsWith("arg") && first.length > 3) {
      const normalized = first.slice(3);
      first = normalized.charAt(0).toLowerCase() + normalized.slice(1);
    }
    if (/numChan/i.test(first)) {
      return { count: "variable", param: first };
    }
  }
  return { count: 1 };
}

function buildMethod(
  name: string,
  method: MethodSpec,
  spec: ResolvedSpec,
  isDemand: boolean,
  isOutputClass: boolean
): string {
  const outputs = detectNumOutputs(spec);
  const outputCountParam = outputs.param;
  const isZeroOutput = outputs.count === 0;
  const isOutputUgen = isZeroOutput && isOutputClass;
  const outputParamName = isOutputUgen ? method.params.at(-1)?.name : undefined;
  const appendParams = method.appendParams.slice();
  if (isOutputUgen && outputParamName && !appendParams.includes(outputParamName)) {
    appendParams.push(outputParamName);
  }
  const params = buildParamList(method.params, outputCountParam, isOutputUgen, appendParams, method.sizeParams);
  const hasRequiredParams = method.params.some(
    (param) => param.required && param.name !== "mul" && param.name !== "add"
  );
  const returnType = outputs.count === 0
    ? "void"
    : outputs.count === 1
    ? "UGenOutput | UGenOutput[]"
    : "UGenOutput[] | UGenOutput[][]";

  const rate = rateToEnum(method.rate, isDemand);
  const inputParts: string[] = [...params.inputArgs];
  const preludeLines: string[] = [];
  for (const append of params.appendArgs) {
    const listVar = `${append.local}List`;
    preludeLines.push(`const ${listVar} = Array.isArray(${append.local}) ? ${append.local} : [${append.local}];`);
    if (append.needsSize) {
      inputParts.push(`${listVar}.length`);
    }
    inputParts.push(`...${listVar}`);
  }

  const inputsArray = `[${inputParts.join(", ")}]`;
  const needsInputsVar = preludeLines.length > 0;
  const inputsDecl = needsInputsVar
    ? `    const inputs: ${isOutputUgen ? "UGenInput[]" : "(UGenInput | UGenInput[])[]"} = ${inputsArray};\n`
    : "";
  const inputsValue = needsInputsVar ? "inputs" : inputsArray;
  const expandIndices = `[${params.expandIndices.join(", ")}]`;

  const outputCountExpr = outputs.count === "variable" ? params.outputCountVar ?? "1" : String(outputs.count);

  const paramsSignature = hasRequiredParams
    ? `params: ${params.typeLiteral}`
    : `params: ${params.typeLiteral} = {}`;

  if (isZeroOutput && isOutputUgen) {
    return `  ${method.rate}(${paramsSignature}): void {\n` +
      `    const ${params.destructure} = params;\n` +
      (preludeLines.length > 0 ? preludeLines.map((line) => `    ${line}\n`).join("") : "") +
      inputsDecl +
      `    newUGen("${name}", ${rate}, ${inputsValue} as UGenInput[], 0);\n` +
      `  }`;
  }
  if (isZeroOutput) {
    return `  ${method.rate}(${paramsSignature}): void {\n` +
      `    const ${params.destructure} = params;\n` +
      (preludeLines.length > 0 ? preludeLines.map((line) => `    ${line}\n`).join("") : "") +
      inputsDecl +
      `    multiNew("${name}", ${rate}, ${inputsValue}, 0, ${expandIndices});\n` +
      `  }`;
  }

  const applyMulAdd = params.mulLocal || params.addLocal;
  if (applyMulAdd) {
    const mulArg = params.mulLocal ?? "undefined";
    const addArg = params.addLocal ?? "undefined";
    return `  ${method.rate}(${paramsSignature}): ${returnType} {\n` +
      `    const ${params.destructure} = params;\n` +
      (preludeLines.length > 0 ? preludeLines.map((line) => `    ${line}\n`).join("") : "") +
      inputsDecl +
      `    const ugenOutput = multiNew("${name}", ${rate}, ${inputsValue}, ${outputCountExpr}, ${expandIndices}) as ${returnType};\n` +
      `    return applyMulAdd(ugenOutput as any, ${mulArg}, ${addArg}) as ${returnType};\n` +
      `  }`;
  }

  return `  ${method.rate}(${paramsSignature}): ${returnType} {\n` +
    `    const ${params.destructure} = params;\n` +
    (preludeLines.length > 0 ? preludeLines.map((line) => `    ${line}\n`).join("") : "") +
    inputsDecl +
    `    return multiNew("${name}", ${rate}, ${inputsValue}, ${outputCountExpr}, ${expandIndices}) as ${returnType};\n` +
    `  }`;
}

function isDemandUGen(spec: ResolvedSpec, resolved: Record<string, ResolvedSpec>): boolean {
  let current: ResolvedSpec | undefined = spec;
  while (current) {
    if (current.name === "DUGen") return true;
    if (!current.parent) return false;
    current = resolved[current.parent];
  }
  return false;
}

function isOutputUGenClass(spec: ResolvedSpec, resolved: Record<string, ResolvedSpec>): boolean {
  let current: ResolvedSpec | undefined = spec;
  while (current) {
    if (current.name === "AbstractOut") return true;
    if (!current.parent) return false;
    current = resolved[current.parent];
  }
  return false;
}

function renderCustom(name: string, kind: string): string {
  if (kind === "envgen") {
    return `export const EnvGen = {\n` +
      `  ar(params: {\n` +
      `    envelope: number[];\n` +
      `    gate?: UGenInput;\n` +
      `    levelScale?: UGenInput;\n` +
      `    levelBias?: UGenInput;\n` +
      `    timeScale?: UGenInput;\n` +
      `    doneAction?: UGenInput;\n` +
      `  }): UGenOutput {\n` +
      `    const { envelope, gate = 1, levelScale = 1, levelBias = 0, timeScale = 1, doneAction = 0 } = params;\n` +
      `    const inputs: UGenInput[] = [gate, levelScale, levelBias, timeScale, doneAction, ...envelope];\n` +
      `    return newUGen("EnvGen", Rate.Audio, inputs, 1) as UGenOutput;\n` +
      `  },\n` +
      `  kr(params: {\n` +
      `    envelope: number[];\n` +
      `    gate?: UGenInput;\n` +
      `    levelScale?: UGenInput;\n` +
      `    levelBias?: UGenInput;\n` +
      `    timeScale?: UGenInput;\n` +
      `    doneAction?: UGenInput;\n` +
      `  }): UGenOutput {\n` +
      `    const { envelope, gate = 1, levelScale = 1, levelBias = 0, timeScale = 1, doneAction = 0 } = params;\n` +
      `    const inputs: UGenInput[] = [gate, levelScale, levelBias, timeScale, doneAction, ...envelope];\n` +
      `    return newUGen("EnvGen", Rate.Control, inputs, 1) as UGenOutput;\n` +
      `  },\n` +
      `};\n`;
  }
  if (kind === "ienvgen") {
    return `export const IEnvGen = {\n` +
      `  ar(params: { envelope: number[]; index: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {\n` +
      `    const { envelope, index, mul = 1, add = 0 } = params;\n` +
      `    const inputs: (UGenInput | UGenInput[])[] = [index, ...envelope];\n` +
      `    const ugenOutput = multiNew(\"IEnvGen\", Rate.Audio, inputs, 1, [0]) as UGenOutput | UGenOutput[];\n` +
      `    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];\n` +
      `  },\n` +
      `  kr(params: { envelope: number[]; index: UGenInput; mul?: UGenInput; add?: UGenInput }): UGenOutput | UGenOutput[] {\n` +
      `    const { envelope, index, mul = 1, add = 0 } = params;\n` +
      `    const inputs: (UGenInput | UGenInput[])[] = [index, ...envelope];\n` +
      `    const ugenOutput = multiNew(\"IEnvGen\", Rate.Control, inputs, 1, [0]) as UGenOutput | UGenOutput[];\n` +
      `    return applyMulAdd(ugenOutput as any, mul, add) as UGenOutput | UGenOutput[];\n` +
      `  },\n` +
      `};\n`;
  }
  if (kind === "sendreply") {
    return `export const SendReply = {\n` +
      `  ar(params: { trig?: UGenInput | UGenInput[]; cmdName?: string; values?: UGenInput | UGenInput[]; replyID?: UGenInput | UGenInput[] } = {}): void {\n` +
      `    const { trig = 0, cmdName = "/reply", values, replyID = -1 } = params;\n` +
      `    const ascii = Array.from(new TextEncoder().encode(cmdName));\n` +
      `    const valueList = values === undefined ? [] : (Array.isArray(values) ? values : [values]);\n` +
      `    const trigList = Array.isArray(trig) ? trig : [trig];\n` +
      `    const replyList = Array.isArray(replyID) ? replyID : [replyID];\n` +
      `    const count = Math.max(trigList.length, replyList.length);\n` +
      `    for (let i = 0; i < count; i += 1) {\n` +
      `      const inputs: UGenInput[] = [trigList[i % trigList.length], replyList[i % replyList.length], ascii.length, ...ascii, ...valueList];\n` +
      `      newUGen("SendReply", Rate.Audio, inputs, 0);\n` +
      `    }\n` +
      `  },\n` +
      `  kr(params: { trig?: UGenInput | UGenInput[]; cmdName?: string; values?: UGenInput | UGenInput[]; replyID?: UGenInput | UGenInput[] } = {}): void {\n` +
      `    const { trig = 0, cmdName = "/reply", values, replyID = -1 } = params;\n` +
      `    const ascii = Array.from(new TextEncoder().encode(cmdName));\n` +
      `    const valueList = values === undefined ? [] : (Array.isArray(values) ? values : [values]);\n` +
      `    const trigList = Array.isArray(trig) ? trig : [trig];\n` +
      `    const replyList = Array.isArray(replyID) ? replyID : [replyID];\n` +
      `    const count = Math.max(trigList.length, replyList.length);\n` +
      `    for (let i = 0; i < count; i += 1) {\n` +
      `      const inputs: UGenInput[] = [trigList[i % trigList.length], replyList[i % replyList.length], ascii.length, ...ascii, ...valueList];\n` +
      `      newUGen("SendReply", Rate.Control, inputs, 0);\n` +
      `    }\n` +
      `  },\n` +
      `};\n`;
  }
  if (kind === "poll") {
    return `export const Poll = {\n` +
      `  ar(params: { trig?: UGenInput | UGenInput[]; in: UGenInput | UGenInput[]; label?: string; trigid?: UGenInput | UGenInput[] }): UGenInput | UGenInput[] {\n` +
      `    const { trig = 0, in: input, label, trigid = -1 } = params;\n` +
      `    const trigList = Array.isArray(trig) ? trig : [trig];\n` +
      `    const inList = Array.isArray(input) ? input : [input];\n` +
      `    const trigidList = Array.isArray(trigid) ? trigid : [trigid];\n` +
      `    const count = Math.max(trigList.length, inList.length, trigidList.length);\n` +
      `    for (let i = 0; i < count; i += 1) {\n` +
      `      const inValue = inList[i % inList.length];\n` +
      `      const labelText = label ?? (typeof inValue === \"number\" ? \"UGen(Number)\" : \`UGen(\${inValue.ugen.name})\`);\n` +
      `      const ascii = Array.from(new TextEncoder().encode(labelText));\n` +
      `      const inputs: UGenInput[] = [trigList[i % trigList.length], inValue, trigidList[i % trigidList.length], ascii.length, ...ascii];\n` +
      `      newUGen(\"Poll\", Rate.Audio, inputs, 1);\n` +
      `    }\n` +
      `    return input;\n` +
      `  },\n` +
      `  kr(params: { trig?: UGenInput | UGenInput[]; in: UGenInput | UGenInput[]; label?: string; trigid?: UGenInput | UGenInput[] }): UGenInput | UGenInput[] {\n` +
      `    const { trig = 0, in: input, label, trigid = -1 } = params;\n` +
      `    const trigList = Array.isArray(trig) ? trig : [trig];\n` +
      `    const inList = Array.isArray(input) ? input : [input];\n` +
      `    const trigidList = Array.isArray(trigid) ? trigid : [trigid];\n` +
      `    const count = Math.max(trigList.length, inList.length, trigidList.length);\n` +
      `    for (let i = 0; i < count; i += 1) {\n` +
      `      const inValue = inList[i % inList.length];\n` +
      `      const labelText = label ?? (typeof inValue === \"number\" ? \"UGen(Number)\" : \`UGen(\${inValue.ugen.name})\`);\n` +
      `      const ascii = Array.from(new TextEncoder().encode(labelText));\n` +
      `      const inputs: UGenInput[] = [trigList[i % trigList.length], inValue, trigidList[i % trigidList.length], ascii.length, ...ascii];\n` +
      `      newUGen(\"Poll\", Rate.Control, inputs, 1);\n` +
      `    }\n` +
      `    return input;\n` +
      `  },\n` +
      `  new(params: { trig?: UGenInput | UGenInput[]; in: UGenInput | UGenInput[]; label?: string; trigid?: UGenInput | UGenInput[] }): UGenInput | UGenInput[] {\n` +
      `    const input = params.in;\n` +
      `    let rate = Rate.Scalar;\n` +
      `    if (Array.isArray(input)) {\n` +
      `      for (const item of input) {\n` +
      `        const itemRate = typeof item === \"number\" ? Rate.Scalar : item.rate;\n` +
      `        if (itemRate > rate) rate = itemRate;\n` +
      `      }\n` +
      `    } else {\n` +
      `      rate = typeof input === \"number\" ? Rate.Scalar : input.rate;\n` +
      `    }\n` +
      `    return rate === Rate.Audio ? Poll.ar(params) : Poll.kr(params);\n` +
      `  },\n` +
      `};\n`;
  }
  if (kind === "dpoll") {
    return `export const Dpoll = {\n` +
      `  new(params: { in: UGenInput | UGenInput[]; label?: string; run?: UGenInput | UGenInput[]; trigid?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {\n` +
      `    const { in: input, label, run = 1, trigid = -1 } = params;\n` +
      `    const inList = Array.isArray(input) ? input : [input];\n` +
      `    const runList = Array.isArray(run) ? run : [run];\n` +
      `    const trigidList = Array.isArray(trigid) ? trigid : [trigid];\n` +
      `    const count = Math.max(inList.length, runList.length, trigidList.length);\n` +
      `    const outputs: UGenOutput[] = [];\n` +
      `    for (let i = 0; i < count; i += 1) {\n` +
      `      const inValue = inList[i % inList.length];\n` +
      `      const labelText = label ?? (typeof inValue === \"number\" ? \"DemandUGen(Number)\" : \`DemandUGen(\${inValue.ugen.name})\`);\n` +
      `      const ascii = Array.from(new TextEncoder().encode(labelText));\n` +
      `      const inputs: UGenInput[] = [inValue, trigidList[i % trigidList.length], runList[i % runList.length], ascii.length, ...ascii];\n` +
      `      outputs.push(newUGen(\"Dpoll\", Rate.Demand, inputs, 1) as UGenOutput);\n` +
      `    }\n` +
      `    return outputs.length === 1 ? outputs[0] : outputs;\n` +
      `  },\n` +
      `};\n`;
  }
  if (kind === "dwrand") {
    return `export const Dwrand = {\n` +
      `  new(params: { list: UGenInput | UGenInput[]; weights: UGenInput | UGenInput[]; repeats?: UGenInput | UGenInput[] }): UGenOutput | UGenOutput[] {\n` +
      `    const { list, weights, repeats = 1 } = params;\n` +
      `    const listValues = Array.isArray(list) ? list : [list];\n` +
      `    const size = listValues.length;\n` +
      `    const weightValues = (Array.isArray(weights) ? weights : [weights]).slice(0, size);\n` +
      `    while (weightValues.length < size) weightValues.push(0);\n` +
      `    const inputs: (UGenInput | UGenInput[])[] = [repeats, size, ...weightValues, ...listValues];\n` +
      `    return multiNew(\"Dwrand\", Rate.Demand, inputs, 1, [0]) as UGenOutput | UGenOutput[];\n` +
      `  },\n` +
      `};\n`;
  }
  if (kind === "localin") {
    return `export const LocalIn = {\n` +
      `  ar(params: { numChannels?: number; default?: UGenInput | UGenInput[] } = {}): UGenOutput[] {\n` +
      `    const { numChannels = 1, default: defaultValue = 0 } = params;\n` +
      `    const defaults = (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) as UGenInput[];\n` +
      `    return newUGen("LocalIn", Rate.Audio, defaults, numChannels) as UGenOutput[];\n` +
      `  },\n` +
      `  kr(params: { numChannels?: number; default?: UGenInput | UGenInput[] } = {}): UGenOutput[] {\n` +
      `    const { numChannels = 1, default: defaultValue = 0 } = params;\n` +
      `    const defaults = (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) as UGenInput[];\n` +
      `    return newUGen("LocalIn", Rate.Control, defaults, numChannels) as UGenOutput[];\n` +
      `  },\n` +
      `};\n`;
  }
  if (kind === "localbuf") {
    return `export const LocalBuf = {\n` +
      `  new(params: { numFrames?: UGenInput; numChannels?: UGenInput } = {}): UGenOutput {\n` +
      `    const { numFrames = 1, numChannels = 1 } = params;\n` +
      `    const builder = getActiveBuilder();\n` +
      `    if (!builder || !builder.registerLocalBuf) {\n` +
      `      throw new Error("LocalBuf requires an active synthDef builder");\n` +
      `    }\n` +
      `    const maxLocalBufs = builder.registerLocalBuf();\n` +
      `    return newUGen("LocalBuf", Rate.Scalar, [numChannels, numFrames, maxLocalBufs], 1) as UGenOutput;\n` +
      `  },\n` +
      `};\n`;
  }
  if (kind === "sendpeakrms") {
    return `export const SendPeakRMS = {\n` +
      `  ar(params: { sig: UGenInput | UGenInput[]; replyRate?: UGenInput; peakLag?: UGenInput; cmdName?: string; replyID?: UGenInput } ): void {\n` +
      `    const { sig, replyRate = 20, peakLag = 3, cmdName = "/reply", replyID = -1 } = params;\n` +
      `    const ascii = Array.from(new TextEncoder().encode(cmdName));\n` +
      `    const sigList = Array.isArray(sig) ? sig : [sig];\n` +
      `    const inputs: UGenInput[] = [replyRate, peakLag, replyID, sigList.length, ...sigList, ascii.length, ...ascii];\n` +
      `    newUGen("SendPeakRMS", Rate.Audio, inputs, 0);\n` +
      `  },\n` +
      `  kr(params: { sig: UGenInput | UGenInput[]; replyRate?: UGenInput; peakLag?: UGenInput; cmdName?: string; replyID?: UGenInput } ): void {\n` +
      `    const { sig, replyRate = 20, peakLag = 3, cmdName = "/reply", replyID = -1 } = params;\n` +
      `    const ascii = Array.from(new TextEncoder().encode(cmdName));\n` +
      `    const sigList = Array.isArray(sig) ? sig : [sig];\n` +
      `    const inputs: UGenInput[] = [replyRate, peakLag, replyID, sigList.length, ...sigList, ascii.length, ...ascii];\n` +
      `    newUGen("SendPeakRMS", Rate.Control, inputs, 0);\n` +
      `  },\n` +
      `};\n`;
  }
  return `// Unsupported custom kind for ${name}\n`;
}

function hasMethods(methods: Partial<Record<MethodSpec["rate"], MethodSpec>>): boolean {
  return Object.values(methods).some(Boolean);
}

export function generateModule(parsed: ParsedSpec, overrides: Overrides = {}): string {
  const exclude = new Set(overrides.exclude ?? []);
  const custom = overrides.custom ?? {};

  const specs = Object.values(parsed.resolved)
    .filter((spec) => spec.hasMultiNew)
    .filter((spec) => !exclude.has(spec.name))
    .filter((spec) => hasMethods(spec.methods))
    .sort((a, b) => a.name.localeCompare(b.name));

  let output = "";
  output += `import { Rate, UGenInput, UGenOutput } from \"../graph/types.ts\";\n`;
  output += `import { multiNew, newUGen } from \"./core.ts\";\n`;
  output += `import { applyMulAdd } from \"./ops.ts\";\n`;
  output += `import { getActiveBuilder } from \"../graph/context.ts\";\n\n`;

  const demandSet = new Set<string>();
  const outputClassSet = new Set<string>();
  for (const spec of specs) {
    if (isDemandUGen(spec, parsed.resolved)) {
      demandSet.add(spec.name);
    }
    if (isOutputUGenClass(spec, parsed.resolved)) {
      outputClassSet.add(spec.name);
    }
  }

  for (const spec of specs) {
    if (custom[spec.name]) {
      output += renderCustom(spec.name, custom[spec.name].kind);
      output += "\n";
      continue;
    }

    output += `export const ${spec.name} = {\n`;

    const isDemand = demandSet.has(spec.name);
    const isOutputClass = outputClassSet.has(spec.name);
    for (const rate of Object.keys(spec.methods) as MethodSpec["rate"][]) {
      const method = spec.methods[rate];
      if (!method) continue;
      output += buildMethod(spec.name, method, spec, isDemand, isOutputClass) + ",\n";
    }

    output += `};\n\n`;
  }

  return output;
}
