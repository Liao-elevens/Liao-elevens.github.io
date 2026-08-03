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

#### 五语言实现

::: code-group

```java [Java]
static void inorder(TreeNode node, List<Integer> answer) {
    if (node == null) return;
    inorder(node.left, answer); answer.add(node.value); inorder(node.right, answer);
}
static void postorder(TreeNode node, List<Integer> answer) {
    if (node == null) return;
    postorder(node.left, answer); postorder(node.right, answer); answer.add(node.value);
}
```

```python [Python]
def inorder(node, answer):
    if node is None: return
    inorder(node.left, answer); answer.append(node.value); inorder(node.right, answer)

def postorder(node, answer):
    if node is None: return
    postorder(node.left, answer); postorder(node.right, answer); answer.append(node.value)
```

```javascript [JavaScript]
function inorder(node, answer) {
  if (!node) return
  inorder(node.left, answer); answer.push(node.value); inorder(node.right, answer)
}
function postorder(node, answer) {
  if (!node) return
  postorder(node.left, answer); postorder(node.right, answer); answer.push(node.value)
}
```

```cpp [C++]
void inorder(TreeNode* node, std::vector<int>& answer) {
    if (!node) return;
    inorder(node->left, answer); answer.push_back(node->value); inorder(node->right, answer);
}
void postorder(TreeNode* node, std::vector<int>& answer) {
    if (!node) return;
    postorder(node->left, answer); postorder(node->right, answer); answer.push_back(node->value);
}
```

```go [Go]
func inorder(node *TreeNode, answer *[]int) {
	if node == nil { return }
	inorder(node.Left, answer); *answer = append(*answer, node.Value); inorder(node.Right, answer)
}
func postorder(node *TreeNode, answer *[]int) {
	if node == nil { return }
	postorder(node.Left, answer); postorder(node.Right, answer); *answer = append(*answer, node.Value)
}
```

:::

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

#### 五语言实现

::: code-group

```java [Java]
static List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> answer = new ArrayList<>();
    if (root == null) return answer;
    Queue<TreeNode> queue = new ArrayDeque<>(); queue.offer(root);
    while (!queue.isEmpty()) {
        List<Integer> level = new ArrayList<>();
        for (int count = queue.size(); count > 0; count--) {
            TreeNode node = queue.poll(); level.add(node.value);
            if (node.left != null) queue.offer(node.left); if (node.right != null) queue.offer(node.right);
        }
        answer.add(level);
    }
    return answer;
}
```

```python [Python]
from collections import deque
def level_order(root):
    if root is None: return []
    queue, answer = deque([root]), []
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft(); level.append(node.value)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        answer.append(level)
    return answer
```

```javascript [JavaScript]
function levelOrder(root) {
  if (!root) return []
  const queue = [root], answer = []
  for (let head = 0; head < queue.length;) {
    const end = queue.length, level = []
    while (head < end) {
      const node = queue[head++]; level.push(node.value)
      if (node.left) queue.push(node.left); if (node.right) queue.push(node.right)
    }
    answer.push(level)
  }
  return answer
}
```

```cpp [C++]
std::vector<std::vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    std::queue<TreeNode*> queue; queue.push(root);
    std::vector<std::vector<int>> answer;
    while (!queue.empty()) {
        std::vector<int> level;
        for (int count = queue.size(); count > 0; --count) {
            TreeNode* node = queue.front(); queue.pop(); level.push_back(node->value);
            if (node->left) queue.push(node->left); if (node->right) queue.push(node->right);
        }
        answer.push_back(level);
    }
    return answer;
}
```

```go [Go]
func levelOrder(root *TreeNode) [][]int {
	if root == nil { return nil }
	queue, answer := []*TreeNode{root}, [][]int{}
	for len(queue) > 0 {
		size, level := len(queue), []int{}
		for i := 0; i < size; i++ {
			node := queue[0]; queue = queue[1:]; level = append(level, node.Value)
			if node.Left != nil { queue = append(queue, node.Left) }; if node.Right != nil { queue = append(queue, node.Right) }
		}
		answer = append(answer, level)
	}
	return answer
}
```

:::

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

#### 五语言实现

::: code-group

```java [Java]
static int maxDepth(TreeNode node) {
    if (node == null) return 0;
    return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}
```

