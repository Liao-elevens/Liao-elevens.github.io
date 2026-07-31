---
title: 五语言算法基础
description: 用 Java、Python、JavaScript、C++、Go 表达同一个数组查找算法
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

1. 为什么循环从下标 `1` 开始？
2. 如果数组只有一个元素，会返回什么？
3. 为什么 Python 的简短写法 `max(numbers)` 没有改变算法需要查看所有元素的事实？
4. JavaScript 使用 `Math.max(...numbers)` 处理超大数组可能有什么问题？
5. C++ 参数如果不使用引用，会发生什么额外成本？

## 练习

- 基础：同时返回最大值和它的下标；
- 变形：找出第二大的不同元素；
- 综合：只遍历一次，同时求最小值、最大值和总和；
- 五语言：分别实现以上练习，并对照共同伪代码。

下一篇：[认识 Big O →](/algorithm/01-complexity/big-o)
