const input = Deno.readTextFileSync("./input").split("\n");
const r = input.map((l, li) => {
  const og = l.split(" ").map(Number);
  const { safe, index } = checkRules(og);
  if (!safe) {
    console.log("🚀 ~ r ~ og:", og);
    console.log("🚀 ~ r ~ og-err:", li, safe, index);
    const tt = og.toSpliced(index!, 1);
    console.log("🚀 ~ r ~ tt:", tt);
    const { safe: safe2, index: index2 } = checkRules(tt);
    const { safe: safe3, index: index3 } = checkRules(
      og.toSpliced(index! - 1, 1),
    );
    // console.log("🚀 ~ r ~ safe:", li, safe2, index2);
    console.log("🚀 ~ r ~ safe:", li, safe3, index3);
    if (!safe2) return safe3;
    return safe2;
  }
  return safe;
}).reduce((acc, v) => v ? ++acc : acc, 0);
console.log("🚀 ~ r ~ r:", r);

function checkRules(og: Array<number>) {
  const desc = og[0] > og[og.length - 1];
  let safe = true;
  let index = undefined;
  for (let i = 1; i < og.length; i++) {
    const current = og[i - 1];
    const next = og[i];
    const range = Math.abs(current - next);
    const isLinear = (desc ? current > next : next > current) &&
      (range <= 3 && range >= 1);

    if (!isLinear) {
      index = i;
      safe = false;
      break;
    }
  }
  return { safe, index };
}
