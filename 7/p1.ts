const lines = Deno.readTextFileSync(new URL("./input", import.meta.url))
  .split("\n");
const t = lines.map((l) => {
  const eq = splitLine(l);
  const perms = permutate(eq.ops);
  for (let i = 0; i < perms.length; i++) {
    const perm = perms[i];
    let op = "+";
    const a = perm.split(/([+|*])/).filter((x) => x.length != 0)
      .reduce((acc, v) => {
        const parsedV = Number(v);
        if (isNaN(parsedV)) {
          op = v;
          return acc;
        }
        return op === "+" ? acc += parsedV : acc *= parsedV;
      }, 0);
    if (a == eq.result) {
      return a;
    }
  }
  return 0;
}).reduce((acc, v) => acc += v);
console.log("🚀 ~ t ~ t:", t);

function permutate(ops: Array<string>) {
  let a: Array<string> = [];
  a.push("+" + ops[ops.length - 1]);
  a.push("*" + ops[ops.length - 1]);
  for (let i = ops.length - 2; i >= 0; i--) {
    if (i > 0) {
      a = ["+", "*"].map((o) => o + ops[i]).map((o) => a.map((x) => o + x))
        .flat();
      continue;
    }
    a = a.map((aa) => ops[i] + aa);
  }
  return a;
}

function splitLine(line: string) {
  const ls = line.split(":");
  return { result: Number(ls[0]), ops: ls[1].trim().split(" ") }; //.map(Number) };
}
