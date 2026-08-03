---
title: 图的 BFS
description: 用地铁站扩散理解广度优先搜索与无权最短路
comments: true
commentId: algorithm-bfs-traversal
---

# 图的 BFS：一圈一圈向外探索

::: tip 配套深化阅读
先理解本文的地铁扩散，再阅读 [labuladong：图的 DFS/BFS 遍历](https://labuladong.online/zh/algo/data-structure-basic/graph-traverse-basic/)和[BFS 解题框架](https://labuladong.online/zh/algo/essential-technique/bfs-framework/)。
:::

广度优先搜索像从一个地铁站向外扩散：

- 第 0 层是起点；
- 第 1 层是乘一站可以到达的位置；
- 第 2 层是乘两站可以到达的位置；
- 第一次到达某个站时，所用边数最少。

## 示例图

```text
A —— B —— D
|    |
C —— E
```

从 `A` 开始：

```text
第 0 层：A
第 1 层：B, C
第 2 层：D, E
```

## 为什么使用队列

队列先进先出，保证先发现的较近节点先被处理，后发现的较远节点排在后面。

## 伪代码

```text
把起点加入队列
把起点标记为已访问

当队列不为空：
    取出队头节点
    遍历它的所有邻居：
        如果邻居没有访问过：
            标记为已访问
            记录距离
            加入队尾
```

## 五语言实现：计算无权图距离

图用邻接表表示，节点编号为 `0～n-1`。

::: code-group

```java [Java]
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.List;
import java.util.Queue;

public static int[] bfsDistances(List<List<Integer>> graph, int start) {
    int[] distance = new int[graph.size()];
    Arrays.fill(distance, -1);

    Queue<Integer> queue = new ArrayDeque<>();
    queue.offer(start);
    distance[start] = 0;

    while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int neighbor : graph.get(node)) {
            if (distance[neighbor] == -1) {
                distance[neighbor] = distance[node] + 1;
                queue.offer(neighbor);
            }
        }
    }
    return distance;
}
```

```python [Python]
from collections import deque


def bfs_distances(graph: list[list[int]], start: int) -> list[int]:
    distance = [-1] * len(graph)
    queue = deque([start])
    distance[start] = 0

    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if distance[neighbor] == -1:
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)

    return distance
```

```javascript [JavaScript]
function bfsDistances(graph, start) {
  const distance = Array(graph.length).fill(-1)
  const queue = [start]
  let head = 0
  distance[start] = 0

  while (head < queue.length) {
    const node = queue[head]
    head += 1

    for (const neighbor of graph[node]) {
      if (distance[neighbor] === -1) {
        distance[neighbor] = distance[node] + 1
        queue.push(neighbor)
      }
    }
  }
  return distance
}
```

```cpp [C++]
#include <queue>
#include <vector>

std::vector<int> bfsDistances(
    const std::vector<std::vector<int>>& graph,
    int start
) {
    std::vector<int> distance(graph.size(), -1);
    std::queue<int> queue;
    queue.push(start);
    distance[start] = 0;

    while (!queue.empty()) {
        int node = queue.front();
        queue.pop();

        for (int neighbor : graph[node]) {
            if (distance[neighbor] == -1) {
                distance[neighbor] = distance[node] + 1;
                queue.push(neighbor);
            }
        }
    }
    return distance;
}
```

```go [Go]
func bfsDistances(graph [][]int, start int) []int {
	distance := make([]int, len(graph))
	for index := range distance {
		distance[index] = -1
	}

	queue := []int{start}
	head := 0
	distance[start] = 0

	for head < len(queue) {
		node := queue[head]
		head++

		for _, neighbor := range graph[node] {
			if distance[neighbor] == -1 {
				distance[neighbor] = distance[node] + 1
				queue = append(queue, neighbor)
			}
		}
	}
	return distance
}
```

:::

## 为什么加入队列时就标记

如果等到出队时才标记，同一个节点可能被多个邻居重复加入队列。正确做法是在首次发现并入队时立即标记。

## 复杂度

使用邻接表：

- 每个节点入队一次；
- 每条边被查看有限次；
- 时间复杂度 `O(V + E)`；
- 距离数组和队列空间 `O(V)`。

## BFS 不适合什么

普通 BFS 求的是边数最少。如果边有不同权重：

- 权重只有 `0` 和 `1`：考虑 0-1 BFS；
- 权重非负：考虑 Dijkstra；
- 存在负权：考虑 Bellman–Ford 等算法。

## 练习

### 1. 二叉树层序遍历

<ExerciseSolution>

根节点入队，每轮先记录队列当前长度，只处理这一批节点并把它们的孩子加入队尾。这样每批正好是一层。完整推演见[二叉树遍历练习](/algorithm/06-trees-heaps/binary-tree-traversal#_2-使用队列实现层序遍历)。时间 `O(n)`，空间 `O(w)`。

</ExerciseSolution>

### 2. 岛屿数量

<ExerciseSolution>

逐格扫描网格。发现一块尚未访问的陆地时，岛屿数加一，并从它开始 BFS，把上下左右相连的全部陆地标记为已访问。之后扫描到这些格子就不会重复计数。

```text
count = 0
遍历每个格子：
    如果是未访问陆地：
        count++
        BFS 标记整个连通块
```

`m × n` 网格中每格最多入队一次，时间 `O(mn)`、空间最坏 `O(mn)`。可以原地把陆地改成水，也可以使用独立 `visited`。

</ExerciseSolution>

### 3. 网格最短路

<ExerciseSolution>

把每个可走格子看作节点，上下左右移动看作权重相同的边。起点入队并令距离为 `0`；首次到达邻居时设置 `distance + 1`。BFS 的逐层性质保证第一次到达终点就是最少步数。

时间 `O(mn)`、空间 `O(mn)`。若不同移动代价不相同，普通 BFS 不再适用，应考虑 Dijkstra 或 0-1 BFS。

</ExerciseSolution>

### 4. 多源 BFS

<ExerciseSolution>

把所有起点同时以距离 `0` 入队，再进行一次普通 BFS。可以想象多圈水波同时扩散，每个格子第一次被触达时，就是离它最近的源点距离。

典型问题包括“每个房间到最近出口”“腐烂橘子”和“每个格子到最近的 0”。不要从每个源点分别做 BFS，那通常会重复扫描整个图。

</ExerciseSolution>

### 5. 单词接龙

<ExerciseSolution>

单词是节点；一次只改变一个字母且新单词在词典中，就存在一条边。从起始词 BFS，第一次到达目标词时的层数就是最短转换长度。

生成邻居时逐位置尝试 `a..z`，命中词典后立即从未访问集合移除，防止重复入队。设单词数 `N`、长度 `L`、字母表大小 26，朴素时间约 `O(N · L · 26)`，空间 `O(N)`。

</ExerciseSolution>

### 6. 0-1 BFS

<ExerciseSolution>

当所有边权只可能是 `0` 或 `1`，使用双端队列：松弛一条权重为 `0` 的边后把邻居放队首，权重为 `1` 则放队尾。队首始终优先处理当前距离更小的节点。

```text
deque = [start]
当 deque 不空：
    node = 从队首取出
    遍历边 (node, next, weight)：
        如果 distance[node] + weight 更小：
            更新 distance[next]
            weight == 0 放队首，否则放队尾
```

时间 `O(V+E)`、空间 `O(V)`。边权出现 `2` 或更大时，应使用 Dijkstra，而不能继续套用 0-1 BFS。

</ExerciseSolution>

### 五语言迁移提示

<ExerciseSolution title="展开 BFS 练习的五语言实现要点" eyebrow="CODE">

六道题都复用本文已经给出的五语言 BFS 主循环。差别只在于“邻居如何生成”和“距离如何更新”：

- Java 使用 `ArrayDeque`，0-1 BFS 使用 `addFirst/addLast`；
- Python 使用 `collections.deque`，对应 `appendleft/append`；
- JavaScript 使用数组加头下标处理普通 BFS，0-1 BFS 建议实现真正的双端队列，避免频繁 `shift/unshift`；
- C++ 使用 `std::queue`，0-1 BFS 使用 `std::deque`；
- Go 普通 BFS 使用切片加头下标，0-1 BFS 可用 `container/list` 或自建环形双端队列。

岛屿和网格题把坐标编码为二元组，单词接龙把字符串作为节点，多源 BFS 只是在初始化时一次加入多个起点；“入队即标记”的原则完全相同。

</ExerciseSolution>
