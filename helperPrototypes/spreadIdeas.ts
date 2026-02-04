/**
 * Spread Oscillator Helper Prototypes
 *
 * This file contains several design variations for a "spread" oscillator helper
 * that creates "supersaw" or "unison" type sounds where multiple oscillators are
 * slightly detuned from each other.
 *
 * Key design decisions explored:
 * 1. How to pass the oscillator "type" - function reference, string, factory pattern
 * 2. How the spread parameter works - cents, ratio, Hz offset
 * 3. Should it return a pre-mixed signal or an array of oscillators
 * 4. How to handle stereo spreading (pan each voice differently)
 * 5. Integration with Mix/normalization helpers
 * 6. Different spread distributions: linear, exponential, random
 *
 * Real-world use cases:
 * - Supersaw synth pads (classic trance/EDM sound)
 * - String ensemble emulation (slightly detuned strings)
 * - Chorus effects (similar detuning concept)
 * - Thick bass sounds (detuned sub oscillators)
 */
// deno-lint-ignore-file no-case-declarations no-unused-vars

import { UGenInput, UGenOutput, Rate, Stereo } from "../src/graph/types.ts";
import { add, mul, div, sub, midiratio, pow } from "../src/ugens/ops.ts";
import { SinOsc, Saw, Pulse, LFSaw, Pan2, Out, EnvGen, LFNoise1 } from "../src/ugens/generated.ts";
import { synthDef, kr } from "../src/graph/builder.ts";
import { perc, asr } from "../src/ugens/envelope.ts";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Type representing an oscillator factory that can create audio-rate oscillators.
 * All standard SC3 oscillators have this shape: { ar({ freq, ...opts }) => UGenOutput }
 */
type OscillatorFactory = {
  ar(params: { freq?: UGenInput; [key: string]: UGenInput | undefined }): UGenOutput;
};

/**
 * Type for oscillators that also support phase (useful for some spread techniques)
 */
type PhasedOscillatorFactory = {
  ar(params: { freq?: UGenInput; phase?: UGenInput; [key: string]: UGenInput | undefined }): UGenOutput;
};

/**
 * Type for oscillators like Pulse that have a width parameter
 */
type PulseOscillatorFactory = {
  ar(params: { freq?: UGenInput; width?: UGenInput; [key: string]: UGenInput | undefined }): UGenOutput;
};

/**
 * Distribution types for how voices are spread across the detune range
 */
type SpreadDistribution = "linear" | "exponential" | "random" | "centered";

/**
 * Result type for spread functions that return separate voices
 */
interface SpreadVoices {
  /** Array of individual oscillator outputs */
  voices: UGenOutput[];
  /** Pre-calculated detune values (in cents or ratio depending on function) */
  detunes: number[];
}

/**
 * Result type for stereo spread functions
 */
