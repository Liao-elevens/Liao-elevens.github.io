---
title: 基础排序
description: 从整理扑克牌理解冒泡、选择、插入排序，以及五语言的插入排序实现
---

# 基础排序：像整理扑克牌一样安排数据

> 前置知识：数组、循环、比较、交换。排序之后建议继续学习[二分查找](/algorithm/03-sorting-searching/binary-search)。

排序是把一组数据按照规则重新排列：

```text
排序前：[5, 2, 4, 1, 3]
升序后：[1, 2, 3, 4, 5]
```

排序不只是为了好看。很多算法在有序数据上会变得简单：

- 二分查找；
- 合并重复项；
- 找相邻差值；
- 双指针；
- 区间处理；
- 按优先级安排任务。

## 排序前先明确“按什么排”

整数可以按从小到大，但对象需要指定字段：

```text
学生：
{name: "小明", score: 90}
{name: "小红", score: 85}
```

可以按：

- 分数升序；
- 分数降序；
- 姓名；
- 分数相同时再按姓名。

这个规则叫**比较规则**。代码中常通过比较器表达。

## 三种入门排序的直觉

### 冒泡排序：相邻的人不断交换

把高个子排到右边：

```text
[5, 2, 4, 1]
 5 和 2 比，交换 → [2, 5, 4, 1]
 5 和 4 比，交换 → [2, 4, 5, 1]
 5 和 1 比，交换 → [2, 4, 1, 5]
```

一轮之后，当前最大的数到达最右边。继续对左边未排序部分重复。

优点：直观。

缺点：交换次数多，通常为 `O(n²)`。

### 选择排序：每次挑最小的

像从一堆卡片中每次选出最小的一张，放到左侧：

```text
[5, 2, 4, 1, 3]
 找到最小的 1，与第一个位置交换
[1, 2, 4, 5, 3]
 在剩余部分找到最小的 2
[1, 2, 4, 5, 3]
 继续……
```

优点：交换次数少。

缺点：无论数据是否接近有序，都要反复寻找最小值，时间为 `O(n²)`。

### 插入排序：整理手里的扑克牌

把左侧看作已经排好：

```text
[5 | 2, 4, 1, 3]
```

拿出 `2`，插到 `5` 前面：

```text
[2, 5 | 4, 1, 3]
```

拿出 `4`，插到 `2` 和 `5` 之间：

```text
[2, 4, 5 | 1, 3]
```

不断扩大左边的有序区间。

优点：数据接近有序时很快，容易理解，原地排序。

缺点：逆序数据仍然需要 `O(n²)`。

## 插入排序手工模拟

输入：

```text
[5, 2, 4, 1]
```

| 待插入值 | 左侧有序部分 | 移动过程 | 本轮结果 |
| ---: | --- | --- | --- |
| 2 | `[5]` | 5 右移，2 放到开头 | `[2, 5, 4, 1]` |
| 4 | `[2, 5]` | 5 右移，4 放到 2 后 | `[2, 4, 5, 1]` |
| 1 | `[2, 4, 5]` | 5、4、2 都右移 | `[1, 2, 4, 5]` |

## 伪代码

```text
从第二个元素开始，把它叫作 current：
    position = current 左边的位置

    当 position 合法，并且 numbers[position] > current：
        numbers[position] 向右移动一格
        position 向左移动一格

    把 current 放入 position + 1
```

### 为什么不是直接交换

我们先把 `current` 保存起来，再把较大的元素整体右移：

```text
[2, 5, 7, 4]
 current = 4

7 右移 → [2, 5, 7, 7]
5 右移 → [2, 5, 5, 7]
放入 4 → [2, 4, 5, 7]
```

中间出现重复的 `7` 和 `5` 没关系，因为 `current` 已经单独保存。

## 五语言实现

::: code-group

```java [Java]
static void insertionSort(int[] numbers) {
    for (int i = 1; i < numbers.length; i++) {
        int current = numbers[i];
        int position = i - 1;

        while (position >= 0 && numbers[position] > current) {
            numbers[position + 1] = numbers[position];
            position--;
        }
        numbers[position + 1] = current;
    }
}
```

```python [Python]
def insertion_sort(numbers: list[int]) -> None:
    for i in range(1, len(numbers)):
        current = numbers[i]
        position = i - 1

        while position >= 0 and numbers[position] > current:
            numbers[position + 1] = numbers[position]
            position -= 1
        numbers[position + 1] = current
```

