export interface ParamSpec {
  name: string;
  defaultValue?: number;
  required: boolean;
  isVarArgs: boolean;
}

export interface MethodSpec {
  rate: "ar" | "kr" | "ir" | "new";
  params: ParamSpec[];
  appendParams: string[];
  sizeParams: string[];
}

export interface ClassSpec {
  name: string;
  parent: string | null;
  body: string;
  methods: Partial<Record<MethodSpec["rate"], MethodSpec>>;
  initParams: ParamSpec[];
  outputProxyCount: number;
  hasMultiNew: boolean;
  numOutputsLiteral?: number;
  hasInitOutputs: boolean;
}

export interface ResolvedSpec {
  name: string;
  parent: string | null;
  methods: Partial<Record<MethodSpec["rate"], MethodSpec>>;
  hasMultiNew: boolean;
  outputProxyCount: number;
  numOutputsLiteral?: number;
  hasInitOutputs: boolean;
  initParams: ParamSpec[];
}

export interface ParsedSpec {
  classes: Record<string, ClassSpec>;
  resolved: Record<string, ResolvedSpec>;
}

const rateNames: MethodSpec["rate"][] = ["ar", "kr", "ir", "new"];

function stripCommentsAndStrings(input: string): string {
  let out = "";
  let i = 0;
  let state: "normal" | "line" | "block" | "single" | "double" = "normal";

  while (i < input.length) {
    const ch = input[i];
    const next = input[i + 1];

    if (state === "normal") {
      if (ch === "/" && next === "/") {
        state = "line";
        out += "  ";
        i += 2;
        continue;
      }
      if (ch === "/" && next === "*") {
        state = "block";
        out += "  ";
        i += 2;
        continue;
      }
      if (ch === "\"") {
        state = "double";
        out += " ";
        i += 1;
        continue;
      }
      if (ch === "'") {
        state = "single";
        out += " ";
        i += 1;
        continue;
      }
      out += ch;
      i += 1;
      continue;
    }

    if (state === "line") {
      if (ch === "\n") {
        state = "normal";
        out += "\n";
      } else {
        out += " ";
      }
      i += 1;
      continue;
    }

    if (state === "block") {
      if (ch === "*" && next === "/") {
        state = "normal";
        out += "  ";
        i += 2;
      } else {
        out += ch === "\n" ? "\n" : " ";
        i += 1;
      }
      continue;
    }

    if (state === "double") {
      if (ch === "\\" && next) {
        out += "  ";
        i += 2;
        continue;
      }
      if (ch === "\"") {
        state = "normal";
      }
      out += " ";
      i += 1;
      continue;
    }

    if (state === "single") {
      if (ch === "\\" && next) {
        out += "  ";
        i += 2;
        continue;
      }
      if (ch === "'") {
        state = "normal";
      }
      out += " ";
      i += 1;
      continue;
    }
  }

  return out;
}

function extractBody(source: string, startIndex: number): { body: string; end: number } | null {
  let depth = 0;
  let started = false;
  for (let i = startIndex; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "{") {
      depth += 1;
      if (!started) {
        started = true;
      }
    } else if (ch === "}") {
      depth -= 1;
      if (started && depth === 0) {
        const body = source.slice(startIndex + 1, i);
        return { body, end: i + 1 };
      }
    }
  }
  return null;
}

function findMethodBody(
  body: string,
  stripped: string,
  name: string,
  isClassMethod: boolean
): string | null {
  const pattern = isClassMethod
    ? new RegExp(`\\*${name}\\b`, "g")
    : new RegExp(`\\b${name}\\b`, "g");
  const match = pattern.exec(stripped);
  if (!match) return null;
  const start = match.index;
  const braceIndex = stripped.indexOf("{", start);
  if (braceIndex === -1) return null;
  const extracted = extractBody(body, braceIndex);
  return extracted ? extracted.body : null;
}

function parseNumber(value: string): number | undefined {
  const trimmed = value.trim();
  if (/^[+-]?inf$/i.test(trimmed)) {
    return trimmed.startsWith("-") ? -Infinity : Infinity;
  }
  if (/^[+-]?(?:\d+\.?\d*|\d*\.\d+)(?:[eE][+-]?\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }
  return undefined;
}

function parseParams(argList: string): ParamSpec[] {
  const parts = argList.split(",").map((part) => part.trim()).filter(Boolean);
  const params: ParamSpec[] = [];
  for (const part of parts) {
    const isVarArgs = part.includes("...");
    const cleaned = part.replace(/\.\.\./g, "").trim();
    const [namePart, defaultPart] = cleaned.split("=");
    const nameMatch = namePart.trim().match(/^\*?([A-Za-z_][A-Za-z0-9_]*)/);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    let defaultValue: number | undefined;
    let required = true;
    if (defaultPart !== undefined) {
      const parsed = parseNumber(defaultPart);
      if (parsed !== undefined) {
        defaultValue = parsed;
        required = false;
      } else {
        required = true;
      }
    }
    params.push({ name, defaultValue, required, isVarArgs });
  }
  return params;
}

function parseArgListFromBody(body: string): ParamSpec[] {
  const stripped = stripCommentsAndStrings(body);
  const argMatch = stripped.match(/\barg\s+([\s\S]*?);/m);
  if (argMatch) return parseParams(argMatch[1]);
  const pipeMatch = stripped.match(/^\s*\|\s*([^|]*)\|\s*/m);
  if (!pipeMatch) return [];
  return parseParams(pipeMatch[1]);
}

function extractAppendParams(body: string, params: ParamSpec[]): string[] {
  const paramNames = new Set(params.map((param) => param.name));
  const stripped = stripCommentsAndStrings(body);
  const pattern = /\+\+\s*([A-Za-z_][A-Za-z0-9_]*)/g;
  const result: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(stripped))) {
    const name = match[1];
    if (paramNames.has(name) && !result.includes(name)) {
      result.push(name);
    }
  }
  return result;
}

