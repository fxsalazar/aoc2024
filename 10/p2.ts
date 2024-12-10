const map = Deno.readTextFileSync(new URL("./input", import.meta.url))
  .split("\n").map((l) => l.split("").map(Number));
// console.log("🚀 ~ map:", map)
type Coord = [number, number];
const North: Coord = [0, 1];
const South: Coord = [0, -1];
const West: Coord = [-1, 0];
const East: Coord = [1, 0];
type Direction = Coord;
const Directions: Array<Coord> = [North, South, East, West];

const con: Map<string, Array<string>> = new Map();
let id = "";
map.map((line, y) => {
  line.map((spot, x) => {
    if (spot == 0) {
      id = `${x},${y}`;
      con.set(id, []);
      return walk([x, y]);
    }
    return null;
  });
});
console.log("🚀 ~ con:", con.size);

let all = 0;
con.forEach((v, k) => {
  const [x, y] = k.split(",");
  console.log(`[ [ Vector { x: ${x}, y: ${y} } ] ]`);
  console.log(`trail: ${v.length}`);
  all += v.length;
});
// 1116
// 81
console.log("🚀 ~ res:", all);

function walk(point: Coord) {
  const spotH = spotFromMap(point)!;

  const ds = Directions.map((d) => {
    const toSpot = addCoord(point, d);
    const toSpotH = spotFromMap(toSpot);
    if (!toSpotH || toSpotH != (spotH + 1)) return [point, null];
    if (toSpotH == 9) {
      con.get(id)?.push(toSpot.toString());
    }

    return [point, walk(toSpot)]; //?? [point, toSpot];
  });
  return ds;
}

function addCoord(a: Coord, b: Coord): Coord {
  const newCoord: Coord = [a[0] + b[0], a[1] + b[1]];
  return newCoord;
}

function spotFromMap(coord: Coord): number | null {
  if (
    coord.some((c) => {
      if (c >= map.length || c < 0) {
        return true;
      }
    })
  ) return null;
  return map[coord[1]][coord[0]];
}
