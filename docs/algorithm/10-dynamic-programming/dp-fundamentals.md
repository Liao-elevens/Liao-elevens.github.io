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

#### 五语言实现

::: code-group

```java [Java]
static int minCost(int[] cost) {
    int previous2 = 0, previous1 = 0;
    for (int i = 2; i <= cost.length; i++) {
        int current = Math.min(previous1 + cost[i - 1], previous2 + cost[i - 2]);
        previous2 = previous1; previous1 = current;
    }
    return previous1;
}
```

```python [Python]
def min_cost(cost):
    previous2 = previous1 = 0
    for i in range(2, len(cost) + 1):
        current = min(previous1 + cost[i - 1], previous2 + cost[i - 2])
        previous2, previous1 = previous1, current
    return previous1
```

```javascript [JavaScript]
function minCost(cost) {
  let previous2 = 0, previous1 = 0
  for (let i = 2; i <= cost.length; i++) {
    const current = Math.min(previous1 + cost[i - 1], previous2 + cost[i - 2])
    previous2 = previous1; previous1 = current
  }
  return previous1
}
```

```cpp [C++]
int minCost(const std::vector<int>& cost) {
    int previous2 = 0, previous1 = 0;
    for (int i = 2; i <= static_cast<int>(cost.size()); ++i) {
        int current = std::min(previous1 + cost[i - 1], previous2 + cost[i - 2]);
        previous2 = previous1; previous1 = current;
    }
    return previous1;
}
```

```go [Go]
func minCost(cost []int) int {
	previous2, previous1 := 0, 0
	for i := 2; i <= len(cost); i++ {
		current := min(previous1+cost[i-1], previous2+cost[i-2])
		previous2, previous1 = previous1, current
	}
	return previous1
}
```

:::

</ExerciseSolution>

### 2. 打家劫舍

<ExerciseSolution>

令 `dp[i]` 表示考虑前 `i` 间房能取得的最大金额。第 `i` 间要么不偷，答案是 `dp[i-1]`；要么偷，就不能偷前一间，答案是 `dp[i-2] + nums[i-1]`。

```text
dp[i] = max(dp[i-1], dp[i-2] + nums[i-1])
```

时间 `O(n)`、可优化为空间 `O(1)`。`[2,7,9,3,1]` 的最优选择是 `2+9+1=12`。不要用“每次选当前最大房子”的贪心，它可能阻塞两个更优的邻近选择。

#### 五语言实现

::: code-group

```java [Java]
static int rob(int[] houses) {
    int skip = 0, take = 0;
    for (int money : houses) {
        int nextTake = skip + money;
        skip = Math.max(skip, take); take = nextTake;
    }
    return Math.max(skip, take);
}
```

```python [Python]
def rob(houses):
    skip = take = 0
    for money in houses:
        skip, take = max(skip, take), skip + money
    return max(skip, take)
```

```javascript [JavaScript]
function rob(houses) {
  let skip = 0, take = 0
  for (const money of houses) {
    const nextTake = skip + money
    skip = Math.max(skip, take); take = nextTake
  }
  return Math.max(skip, take)
}
```

```cpp [C++]
int rob(const std::vector<int>& houses) {
    int skip = 0, take = 0;
    for (int money : houses) {
        int nextTake = skip + money;
        skip = std::max(skip, take); take = nextTake;
    }
    return std::max(skip, take);
}
```

```go [Go]
func rob(houses []int) int {
	skip, take := 0, 0
	for _, money := range houses {
		nextTake := skip + money
		skip, take = max(skip, take), nextTake
	}
	return max(skip, take)
}
```

:::

</ExerciseSolution>

### 3. 不同路径

<ExerciseSolution>

机器人只能从上方或左方进入当前格，因此 `dp[row][col] = dp[row-1][col] + dp[row][col-1]`。第一行和第一列都只有一种走法，初始化为 `1`。