```javascript [JavaScript]
function insertionSort(numbers) {
  for (let i = 1; i < numbers.length; i += 1) {
    const current = numbers[i]
    let position = i - 1

    while (position >= 0 && numbers[position] > current) {
      numbers[position + 1] = numbers[position]
      position -= 1
    }
    numbers[position + 1] = current
  }
}
```

```cpp [C++]
#include <vector>

void insertionSort(std::vector<int>& numbers) {
    for (int i = 1; i < static_cast<int>(numbers.size()); ++i) {
        int current = numbers[i];
        int position = i - 1;

        while (position >= 0 && numbers[position] > current) {
            numbers[position + 1] = numbers[position];
            --position;
        }
        numbers[position + 1] = current;
    }
}
```

```go [Go]
func insertionSort(numbers []int) {
	for index := 1; index < len(numbers); index++ {
		current := numbers[index]
		position := index - 1

		for position >= 0 && numbers[position] > current {
			numbers[position+1] = numbers[position]
			position--
		}
		numbers[position+1] = current
	}
}
```

:::

五种语言都直接修改传入数组，没有额外返回一个新数组。调用时要注意原数据会改变。

## 正确性直觉：有序区间不断扩大

每轮开始前：

```text
numbers[0 ... i-1] 已经有序
```

本轮把 `numbers[i]` 插到正确位置，所以结束后：

```text
numbers[0 ... i] 已经有序
```

从长度为 `1` 的有序区间开始，最终扩大到整个数组。这是插入排序的循环不变量。

## 复杂度

### 最好情况：已经有序

```text
[1, 2, 3, 4, 5]
```

每次比较一次就停止，不需要移动：

- 时间：`O(n)`；
- 额外空间：`O(1)`。

### 最坏情况：完全逆序

```text
[5, 4, 3, 2, 1]
```

每个新元素都要越过前面所有元素：

- 时间：`O(n²)`；
- 额外空间：`O(1)`。

## 稳定排序是什么意思

如果两个元素比较结果相同，排序后仍保持原先相对顺序，就叫稳定。

```text
小明 90 分（先出现）
小红 90 分（后出现）
```

按分数排序后，小明仍在小红前面，则稳定。

本文代码只在 `numbers[position] > current` 时移动，相等时不移动，因此插入排序是稳定的。如果写成 `>=`，就会破坏稳定性。

## 实际开发不要手写基础排序

学习阶段手写是为了理解比较、移动、循环不变量与复杂度。实际开发通常使用标准库：

::: code-group

```java [Java]
Arrays.sort(numbers);
```

```python [Python]
numbers.sort()
sorted_numbers = sorted(numbers)
```

```javascript [JavaScript]
numbers.sort((a, b) => a - b)
```

```cpp [C++]
std::sort(numbers.begin(), numbers.end());
```

```go [Go]
sort.Ints(numbers)
```

:::

::: danger JavaScript 数字排序
JavaScript 的 `sort()` 默认按字符串顺序比较。`[2, 10].sort()` 可能得到 `[10, 2]`。数字升序必须传入 `(a, b) => a - b`。
:::

## 下一阶段的排序

| 算法 | 核心思想 | 常见复杂度 | 适合什么时候学 |
| --- | --- | --- | --- |
| 归并排序 | 分成两半，分别排序再合并 | `O(n log n)` | 学完递归 |
| 快速排序 | 按基准值划分左右区域 | 平均 `O(n log n)` | 学完双指针与递归 |
| 堆排序 | 用堆反复取极值 | `O(n log n)` | 学完堆 |
| 计数排序 | 按值域计数 | `O(n + k)` | 理解值域限制后 |

## 自测练习

1. 手工模拟 `[4, 3, 3, 1]` 的每一轮；
2. 把代码改为降序；
3. 统计插入排序移动了多少次；
4. 对学生对象按分数排序，分数相同保持原顺序；
5. 解释为什么外层循环从 `1` 而不是 `0` 开始。

## 外部辅助

- [VisuAlgo：Sorting](https://visualgo.net/en/sorting)：并排播放多种排序过程。
- [Hello 算法：排序](https://www.hello-algo.com/chapter_sorting/)：动画和多语言实现。
- [OI Wiki：排序简介](https://oi-wiki.org/basic/sort-intro/)：更完整的排序算法索引。
- [Princeton Algorithms：Sorting](https://algs4.cs.princeton.edu/20sorting/)：适合掌握基础后系统深入。

## 下一步

- [二分查找：排序后如何快速寻找 →](/algorithm/03-sorting-searching/binary-search)
- [认识 Big O →](/algorithm/01-complexity/big-o)
- [双指针与滑动窗口 →](/algorithm/04-techniques/two-pointers-window)
