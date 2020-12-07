const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

function parseGroups(lines) {
  const ret = [];
  const cur = [];
  for (const d of lines) {
    if (d === '') {
      ret.push(cur.slice(0));
      cur.splice(0, cur.length);
      continue;
    }
    cur.push(d);
  }
  ret.push(cur);
  return ret;
}

function getGroupAnsCountForQ1(group) {
  const s = new Set();
  group.forEach(d => {
    d.split('').forEach(c => {
      s.add(c);
    })
  });
  return s.size;
}

function getGroupAnsCountForQ2(group) {
  const m = new Map();
  group.forEach(d => {
    d.split('').forEach(c => {
      if (!m.get(c)) {
        m.set(c, 0);
      }
      m.set(c, m.get(c) + 1);
    });
  });
  let ret = 0;
  for (const [_, v] of m) {
    ret += v === group.length ? 1 : 0;
  }
  return ret;
}

function solve(caseLines) {
  const groups = parseGroups(caseLines);
  // Q1
  let q1Ret = 0;
  for(const g of groups) {
    q1Ret += getGroupAnsCountForQ1(g);
  }
  console.log(q1Ret);

  // Q2
  let q2Ret = 0;
  for(const g of groups) {
    q2Ret += getGroupAnsCountForQ2(g);
  }
  console.log(q2Ret)
}

function run() {
  const caseLines = [];
  rl.on("line", (line) => caseLines.push(line)).on("close", () =>
    solve(caseLines)
  );
}

run();
