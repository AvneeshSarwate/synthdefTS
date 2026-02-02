import { parseScDirectory } from "./parse-sc.ts";
import { generateModule } from "./generate.ts";

const rootArg = Deno.args.find((arg) => arg.startsWith("--sc-path="));
const outArg = Deno.args.find((arg) => arg.startsWith("--out="));
const overridesArg = Deno.args.find((arg) => arg.startsWith("--overrides="));

const scPath = rootArg ? rootArg.split("=")[1] : "./supercollider/SCClassLibrary/Common/Audio";
const outPath = outArg ? outArg.split("=")[1] : "./src/ugens/generated.ts";
const overridesPath = overridesArg ? overridesArg.split("=")[1] : "./codegen/overrides.json";

const overrides = JSON.parse(await Deno.readTextFile(overridesPath));
const parsed = await parseScDirectory(scPath);
const moduleText = generateModule(parsed, overrides);

await Deno.writeTextFile(outPath, moduleText);
console.log(`Generated ${outPath}`);
