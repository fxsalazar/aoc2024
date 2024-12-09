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
// console.log("🚀 ~ line:", line);

// console.log("🚀 ~ line.length:", line.length);
let currentBackIndex = line.length - 1;
for (; currentBackIndex >= 0; currentBackIndex--) {
  const element = line[currentBackIndex];
  if (element == -1) continue;
  const size = getBlockSize(element, currentBackIndex);
  for (
    let currentFrontIndex = 0;
    currentFrontIndex < currentBackIndex;
    currentFrontIndex++
  ) {
    const fElement = line[currentFrontIndex];
    if (fElement != -1) continue;
    const sSize = getBlockSize(fElement, currentFrontIndex, true);
    if (size > sSize) continue;

    [...Array(size).keys()].forEach((_, i) => {
      line[currentFrontIndex + i] = element;
      line[currentBackIndex - i] = -1;
    });
    // console.log(
    //   "🚀 ~ [...Array ~ size:",
    //   element,
    //   size,
    //   currentFrontIndex,
    //   currentBackIndex + 1,
    // );
    // console.log("🚀 ~ [...Array ~ line:", line);
    break;
  }
  currentBackIndex -= size - 1;
}
// 00992111777.44.333....5555.6666.....8888..
// console.log("🚀 ~ lineProcessed:", line);
const res = line
  //   .filter((v) => v != -1)
  .map((v, i) => {
    if (v == -1) return 0;
    return v * i;
  })
  .reduce((acc, v) => acc += v, 0);
console.log("🚀 ~ res:", res);

function getBlockSize(
  id: number,
  index: number,
  front: boolean = false,
): number {
  let size = 0;
  while (line[index] == id) {
    size++;
    front ? index++ : index--;
  }
  return size;
}
