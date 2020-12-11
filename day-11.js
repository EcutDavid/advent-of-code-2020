const readCases = require("./read-cases");
readCases().then(solve);

// 0: floor, 1: empty seat, 2: occupied seat
function parseMap(map) {
  return map.map((l) =>
    l.split("").map((c) => {
      if (c === "L") return 1;
      if (c === ".") return 0;
      return 2;
    })
  );
}

const DIRS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function runSimuForQ1(map) {
  const mapCopy = JSON.parse(JSON.stringify(map));
  const xMax = map[0].length;
  const yMax = map.length;
  for (let i = 0; i < yMax; i++) {
    for (let j = 0; j < xMax; j++) {
      if (map[i][j] === 0) {
        mapCopy[i][j] = 0;
        continue;
      }
      let sum = 0;
      for (const [diffX, diffY] of DIRS) {
        const x = j + diffX;
        const y = i + diffY;
        if (x === xMax || x < 0 || y === yMax || y < 0) continue;
        sum += map[y][x] === 2 ? 1 : 0;
      }
      if (map[i][j] === 2) {
        mapCopy[i][j] = sum >= 4 ? 1 : 2;
      } else {
        mapCopy[i][j] = sum > 0 ? 1 : 2;
      }
    }
  }
  return mapCopy;
}

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function getOccSum(map) {
  let ret = 0;
  for (const l of map) {
    for (const v of l) {
      ret += v === 2;
    }
  }
  return ret;
}

function runSimuForQ2(map) {
  const mapCopy = JSON.parse(JSON.stringify(map));
  const xMax = map[0].length;
  const yMax = map.length;
  const xYLarger = Math.max(xMax, yMax);
  for (let i = 0; i < yMax; i++) {
    for (let j = 0; j < xMax; j++) {
      if (map[i][j] === 0) {
        mapCopy[i][j] = 0;
        continue;
      }
      let sum = 0;
      for (const [diffX, diffY] of DIRS) {
        for (let k = 1; k < xYLarger - 1; k++) {
          const x = j + diffX * k;
          const y = i + diffY * k;
          if (x === xMax || x < 0 || y === yMax || y < 0) break;
          if (map[y][x] === 1) {
            break;
          }
          if (map[y][x] === 2) {
            sum++;
            break;
          }
        }
      }
      if (map[i][j] === 2) {
        mapCopy[i][j] = sum >= 5 ? 1 : 2;
      } else {
        mapCopy[i][j] = sum > 0 ? 1 : 2;
      }
    }
  }
  return mapCopy;
}

function solve(lines) {
  let map = parseMap(lines);
  let newMap = runSimuForQ1(map);
  // Q1
  // while (!compare(map, newMap)) {
  //   map = newMap;
  //   newMap = runSimuForQ1(map);
  // }

  // Q2
  while (!compare(map, newMap)) {
    map = newMap;
    newMap = runSimuForQ2(map);
  }
  console.log(getOccSum(map));
}
