import { readInput } from "../utils.ts";

function solve(): number {
  const line = readInput(import.meta.url).match(
    /mul\(\d+,\d+\)|do\(\)|don't\(\)/g,
  );
  let flag = false;
  const t = line!.map((r) => {
    if (r === "don't()") {
      flag = true;
      return 0;
    }
    if (r === "do()") {
      flag = false;
      return 0;
    }
    if (!flag) return calc(r);
    return 0;
  }).reduce((acc, v) => acc += v);
  console.log("🚀 ~ t ~ t:", t);

  return t; // 62098619
}

function calc(str: string) {
  return str.match(/\d+/g)!.map(Number).reduce((acc, v) => acc *= v);
}

solve();
