---
title: Go 算法语法入门
description: 面向算法初学者的 Go 变量、切片、映射、结构体、队列与常见陷阱
comments: true
commentId: algorithm-go-basics
---

# Go 算法语法入门

这篇不是完整 Go 语言教程，只讲阅读和编写算法代码最常用的部分。先掌握这些，就可以切换到其他算法文章中的 Go 标签页。

## 第一个模型：变量、条件和循环

```go
package main

import "fmt"

func findMax(numbers []int) int {
	if len(numbers) == 0 {
		panic("切片不能为空")
	}

	currentMax := numbers[0]
	for index := 1; index < len(numbers); index++ {
		if numbers[index] > currentMax {
			currentMax = numbers[index]
		}
	}
	return currentMax
}

func main() {
	numbers := []int{12, 7, 25, 18, 10}
	fmt.Println(findMax(numbers))
}
```

把语法翻译成人话：

| Go 写法 | 含义 |
| --- | --- |
| `numbers []int` | 参数是整数切片 |
| `:=` | 声明变量并根据右侧推断类型 |
| `len(numbers)` | 取得长度 |
| `for ...` | Go 只有 `for` 这一种循环关键字 |
| `index++` | 下标加一 |
| `panic(...)` | 当前示例中用于报告不合法输入 |
| `return currentMax` | 返回结果 |

## 数组和切片不是一回事

```go
fixed := [3]int{10, 20, 30} // 长度属于类型的一部分
dynamic := []int{10, 20, 30} // 切片，算法题中更常用
dynamic = append(dynamic, 40)
```

可以先把切片理解成“动态数组的窗口”，但要记住：

- `len(slice)` 是当前元素数量；
- `cap(slice)` 是当前底层空间容量；
- `append` 可能复用原数组，也可能分配新数组；
- `slice[a:b]` 使用左闭右开区间 `[a, b)`；
- 切片变量本身不是完整数据副本，多个切片可能共享底层数组。

### 修改是否会影响原数据

```go
func changeFirst(numbers []int) {
	numbers[0] = 99
}
```

把切片传入函数后修改元素，调用者通常也能看到变化。以后学习原地排序、双指针时，这一点很重要。

## Map：计数和快速查找

```go
func countNumbers(numbers []int) map[int]int {
	counts := make(map[int]int)
	for _, number := range numbers {
		counts[number]++
	}
	return counts
}
```

Go 读取不存在的 key 时会得到 value 类型的零值。对于 `map[int]int`，零值是 `0`，因此计数可以直接写 `counts[number]++`。

如果“值为零”和“不存在”需要区分，使用：

```go
value, exists := counts[key]
if exists {
	// key 确实存在
}
```

## Set：用 Map 表示集合

Go 标准库没有单独的通用 `Set` 类型，算法题常用：

```go
seen := make(map[int]bool)
seen[7] = true

if seen[7] {
	// 已经见过 7
}
```

也可以使用 `map[int]struct{}` 节省无意义的布尔值：

```go
seen := make(map[int]struct{})
seen[7] = struct{}{}
_, exists := seen[7]
```

初学阶段优先使用 `map[int]bool`，代码更直观。

## 结构体和指针：表示链表与树

```go
type ListNode struct {
	Value int
	Next  *ListNode
}

type TreeNode struct {
	Value int
	Left  *TreeNode
	Right *TreeNode
}
```

`*TreeNode` 表示指向节点的指针，`nil` 表示没有节点。二叉树递归的终止条件通常是：

```go
if node == nil {
	return
}
```

Go 会自动处理常见的结构体指针字段访问，所以通常直接写 `node.Left`，不需要手写解引用符号。

## 栈和队列

### 用切片表示栈

```go
stack := []int{}
stack = append(stack, 10) // 入栈
stack = append(stack, 20)

top := stack[len(stack)-1]
stack = stack[:len(stack)-1] // 出栈
```

### 用切片和头下标表示队列

```go
queue := []int{0}
head := 0

for head < len(queue) {
	node := queue[head]
	head++

	// queue = append(queue, neighbor)
	_ = node
}
```

不要在算法题里频繁删除切片第一个元素并移动所有数据。使用头下标可以让每个元素只入队、出队一次。

## Go 与其他四种语言的常用对应

