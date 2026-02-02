i want to build a typescript wrapper for controlling scsynth - the supercollider synthesis engine. i want it to be typesafe, with typed interfaces for all of the built in ugens. For now, the syntax can be simple - ugens as functions/constructors (syntactically, any callables), with operators also expressed as functions that return nodes (since there is no operator overloading in typescript) 

you have the supercollider source code in the supercollider/ directory to look at

read the following references
- https://doc.sccode.org/Reference/Synth-Definition-File-Format.html
- https://doc.sccode.org/Reference/Server-Command-Reference.html
- https://doc.sccode.org/Classes/SynthDef.html

also, look at the overtone and supriya repositories, which are projects written in clojure and python, that also implement synth def building

also here are particular files of interest in the supercolldier repo

What the SC source repo gives you:
  - The definitive binary format spec (Synth-Definition-File-Format.schelp)
  - The server-side parser (SC_GraphDef.cpp) so you know exactly what scsynth expects
  - The sclang SynthDef compiler (SCClassLibrary/Common/Audio/SynthDef.sc) showing how graphs get compiled

explore all of the relevant repositories, make smart use of subagents (use a good mix of explore agent for fast search and info gather, and opus agents for deep parallel exploration of subtopics)

for files, you only need to search in the current directory and subdirectories

and give me an implementation plan - the plan should include important references in terms of source code entry points of note from the various repositories.

write it out to tsSynthDefPlan.md 