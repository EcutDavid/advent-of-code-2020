const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

function trasnsferRL(c) {
  if (c === 'L') return 'F';
  if (c === 'R') return 'B';
  return c;
}

function getId(str) {
  let l = 0;
  let r = Math.pow(2, str.length) - 1;
  for (const c of str) {
    const mid = Math.floor((l + r) / 2);
    if (c === 'F') {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

function solve(caseLines) {
  // Q1
  let q1Ret = 0;
  const newLines = caseLines.map(l => l.split('').map(trasnsferRL).join(''));
  newLines.forEach(d => {
    q1Ret = Math.max(getId(d), q1Ret);
  });
  console.log(q1Ret);

  // Q2
  const idSet = new Set();
  newLines.forEach(d => {
    idSet.add(getId(d));
  });
  for (let i = 1; i < q1Ret; i++) {
    if (idSet.has(i - 1) && !idSet.has(i) && idSet.has(i + 1)) {
      // Q2 answer
      console.log(i);
    }
  }
}

function run() {
  const caseLines = [];
  rl.on("line", (line) => caseLines.push(line)).on("close", () =>
    solve(caseLines)
  );
}

run();
