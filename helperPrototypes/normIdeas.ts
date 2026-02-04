/**
 * MixNorm Helper Prototypes
 *
 * This file contains several design variations for a MixNorm helper that mixes
 * multiple signals with configurable normalization. Each approach has different
 * tradeoffs in terms of API ergonomics, type safety, and flexibility.
 *
 * Key concepts from the codebase:
 * - UGenInput: number | UGenOutput (can be a constant or a UGen output)
 * - UGenOutput: { ugen: UGenNode, outputIndex: number, rate: Rate }
 * - Operators like add() and mul() handle both numbers and UGenOutputs
 * - They also have optimizations for identity values (add 0, mul 1)
 */
// deno-lint-ignore-file no-unused-vars

import { UGenInput, UGenOutput, Rate } from "../src/graph/types.ts";
import { add, mul, div, sqrt, clip2 } from "../src/ugens/ops.ts";
import { SinOsc, Saw, Out, EnvGen, WhiteNoise, LPF } from "../src/ugens/generated.ts";
import { synthDef, kr } from "../src/graph/builder.ts";
import { perc } from "../src/ugens/envelope.ts";

// =============================================================================
// VARIATION 1: Simple Functions with String Literal Normalization Type
// =============================================================================
/**
 * Approach: Three separate functions - mixNorm with a type parameter,
 * plus convenience aliases.
 *
 * PROS:
 * - Simple, functional API that follows TypeScript conventions
 * - Type-safe normalization parameter using string literal union
 * - Easy to use with autocomplete support
 * - Follows the pattern of ops.ts (simple functions)
 *
 * CONS:
 * - Multiple function calls for chained operations would create intermediate values
 * - Less discoverable than a namespace/class approach
 * - String literals are slightly less robust than enums
 */

export type NormalizationType = "none" | "linear" | "sqrt";

/**
 * Mix multiple signals with configurable normalization.
 *
 * @param signals - Array of signals to mix (UGenInput[])
 * @param normalization - How to normalize: "none", "linear" (divide by n), or "sqrt" (divide by sqrt(n))
 * @returns The mixed signal, or 0 if the array is empty
 *
 * @example
 * // Mix 4 oscillators with sqrt normalization (common for audio)
 * const osc1 = SinOsc.ar({ freq: 440 });
 * const osc2 = SinOsc.ar({ freq: 550 });
 * const osc3 = SinOsc.ar({ freq: 660 });
 * const osc4 = SinOsc.ar({ freq: 770 });
 * const mixed = mixNorm([osc1, osc2, osc3, osc4], "sqrt");
 */
export function mixNorm(signals: UGenInput[], normalization: NormalizationType = "none"): UGenInput {
  const n = signals.length;

  // Edge case: empty array returns silence (0)
  if (n === 0) {
    return 0;
  }

  // Edge case: single element needs no mixing
  if (n === 1) {
    // Still apply normalization for consistency
    // (though dividing by 1 or sqrt(1) is a no-op)
    return signals[0];
  }

  // Sum all signals using reduce with the add operator
  // The add() function handles UGenInput types and optimizes for zeros
  const sum = signals.reduce((acc, signal) => add(acc, signal));

  // Apply normalization
  switch (normalization) {
    case "none":
      return sum;
    case "linear":
      return div(sum, n);
    case "sqrt":
      return div(sum, Math.sqrt(n));
  }
}

/**
 * Convenience function: Mix with linear normalization (divide by n)
 */
export function mixLinear(signals: UGenInput[]): UGenInput {
  return mixNorm(signals, "linear");
}

/**
 * Convenience function: Mix with sqrt normalization (divide by sqrt(n))
 * This is often preferred for audio as it maintains perceived loudness.
 */
export function mixSqrt(signals: UGenInput[]): UGenInput {
  return mixNorm(signals, "sqrt");
}

/**
 * Convenience function: Mix without normalization (just sum)
 */
export function mix(signals: UGenInput[]): UGenInput {
  return mixNorm(signals, "none");
}

