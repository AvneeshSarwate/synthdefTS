// Batch driver for DSP-note generation. Provides credit-out resilience: the
// checkpoint file (ugen-dsp-notes.json) is the source of truth for "done", so
// re-running always resumes where it stopped.
//
//   deno run -A codegen/dsp-batch.ts next 10        # print workflow args for next 10 undone UGens
//   deno run -A codegen/dsp-batch.ts merge res.json # merge a batch result file into the checkpoint
//   deno run -A codegen/dsp-batch.ts status         # how many done / remaining

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const MANIFEST = `${ROOT}/codegen/doc-triage.json`;
const NOTES = `${ROOT}/codegen/ugen-dsp-notes.json`;
const HELP_DIR = `${ROOT}/supercollider/HelpSource/Classes`;

const AI_ACTIONS = new Set(["ai-distill", "ai-from-source"]);

function readJson(path: string, fallback: unknown) {
  try {
    return JSON.parse(Deno.readTextFileSync(path));
  } catch {
    return fallback;
  }
}

function abs(p: string | null): string | null {
  if (!p) return null;
  return p.startsWith("./") ? `${ROOT}/${p.slice(2)}` : p;
}

const manifest = readJson(MANIFEST, null) as { ugens: any[] } | null;
if (!manifest) {
  console.error(`No manifest at ${MANIFEST}. Run: deno task triage:docs`);
  Deno.exit(1);
}
const notes = readJson(NOTES, {}) as Record<string, unknown>;

const aiUgens = manifest.ugens.filter((u) => AI_ACTIONS.has(u.action));
const remaining = aiUgens.filter((u) => !(u.name in notes));

const cmd = Deno.args[0] ?? "status";

if (cmd === "status") {
  console.log(`AI UGens: ${aiUgens.length} total, ${aiUgens.length - remaining.length} done, ${remaining.length} remaining`);
} else if (cmd === "next") {
  const size = Number(Deno.args[1] ?? "10");
  const batch = remaining.slice(0, size).map((u) => ({
    name: u.name,
    action: u.action,
    category: u.category,
    cpp: abs(u.cppFile),
    schelp: `${HELP_DIR}/${u.name}.schelp`,
  }));
  console.log(JSON.stringify({ model: "sonnet", items: batch }, null, 1));
} else if (cmd === "merge") {
  const resPath = Deno.args[1];
  if (!resPath) {
    console.error("usage: dsp-batch.ts merge <results.json>");
    Deno.exit(1);
  }
  const batch = readJson(resPath, []) as any[];
  let added = 0;
  for (const r of batch) {
    if (!r || !r.name) continue;
    notes[r.name] = {
      note: r.note,
      confidence: r.confidence,
      grounded: r.grounded,
      passedFirstTry: r.passedFirstTry,
      source: r.action,
    };
    added++;
  }
  Deno.writeTextFileSync(NOTES, JSON.stringify(notes, null, 2));
  const done = aiUgens.filter((u) => u.name in notes).length;
  console.log(`Merged ${added} notes. Progress: ${done}/${aiUgens.length} (${aiUgens.length - done} remaining).`);
} else {
  console.error(`unknown command: ${cmd}`);
  Deno.exit(1);
}
