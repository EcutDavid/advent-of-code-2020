const readCases = require("./read-cases");
readCases().then(solve);

function getSpokenNum(memo, num, round) {
  const prevRounds = memo.get(num);

  let ret = 0;
  if (prevRounds.length == 2) {
    ret = prevRounds[1] - prevRounds[0];
  }

  const retArr = memo.get(ret);

  if (!retArr) {
    memo.set(ret, [round]);
  } else if (retArr.length === 1) {
    retArr.push(round);
  } else {
    retArr.shift();
    retArr.push(round);
  }
  return ret;
}

function solve(lines) {
  const nums = lines[0].split(",").map(Number);
  const memo = new Map();
  let round = 1;
  while (round <= nums.length) {
    memo.set(nums[round - 1], [round]);
    round++;
  }

  let lastSpokenNum = nums[nums.length - 1];
  while (round < 3e7 + 1) {
    lastSpokenNum = getSpokenNum(memo, lastSpokenNum, round);
    round++;
  }
  console.log(lastSpokenNum);
}
