// Mechanically pulls the existing `summary::`, `categories::` and `Description::`
// content out of the SuperCollider SCDoc help files (HelpSource/Classes/*.schelp).
// summary/category are authoritative one-liners; the description is cleaned of
// SCDoc markup so its length is a usable signal for doc-triage.

export interface HelpMeta {
  /** First-line summary from the `summary::` tag. */
  summary: string;
  /** First category path from the `categories::` tag, e.g. "UGens>Filters>Linear". */
  category: string;
  /** Markup-stripped Description:: block (may be empty). */
  description: string;
  /** Character length of the cleaned description — the primary triage signal. */
  descLen: number;
}

function matchTag(text: string, tag: string): string {
  const re = new RegExp(`^[ \\t]*${tag}::[ \\t]*(.+?)[ \\t]*$`, "im");
  const m = text.match(re);
  return m ? m[1].trim() : "";
}

// Section keywords that terminate the Description:: block.
const DESC_END = /^[ \t]*(classmethods|instancemethods|examples|method|argument|returns|discussion)::/im;

function extractDescriptionRaw(text: string): string {
  const m = text.match(/^[ \t]*description::[ \t]*/im);
  if (!m) return "";
  const start = m.index! + m[0].length;
  const rest = text.slice(start);
  const end = rest.match(DESC_END);
  return (end ? rest.slice(0, end.index) : rest).trim();
}

/** Strip the common SCDoc inline/block markup down to readable prose. */
export function cleanScDoc(s: string): string {
  s = s.replace(/\r/g, "");
  // Drop footnotes entirely — they're asides, not core description.
  s = s.replace(/footnote::[\s\S]*?::/g, "");
  // link::Classes/Foo:: / link::Foo#bar:: -> last meaningful segment.
  s = s.replace(/link::([^:]*?)::/g, (_m, p: string) => {
    const seg = p.split(/[#/]/).map((x) => x.trim()).filter(Boolean).pop() ?? "";
    return seg;
  });
  // Inline formatting tags -> keep inner text.
  s = s.replace(/(?:code|teletype|emphasis|strong|soft|math|image)::([\s\S]*?)::/g, "$1");
  // list:: ## a ## b :: -> "a; b".
  s = s.replace(/list::([\s\S]*?)::/g, (_m, b: string) =>
    b.split("##").map((x) => x.trim()).filter(Boolean).join("; "));
  // (sub)section:: Title -> just the title line.
  s = s.replace(/^[ \t]*(?:sub)?section::[ \t]*/gim, "");
  // Bare marker tags with no payload braces.
  s = s.replace(/\b(?:warning|note|definitionlist|tableofcontents)::/g, "");
  // Collapse whitespace.
  s = s.replace(/[ \t]+/g, " ").replace(/ ?\n ?/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return s;
}

/** Read every `<Name>.schelp` in `helpDir` and extract summary + category + description. */
export async function extractHelpMeta(helpDir: string): Promise<Record<string, HelpMeta>> {
  const out: Record<string, HelpMeta> = {};
  for await (const entry of Deno.readDir(helpDir)) {
    if (!entry.isFile || !entry.name.endsWith(".schelp")) continue;
    const name = entry.name.replace(/\.schelp$/, "");
    const text = await Deno.readTextFile(`${helpDir}/${entry.name}`);
    const summary = matchTag(text, "summary");
    const category = matchTag(text, "categories").split(",")[0].trim();
    const description = cleanScDoc(extractDescriptionRaw(text));
    if (summary || category || description) {
      out[name] = { summary, category, description, descLen: description.length };
    }
  }
  return out;
}
