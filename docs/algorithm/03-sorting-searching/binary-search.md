---
title: 二分查找
description: 从猜数字开始理解有序、单调、区间与边界
comments: true
commentId: algorithm-binary-search
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

### 1. 在有序数组中查找目标

<ExerciseSolution>

直接使用本文“闭区间”模板。循环开始时答案若存在，一定在 `[left, right]`；比较中点后排除中点及确定不可能的一半。找不到返回 `-1`。

本文前面的五语言 `binarySearch` 已是完整答案，时间 `O(log n)`、空间 `O(1)`。重点测试空数组、一个元素、目标在两端以及目标不存在。

</ExerciseSolution>

### 2. 查找第一个和最后一个目标

<ExerciseSolution>

使用两个边界：`lowerBound(target)` 返回第一个 `>= target` 的位置，`lowerBound(target + 1)` 返回第一个 `> target` 的位置。若第一个位置不是目标，说明目标不存在；否则答案为 `[first, afterLast - 1]`。

每次边界查找都是 `O(log n)`，总时间仍为 `O(log n)`。

</ExerciseSolution>

### 3. 查找插入位置

<ExerciseSolution>

插入后仍有序的位置，正是“第一个大于等于目标的位置”，因此直接返回 `lowerBound(target)`。目标比所有元素大时返回 `n`，比所有元素小时返回 `0`。

</ExerciseSolution>

### 4. 在旋转有序数组中查找

<ExerciseSolution>

只要数组没有重复值，每次比较中点时，左右两半至少有一半仍然有序。先判断哪一半有序，再判断目标是否落在这一半；如果不在，就去另一半。

例如 `[4,5,6,7,0,1,2]` 查找 `0`：中点 `7` 左半有序，但目标不在 `[4,7)`，所以进入右半。时间 `O(log n)`；大量重复值会破坏这个明确判断，需要额外缩边，最坏退化为 `O(n)`。

</ExerciseSolution>

### 5. 求平方根的整数部分

<ExerciseSolution>

寻找最大的整数 `x`，使 `x² <= n`。这个判断从“可行”到“不可行”具有单调性，可以二分答案。为了避免 `mid * mid` 溢出，使用 `mid <= n / mid` 判断。

`n=8` 时 `2²<=8` 而 `3²>8`，答案为 `2`。时间 `O(log n)`，空间 `O(1)`。

</ExerciseSolution>

### 6. 二分最小可行运输能力

<ExerciseSolution>

容量下界是最重包裹，上界是所有包裹重量之和。给定容量后按顺序装货，可以在线性时间算出需要多少天；容量越大，需要的天数不会增加，因此存在单调性。

寻找第一个能在规定天数内完成运输的容量。若有 `n` 个包裹、重量总和为 `S`，时间是 `O(n log S)`，空间 `O(1)`。

</ExerciseSolution>

### 五语言完整实现

<ExerciseSolution title="展开边界、旋转数组、平方根和运输能力代码" eyebrow="CODE">

::: code-group

```java [Java]
static int lowerBound(int[] a, int target) {
    int left = 0, right = a.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (a[mid] < target) left = mid + 1; else right = mid;
    }
    return left;
}
static int[] searchRange(int[] a, int target) {
    int first = lowerBound(a, target);
    if (first == a.length || a[first] != target) return new int[]{-1, -1};
    int left = first, right = a.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (a[mid] <= target) left = mid + 1; else right = mid;
    }
    return new int[]{first, left - 1};
}
static int searchRotated(int[] a, int target) {
    int left = 0, right = a.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (a[mid] == target) return mid;
        if (a[left] <= a[mid]) {
            if (a[left] <= target && target < a[mid]) right = mid - 1; else left = mid + 1;
        } else {
            if (a[mid] < target && target <= a[right]) left = mid + 1; else right = mid - 1;
        }
    }
    return -1;
}
static int integerSqrt(int n) {
    if (n < 2) return n;
    int left = 1, right = n / 2, answer = 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (mid <= n / mid) { answer = mid; left = mid + 1; } else right = mid - 1;
    }
    return answer;
}
static int minShipCapacity(int[] weights, int days) {
    int left = 0, right = 0;
    for (int w : weights) { left = Math.max(left, w); right += w; }
    while (left < right) {
        int capacity = left + (right - left) / 2, usedDays = 1, load = 0;
        for (int w : weights) {
            if (load + w > capacity) { usedDays++; load = 0; }
            load += w;
        }
        if (usedDays <= days) right = capacity; else left = capacity + 1;
    }
    return left;
}
```

```python [Python]
def lower_bound(a, target):
    left, right = 0, len(a)
    while left < right:
        mid = left + (right - left) // 2
        if a[mid] < target: left = mid + 1
        else: right = mid
    return left

def search_range(a, target):
    first = lower_bound(a, target)
    if first == len(a) or a[first] != target: return [-1, -1]
    left, right = first, len(a)
    while left < right:
        mid = left + (right - left) // 2
        if a[mid] <= target: left = mid + 1
        else: right = mid
    return [first, left - 1]

def search_rotated(a, target):
    left, right = 0, len(a) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if a[mid] == target: return mid
        if a[left] <= a[mid]:
            if a[left] <= target < a[mid]: right = mid - 1
            else: left = mid + 1
        else:
            if a[mid] < target <= a[right]: left = mid + 1
            else: right = mid - 1
    return -1

def integer_sqrt(n):
    if n < 2: return n
    left, right, answer = 1, n // 2, 1
    while left <= right:
        mid = left + (right - left) // 2
        if mid <= n // mid: answer, left = mid, mid + 1
        else: right = mid - 1
    return answer

def min_ship_capacity(weights, days):
    left, right = max(weights), sum(weights)
    while left < right:
        capacity, used_days, load = (left + right) // 2, 1, 0
        for weight in weights:
            if load + weight > capacity: used_days, load = used_days + 1, 0
            load += weight
        if used_days <= days: right = capacity
        else: left = capacity + 1
    return left
```

