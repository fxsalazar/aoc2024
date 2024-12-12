const matrix = Deno.readTextFileSync(new URL("./input-t", import.meta.url))
  .split("\n").map((l) => l.split(""));
// console.log("🚀 ~ matrix:", matrix);
const w = matrix[0].length;
const h = matrix.length;
type Coord = { x: number; y: number };
const North: Coord = { x: 0, y: 1 };
const South: Coord = { x: 0, y: -1 };
const West: Coord = { x: -1, y: 0 };
const East: Coord = { x: 1, y: 0 };
const Directions: Array<Coord> = [North, South, East, West];

const visited = new Map<string, number>();
const res = matrix.map((l, y) => {
  return l.map((_, x) => {
    const c = { x, y };
    if (!visited.has(getVisitedKey(c))) {
      const Ogarden = scout(c);
      console.log("🚀 ~ returnl.map ~ Ogarden:", Ogarden);
      return Ogarden.area * Ogarden.perimeter;
    }
    return 0;
  }).reduce((acc, v) => acc += v, 0);
}).reduce((acc, v) => acc += v, 0);
console.log("🚀 ~ res ~ res:", res);
// console.log("🚀 ~ visited:", visited);

function scout(coord: Coord) {
  const walkedTo = walk(coord);
  let area = 1;
  let perimeter = 4;
  if (walkedTo.length == 0) {
    return { area, perimeter };
  }

  for (const v of walkedTo) {
    const visitedKey = getVisitedKey(v);
    if (visited.has(visitedKey)) {
      perimeter--;
      continue;
    }
    const vv = scout(v);
    area += vv.area;
    perimeter += vv.perimeter - 1;
  }
  return { area, perimeter };
}

function walk(coord: Coord): Array<Coord> {
  const visitedKey = `${coord.x},${coord.y}`;
  const plantType = matrix[coord.y][coord.x];
  const res = [];
  for (const dir of Directions) {
    const newSpot = addCoord(coord, dir);
    if (
      !newSpot || matrix[newSpot.y][newSpot.x] !== plantType
    ) continue;
    res.push(newSpot);
  }
  visited.set(visitedKey, 0);
  return res;
}

function getVisitedKey(coord: Coord) {
  return `${coord.x},${coord.y}`;
}

function addCoord(a: Coord, b: Coord): Coord | null {
  const addedCoord = { x: a.x + b.x, y: a.y + b.y };
  if (!isValideCoord(addedCoord)) return null;
  return addedCoord;
}

function isValideCoord(coord: Coord) {
  return coord.x >= 0 && coord.x < w && coord.y >= 0 && coord.y < h;
}
