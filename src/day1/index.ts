import { getPuzzleInput } from "../util/getPuzzleInput.js";

const input = await getPuzzleInput(1);

let total = 0;

for (const line of input.split("\n")) {
  let digits: [first: string, last: string] | undefined;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char < "0" || char > "9") continue;

    if (!digits) {
      digits = [char, char];
    } else {
      digits[1] = char;
    }
  }

  if (digits) {
    const [firstValue, lastValue] = [
      Number.parseInt(digits[0]),
      Number.parseInt(digits[1]),
    ];

    const lineTotal = firstValue * 10 + lastValue;

    total += lineTotal;
  }
}

console.log(total);
