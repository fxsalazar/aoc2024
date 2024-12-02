const input = Deno.readTextFileSync("./input-t").split("\n");
const r = input.map((l) => {
  const og = l.split(" ").map(Number);
  const asc = og[0] > og[1];
  let safe = true;
  for (let i = 0; i < og.length - 1; i++) {
    const current = og[i];
    const next = og[i + 1];
    const isLinear = asc ? current > next : next > current;
    const range = Math.abs(current - next);
    const isInRange = range <= 3 && range >= 1;
    if (!isInRange || !isLinear) {
      safe = false;
      break;
    }
  }
  return safe;
}).reduce((acc, v) => v ? ++acc : acc, 0);
console.log("🚀 ~ r ~ r:", r);
