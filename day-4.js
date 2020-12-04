const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const Q1_REQ_FIELDS = new Set([
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
]);
const Q2_REQ_FIELDS_CHECK = new Map([
  ["byr", d => {
    const num = Number(d);
    if (Number.isNaN(num)) return false;
    return num >= 1920 && num <= 2002;
  }],
  ["iyr", d => {
    const num = Number(d);
    if (Number.isNaN(num)) return false;
    return num >= 2010 && num <= 2020;
  }],
  ["eyr", d => {
    const num = Number(d);
    if (Number.isNaN(num)) return false;
    return num >= 2020 && num <= 2030;
  }],
  ["hgt", d => {
    const dSize =  d.length;
    if (dSize < 3) return false;
    const type = d.slice(dSize - 2);
    if (type != 'cm' && type != 'in') return false;
    const num = Number(d.slice(0, dSize - 2));
    if (Number.isNaN(num)) return false;
    if (type == 'cm') {
      return num >= 150 && num <= 193;
    }
    return num >= 59 && num <= 76;
  }],
  ["hcl", d => /^#[0-9a-f]{6}$/.test(d)],
  ["ecl", d => {
    const eclSet = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
    return eclSet.has(d);
  }],
  ["pid", d => /^[0-9]{9}$/.test(d)],
]);

function checkQ1Validation(lines) {
  let reqCount = 0;
  lines.join(' ').split(' ').forEach(d => {
    const id = d.split(':')[0];
    if (Q1_REQ_FIELDS.has(id)) reqCount++;
  })
  return reqCount === Q1_REQ_FIELDS.size;
}

function checkQ2Validation(lines) {
  let reqCount = 0;
  let t = 0;
  lines.join(' ').split(' ').forEach(d => {
    const [id, value] = d.split(':');
    if (Q1_REQ_FIELDS.has(id)) {
      const check = Q2_REQ_FIELDS_CHECK.get(id);
      t++;
      if (check(value)) {
        reqCount++;
      }
    }
  })
  return reqCount === Q1_REQ_FIELDS.size;
}

function solve(caseLines) {
  // Q1
  let cur = [];
  let q1Ret = 0;
  for (let i = 0; i < caseLines.length; i++) {
    if (caseLines[i] === '') {
      q1Ret += checkQ1Validation(cur) ? 1 : 0;
      cur = [];
      continue;
    }
    cur.push(caseLines[i]);
    if (i === caseLines.length - 1) {
      q1Ret += checkQ1Validation(cur) ? 1 : 0;
      cur = [];
    }
  }
  console.log(q1Ret);

  // Q2
  let q2Ret = 0;
  for (let i = 0; i < caseLines.length; i++) {
    if (caseLines[i] === '') {
      q2Ret += checkQ2Validation(cur) ? 1 : 0;
      cur = [];
      continue;
    }
    cur.push(caseLines[i]);
    if (i === caseLines.length - 1) {
      q2Ret += checkQ2Validation(cur) ? 1 : 0;
    }
  }
  console.log(q2Ret);
}

function run() {
  const caseLines = [];
  rl.on("line", (line) => caseLines.push(line)).on("close", () =>
    solve(caseLines)
  );
}

run();
