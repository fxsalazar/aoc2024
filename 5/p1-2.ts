const [rulesInput, seq] = Deno.readTextFileSync("./input").split("\n\n");
const r = new Map<number, Set<number>>();
rulesInput.split("\n").forEach((l) => {
  const [k, v] = l.split("|").map(Number);
  r.set(k, (r.get(k) ?? new Set()).add(v));
});

const [p1, p2] = seq.split("\n").reduce((acc, l) => {
  const seq = l.split(",").map(Number);
  let unordered = false;
  for (let x = 0; x < seq.length; x++) {
    const p = seq[x];
    for (let index = x + 1; index < seq.length; index++) {
      if (unordered) break;
      if (!r.get(p)?.has(seq[index])) {
        unordered = true;
        break;
      }
    }
  }
  // part 2
  if (unordered) {
    const seqsorted = seq.toSorted((a, b) =>
      getWeight(seq, b) - getWeight(seq, a)
    );
    return [acc[0], acc[1] += seqsorted[Math.round(seqsorted.length / 2) - 1]];
  }
  // part1
  return [acc[0] += seq[(seq.length - 1) / 2], acc[1]];
}, [0, 0]);
console.log("🚀 ~ vs ~ vs:", { p1, p2 });

function getWeight(seq: Array<number>, a: number) {
  let w = 0;
  for (let index = 0; index < seq.length; index++) {
    const v = seq[index];
    if (v == a) continue;
    if (r.get(a)?.has(v)) {
      w++;
    }
  }
  return w;
}
