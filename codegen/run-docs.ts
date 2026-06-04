// Entry point for the UGen reference-doc generator. Reuses the same SC parse as
// the typing generator, so the documented set stays in lockstep with the types.
//
//   deno task codegen:docs
//   deno run --allow-read --allow-write codegen/run-docs.ts \
//     --sc-path=./supercollider/SCClassLibrary/Common/Audio \
//     --help-path=./supercollider/HelpSource/Classes \
//     --overrides=./codegen/overrides.json \
//     --manual=./codegen/manual-docs.json \
//     --out=./ugen-reference

import { parseScDirectory } from "./parse-sc.ts";
import { extractHelpMeta } from "./parse-help.ts";
import { DocOverride, generateDocs } from "./generate-docs.ts";

function arg(name: string, fallback: string): string {
  const found = Deno.args.find((a) => a.startsWith(`--${name}=`));
  return found ? found.split("=").slice(1).join("=") : fallback;
}

const scPath = arg("sc-path", "./supercollider/SCClassLibrary/Common/Audio");
const helpPath = arg("help-path", "./supercollider/HelpSource/Classes");
const overridesPath = arg("overrides", "./codegen/overrides.json");
const manualPath = arg("manual", "./codegen/manual-docs.json");
const notesPath = arg("notes", "./codegen/ugen-dsp-notes.json");
const outDir = arg("out", "./ugen-reference");

const overrides = JSON.parse(await Deno.readTextFile(overridesPath));

const rawManual = JSON.parse(await Deno.readTextFile(manualPath));
const manual: Record<string, DocOverride> = {};
for (const [key, value] of Object.entries(rawManual)) {
  if (key.startsWith("_")) continue; // skip _comment etc.
  manual[key] = value as DocOverride;
}

// AI-generated DSP notes (optional — generated in batches via the dsp-notes workflow).
let notes: Record<string, { note: string }> = {};
try {
  notes = JSON.parse(await Deno.readTextFile(notesPath));
} catch {
  console.warn(`(no DSP notes at ${notesPath} — generating reference without them)`);
}

const parsed = await parseScDirectory(scPath);
const help = await extractHelpMeta(helpPath);
const files = generateDocs(parsed, overrides, help, manual, notes);

await Deno.mkdir(outDir, { recursive: true });
for (const [relPath, content] of files) {
  await Deno.writeTextFile(`${outDir}/${relPath}`, content);
}

const missing = [...files.keys()].length - 1; // minus index.md
console.log(`Wrote ${files.size} files to ${outDir}/ (index + ${missing} category files)`);
