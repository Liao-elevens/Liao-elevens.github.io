---
title: 从读题到调试
description: 零基础算法解题方法：翻译题目、手工模拟、写暴力解、设计测试和定位错误
---

# 从读题到调试：小白解题说明书

很多初学者以为“不会做算法题”是因为没有背过某个模板。更常见的原因是：题目还没有被翻译成清楚的输入、输出和步骤，就急着写代码。

这篇提供一套可重复使用的解题流程。

## 第一步：把题目翻译成人话

例题：

> 给定一个整数数组和一个整数 `target`，返回数组中两个数的下标，使它们的和等于 `target`。假设恰好存在一个答案。

先不要写代码，填写这张表：

| 问题 | 本题答案 |
| --- | --- |
| 输入是什么 | 一个整数数组、一个目标整数 |
| 输出是什么 | 两个数组下标 |
| 要满足什么条件 | 两个下标位置的数相加等于目标 |
| 下标能相同吗 | 不能，同一个元素不能使用两次 |
| 答案有几个 | 题目保证恰好一个 |
| 输出数值还是位置 | 位置，也就是下标 |

“返回数值还是下标”看似简单，却是非常常见的错误。

## 第二步：准备一个最小例子

```text
numbers = [2, 7, 11, 15]
target = 9
```

手工尝试：

```text
2 + 7 = 9
对应下标是 0 和 1
输出 [0, 1]
```

再准备几个反例：

```text
[3, 2, 4], target = 6       → [1, 2]
[3, 3], target = 6          → [0, 1]
[-1, -2, -3, -4], target=-6 → [1, 3]
```

第二个例子提醒我们：不能只保存“某个值是否出现”，还要知道它出现在哪个下标。

## 第三步：先写最直观的办法

不考虑效率，检查所有两个位置的组合：

```text
for i 从 0 到倒数第二个位置：
    for j 从 i + 1 到最后一个位置：
        如果 numbers[i] + numbers[j] == target：
            返回 [i, j]
```

为什么 `j` 从 `i + 1` 开始？

- 避免同一个位置使用两次；
- 避免把 `(0, 1)` 和 `(1, 0)` 重复检查。

这就是暴力解。暴力解并不丢人，它有三个重要作用：

1. 帮你确认自己理解了问题；
2. 为小数据提供正确答案；
3. 暴露最浪费时间的步骤。

## 第四步：找出重复工作

暴力解对每个数都重新寻找另一个数。

当看到当前值 `x` 时，我们真正想找的是：

```text
需要的另一个数 = target - x
```

如果有一个“号码簿”能够快速告诉我们某个数以前是否出现，以及它的下标，就不需要反复扫描。这就是哈希表的用武之地。

```text
创建空哈希表 seen

从左到右查看每个 numbers[i]：
    needed = target - numbers[i]

    如果 needed 已经在 seen：
        返回 [seen[needed], i]

    把 numbers[i] 和 i 存入 seen
```

注意顺序：**先查找，再存当前元素**。这样就不会错误地把同一个下标用两次。

## 第五步：给变量写“岗位说明”

代码前先列出变量含义：

| 变量 | 含义 | 什么时候改变 |
| --- | --- | --- |
| `i` | 当前正在查看的下标 | 每轮循环向后移动 |
| `numbers[i]` | 当前值 | 随 `i` 改变 |
| `needed` | 与当前值配对所需的数 | 每轮重新计算 |
| `seen` | 当前下标以前见过的值和位置 | 每轮末尾加入当前值 |

如果无法用一句话解释变量，通常说明思路还没有完全清楚。

## 第六步：五语言实现

::: code-group

```java [Java]
import java.util.HashMap;
import java.util.Map;

static int[] twoSum(int[] numbers, int target) {
    Map<Integer, Integer> seen = new HashMap<>();

    for (int i = 0; i < numbers.length; i++) {
        int needed = target - numbers[i];
        if (seen.containsKey(needed)) {
            return new int[] {seen.get(needed), i};
        }
        seen.put(numbers[i], i);
    }
    return new int[0];
}
```

```python [Python]
def two_sum(numbers: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}

    for i, number in enumerate(numbers):
        needed = target - number
        if needed in seen:
            return [seen[needed], i]
        seen[number] = i
    return []
```

