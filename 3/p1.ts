import { assertEquals } from "@std/assert";
import { readInput } from "../utils.ts";

function solve(): number {
  //   const line = readTestInput(import.meta.url);
  const line = readInput(import.meta.url);
  //   console.log("🚀 ~ lines:", lines);
  const c = line.match(/mul\(\d{1,3},\d{1,3}\)/gm)!.map((m) => {
    return m.match(/\d{1,3}/g)!.map(Number).reduce((acc, v) => acc *= v);
  }).reduce((acc, v) => acc += v);
  return c;
}

Deno.test("test", () => {
  //   assertEquals(solve(), 161);
  assertEquals(solve(), 183788984);
});