// ---------------------------------------------------------------------------
// VARIATION 1: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation1Example = synthDef("mixV1", { amp: kr(0.5) }, (p) => {
  // Create 4 oscillators at different frequencies
  const osc1 = SinOsc.ar({ freq: 220 });
  const osc2 = SinOsc.ar({ freq: 330 });
  const osc3 = SinOsc.ar({ freq: 440 });
  const osc4 = SinOsc.ar({ freq: 550 });

  // Mix with sqrt normalization using the simple function API
  const mixed = mixNorm([osc1, osc2, osc3, osc4], "sqrt");

  // Or use the convenience alias
  const mixedAlt = mixSqrt([osc1, osc2, osc3, osc4]);

  // Apply amplitude and output
  const sig = mul(mixed, p.amp);
  Out.ar({ bus: 0, channelsArray: [sig, sig] });
});


// =============================================================================
// VARIATION 2: Namespace/Object with Static Methods (UGen-style)
// =============================================================================
/**
 * Approach: A namespace object with static methods, mimicking the pattern
 * used by generated UGens (e.g., SinOsc.ar(), AllpassC.kr())
 *
 * PROS:
 * - Consistent with UGen API style in the codebase
 * - All related functionality grouped under one name
 * - Clear discoverability (Mix. triggers autocomplete)
 * - Methods can be rate-aware if needed (ar/kr variants)
 *
 * CONS:
 * - Slightly more verbose than simple functions
 * - The object pattern with 'as unknown as Type' is a bit awkward
 * - May be overkill for a simple helper
 */

export enum Normalization {
  None = 0,
  Linear = 1,
  Sqrt = 2,
}

interface MixType {
  /** Mix signals without normalization (just sum) */
  sum(signals: UGenInput[]): UGenInput;

  /** Mix signals with specified normalization */
  norm(signals: UGenInput[], normalization: Normalization): UGenInput;

  /** Mix signals with linear normalization (divide by n) */
  linear(signals: UGenInput[]): UGenInput;

  /** Mix signals with sqrt normalization (divide by sqrt(n)) */
  sqrt(signals: UGenInput[]): UGenInput;

  /** Mix signals and apply a custom scale factor */
  scaled(signals: UGenInput[], scale: UGenInput): UGenInput;
}

/**
 * Mix helper namespace with multiple mixing strategies.
 *
 * @example
 * // Various ways to mix signals
 * const mixed1 = Mix.sum([sig1, sig2, sig3]);           // No normalization
 * const mixed2 = Mix.linear([sig1, sig2, sig3]);        // Divide by 3
 * const mixed3 = Mix.sqrt([sig1, sig2, sig3]);          // Divide by sqrt(3)
 * const mixed4 = Mix.norm([sig1, sig2], Normalization.Linear);
 * const mixed5 = Mix.scaled([sig1, sig2], 0.5);         // Custom scaling
 */
export const Mix = {
  sum(signals: UGenInput[]): UGenInput {
    if (signals.length === 0) return 0;
    if (signals.length === 1) return signals[0];
    return signals.reduce((acc, signal) => add(acc, signal));
  },

  norm(signals: UGenInput[], normalization: Normalization): UGenInput {
    const summed = Mix.sum(signals);
    const n = signals.length;

    if (n <= 1) return summed;

    switch (normalization) {
      case Normalization.None:
        return summed;
      case Normalization.Linear:
        return div(summed, n);
      case Normalization.Sqrt:
        return div(summed, Math.sqrt(n));
    }
  },

  linear(signals: UGenInput[]): UGenInput {
    return Mix.norm(signals, Normalization.Linear);
  },

  sqrt(signals: UGenInput[]): UGenInput {
    return Mix.norm(signals, Normalization.Sqrt);
  },

  scaled(signals: UGenInput[], scale: UGenInput): UGenInput {
    const summed = Mix.sum(signals);
    return mul(summed, scale);
  },
} as unknown as MixType;

