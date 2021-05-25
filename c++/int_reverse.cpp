#include <iostream>
using namespace std;

class Solution {
    public:
        int reverse(long long x) {
            bool isNegative = x < 0;
            if (x > INT_MAX || x < INT_MIN) {
                return 0;
            }
            long long result = 0;
            long long number = x;
            if (isNegative) {
                number = x * -1;
            }
            while(number > 0) {
                result = (result == 0? 0: result * 10) + number % 10;
                number = number / 10;
            }
            if (result > INT_MAX || result < INT_MIN) {
                return 0;
            }
            return result * (isNegative? -1: 1);
        }
};

int main() {
    Solution solution;
    cout << solution.reverse(123) << endl;
    cout << solution.reverse(-6888925) << endl;
    cout << solution.reverse(0) << endl;
    return 0;
}
