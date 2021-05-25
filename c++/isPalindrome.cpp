#include <iostream>
#include <string>
using namespace std;

class Solution {
    public:
        bool isPalindrome(int x) {
            if (x < 0) {
                return false;
            }
            if (x < 10) {
                return true;
            }
            string str = to_string(x);
            int len = str.size();
            int first = 0, last = len - 1;
            while(first < last) {
                if (str[first] != str[last]) {
                    return false;
                }
                first++;
                last--;
            }
            return true;
        }
};

int main() {
    Solution solution;
    cout << solution.isPalindrome(0) << endl;
    cout << solution.isPalindrome(121) << endl;
    cout << solution.isPalindrome(123) << endl;
    cout << solution.isPalindrome(101) << endl;
    cout << solution.isPalindrome(-121) << endl;
    cout << solution.isPalindrome(-101) << endl;
    return 0;
}
