import { Rate, UGenInput, UGenOutput } from "../graph/types.ts";
import { newUGen } from "./core.ts";

function rateOf(input: UGenInput): Rate {
  return typeof input === "number" ? Rate.Scalar : input.rate;
}

function isNumber(input: UGenInput): input is number {
  return typeof input === "number";
}

function binaryOp(index: number, a: UGenInput, b: UGenInput): UGenOutput {
  const rate = Math.max(rateOf(a), rateOf(b));
  return newUGen("BinaryOpUGen", rate, [a, b], 1, index) as UGenOutput;
}

function unaryOp(index: number, a: UGenInput): UGenOutput {
  const rate = rateOf(a);
  return newUGen("UnaryOpUGen", rate, [a], 1, index) as UGenOutput;
}

function mapDeep(value: any, fn: (input: UGenInput) => UGenInput): any {
  if (Array.isArray(value)) {
    return value.map((item) => mapDeep(item, fn));
  }
  return fn(value as UGenInput);
}

function canBeMulAdd(input: UGenInput, mulValue: UGenInput, addValue: UGenInput): boolean {
  const inputRate = rateOf(input);
  if (inputRate === Rate.Audio) return true;
  if (inputRate === Rate.Control) {
    const mulRate = rateOf(mulValue);
    const addRate = rateOf(addValue);
    const mulOk = mulRate === Rate.Control || mulRate === Rate.Scalar;
    const addOk = addRate === Rate.Control || addRate === Rate.Scalar;
    return mulOk && addOk;
  }
  return false;
}

function mulAdd(input: UGenInput, mulValue: UGenInput, addValue: UGenInput): UGenInput {
  if (isNumber(mulValue) && mulValue === 0) return addValue;
  const noMul = isNumber(mulValue) && mulValue === 1;
  const minus = isNumber(mulValue) && mulValue === -1;
  const noAdd = isNumber(addValue) && addValue === 0;

  if (noMul && noAdd) return input;
  if (minus && noAdd) return mul(input, -1);
  if (noAdd) return mul(input, mulValue);
  if (minus) return sub(addValue, input);
  if (noMul) return add(input, addValue);

  if (canBeMulAdd(input, mulValue, addValue)) {
    const rate = Math.max(rateOf(input), rateOf(mulValue), rateOf(addValue));
    return newUGen("MulAdd", rate, [input, mulValue, addValue], 1) as UGenOutput;
  }

  if (canBeMulAdd(mulValue, input, addValue)) {
    const rate = Math.max(rateOf(input), rateOf(mulValue), rateOf(addValue));
    return newUGen("MulAdd", rate, [mulValue, input, addValue], 1) as UGenOutput;
  }

  return add(mul(input, mulValue), addValue);
}

export function applyMulAdd(
  value: UGenInput | UGenInput[] | UGenInput[][],
  mulValue?: UGenInput,
  addValue?: UGenInput
): UGenInput | UGenInput[] | UGenInput[][] {
  const mulInput = mulValue ?? 1;
  const addInput = addValue ?? 0;
  const mulIsDefault = mulValue === undefined || (typeof mulValue === "number" && mulValue === 1);
  const addIsDefault = addValue === undefined || (typeof addValue === "number" && addValue === 0);
  if (mulIsDefault && addIsDefault) return value;

  return mapDeep(value, (input) => mulAdd(input, mulInput, addInput));
}

export function add(a: UGenInput, b: UGenInput): UGenInput {
  if (isNumber(a) && isNumber(b)) return a + b;
  if (isNumber(a) && a === 0) return b;
  if (isNumber(b) && b === 0) return a;
  return binaryOp(0, a, b);
}

export function sub(a: UGenInput, b: UGenInput): UGenInput {
  if (isNumber(a) && isNumber(b)) return a - b;
  if (isNumber(b) && b === 0) return a;
  return binaryOp(1, a, b);
}

export function mul(a: UGenInput, b: UGenInput): UGenInput {
  if (isNumber(a) && isNumber(b)) return a * b;
  if ((isNumber(a) && a === 0) || (isNumber(b) && b === 0)) return 0;
  if (isNumber(a) && a === 1) return b;
  if (isNumber(b) && b === 1) return a;
  return binaryOp(2, a, b);
}

export function idiv(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(3, a, b);
}

export function div(a: UGenInput, b: UGenInput): UGenInput {
  if (isNumber(a) && isNumber(b)) return a / b;
  if (isNumber(b) && b === 1) return a;
  if (isNumber(a) && a === 0) return 0;
  return binaryOp(4, a, b);
}

export function mod(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(5, a, b);
}

export function eq(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(6, a, b);
}

export function neq(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(7, a, b);
}

export function lt(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(8, a, b);
}

export function gt(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(9, a, b);
}

export function lte(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(10, a, b);
}

export function gte(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(11, a, b);
}

export function min(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(12, a, b);
}

export function max(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(13, a, b);
}

export function bitAnd(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(14, a, b);
}

export function bitOr(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(15, a, b);
}

export function bitXor(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(16, a, b);
}

export function lcm(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(17, a, b);
}

export function gcd(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(18, a, b);
}

export function round(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(19, a, b);
}

export function roundUp(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(20, a, b);
}

export function trunc(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(21, a, b);
}

export function atan2(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(22, a, b);
}

export function hypot(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(23, a, b);
}

export function hypotApx(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(24, a, b);
}

export function pow(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(25, a, b);
}

export function leftShift(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(26, a, b);
}

export function rightShift(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(27, a, b);
}

export function unsignedRightShift(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(28, a, b);
}

export function fill(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(29, a, b);
}

export function ring1(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(30, a, b);
}

export function ring2(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(31, a, b);
}

export function ring3(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(32, a, b);
}

