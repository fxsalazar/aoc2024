let startingPosition: [number, number] = [0, 0];
type DIRECTION = [number, number];
const North: DIRECTION = [0, -1];
const South: DIRECTION = [0, 1];
const West: DIRECTION = [-1, 0];
const East: DIRECTION = [1, 0];
let outOfScope = false;

const matrix = Deno.readTextFileSync(new URL("./input", import.meta.url))
  .split("\n").map((l, il) => {
    const i = l.indexOf("^");
    if (i != -1) startingPosition = [i, il];
    return Array.from(l);
  });
let coountedPositions = 1;

while (!outOfScope) {
  run(startingPosition, North);
}
console.log("🚀 ~ coountedPositions:", coountedPositions);

function run(position: [number, number], direction: DIRECTION) {
  let a;
  let moving = position;
  do {
    // console.log("🚀 ~ run ~ moving:", moving);
    moving = [moving[0] + direction[0], moving[1] + direction[1]];
    // console.log("🚀 ~ run ~ moving:", moving);
    try {
      a = matrix[moving[1]][moving[0]];
      if (a == undefined) {
        // console.log("🚀 ~ run ~ a:", a);
        outOfScope = true;
        break;
      }
      if (a !== "#") {
        if (a !== "^" && a !== "X") {
          //   console.log("🚀 ~ run ~ coountedPositions:", moving);
          matrix[moving[1]][moving[0]] = "X";
          coountedPositions++;
        }
      } else {run(
          [moving[0] - direction[0], moving[1] - direction[1]],
          nextDirection(direction),
        );}
    } catch (_) {
      outOfScope = true;
      break;
    }
  } while (a !== "#");
  //   return 0;
}

function nextDirection(direction: DIRECTION): DIRECTION {
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
