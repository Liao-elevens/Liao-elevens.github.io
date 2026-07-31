package main

import "fmt"

func binarySearch(numbers []int, target int) int {
	left, right := 0, len(numbers)-1

	for left <= right {
		middle := left + (right-left)/2
		if numbers[middle] == target {
			return middle
		}
		if numbers[middle] < target {
			left = middle + 1
		} else {
			right = middle - 1
		}
	}
	return -1
}

func main() {
	values := []int{1, 4, 7, 12, 18, 25}
	if binarySearch(values, 12) != 3 || binarySearch(values, 8) != -1 {
		panic("binary search verification failed")
	}
	fmt.Println("Go binary search: OK")
}
