// Triage process: decide, per UGen, whether its reference entry needs an
// AI-generated DSP summary and which source the AI should read.
//
// Routing (thresholds are mechanically configurable via CLI):
//   descLen in [sweetMin, sweetMax]  -> "mechanical"     use cleaned Description as-is, NO AI
//   descLen >  sweetMax              -> "ai-distill"     AI condenses the over-long Description
//   descLen <  sweetMin (too short)  -> simplicity gate:
//        simple   (few params, plain category, has summary) -> "keep-summary"  NO AI
//        not simple                                         -> "ai-from-source" AI reads the C++
//
// Output: codegen/doc-triage.json (manifest) + a human-readable report on stdout.

import { MethodSpec, ParsedSpec, ResolvedSpec } from "./parse-sc.ts";
import { Overrides, selectUgenSpecs } from "./select.ts";
import { extractHelpMeta, HelpMeta } from "./parse-help.ts";
import { buildCppMap } from "./cpp-map.ts";

export type Action = "mechanical" | "keep-summary" | "ai-distill" | "ai-from-source";

export interface TriageEntry {
  name: string;
  action: Action;
  descLen: number;
  paramCount: number;
  category: string;
  hasSummary: boolean;
  cppFile: string | null;
  /** For short ones: why the simplicity gate decided as it did. */
  note?: string;
}

export interface TriageConfig {
  sweetMin: number;
  sweetMax: number;
  simpleMaxParams: number;
}

// Categories where a thin doc usually hides non-trivial DSP — never treat as "simple".
const NONSIMPLE = /FFT|Demand|Granular|Chaotic|Physical|Analysis|Convolution|Ambisonic|Reverb|Dynamics/i;

function paramCount(spec: ResolvedSpec): number {
  let max = 0;
  for (const rate of Object.keys(spec.methods) as MethodSpec["rate"][]) {
    const m = spec.methods[rate];
    if (!m) continue;
    const n = m.params.filter((p) => p.name !== "mul" && p.name !== "add").length;
    if (n > max) max = n;
  }
  return max;
}

function classify(
  spec: ResolvedSpec,
  help: HelpMeta | undefined,
  manualSummary: boolean,
  cppFile: string | null,
  cfg: TriageConfig,
): TriageEntry {
  const descLen = help?.descLen ?? 0;
  const category = help?.category ?? "";
  const pc = paramCount(spec);
  const hasSummary = manualSummary || !!help?.summary;
  const base = { name: spec.name, descLen, paramCount: pc, category, hasSummary, cppFile };

  // Already hand-documented in manual-docs.json — nothing for the AI to do.
  if (manualSummary) {
    return { ...base, action: "keep-summary", note: "manual summary provided" };
  }

  if (descLen > cfg.sweetMax) {
    return { ...base, action: "ai-distill", note: `long description (${descLen} chars)` };
  }
  if (descLen >= cfg.sweetMin) {
    return { ...base, action: "mechanical", note: `sweet-spot description (${descLen} chars)` };
  }
  // Too short -> simplicity gate.
  const isSimple = hasSummary && pc <= cfg.simpleMaxParams && !NONSIMPLE.test(category);
  if (isSimple) {
    return { ...base, action: "keep-summary", note: `short & simple (${pc} params, ${category || "uncategorized"})` };
  }
  return {
    ...base,
    action: "ai-from-source",
    note: cppFile
      ? `thin docs (${descLen} chars) + ${pc} params / ${category || "uncategorized"} — read C++`
      : `thin docs, no C++ source found — read what exists`,
  };
}

export function triage(
  parsed: ParsedSpec,
  overrides: Overrides,
  help: Record<string, HelpMeta>,
  manualNames: Set<string>,
  cpp: Record<string, string>,
  cfg: TriageConfig,
): { config: TriageConfig; total: number; counts: Record<Action, number>; ugens: TriageEntry[] } {
  const specs = selectUgenSpecs(parsed, overrides);
  const ugens = specs.map((spec) =>
    classify(spec, help[spec.name], manualNames.has(spec.name), cpp[spec.name] ?? null, cfg)
  );
  const counts: Record<Action, number> = {
    "mechanical": 0,
    "keep-summary": 0,
    "ai-distill": 0,
    "ai-from-source": 0,
  };
  for (const u of ugens) counts[u.action]++;
  return { config: cfg, total: ugens.length, counts, ugens };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

if (import.meta.main) {
  const { parseScDirectory } = await import("./parse-sc.ts");

  const arg = (name: string, fallback: string) => {
    const f = Deno.args.find((a) => a.startsWith(`--${name}=`));
    return f ? f.split("=").slice(1).join("=") : fallback;
  };
  const num = (name: string, fallback: number) => {
    const v = arg(name, "");
    return v ? Number(v) : fallback;
  };

  const scPath = arg("sc-path", "./supercollider/SCClassLibrary/Common/Audio");
  const helpPath = arg("help-path", "./supercollider/HelpSource/Classes");
  const pluginPath = arg("plugin-path", "./supercollider/server/plugins");
  const overridesPath = arg("overrides", "./codegen/overrides.json");
  const manualPath = arg("manual", "./codegen/manual-docs.json");
  const outPath = arg("out", "./codegen/doc-triage.json");
  const cfg: TriageConfig = {
    // Calibrated against real cleaned descriptions: ~100+ chars is usually an
    // adequate DSP explanation (e.g. Klang@142, PitchShift@148, Latch@97), so
    // only genuinely thin descriptions fall through to the simplicity gate.
    sweetMin: num("sweet-min", 100),
    sweetMax: num("sweet-max", 700),
    simpleMaxParams: num("simple-max-params", 2),
  };

  const overrides = JSON.parse(await Deno.readTextFile(overridesPath));
  const rawManual = JSON.parse(await Deno.readTextFile(manualPath));
  const manualNames = new Set(Object.keys(rawManual).filter((k) => !k.startsWith("_")));

  const parsed = await parseScDirectory(scPath);
  const help = await extractHelpMeta(helpPath);
  const cpp = await buildCppMap(pluginPath);

  const result = triage(parsed, overrides, help, manualNames, cpp, cfg);
  await Deno.writeTextFile(outPath, JSON.stringify(result, null, 2));

  // Report
  const c = result.counts;
  console.log(`Triage of ${result.total} UGens  (sweet-spot ${cfg.sweetMin}-${cfg.sweetMax} chars, simple<=${cfg.simpleMaxParams} params)`);
  console.log(`  mechanical (use Description as-is, no AI) : ${c["mechanical"]}`);
  console.log(`  keep-summary (short & simple, no AI)      : ${c["keep-summary"]}`);
  console.log(`  ai-distill (condense long Description)    : ${c["ai-distill"]}`);
  console.log(`  ai-from-source (read C++)                 : ${c["ai-from-source"]}`);
  const aiTotal = c["ai-distill"] + c["ai-from-source"];
  console.log(`  => ${aiTotal} need AI (${Math.round((aiTotal / result.total) * 100)}%), ${result.total - aiTotal} fully mechanical`);
  const noCpp = result.ugens.filter((u) => u.action === "ai-from-source" && !u.cppFile);
  if (noCpp.length) console.log(`  (note: ${noCpp.length} ai-from-source have no C++ file: ${noCpp.map((u) => u.name).join(", ")})`);
  console.log(`\nManifest -> ${outPath}`);
}
