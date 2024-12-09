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
for (let i = rearrenge.length - 1; i >= 0; i--) {
  const backElement = rearrenge[i];
  if (backElement.a.includes(".") || backElement.a.length == 0) continue;
  for (let j = 0; j < i; j++) {
    const frontElement = rearrenge[j];
    if (frontElement.a.includes("*") || frontElement.a.length == 0) continue;
    if (backElement.a.length < frontElement.a.length) {
      rearrenge.splice(j, 1, Object.assign({}, backElement), {
        id: 99,
        a: frontElement.a.slice(backElement.a.length - frontElement.a.length),
      });
      i++;
      backElement.id = 99;
      backElement.a = backElement.a.replaceAll("*", ".");
      break;
    }
    if (backElement.a.length == frontElement.a.length) {
      const temp = rearrenge[j];
      rearrenge[j] = backElement;
      rearrenge[i] = temp;
      break;
    }
  }
}

let index = 0;
const t = rearrenge.map((b) => {
  const tt = b.a.split("").map((_, i) => {
    return !b.a.includes(".") ? (i + index) * b.id : 0;
  });
  index += tt.length;
  return tt.reduce((acc, v) => acc += v, 0);
});
console.log("🚀 ~ t ~ t:", t.reduce((acc, v) => acc += v));
