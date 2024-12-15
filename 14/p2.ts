import { Coord } from "../utils.ts";

type Robot = {
  p: Coord;
  v: Coord;
};
const envvars = [
  { MATRIX_H: 7, MATRIX_W: 11, file: "./input-t", times: 100 },
  { MATRIX_H: 103, MATRIX_W: 101, file: "./input", times: 0 },
];
const envarSelection = 1;

let plot: Array<Array<string>> = [];

// writeToFile(plot, 0);

solve();

function solve() {
  const robots = Deno.readTextFileSync(
    new URL(envvars[envarSelection].file, import.meta.url),
  ).split("\n").map<Robot>((r) => {
    const mt = r.match(/[-]?\d+/g)!.map(Number);
    return { p: { x: mt[0], y: mt[1] }, v: { x: mt[2], y: mt[3] } };
  });

  for (let i = 4827; i <= 10000; i = i + 103) {
    console.log("🚀 ~ solve ~ i:", i);
    plot = new Array(103).fill(null).map(() => new Array(101).fill(" "));
    robots.forEach((robot) => {
      const newX = calculateNewPoint(
        robot.p.x,
        envvars[envarSelection].MATRIX_W,
        robot.v.x,
        i,
      );
      const newY = calculateNewPoint(
        robot.p.y,
        envvars[envarSelection].MATRIX_H,
        robot.v.y,
        i,
      );
      // const newLocal = getFromPlot({ x: newX, y: newY });
      const v = "1";
      plot[newY][newX] = String(v);
    });
    writeToFile(plot, i);
  }
}

function getFromPlot(c: Coord): number {
  try {
    return Number(plot[c.y][c.x]);
  } catch (_) {
    return 0;
  }
}

function writeToFile(plot: Array<Array<string>>, n: number) {
  Deno.writeTextFileSync(
    `./pics/pict${n}.txt`,
    plot.map((l, i) => `${i}\t${l.join("")}`).join("\n"),
  );
  // const shouldProceed = confirm("Do you want to proceed?");
  // console.log("🚀 ~ writeToFile ~ shouldProceed:", shouldProceed);
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
