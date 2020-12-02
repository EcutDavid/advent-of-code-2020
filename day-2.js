const { match } = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

function solve(caseLines) {
  // Q1
  let q1Total = 0;
  caseLines.forEach((d) => {
    const [range, indicator, text] = d.split(" ");
    const [l, r] = range.split('-').map(Number);
    let matchSum = text.split('').filter(c => c === indicator[0]).length;
    q1Total += matchSum >= l && matchSum <= r;
  });
  console.log(q1Total);

  // Q2
  let q2Total = 0;
  caseLines.forEach((d) => {
    const [range, indicator, text] = d.split(" ");
    const [l, r] = range.split('-').map(Number);
    const lMatch = text[l - 1] === indicator[0];
    const rMatch = text[r - 1] === indicator[0];

    q2Total += lMatch && !rMatch || !lMatch && rMatch ? 1 : 0;
  });
  console.log(q2Total);
}

function run() {
  const caseLines = [];
  rl.on("line", (line) => caseLines.push(line)).on("close", () =>
    solve(caseLines)
  );
}

run();
