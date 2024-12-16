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
const BOX_LEFT_SIDE = "[";
const BOX_RIGHT_SIDE = "]";

const [rawMap, rawMoves] = Deno.readTextFileSync(
  new URL("./input", import.meta.url),
).split("\n\n");
let robotPosition!: Coord;
const map = rawMap.split("\n").map((l, y) => {
  const newMapLine = l.replaceAll(BRICK, "##")
    .replaceAll(BOX, "[]")
    .replaceAll(EMPTY, "..")
    .replaceAll(ROBOT, "@.");
  const indexStartPoint = newMapLine.indexOf("@");
  if (indexStartPoint != -1) robotPosition = { x: indexStartPoint, y };
  return newMapLine.split("");
});

const moves = rawMoves.split("").filter((m) => m != "\n");
moves.forEach((m) => {
  if (m === "<") goMove([robotPosition], West);
  if (m === ">") goMove([robotPosition], East);
  if (m === "v") goMove([robotPosition], South);
  if (m === "^") goMove([robotPosition], North);
});
let res = 0;
map.forEach((l, y) => {
  l.forEach((p, x) => {
    if (p === BOX_LEFT_SIDE) {
      res += (100 * y) + x;
    }
  });
});
console.log("🚀 ~ res:", res);
// console.log("🚀 ~ map ~ map:", map.map((l) => l.join("")));

function goMove(from: Array<Coord>, dir: Direction) {
  const newPositionsCoords = from.map((cc) => addCoords(cc, dir));
  const newPositions = newPositionsCoords.map((npc) => map[npc.y][npc.x]);
  const positions = from.map((cc) => map[cc.y][cc.x]);
  if (newPositions.some((v) => v === BRICK)) return false;
  const maybeBoxCoord = (dir === North || dir === South)
    ? getBoxCoords(newPositionsCoords)
    : newPositionsCoords;
  if (
    newPositions.every((v) => v === EMPTY) || goMove(maybeBoxCoord, dir)
  ) {
    newPositionsCoords.forEach((c, i) => setOnMap(c, positions[i]));
    from.forEach((c) => setOnMap(c, EMPTY));
    if (positions[0] === ROBOT) robotPosition = newPositionsCoords[0];
    return true;
  }
}

function getBoxCoords(newPositionsCoords: Array<Coord>) {
  const allCoords = newPositionsCoords.map((c) => {
    const position = getOnMap(c);
    if (position === BOX_LEFT_SIDE) {
      return [c, { x: c.x + 1, y: c.y }] satisfies Array<Coord>;
    }
    if (position === BOX_RIGHT_SIDE) {
      return [{ x: c.x - 1, y: c.y }, c] satisfies Array<Coord>;
    }
    return [];
  }).flat();
  return allCoords;
}

function getOnMap(coord: Coord) {
  return map[coord.y][coord.x];
}

function setOnMap(coord: Coord, value: string) {
  map[coord.y][coord.x] = value;
}