`m × n` 网格时间 `O(mn)`；逐行计算时只保留一维数组，空间可降为 `O(n)`。如果有障碍，障碍格的路径数设为 `0`。

#### 五语言实现

::: code-group

```java [Java]
static int uniquePaths(int rows, int columns) {
    int[] dp = new int[columns];
    Arrays.fill(dp, 1);
    for (int row = 1; row < rows; row++)
        for (int column = 1; column < columns; column++) dp[column] += dp[column - 1];
    return dp[columns - 1];
}
```

```python [Python]
def unique_paths(rows, columns):
    dp = [1] * columns
    for _ in range(1, rows):
        for column in range(1, columns):
            dp[column] += dp[column - 1]
    return dp[-1]
```

```javascript [JavaScript]
function uniquePaths(rows, columns) {
  const dp = Array(columns).fill(1)
  for (let row = 1; row < rows; row++)
    for (let column = 1; column < columns; column++) dp[column] += dp[column - 1]
  return dp[columns - 1]
}
```

```cpp [C++]
int uniquePaths(int rows, int columns) {
    std::vector<int> dp(columns, 1);
    for (int row = 1; row < rows; ++row)
        for (int column = 1; column < columns; ++column) dp[column] += dp[column - 1];
    return dp.back();
}
```

```go [Go]
func uniquePaths(rows, columns int) int {
	dp := make([]int, columns)
	for i := range dp { dp[i] = 1 }
	for row := 1; row < rows; row++ {
		for column := 1; column < columns; column++ { dp[column] += dp[column-1] }
	}
	return dp[columns-1]
}
```

:::

</ExerciseSolution>

### 4. 零钱兑换

<ExerciseSolution>

令 `dp[amount]` 表示凑出该金额需要的最少硬币数。`dp[0]=0`，其他位置先设为不可达。对每个金额尝试最后使用哪一种硬币：

```text
dp[x] = min(dp[x], dp[x-coin] + 1)，前提是 x >= coin 且 x-coin 可达
```

硬币种类数为 `c`、目标金额为 `A` 时，时间 `O(cA)`、空间 `O(A)`。最终仍不可达时返回 `-1`。这题允许每种硬币使用多次，是完全背包模型。

#### 五语言实现

::: code-group

```java [Java]
static int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1); dp[0] = 0;
    for (int value = 1; value <= amount; value++)
        for (int coin : coins) if (coin <= value) dp[value] = Math.min(dp[value], dp[value - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}
```

```python [Python]
def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for value in range(1, amount + 1):
        for coin in coins:
            if coin <= value:
                dp[value] = min(dp[value], dp[value - coin] + 1)
    return -1 if dp[amount] > amount else dp[amount]
```

```javascript [JavaScript]
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1); dp[0] = 0
  for (let value = 1; value <= amount; value++)
    for (const coin of coins) if (coin <= value) dp[value] = Math.min(dp[value], dp[value - coin] + 1)
  return dp[amount] > amount ? -1 : dp[amount]
}
```

```cpp [C++]
int coinChange(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1); dp[0] = 0;
    for (int value = 1; value <= amount; ++value)
        for (int coin : coins) if (coin <= value) dp[value] = std::min(dp[value], dp[value - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}
```

```go [Go]
func coinChange(coins []int, amount int) int {
	dp := make([]int, amount+1)
	for value := 1; value <= amount; value++ { dp[value] = amount+1 }
	for value := 1; value <= amount; value++ {
		for _, coin := range coins { if coin <= value { dp[value] = min(dp[value], dp[value-coin]+1) } }
	}
	if dp[amount] > amount { return -1 }; return dp[amount]
}
```

:::

</ExerciseSolution>

### 5. 0/1 背包

<ExerciseSolution>

每件物品只能选一次。令 `dp[c]` 表示容量不超过 `c` 时的最大价值。处理某件重量 `w`、价值 `v` 的物品时：

