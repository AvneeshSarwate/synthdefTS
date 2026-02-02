import { synthDef } from "../src/graph/builder.ts";
import { LocalBuf, BufRd, Out, DC } from "../src/ugens/generated.ts";

function readDef(buf: Uint8Array) {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let offset = 0;
  const readUInt8 = () => view.getUint8(offset++);
  const readInt16 = () => { const v = view.getInt16(offset, false); offset += 2; return v; };
  const readInt32 = () => { const v = view.getInt32(offset, false); offset += 4; return v; };
  const readFloat = () => { const v = view.getFloat32(offset, false); offset += 4; return v; };
  const readPString = () => { const len = readUInt8(); const bytes = buf.slice(offset, offset + len); offset += len; return new TextDecoder().decode(bytes); };

  const magic = new TextDecoder().decode(buf.slice(0, 4));
  offset = 4;
  const version = readInt32();
  const numDefs = readInt16();
  const name = readPString();
  const numConsts = readInt32();
  const consts = Array.from({ length: numConsts }, () => readFloat());
  const numParams = readInt32();
  const params = Array.from({ length: numParams }, () => readFloat());
  const numParamNames = readInt32();
  const paramNames = Array.from({ length: numParamNames }, () => ({ name: readPString(), index: readInt32() }));
  const numUGens = readInt32();
  const ugens = [] as any[];
  for (let i = 0; i < numUGens; i += 1) {
    const ugenName = readPString();
    const rate = readUInt8();
    const numInputs = readInt32();
    const numOutputs = readInt32();
    const special = readInt16();
    const inputs = Array.from({ length: numInputs }, () => ({ src: readInt32(), index: readInt32() }));
    const outputs = Array.from({ length: numOutputs }, () => readUInt8());
    ugens.push({ ugenName, rate, numInputs, numOutputs, special, inputs, outputs });
  }
  const numVariants = readInt16();
  return { magic, version, numDefs, name, numConsts, consts, numParams, params, numParamNames, paramNames, numUGens, ugens, numVariants, offset, total: buf.length };
}

const def = synthDef("test11", () => {
  const buf = LocalBuf.new({ numFrames: 1024, numChannels: 1 });
  const phase = DC.ar({ in: 0 });
  const sig = BufRd.ar({ numChannels: 1, bufnum: buf as any, phase: phase as any });
  Out.ar({ bus: 0, channelsArray: sig as any });
});

const ours = def.encode();
const sc = await Deno.readFile(new URL("../tests/fixtures/test11.scsyndef", import.meta.url));

console.log("ours", readDef(ours));
console.log("sc", readDef(sc));
