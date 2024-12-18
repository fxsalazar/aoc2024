const file = Deno.readTextFileSync(new URL("./input-t", import.meta.url))
  .split("\n");
// console.log("🚀 ~ file:", file);
const matchNumber = (v: string) => v.match(/\d+/g)!.map(Number);
let registerA = matchNumber(file[0])[0];
let registerB = matchNumber(file[1])[0];
let registerC = matchNumber(file[2])[0];
const output: Array<number> = [];
// 1536
// 99840
// 100032
//
//That was the key! I realized that everything
// repeats in patterns of 1, then 8, then 64, then 512,
// or in other words, 2^len(program) * 3.
// The higher the value of A, the longer the output
// 🚀 ~ output: 0 4 4 0
// 🚀 ~ output: 1 4 4 4
// 🚀 ~ output: 2 6 2 3
// 🚀 ~ output: 3 7 7 5
// 🚀 ~ output: 4 0 1 1
// 🚀 ~ output: 5 1 3 3
// 🚀 ~ output: 6 2 2 0
// 🚀 ~ output: 7 3 3 7
const program = matchNumber(file[4]);
// console.log("🚀 ~ program:", program);

// 0,1 -> 4
// 4,8     -> 37
// 37,64  -> 298
// 298, 512 -> 2390
// 2390, 4096
// 19124,
// 152996
// 1223972
// 9791776
// 78334219
// 626673755
// 5013390042
// 40107120342
// 320856962743
// 2566855701946
// 20534845615568
// 164278764924605
// Program: 2,4,1,1,7,5,1,5,4,1,5,5,0,3,3,0
const offset = 20534845615568 * 8;
// const limit = 512 * 8;
// const c = p * 1;
for (let n = offset - 512; n < offset + 64; n++) {
  registerA = n;
  registerB = 0;
  registerC = 0;
  output.length = 0;
  for (let pointer = 0; pointer < program.length;) {
    const opcode = program[pointer];
    const operand = program[pointer + 1];
    const jump = doOperation(opcode, operand);
    pointer = jump !== undefined ? operand : pointer + 2;
  }
  // console.log("🚀 ~ registers:", registerA, registerB, registerC);
  // console.log("🚀 ~ output:", program.length);
  // console.log("🚀 ~ output:", output.length);
  console.log("🚀 ~ output:", n, output.join(","));
}

function doOperation(opcode: number, operand: number) {
  // console.log("🚀 ~ opcode:", opcode, operand);
  switch (opcode) {
    case 0:
      registerA = adv(operand);
      return;
    case 1:
      registerB = Number(BigInt(registerB) ^ BigInt(operand));
      return;
    case 2:
      registerB = decodeOperand(operand) % 8;
      return;
    case 3:
      if (registerA == 0) return;
      return decodeOperand(operand);
    case 4:
      registerB = Number(BigInt(registerB) ^ BigInt(registerC));
      return;
    case 5:
      output.push(decodeOperand(operand) % 8);
      return;
    case 6:
      registerB = adv(operand);
      return;
    case 7:
      registerC = adv(operand);
      return;
    default:
      throw new Error(`unknown opcode ${opcode}`);
  }
}

function adv(operand: number) {
  return Math.floor(registerA / Math.pow(2, decodeOperand(operand)));
}

function decodeOperand(operand: number) {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return registerA;
    case 5:
      return registerB;
    case 6:
      return registerC;
    default:
      throw new Error("wrong operand");
  }
}
