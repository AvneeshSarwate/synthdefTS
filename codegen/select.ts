// Shared UGen-spec selection used by BOTH the typing generator (generate.ts)
// and the reference-doc generator (generate-docs.ts), so the documented set can
// never drift from the typed set.

import { MethodSpec, ParsedSpec, ResolvedSpec } from "./parse-sc.ts";

export interface Overrides {
  exclude?: string[];
  custom?: Record<string, { kind: string }>;
}

function hasMethods(methods: Partial<Record<MethodSpec["rate"], MethodSpec>>): boolean {
  return Object.values(methods).some(Boolean);
}

/**
 * The canonical list of UGens we emit. Mirrors the filter in
 * generateModule() (generate.ts): real multiNew UGens, not excluded, with at
 * least one rate method. Sorted by name.
 */
export function selectUgenSpecs(parsed: ParsedSpec, overrides: Overrides = {}): ResolvedSpec[] {
  const exclude = new Set(overrides.exclude ?? []);
  return Object.values(parsed.resolved)
    .filter((spec) => spec.hasMultiNew)
    .filter((spec) => !exclude.has(spec.name))
    .filter((spec) => hasMethods(spec.methods))
    .sort((a, b) => a.name.localeCompare(b.name));
}
