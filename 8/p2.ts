type Coord = [number, number];
const lines = Deno.readTextFileSync(new URL("./input", import.meta.url))
  .split("\n").map((l) => l.split(""));
const h = lines.length;
const w = lines[0].length;
const matrix: string[][] = JSON.parse(JSON.stringify(lines));
console.log("🚀 ~ h-w:", h, w);

const antennas: Map<string, Array<Coord>> = new Map();
lines.forEach((line, yi) => {
  line.forEach((possibleAntennaKey, xi) => {
    if (possibleAntennaKey !== ".") {
      //   console.log("🚀 ~ spot:", spot);
      addAntenna(possibleAntennaKey, xi, yi);
    }
  });
});
const antinodes: Set<string> = new Set();

antennas.forEach((v, k) => {
  const lineCoords = permutateAntennas(v);
  lineCoords.map((lc) => {
    seekAntinode(lc);
  });
});
console.log("🚀 ~ antinodes:", antinodes.size);
// matrix.map((l) => console.log(l.join("")));

function seekAntinode(line: [Coord, Coord]) {
  getDistance(line);
}

function getDistance([a, b]: [Coord, Coord]) {
  const ds: Coord = [a[0] - b[0], a[1] - b[1]];
  const ns = getNodes(a, ds, false).concat(getNodes(a, ds, true));
  ns.map((c) => {
    matrix[c[1]][c[0]] = "#";
    antinodes.add(JSON.stringify(c));
  });
}

function getNodes(c: Coord, ds: Coord, down: boolean = false): Array<Coord> {
  const aa: Coord = down
    ? [c[0] - ds[0], c[1] - ds[1]]
    : [c[0] + ds[0], c[1] + ds[1]];
  if (inBounds(aa)) {
    return [c, aa].concat(getNodes(aa, ds, down));
  }
  return [];
}

function inBounds(c: Coord) {
  const limits = (v: number, l: number) => v >= 0 && v < l;
  return limits(c[0], w) && limits(c[1], h);
}

function addAntenna(key: string, x: number, y: number) {
  const p = antennas.get(key) ?? [];
  p.push([x, y]);
  antennas.set(key, p);
}

function permutateAntennas(antennas: Array<Coord>): Array<[Coord, Coord]> {
  if (antennas.length == 1) return [];
  const permutations: Array<[Coord, Coord]> = [];
  antennas.forEach((antenna, i) => {
    antennas.slice(i + 1).map((c) => permutations.push([antenna, c]));
  });
  return permutations;
}
