export const readInput = (path: string) => {
  return Deno.readTextFileSync(new URL("input", path));
};

export const readTestInput = (path: string) => {
  return Deno.readTextFileSync(new URL("input-t", path));
};
