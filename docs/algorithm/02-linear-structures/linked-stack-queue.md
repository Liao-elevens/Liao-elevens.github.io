---
title: 链表、栈与队列
description: 用火车车厢、叠盘子和排队理解三种基础结构
---

# 链表、栈与队列

::: tip 配套深化阅读
本文先建立生活直觉，再配合 [链表基本原理](https://labuladong.online/zh/algo/data-structure-basic/linkedlist-basic/)和[队列/栈基本原理](https://labuladong.online/zh/algo/data-structure-basic/queue-stack-basic/)学习底层实现。
:::

这三种结构强调的不是元素是什么，而是元素怎样连接、按什么顺序被访问。

## 三个生活类比

| 结构 | 类比 | 核心规则 |
| --- | --- | --- |
| 链表 | 火车车厢 | 每节车厢知道下一节在哪里 |
| 栈 | 一摞盘子 | 最后放上去的最先拿走 |
| 队列 | 排队买票 | 最先到的人最先接受服务 |

## 链表

数组中的元素通常连续存放，链表节点可以分散在不同位置，通过“下一节点”连接：

```text
[值 7 | next] → [值 12 | next] → [值 3 | null]
```

| 操作 | 单链表典型复杂度 |
| --- | ---: |
| 访问第 `i` 个节点 | `O(n)` |
| 已知节点后插入 | `O(1)` |
| 已知前驱时删除 | `O(1)` |
| 查找某个值 | `O(n)` |

::: warning
“链表插入是 O(1)”有前提：已经知道插入位置对应的节点。如果先从头寻找位置，整体仍然是 `O(n)`。
:::

## 栈

栈只允许在同一端加入和移除：

```text
入栈 A → [A]
入栈 B → [A, B]
入栈 C → [A, B, C]
出栈   → 得到 C
```

常见用途：

- 函数调用栈；
- 括号匹配；
- 撤销操作；
- 表达式求值；
- DFS 的迭代实现；
- 单调栈。

## 队列

队列从尾部加入，从头部移除：

```text
入队 A → A
入队 B → A, B
入队 C → A, B, C
出队   → 得到 A
```

常见用途：

- BFS；
- 任务调度；
- 消息缓冲；
- 树的层序遍历；
- 生产者和消费者模型。

## 五语言容器选择

| 结构 | Java | Python | JavaScript | C++ | Go |
| --- | --- | --- | --- | --- | --- |
| 链表节点 | 自定义类 | 自定义类 | 自定义类 | 自定义结构体 | 自定义结构体 |
| 栈 | `ArrayDeque` | `list` | `Array` | `std::stack` | 切片 `[]T` |
| 队列 | `ArrayDeque` | `collections.deque` | 数组配合头下标 | `std::queue` | 切片配合头下标 |
| 双端队列 | `ArrayDeque` | `deque` | 通常自定义或使用库 | `std::deque` | 通常自定义或使用库 |

### 为什么 JavaScript 队列不推荐频繁 `shift`

数组头部删除可能需要移动后面大量元素。简单算法题中可以用“头下标”避免移动：

```javascript
const queue = []
let head = 0

queue.push('A')
queue.push('B')

const first = queue[head]
head += 1
```

## 自测

1. 浏览器的“后退”按钮更像栈还是队列？
2. 打印任务按照提交顺序处理，更像什么结构？
3. 为什么链表不能像数组一样根据下标直接定位？
4. BFS 为什么通常使用队列？

下一篇：[排序与查找总览 →](/algorithm/03-sorting-searching/)
