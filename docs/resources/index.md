---
title: 第三方学习资源
description: 为算法零基础学习者筛选的动画、课程、文档、题库和五语言参考资料
---

# 第三方学习资源：少而精地搭配本站

外部资料越多，不代表学得越快。推荐把本站作为中文主笔记，再按需要选择一种辅助资源：

```text
本站通俗讲解
  + 一种动画工具建立直觉
  + 一种练习平台验证理解
  + 遇到语法问题再查官方文档
```

::: tip 选择规则
同一阶段不要同时追三门课程。先完整走通一个知识点，再用其他资料解决“没看懂的那一处”。
:::

## 最适合零基础的组合

| 用途 | 首选 | 为什么适合 | 使用方式 |
| --- | --- | --- | --- |
| 中文图解 | [Hello 算法](https://www.hello-algo.com/) | 动画丰富，提供多语言代码 | 在本站每个专题后看对应章节 |
| 动画观察 | [VisuAlgo](https://visualgo.net/zh) | 可以逐步播放数据结构和算法 | 自己输入一组很小的数据 |
| 中文百科 | [OI Wiki](https://oi-wiki.org/) | 覆盖范围非常广 | 入门后作为专题字典，不必从头读 |
| 入门练习 | [LeetCode Explore](https://leetcode.com/explore/learn/) | 按数据结构组织学习卡片 | 先做简单题，记录失败原因 |
| 框架教程 | [labuladong](https://labuladong.online/zh/algo/home/) | 题型框架清晰，支持多语言 | 按本站路线阅读对应章节 |
| 语言语法 | 五语言官方/权威文档 | 避免复制过时语法 | 只查询当前代码遇到的问题 |

## labuladong 怎样和本站搭配

本站先用生活实例解释概念，再提供五语言对照；labuladong 适合继续学习可复用的解题框架和同类练习。

推荐顺序：

1. 从本站的[完整学习路线](/roadmap/)进入当前知识点；
2. 手工模拟本站的小例子；
3. 阅读路线中对应的 labuladong 文章；
4. 关掉答案，用最熟悉的语言独立写出；
5. 回本站切换另外四种语言，比较容器和边界；
6. 最后完成同类练习，不直接随机刷题。

不要把第三方的完整题单当作第一课。labuladong 的[完整目录学习规划](https://labuladong.online/zh/algo/intro/beginner-learning-plan/)也建议先学习文章，再使用题单复习。

## 第一阶段：看懂动画与过程

### Hello 算法

[打开 Hello 算法](https://www.hello-algo.com/)

适合：

- 第一次接触数组、链表、栈、队列、哈希、树和图；
- 需要动画建立直觉；
- 希望对照 Java、Python、JavaScript、C++、Go。

推荐方式：

1. 先读本站同名专题；
2. 在 Hello 算法观看对应动画；
3. 暂停动画，预测下一步；
4. 回本站完成手工模拟和五语言比较。

### VisuAlgo

[打开 VisuAlgo 中文站](https://visualgo.net/zh)

适合：

- 比较排序算法；
- 观察链表、堆、二叉搜索树；
- 理解 BFS、DFS、最短路；
- 观察递归树和动态规划的重复子问题。

使用时不要只点击“播放”。先使用 4～8 个元素的小数据，暂停后说出：

- 当前高亮的数据是什么；
- 哪些数据已经确定；
- 下一步为什么这样移动；
- 哪个变量记录算法状态。

::: warning 手机端体验
复杂图算法需要较大显示区域。VisuAlgo 官方也建议在较大的屏幕上使用完整可视化功能。
:::

## 第二阶段：系统化补充

### OI Wiki

[打开 OI Wiki](https://oi-wiki.org/)

它覆盖语言基础、算法、数据结构、图论、字符串、数学和计算几何，适合：

- 查询某个专题还有哪些分支；
- 学完本站入门页后深入；
- 查找竞赛算法的定义和实现细节。

不建议零基础从目录第一页一路读到最后。OI Wiki 的深度跨度很大，把它当百科和进阶地图更合适。

### CP-Algorithms

[打开 CP-Algorithms](https://cp-algorithms.com/)

英文算法参考库，擅长：

- 数论；
- 图论；
- 字符串算法；
- 计算几何；
- 高级数据结构。

它通常使用 C++，更适合已经掌握基础算法、准备进阶或竞赛时查阅。

### Princeton Algorithms

[打开 Princeton Algorithms](https://algs4.cs.princeton.edu/home/)

普林斯顿《Algorithms, 4th Edition》的配套站点，包含讲义、Java 代码和测试数据。建议在学完数组、排序、栈队列、树和图的入门内容后使用。

### MIT OpenCourseWare 6.006

[打开 MIT 6.006（2020）](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)

免费公开的大学课程，包含课程视频、讲义、习题和测验。它要求基本 Python 与离散数学基础，不适合作为第一门编程课。

推荐进入时机：

- 能独立写数组遍历、哈希计数、基础递归；
- 能解释 `O(n)`、`O(n log n)`、`O(n²)`；
- 能看懂英文技术材料；
- 想系统学习正确性与复杂度分析。

## 练习与在线评测

| 平台 | 适合阶段 | 特点 | 注意 |
| --- | --- | --- | --- |
| [LeetCode Explore](https://leetcode.com/explore/learn/) | 入门到面试 | 学习卡片按专题组织 | 不要一开始追求题量 |
| [HackerRank Algorithms](https://www.hackerrank.com/domains/algorithms) | 入门 | 分类清楚，支持多语言 | 先完成简单分类 |
| [Codewars](https://www.codewars.com/) | 语法练习 | 小题较多、反馈快 | 题目质量和难度不完全均匀 |
| [洛谷题单广场](https://www.luogu.com.cn/training/list) | 中文竞赛路线 | 中文题目和题单丰富 | 注意输入输出和竞赛风格 |
| [AtCoder Beginners Selection](https://atcoder.jp/contests/abs) | 基础编程 | 小而经典的入门题组 | 题面以英文/日文为主 |

### 做题数量不是学习目标

每道题至少留下这些记录：

```text
题型信号：
最直观解法：
标准解法：
我卡在哪里：
本次边界错误：
第二天能否重写：
```

一道题真正复盘，通常比连续复制十道答案更有价值。

## 五语言参考文档

### Java

- [dev.java：学习 Java](https://dev.java/learn/)：Java 官方学习入口。
- [Java Collections Framework](https://dev.java/learn/api/collections-framework/)：集合框架教程。
- [Java API Documentation](https://docs.oracle.com/en/java/javase/21/docs/api/)：类和方法速查。

算法阶段优先熟悉：

```text
数组、String、ArrayList、HashMap、HashSet、
ArrayDeque、PriorityQueue、Arrays、Collections
```

### Python

- [Python 官方教程](https://docs.python.org/zh-cn/3/tutorial/)。
- [Python 数据结构](https://docs.python.org/zh-cn/3/tutorial/datastructures.html)。
- [Python 标准库](https://docs.python.org/zh-cn/3/library/)。

算法阶段优先熟悉：

```text
list、tuple、dict、set、str、
collections.deque、heapq、bisect、itertools
```

### JavaScript

- [MDN JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)。
- [MDN：索引集合](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections)。
- [MDN：键控集合](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Keyed_collections)。

算法阶段优先熟悉：

```text
Array、String、Map、Set、
sort 比较器、Number 安全整数、BigInt
```

JavaScript 没有内置通用队列和堆。题目规模大时，用 `shift()` 模拟队列可能有性能问题，需要学习头指针或自己实现队列。

### C++

- [cppreference 中文站](https://zh.cppreference.com/w/)。
- [C++ 容器库](https://zh.cppreference.com/w/cpp/container)。
- [C++ 算法库](https://zh.cppreference.com/w/cpp/algorithm)。

算法阶段优先熟悉：

```text
vector、string、unordered_map、unordered_set、
stack、queue、deque、priority_queue、set、map、algorithm
```

cppreference 是广泛使用的语言参考资料，不是线性课程。遇到具体容器或函数时查阅即可。

### Go

- [Go 官方教程](https://go.dev/doc/tutorial/)。
- [A Tour of Go](https://go.dev/tour/welcome/1)。
- [Go 标准库](https://pkg.go.dev/std)。
- [container/heap](https://pkg.go.dev/container/heap)：优先队列和堆接口。

算法阶段优先熟悉：

```text
切片、map、struct、指针、range、
sort、container/heap、递归函数、队列头下标
```

本站的[Go 算法语法入门](/algorithm/00-foundations/go-basics)只保留算法必需内容，适合先读；官方文档用于继续确认语言细节。

## 书籍怎么选

| 阶段 | 类型 | 使用建议 |
| --- | --- | --- |
| 零基础 | 图解型入门书 | 建立直觉，配合手工模拟 |
| 学完基础结构 | 数据结构与算法教材 | 系统补充定义、证明和练习 |
| 进阶 | CLRS 等理论教材 | 不必从第一页硬啃，按专题查阅 |
| 面试 | 题型与模式总结 | 必须配合独立做题，不能只背模板 |
| 竞赛 | 竞赛算法参考书 | 先有语言和基础算法能力 |

购买前先查看目录、样章、使用语言和目标读者。一本真正读完并做练习的书，比囤很多书更有效。

## 怎样判断第三方内容是否可靠

遇到博客、视频或答案时检查：

1. 是否明确输入限制；
2. 是否解释为什么正确；
3. 是否给出时间和空间复杂度；
4. 是否处理空输入、重复值、越界和溢出；
5. 使用的语言 API 是否仍然有效；
6. 代码是否能在最小反例上运行；
7. 是否只给模板，没有解释适用条件。

外部答案和评论都可能有错。对重要结论优先对照官方文档、课程资料或多个独立来源。

## 按本站路线搭配资源

| 本站阶段 | 建议外部辅助 | 暂时不用 |
| --- | --- | --- |
| 编程与数组 | Hello 算法、语言官方教程 | 高级竞赛百科 |
| 哈希、栈、队列 | VisuAlgo、简单练习 | 大量困难题 |
| 排序与二分 | 排序动画、LeetCode Explore | 背所有排序模板 |
| 树、图、递归 | VisuAlgo、Princeton | 网络流等高级图论 |
| DP、贪心 | Hello 算法、专题题单 | 只看答案不画状态 |
| 高级专题 | OI Wiki、CP-Algorithms、MIT | 同时铺开所有专题 |

## 资源维护说明

本页只链接公开网页，不复制第三方受版权保护的完整内容。链接可能改版、需要账户或在不同地区表现不同；发现失效时可以通过本站 GitHub 编辑入口更新。

最后核验日期：**2026-07-27**。

## 从这里继续

1. [算法到底是什么 →](/algorithm/00-foundations/zero-to-algorithms)
2. [从读题到调试 →](/algorithm/00-foundations/problem-solving-guide)
3. [完整学习路线 →](/roadmap/)
4. [知识库完成度矩阵 →](/coverage)
