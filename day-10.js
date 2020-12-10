const readCases = require('./read-cases');
readCases().then(solve);

function walk(nums, index) {
  if (index === nums.length - 1) return 1;
  let ret = 0;
  const cur = nums[index];
  for (let i = index + 1; i < nums.length; i++) {
    if (nums[i] - cur > 3) break;
    ret += walk(nums, i);
  }
  return ret;
}

function solve(lines) {
  const nums = [0].concat(lines.map(Number));
  // Q1
  let inc3Count = 0;
  let inc1Count = 0;
  nums.sort((a, b) => a - b);
  nums.push(nums[nums.length - 1] + 3);
  for (let i = 0; i < nums.length - 1; i++) {
    const diff = nums[i + 1] - nums[i];
    if (diff === 3) inc3Count++;
    if (diff === 1) inc1Count++;
  }
  console.log(inc3Count * inc1Count);


  // Q2
  const memo = [];
  memo.push(1);

  for (let i = 1; i < nums.length; i++) {
    memo.push(0);
    for (let j = 1; j <= 3; j++) {
      const index = i - j;
      if (index < 0 || nums[i] - nums[index] > 3) break;
      memo[i] += memo[index];
    }
  }
  console.log(memo[memo.length - 1]);
}
