// Builds the UGen reference markdown from the SAME parsed specs the typing
// generator uses, joined with summaries/categories lifted from the SC help
// files. Output is a set of { relativePath -> markdown } entries.

import { MethodSpec, ParamSpec, ParsedSpec, ResolvedSpec } from "./parse-sc.ts";
import { Overrides, selectUgenSpecs } from "./select.ts";
import { HelpMeta } from "./parse-help.ts";

export type DocOverride = { summary?: string; category?: string };

// Stable display order for rate methods.
const RATE_ORDER: MethodSpec["rate"][] = ["ar", "kr", "ir", "new"];

const UNCATEGORIZED = "UGens>Uncategorized";

function formatDefault(value: number): string {
  if (value === Infinity) return "inf";
  if (value === -Infinity) return "-inf";
  return String(value);
}

function formatParam(param: ParamSpec): string {
  const name = param.isVarArgs ? `...${param.name}` : param.name;
  if (!param.isVarArgs && param.defaultValue !== undefined) {
    return `${name}=${formatDefault(param.defaultValue)}`;
  }
  return name;
}

/** Render the callable signatures for a UGen, one per available rate. */
function signatures(spec: ResolvedSpec): string[] {
  const out: string[] = [];
  for (const rate of RATE_ORDER) {
    const method = spec.methods[rate];
    if (!method) continue;
    const params = method.params.map(formatParam).join(", ");
    out.push(params ? `${spec.name}.${rate}({ ${params} })` : `${spec.name}.${rate}({})`);
  }
  return out;
}

interface DocEntry {
  name: string;
  summary: string;
  category: string;
  topBucket: string;
  signatures: string[];
  /** DSP detail: AI-generated note if present, else the cleaned help Description. */
  detail: string;
}

/** Subset of the ugen-dsp-notes.json checkpoint we read here. */
export type DspNote = { note: string };

function topBucketOf(category: string): string {
  // "UGens>Filters>Linear" -> "Filters"; "UGens>FFT" -> "FFT".
  const without = category.replace(/^UGens>/, "");
  const first = without.split(">")[0].trim();
  return first || "Uncategorized";
}