interface StereoSpreadResult {
  /** Left channel (mixed) */
  left: UGenOutput;
  /** Right channel (mixed) */
  right: UGenOutput;
  /** Individual panned voices for further processing */
  voices: Stereo[];
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Generate detune offsets based on distribution type.
 * Returns an array of offset values centered around 0.
 *
 * @param n - Number of voices
 * @param distribution - How to distribute the voices
 * @returns Array of offset values from -1 to +1 (to be scaled by spread amount)
 */
function generateOffsets(n: number, distribution: SpreadDistribution): number[] {
  if (n === 1) return [0];

  const offsets: number[] = [];

  switch (distribution) {
    case "linear":
      // Evenly spaced from -1 to +1
      for (let i = 0; i < n; i++) {
        offsets.push((2 * i / (n - 1)) - 1);
      }
      break;

    case "exponential":
      // More voices clustered toward center
      for (let i = 0; i < n; i++) {
        const linear = (2 * i / (n - 1)) - 1;
        // Apply S-curve to cluster more voices near center
        offsets.push(Math.sign(linear) * Math.pow(Math.abs(linear), 0.5));
      }
      break;

    case "random":
      // Deterministic pseudo-random based on voice index
      // Using golden ratio subdivision for even-ish distribution
      const phi = (1 + Math.sqrt(5)) / 2;
      for (let i = 0; i < n; i++) {
        const val = ((i * phi) % 1) * 2 - 1;
        offsets.push(val);
      }
      break;

    case "centered":
      // Symmetric pairs around center, with center voice if odd
      const half = Math.floor(n / 2);
      for (let i = 0; i < n; i++) {
        if (n % 2 === 1 && i === half) {
          offsets.push(0); // Center voice
        } else if (i < half) {
          offsets.push(-(half - i) / half);
        } else {
          offsets.push((i - half) / half);
        }
      }
      break;
  }

  return offsets;
}

/**
 * Generate pan positions for stereo spreading.
 * Distributes voices across the stereo field.
 *
 * @param n - Number of voices
 * @param stereoWidth - 0 = mono, 1 = full stereo spread
 * @returns Array of pan positions from -1 to +1
 */
function generatePanPositions(n: number, stereoWidth: number): number[] {
  if (n === 1) return [0];

  const positions: number[] = [];
  for (let i = 0; i < n; i++) {
    // Spread from -stereoWidth to +stereoWidth
    const pos = ((2 * i / (n - 1)) - 1) * stereoWidth;
    positions.push(pos);
  }
  return positions;
}


// =============================================================================
// VARIATION 1: Function-Based with Factory Pattern
// =============================================================================
/**
 * Approach: Pass the oscillator as a factory function. The spread function
 * creates multiple instances with detuned frequencies.
 *
 * PROS:
 * - Type-safe: Factory type ensures oscillator has required interface
 * - Flexible: Works with any oscillator that has ar({ freq }) signature
 * - Explicit: Clear what's happening at the call site
 * - Composable: Easy to use with different oscillators
 *
 * CONS:
 * - Requires passing the oscillator as a value (not just the name)
 * - Can't easily pass oscillator-specific parameters (like Pulse width)
 * - Fixed at compile time - can't change oscillator type dynamically
 *
 * Best for: Quick prototyping, simple supersaw sounds
 */

/**
 * Create a spread/detuned oscillator bank using a factory function.
 *
 * @param osc - Oscillator factory (e.g., Saw, SinOsc)
 * @param n - Number of voices (fixed at synthDef creation time)
 * @param freq - Base frequency (can be UGenInput for modulation)
 * @param spread - Spread amount in cents (0 = unison, 100 = +/- 1 semitone)
 * @param distribution - How to distribute voices across the spread
 * @returns Object with mixed signal and individual voices
 *
 * @example
 * synthDef("supersaw", { freq: kr(440), spread: kr(25) }, (p) => {
 *   const result = spreadOsc(Saw, 7, p.freq, p.spread);
 *   const mixed = div(result.mixed, Math.sqrt(7)); // Normalize
 *   Out.ar({ bus: 0, channelsArray: [mixed, mixed] });
 * });
 */
export function spreadOsc(
  osc: OscillatorFactory,
  n: number,
  freq: UGenInput,
  spread: UGenInput, // in cents
  distribution: SpreadDistribution = "linear"
): { mixed: UGenOutput; voices: UGenOutput[] } {
  const offsets = generateOffsets(n, distribution);
  const voices: UGenOutput[] = [];

  for (let i = 0; i < n; i++) {
    // Convert cents offset to frequency ratio
    // cents to ratio: ratio = 2^(cents/1200)
    // But we need to do this with UGens for dynamic spread
    // offset * spread gives us cents, then convert to ratio
    const centsOffset = mul(offsets[i], spread);
    const ratio = midiratio(div(centsOffset, 100)); // midiratio works on semitones, cents/100
    const voiceFreq = mul(freq, ratio);

    voices.push(osc.ar({ freq: voiceFreq }) as UGenOutput);
  }

  // Mix all voices (sum without normalization - let user decide)
  const mixed = voices.reduce((acc, voice) => add(acc, voice)) as UGenOutput;

  return { mixed, voices };
}

/**
 * Convenience version that returns just the mixed signal with sqrt normalization.
 */
export function spreadOscMix(
  osc: OscillatorFactory,
  n: number,
  freq: UGenInput,
  spread: UGenInput,
  distribution: SpreadDistribution = "linear"
): UGenOutput {
  const { mixed } = spreadOsc(osc, n, freq, spread, distribution);
  return div(mixed, Math.sqrt(n)) as UGenOutput;
}

// ---------------------------------------------------------------------------
// VARIATION 1: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation1Example = synthDef(
  "spreadV1",
  { freq: kr(220), spread: kr(25), amp: kr(0.5) },
  (p) => {
    // Classic supersaw: 7 detuned saw waves
    const { mixed, voices } = spreadOsc(Saw, 7, p.freq, p.spread);

    // Normalize by sqrt(7) for balanced amplitude
    const normalized = div(mixed, Math.sqrt(7)) as UGenOutput;

    // Or use the convenience function
    const normalizedAlt = spreadOscMix(Saw, 7, p.freq, p.spread);

    // Apply envelope
    const env = EnvGen.kr({
      envelope: asr({ attack: 0.1, release: 0.5 }),
      gate: 1,
      doneAction: 2,
    });

    const sig = mul(mul(normalized, env), p.amp);
    Out.ar({ bus: 0, channelsArray: [sig, sig] });
  }
);


// =============================================================================
// VARIATION 2: Callback/Render Function Pattern
// =============================================================================
/**
 * Approach: Instead of passing an oscillator factory, pass a render function
 * that receives the detuned frequency and voice index. This gives full control
 * over what each voice produces.
 *
 * PROS:
 * - Maximum flexibility: Can do anything in the render function
 * - Supports oscillator-specific parameters (width, phase, etc.)
 * - Can vary parameters per-voice (different phases, widths)
 * - Works with complex oscillator chains
 *
 * CONS:
 * - More verbose at the call site
 * - Callback pattern less familiar to some users
 * - Type safety is harder (generic callback typing)
 *
 * Best for: Complex sounds, per-voice variation, advanced users
 */

/**
 * Create a spread oscillator bank using a render callback.
 *
 * @param n - Number of voices
 * @param freq - Base frequency
 * @param spread - Spread amount in cents
 * @param render - Callback to create each voice: (detuneFreq, index, offset) => UGenOutput
 * @param distribution - Voice distribution type
 * @returns Mixed signal and individual voices
 *
 * @example
 * // Supersaw with per-voice pulse width variation
 * const result = spreadRender(7, freq, spread, (voiceFreq, i, offset) => {
 *   const width = add(0.5, mul(offset, 0.2)); // Width varies -0.2 to +0.2 from center
 *   return Pulse.ar({ freq: voiceFreq, width });
 * });
 *
 * @example
 * // Phased sines for chorus-like effect
 * const result = spreadRender(5, freq, 15, (voiceFreq, i, offset) => {
 *   const phase = mul(offset, Math.PI * 0.5); // Spread phases
 *   return SinOsc.ar({ freq: voiceFreq, phase });
 * });
 */
