import { getPuzzleInput } from "../util/getPuzzleInput.js";

const input = await getPuzzleInput(3);

const inputLines = input.split("\n").filter((line) => !!line.trim());

const numRows = inputLines.length;
const numCols = inputLines[0].length;

function spliceAllWhere<T>(
  array: Array<T>,
  predicate: (item: T, index: number, array: Array<T>) => boolean
) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      array.splice(i, 1);
    }
  }
}

function isDigit(char: string) {
  return char >= "0" && char <= "9";
}

function* allIndecesOfChar(value: string, char: string): Generator<number> {
  if (!value) {
    return;
  }

  let nextScanIndex = 0;
  while (true) {
    const foundIndex = value.indexOf(char, nextScanIndex);

    if (foundIndex === -1) {
      return;
    }

    nextScanIndex = foundIndex + 1;
    yield foundIndex;
  }
}

function getWordValues(
  words: { row: number; col: number; length: number }[]
): string[] {
  return words.map(({ row, col, length }) =>
    inputLines[row].substring(col, col + length)
  );
}

function* adjacentCells(
  row: number,
  col: number
): Generator<[row: number, col: number]> {
  if (row > 0) {
    if (col > 0) {
      yield [row - 1, col - 1];
    }

    yield [row - 1, col];

    if (col < numCols - 1) {
      yield [row - 1, col + 1];
    }
  }

  if (col < numCols - 1) {
    yield [row, col + 1];
  }

  if (row < numRows - 1) {
    if (col < numCols - 1) {
      yield [row + 1, col + 1];
    }

    yield [row + 1, col];

    if (col > 0) {
      yield [row + 1, col - 1];
    }
  }

  if (col > 0) {
    yield [row, col - 1];
  }
}

function scanWordFrom(
  row: number,
  col: number,
  matchChar: (char: string) => boolean
): [startIndex: number, endIndex: number] {
  const line = inputLines[row];

  let startCol = col;
  while (startCol > 0 && matchChar(line[startCol - 1])) {
    startCol--;
  }

  let endCol = col;
  while (endCol < numCols - 1 && matchChar(line[endCol + 1])) {
    endCol++;
  }

  return [startCol, endCol];
}

function scanWordsFromAll(
  cells: [row: number, col: number][],
  matchChar: (char: string) => boolean
): { row: number; col: number; length: number }[] {
  const queue = cells.slice();
  let result: { row: number; col: number; length: number }[] = [];

  while (queue.length > 0) {
    const [scanRow, scanCol] = queue.shift()!;

    if (!matchChar(inputLines[scanRow][scanCol])) {
      continue;
    }

    const [wordStart, wordEnd] = scanWordFrom(scanRow, scanCol, matchChar);

    result.push({
      row: scanRow,
      col: wordStart,
      length: wordEnd - wordStart + 1,
    });

    spliceAllWhere(
      queue,
      ([row, col]) => row === scanRow && col >= wordStart && col <= wordEnd
    );
  }

  return result;
}

let total = 0;

for (const [row, line] of inputLines.entries()) {
  for (const asteriskCol of allIndecesOfChar(line, "*")) {
    const allAdjacentNumberWords = scanWordsFromAll(
      [...adjacentCells(row, asteriskCol)],
      isDigit
    );

    if (allAdjacentNumberWords.length !== 2) {
      continue;
    }

    const gearPartNumbers = getWordValues(allAdjacentNumberWords).map((word) =>
      Number.parseInt(word)
    );

    total += gearPartNumbers[0] * gearPartNumbers[1];
  }
}

console.log(total);
