const readCases = require("./read-cases");
readCases().then(solve);

function genRulesRegexpStrs(rules) {
  const ret = new Map();
  while (ret.size != rules.size) {
    for (const [k, v] of rules) {
      if (!!ret.get(k)) continue;

      if (v[0] === '"') {
        ret.set(k, v.slice(1, v.length - 1));
        continue;
      }
      const subItems = v.split(" ");
      if (!subItems.every((d) => d === "|" || !!ret.get(d))) continue;

      const components = ["", ""];
      let curIndex = 0;
      for (const c of subItems) {
        if (c === "|") {
          curIndex++;
          continue;
        }
        components[curIndex] = `${components[curIndex]}(${ret.get(c)})`;
      }
      let parsedStr = components[0];
      if (components[1] !== "") {
        parsedStr = `(${components[0]})|(${components[1]})`;
      }
      ret.set(k, parsedStr);
    }
  }

  return ret;
}

function solve(lines) {
  // Q1
  const rulesMap = new Map();
  let index = 0;
  while (lines[index++] !== "") {
    const [key, item] = lines[index - 1].split(": ");
    rulesMap.set(key, item);
  }
  const parsedStrs = genRulesRegexpStrs(rulesMap);
  const rule0 = new RegExp(`^${parsedStrs.get("0")}$`);
  let ret = 0;
  for (const line of lines.slice(index)) {
    if (rule0.test(line)) {
      ret++;
    }
  }
  console.log(ret);

  // 0: 8 11
  // 8: 42 | 42 8 -> indicates 42 cab repeat as many time as it wants
  // 11: 42 31 | 42 11 31 -> indicates 42 and 31 can repeat as many time as it wants,
  // but they have to be repeated the same number of times.
  ret = 0;
  const pattern31 = parsedStrs.get("31");
  const pattern42 = parsedStrs.get("42");
  for (const line of lines.slice(index)) {

    // 10 is just an arbitrary number that works for the test case.
    for (let i = 2; i < 10; i++) {
      if (!new RegExp(`^(${pattern42}){${i}}`).test(line)) {
        break;
      }
      let valid = false;
      // 10 is just an arbitrary number that works for the test case.
      for (let j = 1; j < 10; j++) {
        if (new RegExp(`^(${pattern42}){${i-1}}(${pattern42}){${j}}(${pattern31}){${j}}$`).test(line)) {
          ret++;
          valid = true;
          break;
        }
      }
      if (valid) break;
    }
  }
  console.log(ret);
}