```javascript [JavaScript]
function twoSum(numbers, target) {
  const seen = new Map()

  for (let i = 0; i < numbers.length; i += 1) {
    const needed = target - numbers[i]
    if (seen.has(needed)) {
      return [seen.get(needed), i]
    }
    seen.set(numbers[i], i)
  }
  return []
}
```

```cpp [C++]
#include <unordered_map>
#include <vector>

std::vector<int> twoSum(const std::vector<int>& numbers, int target) {
    std::unordered_map<int, int> seen;

    for (int i = 0; i < static_cast<int>(numbers.size()); ++i) {
        int needed = target - numbers[i];
        auto match = seen.find(needed);
        if (match != seen.end()) {
            return {match->second, i};
        }
        seen[numbers[i]] = i;
    }
    return {};
}
```

```go [Go]
func twoSum(numbers []int, target int) []int {
	seen := make(map[int]int)

	for index, number := range numbers {
		needed := target - number
		if previousIndex, exists := seen[needed]; exists {
			return []int{previousIndex, index}
		}
		seen[number] = index
	}
	return []int{}
}
```

:::

五份代码的共同骨架完全相同：

```text
准备哈希表 → 遍历 → 计算需要值 → 查询 → 保存当前值
```

## 第七步：不要只用正常例子测试

测试应该主动攻击代码的薄弱位置：

| 类型 | 示例 | 想检查什么 |
| --- | --- | --- |
| 最小有效数据 | `[3, 3]`, `6` | 两个重复值能否正确处理 |
| 答案在末尾 | `[1, 2, 3, 7]`, `10` | 是否遍历完整 |
| 包含负数 | `[-4, 6, 10]`, `2` | 是否错误假设全为正数 |
| 答案顺序 | `[7, 2]`, `9` | 返回的是下标而非数值 |
| 无答案 | `[1, 2]`, `8` | 即使题目保证有答案，函数如何兜底 |

### 边界清单

每道题都可以从这些方向想：

- 空输入；
- 只有一个元素；
- 全部元素相同；
- 已经有序或完全逆序；
- 最小值、最大值、负数和零；
- 答案在第一个或最后一个位置；
- 没有答案或有多个答案；
- 整数是否可能溢出。

并非每道题都允许所有情况。先读题目限制，再挑相关项。

## 怎样调试“不知道哪里错了”的代码

不要盯着整段程序反复看。使用一个最小失败例子，逐行记录状态：

| `i` | 当前值 | `needed` | 查询前的 `seen` | 结果 |
| ---: | ---: | ---: | --- | --- |
| 0 | 2 | 7 | `{}` | 没找到，保存 `2 → 0` |
| 1 | 7 | 2 | `{2 → 0}` | 找到，返回 `[0, 1]` |

如果代码结果不同，第一行出现差异的位置就是排查起点。

### 常见错误分类

| 症状 | 优先检查 |
| --- | --- |
| 数组越界 | 循环条件、最后一个下标 |
| 死循环 | 每轮是否改变循环变量或区间 |
| 少处理一个元素 | `<` 和 `<=` 是否混淆 |
| 重复值出错 | 哈希表保存或覆盖的时机 |
| 大数据超时 | 是否存在嵌套完整遍历 |
| 小数据对、大数据错 | 整数溢出、递归深度、复杂度 |

## 看答案的正确方式

卡住时可以看答案，但不要停在“看懂了”：

1. 先记录自己卡在读题、暴力解还是优化；
2. 只看提示，尝试继续；
3. 看完整答案后关掉页面；
4. 用自己的话写伪代码；
5. 用最熟悉的语言独立重写；
6. 第二天再写一次；
7. 换一组输入手工验证。

真正的掌握是“没有答案时也能重新推出来”，不是“答案摆在眼前时感觉合理”。

## 一页解题卡

以后每道题都可以复制这份卡片：

```text
题目要我返回什么：
输入中每个量的含义：
限制条件：

最小示例：
手工过程：

最直观的暴力解：
重复工作在哪里：
可以用什么结构/规律消除重复：

核心变量及含义：
伪代码：

时间复杂度：
空间复杂度：

测试：
1.
2.
3.

本次错误：
下次识别信号：
```

## 接下来学习

- [哈希表与集合：理解本例中的“号码簿” →](/algorithm/02-linear-structures/hash-table)
- [认识 Big O：比较暴力解和哈希解 →](/algorithm/01-complexity/big-o)
- [第三方练习平台怎么选 →](/resources/#练习与在线评测)
