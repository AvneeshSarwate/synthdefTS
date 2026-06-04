// Mechanically maps each UGen name to the scsynth C++ plugin source file that
// implements it, by scanning for the `<Name>_Ctor` constructor symbol every
// plugin defines. Used to point the "read the C++ source" triage path at the
// right file.

export async function buildCppMap(pluginDir: string): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  for await (const entry of Deno.readDir(pluginDir)) {
    if (!entry.isFile || !entry.name.endsWith(".cpp")) continue;
    const text = await Deno.readTextFile(`${pluginDir}/${entry.name}`);
    for (const m of text.matchAll(/([A-Za-z_][A-Za-z0-9_]*)_Ctor\b/g)) {
      const name = m[1];
      // First file that defines the ctor wins (stable since readDir is sorted-ish;
      // ctor symbols are effectively unique per UGen anyway).
      if (!(name in map)) map[name] = `${pluginDir}/${entry.name}`;
    }
  }
  return map;
}
