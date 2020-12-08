const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

module.exports = function () {
  return new Promise(res => {
  const caseLines = [];
  rl.on("line", (line) => caseLines.push(line)).on("close", () =>
    res(caseLines)
  );
  });
}
