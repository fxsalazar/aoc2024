const matrix = Deno.readTextFileSync(new URL("./input", import.meta.url))
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
      const sides = countBorders([...Ogarden.perimeter.values()]);
      // console.log(
      //   "🚀 ~ returnl.map ~ Ogarden:",
      //   getTypeFromMatrix(c),
      //   Ogarden.area,
      //   sides,
      // );
      // console.log("🚀 ~ returnl.map ~ sides:", sides);
      return Ogarden.area * sides;
    }
    return 0;
  }).reduce((acc, v) => acc += v, 0);
}).reduce((acc, v) => acc += v, 0);
console.log("🚀 ~ res ~ res:", res);
// console.log("🚀 ~ visited:", visited);

function scout(coord: Coord) {
  const walkedTo = walk(coord);
  let area = 1;
  let perimeter = new Set<Coord>([coord]);
  if (walkedTo.length == 0) {
    return { area, perimeter };
  }

  for (const v of walkedTo) {
    const visitedKey = getVisitedKey(v);
    if (visited.has(visitedKey)) {
      // perimeter--;
      continue;
    }
    const vv = scout(v);
    area += vv.area;
    // perimeter += vv.perimeter - 1;
    perimeter = perimeter.union(vv.perimeter);
  }
  return { area, perimeter };
}

function countBorders(coors: Array<Coord>) {
  const typeG = getTypeFromMatrix(coors[0]);
  // if (typeG === "C") console.log("🚀 ~ countCorners ~ r:", typeG, coors);
  // console.log("🚀 ~ countCorners ~ r:", typeG);
  let sides = 0;
  const boundPoints = coors.reduce((acc, v) => {
    acc.minx = Math.min(acc.minx, v.x);
    acc.maxx = Math.max(acc.maxx, v.x);
    acc.miny = Math.min(acc.miny, v.y);
    acc.maxy = Math.max(acc.maxy, v.y);
    return acc;
  }, { minx: w, miny: h, maxx: 0, maxy: 0 });
  // console.log("🚀 ~ boundPoints ~ boundPoints:", boundPoints);

  // top-down
  for (let y = boundPoints.miny; y <= boundPoints.maxy; y++) {
    let pl = 0;
    for (let x = boundPoints.minx; x <= boundPoints.maxx; x++) {
      const p = matrix[y][x];
      if (p === typeG && !coors.some((c) => c.x == x && c.y == y)) {
        // console.log("🚀 ~ countBorders ~ matrix[y][x]:", x, y);
        continue;
      }
      // console.log("🚀 ~ countBorders ~ p:", x, y, p);
      if (p === typeG && p != getTypeFromMatrix({ x, y: y - 1 })) pl++;
      else {
        // console.log("🚀 ~ countBorders ~ p:", x, y, p);
        if (pl) sides++;
        pl = 0;
      }
    }
    if (pl) sides++;
    pl = 0;
  }

  // bottom-up
  for (let y = boundPoints.maxy; y >= boundPoints.miny; y--) {
    let pl = 0;
    for (let x = boundPoints.minx; x <= boundPoints.maxx; x++) {
      const p = matrix[y][x];
      if (p === typeG && !coors.some((c) => c.x == x && c.y == y)) {
        // console.log("🚀 ~ countBorders ~ matrix[y][x]:", x, y);
        continue;
      }
      // console.log("🚀 ~ countBorders ~ p:", x, y, p);
      if (p === typeG && p != getTypeFromMatrix({ x, y: y + 1 })) pl++;
      else {
        // console.log("🚀 ~ countBorders ~ p:", x, y, p);
        if (pl) sides++;
        pl = 0;
      }
    }
    if (pl) sides++;
    pl = 0;
    // console.log("🚀 ~ countBorders ~ pl:", sides);
  }

  // leftToRight
  for (let x = boundPoints.minx; x <= boundPoints.maxx; x++) {
    let pl = 0;
    for (let y = boundPoints.miny; y <= boundPoints.maxy; y++) {
      const p = matrix[y][x];
      if (p === typeG && !coors.some((c) => c.x == x && c.y == y)) {
        // console.log("🚀 ~ countBorders ~ matrix[y][x]:", x, y);
        continue;
      }
      // console.log("🚀 ~ countBorders ~ p:", x, y, p);
      if (p === typeG && p != getTypeFromMatrix({ x: x - 1, y })) pl++;
      else {
        // console.log("🚀 ~ countBorders ~ p:", x, y, p);
        if (pl) sides++;
        pl = 0;
      }
    }
    if (pl) sides++;
    pl = 0;
  }

  for (let x = boundPoints.maxx; x >= boundPoints.minx; x--) {
    let pl = 0;
    for (let y = boundPoints.miny; y <= boundPoints.maxy; y++) {
      const p = getTypeFromMatrix({ x, y });
      if (p === typeG && !coors.some((c) => c.x == x && c.y == y)) {
        // console.log("🚀 ~ countBorders ~ matrix[y][x]:", x, y);
        continue;
      }
      // console.log("🚀 ~ countBorders ~ p:", x, y, p);
      if (p === typeG && p != getTypeFromMatrix({ x: x + 1, y })) pl++;
      else {
        // console.log("🚀 ~ countBorders ~ p:", x, y, p);
        if (pl) sides++;
        pl = 0;
      }
    }
    if (pl) sides++;
    pl = 0;
    // console.log("🚀 ~ countBorders ~ sides:", sides);
  }

  return sides;
}

function walk(coord: Coord): Array<Coord> {
  const visitedKey = `${coord.x},${coord.y}`;
  const plantType = getTypeFromMatrix(coord);
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

function getTypeFromMatrix(coord: Coord): string {
  if (coord.x < 0 || coord.x >= w || coord.y < 0 || coord.y >= h) return "na";
  return matrix[coord.y][coord.x];
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
