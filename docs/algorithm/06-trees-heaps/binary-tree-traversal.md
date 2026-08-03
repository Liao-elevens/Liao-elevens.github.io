---
title: 二叉树遍历
description: 用家族关系和文件夹理解树的节点、子树与遍历顺序
comments: true
commentId: algorithm-binary-tree-traversal
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

### 1. 实现中序和后序遍历

<ExerciseSolution>

只需改变“处理当前节点”所在的位置：

```text
中序(node)：中序(node.left) → 记录 node → 中序(node.right)
后序(node)：后序(node.left) → 后序(node.right) → 记录 node
```

每个节点访问一次，时间 `O(n)`；递归栈空间 `O(h)`。中序遍历二叉搜索树会得到升序序列，后序适合在处理父节点前先完成两个子树，例如删除整棵树。

</ExerciseSolution>

### 2. 使用队列实现层序遍历

<ExerciseSolution>

根节点先入队。每轮先记住当前队列长度 `levelSize`，只弹出这么多个节点，它们恰好属于同一层；弹出时把非空孩子加入队尾。

```text
queue = [root]
当队列不空：
    levelSize = queue.size
    重复 levelSize 次：
        node = 出队
        记录 node
        非空左右孩子入队
```

时间 `O(n)`；队列最宽时可能保存一整层，空间 `O(w)`，`w` 为最大层宽。

</ExerciseSolution>

### 3. 计算树的最大深度

<ExerciseSolution>

空节点深度为 `0`；非空节点的深度等于左右子树较大深度加一：

```text
depth(node):
    node 为空：返回 0
    返回 max(depth(node.left), depth(node.right)) + 1
```

时间 `O(n)`，递归栈 `O(h)`。只有根节点时答案为 `1`。

</ExerciseSolution>

### 4. 判断两棵树是否相同

<ExerciseSolution>

两个节点都空时相同；只有一个空时不同；值不同也不同。剩余情况要求左子树相同且右子树相同。

```text
same(a, b):
    两者都空：true
    只有一个空或值不同：false
    返回 same(a.left,b.left) 并且 same(a.right,b.right)
```

最坏检查所有对应节点，时间 `O(n)`，递归空间 `O(h)`。

</ExerciseSolution>

### 5. 计算二叉树直径

<ExerciseSolution>

直径是任意两节点之间最长路径的边数。对每个节点，经过它的路径长度是“左子树高度 + 右子树高度”。后序计算高度的同时更新全局最大值。

```text
height(node):
    node 为空：0
    left = height(node.left)
    right = height(node.right)
    diameter = max(diameter, left + right)
    返回 max(left, right) + 1
```

时间 `O(n)`，空间 `O(h)`。不要为每个节点再次单独计算高度，否则会退化为 `O(n²)`。

</ExerciseSolution>

### 6. 翻转二叉树

<ExerciseSolution>

对每个节点交换左右孩子，再递归翻转两棵子树。先交换还是递归返回后交换都可以，只要每个节点处理一次。

```text
invert(node):
    node 为空：返回空
    交换 node.left 与 node.right
    invert(node.left)
    invert(node.right)
    返回 node
```

时间 `O(n)`、递归空间 `O(h)`。翻转两次应恢复原树，这是很好用的测试性质。

</ExerciseSolution>

### 五语言迁移提示

<ExerciseSolution title="展开树题在五种语言中的实现对应" eyebrow="CODE">

本文前面的五语言 `TreeNode` 和前序遍历已经给出完整节点定义。以上答案可以原样替换递归函数主体：Java/Python/JavaScript/C++/Go 中的空节点分别是 `null`、`None`、`null`、`nullptr`、`nil`。

层序遍历的队列分别推荐：Java `ArrayDeque<TreeNode>`、Python `collections.deque`、JavaScript 数组加头下标、C++ `std::queue<TreeNode*>`、Go `[]*TreeNode` 加头下标。不要在 JavaScript 或 Go 中反复删除数组第一个元素，否则可能引入额外移动成本。

直径题的全局答案也可以改为让递归返回“高度与直径”二元结果，避免使用全局变量；核心后序顺序不变。

</ExerciseSolution>
