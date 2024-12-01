const input = Deno.readTextFileSync("./input").split("\n");
const aa = input.map((l) => {
  return l.match(/(\d*\S*)/g);
}).reduce((acc, v) => {
  acc[0].push(Number(v?.at(0)));
  acc[1].push(Number(v?.at(4)));
  return acc;
}, <Array<Array<number>>> [[], []])
  .map((a) => a.sort((a, b) => a - b));
const rightlist = aa.at(1)?.reduce((acc, v) => {
  const x = acc?.get(v) ?? 0;
  acc.set(v, x + 1);
  return acc;
}, new Map<number, number>());
const total = aa.at(0)?.reduce(
  (acc, v) => acc += v * (rightlist?.get(v) ?? 0),
  0,
);
console.log("🚀 ~ total:", total);
