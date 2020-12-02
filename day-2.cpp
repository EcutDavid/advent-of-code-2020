#include <bits/stdc++.h>
using namespace std;

typedef int i32;

i32 main() {
  vector<string> strs;
  string str;
  i32 total = 0;
  // Q1
  // while (cin >> str) {
  //   strs.push_back(str);
  //   if (strs.size() < 3) {
  //     continue;
  //   }
  //   i32 l = stoi(strs[0].substr(0, strs[0].find("-")));
  //   i32 r = stoi(strs[0].substr(strs[0].find("-") + 1));
  //   char target = strs[1][0];
  //   i32 sum = 0;
  //   for (char c : strs[2]) {
  //     if (c == target) {
  //       sum++;
  //     }
  //   }
  //   total += (sum >= l) && (sum <= r);
  //   strs.clear();
  // }
  // cout << "Answer for Q1: " << total << endl;

  // Q2
  total = 0;
  while (cin >> str) {
    strs.push_back(str);
    if (strs.size() < 3) {
      continue;
    }
    i32 l = stoi(strs[0].substr(0, strs[0].find("-")));
    i32 r = stoi(strs[0].substr(strs[0].find("-") + 1));
    char target = strs[1][0];
    if (l > strs[2].size() || r > strs[2].size()) continue;

    total += (strs[2][l - 1] == target) && (strs[2][r - 1] != target)
      || (strs[2][l - 1] != target) && (strs[2][r - 1] == target);
    strs.clear();
  }

  cout << "Answer for Q2: " << total << endl;
}
