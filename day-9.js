const readCases = require('./read-cases');
readCases().then(solve);

function updateMap(m, n) {
  if (!m.get(n)) {
    m.set(n, 0);
  }
  m.set(n, m.get(n) + 1);
}

function solveQ1(nums, pLength = 25) {
  const pMap = new Map();
  let pCount = 0;
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (pCount < pLength) {
      updateMap(pMap, n);
      pCount++;
      continue;
    }
    for (const [k, v] of pMap) {
      if (v <= 0) continue;
      if (k * 2 != n && pMap.get(n - k) > 0) {
        updateMap(pMap, n);
        break;
      }
    }
    if (!pMap.get(n)) return n;
    pMap.set(nums[i - pLength], pMap.get(nums[i - pLength]) - 1);
  }
}

function solve(caseLines) {
  caseLines = caseLines.map(Number);
  // Q1
  const q1Ret = solveQ1(caseLines, 25);
  console.log(q1Ret);

  // Q2
  const prefixSums = [0];
  for (let i = 0; i < caseLines.length; i++) {
    prefixSums.push(prefixSums[i] + caseLines[i]);
  }

  for (let i = 0; i < caseLines.length; i++) {
    for (let j = i + 2; j <= caseLines.length; j++) {
      if (prefixSums[j] - prefixSums[i] !== q1Ret) {
        continue;
      }
      let minNum = 1e9;
      let maxNum = -1e9;
      for (let k = i - 1; k < j; k++) {
        minNum = Math.min(minNum, caseLines[k]);
        maxNum = Math.max(maxNum, caseLines[k]);
      }
      console.log(minNum + maxNum);
      return;
    }
  }
}
