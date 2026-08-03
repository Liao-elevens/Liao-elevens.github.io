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

</ExerciseSolution>

### 3. 把所有 0 移到末尾

<ExerciseSolution>

先把非零元素按原顺序写到前面，再把剩余位置填成 `0`。因为只在读到非零值时推进写指针，所以其他元素的相对顺序不会改变。

时间 `O(n)`，空间 `O(1)`。`[0, 1, 0, 3, 12]` 写完非零值后前缀为 `[1, 3, 12]`，再补两个零。

</ExerciseSolution>

### 4. 向右旋转数组 `k` 步

<ExerciseSolution>

先令 `k %= n` 处理 `k` 大于数组长度的情况。整体反转后，原数组末尾的 `k` 个元素来到前面但内部顺序反了；再分别反转前后两段即可恢复顺序。

以 `[1,2,3,4,5,6,7]`、`k=3` 为例：整体反转为 `[7,6,5,4,3,2,1]`，反转前 3 个和后 4 个后得到 `[5,6,7,1,2,3,4]`。

时间 `O(n)`，空间 `O(1)`；空数组要直接返回，避免对 `0` 取模。

</ExerciseSolution>

### 5. 合并两个有序数组

<ExerciseSolution>

两个指针分别观察两数组当前最小的未处理元素，把较小者放入结果。某一侧耗尽后，把另一侧剩余元素依次加入。

时间 `O(m+n)`，结果数组需要 `O(m+n)` 空间。若题目要求把第二个数组原地合入第一个数组尾部，应从后向前写，避免覆盖尚未读取的元素。

</ExerciseSolution>

### 五语言完整实现

<ExerciseSolution title="展开五道数组练习的五语言代码" eyebrow="CODE">

::: code-group

```java [Java]
import java.util.Arrays;

static void reverse(int[] a, int left, int right) {
    while (left < right) {
        int temp = a[left]; a[left++] = a[right]; a[right--] = temp;
    }
}
static void reverseArray(int[] a) { reverse(a, 0, a.length - 1); }
static int removeDuplicates(int[] a) {
    if (a.length == 0) return 0;
    int write = 1;
    for (int read = 1; read < a.length; read++)
        if (a[read] != a[write - 1]) a[write++] = a[read];
    return write;
}
static void moveZeroes(int[] a) {
    int write = 0;
    for (int value : a) if (value != 0) a[write++] = value;
    while (write < a.length) a[write++] = 0;
}
static void rotateRight(int[] a, int k) {
    if (a.length == 0) return;
    k %= a.length;
    reverse(a, 0, a.length - 1);
    reverse(a, 0, k - 1);
    reverse(a, k, a.length - 1);
}
static int[] mergeSorted(int[] a, int[] b) {
    int[] result = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length)
        result[k++] = a[i] <= b[j] ? a[i++] : b[j++];
    while (i < a.length) result[k++] = a[i++];
    while (j < b.length) result[k++] = b[j++];
    return result;
}
```

```python [Python]
def reverse_range(a, left, right):
    while left < right:
        a[left], a[right] = a[right], a[left]
        left, right = left + 1, right - 1

def reverse_array(a):
    reverse_range(a, 0, len(a) - 1)

def remove_duplicates(a):
    if not a:
        return 0
    write = 1
    for read in range(1, len(a)):
        if a[read] != a[write - 1]:
            a[write] = a[read]
            write += 1
    return write

def move_zeroes(a):
    write = 0
    for value in a:
        if value != 0:
            a[write] = value
            write += 1
    a[write:] = [0] * (len(a) - write)

def rotate_right(a, k):
    if not a:
        return
    k %= len(a)
    reverse_range(a, 0, len(a) - 1)
    reverse_range(a, 0, k - 1)
    reverse_range(a, k, len(a) - 1)

def merge_sorted(a, b):
    result, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]: result.append(a[i]); i += 1
        else: result.append(b[j]); j += 1
    return result + a[i:] + b[j:]
```