| 需求 | Java | Python | JavaScript | C++ | Go |
| --- | --- | --- | --- | --- | --- |
| 动态数组 | `ArrayList` | `list` | `Array` | `vector` | `[]T` |
| 哈希表 | `HashMap` | `dict` | `Map` | `unordered_map` | `map[K]V` |
| 集合 | `HashSet` | `set` | `Set` | `unordered_set` | `map[T]bool` |
| 栈 | `ArrayDeque` | `list` | `Array` | `stack` | `[]T` |
| 队列 | `ArrayDeque` | `deque` | 数组加头下标 | `queue` | 切片加头下标 |
| 空节点 | `null` | `None` | `null` | `nullptr` | `nil` |

## 初学者常见错误

1. 声明了变量却没有使用：Go 编译器会直接报错；
2. `range` 得到的是值副本，修改循环变量不一定会修改原切片；
3. 把 `len` 和 `cap` 混为一谈；
4. 读取不存在的 Map key 时，没有区分零值与不存在；
5. 对 `nil` 指针访问字段；
6. 认为切片操作一定复制了数据；
7. 用 `int` 保存可能超过平台整数范围的累计值，前缀和常用 `int64`。

## 自测练习

### 1. 用 Go 写出数组求和

<ExerciseSolution>

遍历切片并把每个值累加到 `int64`，可以降低大量整数相加时溢出的风险。

```go
func sum(numbers []int) int64 {
	var total int64
	for _, number := range numbers {
		total += int64(number)
	}
	return total
}
```

时间复杂度 `O(n)`，额外空间 `O(1)`；空切片自然返回 `0`。

</ExerciseSolution>

### 2. 返回最大值和它的下标

<ExerciseSolution>

使用第一个元素初始化，避免全负数时错误地返回 `0`。最大值重复时返回第一次出现的位置。

```go
func maxWithIndex(numbers []int) (int, int, bool) {
	if len(numbers) == 0 {
		return 0, -1, false
	}
	maximum, index := numbers[0], 0
	for i := 1; i < len(numbers); i++ {
		if numbers[i] > maximum {
			maximum, index = numbers[i], i
		}
	}
	return maximum, index, true
}
```

第三个返回值表示是否存在答案。时间 `O(n)`，空间 `O(1)`。

</ExerciseSolution>

### 3. 使用 Map 统计数字频率

<ExerciseSolution>

`counts[number]++` 会先读取当前计数；key 不存在时得到 `int` 的零值 `0`，因此可以直接加一。

```go
func frequencies(numbers []int) map[int]int {
	counts := make(map[int]int)
	for _, number := range numbers {
		counts[number]++
	}
	return counts
}
```

平均时间 `O(n)`，空间 `O(k)`，其中 `k` 是不同数字的数量。

</ExerciseSolution>

### 4. 使用切片模拟栈并完成括号匹配

<ExerciseSolution>

遇到左括号就压栈；遇到右括号时，栈顶必须是对应的左括号。任何提前不匹配，或者最后栈不为空，都说明字符串无效。

```go
func isValidBrackets(text string) bool {
	pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
	stack := make([]rune, 0)
	for _, char := range text {
		if char == '(' || char == '[' || char == '{' {
			stack = append(stack, char)
			continue
		}
		expected, isClosing := pairs[char]
		if !isClosing || len(stack) == 0 || stack[len(stack)-1] != expected {
			return false
		}
		stack = stack[:len(stack)-1]
	}
	return len(stack) == 0
}
```

时间 `O(n)`，最坏空间 `O(n)`。应测试空字符串、单个括号、错误嵌套和连续多组括号。

</ExerciseSolution>

### 5. 定义二叉树节点并完成前序遍历

<ExerciseSolution>

前序顺序是“当前节点 → 左子树 → 右子树”。`nil` 节点是递归终止条件。

```go
type TreeNode struct {
	Value int
	Left  *TreeNode
	Right *TreeNode
}

func preorder(root *TreeNode) []int {
	result := make([]int, 0)
	var visit func(*TreeNode)
	visit = func(node *TreeNode) {
		if node == nil { return }
		result = append(result, node.Value)
		visit(node.Left)
		visit(node.Right)
	}
	visit(root)
	return result
}
```

每个节点访问一次，时间 `O(n)`；递归栈空间是 `O(h)`，`h` 为树高。

</ExerciseSolution>

下一篇：[数据结构入门地图 →](/algorithm/02-linear-structures/data-structure-guide)
