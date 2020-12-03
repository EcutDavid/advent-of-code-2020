const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const Q1_X_INC = 3;
const Q1_Y_INC = 1;

const Q2_INCS = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

function solveQ1(lines, incX, incY) {
  let treeCount = 0,
    x = incX,
    y = incY;
  while (y < lines.length) {
    treeCount += lines[y][x % lines[0].length] === "#" ? 1 : 0;
    x += incX;
    y += incY;
  }
  return treeCount;
}

function solve(caseLines) {
  // Q1
  console.log(`Q1: ${solveQ1(caseLines, Q1_X_INC, Q1_Y_INC)}`);

  // Q2
  let q2Ret = 1;
  Q2_INCS.forEach((d) => {
    const part = solveQ1(caseLines, d[0], d[1]);
    q2Ret *= part;
  });
  console.log(`Q2: ${q2Ret}`);
}

function run() {
  const caseLines = [];
  rl.on("line", (line) => caseLines.push(line)).on("close", () =>
    solve(caseLines)
  );
}

run();
