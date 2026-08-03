---
title: 动态规划入门
description: 用爬楼梯理解状态、转移、初始值和计算顺序
comments: true
commentId: algorithm-dp-fundamentals
---

# 动态规划：把重复答案保存下来

::: tip 配套深化阅读
先从本文的爬楼梯推导状态，再阅读 [labuladong：动态规划解题框架](https://labuladong.online/zh/algo/essential-technique/dynamic-programming-framework/)练习状态、选择和转移的统一思考方式。
:::

动态规划最难的不是写循环，而是给状态一个准确含义。

## 通俗实例：爬楼梯

每次可以爬 `1` 级或 `2` 级。爬到第 `n` 级有多少种方法？

要到达第 `n` 级，最后一步只有两种可能：

- 从第 `n-1` 级爬 `1` 级；
- 从第 `n-2` 级爬 `2` 级。

因此：

```text
dp[n] = dp[n - 1] + dp[n - 2]
```

## 五个问题

| 问题 | 本题答案 |
| --- | --- |
| 状态是什么 | `dp[i]` 表示到达第 `i` 级的方法数 |
| 当前选择是什么 | 最后爬 1 级或 2 级 |
| 怎样转移 | `dp[i] = dp[i-1] + dp[i-2]` |
| 初始状态是什么 | `dp[0] = 1`，`dp[1] = 1` |
| 计算顺序是什么 | 从小到大计算 |

## 为什么 dp[0] = 1

“到达第 0 级”表示什么都不做，它是一种合法的空方案。这样计算第 2 级时：

```text
dp[2] = dp[1] + dp[0] = 1 + 1 = 2
```

正好对应 `1+1` 和 `2`。

## 五语言实现：空间优化

当前状态只依赖前两个状态，不必保存整个数组。

::: code-group

```java [Java]
public static long climbStairs(int steps) {
    if (steps < 0) {
        throw new IllegalArgumentException("台阶数不能为负数");
    }

    long previousTwo = 1;
    long previousOne = 1;

    for (int current = 2; current <= steps; current++) {
        long ways = previousOne + previousTwo;
        previousTwo = previousOne;
        previousOne = ways;
    }
    return previousOne;
}
```

```python [Python]
def climb_stairs(steps: int) -> int:
    if steps < 0:
        raise ValueError("台阶数不能为负数")

    previous_two = 1
    previous_one = 1

    for _ in range(2, steps + 1):
        ways = previous_one + previous_two
        previous_two = previous_one
        previous_one = ways
    return previous_one
```

```javascript [JavaScript]
function climbStairs(steps) {
  if (!Number.isInteger(steps) || steps < 0) {
    throw new Error('台阶数必须是非负整数')
  }

  let previousTwo = 1
  let previousOne = 1

  for (let current = 2; current <= steps; current += 1) {
    const ways = previousOne + previousTwo
    previousTwo = previousOne
    previousOne = ways
  }
  return previousOne
}
```

```cpp [C++]
#include <stdexcept>

long long climbStairs(int steps) {
    if (steps < 0) {
        throw std::invalid_argument("台阶数不能为负数");
    }

    long long previousTwo = 1;
    long long previousOne = 1;

    for (int current = 2; current <= steps; ++current) {
        long long ways = previousOne + previousTwo;
        previousTwo = previousOne;
        previousOne = ways;
    }
    return previousOne;
}
```

```go [Go]
func climbStairs(steps int) int64 {
	if steps < 0 {
		panic("台阶数不能为负数")
	}

	var previousTwo int64 = 1
	var previousOne int64 = 1

	for current := 2; current <= steps; current++ {
		ways := previousOne + previousTwo
		previousTwo = previousOne
		previousOne = ways
	}
	return previousOne
}
```

:::

## 从暴力递归到动态规划

暴力递归会多次计算相同状态：

```text
ways(5)
├── ways(4)
│   ├── ways(3)
│   └── ways(2)
└── ways(3)  ← 重复
```

改进方式：

1. 自顶向下：递归加记忆化；
2. 自底向上：按照依赖顺序填写 `dp`；
3. 空间优化：只保留后续仍需要的状态。

## 复杂度

- 暴力递归接近 `O(2ⁿ)`；
- 记忆化或递推为 `O(n)`；
- 使用完整数组时空间 `O(n)`；
- 本文滚动变量版本空间 `O(1)`。

::: warning 整数范围
方法数增长很快。Java、C++ 和 Go 的固定宽度整数最终仍会溢出；JavaScript `Number` 也会失去整数精度。处理非常大的 `n` 时，需要大整数或按题目要求取模。
:::

## 练习

### 1. 最小花费爬楼梯

<ExerciseSolution>

令 `dp[i]` 表示到达第 `i` 级台阶顶部的最小花费。到达这里前可能踩在 `i-1` 或 `i-2`，并支付相应台阶费用：

```text
dp[0] = 0，dp[1] = 0
dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
```

答案是 `dp[n]`。时间 `O(n)`，使用两个变量可把空间从 `O(n)` 优化到 `O(1)`。例如 `[10,15,20]` 的答案是直接从第 1 级开始再到顶部，花费 `15`。

</ExerciseSolution>

### 2. 打家劫舍

<ExerciseSolution>

令 `dp[i]` 表示考虑前 `i` 间房能取得的最大金额。第 `i` 间要么不偷，答案是 `dp[i-1]`；要么偷，就不能偷前一间，答案是 `dp[i-2] + nums[i-1]`。

```text
dp[i] = max(dp[i-1], dp[i-2] + nums[i-1])
```

时间 `O(n)`、可优化为空间 `O(1)`。`[2,7,9,3,1]` 的最优选择是 `2+9+1=12`。不要用“每次选当前最大房子”的贪心，它可能阻塞两个更优的邻近选择。

</ExerciseSolution>

### 3. 不同路径

<ExerciseSolution>

机器人只能从上方或左方进入当前格，因此 `dp[row][col] = dp[row-1][col] + dp[row][col-1]`。第一行和第一列都只有一种走法，初始化为 `1`。

`m × n` 网格时间 `O(mn)`；逐行计算时只保留一维数组，空间可降为 `O(n)`。如果有障碍，障碍格的路径数设为 `0`。

</ExerciseSolution>

### 4. 零钱兑换

<ExerciseSolution>

令 `dp[amount]` 表示凑出该金额需要的最少硬币数。`dp[0]=0`，其他位置先设为不可达。对每个金额尝试最后使用哪一种硬币：

```text
dp[x] = min(dp[x], dp[x-coin] + 1)，前提是 x >= coin 且 x-coin 可达
```

硬币种类数为 `c`、目标金额为 `A` 时，时间 `O(cA)`、空间 `O(A)`。最终仍不可达时返回 `-1`。这题允许每种硬币使用多次，是完全背包模型。

</ExerciseSolution>

### 5. 0/1 背包

<ExerciseSolution>

每件物品只能选一次。令 `dp[c]` 表示容量不超过 `c` 时的最大价值。处理某件重量 `w`、价值 `v` 的物品时：

```text
容量 c 从 capacity 递减到 w：
    dp[c] = max(dp[c], dp[c-w] + v)
```

容量必须倒序，否则本轮刚更新的状态会再次使用同一件物品，错误地变成“可以无限取”。`n` 件物品、容量 `C` 时，时间 `O(nC)`、空间 `O(C)`。

</ExerciseSolution>

### 6. 最长递增子序列

<ExerciseSolution>

基础动态规划令 `dp[i]` 表示“以 `nums[i]` 结尾”的最长严格递增子序列长度。枚举前面的 `j`，只有 `nums[j] < nums[i]` 才能接在前面：

```text
dp[i] = 1
对所有 j < i：
    如果 nums[j] < nums[i]：
        dp[i] = max(dp[i], dp[j] + 1)
答案 = max(dp)
```

时间 `O(n²)`、空间 `O(n)`。进一步可以用“维护不同长度子序列的最小结尾值 + 二分查找”优化到 `O(n log n)`；严格递增应查找第一个 `>= 当前值` 的位置。

</ExerciseSolution>

### 五语言迁移提示

<ExerciseSolution title="展开动态规划练习的五语言对应" eyebrow="CODE">

这些转移式在五种语言中完全相同，差别主要是数组初始化：Java `new int[n]`、Python `[0] * n`、JavaScript `Array(n).fill(0)`、C++ `vector<int>(n)`、Go `make([]int, n)`。

最小值问题的“不可达”状态不要随便使用 `0`：可以用 `amount + 1`、一个足够大的整数或语言提供的无穷值。涉及路径数量、金额总和时要检查整数范围，Java 使用 `long`、C++ 使用 `long long`、Go 使用 `int64`。

0/1 背包的容量倒序、完全背包的容量正序，是五种语言都必须保持的算法顺序，不是语法差异。

</ExerciseSolution>