```javascript [JavaScript]
function reverseRange(a, left, right) {
  while (left < right) {
    const temporary = a[left]
    a[left] = a[right]
    a[right] = temporary
    left++
    right--
  }
}
function reverseArray(a) { reverseRange(a, 0, a.length - 1) }
function removeDuplicates(a) {
  if (a.length === 0) return 0
  let write = 1
  for (let read = 1; read < a.length; read++)
    if (a[read] !== a[write - 1]) a[write++] = a[read]
  return write
}
function moveZeroes(a) {
  let write = 0
  for (const value of a) if (value !== 0) a[write++] = value
  while (write < a.length) a[write++] = 0
}
function rotateRight(a, k) {
  if (a.length === 0) return
  k %= a.length
  reverseRange(a, 0, a.length - 1)
  reverseRange(a, 0, k - 1)
  reverseRange(a, k, a.length - 1)
}
function mergeSorted(a, b) {
  const result = []; let i = 0, j = 0
  while (i < a.length && j < b.length)
    result.push(a[i] <= b[j] ? a[i++] : b[j++])
  return result.concat(a.slice(i), b.slice(j))
}
```

```cpp [C++]
#include <algorithm>
#include <vector>
void reverseArray(std::vector<int>& a) { std::reverse(a.begin(), a.end()); }
int removeDuplicates(std::vector<int>& a) {
    if (a.empty()) return 0;
    int write = 1;
    for (int read = 1; read < static_cast<int>(a.size()); ++read)
        if (a[read] != a[write - 1]) a[write++] = a[read];
    return write;
}
void moveZeroes(std::vector<int>& a) {
    int write = 0;
    for (int value : a) if (value != 0) a[write++] = value;
    while (write < static_cast<int>(a.size())) a[write++] = 0;
}
void rotateRight(std::vector<int>& a, int k) {
    if (a.empty()) return;
    k %= a.size();
    std::reverse(a.begin(), a.end());
    std::reverse(a.begin(), a.begin() + k);
    std::reverse(a.begin() + k, a.end());
}
std::vector<int> mergeSorted(const std::vector<int>& a, const std::vector<int>& b) {
    std::vector<int> result; result.reserve(a.size() + b.size());
    int i = 0, j = 0;
    while (i < static_cast<int>(a.size()) && j < static_cast<int>(b.size()))
        result.push_back(a[i] <= b[j] ? a[i++] : b[j++]);
    result.insert(result.end(), a.begin() + i, a.end());
    result.insert(result.end(), b.begin() + j, b.end());
    return result;
}
```

```go [Go]
func reverseRange(a []int, left, right int) {
	for left < right { a[left], a[right] = a[right], a[left]; left++; right-- }
}
func reverseArray(a []int) { reverseRange(a, 0, len(a)-1) }
func removeDuplicates(a []int) int {
	if len(a) == 0 { return 0 }
	write := 1
	for read := 1; read < len(a); read++ {
		if a[read] != a[write-1] { a[write] = a[read]; write++ }
	}
	return write
}
func moveZeroes(a []int) {
	write := 0
	for _, value := range a { if value != 0 { a[write] = value; write++ } }
	for write < len(a) { a[write] = 0; write++ }
}
func rotateRight(a []int, k int) {
	if len(a) == 0 { return }
	k %= len(a)
	reverseRange(a, 0, len(a)-1); reverseRange(a, 0, k-1); reverseRange(a, k, len(a)-1)
}
func mergeSorted(a, b []int) []int {
	result := make([]int, 0, len(a)+len(b)); i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] <= b[j] { result = append(result, a[i]); i++ } else { result = append(result, b[j]); j++ }
	}
	result = append(result, a[i:]...); result = append(result, b[j:]...)
	return result
}
```

:::

</ExerciseSolution>

下一篇：[链表、栈与队列 →](./linked-stack-queue)
