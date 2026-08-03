---
title: 数据结构入门地图
description: 用储物柜、火车、叠盘子、队伍和关系网理解常见数据结构
comments: true
commentId: algorithm-data-structure-guide
---

# 数据结构入门地图

算法是处理数据的步骤，数据结构是数据的摆放方式。相同步骤配上不同的数据结构，效率可能完全不同。

## 先看一个生活问题

要保存全班同学的信息：

- 按座位号找人：像数组，位置明确；
- 按学号找人：像哈希表，使用唯一 key；
- 按到达顺序办理业务：像队列；
- 撤销最近一次操作：像栈；
- 表示班级和小组层级：像树；
- 表示同学之间任意关系：像图。

没有“永远最好”的结构，只有“当前操作更合适”的结构。

## 八种常见结构

| 数据结构 | 生活类比 | 最擅长的事 | 主要代价 | 开始学习 |
| --- | --- | --- | --- | --- |
| 数组 | 一排有编号的储物柜 | 按下标快速访问 | 中间插入删除要移动 | [数组](/algorithm/02-linear-structures/arrays) |
| 链表 | 用挂钩连接的火车车厢 | 已知节点时快速连接和拆开 | 不能按下标直接跳转 | [链表、栈与队列](/algorithm/02-linear-structures/linked-stack-queue) |
| 栈 | 一摞盘子 | 处理最近加入的数据 | 只能重点访问栈顶 | [链表、栈与队列](/algorithm/02-linear-structures/linked-stack-queue#栈) |
| 队列 | 排队买票 | 按到达顺序处理 | 只能从队头取出 | [链表、栈与队列](/algorithm/02-linear-structures/linked-stack-queue#队列) |
| 哈希表 | 编号储物柜 | 根据 key 快速查找 | 额外空间、通常无序 | [哈希表与集合](/algorithm/02-linear-structures/hash-table) |
| 树 | 公司组织架构 | 表示层级、递归拆分 | 需要理解遍历顺序 | [树与堆](/algorithm/06-trees-heaps/) |
| 堆 | 始终把最高优先级放前面 | 快速取得最大或最小值 | 不支持任意元素有序访问 | [树与堆](/algorithm/06-trees-heaps/) |
| 图 | 地图和社交网络 | 表示任意连接关系 | 需要处理环和重复访问 | [图论](/algorithm/07-graphs/) |

## 最重要的底层视角

初学阶段可以把常见结构先归纳为两类基础存储：

```text
数组：元素通常按连续位置组织，可以根据下标快速定位
链表：节点通过连接关系组织，可以灵活改变连接
```

栈和队列描述的是“允许怎样访问”，底层可以使用数组或链表。哈希表常用数组保存桶，冲突时还可能结合链表或其他结构。树和图则把“一个后继”扩展成多个连接。

这也是 [labuladong 的框架思维](https://labuladong.online/zh/algo/essential-technique/algorithm-summary/)强调的基础视角：不要把每个名词看成完全无关的新世界，要寻找它们共同的存储和遍历方式。

## 用操作选择结构

| 题目真正需要的操作 | 优先考虑 | 原因 |
| --- | --- | --- |
| 根据整数下标反复访问 | 数组 | 随机访问通常是 `O(1)` |
| 统计次数、去重、判断存在 | 哈希表或集合 | 平均查询通常是 `O(1)` |
| 最近加入的最先处理 | 栈 | 后进先出 |
| 最早加入的最先处理 | 队列 | 先进先出 |
| 始终取得最小值或最大值 | 堆 | 读取堆顶 `O(1)`，调整通常 `O(log n)` |
| 表示父子层级 | 树 | 每个子问题仍是一棵树 |
| 表示任意连接和路径 | 图 | 边可以连接任意节点 |
| 已知节点后频繁插入删除 | 链表 | 改连接通常是 `O(1)` |

## 为什么复杂度必须和操作一起说

不能只说“数组快”或“链表快”：

| 操作 | 数组 | 单链表 |
| --- | ---: | ---: |
| 访问第 `i` 个元素 | `O(1)` | `O(n)` |
| 查找某个值 | `O(n)` | `O(n)` |
| 已知下标，在中间插入 | `O(n)` | 仍要先找到位置，通常 `O(n)` |
| 已知节点，在其后插入 | 不适用 | `O(1)` |
| 末尾追加 | 动态数组摊还 `O(1)` | 有尾指针时 `O(1)` |

“链表插入是 `O(1)`”必须带上“已经拿到对应节点”这个前提。

## 五语言容器地图

| 抽象结构 | Java | Python | JavaScript | C++ | Go |
| --- | --- | --- | --- | --- | --- |
| 动态数组 | `ArrayList<T>` | `list` | `Array` | `std::vector<T>` | `[]T` |
| 哈希表 | `HashMap<K,V>` | `dict` | `Map` | `std::unordered_map` | `map[K]V` |
| 集合 | `HashSet<T>` | `set` | `Set` | `std::unordered_set` | `map[T]bool` |
| 栈 | `ArrayDeque<T>` | `list` | `Array` | `std::stack<T>` | `[]T` |
| 队列 | `ArrayDeque<T>` | `deque` | 数组加头下标 | `std::queue<T>` | 切片加头下标 |
| 优先队列 | `PriorityQueue<T>` | `heapq` | 通常使用库或自定义 | `std::priority_queue` | `container/heap` |
| 链表/树节点 | 自定义类 | 自定义类 | 自定义类 | 自定义结构体 | 自定义结构体 |

标准容器只是实现工具。学习算法时仍要知道它提供什么操作、每个操作的复杂度和是否会修改原数据。

## 一道题怎样组合多种结构

问题：从起点开始，找到无权图中到每个地点最少经过几条边。

需要：

1. 图的邻接表保存连接关系；
2. 队列保证按距离从近到远处理；
3. 数组保存每个节点的距离；
4. 距离数组同时充当“是否访问过”的标记；
5. BFS 决定处理步骤。

这说明真实算法题往往不是“只考队列”，而是把多个结构组合成一个过程。可以在[图的 BFS](/algorithm/07-graphs/bfs-traversal)中查看五语言实现。

## 推荐学习顺序

1. [数组：理解下标、遍历和原地修改](/algorithm/02-linear-structures/arrays)
2. [哈希表：理解 key、计数和去重](/algorithm/02-linear-structures/hash-table)
3. [链表、栈与队列：理解连接和访问顺序](/algorithm/02-linear-structures/linked-stack-queue)
4. [二叉树遍历：理解递归结构](/algorithm/06-trees-heaps/binary-tree-traversal)
5. [图的 BFS：理解任意连接和访问标记](/algorithm/07-graphs/bfs-traversal)
6. [高级数据结构：按实际题目继续扩展](/algorithm/12-advanced-structures/)

## labuladong 配套阅读

- [数据结构基础导读](https://labuladong.online/zh/algo/intro/data-structure-basic/)
- [动态数组基本原理](https://labuladong.online/zh/algo/data-structure-basic/array-basic/)
- [链表基本原理](https://labuladong.online/zh/algo/data-structure-basic/linkedlist-basic/)
- [队列和栈基本原理](https://labuladong.online/zh/algo/data-structure-basic/queue-stack-basic/)
- [哈希表核心原理](https://labuladong.online/zh/algo/data-structure-basic/hashmap-basic/)
- [二叉树基础](https://labuladong.online/zh/algo/data-structure-basic/binary-tree-basic/)
- [图结构术语](https://labuladong.online/zh/algo/data-structure-basic/graph-terminology/)

建议先读本站的通俗解释并完成手工模拟，再把 labuladong 文章作为深化教材。遇到暂时看不懂的实现细节，先记录问题，不必阻塞主线。

## 自测

### 1. 浏览器后退历史为什么适合栈？

<ExerciseSolution>

因为最后访问的页面应该最先被返回，这正是“后进先出”。访问 A、B、C 后，栈顶是 C；点击后退先弹出 C，回到 B，再弹出 B，回到 A。核心操作是栈顶的压入和弹出，都是 `O(1)`。

</ExerciseSolution>

### 2. BFS 为什么使用队列而不是栈？

<ExerciseSolution>

队列保证“先发现的节点先处理”，因此会先处理距离起点为 1 的所有节点，再处理距离为 2 的节点，形成逐层扩散。栈会优先沿一条路走到底，那是 DFS 的顺序，不能直接保证无权图中的最短边数。

</ExerciseSolution>

### 3. 统计单词次数为什么适合哈希表？

<ExerciseSolution>

我们需要建立“单词 → 出现次数”的映射。每读到一个单词，就通过它快速找到原计数并加一。哈希表平均查询和更新都是 `O(1)`，遍历 `n` 个单词的总时间平均为 `O(n)`。

</ExerciseSolution>

### 4. 为什么堆适合反复取得最小任务？

<ExerciseSolution>

最小堆把当前最小值保持在堆顶：查看最小值是 `O(1)`，取出后恢复结构是 `O(log n)`。如果每取一次都完整排序，需要反复付出 `O(n log n)`；如果只维护一个普通无序数组，每次找最小值又需要 `O(n)`。

</ExerciseSolution>

### 5. 树和图有什么联系？图遍历为什么需要访问标记？

<ExerciseSolution>

树是没有环且连通的一类特殊图。树从父节点向子节点遍历时通常不会回到祖先；一般图可能存在 `A → B → C → A` 的环。如果没有 `visited` 集合，遍历会重复进入已经处理过的节点，甚至永远循环。

</ExerciseSolution>

下一篇：[数组：一排带编号的储物柜 →](./arrays)