```text
容量 c 从 capacity 递减到 w：
    dp[c] = max(dp[c], dp[c-w] + v)
```

容量必须倒序，否则本轮刚更新的状态会再次使用同一件物品，错误地变成“可以无限取”。`n` 件物品、容量 `C` 时，时间 `O(nC)`、空间 `O(C)`。

#### 五语言实现

::: code-group

```java [Java]
static int knapsack(int capacity, int[] weights, int[] values) {
    int[] dp = new int[capacity + 1];
    for (int item = 0; item < weights.length; item++)
        for (int room = capacity; room >= weights[item]; room--)
            dp[room] = Math.max(dp[room], dp[room - weights[item]] + values[item]);
    return dp[capacity];
}
```

```python [Python]
def knapsack(capacity, weights, values):
    dp = [0] * (capacity + 1)
    for weight, value in zip(weights, values):
        for room in range(capacity, weight - 1, -1):
            dp[room] = max(dp[room], dp[room - weight] + value)
    return dp[capacity]
```

```javascript [JavaScript]
function knapsack(capacity, weights, values) {
  const dp = Array(capacity + 1).fill(0)
  for (let item = 0; item < weights.length; item++)
    for (let room = capacity; room >= weights[item]; room--)
      dp[room] = Math.max(dp[room], dp[room - weights[item]] + values[item])
  return dp[capacity]
}
```

```cpp [C++]
int knapsack(int capacity, const std::vector<int>& weights, const std::vector<int>& values) {
    std::vector<int> dp(capacity + 1);
    for (int item = 0; item < static_cast<int>(weights.size()); ++item)
        for (int room = capacity; room >= weights[item]; --room)
            dp[room] = std::max(dp[room], dp[room - weights[item]] + values[item]);
    return dp[capacity];
}
```

```go [Go]
func knapsack(capacity int, weights, values []int) int {
	dp := make([]int, capacity+1)
	for item, weight := range weights {
		for room := capacity; room >= weight; room-- { dp[room] = max(dp[room], dp[room-weight]+values[item]) }
	}
	return dp[capacity]
}
```

:::

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

#### 五语言实现

::: code-group

```java [Java]
static int lengthOfLIS(int[] numbers) {
    int[] dp = new int[numbers.length]; Arrays.fill(dp, 1);
    int answer = 0;
    for (int i = 0; i < numbers.length; i++) {
        for (int j = 0; j < i; j++) if (numbers[j] < numbers[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
        answer = Math.max(answer, dp[i]);
    }
    return answer;
}
```

```python [Python]
def length_of_lis(numbers):
    dp = [1] * len(numbers)
    for i in range(len(numbers)):
        for j in range(i):
            if numbers[j] < numbers[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp, default=0)
```

```javascript [JavaScript]
function lengthOfLIS(numbers) {
  const dp = Array(numbers.length).fill(1); let answer = 0
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) if (numbers[j] < numbers[i]) dp[i] = Math.max(dp[i], dp[j] + 1)
    answer = Math.max(answer, dp[i])
  }
  return answer
}
```

```cpp [C++]
int lengthOfLIS(const std::vector<int>& numbers) {
    std::vector<int> dp(numbers.size(), 1); int answer = 0;
    for (int i = 0; i < static_cast<int>(numbers.size()); ++i) {
        for (int j = 0; j < i; ++j) if (numbers[j] < numbers[i]) dp[i] = std::max(dp[i], dp[j] + 1);
        answer = std::max(answer, dp[i]);
    }
    return answer;
}
```

```go [Go]
func lengthOfLIS(numbers []int) int {
	dp, answer := make([]int, len(numbers)), 0
	for i := range numbers {
		dp[i] = 1
		for j := 0; j < i; j++ { if numbers[j] < numbers[i] { dp[i] = max(dp[i], dp[j]+1) } }
		answer = max(answer, dp[i])
	}
	return answer
}
```

:::

</ExerciseSolution>