export function spreadRender(
  n: number,
  freq: UGenInput,
  spread: UGenInput,
  render: (detuneFreq: UGenInput, index: number, offset: number) => UGenOutput,
  distribution: SpreadDistribution = "linear"
): { mixed: UGenOutput; voices: UGenOutput[] } {
  const offsets = generateOffsets(n, distribution);
  const voices: UGenOutput[] = [];

  for (let i = 0; i < n; i++) {
    const centsOffset = mul(offsets[i], spread);
    const ratio = midiratio(div(centsOffset, 100));
    const voiceFreq = mul(freq, ratio);

    voices.push(render(voiceFreq, i, offsets[i]));
  }

  const mixed = voices.reduce((acc, voice) => add(acc, voice)) as UGenOutput;

  return { mixed, voices };
}

/**
 * Variation that also provides the original frequency to the callback,
 * allowing manual detune control.
 */
export function spreadRenderAdvanced(
  n: number,
  freq: UGenInput,
  spread: UGenInput,
  render: (params: {
    baseFreq: UGenInput;
    detuneFreq: UGenInput;
    index: number;
    offset: number;
    centsOffset: UGenInput;
  }) => UGenOutput,
  distribution: SpreadDistribution = "linear"
): { mixed: UGenOutput; voices: UGenOutput[] } {
  const offsets = generateOffsets(n, distribution);
  const voices: UGenOutput[] = [];

  for (let i = 0; i < n; i++) {
    const centsOffset = mul(offsets[i], spread);
    const ratio = midiratio(div(centsOffset, 100));
    const detuneFreq = mul(freq, ratio);

    voices.push(render({
      baseFreq: freq,
      detuneFreq,
      index: i,
      offset: offsets[i],
      centsOffset,
    }));
  }

  const mixed = voices.reduce((acc, voice) => add(acc, voice)) as UGenOutput;

  return { mixed, voices };
}

// ---------------------------------------------------------------------------
// VARIATION 2: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation2Example = synthDef(
  "spreadV2",
  { freq: kr(220), spread: kr(25), amp: kr(0.5) },
  (p) => {
    // Per-voice pulse width variation - width spreads from 0.3 to 0.7
    const { mixed: pulseSpread } = spreadRender(
      7,
      p.freq,
      p.spread,
      (voiceFreq, _i, offset) => {
        // offset goes from -1 to +1, so width goes from 0.3 to 0.7
        const width = add(0.5, mul(offset, 0.2));
        return Pulse.ar({ freq: voiceFreq, width });
      }
    );

    // Phased sines - each voice has different starting phase
    const { mixed: phasedSines } = spreadRender(
      5,
      p.freq,
      15, // tighter spread for chorus effect
      (voiceFreq, _i, offset) => {
        const phase = mul(offset, Math.PI * 0.5);
        return SinOsc.ar({ freq: voiceFreq, phase });
      },
      "centered"
    );

    // Advanced: access to all parameters including cents offset
    const { mixed: advanced } = spreadRenderAdvanced(
      5,
      p.freq,
      p.spread,
      ({ detuneFreq, offset, centsOffset }) => {
        // Use centsOffset to modulate something else
        const brightness = add(1000, mul(centsOffset, 10)); // Filter freq varies
        const saw = Saw.ar({ freq: detuneFreq });
        // Note: Would use LPF here but keeping example simple
        return mul(saw, add(0.5, mul(offset, 0.3))) as UGenOutput;
      }
    );

    const normalized = div(pulseSpread, Math.sqrt(7)) as UGenOutput;
    const sig = mul(normalized, p.amp);
    Out.ar({ bus: 0, channelsArray: [sig, sig] });
  }
);


// =============================================================================
// VARIATION 3: Object/Namespace API with Options
// =============================================================================
/**
 * Approach: A namespace object with multiple methods for different use cases,
 * following the pattern established by generated UGens. Uses an options object
 * for configuration.
 *
 * PROS:
 * - Discoverable: Spread. triggers autocomplete
 * - Consistent with UGen API patterns (like SinOsc.ar)
 * - Options object allows easy extension
 * - Clear method names describe behavior
 *
 * CONS:
 * - More code to maintain
 * - Slightly more verbose for simple cases
 * - Namespace pattern with 'as unknown as Type' is awkward
 *
 * Best for: Library code, consistent API across helpers
 */

export interface SpreadOptions {
  /** Number of voices (default: 7 - classic supersaw) */
  n?: number;
  /** Spread amount in cents (default: 25) */
  spread?: UGenInput;
  /** Voice distribution type (default: "linear") */
  distribution?: SpreadDistribution;
  /** Stereo width for panning: 0 = mono, 1 = full (default: 0 = mono) */
  stereoWidth?: number;
  /** Normalization: "none" | "linear" | "sqrt" (default: "sqrt") */
  normalize?: "none" | "linear" | "sqrt";
}

interface SpreadType {
  /**
   * Create a supersaw (multiple detuned saw waves).
   * This is the most common use case for spread oscillators.
   */
  saw(freq: UGenInput, options?: SpreadOptions): UGenOutput;

  /**
   * Create spread sine waves (useful for pads).
   */
  sine(freq: UGenInput, options?: SpreadOptions): UGenOutput;

  /**
   * Create spread pulse waves with optional width.
   */
  pulse(freq: UGenInput, width: UGenInput, options?: SpreadOptions): UGenOutput;

  /**
   * Create spread oscillators with stereo output.
   * Returns a Stereo tuple [left, right].
   */
  sawStereo(freq: UGenInput, options?: SpreadOptions): Stereo;
  sineStereo(freq: UGenInput, options?: SpreadOptions): Stereo;

