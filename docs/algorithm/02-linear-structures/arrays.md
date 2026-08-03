---
title: 数组
description: 用一排带编号的储物柜理解数组、下标和原地修改
comments: true
commentId: algorithm-arrays
---

# 数组：一排带编号的储物柜

::: tip 配套深化阅读
先完成本文的储物柜模拟，再阅读 [labuladong：数组基本原理](https://labuladong.online/zh/algo/data-structure-basic/array-basic/)理解连续存储和动态数组实现。
:::

数组可以想成一排储物柜：

- 每个柜子有连续编号；
- 知道编号，就能直接打开对应柜子；
- 柜子里保存一个元素；
- 从第一个柜子走到最后一个柜子，就是遍历数组。

## 核心操作

| 操作 | 动态数组典型复杂度 | 原因 |
| --- | ---: | --- |
| 按下标读取 | `O(1)` | 可以直接计算位置 |
| 按下标修改 | `O(1)` | 直接定位后覆盖 |
| 查找某个值 | `O(n)` | 不知道位置时可能全部查看 |
| 末尾追加 | 摊还 `O(1)` | 容量不足时偶尔整体扩容 |
| 中间插入 | `O(n)` | 后续元素通常需要移动 |
| 中间删除 | `O(n)` | 后续元素通常需要填补空位 |

## 实例：把所有负数移动到数组左侧

不要求负数之间保持原顺序。示例：

```text
输入：[3, -1, 4, -5, 2, -2]
结果的一种可能：[-2, -1, -5, 4, 2, 3]
```

使用左右指针：

1. 左指针寻找不应该留在左侧的非负数；
2. 右指针寻找应该移到左侧的负数；
3. 找到后交换；
4. 继续向中间移动。

```text
left                                  right
  ↓                                      ↓
[ 3, -1, 4, -5, 2, -2 ]

交换 3 和 -2

[-2, -1, 4, -5, 2, 3]
         ↑      ↑
       left   right
```

## 伪代码

```text
left = 0
right = 数组长度 - 1

当 left < right：
    当 left < right 且左侧已经是负数：
        left 向右移动
    当 left < right 且右侧已经是非负数：
        right 向左移动
    如果 left < right：
        交换左右元素
```

## 五种语言实现

::: code-group

```java [Java]
public static void moveNegativesLeft(int[] numbers) {
    int left = 0;
    int right = numbers.length - 1;

    while (left < right) {
        while (left < right && numbers[left] < 0) {
            left++;
        }
        while (left < right && numbers[right] >= 0) {
            right--;
        }
        if (left < right) {
            int temporary = numbers[left];
            numbers[left] = numbers[right];
            numbers[right] = temporary;
        }
    }
}
```

```python [Python]
def move_negatives_left(numbers: list[int]) -> None:
    left = 0
    right = len(numbers) - 1

    while left < right:
        while left < right and numbers[left] < 0:
            left += 1
        while left < right and numbers[right] >= 0:
            right -= 1
        if left < right:
            numbers[left], numbers[right] = numbers[right], numbers[left]
```

```javascript [JavaScript]
function moveNegativesLeft(numbers) {
  let left = 0
  let right = numbers.length - 1

  while (left < right) {
    while (left < right && numbers[left] < 0) left += 1
    while (left < right && numbers[right] >= 0) right -= 1

    if (left < right) {
      ;[numbers[left], numbers[right]] = [numbers[right], numbers[left]]
    }
  }
}
```

```cpp [C++]
#include <utility>
#include <vector>

void moveNegativesLeft(std::vector<int>& numbers) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;

    while (left < right) {
        while (left < right && numbers[left] < 0) {
            ++left;
        }
        while (left < right && numbers[right] >= 0) {
            --right;
        }
        if (left < right) {
            std::swap(numbers[left], numbers[right]);
        }
    }
}
```

```go [Go]
func moveNegativesLeft(numbers []int) {
	left := 0
	right := len(numbers) - 1

	for left < right {
		for left < right && numbers[left] < 0 {
			left++
		}
		for left < right && numbers[right] >= 0 {
			right--
		}
		if left < right {
			numbers[left], numbers[right] = numbers[right], numbers[left]
		}
	}
}
```

:::

## 为什么空间是 O(1)

算法直接在原数组中交换，只额外保存 `left`、`right` 和临时交换变量。无论数组多长，额外变量数量基本不变。

- 时间复杂度：`O(n)`，两个指针总共只向中间移动；
- 空间复杂度：`O(1)`；
- 是否稳定：否，负数和非负数内部的相对顺序可能改变。

## 五语言数组对应

| 需求 | Java | Python | JavaScript | C++ | Go |
| --- | --- | --- | --- | --- | --- |
| 固定类型数组 | `int[]` | 通常仍用 `list` | 通常仍用 `Array` | `std::array`、原生数组 | `[N]int` |
| 动态数组 | `ArrayList<Integer>` | `list` | `Array` | `std::vector<int>` | `[]int` |
| 长度 | `.length` | `len()` | `.length` | `.size()` | `len()` |
| 末尾追加 | `.add()` | `.append()` | `.push()` | `.push_back()` | `append()` |
| 删除末尾 | `.remove(size-1)` | `.pop()` | `.pop()` | `.pop_back()` | `slice[:len(slice)-1]` |

## 常见错误

1. 把最后一个下标写成数组长度，而不是长度减一；
2. 空数组时仍访问 `numbers[0]`；
3. 循环中忘记移动指针，造成死循环；
4. 一边遍历一边删除，导致下标跳过元素；
5. 误以为语言提供的切片一定是常数空间。

## 练习

### 1. 原地反转数组

<ExerciseSolution>

用左右指针交换首尾元素，然后同时向中间移动。数组长度为奇数时，中间元素不需要处理。

```text
left = 0，right = n - 1
当 left < right：
    交换 array[left] 和 array[right]
    left++，right--
```

时间 `O(n)`，额外空间 `O(1)`。例如 `[1, 2, 3, 4]` 依次交换 `1/4`、`2/3`，得到 `[4, 3, 2, 1]`。

#### 五语言实现

::: code-group

```java [Java]
static void reverseArray(int[] numbers) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int temporary = numbers[left];
        numbers[left++] = numbers[right];
        numbers[right--] = temporary;
    }
}
```

```python [Python]
def reverse_array(numbers):
    left, right = 0, len(numbers) - 1
    while left < right:
        numbers[left], numbers[right] = numbers[right], numbers[left]
        left, right = left + 1, right - 1
```

```javascript [JavaScript]
function reverseArray(numbers) {
  let left = 0, right = numbers.length - 1
  while (left < right) {
    ;[numbers[left], numbers[right]] = [numbers[right], numbers[left]]
    left++
    right--
  }
}
```

```cpp [C++]
void reverseArray(std::vector<int>& numbers) {
    int left = 0, right = static_cast<int>(numbers.size()) - 1;
    while (left < right) std::swap(numbers[left++], numbers[right--]);
}
```

```go [Go]
func reverseArray(numbers []int) {
	left, right := 0, len(numbers)-1
	for left < right {
		numbers[left], numbers[right] = numbers[right], numbers[left]
		left++
		right--
	}
}
```

:::

</ExerciseSolution>

### 2. 删除有序数组中的重复项

<ExerciseSolution>

有序意味着相同值连续出现。`read` 扫描新元素，`write` 指向下一个不同值应写入的位置。完成后，数组前 `write` 个元素就是去重结果。

```text
如果数组为空，返回 0
write = 1
read 从 1 到末尾：
    如果 array[read] != array[write - 1]：
        array[write] = array[read]
        write++
返回 write
```

时间 `O(n)`，空间 `O(1)`；不要要求尾部旧数据也被清空，因为题目只承诺前 `write` 项有效。

#### 五语言实现

::: code-group

```java [Java]
static int removeDuplicates(int[] numbers) {
    if (numbers.length == 0) return 0;
    int write = 1;
    for (int read = 1; read < numbers.length; read++) {
        if (numbers[read] != numbers[write - 1]) numbers[write++] = numbers[read];
    }
    return write;
}
```

```python [Python]
def remove_duplicates(numbers):
    if not numbers:
        return 0
    write = 1
    for read in range(1, len(numbers)):
        if numbers[read] != numbers[write - 1]:
            numbers[write] = numbers[read]
            write += 1
    return write
```

```javascript [JavaScript]
function removeDuplicates(numbers) {
  if (numbers.length === 0) return 0
  let write = 1
  for (let read = 1; read < numbers.length; read++) {
    if (numbers[read] !== numbers[write - 1]) numbers[write++] = numbers[read]
  }
  return write
}
```

```cpp [C++]
int removeDuplicates(std::vector<int>& numbers) {
    if (numbers.empty()) return 0;
    int write = 1;
    for (int read = 1; read < static_cast<int>(numbers.size()); ++read) {
        if (numbers[read] != numbers[write - 1]) numbers[write++] = numbers[read];
    }
    return write;
}
```

```go [Go]
func removeDuplicates(numbers []int) int {
	if len(numbers) == 0 { return 0 }
	write := 1
	for read := 1; read < len(numbers); read++ {
		if numbers[read] != numbers[write-1] {
			numbers[write] = numbers[read]
			write++
		}
	}
	return write
}
```

:::

</ExerciseSolution>

### 3. 把所有 0 移到末尾

<ExerciseSolution>

先把非零元素按原顺序写到前面，再把剩余位置填成 `0`。因为只在读到非零值时推进写指针，所以其他元素的相对顺序不会改变。

时间 `O(n)`，空间 `O(1)`。`[0, 1, 0, 3, 12]` 写完非零值后前缀为 `[1, 3, 12]`，再补两个零。

#### 五语言实现

::: code-group

```java [Java]
static void moveZeroes(int[] numbers) {
    int write = 0;
    for (int value : numbers) if (value != 0) numbers[write++] = value;
    while (write < numbers.length) numbers[write++] = 0;
}
```

```python [Python]
def move_zeroes(numbers):
    write = 0
    for value in numbers:
        if value != 0:
            numbers[write] = value
            write += 1
    while write < len(numbers):
        numbers[write] = 0
        write += 1
```

```javascript [JavaScript]
function moveZeroes(numbers) {
  let write = 0
  for (const value of numbers) if (value !== 0) numbers[write++] = value
  while (write < numbers.length) numbers[write++] = 0
}
```

```cpp [C++]
void moveZeroes(std::vector<int>& numbers) {
    int write = 0;
    for (int value : numbers) if (value != 0) numbers[write++] = value;
    while (write < static_cast<int>(numbers.size())) numbers[write++] = 0;
}
```

```go [Go]
func moveZeroes(numbers []int) {
	write := 0
	for _, value := range numbers {
		if value != 0 { numbers[write] = value; write++ }
	}
	for write < len(numbers) { numbers[write] = 0; write++ }
}
```

:::

</ExerciseSolution>

### 4. 向右旋转数组 `k` 步

<ExerciseSolution>

先令 `k %= n` 处理 `k` 大于数组长度的情况。整体反转后，原数组末尾的 `k` 个元素来到前面但内部顺序反了；再分别反转前后两段即可恢复顺序。

以 `[1,2,3,4,5,6,7]`、`k=3` 为例：整体反转为 `[7,6,5,4,3,2,1]`，反转前 3 个和后 4 个后得到 `[5,6,7,1,2,3,4]`。

时间 `O(n)`，空间 `O(1)`；空数组要直接返回，避免对 `0` 取模。

#### 五语言实现

::: code-group

```java [Java]
static void reverse(int[] numbers, int left, int right) {
    while (left < right) {
        int temporary = numbers[left];
        numbers[left++] = numbers[right];
        numbers[right--] = temporary;
    }
}
static void rotateRight(int[] numbers, int k) {
    if (numbers.length == 0) return;
    k %= numbers.length;
    reverse(numbers, 0, numbers.length - 1);
    reverse(numbers, 0, k - 1);
    reverse(numbers, k, numbers.length - 1);
}
```

```python [Python]
def rotate_right(numbers, k):
    if not numbers:
        return
    k %= len(numbers)
    numbers.reverse()
    numbers[:k] = reversed(numbers[:k])
    numbers[k:] = reversed(numbers[k:])
```

```javascript [JavaScript]
function reverseRange(numbers, left, right) {
  while (left < right) {
    ;[numbers[left], numbers[right]] = [numbers[right], numbers[left]]
    left++
    right--
  }
}
function rotateRight(numbers, k) {
  if (numbers.length === 0) return
  k %= numbers.length
  reverseRange(numbers, 0, numbers.length - 1)
  reverseRange(numbers, 0, k - 1)
  reverseRange(numbers, k, numbers.length - 1)
}
```

```cpp [C++]
void rotateRight(std::vector<int>& numbers, int k) {
    if (numbers.empty()) return;
    k %= numbers.size();
    std::reverse(numbers.begin(), numbers.end());
    std::reverse(numbers.begin(), numbers.begin() + k);
    std::reverse(numbers.begin() + k, numbers.end());
}
```

```go [Go]
func reverseRange(numbers []int, left, right int) {
	for left < right {
		numbers[left], numbers[right] = numbers[right], numbers[left]
		left++
		right--
	}
}
func rotateRight(numbers []int, k int) {
	if len(numbers) == 0 { return }
	k %= len(numbers)
	reverseRange(numbers, 0, len(numbers)-1)
	reverseRange(numbers, 0, k-1)
	reverseRange(numbers, k, len(numbers)-1)
}
```

:::

</ExerciseSolution>

### 5. 合并两个有序数组

<ExerciseSolution>

两个指针分别观察两数组当前最小的未处理元素，把较小者放入结果。某一侧耗尽后，把另一侧剩余元素依次加入。

时间 `O(m+n)`，结果数组需要 `O(m+n)` 空间。若题目要求把第二个数组原地合入第一个数组尾部，应从后向前写，避免覆盖尚未读取的元素。

#### 五语言实现

::: code-group

```java [Java]
static int[] mergeSorted(int[] first, int[] second) {
    int[] result = new int[first.length + second.length];
    int i = 0, j = 0, k = 0;
    while (i < first.length && j < second.length)
        result[k++] = first[i] <= second[j] ? first[i++] : second[j++];
    while (i < first.length) result[k++] = first[i++];
    while (j < second.length) result[k++] = second[j++];
    return result;
}
```

```python [Python]
def merge_sorted(first, second):
    result, i, j = [], 0, 0
    while i < len(first) and j < len(second):
        if first[i] <= second[j]:
            result.append(first[i]); i += 1
        else:
            result.append(second[j]); j += 1
    return result + first[i:] + second[j:]
```

```javascript [JavaScript]
function mergeSorted(first, second) {
  const result = []; let i = 0, j = 0
  while (i < first.length && j < second.length) {
    result.push(first[i] <= second[j] ? first[i++] : second[j++])
  }
  return result.concat(first.slice(i), second.slice(j))
}
```

```cpp [C++]
std::vector<int> mergeSorted(const std::vector<int>& first, const std::vector<int>& second) {
    std::vector<int> result;
    result.reserve(first.size() + second.size());
    int i = 0, j = 0;
    while (i < static_cast<int>(first.size()) && j < static_cast<int>(second.size()))
        result.push_back(first[i] <= second[j] ? first[i++] : second[j++]);
    result.insert(result.end(), first.begin() + i, first.end());
    result.insert(result.end(), second.begin() + j, second.end());
    return result;
}
```

```go [Go]
func mergeSorted(first, second []int) []int {
	result := make([]int, 0, len(first)+len(second))
	i, j := 0, 0
	for i < len(first) && j < len(second) {
		if first[i] <= second[j] {
			result = append(result, first[i]); i++
		} else {
			result = append(result, second[j]); j++
		}
	}
	result = append(result, first[i:]...)
	result = append(result, second[j:]...)
	return result
}
```

:::

</ExerciseSolution>

下一篇：[链表、栈与队列 →](./linked-stack-queue)
