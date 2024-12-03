const input = Deno.readTextFileSync("./input").split("\n");
console.log("🚀 ~ input:", import.meta.url);
// const input = await Deno.readTextFile(new URL("input.txt", import.meta.url));
const aa = input.map((l) => {
  return l.match(/\w*[^\s]/g);
}).reduce((acc, v) => {
  acc[0].push(Number(v?.at(0)));
  acc[1].push(Number(v?.at(1)));
  return acc;
}, <Array<Array<number>>> [[], []])
  .map((a) => a.sort((a, b) => a - b));
const total = aa.at(0)?.reduce(
  (acc, v, i) => acc += Math.abs(v - aa.at(1)?.at(i)!),
  0,
);
console.log("🚀 ~ total:", total);

// Deno.test("part 1", () => {
//   assertEquals(total, 11);
// });