  /**
   * Generic spread with custom oscillator factory.
   */
  custom(osc: OscillatorFactory, freq: UGenInput, options?: SpreadOptions): UGenOutput;

  /**
   * Get individual voices without mixing (for custom processing).
   */
  voices(osc: OscillatorFactory, freq: UGenInput, options?: SpreadOptions): UGenOutput[];
}

const defaultOptions: Required<Omit<SpreadOptions, 'spread'>> & { spread: number } = {
  n: 7,
  spread: 25,
  distribution: "linear",
  stereoWidth: 0,
  normalize: "sqrt",
};

function applyNormalization(
  signal: UGenOutput,
  n: number,
  normalize: "none" | "linear" | "sqrt"
): UGenOutput {
  switch (normalize) {
    case "none":
      return signal;
    case "linear":
      return div(signal, n) as UGenOutput;
    case "sqrt":
      return div(signal, Math.sqrt(n)) as UGenOutput;
  }
}

function createSpreadVoices(
  osc: OscillatorFactory,
  freq: UGenInput,
  opts: Required<Omit<SpreadOptions, 'spread'>> & { spread: UGenInput }
): UGenOutput[] {
  const offsets = generateOffsets(opts.n, opts.distribution);
  const voices: UGenOutput[] = [];

  for (let i = 0; i < opts.n; i++) {
    const centsOffset = mul(offsets[i], opts.spread);
    const ratio = midiratio(div(centsOffset, 100));
    const voiceFreq = mul(freq, ratio);
    voices.push(osc.ar({ freq: voiceFreq }) as UGenOutput);
  }

  return voices;
}

function mixVoices(voices: UGenOutput[]): UGenOutput {
  return voices.reduce((acc, voice) => add(acc, voice)) as UGenOutput;
}

function createStereoSpread(
  osc: OscillatorFactory,
  freq: UGenInput,
  opts: Required<Omit<SpreadOptions, 'spread'>> & { spread: UGenInput }
): Stereo {
  const voices = createSpreadVoices(osc, freq, opts);
  const panPositions = generatePanPositions(opts.n, opts.stereoWidth || 1);

  let leftSum: UGenInput = 0;
  let rightSum: UGenInput = 0;

  for (let i = 0; i < voices.length; i++) {
    const panned = Pan2.ar({ in: voices[i], pos: panPositions[i] });
    leftSum = add(leftSum, panned[0]);
    rightSum = add(rightSum, panned[1]);
  }

  const left = applyNormalization(leftSum as UGenOutput, opts.n, opts.normalize);
  const right = applyNormalization(rightSum as UGenOutput, opts.n, opts.normalize);

  return [left, right];
}

export const Spread = {
  saw(freq: UGenInput, options: SpreadOptions = {}): UGenOutput {
    const opts = { ...defaultOptions, ...options };
    const voices = createSpreadVoices(Saw, freq, opts);
    const mixed = mixVoices(voices);
    return applyNormalization(mixed, opts.n, opts.normalize);
  },

  sine(freq: UGenInput, options: SpreadOptions = {}): UGenOutput {
    const opts = { ...defaultOptions, ...options };
    const voices = createSpreadVoices(SinOsc, freq, opts);
    const mixed = mixVoices(voices);
    return applyNormalization(mixed, opts.n, opts.normalize);
  },

  pulse(freq: UGenInput, width: UGenInput, options: SpreadOptions = {}): UGenOutput {
    const opts = { ...defaultOptions, ...options };
    const offsets = generateOffsets(opts.n, opts.distribution);
    const voices: UGenOutput[] = [];

    for (let i = 0; i < opts.n; i++) {
      const centsOffset = mul(offsets[i], opts.spread);
      const ratio = midiratio(div(centsOffset, 100));
      const voiceFreq = mul(freq, ratio);
      voices.push(Pulse.ar({ freq: voiceFreq, width }) as UGenOutput);
    }

    const mixed = mixVoices(voices);
    return applyNormalization(mixed, opts.n, opts.normalize);
  },

  sawStereo(freq: UGenInput, options: SpreadOptions = {}): Stereo {
    const opts = { ...defaultOptions, stereoWidth: 1, ...options };
    return createStereoSpread(Saw, freq, opts);
  },

  sineStereo(freq: UGenInput, options: SpreadOptions = {}): Stereo {
    const opts = { ...defaultOptions, stereoWidth: 1, ...options };
    return createStereoSpread(SinOsc, freq, opts);
  },

  custom(osc: OscillatorFactory, freq: UGenInput, options: SpreadOptions = {}): UGenOutput {
    const opts = { ...defaultOptions, ...options };
    const voices = createSpreadVoices(osc, freq, opts);
    const mixed = mixVoices(voices);
    return applyNormalization(mixed, opts.n, opts.normalize);
  },

  voices(osc: OscillatorFactory, freq: UGenInput, options: SpreadOptions = {}): UGenOutput[] {
    const opts = { ...defaultOptions, ...options };
    return createSpreadVoices(osc, freq, opts);
  },
} as unknown as SpreadType;

