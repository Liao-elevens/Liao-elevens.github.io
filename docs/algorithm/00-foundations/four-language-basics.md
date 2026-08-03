---
title: 五语言算法基础
description: 用 Java、Python、JavaScript、C++、Go 表达同一个数组查找算法
comments: true
commentId: algorithm-five-language-basics
---

# 五语言算法基础

> 目标：理解算法思想只有一套，五种语言只是把相同步骤写成不同语法。

## 通俗实例：在书架上找最厚的书

假设书架上有五本书，厚度分别是：

```text
[12, 7, 25, 18, 10]
```

人会这样做：

1. 暂时认为第一本最厚，记住 `12`；
2. 看第二本，`7` 没有 `12` 厚；
3. 看第三本，`25` 更厚，把记录改成 `25`；
4. 继续查看剩余书；
5. 看完以后，记录中的 `25` 就是答案。

这里真正的算法与语言无关：

```text
把第一个元素记作当前最大值
从第二个元素开始逐个查看：
    如果当前元素大于当前最大值：
        更新当前最大值
返回当前最大值
```

## 五种语言实现

::: code-group

```java [Java]
public class MaxValue {
    public static int findMax(int[] numbers) {
        if (numbers == null || numbers.length == 0) {
            throw new IllegalArgumentException("数组不能为空");
        }

        int currentMax = numbers[0];
        for (int index = 1; index < numbers.length; index++) {
            if (numbers[index] > currentMax) {
                currentMax = numbers[index];
            }
        }
        return currentMax;
    }

    public static void main(String[] args) {
        int[] numbers = {12, 7, 25, 18, 10};
        System.out.println(findMax(numbers));
    }
}
```

```python [Python]
def find_max(numbers: list[int]) -> int:
    if not numbers:
        raise ValueError("数组不能为空")

    current_max = numbers[0]
    for index in range(1, len(numbers)):
        if numbers[index] > current_max:
            current_max = numbers[index]
    return current_max


numbers = [12, 7, 25, 18, 10]
print(find_max(numbers))
```

```javascript [JavaScript]
function findMax(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('数组不能为空')
  }

  let currentMax = numbers[0]
  for (let index = 1; index < numbers.length; index += 1) {
    if (numbers[index] > currentMax) {
      currentMax = numbers[index]
    }
  }
  return currentMax
}

const numbers = [12, 7, 25, 18, 10]
console.log(findMax(numbers))
```

```cpp [C++]
#include <iostream>
#include <stdexcept>
#include <vector>

int findMax(const std::vector<int>& numbers) {
    if (numbers.empty()) {
        throw std::invalid_argument("数组不能为空");
    }

    int currentMax = numbers[0];
    for (std::size_t index = 1; index < numbers.size(); ++index) {
        if (numbers[index] > currentMax) {
            currentMax = numbers[index];
        }
    }
    return currentMax;
}

int main() {
    std::vector<int> numbers{12, 7, 25, 18, 10};
    std::cout << findMax(numbers) << '\n';
}
```

```go [Go]
package main

import "fmt"

func findMax(numbers []int) int {
	if len(numbers) == 0 {
		panic("切片不能为空")
	}

	currentMax := numbers[0]
	for index := 1; index < len(numbers); index++ {
		if numbers[index] > currentMax {
			currentMax = numbers[index]
		}
	}
	return currentMax
}

func main() {
	numbers := []int{12, 7, 25, 18, 10}
	fmt.Println(findMax(numbers))
}
```

:::

## 对照每一个共同动作

| 算法动作 | Java | Python | JavaScript | C++ | Go |
| --- | --- | --- | --- | --- | --- |
| 定义函数 | `static int findMax` | `def find_max` | `function findMax` | `int findMax` | `func findMax` |
| 数组长度 | `numbers.length` | `len(numbers)` | `numbers.length` | `numbers.size()` | `len(numbers)` |
| 第一个元素 | `numbers[0]` | `numbers[0]` | `numbers[0]` | `numbers[0]` | `numbers[0]` |
| 循环下标 | `for` | `range` | `for` | `for` | `for` |
| 更新变量 | `currentMax = ...` | 相同 | 相同 | 相同 | 相同 |
| 返回答案 | `return` | `return` | `return` | `return` | `return` |

五段代码的外观不同，但控制流程完全一致：

<figure class="knowledge-diagram">
  <img src="/diagrams/find-maximum-flow.svg" alt="遍历数组寻找最大值的流程图">
  <figcaption>算法的关键状态只有两个：当前读到的位置，以及截至当前找到的最大值。</figcaption>
</figure>

## 为什么不能把初始值写成 0

如果数据是：

```text
[-8, -3, -12]
```

初始最大值设为 `0`，算法会错误地返回数组中根本不存在的 `0`。使用第一个元素初始化，才能适用于全负数。

这是一类重要的边界思维：

> 初始状态应该来自问题允许的数据，除非你能证明自定义哨兵一定安全。

## 五种语言需要特别注意的地方

### Java

