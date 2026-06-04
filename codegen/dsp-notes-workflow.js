// Reusable workflow: generate + verify terse DSP reference notes for a BATCH of
// SuperCollider UGens. Driven in batches of ~10 from the main loop so results
// can be checkpointed to disk between batches (credit-out resilient).
//
// args: { items: [{name, action, cpp, schelp, category}], model?: string }
//   action "ai-distill"     -> read the .schelp Description and condense
//   action "ai-from-source" -> read the .cpp implementation and infer the DSP
// returns: [{ name, action, note, passedFirstTry, issues, confidence, grounded }]

export const meta = {
  name: 'ugen-dsp-notes',
  description: 'Generate + verify terse DSP reference notes for a batch of SuperCollider UGens (distill help docs or read C++ source)',
  phases: [
    { title: 'Generate', detail: 'one agent per UGen; distill reads .schelp, from-source reads .cpp' },
    { title: 'Verify', detail: 'adversarial check against the source for accuracy + terseness' },
  ],
}

const GEN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    dspNote: { type: 'string', description: '1-3 terse sentences, DSP-focused, for a synth designer' },
    grounded: { type: 'boolean', description: 'true if every claim is backed by the source read' },
    confidence: { type: 'string', enum: ['high', 'med', 'low'] },
  },
  required: ['name', 'dspNote', 'grounded', 'confidence'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ok: { type: 'boolean', description: 'true if the note is accurate, non-speculative, and terse' },
    finalNote: { type: 'string', description: 'the corrected note, or the original verbatim if ok' },
    issues: { type: 'string', description: 'short reason if not ok; empty if ok' },
  },
  required: ['ok', 'finalNote', 'issues'],
}

const STYLE = `Write a dense, authoritative DSP note (up to ~4 sentences, ~500 chars max) for a synth designer who already knows DSP. Include the synthesis/processing METHOD and, where it clarifies behavior, the actual difference equation / coefficient formulas, plus key behavioral characteristics and non-obvious parameter interactions or stability edge-cases. Drop citations, author credits, history, and "see also" cross-references. Plain prose (equations inline are fine), no markdown headers, no UGen-name prefix. Do NOT speculate beyond the source — accuracy matters more than brevity.`

let _a = args
if (typeof _a === 'string') _a = JSON.parse(_a)
const items = Array.isArray(_a) ? _a : (_a && _a.items)
if (!Array.isArray(items)) throw new Error('args did not resolve to an items array: ' + JSON.stringify(_a).slice(0, 200))
const MODEL = (_a && _a.model) || 'sonnet'

const results = await pipeline(
  items,
  // Stage 1: generate
  (it) => {
    const prompt = it.action === 'ai-distill'
      ? `Write a terse DSP reference note for the SuperCollider UGen ${it.name} (category ${it.category}).
Read its help doc at ${it.schelp} — it contains a full Description block. Condense the DSP-relevant content.
${STYLE}
Set grounded=true (the doc is authoritative). Return the note.`
      : `Write a terse DSP reference note for the SuperCollider UGen ${it.name} (category ${it.category}).
Its help doc is too thin, so read the C++ IMPLEMENTATION at ${it.cpp}. Use grep to find "${it.name}_Ctor" and the "${it.name}_next" function(s), and read them to infer what the UGen actually does. Also glance at ${it.schelp} for the one-line summary/naming context.
${STYLE}
Base every claim on the code you read. If the implementation is unclear, set confidence=low and grounded=false rather than guessing. Return the note.`
    return agent(prompt, { label: `gen:${it.name}`, phase: 'Generate', schema: GEN_SCHEMA, model: MODEL })
  },
  // Stage 2: verify against the source
  (gen, it) => {
    if (!gen) return null
    const src = it.action === 'ai-distill' ? it.schelp : `${it.cpp} (and ${it.schelp} for context)`
    return agent(
      `Verify this DSP note for the SuperCollider UGen ${it.name}:

"${gen.dspNote}"

Check it against the source: ${src}. It must be (a) accurate to the source, (b) non-speculative (every claim — especially equations/coefficients — backed by the code), (c) reasonably contained: <=4 sentences and roughly <=500 characters, (d) useful to a synth designer (real DSP content, not vague filler). Prioritize accuracy: do NOT trim correct technical content just to shorten.
If it passes, return ok=true and finalNote = the note verbatim.
If it fails, return ok=false, a corrected finalNote that fixes the problems, and a short issues string.`,
      { label: `verify:${it.name}`, phase: 'Verify', schema: VERDICT_SCHEMA, model: MODEL },
    ).then((v) => ({
      name: it.name,
      action: it.action,
      note: v.finalNote,
      passedFirstTry: v.ok,
      issues: v.issues,
      confidence: gen.confidence,
      grounded: gen.grounded,
    }))
  },
)

return results.filter(Boolean)
