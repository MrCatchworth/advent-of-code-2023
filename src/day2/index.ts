import { getPuzzleInput } from "../util/getPuzzleInput.js";

const gameIdRegex = /^Game (\d+): /;
const redCountRegex = /(\d+) red/g;
const greenCountRegex = /(\d+) green/g;
const blueCountRegex = /(\d+) blue/g;

function doesBallCountExceed(
  line: string,
  regex: RegExp,
  maximum: number
): boolean {
  for (const match of line.matchAll(regex)) {
    const ballCount = Number.parseInt(match[1]);

    if (ballCount > maximum) {
      return true;
    }
  }

  return false;
}

const input = await getPuzzleInput(2);

console.log(input);

let total = 0;

for (const line of input.split("\n")) {
  if (!line.trim()) {
    continue;
  }

  const gameId = Number.parseInt(gameIdRegex.exec(line)![1]);

  if (
    !doesBallCountExceed(line, redCountRegex, 12) &&
    !doesBallCountExceed(line, greenCountRegex, 13) &&
    !doesBallCountExceed(line, blueCountRegex, 14)
  ) {
    total += gameId;
  }

  redCountRegex.lastIndex = 0;
  greenCountRegex.lastIndex = 0;
  blueCountRegex.lastIndex = 0;
}

console.log(total);
