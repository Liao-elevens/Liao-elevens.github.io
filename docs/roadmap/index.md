---
title: 从零学习算法与数据结构
description: 按知识依赖组织、可点击进入每一课的完整零基础路线
---

# 从零学习算法与数据结构

这是一条**学习顺序**，不是时间表。你不需要规定一天学几小时，只需要遵守一条规则：

> 后一阶段依赖前一阶段；达到本阶段的“过关标准”后，再点击进入下一阶段。

本站负责用生活例子、手工模拟和五语言代码讲清知识；[labuladong 的算法笔记](https://labuladong.online/zh/algo/home/)用于深化框架思维和补充练习。我们只做原创讲解与学习导航，不复制第三方教程正文。

::: tip 第一次来，从这里开始
依次打开：[算法到底是什么](/algorithm/00-foundations/zero-to-algorithms) → [五语言算法基础](/algorithm/00-foundations/four-language-basics) → [数据结构入门地图](/algorithm/02-linear-structures/data-structure-guide)。
:::

## 路线总览

| 阶段 | 你要解决的问题 | 点击进入 |
| ---: | --- | --- |
| 0 | 程序怎样表示“步骤” | [算法零基础第一课](/algorithm/00-foundations/zero-to-algorithms) |
| 1 | 同一算法怎样用五种语言表达 | [五语言算法基础](/algorithm/00-foundations/four-language-basics) · [Go 入门](/algorithm/00-foundations/go-basics) |
| 2 | 数据应该怎样组织 | [数据结构入门地图](/algorithm/02-linear-structures/data-structure-guide) |
| 3 | 怎样判断一个解法是否足够快 | [认识 Big O](/algorithm/01-complexity/big-o) |
| 4 | 数组题有哪些稳定套路 | [排序与查找](/algorithm/03-sorting-searching/) · [高频技巧](/algorithm/04-techniques/) |
| 5 | 递归、树和搜索为什么是一套思想 | [递归与回溯](/algorithm/05-recursion-search/recursion-backtracking) · [二叉树遍历](/algorithm/06-trees-heaps/binary-tree-traversal) |
| 6 | 怎样遍历任意连接关系 | [图的 BFS](/algorithm/07-graphs/bfs-traversal) |
| 7 | 怎样处理重复子问题和局部选择 | [动态规划入门](/algorithm/10-dynamic-programming/dp-fundamentals) · [贪心](/algorithm/09-greedy/) |
| 8 | 怎样继续扩展完整知识体系 | [知识库总览](/algorithm/) · [完整度矩阵](/coverage) |

## 阶段 0：先学会读懂算法

### 本站必学

1. [算法到底是什么](/algorithm/00-foundations/zero-to-algorithms)
2. [从读题到调试](/algorithm/00-foundations/problem-solving-guide)

你暂时只需要理解变量、条件、循环、函数、数组、字符串和下标。不要因为 Java 类、C++ 指针或 Go 接口还不熟，就停止学习算法。

### 配套深化

- [labuladong：学习数据结构和算法的框架思维](https://labuladong.online/zh/algo/essential-technique/algorithm-summary/)
- [labuladong：算法刷题的重点和坑](https://labuladong.online/zh/algo/intro/how-to-learn-algorithms/)

### 过关标准

- 能把一道题复述成输入、输出和限制；
- 能手工遍历数组并找出最大值；
- 能解释循环为什么会结束；
- 代码出错时会使用最小例子逐步检查变量。

## 阶段 1：五语言只学一套思想

### 本站必学

1. [五语言算法基础](/algorithm/00-foundations/four-language-basics)
2. [Go 算法语法入门](/algorithm/00-foundations/go-basics)

每篇算法文章的代码标签页都按同一顺序提供：

```text
Java → Python → JavaScript → C++ → Go
```

先读伪代码，再独立写最熟悉的一种语言，最后切换其他标签比较容器、类型和边界。不要同时背五份代码。

### 过关标准

- 能用至少一种语言独立实现数组求和、最大值和计数；
- 能看懂其余四种语言在做同样的动作；
- 能说出切片、数组、动态数组和哈希表在五种语言里的常见名称。

## 阶段 2：建立数据结构地图

数据结构解决的是“数据怎样放”，算法解决的是“数据怎样处理”。先学习：

1. [数据结构入门地图](/algorithm/02-linear-structures/data-structure-guide)
2. [数组](/algorithm/02-linear-structures/arrays)
3. [链表、栈与队列](/algorithm/02-linear-structures/linked-stack-queue)
4. [哈希表与集合](/algorithm/02-linear-structures/hash-table)
5. [树与堆总览](/algorithm/06-trees-heaps/)
6. [图论总览](/algorithm/07-graphs/)

### 推荐理解顺序

```text
数组 / 链表
    ↓
栈 / 队列 / 哈希表
    ↓
树 / 堆
    ↓
图
```

数组和链表是最基础的两类存储方式，后面的结构经常由它们组合或演化而来。

### 配套深化

- [labuladong：数据结构基础导读](https://labuladong.online/zh/algo/intro/data-structure-basic/)
- [数组基本原理](https://labuladong.online/zh/algo/data-structure-basic/array-basic/)
- [链表基本原理](https://labuladong.online/zh/algo/data-structure-basic/linkedlist-basic/)
- [队列和栈基本原理](https://labuladong.online/zh/algo/data-structure-basic/queue-stack-basic/)
- [哈希表核心原理](https://labuladong.online/zh/algo/data-structure-basic/hashmap-basic/)

### 过关标准

- 能根据“按下标访问、快速判断存在、先进先出、后进先出”选择结构；
- 能画出数组、链表、栈和队列；
- 能解释为什么链表不能按下标 `O(1)` 访问；
- 能解释哈希表为什么通常快，但不保证天然有序。

## 阶段 3：学会评价解法

学习[认识 Big O](/algorithm/01-complexity/big-o)，重点理解：

- `O(1)`、`O(log n)`、`O(n)`、`O(n log n)`、`O(n²)`；
- 时间和空间为什么需要分别分析；
- 两层循环不一定总是 `O(n²)`；
- 标准库方法也有复杂度，不是“免费操作”。

配套阅读：[labuladong：时间空间复杂度入门](https://labuladong.online/zh/algo/intro/complexity-basic/)。

### 过关标准

给出一段循环代码，你能指出输入规模是什么、主要操作执行多少次，以及是否额外创建了随输入增长的容器。

## 阶段 4：掌握数组题的第一批框架

按照这个顺序学习：

1. [基础排序](/algorithm/03-sorting-searching/basic-sorting)
2. [二分查找](/algorithm/03-sorting-searching/binary-search)
3. [前缀和](/algorithm/04-techniques/prefix-sum)
4. [双指针与滑动窗口](/algorithm/04-techniques/two-pointers-window)

### 题目信号

| 看到的信号 | 先想到 |
| --- | --- |
| 有序数组、单调范围、找临界值 | 二分查找 |
| 两端向中间、成对关系 | 左右双指针 |
| 同方向移动、原地删除 | 快慢指针 |
| 连续子数组或子字符串 | 滑动窗口、前缀和 |
| 多次查询静态区间和 | 前缀和 |

### 配套深化

- [labuladong：数组双指针](https://labuladong.online/zh/algo/essential-technique/array-two-pointers-summary/)
- [labuladong：滑动窗口框架](https://labuladong.online/zh/algo/essential-technique/sliding-window-framework/)
- [labuladong：二分查找框架](https://labuladong.online/zh/algo/essential-technique/binary-search-framework/)
- [labuladong：前缀和](https://labuladong.online/zh/algo/data-structure/prefix-sum/)

### 过关标准

- 不看答案写出标准二分查找；
- 能说明双指针为什么不会退回；
- 能解释前缀和为什么把多次查询从 `O(n)` 降为 `O(1)`；
- 能判断滑动窗口是否要求窗口具有可维护的单调条件。

## 阶段 5：从递归进入树和回溯

1. [递归与回溯入门](/algorithm/05-recursion-search/recursion-backtracking)
2. [二叉树遍历](/algorithm/06-trees-heaps/binary-tree-traversal)

先把递归理解为“函数处理一个更小的同类问题”，再学习前序、中序、后序和层序遍历，最后进入排列、组合、子集。

### 配套深化

- [labuladong：理解递归](https://labuladong.online/zh/algo/essential-technique/understand-recursion/)
- [labuladong：二叉树核心纲领](https://labuladong.online/zh/algo/essential-technique/binary-tree-summary/)
- [labuladong：回溯算法框架](https://labuladong.online/zh/algo/essential-technique/backtrack-framework/)

### 过关标准

- 能画出递归调用树；
- 能写出二叉树前序、后序和层序遍历；
- 能解释回溯中的“选择—递归—撤销选择”；
- 保存答案时知道为什么需要复制当前路径。

## 阶段 6：从树扩展到图

学习[图的 BFS](/algorithm/07-graphs/bfs-traversal)，再回到[图论总览](/algorithm/07-graphs/)了解 DFS、拓扑排序、最短路、最小生成树和并查集。

配套阅读：

- [图结构术语](https://labuladong.online/zh/algo/data-structure-basic/graph-terminology/)
- [图的通用实现](https://labuladong.online/zh/algo/data-structure-basic/graph-basic/)
- [图的 DFS/BFS 遍历](https://labuladong.online/zh/algo/data-structure-basic/graph-traverse-basic/)
- [BFS 解题框架](https://labuladong.online/zh/algo/essential-technique/bfs-framework/)

### 过关标准

- 能用邻接表表示图；
- 知道为什么图遍历需要访问标记；
- 能区分 DFS 的深度探索和 BFS 的逐层扩展；
- 能用 BFS 求无权图的最少边数。

## 阶段 7：动态规划与贪心

先学[动态规划入门](/algorithm/10-dynamic-programming/dp-fundamentals)，再阅读[贪心算法](/algorithm/09-greedy/)。

动态规划的固定检查顺序：

```text
状态是什么
→ 有哪些选择
→ 状态怎样转移
→ 初始状态是什么
→ 按什么顺序计算
```

配套阅读：[labuladong：动态规划框架](https://labuladong.online/zh/algo/essential-technique/dynamic-programming-framework/)与[贪心框架](https://labuladong.online/zh/algo/essential-technique/greedy/)。

### 过关标准

- 能从爬楼梯的暴力递归找到重复子问题；
- 能写出状态定义和转移方程；
- 能区分“尝试所有选择”的 DP 与“证明当前选择安全”的贪心；
- 不把每道题的状态转移方程当成独立口诀。

## 阶段 8：进入完整知识地图

完成主线后，再按目标选择分支：

| 目标 | 推荐入口 |
| --- | --- |
| 面试与常见题型 | [字符串](/algorithm/08-strings/) · [动态规划](/algorithm/10-dynamic-programming/) · [高级数据结构](/algorithm/12-advanced-structures/) |
| 前端与工程实践 | [工程与海量数据算法](/algorithm/15-engineering/) |
| 竞赛 | [数学与数论](/algorithm/11-math/) · [计算几何](/algorithm/13-computational-geometry/) |
| 理论深入 | [算法理论](/algorithm/16-theory/) |
| labuladong 完整路线 | [169 节点路线图](https://labuladong.online/zh/roadmap/algo/) |

## 每一课都使用同一个学习闭环

| 步骤 | 必须回答的问题 |
| --- | --- |
| 生活实例 | 它在现实中像什么 |
| 手工模拟 | 最小数据怎样一步步变化 |
| 暴力方案 | 不考虑效率时最直观的方法是什么 |
| 找到瓶颈 | 哪一步重复最多 |
| 数据结构 | 数据怎样放，才能减少浪费 |
| 伪代码 | 不依赖语言的步骤是什么 |
| 五语言实现 | 五种语法怎样表达相同步骤 |
| 验证 | 空数据、单元素、重复值和极端值是否正确 |
| 复述 | 离开答案后能否自己讲清并重新写出 |

::: warning 不要这样学习
不要随机跳到回溯、动态规划或最短路；不要只收藏题解；不要同时背五份模板；不要以“看懂代码”代替手工模拟和独立重写。
:::
