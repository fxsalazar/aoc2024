const machines = Deno.readTextFileSync(new URL("./input", import.meta.url))
  .split("\n\n");
// console.log("🚀 ~ machines:", machines);
type Coord = { x: number; y: number };
type Button = Coord;
type Prize = Coord;
type Machine = { buttonA: Button; buttonB: Button; prize: Prize };
const buttonAPrize = 3;
const addition = 10_000_000_000_000;

solve(1);
solve(2);

function solve(part: 1 | 2) {
  const res = machines.map((ml) => {
    const ls = ml.split("\n").map((b) => {
      const vs = b.match(/\d+/g)?.map(Number);
      return { x: vs![0], y: vs![1] };
    });
    const p = play({
      buttonA: ls[0],
      buttonB: ls[1],
      prize: {
        x: ls[2].x + (part == 2 ? addition : 0),
        y: ls[2].y + (part == 2 ? addition : 0),
      },
    });
    return p;
  }).reduce((acc, v) => acc += v, 0);
  console.log("🚀 ~ res ~ res:", res);
}

function play(machine: Machine): number {
  // Solving for m & n
  //    mXa + nXb = Xp => m = (Xp - nXb) / Xa
  //    mYa + nYb = Yp
  // => ((Xp - nXb) / Xa)Ya + nYb = Yp
  // => ((Xp - nXb)Ya / Xa) + nYb = Yp
  // => nYb = Yp - ((Xp - nXb)Ya / Xa)
  // => n = (Yp - ((Xp - nXb)Ya / Xa)) / Yb
  const n = ((machine.buttonA.y * machine.prize.x) -
    (machine.buttonA.x * machine.prize.y)) /
    ((machine.buttonA.y * machine.buttonB.x) -
      (machine.buttonA.x * machine.buttonB.y));
  const m = (machine.prize.x - (machine.buttonB.x * n)) / machine.buttonA.x;
  if (Number.isInteger(n) && Number.isInteger(m)) return (m * buttonAPrize) + n;
  return 0;
}
