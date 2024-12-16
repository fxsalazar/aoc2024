export const readInput = (path: string) => {
  return Deno.readTextFileSync(new URL("input", path));
};

export const readTestInput = (path: string) => {
  return Deno.readTextFileSync(new URL("input-t", path));
};

export type Coord = { x: number; y: number };
export const North: Coord = { x: 0, y: -1 };
export const South: Coord = { x: 0, y: 1 };
export const West: Coord = { x: -1, y: 0 };
export const East: Coord = { x: 1, y: 0 };
export type Direction = Coord;

export function addCoords(coordA: Coord, coordB: Coord): Coord {
  return { x: coordA.x + coordB.x, y: coordA.y + coordB.y };
}
