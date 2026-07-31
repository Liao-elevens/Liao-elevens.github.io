---
title: 双指针与滑动窗口
description: 用两名检查员和可伸缩相框理解双指针与窗口
---

# 双指针与滑动窗口

::: tip 配套深化阅读
先手工移动本文的左右边界，再阅读 [数组双指针总结](https://labuladong.online/zh/algo/essential-technique/array-two-pointers-summary/)与[滑动窗口框架](https://labuladong.online/zh/algo/essential-technique/sliding-window-framework/)归纳适用信号。
:::

双指针的核心不是“代码里有两个变量”，而是利用问题规律，让两个位置协同移动，避免重复枚举。

## 左右双指针：寻找两数之和

有序数组：

```text
[1, 2, 4, 7, 11, 15]
```

目标和是 `15`。

1. 左指针指向最小值 `1`；
2. 右指针指向最大值 `15`；
3. 和为 `16`，太大，只能让右指针左移；
4. `1 + 11 = 12`，太小，只能让左指针右移；
5. `4 + 11 = 15`，找到。

```text
和太大 → 右指针左移，减小总和
和太小 → 左指针右移，增大总和
```

### 五语言实现

::: code-group

```java [Java]
public static int[] twoSumSorted(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;

    while (left < right) {
        long sum = (long) numbers[left] + numbers[right];
        if (sum == target) {
            return new int[]{left, right};
        }
        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{-1, -1};
}
```

```python [Python]
def two_sum_sorted(numbers: list[int], target: int) -> tuple[int, int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return left, right
        if total < target:
            left += 1
        else:
            right -= 1
    return -1, -1
```

```javascript [JavaScript]
function twoSumSorted(numbers, target) {
  let left = 0
  let right = numbers.length - 1

  while (left < right) {
    const sum = numbers[left] + numbers[right]
    if (sum === target) return [left, right]
    if (sum < target) {
      left += 1
    } else {
      right -= 1
    }
  }
  return [-1, -1]
}
```

```cpp [C++]
#include <utility>
#include <vector>

std::pair<int, int> twoSumSorted(
    const std::vector<int>& numbers,
    int target
) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;

    while (left < right) {
        long long sum =
            static_cast<long long>(numbers[left]) + numbers[right];
        if (sum == target) {
            return {left, right};
        }
        if (sum < target) {
            ++left;
        } else {
            --right;
        }
    }
    return {-1, -1};
}
```

```go [Go]
func twoSumSorted(numbers []int, target int) [2]int {
	left := 0
	right := len(numbers) - 1

	for left < right {
		sum := int64(numbers[left]) + int64(numbers[right])
		if sum == int64(target) {
			return [2]int{left, right}
		}
		if sum < int64(target) {
			left++
		} else {
			right--
		}
	}
	return [2]int{-1, -1}
}
```

:::

暴力枚举所有组合需要 `O(n²)`，双指针只让每个指针单向移动，时间复杂度是 `O(n)`。

## 滑动窗口：可伸缩的相框

滑动窗口用于维护连续区间。把窗口想成放在数组上的相框：

- 右边界向右，窗口扩大；
- 条件不满足时，左边界向右，窗口缩小；
- 移动时只更新离开和进入窗口的元素。

### 实例：和至少为 target 的最短连续子数组

数组元素均为正数：

```text
numbers = [2, 3, 1, 2, 4, 3]
target = 7
```

窗口过程：

```text
[2, 3, 1, 2] 和为 8 → 满足，尝试缩小
   [3, 1, 2] 和为 6 → 不满足，继续扩大
   [3, 1, 2, 4] 和为 10 → 缩小
      [1, 2, 4] 和为 7 → 长度 3
            [4, 3] 和为 7 → 长度 2
```

### 伪代码

```text
left = 0
windowSum = 0
best = 无穷大

让 right 从左到右移动：
    把 numbers[right] 加入窗口

    当窗口和已经满足条件：
        更新最短长度
        移除 numbers[left]
        left 向右移动
```

### Python 参考实现

```python
def min_subarray_length(numbers: list[int], target: int) -> int:
    left = 0
    window_sum = 0
    best = len(numbers) + 1

    for right, number in enumerate(numbers):
        window_sum += number

        while window_sum >= target:
            best = min(best, right - left + 1)
            window_sum -= numbers[left]
            left += 1

    return 0 if best == len(numbers) + 1 else best
```

其他三种语言保持完全相同的窗口状态：

- `left`：窗口左端；
- `right`：窗口右端；
- `windowSum`：窗口内可增量维护的信息；
- `best`：到目前为止的最佳答案。

## 为什么要求正数

正数保证：

- 扩大窗口时，和不会变小；
- 缩小窗口时，和不会变大。

如果允许负数，这个单调规律消失，普通滑动窗口可能漏掉答案。这时要考虑前缀和、单调队列或其他方法。

## 常见错误

1. 把子数组和子序列混淆；窗口必须连续；
2. 忘记从窗口状态中移除左端元素；
3. 只用 `if` 缩小一次，而实际需要 `while` 连续缩小；
4. 没有确认窗口条件是否具有单调性；
5. 计算长度时忘记 `+1`。

## 练习

- 有序数组的两数之和；
- 原地删除重复元素；
- 无重复字符的最长子字符串；
- 最小覆盖子串；
- 长度固定窗口的最大平均值；
- 和至少为目标值的最短连续子数组。