// ---------------------------------------------------------------------------
// VARIATION 3: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation3Example = synthDef(
  "spreadV3",
  { freq: kr(220), spread: kr(25), amp: kr(0.5), gate: kr(1) },
  (p) => {
    // Simple mono supersaw - just like calling a UGen
    const supersaw = Spread.saw(p.freq, { spread: p.spread });

    // Spread sines for softer pad sound
    const padSines = Spread.sine(p.freq, { n: 5, spread: 12 });

    // Pulse spread with width parameter
    const pulseSpread = Spread.pulse(p.freq, 0.3, { n: 5, spread: 20 });

    // Stereo supersaw - voices panned across stereo field
    const [left, right] = Spread.sawStereo(p.freq, {
      spread: p.spread,
      stereoWidth: 0.8,
    });

    // Custom oscillator (e.g., using LFSaw for different character)
    const customSpread = Spread.custom(LFSaw, p.freq, { n: 3, spread: 15 });

    // Get individual voices for custom processing
    const individualVoices = Spread.voices(Saw, p.freq, { n: 5 });
    // Could apply different effects to each voice here

    // Apply envelope
    const env = EnvGen.kr({
      envelope: asr({ attack: 0.2, release: 0.5 }),
      gate: p.gate,
      doneAction: 2,
    });

    const sig = mul(mul(supersaw, env), p.amp);
    Out.ar({ bus: 0, channelsArray: [sig, sig] });

    // Or stereo output:
    // Out.ar({ bus: 0, channelsArray: [mul(mul(left, env), p.amp), mul(mul(right, env), p.amp)] });
  }
);


// =============================================================================
// VARIATION 4: Builder/Fluent API
// =============================================================================
/**
 * Approach: A builder class that allows method chaining to configure
 * the spread oscillator before building. Inspired by the MixBuilder
 * pattern from normIdeas.ts.
 *
 * PROS:
 * - Very readable, self-documenting code
 * - IDE autocomplete guides usage
 * - Can set defaults and override specific options
 * - Easy to extend with new features
 * - Separates configuration from execution
 *
 * CONS:
 * - More verbose for simple cases
 * - Creates intermediate objects
 * - Requires calling .build() at the end
 * - Less idiomatic for this codebase
 *
 * Best for: Complex configurations, when clarity is more important than brevity
 */

export class SpreadBuilder {
  private oscillator: OscillatorFactory = Saw;
  private voiceCount: number = 7;
  private spreadCents: UGenInput = 25;
  private dist: SpreadDistribution = "linear";
  private stereoW: number = 0;
  private norm: "none" | "linear" | "sqrt" = "sqrt";
  private renderFn: ((freq: UGenInput, index: number, offset: number) => UGenOutput) | null = null;

  /**
   * Create a new SpreadBuilder for the given base frequency.
   */
  constructor(private freq: UGenInput) {}

  /**
   * Static factory for nicer syntax.
   *
   * @example
   * SpreadBuilder.at(440).voices(7).spread(30).saw().build()
   */
  static at(freq: UGenInput): SpreadBuilder {
    return new SpreadBuilder(freq);
  }

  /** Set the oscillator type to Saw */
  saw(): SpreadBuilder {
    this.oscillator = Saw;
    this.renderFn = null;
    return this;
  }

  /** Set the oscillator type to SinOsc */
  sine(): SpreadBuilder {
    this.oscillator = SinOsc;
    this.renderFn = null;
    return this;
  }

  /** Set the oscillator type to Pulse with given width */
  pulse(width: UGenInput = 0.5): SpreadBuilder {
    // Create a closure over width
    this.renderFn = (freq) => Pulse.ar({ freq, width }) as UGenOutput;
    return this;
  }

  /** Use a custom oscillator factory */
  osc(oscillator: OscillatorFactory): SpreadBuilder {
    this.oscillator = oscillator;
    this.renderFn = null;
    return this;
  }

  /** Use a custom render function for maximum flexibility */
  render(fn: (freq: UGenInput, index: number, offset: number) => UGenOutput): SpreadBuilder {
    this.renderFn = fn;
    return this;
  }

  /** Set the number of voices */
  voices(n: number): SpreadBuilder {
    this.voiceCount = n;
    return this;
  }

  /** Set the spread amount in cents */
  spread(cents: UGenInput): SpreadBuilder {
    this.spreadCents = cents;
    return this;
  }

  /** Set the distribution type */
  distribution(type: SpreadDistribution): SpreadBuilder {
    this.dist = type;
    return this;
  }

  /** Enable stereo spreading with given width (0-1) */
  stereo(width: number = 1): SpreadBuilder {
    this.stereoW = width;
    return this;
  }

  /** Set to mono (no stereo spread) */
  mono(): SpreadBuilder {
    this.stereoW = 0;
    return this;
  }

  /** Set normalization type */
  normalize(type: "none" | "linear" | "sqrt"): SpreadBuilder {
    this.norm = type;
    return this;
  }

  /** Disable normalization */
  noNormalize(): SpreadBuilder {
    this.norm = "none";
    return this;
  }

  /**
   * Build and return the mixed mono signal.
   */
  build(): UGenOutput {
    const voices = this.buildVoices();
    const mixed = mixVoices(voices);
    return applyNormalization(mixed, this.voiceCount, this.norm);
  }

  /**
   * Build and return stereo output.
   */
  buildStereo(): Stereo {
    const voices = this.buildVoices();
    const panPositions = generatePanPositions(this.voiceCount, this.stereoW || 1);

    let leftSum: UGenInput = 0;
    let rightSum: UGenInput = 0;

    for (let i = 0; i < voices.length; i++) {
      const panned = Pan2.ar({ in: voices[i], pos: panPositions[i] });
      leftSum = add(leftSum, panned[0]);
      rightSum = add(rightSum, panned[1]);
    }

    const left = applyNormalization(leftSum as UGenOutput, this.voiceCount, this.norm);
    const right = applyNormalization(rightSum as UGenOutput, this.voiceCount, this.norm);

    return [left, right];
  }