```javascript [JavaScript]
function lowerBound(a, target) {
  let left = 0, right = a.length
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (a[mid] < target) left = mid + 1; else right = mid
  }
  return left
}
function searchRange(a, target) {
  const first = lowerBound(a, target)
  if (first === a.length || a[first] !== target) return [-1, -1]
  let left = first, right = a.length
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (a[mid] <= target) left = mid + 1; else right = mid
  }
  return [first, left - 1]
}
function searchRotated(a, target) {
  let left = 0, right = a.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (a[mid] === target) return mid
    if (a[left] <= a[mid]) {
      if (a[left] <= target && target < a[mid]) right = mid - 1; else left = mid + 1
    } else if (a[mid] < target && target <= a[right]) left = mid + 1; else right = mid - 1
  }
  return -1
}
function integerSqrt(n) {
  if (n < 2) return n
  let left = 1, right = Math.floor(n / 2), answer = 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (mid <= Math.floor(n / mid)) { answer = mid; left = mid + 1 } else right = mid - 1
  }
  return answer
}
function minShipCapacity(weights, days) {
  let left = Math.max(...weights), right = weights.reduce((sum, w) => sum + w, 0)
  while (left < right) {
    const capacity = Math.floor((left + right) / 2); let usedDays = 1, load = 0
    for (const weight of weights) {
      if (load + weight > capacity) { usedDays++; load = 0 }
      load += weight
    }
    if (usedDays <= days) right = capacity; else left = capacity + 1
  }
  return left
}
```

```cpp [C++]
#include <algorithm>
#include <numeric>
#include <vector>
int lowerBound(const std::vector<int>& a, int target) {
    int left = 0, right = a.size();
    while (left < right) { int mid = left + (right-left)/2; if (a[mid] < target) left = mid+1; else right = mid; }
    return left;
}
std::vector<int> searchRange(const std::vector<int>& a, int target) {
    int first = lowerBound(a, target);
    if (first == static_cast<int>(a.size()) || a[first] != target) return {-1, -1};
    int left = first, right = a.size();
    while (left < right) { int mid = left+(right-left)/2; if (a[mid] <= target) left=mid+1; else right=mid; }
    return {first, left-1};
}
int searchRotated(const std::vector<int>& a, int target) {
    int left=0, right=static_cast<int>(a.size())-1;
    while (left<=right) { int mid=left+(right-left)/2; if(a[mid]==target)return mid;
        if(a[left]<=a[mid]) { if(a[left]<=target&&target<a[mid])right=mid-1;else left=mid+1; }
        else { if(a[mid]<target&&target<=a[right])left=mid+1;else right=mid-1; }
    } return -1;
}
int integerSqrt(int n) {
    if(n<2)return n; int left=1,right=n/2,answer=1;
    while(left<=right){int mid=left+(right-left)/2;if(mid<=n/mid){answer=mid;left=mid+1;}else right=mid-1;} return answer;
}
int minShipCapacity(const std::vector<int>& weights, int days) {
    int left=*std::max_element(weights.begin(),weights.end()), right=std::accumulate(weights.begin(),weights.end(),0);
    while(left<right){int cap=left+(right-left)/2,used=1,load=0;for(int w:weights){if(load+w>cap){++used;load=0;}load+=w;}if(used<=days)right=cap;else left=cap+1;}return left;
}
```

```go [Go]
func lowerBound(a []int, target int) int {
	left, right := 0, len(a)
	for left < right { mid := left+(right-left)/2; if a[mid] < target { left=mid+1 } else { right=mid } }
	return left
}
func searchRange(a []int, target int) []int {
	first := lowerBound(a,target); if first==len(a)||a[first]!=target{return []int{-1,-1}}
	left,right:=first,len(a);for left<right{mid:=left+(right-left)/2;if a[mid]<=target{left=mid+1}else{right=mid}}
	return []int{first,left-1}
}
func searchRotated(a []int,target int) int {
	left,right:=0,len(a)-1;for left<=right{mid:=left+(right-left)/2;if a[mid]==target{return mid};if a[left]<=a[mid]{if a[left]<=target&&target<a[mid]{right=mid-1}else{left=mid+1}}else{if a[mid]<target&&target<=a[right]{left=mid+1}else{right=mid-1}}};return -1
}
func integerSqrt(n int) int {
	if n<2{return n};left,right,answer:=1,n/2,1;for left<=right{mid:=left+(right-left)/2;if mid<=n/mid{answer=mid;left=mid+1}else{right=mid-1}};return answer
}
func minShipCapacity(weights []int,days int) int {
	left,right:=0,0;for _,w:=range weights{if w>left{left=w};right+=w};for left<right{cap,used,load:=left+(right-left)/2,1,0;for _,w:=range weights{if load+w>cap{used++;load=0};load+=w};if used<=days{right=cap}else{left=cap+1}};return left
}
```

:::

</ExerciseSolution>

下一篇：[双指针与滑动窗口 →](/algorithm/04-techniques/two-pointers-window)
