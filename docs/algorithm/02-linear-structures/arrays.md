---
title: 数组
description: 用一排带编号的储物柜理解数组、下标和原地修改
---

# 数组：一排带编号的储物柜

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

## 四种语言实现

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

:::

## 为什么空间是 O(1)

算法直接在原数组中交换，只额外保存 `left`、`right` 和临时交换变量。无论数组多长，额外变量数量基本不变。

- 时间复杂度：`O(n)`，两个指针总共只向中间移动；
- 空间复杂度：`O(1)`；
- 是否稳定：否，负数和非负数内部的相对顺序可能改变。

## 四语言数组对应

| 需求 | Java | Python | JavaScript | C++ |
| --- | --- | --- | --- | --- |
| 固定类型数组 | `int[]` | 通常仍用 `list` | 通常仍用 `Array` | `std::array`、原生数组 |
| 动态数组 | `ArrayList<Integer>` | `list` | `Array` | `std::vector<int>` |
| 长度 | `.length` | `len()` | `.length` | `.size()` |
| 末尾追加 | `.add()` | `.append()` | `.push()` | `.push_back()` |
| 删除末尾 | `.remove(size-1)` | `.pop()` | `.pop()` | `.pop_back()` |

## 常见错误

1. 把最后一个下标写成数组长度，而不是长度减一；
2. 空数组时仍访问 `numbers[0]`；
3. 循环中忘记移动指针，造成死循环；
4. 一边遍历一边删除，导致下标跳过元素；
5. 误以为语言提供的切片一定是常数空间。

## 练习

- 原地反转数组；
- 删除有序数组中的重复项；
- 把所有 `0` 移动到末尾并保持其他元素顺序；
- 旋转数组；
- 合并两个有序数组。

下一篇：[链表、栈与队列 →](./linked-stack-queue)