  /**
   * Build and return individual voices without mixing.
   */
  buildVoices(): UGenOutput[] {
    const offsets = generateOffsets(this.voiceCount, this.dist);
    const voices: UGenOutput[] = [];

    for (let i = 0; i < this.voiceCount; i++) {
      const centsOffset = mul(offsets[i], this.spreadCents);
      const ratio = midiratio(div(centsOffset, 100));
      const voiceFreq = mul(this.freq, ratio);

      if (this.renderFn) {
        voices.push(this.renderFn(voiceFreq, i, offsets[i]));
      } else {
        voices.push(this.oscillator.ar({ freq: voiceFreq }) as UGenOutput);
      }
    }

    return voices;
  }
}

// ---------------------------------------------------------------------------
// VARIATION 4: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation4Example = synthDef(
  "spreadV4",
  { freq: kr(220), spread: kr(25), amp: kr(0.5), gate: kr(1) },
  (p) => {
    // Simple supersaw with builder - very readable
    const supersaw = SpreadBuilder.at(p.freq)
      .saw()
      .voices(7)
      .spread(p.spread)
      .build();

    // Complex configuration is self-documenting
    const complexPad = SpreadBuilder.at(p.freq)
      .sine()
      .voices(9)
      .spread(15)
      .distribution("centered")
      .normalize("sqrt")
      .build();

    // Stereo output with full configuration
    const [left, right] = SpreadBuilder.at(p.freq)
      .saw()
      .voices(7)
      .spread(p.spread)
      .stereo(0.9)
      .distribution("linear")
      .buildStereo();

    // Custom render function for per-voice variation
    const customPulse = SpreadBuilder.at(p.freq)
      .voices(5)
      .spread(20)
      .render((voiceFreq, _i, offset) => {
        // Pulse width varies per voice
        const width = add(0.5, mul(offset, 0.2));
        return Pulse.ar({ freq: voiceFreq, width });
      })
      .build();

    // Get individual voices for custom processing
    const voices = SpreadBuilder.at(p.freq)
      .saw()
      .voices(5)
      .spread(p.spread)
      .buildVoices();

    // Apply envelope
    const env = EnvGen.kr({
      envelope: asr({ attack: 0.1, release: 0.5 }),
      gate: p.gate,
      doneAction: 2,
    });

    const sig = mul(mul(supersaw, env), p.amp);
    Out.ar({ bus: 0, channelsArray: [sig, sig] });
  }
);


// =============================================================================
// VARIATION 5: String-Based Oscillator Selection (Runtime Flexibility)
// =============================================================================
/**
 * Approach: Use string identifiers to select oscillator type. This allows
 * for runtime oscillator selection (e.g., from a dropdown or config).
 *
 * PROS:
 * - Can select oscillator type at runtime
 * - Easy serialization/deserialization of presets
 * - Simple string parameter is easy to expose in UIs
 * - Works well with configuration systems
 *
 * CONS:
 * - Not type-safe (typos fail at runtime)
 * - Limited to pre-defined oscillator types
 * - Need to maintain the mapping manually
 * - No IDE autocomplete for oscillator params
 *
 * Best for: Preset systems, UI-driven oscillator selection
 */

type OscillatorName = "saw" | "sine" | "pulse" | "triangle" | "varsaw";

const oscillatorMap: Record<OscillatorName, OscillatorFactory> = {
  saw: Saw,
  sine: SinOsc,
  pulse: Pulse,
  triangle: LFSaw, // Using LFSaw as simple triangle approximation
  varsaw: Saw, // Placeholder - would be VarSaw
};

/**
 * Create spread oscillators using a string to select oscillator type.
 *
 * @param oscName - Name of oscillator: "saw", "sine", "pulse", "triangle"
 * @param freq - Base frequency
 * @param n - Number of voices
 * @param spread - Spread in cents
 * @returns Mixed and normalized signal
 *
 * @example
 * // Could come from a preset or UI selection
 * const oscType = "saw"; // from config/preset
 * const sig = spreadByName(oscType, freq, 7, 25);
 */
export function spreadByName(
  oscName: OscillatorName,
  freq: UGenInput,
  n: number = 7,
  spread: UGenInput = 25,
  distribution: SpreadDistribution = "linear"
): UGenOutput {
  const osc = oscillatorMap[oscName];
  if (!osc) {
    throw new Error(`Unknown oscillator: ${oscName}`);
  }
  return spreadOscMix(osc, n, freq, spread, distribution);
}

// ---------------------------------------------------------------------------
// VARIATION 5: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation5Example = synthDef(
  "spreadV5",
  { freq: kr(220), spread: kr(25), amp: kr(0.5) },
  (p) => {
    // Oscillator type could come from a preset/config system
    // In real use, this might be selected from a UI dropdown
    const oscType: OscillatorName = "saw";

    // Create spread using string-based selection
    const sig1 = spreadByName(oscType, p.freq, 7, p.spread);

    // Different oscillator types
    const sawSpread = spreadByName("saw", p.freq, 7, p.spread);
    const sineSpread = spreadByName("sine", p.freq, 5, 12);
    const pulseSpread = spreadByName("pulse", p.freq, 5, 20);
    const triangleSpread = spreadByName("triangle", p.freq, 3, 15);

    // Could even iterate through types (useful for morphing)
    const types: OscillatorName[] = ["saw", "sine", "pulse"];
    const spreads = types.map((t) => spreadByName(t, p.freq, 5, p.spread));

    // Apply envelope
    const env = EnvGen.kr({
      envelope: perc({ attack: 0.01, release: 0.5 }),
      doneAction: 2,
    });

    const sig = mul(mul(sawSpread, env), p.amp);
    Out.ar({ bus: 0, channelsArray: [sig, sig] });
  }
);


