const line = Deno.readTextFileSync("./input").split("\n");

const all = new Array<string>();
const matrix = line.map((l) => {
  // Horizontal
  all.push(l);
  return Array.from(l);
});

const long = matrix[0].length;
const heigh = matrix.length;
console.log("🚀 ~ long, heigh:", long, heigh);
// Vertical
for (let x = 0; x < long; x++) {
  let aa = "";
  for (let y = 0; y < matrix.length; y++) {
    aa += matrix[y][x];
  }
  all.push(aa);
}

for (let x = 3; x < long; x++) {
  let aa = "";
  for (let y = 0; y <= x && y < matrix.length; y++) {
    aa += matrix[y][x - y];
  }
  //   console.log("🚀 ~ aa:", aa);
  all.push(aa);
}

for (let x = 0; x < long - 4; x++) {
  let aa = "";
  for (let y = long - 1; y > x; y--) {
    aa += matrix[y][x + (long - y)];
  }
  //   console.log("🚀 ~ aa:", aa);
  all.push(aa);
}

for (let x = 0; x < long - 3; x++) {
  let aa = "";
  for (let y = 0; y < heigh && y < (heigh - x); y++) {
    // console.log("🚀 ~ x:", y, x + y);
    aa += matrix[y][x + y];
  }
  //   console.log("🚀 ~ aa:", aa);
  all.push(aa);
}

for (let y = 1; y < heigh - 3; y++) {
  let aa = "";
  for (let x = 0; x < long && x < (long - y); x++) {
    // console.log("🚀 ~ x:", y + x, x);
    aa += matrix[y + x][x];
  }
  //   console.log("🚀 ~ aa:", aa);
  all.push(aa);
}

console.log("🚀 ~ all:", all.length);
// console.log("🚀 ~ all:", all);
// console.log("🚀 ~ tt:", tt);

// console.log("🚀 ~ line:", line);
const t = all.reduce((acc, v) => acc += seek(v), 0);
console.log("🚀 ~ t ~ t:", t);

function seek(str: string) {
  return str.match(/(?=(XMAS|SAMX))/g)?.length ?? 0;
}
