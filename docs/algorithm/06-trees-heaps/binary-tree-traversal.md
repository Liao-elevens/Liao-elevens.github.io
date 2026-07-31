---
title: 二叉树遍历
description: 用家族关系和文件夹理解树的节点、子树与遍历顺序
---

# 二叉树遍历：先看谁，后看谁

::: tip 配套深化阅读
本文先建立遍历顺序，再使用 [labuladong：二叉树核心纲领](https://labuladong.online/zh/algo/essential-technique/binary-tree-summary/)深化“遍历一遍”和“分解子问题”两种思维。
:::

树可以表达文件夹、组织结构和家族关系。二叉树中的每个节点最多有左、右两个孩子。

## 示例

```text
        1
       / \
      2   3
     / \
    4   5
```

| 遍历 | 顺序 | 结果 |
| --- | --- | --- |
| 前序 | 根 → 左 → 右 | `1, 2, 4, 5, 3` |
| 中序 | 左 → 根 → 右 | `4, 2, 5, 1, 3` |
| 后序 | 左 → 右 → 根 | `4, 5, 2, 3, 1` |
| 层序 | 从上到下逐层 | `1, 2, 3, 4, 5` |

## 为什么递归适合树

一棵二叉树由：

- 当前根节点；
- 一棵更小的左子树；
- 一棵更小的右子树组成。

子树仍然是树，所以可以用同一个函数处理。

## 五语言实现：前序遍历

::: code-group

```java [Java]
import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;

    TreeNode(int value) {
        this.value = value;
    }
}

public static List<Integer> preorder(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    traverse(root, result);
    return result;
}

private static void traverse(TreeNode node, List<Integer> result) {
    if (node == null) {
        return;
    }
    result.add(node.value);
    traverse(node.left, result);
    traverse(node.right, result);
}
```

```python [Python]
class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left: TreeNode | None = None
        self.right: TreeNode | None = None


def preorder(root: TreeNode | None) -> list[int]:
    result: list[int] = []

    def traverse(node: TreeNode | None) -> None:
        if node is None:
            return
        result.append(node.value)
        traverse(node.left)
        traverse(node.right)

    traverse(root)
    return result
```

```javascript [JavaScript]
class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

function preorder(root) {
  const result = []

  function traverse(node) {
    if (node === null) return
    result.push(node.value)
    traverse(node.left)
    traverse(node.right)
  }

  traverse(root)
  return result
}
```

```cpp [C++]
#include <vector>

struct TreeNode {
    int value;
    TreeNode* left = nullptr;
    TreeNode* right = nullptr;

    explicit TreeNode(int value) : value(value) {}
};

void traverse(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr) {
        return;
    }
    result.push_back(node->value);
    traverse(node->left, result);
    traverse(node->right, result);
}

std::vector<int> preorder(TreeNode* root) {
    std::vector<int> result;
    traverse(root, result);
    return result;
}
```

```go [Go]
type TreeNode struct {
	Value int
	Left  *TreeNode
	Right *TreeNode
}

func preorder(root *TreeNode) []int {
	result := []int{}

	var traverse func(*TreeNode)
	traverse = func(node *TreeNode) {
		if node == nil {
			return
		}
		result = append(result, node.Value)
		traverse(node.Left)
		traverse(node.Right)
	}

	traverse(root)
	return result
}
```

:::

## 怎样切换遍历顺序

只需要改变“处理当前节点”所在的位置：

```text
前序：处理当前 → 左递归 → 右递归
中序：左递归 → 处理当前 → 右递归
后序：左递归 → 右递归 → 处理当前
```

## 复杂度

- 每个节点访问一次，时间 `O(n)`；
- 递归栈取决于树高，空间 `O(h)`；
- 平衡树的 `h` 约为 `log n`；
- 完全倾斜的树，`h` 可能达到 `n`。

## 练习

- 实现中序和后序遍历；
- 使用队列实现层序遍历；
- 计算树的最大深度；
- 判断两棵树是否相同；
- 计算二叉树直径；
- 翻转二叉树。