// =============================================================================
// VARIATION 6: Specialized Presets for Common Sounds
// =============================================================================
/**
 * Approach: Pre-configured functions for specific classic sounds.
 * Rather than exposing all parameters, provide opinionated presets.
 *
 * PROS:
 * - Dead simple API for common use cases
 * - Sounds good out of the box (tuned values)
 * - Self-documenting (function name describes the sound)
 * - Easy to maintain consistent sound design
 *
 * CONS:
 * - Less flexible
 * - Many functions to cover all cases
 * - Parameters may not suit all contexts
 *
 * Best for: Quick prototyping, consistent sound design
 */

/**
 * Classic JP-8000 style supersaw. 7 voices with moderate spread.
 * Suitable for trance pads and leads.
 */
export function supersaw(freq: UGenInput, spread: UGenInput = 25): UGenOutput {
  return Spread.saw(freq, { n: 7, spread, distribution: "linear" });
}

/**
 * Stereo supersaw with voices spread across stereo field.
 */
export function supersawStereo(freq: UGenInput, spread: UGenInput = 25): Stereo {
  return Spread.sawStereo(freq, { n: 7, spread, stereoWidth: 0.8 });
}

/**
 * Thick bass with 3 detuned oscillators. Lower spread for tighter bass.
 */
export function thickBass(freq: UGenInput, spread: UGenInput = 10): UGenOutput {
  return Spread.saw(freq, { n: 3, spread, normalize: "sqrt" });
}

/**
 * String ensemble simulation. Many voices with subtle detune.
 */
export function strings(freq: UGenInput, spread: UGenInput = 8): UGenOutput {
  return Spread.saw(freq, { n: 12, spread, distribution: "random" });
}

/**
 * Pad sound with spread sines. Soft, evolving texture.
 */
export function pad(freq: UGenInput, spread: UGenInput = 12): UGenOutput {
  return Spread.sine(freq, { n: 5, spread, distribution: "centered" });
}

/**
 * Organ-like sound with spread pulse waves.
 */
export function organ(freq: UGenInput, spread: UGenInput = 3): UGenOutput {
  return Spread.pulse(freq, 0.5, { n: 3, spread, normalize: "linear" });
}

// ---------------------------------------------------------------------------
// VARIATION 6: Concrete Example (typechecks with real UGens)
// ---------------------------------------------------------------------------
export const variation6Example = synthDef(
  "spreadV6",
  { freq: kr(220), spread: kr(25), amp: kr(0.5), gate: kr(1) },
  (p) => {
    // Dead simple - just use the preset that sounds right
    const supersawSig = supersaw(p.freq, p.spread);

    // Stereo supersaw for wider sound
    const [ssLeft, ssRight] = supersawStereo(p.freq, p.spread);

    // Thick bass with tighter detune
    const bassSig = thickBass(p.freq, 10);

    // String ensemble - many voices, subtle detune
    const stringSig = strings(p.freq, 8);

    // Soft pad with spread sines
    const padSig = pad(p.freq, 12);

    // Organ-like pulse sound
    const organSig = organ(p.freq, 3);

    // LFO-modulated spread for evolving texture
    const spreadLFO = add(25, mul(LFNoise1.kr({ freq: 0.2 }), 15)); // 10-40 cents
    const evolvingSupersaw = supersaw(p.freq, spreadLFO);

    // Apply envelope
    const env = EnvGen.kr({
      envelope: asr({ attack: 0.2, release: 0.5 }),
      gate: p.gate,
      doneAction: 2,
    });

    // Use any of the preset sounds
    const sig = mul(mul(supersawSig, env), p.amp);
    Out.ar({ bus: 0, channelsArray: [sig, sig] });

    // Or stereo:
    // Out.ar({ bus: 0, channelsArray: [mul(mul(ssLeft, env), p.amp), mul(mul(ssRight, env), p.amp)] });
  }
);


// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/*
// Example SynthDefs using each variation:

import { Out, EnvGen, Env } from "../src/ugens/generated.ts";

// ---------------------------------------------------------------------------
// VARIATION 1: Function-based with factory
// ---------------------------------------------------------------------------
const supersawSynth1 = synthDef("supersaw1", {
  freq: kr(440),
  spread: kr(25),
  amp: kr(0.5),
}, (p) => {
  const { mixed } = spreadOsc(Saw, 7, p.freq, p.spread);
  const normalized = div(mixed, Math.sqrt(7));
  const sig = mul(normalized, p.amp);
  Out.ar({ bus: 0, channelsArray: [sig, sig] });
});

// ---------------------------------------------------------------------------
// VARIATION 2: Callback/render pattern for per-voice control
// ---------------------------------------------------------------------------
const supersawSynth2 = synthDef("supersaw2", {
  freq: kr(440),
  spread: kr(25),
}, (p) => {
  // Per-voice pulse width variation
  const { mixed } = spreadRender(7, p.freq, p.spread, (voiceFreq, i, offset) => {
    // Width varies from 0.3 to 0.7 across voices
    const width = add(0.5, mul(offset, 0.2));
    return Pulse.ar({ freq: voiceFreq, width }) as UGenOutput;
  });

  const sig = div(mixed, Math.sqrt(7));
  Out.ar({ bus: 0, channelsArray: [sig, sig] });
});

