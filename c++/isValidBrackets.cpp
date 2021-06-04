#include <iostream>
#include <string>
#include <vector>
#include <regex>
#include <stack>

using namespace std;

class Solution {
    public:
        bool isValid(string s) {
            
            if (s.size() % 2 == 1) {
                return false;
            }
            stack<char> st;
            char re;
            for (int i = 0; i < s.size(); i++){
                if (s[i] == '{' || s[i] == '[' || s[i] == '(') {
                    st.push(s[i]);
                } else {
                    if (st.size() == 0) {
                        return false;
                    }
                    re = st.top();
                    st.pop();
                    switch(s[i]) {
                        case '}': 
                            if (re != '{') return false;
                            // break;
                        case ']': 
                            if (re != '[') return false;
                            // break;
                        case ')': 
                            if (re != '(') return false;
                            // break;
                    }
                }
            }
            return st.empty();

            // bad timeout
            /* 
                string result;
                regex r("(\\[\\])|(\\{\\})|(\\(\\))");
                int beforeSize;
                do {
                    beforeSize = s.size();
                    s = regex_replace(s, r, "", regex_constants::match_any);
                } while(s.size() > 0 && s.size() != beforeSize);
                return s.size() == 0; 
             */
        }
};

int main() {
    Solution solution;
    string test1 = "()";
    string test2 = "()[]{}";
    string test3 = "(]";
    string test4 = "([)]";
    string test5 = "{[]}";
    string test6 = "){";
    cout << solution.isValid(test1) << endl;
    cout << solution.isValid(test2) << endl;
    cout << solution.isValid(test3) << endl;
    cout << solution.isValid(test4) << endl;
    cout << solution.isValid(test5) << endl;
    cout << solution.isValid(test6) << endl;
    return 0;
}
