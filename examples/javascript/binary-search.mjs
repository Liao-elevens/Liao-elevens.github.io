export function binarySearch(numbers, target) {
  let left = 0
  let right = numbers.length - 1

  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2)
    if (numbers[middle] === target) {
      return middle
    }
    if (numbers[middle] < target) {
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  return -1
}

const values = [1, 4, 7, 12, 18, 25]
if (binarySearch(values, 12) !== 3 || binarySearch(values, 8) !== -1) {
  throw new Error('Binary search verification failed')
}
console.log('JavaScript binary search: OK')
