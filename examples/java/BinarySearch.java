public class BinarySearch {
    public static int search(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

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

    public static void main(String[] args) {
        int[] numbers = {1, 4, 7, 12, 18, 25};
        if (search(numbers, 12) != 3 || search(numbers, 8) != -1) {
            throw new AssertionError("Binary search verification failed");
        }
        System.out.println("Java binary search: OK");
    }
}
