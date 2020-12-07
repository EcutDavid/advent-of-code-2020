const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

function joinWords(parts, start, end) {
  return parts.slice(start, end + 1).join(' ');
}

function parseAdjMap(lines) {
  const adjMap = new Map();
  lines.filter(l => !l.includes("contain no other bags.")).forEach(l => {
    const [left, right] = l.split(' contain ');
    const leftParts = left.split(' ');
    const id = joinWords(leftParts, 0, leftParts.length - 2);
    if (!adjMap.get(id)) {
      adjMap.set(id, new Map());
    }
    right.split(', ').forEach(d => {
      const dParts = d.split(' ');
      const dNum = Number(dParts[0]);
      const dId = joinWords(dParts, 1, dParts.length - 2);
      adjMap.get(id).set(dId, dNum);
    });
  });
  return adjMap;
}

function canFindShinyGold(adjMap, node) {
  if (node === 'shiny gold') return true;
  if (!adjMap.get(node)) return false;
  for (const [k] of adjMap.get(node)) {
    if (canFindShinyGold(adjMap, k)) {
      return true;
    }
  }
  return false;
}

function calcContainedBags(adjMap, node) {
  if (!adjMap.get(node)) return 0;
  let ret = 0;
  for (const [k, v] of adjMap.get(node)) {
    ret += v * (1 + calcContainedBags(adjMap, k));
  }
  return ret;
}

function solve(caseLines) {
  const adjMap = parseAdjMap(caseLines);
  // Q1
  let q1Ret = 0;
  for (const [k] of adjMap) {
    if (k === "shiny gold") continue;
    q1Ret += canFindShinyGold(adjMap, k) ? 1 : 0;
  }
  console.log(q1Ret);

  // Q2
  console.log(calcContainedBags(adjMap, 'shiny gold'))
}

function run() {
  const caseLines = [];
  rl.on("line", (line) => caseLines.push(line)).on("close", () =>
    solve(caseLines)
  );
}

run();