- 原生数组长度固定；
- 动态数组通常使用 `ArrayList<Integer>`；
- `int` 可能溢出，大整数计算考虑 `long`；
- 字符串比较内容要使用 `.equals()`，不是 `==`。

### Python

- `list` 是动态数组；
- 整数通常会自动扩展，不容易发生普通整数溢出；
- 切片会创建新对象，简短语法不代表 `O(1)`；
- 递归深度默认较有限。

### JavaScript

- `Array` 可以动态增长；
- `Number` 使用浮点表示，不能精确表示所有大整数；
- 大整数可以使用 `BigInt`，但不能直接和 `Number` 混算；
- 默认排序按字符串规则，数字排序通常需要比较函数。

### C++

- 算法题中动态数组通常使用 `std::vector`；
- 参数使用 `const std::vector<int>&` 可以避免复制；
- `int` 可能溢出，需要时使用 `long long`；
- STL 提供大量容器和算法，但仍需理解其复杂度。

### Go

- 算法题中动态序列通常使用切片 `[]int`；
- `append` 可能分配新的底层数组，多个切片也可能共享数据；
- `map` 读取不存在的 key 会得到零值，需要时使用 `value, exists := map[key]` 区分；
- Go 只有 `for` 循环，队列常用切片配合头下标；
- 更完整的算法常用语法见 [Go 算法语法入门](./go-basics)。

## 复杂度

数组有 `n` 个元素：

- 每个元素最多查看一次，时间复杂度是 `O(n)`；
- 只额外保存一个最大值和下标，空间复杂度是 `O(1)`。

## 自测

### 1. 为什么循环从下标 `1` 开始？

<ExerciseSolution>

`currentMax` 已经用 `numbers[0]` 初始化，第一个元素等于已经检查过。循环从 `1` 开始可以避免一次没有意义的自我比较。若循环从 `0` 开始，答案仍然正确，但会多做一次比较。

</ExerciseSolution>

### 2. 如果数组只有一个元素，会返回什么？

<ExerciseSolution>

返回唯一的元素。初始化后循环条件立刻不成立，所以不再比较。需要先约定数组不能为空；如果允许空数组，就应该返回“没有结果”或抛出清晰异常，而不是访问 `numbers[0]`。

</ExerciseSolution>

### 3. `max(numbers)` 为什么仍是 `O(n)`？

<ExerciseSolution>

函数名虽然只有几个字符，内部仍必须逐个检查元素，因为最大值可能位于任何位置。简短语法减少的是我们书写的代码量，不是计算机需要完成的工作量。

</ExerciseSolution>

### 4. `Math.max(...numbers)` 为什么不适合超大数组？

<ExerciseSolution>

展开语法会把每个元素都变成一次函数参数。JavaScript 引擎对单次调用的参数数量存在限制，超大数组可能触发 `RangeError`，还会产生额外参数处理开销。循环或 `reduce` 更稳妥。

</ExerciseSolution>

### 5. C++ 参数不使用引用会发生什么？

<ExerciseSolution>

按值接收 `std::vector<int>` 会复制整个数组，额外付出 `O(n)` 时间和 `O(n)` 空间。使用 `const std::vector<int>&` 既避免复制，又保证函数不会修改原数组。

</ExerciseSolution>

## 练习

### 1. 同时返回最大值和它的下标

<ExerciseSolution>

同时保存 `maxValue` 和 `maxIndex`。发现更大元素时必须一起更新，否则值和位置会不对应。若最大值重复，本实现返回第一次出现的位置。

```text
最大值 = 数组[0]
最大值下标 = 0
从下标 1 开始遍历：
    如果 当前元素 > 最大值：
        同时更新最大值和下标
返回二者
```

时间复杂度 `O(n)`，额外空间 `O(1)`。

#### 五语言实现

::: code-group

```java [Java]
static int[] maxWithIndex(int[] a) {
    if (a.length == 0) throw new IllegalArgumentException("数组不能为空");
    int value = a[0], index = 0;
    for (int i = 1; i < a.length; i++) {
        if (a[i] > value) { value = a[i]; index = i; }
    }
    return new int[]{value, index};
}
```

```python [Python]
def max_with_index(a):
    if not a:
        raise ValueError("数组不能为空")
    value, index = a[0], 0
    for i in range(1, len(a)):
        if a[i] > value:
            value, index = a[i], i
    return value, index
```

```javascript [JavaScript]
function maxWithIndex(a) {
  if (a.length === 0) throw new Error('数组不能为空')
  let value = a[0], index = 0
  for (let i = 1; i < a.length; i++) {
    if (a[i] > value) [value, index] = [a[i], i]
  }
  return { value, index }
}
```

```cpp [C++]
std::pair<int, int> maxWithIndex(const std::vector<int>& a) {
    if (a.empty()) throw std::invalid_argument("数组不能为空");
    int value = a[0], index = 0;
    for (int i = 1; i < static_cast<int>(a.size()); ++i) {
        if (a[i] > value) { value = a[i]; index = i; }
    }
    return {value, index};
}
```

