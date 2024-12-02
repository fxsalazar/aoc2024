const input = Deno.readTextFileSync("./input").split("\n");
const r = input.map((l) => {
  const og = l.split(" ").map(Number);
  const asc = og[0] > og[1];
  let safe = true;
  for (let i = 0; i < og.length - 1; i++) {
    const current = og[i];
    const next = og[i + 1];
    const range = Math.abs(current - next);
    const isLinear = (asc ? current > next : next > current) &&
      (range <= 3 && range >= 1);
    if (!isLinear) {
      safe = false;
      break;
    }
  }
  return safe;
}).reduce((acc, v) => v ? ++acc : acc, 0);
console.log("🚀 ~ r ~ r:", r);
