import { getPuzzleInput } from "../util/getPuzzleInput.js";

const input = await getPuzzleInput(4);

const inputLines = input.split("\n").filter((line) => !!line.trim());

const scratchCardRegex =
  /^Card +\d+:(?<winningNumbers>[ \d]+)\|(?<cardNumbers>[ \d]+)/;

const numberRegex = /\d+/g;

function getNumberValues(input: string): number[] {
  const result: number[] = [];

  for (const numberMatch of input.matchAll(numberRegex)) {
    result.push(Number.parseInt(numberMatch[0]));
  }

  return result;
}

let total = 0;

for (const line of inputLines) {
  const scratchCardMatch = scratchCardRegex.exec(line)!;

  const winningNumbers = getNumberValues(
    scratchCardMatch.groups!.winningNumbers
  );
  const cardNumbers = getNumberValues(scratchCardMatch.groups!.cardNumbers);

  const amountWon = winningNumbers.filter((winningNumber) =>
    cardNumbers.includes(winningNumber)
  ).length;

  if (amountWon > 0) {
    total += Math.pow(2, amountWon - 1);
  }
}

console.log(total);
