#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& numbers, int target) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;

    while (left <= right) {
        int middle = left + (right - left) / 2;
        if (numbers[middle] == target) {
            return middle;
        }
        if (numbers[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return -1;
}

int main() {
    const std::vector<int> numbers{1, 4, 7, 12, 18, 25};
    if (binarySearch(numbers, 12) != 3 ||
        binarySearch(numbers, 8) != -1) {
        return 1;
    }
    std::cout << "C++ binary search: OK\n";
}
