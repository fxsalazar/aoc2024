const [blocks, spaces] = Deno.readTextFileSync(
  new URL("./input", import.meta.url),
).split("")
  .map(Number)
  .reduce((acc, v, i) => {
    if (i % 2 == 0) acc[0].push(v);
    else acc[1].push(v);
    return acc;
  }, new Array<Array<number>>([], []));

const line: Array<number> = [];
for (let i = 0; i < blocks.length; i++) {
  [...Array(blocks[i]).keys()].map((_) => line.push(i));
  [...Array(spaces[i] ?? 0).keys()].map((_) => line.push(-1));
}
// 00...111...2...333.44.5555.6666.777.888899
console.log("🚀 ~ line:", line);

let currentFrontIndex = 0;
for (let i = line.length - 1; i >= 0; i--) {
  const element = line[i];
  if (element != -1) {
    for (; currentFrontIndex < i; currentFrontIndex++) {
      const fElement = line[currentFrontIndex];
      if (fElement == -1) {
        line[currentFrontIndex] = element;
        line[i] = -1;
        break;
      }
    }
  }
}
console.log("🚀 ~ line:", line);
const res = line
  .filter((v) => v != -1)
  .map((v, i) => v * i)
  .reduce((acc, v) => acc += v, 0);
console.log("🚀 ~ res:", res);
