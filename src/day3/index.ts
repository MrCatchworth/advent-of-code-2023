import { getPuzzleInput } from "../util/getPuzzleInput.js";

const input = await getPuzzleInput(3);

const inputLines = input.split("\n").filter((line) => !!line.trim());

const numLines = inputLines.length;
const numCols = inputLines[0].length;

function isSymbol(symbol: string) {
  if (symbol >= "0" && symbol <= "9") {
    return false;
  }

  if (symbol === ".") {
    return false;
  }

  return true;
}

function* getNumberAdjacentCells(
  numberLine: number,
  numberColStart: number,
  length: number
): Generator<[line: number, col: number]> {
  let currentLine = numberLine - 1;
  let currentCol = numberColStart - 1;

  function inBounds() {
    return (
      currentLine >= 0 &&
      currentLine < numLines &&
      currentCol >= 0 &&
      currentCol < numCols
    );
  }

  if (inBounds()) {
    yield [currentLine, currentCol];
  }

  for (let i = 0; i < length + 1; i++) {
    currentCol++;

    if (inBounds()) {
      yield [currentLine, currentCol];
    }
  }

  for (let i = 0; i < 2; i++) {
    currentLine++;

    if (inBounds()) {
      yield [currentLine, currentCol];
    }
  }

  for (let i = 0; i < length + 1; i++) {
    currentCol--;

    if (inBounds()) {
      yield [currentLine, currentCol];
    }
  }

  currentLine--;

  if (inBounds()) {
    yield [currentLine, currentCol];
  }
}

const numberRegex = /\d+/g;

let total = 0;

for (const [lineIndex, line] of inputLines.entries()) {
  for (const numberMatch of line.matchAll(numberRegex)) {
    const number = Number.parseInt(numberMatch[0]);

    for (const [searchLine, searchCol] of getNumberAdjacentCells(
      lineIndex,
      numberMatch.index!,
      numberMatch[0].length
    )) {
      if (isSymbol(inputLines[searchLine][searchCol])) {
        total += number;
        break;
      }
    }
  }
}

console.log(total);
