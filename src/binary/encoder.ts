import { CompiledSynthDef } from "../graph/compiler.ts";
import { Rate } from "../graph/types.ts";

class BinaryWriter {
  private readonly chunks: Uint8Array[] = [];

  writeRaw(bytes: Uint8Array): void {
    this.chunks.push(bytes);
  }

  writeInt8(value: number): void {
    const buf = new ArrayBuffer(1);
    new DataView(buf).setInt8(0, value);
    this.chunks.push(new Uint8Array(buf));
  }

  writeUInt8(value: number): void {
    const buf = new ArrayBuffer(1);
    new DataView(buf).setUint8(0, value);
    this.chunks.push(new Uint8Array(buf));
  }

  writeInt16(value: number): void {
    const buf = new ArrayBuffer(2);
    new DataView(buf).setInt16(0, value, false);
    this.chunks.push(new Uint8Array(buf));
  }

  writeInt32(value: number): void {
    const buf = new ArrayBuffer(4);
    new DataView(buf).setInt32(0, value, false);
    this.chunks.push(new Uint8Array(buf));
  }

  writeFloat32(value: number): void {
    const buf = new ArrayBuffer(4);
    new DataView(buf).setFloat32(0, value, false);
    this.chunks.push(new Uint8Array(buf));
  }

  writePString(value: string): void {
    const bytes = new TextEncoder().encode(value);
    if (bytes.length > 255) {
      throw new Error(`pstring too long: ${value.length}`);
    }
    this.writeUInt8(bytes.length);
    this.chunks.push(bytes);
  }

  concat(): Uint8Array {
    const total = this.chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(total);
    let offset = 0;
    for (const chunk of this.chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result;
  }
}

function writeUGen(writer: BinaryWriter, ugen: CompiledSynthDef["ugens"][number]): void {
  writer.writePString(ugen.name);
  writer.writeInt8(ugen.rate);
  writer.writeInt32(ugen.inputs.length);
  writer.writeInt32(ugen.outputs.length);
  writer.writeInt16(ugen.specialIndex);
  for (const input of ugen.inputs) {
    writer.writeInt32(input.src);
    writer.writeInt32(input.index);
  }
  for (const outRate of ugen.outputs) {
    writer.writeInt8(outRate);
  }
}

function writeSynthDef(writer: BinaryWriter, def: CompiledSynthDef): void {
  writer.writePString(def.name);

  writer.writeInt32(def.constants.length);
  for (const value of def.constants) {
    writer.writeFloat32(value);
  }

  writer.writeInt32(def.paramValues.length);
  for (const value of def.paramValues) {
    writer.writeFloat32(value);
  }

  writer.writeInt32(def.paramNames.length);
  for (const param of def.paramNames) {
    writer.writePString(param.name);
    writer.writeInt32(param.index);
  }

  writer.writeInt32(def.ugens.length);
  for (const ugen of def.ugens) {
    writeUGen(writer, ugen);
  }

  writer.writeInt16(def.variants.size);
  for (const [name, values] of def.variants.entries()) {
    writer.writePString(name);
    writer.writeInt32(values.length);
    for (const value of values) {
      writer.writeFloat32(value);
    }
  }
}

export function encodeSynthDef(def: CompiledSynthDef): Uint8Array {
  return encodeSynthDefs([def]);
}

export function encodeSynthDefs(defs: CompiledSynthDef[]): Uint8Array {
  const writer = new BinaryWriter();
  writer.writeRaw(new TextEncoder().encode("SCgf"));
  writer.writeInt32(2);
  writer.writeInt16(defs.length);
  for (const def of defs) {
    writeSynthDef(writer, def);
  }
  return writer.concat();
}

export function rateToInt8(rate: Rate): number {
  return rate;
}
