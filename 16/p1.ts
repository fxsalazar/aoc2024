const file = Deno.readTextFileSync(new URL("./input", import.meta.url));

const grid = file.split("\n").map((row) => row.split(""));

let [sr, sc] = [0, 0];
let [er, ec] = [0, 0];

const rows = grid.length;
const cols = grid[0].length;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const el = grid[r][c];
    if (el == "S") [sr, sc] = [r, c];
    if (el == "E") [er, ec] = [r, c];
  }
}

// console.log(grid.map((row) => row.join("")).join("\n"));

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let dirIndex = 0;

const scoreGrid: Array<Array<Array<number>>> = Array.from(
  { length: rows },
  () =>
    Array.from(
      { length: cols },
      () => new Array<number>(4).fill(Number.MAX_VALUE),
    ),
);
scoreGrid[sr][sc][0] = 0;

const queue = [[sr, sc, dirIndex]];

while (queue.length) {
  const [cr, cc, cd] = queue.pop()!;

  for (let i = 0; i < 4; i++) {
    const [dr, dc] = directions[i];
    const [nr, nc] = [cr + dr, cc + dc];
    if (grid[nr][nc] == "#") continue;
    // console.log("🚀 ~ scoreGrid[nr][nc][i]:", nr, nc, i, scoreGrid[12][1]);
    const nextScore = scoreGrid[cr][cc][cd] +
      1 +
      Math.min(4 - Math.abs((i - cd) % 4), Math.abs((i - cd) % 4)) * 1000;
    if (nextScore >= scoreGrid[nr][nc][i]) continue;
    scoreGrid[nr][nc][i] = nextScore;
    // console.log("🚀 ~ scoreGrid[nr][nc][i]:", nr, nc, i, scoreGrid[12][1]);
    queue.unshift([nr, nc, i]);
  }
  //   console.log("🚀 ~ scoreGrid:", cr, cc, cd, scoreGrid[1][13]);
}
console.log(Math.min(...scoreGrid[er][ec]));
