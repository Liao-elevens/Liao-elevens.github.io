---
title: 前缀和
description: 从收银小票累计金额理解前缀和、区间查询、边界设计与五语言实现
comments: true
commentId: algorithm-prefix-sum
---

# 前缀和：提前算好累计结果

> 前置知识：数组、循环、下标、加减法、复杂度基础。

::: tip 配套深化阅读
本文讲清“多留一个空前缀”的边界设计，之后可阅读 [labuladong：前缀和技巧](https://labuladong.online/zh/algo/data-structure/prefix-sum/)学习二维前缀和与哈希表组合。
:::

前缀和适合解决：

> 数组不经常改变，但需要反复询问某一段元素的总和。

## 通俗实例：收银小票累计金额

五件商品价格：

```text
下标：  0   1   2   3   4
价格： 12   8  20   6  14
```

如果只问一次“第 1 件到第 3 件一共多少钱”，直接相加即可：

```text
8 + 20 + 6 = 34
```

但如果每天要回答十万次不同区间，反复相加会做很多重复工作。

我们先准备累计金额：

```text
前 0 件：0
前 1 件：12
前 2 件：20
前 3 件：40
前 4 件：46
前 5 件：60
```

写成数组：

```text
prefix = [0, 12, 20, 40, 46, 60]
```

注意 `prefix` 比原数组多一个开头的 `0`。

## 为什么多放一个 0

定义：

```text
prefix[i] = 原数组前 i 个元素的总和
```

于是：

```text
prefix[0] = 前 0 个元素之和 = 0
prefix[1] = numbers[0]
prefix[2] = numbers[0] + numbers[1]
```

递推关系：

```text
prefix[i + 1] = prefix[i] + numbers[i]
```

这个设计让从下标 `0` 开始的区间也不需要特殊判断。

## 区间和为什么是相减

要求闭区间 `[left, right]` 的和：

```text
prefix[right + 1]
```

包含了从 `0` 到 `right` 的全部数据。减去：

```text
prefix[left]
```

也就是 `left` 前面的全部数据，剩下的正好是 `[left, right]`。

公式：

```text
rangeSum(left, right) = prefix[right + 1] - prefix[left]
```

例子：求下标 `1` 到 `3`：

```text
prefix[4] - prefix[1]
= 46 - 12
= 34
```

## 用颜色块思考

```text
prefix[right + 1] = [要减掉的左边部分][真正想要的区间]
prefix[left]       = [要减掉的左边部分]

二者相减          =                 [真正想要的区间]
```

如果总是记不住 `right + 1`，回到定义：“`prefix[i]` 是前 `i` 个元素”，不要死背公式。

## 伪代码

### 建立前缀和

```text
创建长度为 numbers.length + 1 的 prefix，初始都是 0

遍历 i = 0 到 numbers.length - 1：
    prefix[i + 1] = prefix[i] + numbers[i]
```

### 查询

```text
返回 prefix[right + 1] - prefix[left]
```

## 五语言实现

::: code-group

```java [Java]
final class PrefixSum {
    private final long[] prefix;

    PrefixSum(int[] numbers) {
        prefix = new long[numbers.length + 1];
        for (int i = 0; i < numbers.length; i++) {
            prefix[i + 1] = prefix[i] + numbers[i];
        }
    }

    long rangeSum(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}
```

```python [Python]
class PrefixSum:
    def __init__(self, numbers: list[int]) -> None:
        self.prefix = [0] * (len(numbers) + 1)
        for i, number in enumerate(numbers):
            self.prefix[i + 1] = self.prefix[i] + number

    def range_sum(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]
```

```javascript [JavaScript]
class PrefixSum {
  constructor(numbers) {
    this.prefix = new Array(numbers.length + 1).fill(0)
    for (let i = 0; i < numbers.length; i += 1) {
      this.prefix[i + 1] = this.prefix[i] + numbers[i]
    }
  }

  rangeSum(left, right) {
    return this.prefix[right + 1] - this.prefix[left]
  }
}
```

```cpp [C++]
#include <vector>

class PrefixSum {
public:
    explicit PrefixSum(const std::vector<int>& numbers)
        : prefix(numbers.size() + 1, 0) {
        for (int i = 0; i < static_cast<int>(numbers.size()); ++i) {
            prefix[i + 1] = prefix[i] + numbers[i];
        }
    }

    long long rangeSum(int left, int right) const {
        return prefix[right + 1] - prefix[left];
    }

private:
    std::vector<long long> prefix;
};
```

```go [Go]
type PrefixSum struct {
	prefix []int64
}

func newPrefixSum(numbers []int) PrefixSum {
	prefix := make([]int64, len(numbers)+1)
	for index, number := range numbers {
		prefix[index+1] = prefix[index] + int64(number)
	}
	return PrefixSum{prefix: prefix}
}

func (sums PrefixSum) rangeSum(left, right int) int64 {
	return sums.prefix[right+1] - sums.prefix[left]
}
```

:::

使用方式：

::: code-group

```java [Java]
PrefixSum sums = new PrefixSum(new int[] {12, 8, 20, 6, 14});
System.out.println(sums.rangeSum(1, 3)); // 34
```

```python [Python]
sums = PrefixSum([12, 8, 20, 6, 14])
print(sums.range_sum(1, 3))  # 34
```

```javascript [JavaScript]
const sums = new PrefixSum([12, 8, 20, 6, 14])
console.log(sums.rangeSum(1, 3)) // 34
```

```cpp [C++]
PrefixSum sums({12, 8, 20, 6, 14});
std::cout << sums.rangeSum(1, 3) << '\n'; // 34
```

```go [Go]
sums := newPrefixSum([]int{12, 8, 20, 6, 14})
fmt.Println(sums.rangeSum(1, 3)) // 34
```

:::

## 为什么 Java、C++ 和 Go 使用更大的整数

即使单个元素能放进 32 位整数，许多元素相加后也可能溢出。

例如：

```text
100000 个元素，每个都是 100000
总和 = 10000000000
```

这超过 Java/C++ 普通 `int` 的范围，所以累计值使用 `long` / `long long`；Go 示例使用明确的 `int64`。

JavaScript 的 `Number` 对整数精确表示也有上限；更大整数问题可能需要 `BigInt`，但不能把 `Number` 和 `BigInt` 直接混算。

## 复杂度：一次准备，多次受益

| 阶段 | 不使用前缀和 | 使用前缀和 |
| --- | --- | --- |
| 预处理 | `O(1)` | `O(n)` |
| 一次区间查询 | `O(n)` | `O(1)` |
| `q` 次查询 | `O(nq)` | `O(n + q)` |
| 额外空间 | `O(1)` | `O(n)` |

如果只查询一次，前缀和不一定更划算。如果查询很多次，预处理成本会被摊薄。

## 前缀和不能高效处理频繁修改

如果 `numbers[0]` 改变，后面所有前缀和都会受到影响，普通前缀和更新可能要 `O(n)`。

| 场景 | 适合方法 |
| --- | --- |
| 数组不变，多次区间求和 | 前缀和 |
| 多次区间增加，最后统一查看 | 差分 |
| 单点修改 + 区间查询 | 树状数组、线段树 |
| 二维矩阵区域求和 | 二维前缀和 |

## 常见变体

### 统计某个条件的数量

把满足条件记为 `1`，不满足记为 `0`。

问题：区间内有多少个偶数？

```text
原数组：     [2, 7, 4, 9, 6]
是否偶数：   [1, 0, 1, 0, 1]
对 0/1 数组建立前缀和
```

于是区间偶数数量也能 `O(1)` 查询。

### 和为 k 的子数组数量

遍历当前前缀和 `current`。如果以前出现过：

```text
current - k
```

说明中间存在一段和为 `k`。这个题把**前缀和**和**哈希表**组合起来。

### 二维前缀和

对矩阵中的长方形区域求和，需要使用“加大区域、减去两块多余、补回重复减掉部分”的容斥思想。建议熟练一维版本后再学。

## 常见错误

1. 混淆闭区间 `[left, right]` 与左闭右开 `[left, right)`；
2. 忘记 `prefix` 比原数组长 `1`；
3. 把公式写成 `prefix[right] - prefix[left]`；
4. 累计和使用的整数类型太小；
5. 原数组频繁修改，却仍强行使用普通前缀和；
6. 查询下标没有先确认合法范围。

## 自测练习

使用数组 `[3, -2, 5, 1, -4, 6]`：

### 1. 写出完整的 `prefix` 数组

<ExerciseSolution>

从空前缀 `0` 开始逐项累计：

| 已包含原数组元素 | 空 | `3` | `3,-2` | `3,-2,5` | 再加 `1` | 再加 `-4` | 再加 `6` |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 前缀和 | `0` | `3` | `1` | `6` | `7` | `3` | `9` |

所以完整数组是 `[0, 3, 1, 6, 7, 3, 9]`，长度比原数组多一。

</ExerciseSolution>

### 2. 计算区间 `[0, 0]`

<ExerciseSolution>

闭区间公式是 `prefix[right + 1] - prefix[left]`，因此结果为 `prefix[1] - prefix[0] = 3 - 0 = 3`。这个例子也说明前面保留空前缀后，不必为 `left = 0` 写特殊分支。

</ExerciseSolution>

### 3. 计算区间 `[1, 4]`

<ExerciseSolution>

结果为 `prefix[5] - prefix[1] = 3 - 3 = 0`。手工相加验证：`-2 + 5 + 1 - 4 = 0`。

</ExerciseSolution>

### 4. 计算整个数组

<ExerciseSolution>

整个闭区间是 `[0, 5]`，结果为 `prefix[6] - prefix[0] = 9 - 0 = 9`。等价地，最后一个前缀和本来就代表整个数组总和。

</ExerciseSolution>

### 5. 为什么空前缀必须是 `0`？

<ExerciseSolution>

空集合的和是加法单位元 `0`。它让 `prefix[i]` 始终表示前 `i` 个元素之和，并让所有查询统一使用一次减法。如果没有这个位置，查询从下标 `0` 开始的区间就必须单独判断。

</ExerciseSolution>

### 6. 改成左闭右开区间 `[left, right)`

<ExerciseSolution>

`prefix[right]` 包含原数组下标 `0` 到 `right - 1`，`prefix[left]` 包含 `0` 到 `left - 1`，两者相减恰好留下 `[left, right)`：

```text
rangeSum(left, right) = prefix[right] - prefix[left]
```

五种语言都只需要把本文闭区间查询中的 `right + 1` 改成 `right`。空区间满足 `left == right`，结果自然为 `0`。构建时间 `O(n)`，单次查询 `O(1)`。

</ExerciseSolution>

## 外部辅助

- [OI Wiki：前缀和与差分](https://oi-wiki.org/basic/prefix-sum/)：包含一维、二维和高维扩展。
- [USACO Guide：Prefix Sums](https://usaco.guide/silver/prefix-sums) ：英文例题与练习。
- [LeetCode Explore](https://leetcode.com/explore/learn/)：可在数组专题中寻找前缀和练习。

## 下一步

- [双指针与滑动窗口 →](/algorithm/04-techniques/two-pointers-window)
- [哈希表与集合 →](/algorithm/02-linear-structures/hash-table)
- [完整算法学习路线 →](/roadmap/)
