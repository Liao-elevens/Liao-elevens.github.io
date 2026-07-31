---
title: 递归与回溯入门
description: 用走迷宫和选择清单理解递归、状态、选择与撤销
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

- 生成所有排列；
- 组合总和；
- 电话号码字母组合；
- N 皇后；
- 数独求解；
- 单词搜索。
