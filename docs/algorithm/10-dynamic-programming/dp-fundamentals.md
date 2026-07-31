---
title: 动态规划入门
description: 用爬楼梯理解状态、转移、初始值和计算顺序
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

- 最小花费爬楼梯；
- 打家劫舍；
- 不同路径；
- 零钱兑换；
- 0/1 背包；
- 最长递增子序列。