// ---------------------------------------------------------------------------
// VARIATION 2: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation2Example = synthDef("mixV2", { amp: kr(0.5) }, (p) => {
  // Create oscillators - mix of different waveforms
  const sine = SinOsc.ar({ freq: 220 });
  const saw = Saw.ar({ freq: 220 });
  const noise = mul(WhiteNoise.ar({}), 0.3);

  // Use the namespace API - consistent with UGen style
  const mixedSum = Mix.sum([sine, saw, noise]);           // No normalization
  const mixedLinear = Mix.linear([sine, saw, noise]);     // Divide by 3
  const mixedSqrt = Mix.sqrt([sine, saw, noise]);         // Divide by sqrt(3)

  // Using enum for explicit normalization type
  const mixedWithEnum = Mix.norm([sine, saw], Normalization.Linear);

  // Using dynamic scale (e.g., envelope-controlled)
  const env = EnvGen.kr({ envelope: perc({ attack: 0.01, release: 0.5 }), doneAction: 2 });
  const mixedScaled = Mix.scaled([sine, saw], env);

  Out.ar({ bus: 0, channelsArray: [mixedSqrt, mixedSqrt] });
});


// =============================================================================
// VARIATION 3: Builder Pattern with Method Chaining
// =============================================================================
/**
 * Approach: A fluent builder that allows chaining configuration before
 * producing the final output.
 *
 * PROS:
 * - Very flexible and extensible
 * - Clear separation of configuration and execution
 * - Can add more options without changing the API
 * - Self-documenting code through method names
 *
 * CONS:
 * - More verbose for simple cases
 * - Creates intermediate objects (though minimal overhead)
 * - Less idiomatic for this codebase
 * - Requires calling .build() or similar to get result
 */

export class MixBuilder {
  private signals: UGenInput[];
  private normType: NormalizationType = "none";
  private customScale: UGenInput | null = null;
  private preGain: UGenInput = 1;

  constructor(signals: UGenInput[]) {
    this.signals = signals;
  }

  /**
   * Create a new MixBuilder with the given signals.
   *
   * @example
   * const result = MixBuilder.from([sig1, sig2, sig3])
   *   .normalized("sqrt")
   *   .build();
   */
  static from(signals: UGenInput[]): MixBuilder {
    return new MixBuilder(signals);
  }

  /** Set normalization to linear (divide by n) */
  linear(): MixBuilder {
    this.normType = "linear";
    this.customScale = null;
    return this;
  }

  /** Set normalization to sqrt (divide by sqrt(n)) */
  sqrt(): MixBuilder {
    this.normType = "sqrt";
    this.customScale = null;
    return this;
  }

  /** Set a specific normalization type */
  normalized(type: NormalizationType): MixBuilder {
    this.normType = type;
    this.customScale = null;
    return this;
  }

  /** Apply a custom scale factor instead of automatic normalization */
  scaled(scale: UGenInput): MixBuilder {
    this.customScale = scale;
    return this;
  }

  /** Apply a gain to each signal before mixing */
  withPreGain(gain: UGenInput): MixBuilder {
    this.preGain = gain;
    return this;
  }

  /** Build and return the mixed signal */
  build(): UGenInput {
    const n = this.signals.length;

    if (n === 0) return 0;

    // Apply pre-gain if set
    let processedSignals = this.signals;
    if (this.preGain !== 1) {
      processedSignals = this.signals.map(s => mul(s, this.preGain));
    }

    if (n === 1) return processedSignals[0];

    const sum = processedSignals.reduce((acc, signal) => add(acc, signal));

    // Apply custom scale if set
    if (this.customScale !== null) {
      return mul(sum, this.customScale);
    }

    // Apply normalization
    switch (this.normType) {
      case "none":
        return sum;
      case "linear":
        return div(sum, n);
      case "sqrt":
        return div(sum, Math.sqrt(n));
    }
  }
}

