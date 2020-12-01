#include <bits/stdc++.h>
using namespace std;

typedef int i32;

i32 main() {
  unordered_map<i32, i32> numMap;
  i32 num;
  while (cin >> num) {
    numMap[num]++;
  }

  // Q1
  // for (auto d : numMap) {
  //   if (d.second == 0) continue;
  //   if (d.second > 1) {
  //     cout << "!\n";
  //   }
  //   if (d.first == 1010 && d.second > 1) {
  //     cout << 1010 * 1010 << "\n";
  //     return 0;
  //   }
  //   if (numMap[2020 - d.first] > 0) {
  //     cout << (2020 - d.first) * d.first;
  //     return 0;
  //   }
  // }

  // Assumed that there is no duplicated numbers,
  // which is right for the input, but won't work for other cases.
  unordered_map<i32, vector<i32>> twoNumsMap;
  for (auto d : numMap) {
    for (auto e : numMap) {
      if (d.second == 0 || e.second == 0) continue;
      if (d.first == e.first) {
        continue;
      }
       vector<i32> twoNums {d.first, e.first};
       twoNumsMap[d.first + e.first] = twoNums;
    }
  }

  // Q2
  for (auto d : numMap) {
    if (d.second == 0) continue;
    if (twoNumsMap.count(2020 - d.first)) {
      cout << twoNumsMap[2020 - d.first][0] * twoNumsMap[2020 - d.first][1] * d.first << "\n";
      return 0;
    }
  }
}