```python [Python]
def max_depth(node):
    if node is None: return 0
    return 1 + max(max_depth(node.left), max_depth(node.right))
```

```javascript [JavaScript]
function maxDepth(node) {
  if (!node) return 0
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right))
}
```

```cpp [C++]
int maxDepth(TreeNode* node) {
    if (!node) return 0;
    return 1 + std::max(maxDepth(node->left), maxDepth(node->right));
}
```

```go [Go]
func maxDepth(node *TreeNode) int {
	if node == nil { return 0 }
	return 1 + max(maxDepth(node.Left), maxDepth(node.Right))
}
```

:::

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

#### 五语言实现

::: code-group

```java [Java]
static boolean sameTree(TreeNode first, TreeNode second) {
    if (first == null || second == null) return first == second;
    return first.value == second.value
        && sameTree(first.left, second.left) && sameTree(first.right, second.right);
}
```

```python [Python]
def same_tree(first, second):
    if first is None or second is None: return first is second
    return (first.value == second.value
            and same_tree(first.left, second.left)
            and same_tree(first.right, second.right))
```

```javascript [JavaScript]
function sameTree(first, second) {
  if (!first || !second) return first === second
  return first.value === second.value
    && sameTree(first.left, second.left) && sameTree(first.right, second.right)
}
```

```cpp [C++]
bool sameTree(TreeNode* first, TreeNode* second) {
    if (!first || !second) return first == second;
    return first->value == second->value
        && sameTree(first->left, second->left) && sameTree(first->right, second->right);
}
```

```go [Go]
func sameTree(first, second *TreeNode) bool {
	if first == nil || second == nil { return first == second }
	return first.Value == second.Value && sameTree(first.Left, second.Left) && sameTree(first.Right, second.Right)
}
```

:::

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

#### 五语言实现

::: code-group

```java [Java]
static int diameter;
static int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left), right = height(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
}
static int diameter(TreeNode root) { diameter = 0; height(root); return diameter; }
```

```python [Python]
def diameter(root):
    answer = 0
    def height(node):
        nonlocal answer
        if node is None: return 0
        left, right = height(node.left), height(node.right)
        answer = max(answer, left + right)
        return 1 + max(left, right)
    height(root)
    return answer
```

```javascript [JavaScript]
function diameter(root) {
  let answer = 0
  function height(node) {
    if (!node) return 0
    const left = height(node.left), right = height(node.right)
    answer = Math.max(answer, left + right)
    return 1 + Math.max(left, right)
  }
  height(root); return answer
}
```

```cpp [C++]
int height(TreeNode* node, int& answer) {
    if (!node) return 0;
    int left = height(node->left, answer), right = height(node->right, answer);
    answer = std::max(answer, left + right);
    return 1 + std::max(left, right);
}
int diameter(TreeNode* root) { int answer = 0; height(root, answer); return answer; }
```

```go [Go]
func diameter(root *TreeNode) int {
	answer := 0
	var height func(*TreeNode) int
	height = func(node *TreeNode) int {
		if node == nil { return 0 }
		left, right := height(node.Left), height(node.Right); answer = max(answer, left+right)
		return 1 + max(left, right)
	}
	height(root); return answer
}
```

:::

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

#### 五语言实现

::: code-group

```java [Java]
static TreeNode invert(TreeNode node) {
    if (node == null) return null;
    TreeNode left = invert(node.left);
    node.left = invert(node.right); node.right = left;
    return node;
}
```

```python [Python]
def invert(node):
    if node is None: return None
    node.left, node.right = invert(node.right), invert(node.left)
    return node
```

```javascript [JavaScript]
function invert(node) {
  if (!node) return null
  ;[node.left, node.right] = [invert(node.right), invert(node.left)]
  return node
}
```

```cpp [C++]
TreeNode* invert(TreeNode* node) {
    if (!node) return nullptr;
    std::swap(node->left, node->right);
    invert(node->left); invert(node->right);
    return node;
}
```

```go [Go]
func invert(node *TreeNode) *TreeNode {
	if node == nil { return nil }
	node.Left, node.Right = invert(node.Right), invert(node.Left)
	return node
}
```

:::

</ExerciseSolution>
