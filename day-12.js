const readCases = require("./read-cases");
readCases().then(solve);

const DIRS = ['E', 'S', 'W', 'N'];
const ROTATES = [
  ([a, b]) => [a, b],
  ([a, b]) => [-b, a],
  ([a, b]) => [-a, -b],
  ([a, b]) => [b, -a],
];

function solve(lines) {
  const cmds = lines.map(l => [l[0], Number(l.slice(1))]);
  const posCur = [0, 0];

  // Q1
  let dirIndex = 0;
  cmds.forEach(([id, v]) => {
    if (id === 'R') {
      dirIndex = (dirIndex + v / 90) % DIRS.length;
      return;
    }
    if (id === 'L') {
      dirIndex = (dirIndex - v / 90) % DIRS.length;
      if (dirIndex < 0) dirIndex += DIRS.length;
      return;
    }
    let dir = id;
    if (id === 'F') dir = DIRS[dirIndex];
    switch (dir) {
      case 'N':
        posCur[0] += v;
        break;
      case 'S':
        posCur[0] -= v;
        break;
      case 'E':
        posCur[1] += v;
        break;
      case 'W':
        posCur[1] -= v;
        break;
      default:
        break;
    }
  });
  console.log(Math.abs(posCur[0]) + Math.abs(posCur[1]))

  // Q2
  let waypointPosCur = [1, 10];
  posCur[0] = posCur[1]= 0;
  cmds.forEach(([id, v]) => {
    if (id === 'R') {
      const rotateIndex= v / 90 % ROTATES.length;
      waypointPosCur = ROTATES[rotateIndex](waypointPosCur);
      return;
    }
    if (id === 'L') {
      let rotateIndex = -v / 90 % ROTATES.length;
      if (rotateIndex < 0) rotateIndex += ROTATES.length;
      waypointPosCur = ROTATES[rotateIndex](waypointPosCur);
      return;
    }
    if (id === 'F') {
      posCur[0] += waypointPosCur[0] * v;
      posCur[1] += waypointPosCur[1] * v;
      return;
    }
    switch (id) {
      case 'N':
        waypointPosCur[0] += v;
        break;
      case 'S':
        waypointPosCur[0] -= v;
        break;
      case 'E':
        waypointPosCur[1] += v;
        break;
      case 'W':
        waypointPosCur[1] -= v;
        break;
      default:
        break;
    }

  });
  console.log(Math.abs(posCur[0]) + Math.abs(posCur[1]))
}
