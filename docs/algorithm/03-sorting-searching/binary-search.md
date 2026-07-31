---
title: 二分查找
description: 从猜数字开始理解有序、单调、区间与边界
---

# 二分查找：每次排除一半

> 前置知识：数组、循环、下标、`O(log n)`。

::: tip 配套深化阅读
掌握本文的闭区间和左闭右开区间后，再阅读 [labuladong：二分查找框架](https://labuladong.online/zh/algo/essential-technique/binary-search-framework/)扩展左右边界与二分答案。
:::

二分查找并不只是一个需要背诵的代码模板。它依赖一个更重要的事实：**搜索空间具有可以判断方向的单调规律。**

## 通俗实例：猜数字

从 `1～100` 猜一个数字，每次得到“大了”或“小了”的反馈。

目标是 `73`：

```text
范围 1～100   → 猜 50 → 太小，排除 1～50
范围 51～100  → 猜 75 → 太大，排除 75～100
范围 51～74   → 猜 62 → 太小
范围 63～74   → 猜 68 → 太小
范围 69～74   → 猜 71 → 太小
范围 72～74   → 猜 73 → 找到
```

每次判断后，都能安全排除大约一半范围。

## 使用条件

经典数组二分需要：

1. 数组已经有序；
2. 能通过比较中间值判断目标在哪一侧；
3. 搜索范围的边界定义始终一致。

::: danger 最常见的错误
一会儿把 `right` 当作“包含的最后位置”，一会儿又当作“不包含的边界”，就会产生漏查或死循环。
:::

## 选择闭区间

本文使用 `[left, right]`，左右端点都包含：

```text
初始：
left = 0
right = 数组长度 - 1

只要 left <= right，区间中就还有元素。
```

## 伪代码

```text
left = 0
right = 数组长度 - 1

当 left <= right：
    middle = left + (right - left) / 2

    如果中间值等于目标：
        返回 middle
    如果中间值小于目标：
        left = middle + 1
    否则：
        right = middle - 1

返回 -1
```

为什么不是简单写 `(left + right) / 2`？在固定宽度整数语言中，`left + right` 有溢出的可能。写成 `left + (right - left) / 2` 更稳妥。

## 五语言实现

::: code-group

```java [Java]
public static int binarySearch(int[] numbers, int target) {
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
```

```python [Python]
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
```

```javascript [JavaScript]
function binarySearch(numbers, target) {
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
```

```cpp [C++]
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
```

```go [Go]
func binarySearch(numbers []int, target int) int {
	left := 0
	right := len(numbers) - 1

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
```

:::

## 用不变量检查代码

循环每次开始时都保持：

> 如果目标存在，那么目标一定在 `[left, right]` 中。

当 `numbers[middle] < target` 时，中间值以及它左边的值都不可能是目标，所以新范围是：

```text
[middle + 1, right]
```

这就是为什么必须写 `middle + 1`，而不是 `middle`。如果仍保留 `middle`，当区间只剩两个元素时可能永远无法缩小。

## 重复元素：寻找第一个目标

普通二分找到任意一个目标就返回。如果要找第一个目标，找到后不能停止，而要记录答案并继续向左：

```text
如果中间值 >= 目标：
    收缩右边界
否则：
    收缩左边界
```

最后检查边界位置是不是目标。

::: code-group

```java [Java]
public static int firstPosition(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length;

    while (left < right) {
        int middle = left + (right - left) / 2;
        if (numbers[middle] >= target) {
            right = middle;
        } else {
            left = middle + 1;
        }
    }
    return left < numbers.length && numbers[left] == target ? left : -1;
}
```

```python [Python]
def first_position(numbers: list[int], target: int) -> int:
    left, right = 0, len(numbers)

    while left < right:
        middle = left + (right - left) // 2
        if numbers[middle] >= target:
            right = middle
        else:
            left = middle + 1
    return left if left < len(numbers) and numbers[left] == target else -1
```

```javascript [JavaScript]
function firstPosition(numbers, target) {
  let left = 0
  let right = numbers.length

  while (left < right) {
    const middle = left + Math.floor((right - left) / 2)
    if (numbers[middle] >= target) {
      right = middle
    } else {
      left = middle + 1
    }
  }
  return left < numbers.length && numbers[left] === target ? left : -1
}
```

```cpp [C++]
int firstPosition(const std::vector<int>& numbers, int target) {
    int left = 0;
    int right = static_cast<int>(numbers.size());

    while (left < right) {
        int middle = left + (right - left) / 2;
        if (numbers[middle] >= target) {
            right = middle;
        } else {
            left = middle + 1;
        }
    }
    return left < static_cast<int>(numbers.size()) &&
                   numbers[left] == target
               ? left
               : -1;
}
```

```go [Go]
func firstPosition(numbers []int, target int) int {
	left := 0
	right := len(numbers)

	for left < right {
		middle := left + (right-left)/2
		if numbers[middle] >= target {
			right = middle
		} else {
			left = middle + 1
		}
	}
	if left < len(numbers) && numbers[left] == target {
		return left
	}
	return -1
}
```

:::

注意第二个版本使用的是左闭右开区间 `[left, right)`。它是另一套自洽规则，不要和前面的闭区间更新方式混用。

## 二分答案

有时数组并不存在，但“某个答案是否可行”具有单调性：

```text
小于某个值：都不可行
大于等于某个值：都可行
```

就可以在答案范围中寻找第一个可行值。例如：

- 最小运输能力；
- 最短完成时间；
- 最大化最小距离；
- 切割木材的最大长度。

## 复杂度

- 每次排除约一半，时间复杂度 `O(log n)`；
- 迭代写法只使用几个变量，空间复杂度 `O(1)`。

## 边界测试

```text
空数组
单元素且命中
单元素且未命中
目标在开头
目标在结尾
目标小于所有元素
目标大于所有元素
数组中存在多个目标
```

## 练习

- 在有序数组中查找目标；
- 查找第一个和最后一个目标；
- 查找插入位置；
- 在旋转有序数组中查找；
- 求平方根的整数部分；
- 二分最小可行运输能力。

下一篇：[双指针与滑动窗口 →](/algorithm/04-techniques/two-pointers-window)
