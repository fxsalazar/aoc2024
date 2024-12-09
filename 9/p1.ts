const lines = Deno.readTextFileSync(new URL("./input", import.meta.url))
  .split("");
let id = 0;
const rearrenge = lines.map((c, ci) => {
  const q = Number(c);
  let a = "";
  for (let i = 0; i < q; i++) {
    if (ci % 2 == 0) a += "*"; // "id"
    else a += ".";
  }
  const block = { id, a };
  if (ci % 2 == 0) id++;
  return block;
});
// console.log("🚀 ~ rearrenge ~ rearrenge:", rearrenge);
const bup = [];
for (let frontIndex = 0; frontIndex < rearrenge.length; frontIndex++) {
  const frontElement = rearrenge[frontIndex];
  if (frontElement.a.includes("*")) {
    bup.push(frontElement);
    continue;
  }
  let available = frontElement.a.length;
  do {
    const be = rearrenge.pop()!;
    if (be?.a.includes(".") || be.a.length == 0) continue;
    const beLength = be.a.length;
    if (beLength <= available) {
      bup.push(be);
      available -= beLength;
      continue;
    }
    bup.push({ id: be.id, a: be.a.slice(beLength - available) });
    rearrenge.push({ id: be.id, a: be.a.slice(available) });
    available = 0;
    // console.log("🚀 ~ rearrenge ~ rearrenge:", rearrenge);
    // console.log("🚀 ~ bup:", bup);
  } while (available > 0);
}
// console.log("🚀 ~ bup:", bup);

let index = 0;
const t = bup.map((b) => {
  const tt = b.a.split("").map((_, i) => {
    const res = (i + index) * b.id;
    return res;
  });
  index += tt.length;
  return tt.reduce((acc, v) => acc += v, 0);
});
console.log("🚀 ~ index:", index);
// console.log("🚀 ~ t ~ t:", t);
console.log("🚀 ~ t ~ t:", t.reduce((acc, v) => acc += v));
