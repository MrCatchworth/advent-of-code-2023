import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import wretch from "wretch";

const cacheBasePath = join(fileURLToPath(import.meta.url), "../../../cache");

export async function getPuzzleInput(day: number) {
  const dayCachedPath = join(cacheBasePath, day + ".txt");

  try {
    return (await readFile(dayCachedPath)).toString();
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") {
      throw e;
    }

    const fetchedInput = await wretch(
      `https://adventofcode.com/2023/day/${day}/input`
    )
      .headers({ Cookie: `session=${process.env.ADVENT_OF_CODE_SESSION!}` })
      .get()
      .text();

    await writeFile(dayCachedPath, fetchedInput);

    return fetchedInput;
  }
}
