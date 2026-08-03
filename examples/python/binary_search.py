def binary_search(numbers: list[int], target: int) -> int:
    left = 0
    right = len(numbers) - 1

    while left <= right:
        middle = left + (right - left) // 2
        if numbers[middle] == target:
            return middle
        if numbers[middle] < target:
            left = middle + 1
        else:
            right = middle - 1
    return -1


if __name__ == "__main__":
    values = [1, 4, 7, 12, 18, 25]
    assert binary_search(values, 12) == 3
    assert binary_search(values, 8) == -1
    print("Python binary search: OK")