// ---------------------------------------------------------------------------
// VARIATION 3: Namespace/Object API
// ---------------------------------------------------------------------------
const supersawSynth3 = synthDef("supersaw3", {
  freq: kr(440),
  spread: kr(25),
}, (p) => {
  // Simple - just call the method
  const sig = Spread.saw(p.freq, { spread: p.spread });
  Out.ar({ bus: 0, channelsArray: [sig, sig] });

  // Or stereo:
  // const [left, right] = Spread.sawStereo(p.freq, { spread: p.spread });
  // Out.ar({ bus: 0, channelsArray: [left, right] });
});

// ---------------------------------------------------------------------------
// VARIATION 4: Builder/Fluent API
// ---------------------------------------------------------------------------
const supersawSynth4 = synthDef("supersaw4", {
  freq: kr(440),
  spread: kr(25),
}, (p) => {
  // Readable chain configuration
  const sig = SpreadBuilder
    .at(p.freq)
    .saw()
    .voices(7)
    .spread(p.spread)
    .distribution("linear")
    .normalize("sqrt")
    .build();

  Out.ar({ bus: 0, channelsArray: [sig, sig] });

  // Or build stereo:
  // const [left, right] = SpreadBuilder
  //   .at(p.freq)
  //   .saw()
  //   .voices(7)
  //   .spread(p.spread)
  //   .stereo(0.8)
  //   .buildStereo();
});

// ---------------------------------------------------------------------------
// VARIATION 5: String-based (good for presets)
// ---------------------------------------------------------------------------
const presetSynth = synthDef("presetSynth", {
  freq: kr(440),
  spread: kr(25),
}, (p) => {
  // oscType could come from a config/preset system
  const oscType: OscillatorName = "saw";
  const sig = spreadByName(oscType, p.freq, 7, p.spread);
  Out.ar({ bus: 0, channelsArray: [sig, sig] });
});

// ---------------------------------------------------------------------------
// VARIATION 6: Presets for common sounds
// ---------------------------------------------------------------------------
const quickSynth = synthDef("quickSynth", {
  freq: kr(440),
  spread: kr(25),
}, (p) => {
  // Just use a preset - sounds good immediately
  const sig = supersaw(p.freq, p.spread);
  Out.ar({ bus: 0, channelsArray: [sig, sig] });

  // Or stereo supersaw:
  // const [left, right] = supersawStereo(p.freq, p.spread);
  // Out.ar({ bus: 0, channelsArray: [left, right] });
});
*/


// =============================================================================
// COMPARISON SUMMARY
// =============================================================================

/*
VARIATION 1 (Factory Function):
  - API Style: spreadOsc(Saw, 7, freq, spread)
  - Best for: Simple use, when oscillator is known at compile time
  - Flexibility: Medium
  - Type Safety: Good
  - Verbosity: Low
  - Recommendation: Good default for simple cases

VARIATION 2 (Render Callback):
  - API Style: spreadRender(7, freq, spread, (f, i, offset) => ...)
  - Best for: Per-voice variation, complex oscillator chains
  - Flexibility: Highest
  - Type Safety: Medium (callback typing is loose)
  - Verbosity: Medium
  - Recommendation: Best for advanced users needing per-voice control

VARIATION 3 (Namespace/Object):
  - API Style: Spread.saw(freq, { n: 7, spread: 25 })
  - Best for: Library consistency, discoverable API
  - Flexibility: High
  - Type Safety: Good
  - Verbosity: Medium
  - Recommendation: Best for library code, IDE friendliness

VARIATION 4 (Builder Pattern):
  - API Style: SpreadBuilder.at(freq).saw().voices(7).spread(25).build()
  - Best for: Complex configurations, self-documenting code
  - Flexibility: High
  - Type Safety: Good
  - Verbosity: High
  - Recommendation: Best when readability matters most

VARIATION 5 (String-Based):
  - API Style: spreadByName("saw", freq, 7, 25)
  - Best for: Runtime oscillator selection, preset systems
  - Flexibility: Medium
  - Type Safety: Low (runtime errors)
  - Verbosity: Low
  - Recommendation: Use when oscillator type comes from config/UI

VARIATION 6 (Presets):
  - API Style: supersaw(freq, spread)
  - Best for: Quick results, consistent sound design
  - Flexibility: Lowest
  - Type Safety: Good
  - Verbosity: Lowest
  - Recommendation: Best for rapid prototyping, opinionated defaults

RECOMMENDED APPROACH:
For this codebase, I recommend VARIATION 3 (Namespace/Object) as the primary API:
- It's consistent with how UGens work (SinOsc.ar, etc.)
- The options object pattern matches UGen params
- Good IDE discoverability with Spread.
- Flexible enough for most use cases

Keep VARIATION 6 (Presets) as convenience functions for common sounds.
Keep VARIATION 2 (Render) available for advanced per-voice control.

ADDITIONAL NOTES ON SPREAD PARAMETER:

The spread parameter is in cents (hundredths of a semitone):
- 0 cents = perfect unison
- 25 cents = quarter semitone spread (classic supersaw)
- 50 cents = half semitone spread
- 100 cents = full semitone spread (+/- half tone)

For different use cases:
- Supersaw pads: 15-30 cents
- Thick bass: 5-15 cents
- String ensembles: 5-12 cents
- Chorus effect: 2-8 cents
- Extreme effects: 50-100+ cents

The spread can be modulated with an LFO for evolving textures:
  const spreadLFO = add(25, mul(SinOsc.kr({ freq: 0.1 }), 10)); // 15-35 cents
  Spread.saw(freq, { spread: spreadLFO })
*/
