const file = Deno.readTextFileSync(new URL("./input", import.meta.url))
  .split("\n");
// console.log("🚀 ~ file:", file);
const matchNumber = (v: string) => v.match(/\d+/g)!.map(Number);
let registerA = matchNumber(file[0])[0];
let registerB = matchNumber(file[1])[0];
let registerC = matchNumber(file[2])[0];
const output: Array<number> = [];

const program = matchNumber(file[4]);
// console.log("🚀 ~ program:", program);
for (let pointer = 0; pointer < program.length;) {
  const opcode = program[pointer];
  const operand = program[pointer + 1];
  const jump = doOperation(opcode, operand);
  pointer = jump !== undefined ? operand : pointer + 2;
}
console.log("🚀 ~ registers:", registerA, registerB, registerC);
console.log("🚀 ~ output:", output.join(","));

function doOperation(opcode: number, operand: number) {
  // console.log("🚀 ~ opcode:", opcode, operand);
  switch (opcode) {
    case 0:
      registerA = adv(operand);
      return;
    case 1:
      registerB = registerB ^ operand;
      return;
    case 2:
      registerB = decodeOperand(operand) % 8;
      return;
    case 3:
      if (registerA == 0) return;
      return decodeOperand(operand);
    case 4:
      registerB = registerB ^ registerC;
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