```go [Go]
func maxWithIndex(a []int) (int, int) {
	if len(a) == 0 { panic("数组不能为空") }
	value, index := a[0], 0
	for i := 1; i < len(a); i++ {
		if a[i] > value { value, index = a[i], i }
	}
	return value, index
}
```

:::

</ExerciseSolution>

### 2. 找出第二大的不同元素

<ExerciseSolution>

维护“第一大”和“第二大”两个不同值。遇到新的第一大时，旧第一大下移为第二大；否则，只有当前值小于第一大且大于第二大时才更新第二大。少于两个不同值时必须明确返回“无结果”。

```text
第一大 = 空
第二大 = 空
遍历每个数：
    如果第一大为空或数 > 第一大：
        第二大 = 第一大
        第一大 = 数
    否则如果数 != 第一大，并且第二大为空或数 > 第二大：
        第二大 = 数
返回第二大
```

时间复杂度 `O(n)`，额外空间 `O(1)`。

#### 五语言实现

::: code-group

```java [Java]
static Integer secondDistinctMax(int[] a) {
    Integer first = null, second = null;
    for (int value : a) {
        if (first == null || value > first) {
            second = first;
            first = value;
        } else if (value != first && (second == null || value > second)) {
            second = value;
        }
    }
    return second;
}
```

```python [Python]
def second_distinct_max(a):
    first = second = None
    for value in a:
        if first is None or value > first:
            second, first = first, value
        elif value != first and (second is None or value > second):
            second = value
    return second
```

```javascript [JavaScript]
function secondDistinctMax(a) {
  let first = null, second = null
  for (const value of a) {
    if (first === null || value > first) {
      second = first; first = value
    } else if (value !== first && (second === null || value > second)) {
      second = value
    }
  }
  return second
}
```

```cpp [C++]
std::optional<int> secondDistinctMax(const std::vector<int>& a) {
    std::optional<int> first, second;
    for (int value : a) {
        if (!first || value > *first) {
            second = first; first = value;
        } else if (value != *first && (!second || value > *second)) {
            second = value;
        }
    }
    return second;
}
```

```go [Go]
func secondDistinctMax(a []int) (int, bool) {
	var first, second int
	hasFirst, hasSecond := false, false
	for _, value := range a {
		if !hasFirst || value > first {
			second, hasSecond = first, hasFirst
			first, hasFirst = value, true
		} else if value != first && (!hasSecond || value > second) {
			second, hasSecond = value, true
		}
	}
	return second, hasSecond
}
```

:::

</ExerciseSolution>

### 3. 一次遍历求最小值、最大值和总和

<ExerciseSolution>

三个答案都只依赖“已经看过的元素”，因此可以放在同一个循环中维护。总和可能超出 32 位整数范围，Java 使用 `long`、C++ 使用 `long long`、Go 示例使用 `int64`。

```text
最小值 = 数组[0]
最大值 = 数组[0]
总和 = 0
遍历每个数：
    更新最小值
    更新最大值
    总和 += 当前数
返回三者
```

时间复杂度 `O(n)`，额外空间 `O(1)`。

#### 五语言实现

::: code-group

```java [Java]
static long[] minMaxSum(int[] a) {
    if (a.length == 0) throw new IllegalArgumentException("数组不能为空");
    int min = a[0], max = a[0];
    long sum = 0;
    for (int value : a) {
        min = Math.min(min, value);
        max = Math.max(max, value);
        sum += value;
    }
    return new long[]{min, max, sum};
}
```

```python [Python]
def min_max_sum(a):
    if not a:
        raise ValueError("数组不能为空")
    minimum = maximum = a[0]
    total = 0
    for value in a:
        minimum = min(minimum, value)
        maximum = max(maximum, value)
        total += value
    return minimum, maximum, total
```

```javascript [JavaScript]
function minMaxSum(a) {
  if (a.length === 0) throw new Error('数组不能为空')
  let minimum = a[0], maximum = a[0], sum = 0
  for (const value of a) {
    minimum = Math.min(minimum, value)
    maximum = Math.max(maximum, value)
    sum += value
  }
  return { minimum, maximum, sum }
}
```

```cpp [C++]
std::tuple<int, int, long long> minMaxSum(const std::vector<int>& a) {
    if (a.empty()) throw std::invalid_argument("数组不能为空");
    int minimum = a[0], maximum = a[0];
    long long sum = 0;
    for (int value : a) {
        minimum = std::min(minimum, value);
        maximum = std::max(maximum, value);
        sum += value;
    }
    return {minimum, maximum, sum};
}
```

```go [Go]
func minMaxSum(a []int) (int, int, int64) {
	if len(a) == 0 { panic("数组不能为空") }
	minimum, maximum := a[0], a[0]
	var sum int64
	for _, value := range a {
		if value < minimum { minimum = value }
		if value > maximum { maximum = value }
		sum += int64(value)
	}
	return minimum, maximum, sum
}
```

:::

</ExerciseSolution>

下一篇：[认识 Big O →](/algorithm/01-complexity/big-o)