// ---------------------------------------------------------------------------
// VARIATION 3: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation3Example = synthDef("mixV3", { amp: kr(0.5), brightness: kr(1000) }, (p) => {
  // Create multiple filtered noise sources
  const noise1 = LPF.ar({ in: WhiteNoise.ar({}), freq: 500 });
  const noise2 = LPF.ar({ in: WhiteNoise.ar({}), freq: 1000 });
  const noise3 = LPF.ar({ in: WhiteNoise.ar({}), freq: 2000 });
  const noise4 = LPF.ar({ in: WhiteNoise.ar({}), freq: 4000 });

  // Builder pattern - very readable chain
  const mixed = MixBuilder.from([noise1, noise2, noise3, noise4])
    .sqrt()                    // Use sqrt normalization
    .withPreGain(0.8)          // Apply 0.8 gain to each before mixing
    .build();

  // Or with custom scale instead of normalization
  const mixedCustom = MixBuilder.from([noise1, noise2])
    .scaled(0.25)              // Just multiply by 0.25
    .build();

  // Or linear normalization
  const mixedLinear = MixBuilder.from([noise1, noise2, noise3])
    .linear()
    .build();

  const sig = mul(mixed, p.amp);
  Out.ar({ bus: 0, channelsArray: [sig, sig] });
});


// =============================================================================
// VARIATION 4: Overloaded Function with Options Object
// =============================================================================
/**
 * Approach: A single function with an optional configuration object,
 * similar to how many UGens accept parameters.
 *
 * PROS:
 * - Very flexible with a clean default case
 * - Follows the UGen parameter pattern (e.g., SinOsc.ar({ freq: 440 }))
 * - Easy to add new options without breaking existing code
 * - Good for optional parameters with sensible defaults
 *
 * CONS:
 * - Options object is slightly more verbose than positional args for simple cases
 * - Type definitions can get complex with many optional fields
 */

export interface MixOptions {
  /**
   * Normalization type: "none", "linear", or "sqrt"
   * @default "none"
   */
  normalization?: NormalizationType;

  /**
   * Custom scale factor to apply after summing (overrides normalization)
   * Can be a number or a UGenOutput for dynamic scaling
   */
  scale?: UGenInput;

  /**
   * Gain to apply to each signal before mixing
   * @default 1
   */
  preGain?: UGenInput;

  /**
   * If true, clips the output to [-1, 1] range
   * Useful for preventing distortion
   * @default false
   */
  clip?: boolean;
}

/**
 * Mix multiple signals with optional configuration.
 *
 * @param signals - Array of signals to mix
 * @param options - Optional configuration object
 * @returns The mixed (and optionally normalized) signal
 *
 * @example
 * // Simple mix (no normalization)
 * const mixed1 = mixSignals([sig1, sig2, sig3]);
 *
 * // Mix with sqrt normalization
 * const mixed2 = mixSignals([sig1, sig2, sig3], { normalization: "sqrt" });
 *
 * // Mix with custom scale and pre-gain
 * const mixed3 = mixSignals([sig1, sig2], {
 *   scale: 0.5,
 *   preGain: envGen  // Use an envelope for dynamic pre-gain
 * });
 */
export function mixSignals(signals: UGenInput[], options: MixOptions = {}): UGenInput {
  const {
    normalization = "none",
    scale,
    preGain = 1,
    clip = false,
  } = options;

  const n = signals.length;

  if (n === 0) return 0;

  // Apply pre-gain if needed
  let processedSignals = signals;
  if (preGain !== 1) {
    processedSignals = signals.map(s => mul(s, preGain));
  }

  if (n === 1) {
    return clip ? clipSignal(processedSignals[0]) : processedSignals[0];
  }

  // Sum all signals
  let result = processedSignals.reduce((acc, signal) => add(acc, signal));

  // Apply scaling: custom scale takes precedence over normalization
  if (scale !== undefined) {
    result = mul(result, scale);
  } else {
    switch (normalization) {
      case "linear":
        result = div(result, n);
        break;
      case "sqrt":
        result = div(result, Math.sqrt(n));
        break;
      // "none" - no scaling needed
    }
  }

  // Apply clipping if requested
  if (clip) {
    result = clipSignal(result);
  }

  return result;
}

/**
 * Helper to clip a signal to [-1, 1] range.
 * Uses the clip2 binary operator from ops.ts.
 */
function clipSignal(signal: UGenInput): UGenInput {
  // clip2(a, b) clips 'a' to the range [-b, b]
  return clip2(signal, 1);
}