function slug(bucket: string): string {
  return bucket.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildEntries(
  specs: ResolvedSpec[],
  help: Record<string, HelpMeta>,
  manual: Record<string, DocOverride>,
  notes: Record<string, DspNote>,
): DocEntry[] {
  return specs.map((spec) => {
    const h = help[spec.name];
    const m = manual[spec.name];
    const summary = m?.summary ?? h?.summary ?? "";
    const category = m?.category ?? h?.category ?? UNCATEGORIZED;
    // DSP detail precedence: an AI note (distill/from-source) wins; otherwise the
    // cleaned help Description (the "mechanical" UGens); otherwise nothing.
    const detail = (notes[spec.name]?.note ?? h?.description ?? "").trim();
    return {
      name: spec.name,
      summary,
      category,
      topBucket: topBucketOf(category),
      signatures: signatures(spec),
      detail,
    };
  });
}

function renderEntry(e: DocEntry): string {
  const head = e.summary ? `### ${e.name} — ${e.summary}` : `### ${e.name}`;
  const sigs = e.signatures.map((s) => "- `" + s + "`").join("\n");
  // Collapse the detail to a single block-quoted paragraph so entries stay scannable.
  const detail = e.detail ? `\n\n> ${e.detail.replace(/\n+/g, " ")}` : "";
  return `${head}\n${sigs}${detail}\n`;
}

function renderBucketFile(bucket: string, entries: DocEntry[]): string {
  // Group by full category path, paths sorted, entries sorted by name.
  const byPath = new Map<string, DocEntry[]>();
  for (const e of entries) {
    const arr = byPath.get(e.category) ?? [];
    arr.push(e);
    byPath.set(e.category, arr);
  }
  const paths = [...byPath.keys()].sort();

  let out = `# ${bucket}\n\n`;
  out += `_${entries.length} UGen${entries.length === 1 ? "" : "s"}. Generated from SuperCollider help files — do not edit by hand._\n`;
  for (const path of paths) {
    const items = byPath.get(path)!.sort((a, b) => a.name.localeCompare(b.name));
    // Only print a sub-header when there's a meaningful sub-path under the bucket.
    const subPath = path.replace(/^UGens>/, "").replace(new RegExp(`^${bucket}>?`), "").trim();
    if (subPath) out += `\n## ${bucket} › ${subPath.replace(/>/g, " › ")}\n\n`;
    else out += `\n`;
    out += items.map(renderEntry).join("\n");
  }
  return out;
}

function renderIndex(entries: DocEntry[], buckets: Map<string, DocEntry[]>): string {
  const sortedBuckets = [...buckets.entries()].sort((a, b) => b[1].length - a[1].length);

  let out = `# SuperCollider UGen Reference (synthdefTS)\n\n`;
  out += `Signatures + one-line summaries for the ${entries.length} UGens exposed by synthdefTS, grouped by SuperCollider category. Summaries are lifted verbatim from the SC help files. **Generated — do not edit by hand.**\n\n`;

  out += `## How to call a UGen\n\n`;
  out += "Each UGen is an object with rate methods (`ar` audio, `kr` control, `ir` init, `new` demand). Every method takes a single **named-parameter object**; every parameter has a default, so you only pass what you change. Defaults are shown in each signature below.\n\n";
  out += "```ts\n";
  out += `import { synthDef, kr } from "../src/graph/builder.ts";\n`;
  out += `import { SinOsc, Out } from "../src/ugens/generated.ts";\n\n`;
  out += `const def = synthDef(\n`;
  out += `  "mySine",\n`;
  out += `  { freq: kr(440), amp: kr(0.3) },        // synth parameters\n`;
  out += `  (p) => {\n`;
  out += `    const sig = SinOsc.ar({ freq: p.freq, mul: p.amp });\n`;
  out += `    Out.ar({ bus: 0, channelsArray: sig });\n`;
  out += `  },\n`;
  out += `);\n`;
  out += "```\n\n";
  out += "- Pass an **array** for any parameter to trigger multichannel expansion (returns an array of outputs).\n";
  out += "- `mul` / `add` scale and offset the output (`signal * mul + add`).\n\n";

  out += `## Categories\n\n`;
  for (const [bucket, items] of sortedBuckets) {
    out += `- [${bucket}](./${slug(bucket)}.md) — ${items.length}\n`;
  }

  out += `\n## All UGens (A–Z)\n\n`;
  out += `| UGen | Category | Summary |\n|---|---|---|\n`;
  for (const e of [...entries].sort((a, b) => a.name.localeCompare(b.name))) {
    const summary = e.summary.replace(/\|/g, "\\|");
    out += `| [\`${e.name}\`](./${slug(e.topBucket)}.md) | ${e.topBucket} | ${summary} |\n`;
  }
  return out;
}

/**
 * Generate the full reference as a map of relative file path -> markdown.
 * Caller decides where to write it.
 */
export function generateDocs(
  parsed: ParsedSpec,
  overrides: Overrides,
  help: Record<string, HelpMeta>,
  manual: Record<string, DocOverride>,
  notes: Record<string, DspNote> = {},
): Map<string, string> {
  const specs = selectUgenSpecs(parsed, overrides);
  const entries = buildEntries(specs, help, manual, notes);

  const buckets = new Map<string, DocEntry[]>();
  for (const e of entries) {
    const arr = buckets.get(e.topBucket) ?? [];
    arr.push(e);
    buckets.set(e.topBucket, arr);
  }

  const files = new Map<string, string>();
  files.set("index.md", renderIndex(entries, buckets));
  for (const [bucket, items] of buckets) {
    files.set(`${slug(bucket)}.md`, renderBucketFile(bucket, items));
  }
  return files;
}
