---
title: 图的 BFS
description: 用地铁站扩散理解广度优先搜索与无权最短路
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

- 二叉树层序遍历；
- 岛屿数量；
- 网格最短路；
- 多源 BFS；
- 单词接龙；
- 0-1 BFS。
