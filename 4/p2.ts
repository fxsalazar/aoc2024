const line = Deno.readTextFileSync("./input").split("\n");

const matrix = line.map((l) => Array.from(l));

const size = matrix.length;
let t = 0;
for (let y = 1; y < size - 1; y++) {
  for (let x = 1; x < size - 1; x++) {
    const a = matrix[y][x];
    if (a === "A") {
      const axe1 = matrix[y - 1][x - 1] + a + matrix[y + 1][x + 1];
      const axe2 = matrix[y - 1][x + 1] + a + matrix[y + 1][x - 1];
      if (compare(axe1) && compare(axe2)) {
        t++;
      }
    }
  }
}
console.log("🚀 ~ t ~ t:", t);

function compare(str: string) {
  return str === "SAM" || str === "MAS";
}