export function ring4(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(33, a, b);
}

export function difsqr(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(34, a, b);
}

export function sumsqr(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(35, a, b);
}

export function sqrsum(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(36, a, b);
}

export function sqrdif(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(37, a, b);
}

export function absdif(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(38, a, b);
}

export function thresh(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(39, a, b);
}

export function amclip(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(40, a, b);
}

export function scaleneg(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(41, a, b);
}

export function clip2(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(42, a, b);
}

export function excess(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(43, a, b);
}

export function fold2(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(44, a, b);
}

export function wrap2(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(45, a, b);
}

export function firstArg(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(46, a, b);
}

export function rrand(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(47, a, b);
}

export function exprand(a: UGenInput, b: UGenInput): UGenInput {
  return binaryOp(48, a, b);
}

export function neg(a: UGenInput): UGenInput {
  if (isNumber(a)) return -a;
  return unaryOp(0, a);
}

export function not(a: UGenInput): UGenInput {
  return unaryOp(1, a);
}

export function isNil(a: UGenInput): UGenInput {
  return unaryOp(2, a);
}

export function notNil(a: UGenInput): UGenInput {
  return unaryOp(3, a);
}

export function bitNot(a: UGenInput): UGenInput {
  return unaryOp(4, a);
}

export function abs(a: UGenInput): UGenInput {
  return unaryOp(5, a);
}

export function asFloat(a: UGenInput): UGenInput {
  return unaryOp(6, a);
}

export function asInt(a: UGenInput): UGenInput {
  return unaryOp(7, a);
}

export function ceil(a: UGenInput): UGenInput {
  return unaryOp(8, a);
}

export function floor(a: UGenInput): UGenInput {
  return unaryOp(9, a);
}

export function frac(a: UGenInput): UGenInput {
  return unaryOp(10, a);
}

export function sign(a: UGenInput): UGenInput {
  return unaryOp(11, a);
}

export function squared(a: UGenInput): UGenInput {
  return unaryOp(12, a);
}

export function cubed(a: UGenInput): UGenInput {
  return unaryOp(13, a);
}

export function sqrt(a: UGenInput): UGenInput {
  return unaryOp(14, a);
}

export function exp(a: UGenInput): UGenInput {
  return unaryOp(15, a);
}

export function reciprocal(a: UGenInput): UGenInput {
  return unaryOp(16, a);
}

export function midicps(a: UGenInput): UGenInput {
  return unaryOp(17, a);
}

export function cpsmidi(a: UGenInput): UGenInput {
  return unaryOp(18, a);
}

export function midiratio(a: UGenInput): UGenInput {
  return unaryOp(19, a);
}

export function ratiomidi(a: UGenInput): UGenInput {
  return unaryOp(20, a);
}

export function dbamp(a: UGenInput): UGenInput {
  return unaryOp(21, a);
}

export function ampdb(a: UGenInput): UGenInput {
  return unaryOp(22, a);
}

export function octcps(a: UGenInput): UGenInput {
  return unaryOp(23, a);
}

export function cpsoct(a: UGenInput): UGenInput {
  return unaryOp(24, a);
}

export function log(a: UGenInput): UGenInput {
  return unaryOp(25, a);
}

export function log2(a: UGenInput): UGenInput {
  return unaryOp(26, a);
}

export function log10(a: UGenInput): UGenInput {
  return unaryOp(27, a);
}

export function sin(a: UGenInput): UGenInput {
  return unaryOp(28, a);
}

export function cos(a: UGenInput): UGenInput {
  return unaryOp(29, a);
}

export function tan(a: UGenInput): UGenInput {
  return unaryOp(30, a);
}

export function asin(a: UGenInput): UGenInput {
  return unaryOp(31, a);
}

export function acos(a: UGenInput): UGenInput {
  return unaryOp(32, a);
}

export function atan(a: UGenInput): UGenInput {
  return unaryOp(33, a);
}

export function sinh(a: UGenInput): UGenInput {
  return unaryOp(34, a);
}

export function cosh(a: UGenInput): UGenInput {
  return unaryOp(35, a);
}

export function tanh(a: UGenInput): UGenInput {
  return unaryOp(36, a);
}

export function rand(a: UGenInput): UGenInput {
  return unaryOp(37, a);
}

export function rand2(a: UGenInput): UGenInput {
  return unaryOp(38, a);
}

export function linrand(a: UGenInput): UGenInput {
  return unaryOp(39, a);
}

export function bilinrand(a: UGenInput): UGenInput {
  return unaryOp(40, a);
}

export function sum3rand(a: UGenInput): UGenInput {
  return unaryOp(41, a);
}

export function distort(a: UGenInput): UGenInput {
  return unaryOp(42, a);
}

export function softclip(a: UGenInput): UGenInput {
  return unaryOp(43, a);
}

export function coin(a: UGenInput): UGenInput {
  return unaryOp(44, a);
}

export function digitValue(a: UGenInput): UGenInput {
  return unaryOp(45, a);
}

export function silence(a: UGenInput): UGenInput {
  return unaryOp(46, a);
}

export function thru(a: UGenInput): UGenInput {
  return unaryOp(47, a);
}

export function rectWindow(a: UGenInput): UGenInput {
  return unaryOp(48, a);
}

export function hannWindow(a: UGenInput): UGenInput {
  return unaryOp(49, a);
}

export function welchWindow(a: UGenInput): UGenInput {
  return unaryOp(50, a);
}

export function triWindow(a: UGenInput): UGenInput {
  return unaryOp(51, a);
}

export function ramp(a: UGenInput): UGenInput {
  return unaryOp(52, a);
}

export function sCurve(a: UGenInput): UGenInput {
  return unaryOp(53, a);
}
