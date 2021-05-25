#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Solution {
    public:
        string longestCommonPrefix(vector<string>& strs) {
            if (strs.size() == 0) {
                return "";
            } else if (strs.size() == 1) {
                return strs[0];
            }
            // get max length index
            int maxLenStrIndex = 0;
            for (int i = 1; i < strs.size(); i++) {
                if (strs[i].size() > strs[maxLenStrIndex].size()) {
                    maxLenStrIndex = i;
                }
            }

            string prefix = {}; // max length str first char
            string result= "";
            int prefixIndex;
            for (int preLen = 1; preLen <= strs[maxLenStrIndex].size(); preLen++) {
                prefix = strs[maxLenStrIndex].substr(0, preLen); // get max length string prefix
                for (int i = 0; i < strs.size(); i++) { // search prefix
                    if (i == maxLenStrIndex) {
                        continue ;
                    }
                    prefixIndex = strs[i].find(prefix);
                    if (prefixIndex != 0) {
                        return result;
                    }
                }
                result = prefix;
            }
            return result;
        }
};

int main() {
    Solution solution;
    vector<string>test1 = {"flower","flow","flight"};
    vector<string>test2 = {"dog","racecar","car"};
    vector<string>test3 = {"a"};
    vector<string>test4 = {"ab", "a"};
    vector<string>test5 = {"flower","flower","flower","flower"};
    cout << solution.longestCommonPrefix(test1) << endl;
    cout << solution.longestCommonPrefix(test2) << endl;
    cout << solution.longestCommonPrefix(test3) << endl;
    cout << solution.longestCommonPrefix(test4) << endl;
    cout << solution.longestCommonPrefix(test5) << endl;
    return 0;
}