// ---------------------------------------------------------------------------
// VARIATION 4: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation4Example = synthDef("mixV4", { amp: kr(0.5), gate: kr(1) }, (p) => {
  // Create oscillators for an additive synth
  const fundamental = SinOsc.ar({ freq: 220 });
  const harmonic2 = mul(SinOsc.ar({ freq: 440 }), 0.5);
  const harmonic3 = mul(SinOsc.ar({ freq: 660 }), 0.33);
  const harmonic4 = mul(SinOsc.ar({ freq: 880 }), 0.25);
  const harmonic5 = mul(SinOsc.ar({ freq: 1100 }), 0.2);

  const harmonics = [fundamental, harmonic2, harmonic3, harmonic4, harmonic5];

  // Simple case - just sqrt normalization
  const mixed1 = mixSignals(harmonics, { normalization: "sqrt" });

  // With envelope as dynamic pre-gain
  const env = EnvGen.kr({ envelope: perc({ attack: 0.01, release: 1.0 }), doneAction: 2 });
  const mixed2 = mixSignals(harmonics, {
    normalization: "sqrt",
    preGain: env,  // Envelope controls each harmonic's level
  });

  // With clipping for safety
  const mixed3 = mixSignals(harmonics, {
    normalization: "none",  // Raw sum
    clip: true,             // But clip to [-1, 1]
  });

  // Custom scale factor
  const mixed4 = mixSignals(harmonics, {
    scale: 0.2,  // Custom scale overrides normalization
  });

  const sig = mul(mixed2, p.amp);
  Out.ar({ bus: 0, channelsArray: [sig, sig] });
});


// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/*
// Assuming we have some oscillator signals:
import { SinOsc, SawOsc, Out } from "./src/ugens/generated.ts";
import { synthDef } from "./src/graph/builder.ts";

// Example SynthDef using the different mix variations:

const exampleSynthDef = synthDef("mixExample", () => {
  // Create some test oscillators
  const freqs = [220, 330, 440, 550];
  const oscs = freqs.map(f => SinOsc.ar({ freq: f }));

  // VARIATION 1: Simple functions
  const mixed1 = mixNorm(oscs, "sqrt");
  const mixed1b = mixSqrt(oscs);  // Convenience alias

  // VARIATION 2: Namespace/Object
  const mixed2 = Mix.sqrt(oscs);
  const mixed2b = Mix.norm(oscs, Normalization.Linear);

  // VARIATION 3: Builder pattern
  const mixed3 = MixBuilder.from(oscs)
    .sqrt()
    .withPreGain(0.8)
    .build();

  // VARIATION 4: Options object
  const mixed4 = mixSignals(oscs, {
    normalization: "sqrt",
    preGain: 0.8,
  });

  // Output (using any of the mixed signals)
  Out.ar({ bus: 0, channelsArray: [mixed1, mixed1] });
});
*/


// =============================================================================
// COMPARISON SUMMARY
// =============================================================================

/*
VARIATION 1 (Simple Functions):
  - Best for: Simple use cases, minimal API surface
  - Style: Functional, matches ops.ts patterns
  - Flexibility: Medium
  - Verbosity: Low
  - Recommendation: Good default choice for this codebase

VARIATION 2 (Namespace/Object):
  - Best for: Consistency with UGen API patterns
  - Style: Object-oriented, matches generated.ts patterns
  - Flexibility: Medium
  - Verbosity: Low
  - Recommendation: Good if consistency with UGens is prioritized

VARIATION 3 (Builder Pattern):
  - Best for: Complex configurations, extensibility
  - Style: Fluent/Builder
  - Flexibility: High
  - Verbosity: Medium-High
  - Recommendation: Overkill for most use cases, but good for complex scenarios

VARIATION 4 (Options Object):
  - Best for: Many optional parameters, future extensibility
  - Style: Configuration object, matches UGen parameter patterns
  - Flexibility: High
  - Verbosity: Medium
  - Recommendation: Good balance of flexibility and usability

RECOMMENDED APPROACH:
For this codebase, I would recommend VARIATION 1 (Simple Functions) as the primary
API, possibly combined with elements of VARIATION 2 (the Mix namespace) for
discoverability. The simple functions follow the existing patterns in ops.ts,
while the namespace provides a nice grouping for IDE autocomplete.
*/
