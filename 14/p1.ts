import { Coord } from "../utils.ts";
type Robot = {
  p: Coord;
  v: Coord;
};
const envvars = [
  { MATRIX_H: 7, MATRIX_W: 11, file: "./input-t", times: 100 },
  { MATRIX_H: 103, MATRIX_W: 101, file: "./input", times: 100 },
];
const envarSelection = 1;

solve();

function solve() {
  const robots = Deno.readTextFileSync(
    new URL(envvars[envarSelection].file, import.meta.url),
  )
    .split("\n").map<Robot>((r) => {
      const mt = r.match(/[-]?\d+/g)!.map(Number);
      return { p: { x: mt[0], y: mt[1] }, v: { x: mt[2], y: mt[3] } };
    });

  const xQuadValue = Math.floor(envvars[envarSelection].MATRIX_W / 2);
  const yQuadValue = Math.floor(envvars[envarSelection].MATRIX_H / 2);
  //   console.log("🚀 ~ solve ~ xQuadValue:", xQuadValue, yQuadValue);
  const quadrantsQuantities = new Map<number, number>();
  robots.forEach((robot) => {
    const newX = calculateNewPoint(
      robot.p.x,
      envvars[envarSelection].MATRIX_W,
      robot.v.x,
      envvars[envarSelection].times,
    );
    const newY = calculateNewPoint(
      robot.p.y,
      envvars[envarSelection].MATRIX_H,
      robot.v.y,
      envvars[envarSelection].times,
    );

    if (newX < xQuadValue && newY < yQuadValue) {
      quadrantsQuantities.set(1, (quadrantsQuantities.get(1) ?? 0) + 1);
    }
    if (newX < xQuadValue && newY > yQuadValue) {
      quadrantsQuantities.set(4, (quadrantsQuantities.get(4) ?? 0) + 1);
    }
    if (newX > xQuadValue && newY < yQuadValue) {
      quadrantsQuantities.set(2, (quadrantsQuantities.get(2) ?? 0) + 1);
    }
    if (newX > xQuadValue && newY > yQuadValue) {
      quadrantsQuantities.set(3, (quadrantsQuantities.get(3) ?? 0) + 1);
    }
    // console.log(
    //   "🚀 ~ robots.forEach ~ newPosition:",
    //   robot.p.x,
    //   robot.p.y,
    //   newX,
    //   newY,
    // );
  });
  console.log("🚀 ~ solve ~ quadrantsQuantities:", quadrantsQuantities);
  let res = 1;
  quadrantsQuantities.forEach((element) => {
    // console.log("🚀 ~ solve ~ element:", element);
    res *= element;
  });
  console.log("🚀 ~ solve ~ res:", res);
}

// console.log(
//   "🚀 ~ calculateNewPoint:",
//   calculateNewPoint(2, envvars[envarSelection].MATRIX_W, 2, 5),
// );
function calculateNewPoint(
  point: number,
  maxPointValue: number,
  velocity: number,
  times: number,
): number {
  const pfy = point + (times * velocity);
  //   console.log(point, times, velocity, pfy);
  if (pfy < 0) {
    const pfyMod = pfy % maxPointValue;
    const fy = pfyMod == 0 ? 0 : pfyMod + maxPointValue;
    // console.log("-y=", fy);
    return fy;
  }
  const fy = pfy % maxPointValue;
  //   console.log("y=", fy);
  return fy;
}
