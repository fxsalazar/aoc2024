import {
  addCoords,
  Coord,
  Direction,
  East,
  North,
  South,
  West,
} from "../utils.ts";

const BRICK = "#";
const BOX = "O";
const EMPTY = ".";
const ROBOT = "@";

const [rawMap, rawMoves] = Deno.readTextFileSync(
  new URL("./input-t", import.meta.url),
).split("\n\n");
let robotPosition!: Coord;
const map = rawMap.split("\n").map((l, y) => {
  const indexStartPoint = l.indexOf("@");
  if (indexStartPoint != -1) robotPosition = { x: indexStartPoint, y };
  return l.split("");
});
// const mapW = map[0].length;
// const mapH = map.length;
const moves = rawMoves.split("").filter((m) => m != "\n");
moves.forEach((m) => {
  if (m === "<") goMove(robotPosition, West);
  if (m === ">") goMove(robotPosition, East);
  if (m === "v") goMove(robotPosition, South);
  if (m === "^") goMove(robotPosition, North);
});
console.log("🚀 ~ map ~ map:", map.map((l) => l.join("")));
let res = 0;
map.forEach((l, y) => {
  l.forEach((p, x) => {
    if (p === BOX) {
      //   console.log("🚀 ~ l.forEach ~ p:", p, x, y);
      res += (100 * y) + x;
    }
  });
});
console.log("🚀 ~ res:", res);

function goMove(from: Coord, dir: Direction) {
  const newPositionCoords = addCoords(from, dir);
  const newPosition = map[newPositionCoords.y][newPositionCoords.x];
  const position = map[from.y][from.x];
  if (newPosition === BRICK) return false;
  if (newPosition === EMPTY || goMove(newPositionCoords, dir)) {
    setOnMap(from, EMPTY);
    setOnMap(newPositionCoords, position);
    if (position === ROBOT) robotPosition = newPositionCoords;
    return true;
  }
}

function setOnMap(coord: Coord, value: string) {
  map[coord.y][coord.x] = value;
}
