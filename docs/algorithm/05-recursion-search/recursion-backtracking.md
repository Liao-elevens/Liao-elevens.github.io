---
title: 递归与回溯入门
description: 用走迷宫和选择清单理解递归、状态、选择与撤销
comments: true
commentId: algorithm-recursion-backtracking
---

# 递归与回溯：选择之后，还能回来

::: tip 配套深化阅读
如果递归调用过程仍然抽象，先阅读 [labuladong：理解递归](https://labuladong.online/zh/algo/essential-technique/understand-recursion/)；能画出递归树后再进入[回溯框架](https://labuladong.online/zh/algo/essential-technique/backtrack-framework/)。
:::

递归是函数处理一个规模更小的同类问题；回溯是在递归树上尝试选择，并在返回时撤销选择。

## 通俗实例：搭配一份早餐

有三样食物：

```text
[面包, 鸡蛋, 牛奶]
```

每样都可以“选择”或“不选择”。所有组合包括：

```text
[]
[面包]
[鸡蛋]
[牛奶]
[面包, 鸡蛋]
[面包, 牛奶]
[鸡蛋, 牛奶]
[面包, 鸡蛋, 牛奶]
```

对每个位置都做两次选择，形成一棵二叉决策树。

## 递归的三个必要部分

| 部分 | 含义 |
| --- | --- |
| 当前状态 | 已经处理到哪个位置、当前选了什么 |
| 递归推进 | 处理下一个更小的子问题 |
| 终止条件 | 所有位置已经决定，记录答案 |

## 回溯骨架

```text
搜索(index, path)：
    如果 index 等于元素数量：
        记录 path
        返回

    不选择当前元素
    搜索(index + 1, path)

    选择当前元素
    把当前元素加入 path
    搜索(index + 1, path)
    从 path 中移除当前元素
```

最后一步移除元素，就是“回溯”：恢复进入当前分支之前的状态。

## 五语言实现：生成所有子集

::: code-group

```java [Java]
import java.util.ArrayList;
import java.util.List;

public class Subsets {
    public static List<List<Integer>> buildSubsets(int[] numbers) {
        List<List<Integer>> result = new ArrayList<>();
        search(numbers, 0, new ArrayList<>(), result);
        return result;
    }

    private static void search(
        int[] numbers,
        int index,
        List<Integer> path,
        List<List<Integer>> result
    ) {
        if (index == numbers.length) {
            result.add(new ArrayList<>(path));
            return;
        }

        search(numbers, index + 1, path, result);

        path.add(numbers[index]);
        search(numbers, index + 1, path, result);
        path.remove(path.size() - 1);
    }
}
```

```python [Python]
def build_subsets(numbers: list[int]) -> list[list[int]]:
    result: list[list[int]] = []
    path: list[int] = []

    def search(index: int) -> None:
        if index == len(numbers):
            result.append(path.copy())
            return

        search(index + 1)

        path.append(numbers[index])
        search(index + 1)
        path.pop()

    search(0)
    return result
```

```javascript [JavaScript]
function buildSubsets(numbers) {
  const result = []
  const path = []

  function search(index) {
    if (index === numbers.length) {
      result.push([...path])
      return
    }

    search(index + 1)

    path.push(numbers[index])
    search(index + 1)
    path.pop()
  }

  search(0)
  return result
}
```

```cpp [C++]
#include <vector>

void search(
    const std::vector<int>& numbers,
    int index,
    std::vector<int>& path,
    std::vector<std::vector<int>>& result
) {
    if (index == static_cast<int>(numbers.size())) {
        result.push_back(path);
        return;
    }

    search(numbers, index + 1, path, result);

    path.push_back(numbers[index]);
    search(numbers, index + 1, path, result);
    path.pop_back();
}

std::vector<std::vector<int>> buildSubsets(
    const std::vector<int>& numbers
) {
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    search(numbers, 0, path, result);
    return result;
}
```

```go [Go]
func buildSubsets(numbers []int) [][]int {
	result := [][]int{}
	path := []int{}

	var search func(int)
	search = func(index int) {
		if index == len(numbers) {
			snapshot := append([]int(nil), path...)
			result = append(result, snapshot)
			return
		}

		search(index + 1)

		path = append(path, numbers[index])
		search(index + 1)
		path = path[:len(path)-1]
	}

	search(0)
	return result
}
```

:::

## 为什么记录答案时必须复制 path

`path` 会被后续分支反复修改。如果只把同一个可变对象放入答案，最后可能得到许多份相同内容。

| 语言 | 复制方法 |
| --- | --- |
| Java | `new ArrayList<>(path)` |
| Python | `path.copy()` |
| JavaScript | `[...path]` |
| C++ | `result.push_back(path)` 按值复制 |
| Go | `append([]int(nil), path...)` |

## 复杂度

`n` 个元素有 `2ⁿ` 个子集。仅输出所有答案就需要：

- 时间复杂度：`O(n × 2ⁿ)`，复制每个子集需要时间；
- 递归栈：`O(n)`；
- 结果空间：`O(n × 2ⁿ)`。

## 常见错误

- 没有终止条件；
- 递归参数没有向终止条件靠近；
- 做出选择后忘记撤销；
- 记录答案时没有复制可变路径；
- 把回溯用于本来可以直接计算的问题；
- 忘记去重相同元素产生的重复方案。

## 练习

### 1. 生成所有排列

<ExerciseSolution>

**状态**是当前排列 `path`，**选择**是尚未使用的元素。每层选择一个未使用元素，加入路径后递归；返回时撤销选择。路径长度等于元素数量时复制到答案。

```text
backtrack(path, used):
    如果 path.length == n：记录 path 的副本并返回
    遍历每个下标 i：
        如果 used[i]：跳过
        used[i] = true，path 加入 nums[i]
        backtrack(path, used)
        path 删除末尾，used[i] = false
```

共有 `n!` 个答案，复制答案后时间 `O(n · n!)`，递归路径和标记空间 `O(n)`。输入含重复元素时先排序，并跳过“同层前一个相同但未使用”的选择，避免重复排列。

</ExerciseSolution>

### 2. 组合总和

<ExerciseSolution>

先排序候选数。状态是剩余目标 `remain` 和本层允许开始选择的下标 `start`。选中一个数后，如果题目允许重复使用，就仍从当前下标递归；不允许重复则从 `i + 1` 开始。

```text
backtrack(start, remain):
    remain == 0：记录路径副本
    遍历 i 从 start 开始：
        如果 candidates[i] > remain：停止本层
        选择 candidates[i]
        backtrack(i, remain - candidates[i])
        撤销选择
```

排序后的提前停止就是剪枝。复杂度取决于候选数和目标值，最坏为指数级；路径深度最多约为 `target / minCandidate`。

</ExerciseSolution>

### 3. 电话号码字母组合

<ExerciseSolution>

建立数字到字母的映射，例如 `2 → abc`。递归层数对应数字位置，每层从该数字的字母集合中选一个。走完所有数字后记录字符串。

```text
backtrack(index):
    index == digits.length：记录当前字符串
    遍历 map[digits[index]] 中的字母：
        加入字母
        backtrack(index + 1)
        删除字母
```

若每个数字最多对应 4 个字母，长度为 `n` 时最多产生 `4ⁿ` 个结果，生成结果的时间为 `O(n · 4ⁿ)`。空输入返回空列表，而不是包含空字符串的列表。

</ExerciseSolution>

### 4. N 皇后

<ExerciseSolution>

逐行放皇后。三个集合分别记录已占用的列 `col`、主对角线 `row-col` 和副对角线 `row+col`。某位置三者都未占用才可以选择。

```text
backtrack(row):
    row == n：记录棋盘
    遍历 col：
        如果列或两条对角线冲突：跳过
        标记冲突并放置皇后
        backtrack(row + 1)
        撤销皇后和三个标记
```

搜索上界约为 `O(n!)`，三个集合把冲突检查从扫描棋盘降为平均 `O(1)`。`n=2`、`n=3` 无解，`n=1` 有一个解。

</ExerciseSolution>

### 5. 数独求解

<ExerciseSolution>

先为每一行、列和九宫格建立已使用数字集合。选择一个空格，尝试 `1..9` 中不冲突的数字；填入后递归，失败则恢复空格。为了明显加速，应优先选择“候选数字最少”的空格。

```text
solve():
    找到候选最少的空格；若没有空格则成功
    遍历该格的候选数字：
        写入数字并更新行/列/宫标记
        如果 solve() 成功：返回 true
        清空格子并撤销标记
    返回 false
```

最坏复杂度是指数级，粗略上界 `O(9^e)`，`e` 为空格数；约束传播和选择最少候选格是关键剪枝。输入本身冲突时应直接判定无解。

</ExerciseSolution>

### 6. 单词搜索

<ExerciseSolution>

从每个与单词首字符相同的格子出发 DFS。状态包括当前位置和即将匹配的字符下标；同一条路径中不能重复使用格子，因此进入时标记、离开时恢复。

```text
dfs(row, col, index):
    越界、字符不同或已访问：false
    index == word.length - 1：true
    标记当前格
    在上下左右递归匹配 index + 1
    恢复当前格
    返回四个方向是否有一个成功
```

棋盘 `m × n`、单词长度 `L` 时，最坏时间 `O(mn · 3ᴸ)`：第一步后通常不能立刻走回原格，所以后续最多约三个方向；递归空间 `O(L)`。

</ExerciseSolution>

### 五语言迁移提示

<ExerciseSolution title="展开六道回溯题的五语言写法差异" eyebrow="CODE">

六道题都直接复用本文已经给出的五语言回溯骨架，变化的只是“选择列表、终止条件和冲突判断”：

| 语言 | 路径 | 已使用标记 | 撤销方式 |
| --- | --- | --- | --- |
| Java | `ArrayList<T>` | `boolean[]` / `HashSet` | `remove(size - 1)` |
| Python | `list` | `list[bool]` / `set` | `pop()` |
| JavaScript | `Array` | `Array<boolean>` / `Set` | `pop()` |
| C++ | `vector<T>` | `vector<bool>` / `unordered_set` | `pop_back()` |
| Go | `[]T` | `[]bool` / `map[T]bool` | `path = path[:len(path)-1]` |

实现时必须保证每一次“选择”都有一一对应的“撤销”；记录答案时复制路径。N 皇后和数独再增加列、对角线、行、宫等冲突集合，单词搜索则临时修改棋盘或使用二维 `visited`。

</ExerciseSolution>
