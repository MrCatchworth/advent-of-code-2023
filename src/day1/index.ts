import { getPuzzleInput } from "../util/getPuzzleInput.js";

const textDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function getDigitAt(line: string, index: number): number | undefined {
  const char = line[index];

  if (char >= "0" && char <= "9") {
    return Number.parseInt(char);
  }

  for (const [digitIndex, textDigit] of textDigits.entries()) {
    if (line.startsWith(textDigit, index)) {
      return digitIndex + 1;
    }
  }

  return undefined;
}

const input = await getPuzzleInput(1);

let total = 0;

for (const line of input.split("\n")) {
  let digits: [first: number, last: number] | undefined;

  for (let i = 0; i < line.length; i++) {
    const digit = getDigitAt(line, i);

    if (digit === undefined) continue;

    if (!digits) {
      digits = [digit, digit];
    } else {
      digits[1] = digit;
    }
  }

  if (digits) {
    const lineTotal = digits[0] * 10 + digits[1];

    total += lineTotal;
  }
}

console.log(total);
