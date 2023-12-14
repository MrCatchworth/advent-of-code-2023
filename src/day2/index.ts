import { getPuzzleInput } from "../util/getPuzzleInput.js";

const gameIdRegex = /^Game (\d+): /;
const ballCountRegex = /(\d+) (red|green|blue)/g;

function getHighestBallCounts(line: string): {
  red: number;
  green: number;
  blue: number;
} {
  const result = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const match of line.matchAll(ballCountRegex)) {
    const ballCount = Number.parseInt(match[1]);
    const ballColour = match[2] as "red" | "green" | "blue";

    if (ballColour === "red" && ballCount > result.red) {
      result.red = ballCount;
    }
    if (ballColour === "green" && ballCount > result.green) {
      result.green = ballCount;
    }
    if (ballColour === "blue" && ballCount > result.blue) {
      result.blue = ballCount;
    }
  }

  ballCountRegex.lastIndex = 0;

  return result;
}

const input = await getPuzzleInput(2);

let total = 0;

for (const line of input.split("\n")) {
  if (!line.trim()) {
    continue;
  }

  const { red, green, blue } = getHighestBallCounts(line);

  const power = red * green * blue;

  total += power;
}

console.log(total);
