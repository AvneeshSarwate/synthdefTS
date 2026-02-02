# Excluded UGens (auto-generation)

These classes are intentionally excluded from `codegen` output because they are internal, non-server UGens, or have behaviors that are difficult to express in a generic parser without executing SC code.

## Internal / Non-user-facing
- `UGen`, `PureUGen`, `MultiOutUGen`, `PureMultiOutUGen` — base classes, not real server UGens.
- `AbstractIn`, `AbstractOut` — abstract helpers; not directly instantiable.
- `Control`, `AudioControl`, `TrigControl`, `LagControl` — internal control UGens created by the builder.
- `OutputProxy` — client-side proxy only, never serialized as a UGen.
- `MaxLocalBufs` — internal counter node used by `LocalBuf`.

## Special behavior (custom handling instead)
- `EnvGen` — requires envelope flattening into variable-length input list. Implemented via custom override.
- `IEnvGen` — requires `Env.asArrayForInterpolation` formatting and mul/add handling. Implemented via custom override.
- `SendReply` — converts a string to ASCII + custom input layout. Implemented via custom override.
- `SendPeakRMS` — flattens signal arrays + ASCII string encoding. Implemented via custom override.
- `LocalIn` — defaults are splatted into inputs, and numChannels drives output count. Implemented via custom override.
- `LocalBuf` — requires implicit `MaxLocalBufs` management in the builder. Implemented via custom override.
- `Poll` — requires ASCII label encoding and returns input (side-effect UGen). Implemented via custom override.
- `Dpoll` — requires ASCII label encoding for demand-rate polling. Implemented via custom override.
- `Dwrand` — extends weights list to match list size and inserts size before weights. Implemented via custom override.

If you add new exclusions, update `codegen/overrides.json` and this document.