function extractSizeParams(body: string, params: ParamSpec[]): string[] {
  const paramNames = new Set(params.map((param) => param.name));
  const stripped = stripCommentsAndStrings(body);
  const pattern = /([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*(?:asArray\s*\.)?size\b/g;
  const matches: { name: string; index: number }[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(stripped))) {
    const name = match[1];
    if (paramNames.has(name)) {
      matches.push({ name, index: match.index });
    }
  }
  const result: string[] = [];
  matches
    .sort((a, b) => a.index - b.index)
    .forEach((item) => {
      if (!result.includes(item.name)) result.push(item.name);
    });
  return result;
}

function buildClassSpec(name: string, parent: string | null, body: string, stripped: string): ClassSpec {
  const methods: Partial<Record<MethodSpec["rate"], MethodSpec>> = {};

  for (const rate of rateNames) {
    const methodBody = findMethodBody(body, stripped, rate, true);
    if (!methodBody) continue;
    const params = parseArgListFromBody(methodBody);
    const appendParams = extractAppendParams(methodBody, params);
    const sizeParams = extractSizeParams(methodBody, params);
    methods[rate] = { rate, params, appendParams, sizeParams };
  }

  const initBody = findMethodBody(body, stripped, "init", false) ?? "";
  const initParams = initBody ? parseArgListFromBody(initBody) : [];

  const outputProxyCount = (initBody.match(/OutputProxy\s*\(/g) ?? []).length;
  const hasInitOutputs = /initOutputs\s*\(/.test(initBody);
  const numOutputsLiteral = /numOutputs\s*\{\s*\^0/.test(body) ? 0 : undefined;
  const hasMultiNew = /multiNewList\s*\(|multiNew\s*\(/.test(body);

  return {
    name,
    parent,
    body,
    methods,
    initParams,
    outputProxyCount,
    hasMultiNew,
    numOutputsLiteral,
    hasInitOutputs,
  };
}

function resolveSpec(name: string, classes: Record<string, ClassSpec>, cache: Record<string, ResolvedSpec>): ResolvedSpec {
  if (cache[name]) return cache[name];
  const spec = classes[name];
  if (!spec) {
    const fallback: ResolvedSpec = {
      name,
      parent: null,
      methods: {},
      hasMultiNew: false,
      outputProxyCount: 0,
      numOutputsLiteral: undefined,
      hasInitOutputs: false,
      initParams: [],
    };
    cache[name] = fallback;
    return fallback;
  }

  const parentSpec = spec.parent ? resolveSpec(spec.parent, classes, cache) : null;

  const methods: Partial<Record<MethodSpec["rate"], MethodSpec>> = { ...parentSpec?.methods, ...spec.methods };

  const resolved: ResolvedSpec = {
    name: spec.name,
    parent: spec.parent,
    methods,
    hasMultiNew: spec.hasMultiNew || (parentSpec?.hasMultiNew ?? false),
    outputProxyCount: spec.outputProxyCount || (parentSpec?.outputProxyCount ?? 0),
    numOutputsLiteral: spec.numOutputsLiteral ?? parentSpec?.numOutputsLiteral,
    hasInitOutputs: spec.hasInitOutputs || (parentSpec?.hasInitOutputs ?? false),
    initParams: spec.initParams.length > 0 ? spec.initParams : (parentSpec?.initParams ?? []),
  };

  cache[name] = resolved;
  return resolved;
}

export async function parseScDirectory(root: string): Promise<ParsedSpec> {
  const classes: Record<string, ClassSpec> = {};

  async function walk(dir: string): Promise<void> {
    for await (const entry of Deno.readDir(dir)) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory) {
        await walk(path);
      } else if (entry.isFile && entry.name.endsWith(".sc")) {
        const source = await Deno.readTextFile(path);
        const stripped = stripCommentsAndStrings(source);
        const regex = /([A-Za-z0-9_]+)\s*:\s*([A-Za-z0-9_]+)\s*\{/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(stripped))) {
          const className = match[1];
          const parent = match[2];
          const braceIndex = stripped.indexOf("{", match.index + match[0].length - 1);
          if (braceIndex === -1) continue;
          const extracted = extractBody(source, braceIndex);
          if (!extracted) continue;
          const body = extracted.body;
          const bodyStripped = stripCommentsAndStrings(body);
          classes[className] = buildClassSpec(className, parent, body, bodyStripped);
          regex.lastIndex = extracted.end;
        }
      }
    }
  }

  await walk(root);

  const resolved: Record<string, ResolvedSpec> = {};
  for (const name of Object.keys(classes)) {
    resolveSpec(name, classes, resolved);
  }

  return { classes, resolved };
}
