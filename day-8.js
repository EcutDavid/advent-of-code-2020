const readCases = require('./read-cases');
readCases().then(solve);

function runCode(cmds) {
  let acc = 0;
  let pc = 0;
  const visited = new Set();
  while (!visited.has(pc) && pc < cmds.length) {
    visited.add(pc);
    const [cmdId, num] = cmds[pc];
    if (cmdId === 'jmp') {
      pc += num - 1;
    } else if (cmdId === 'acc') {
      acc += num;
    }
    pc += 1;
  }
  return [acc, pc === cmds.length];
}

function solve(caseLines) {
  const cmds = caseLines.map(l => {
    const parts = l.split(' ');
    parts[1] = Number(parts[1]);
    return parts;
  });

  // Q1
  const [acc] = runCode(cmds);
  console.log(acc);

  // Q2
  for (let i = 0; i < cmds.length; i++) {
    if (cmds[i][0] === 'acc') {
      continue;
    }
    cmds[i][0] = cmds[i][0] === 'nop' ? 'jmp' : 'nop';
    const [acc, terminated] = runCode(cmds);
    cmds[i][0] = cmds[i][0] === 'nop' ? 'jmp' : 'nop';
    if (terminated) {
      console.log(acc);
      return;
    }
  }
}
