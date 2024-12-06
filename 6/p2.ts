let startingPosition: [number, number] = [0, 0];
type COORDINATES = [number, number];
const North: COORDINATES = [0, -1];
const South: COORDINATES = [0, 1];
const West: COORDINATES = [-1, 0];
const East: COORDINATES = [1, 0];

const matrix = Deno.readTextFileSync(new URL("./input", import.meta.url))
  .split("\n").map((l, il) => {
    const i = l.indexOf("^");
    if (i != -1) startingPosition = [i, il];
    return Array.from(l);
  });
let coountedPositions = 1;
let coountedP = 0;
let obsCounter = 0;
let stepCounter = 0;
let outOfPossibilities = false;
let obsPosition: { c: COORDINATES; d: COORDINATES } | null = null;
let loop = 0;
while (!outOfPossibilities) {
  try {
    simulate(JSON.parse(JSON.stringify(matrix)));
    // console.log("🚀 ~ matrix:", matrix);
    obsCounter++;
    // console.log("🚀 ~ obsCounter:", obsCounter);
  } catch (_) {
    // console.log("🚀 ~ e:", e);
    // outOfPossibilities = true;
    coountedP++;
    console.log("🚀 ~ coountedP:", coountedP);
  }
}
console.log("🚀 ~ coountedPositions:", coountedP);

function simulate(matrixCopy: string[][]) {
  let outOfScope = false;
  stepCounter = 0;
  loop = 0;
  obsPosition = null;
  while (!outOfScope) {
    try {
      outOfScope = run(matrixCopy, startingPosition, North);
    } catch (e: unknown) {
      outOfScope = true;
      // @ts-expect-error:
      if (e.message === "Infinite") {
        coountedP++;
        // @ts-ignore:
      }
    }
  }
  if (obsPosition?.c[0] == 59 && obsPosition?.c[1] == 7) {
    // console.log("🚀 ~ obsPosition:", obsPosition);
    // console.log("🚀 ~ obsPosition:", matrixCopy);
    Deno.writeTextFileSync("mm", matrixCopy + "\n", {});
  }
}

function run(
  matrixCopy: string[][],
  position: [number, number],
  direction: COORDINATES,
) {
  let a;
  let moving = position;
  do {
    // console.log("🚀 ~ run ~ moving:", moving);
    moving = [moving[0] + direction[0], moving[1] + direction[1]];
    const newLocal = stepCounter == obsCounter;
    const newLocal_1 = moving.toString() !== startingPosition.toString();
    if (newLocal && newLocal_1) {
      if (moving[0] == matrix.length || moving[1] == matrix.length) {
        outOfPossibilities = true;
        return true;
      }
      matrixCopy[moving[1]][moving[0]] = "O";
      obsPosition = { c: moving, d: direction };
    }
    // console.log("🚀 ~ run ~ moving:", stepCounter);
    try {
      a = matrixCopy[moving[1]][moving[0]];
      if (a == undefined) {
        // console.log("🚀 ~ run ~ a:", a);
        return true;
      }
      if (
        a === "O" &&
        obsPosition?.d[0] === direction[0] &&
        obsPosition?.d[1] === direction[1] &&
        stepCounter != obsCounter
      ) {
        if (loop > 1) throw new Error("Infinite");
        // console.log("🚀 ~ loop:", loop);
        loop++;
      }

      stepCounter++;
      // if (obsCounter > 17 && stepCounter > 17) {
      //   console.log("🚀 ~ matrixCopy:", matrixCopy);
      // }
      if (a !== "#" && a !== "O") {
        if (a !== "^" && a !== "X") {
          //   console.log("🚀 ~ run ~ coountedPositions:", moving);
          matrixCopy[moving[1]][moving[0]] = "X";
          coountedPositions++;
        }
      } else {
        return run(
          matrixCopy,
          [moving[0] - direction[0], moving[1] - direction[1]],
          nextDirection(direction),
        );
      }
    } catch (e: unknown) {
      // console.error("🚀 ~ e:", e);
      // @ts-expect-error:
      if (e.message === "Infinite") {
        throw e;
      }
      return true;
    }
  } while (a !== "#");
  return true;
}

function nextDirection(direction: COORDINATES): COORDINATES {
  switch (direction) {
    case North:
      return East;
    case East:
      return South;
    case South:
      return West;
    case West:
      return North;
  }
  return North;
}
