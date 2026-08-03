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

#### 五语言实现

::: code-group

```java [Java]
static int islands(char[][] grid) {
    int answer = 0;
    for (int row = 0; row < grid.length; row++) for (int column = 0; column < grid[0].length; column++) {
        if (grid[row][column] != '1') continue;
        answer++; Queue<int[]> queue = new ArrayDeque<>(); queue.offer(new int[]{row, column}); grid[row][column] = '0';
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            for (int[] direction : new int[][]{{1,0},{-1,0},{0,1},{0,-1}}) {
                int nextRow = cell[0] + direction[0], nextColumn = cell[1] + direction[1];
                if (nextRow >= 0 && nextRow < grid.length && nextColumn >= 0 && nextColumn < grid[0].length && grid[nextRow][nextColumn] == '1') {
                    grid[nextRow][nextColumn] = '0'; queue.offer(new int[]{nextRow, nextColumn});
                }
            }
        }
    }
    return answer;
}
```

```python [Python]
from collections import deque
def islands(grid):
    answer = 0
    for row in range(len(grid)):
        for column in range(len(grid[0])):
            if grid[row][column] != "1": continue
            answer += 1; grid[row][column] = "0"; queue = deque([(row, column)])
            while queue:
                current_row, current_column = queue.popleft()
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = current_row + dr, current_column + dc
                    if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == "1":
                        grid[nr][nc] = "0"; queue.append((nr, nc))
    return answer
```

```javascript [JavaScript]
function islands(grid) {
  let answer = 0
  for (let row = 0; row < grid.length; row++) for (let column = 0; column < grid[0].length; column++) {
    if (grid[row][column] !== '1') continue
    answer++; grid[row][column] = '0'; const queue = [[row, column]]
    for (let head = 0; head < queue.length; head++) {
      const [currentRow, currentColumn] = queue[head]
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = currentRow + dr, nc = currentColumn + dc
        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] === '1') {
          grid[nr][nc] = '0'; queue.push([nr, nc])
        }
      }
    }
  }
  return answer
}
```

```cpp [C++]
int islands(std::vector<std::vector<char>>& grid) {
    int answer = 0, rows = grid.size(), columns = grid[0].size();
    for (int row = 0; row < rows; ++row) for (int column = 0; column < columns; ++column) {
        if (grid[row][column] != '1') continue;
        ++answer; grid[row][column] = '0'; std::queue<std::pair<int,int>> queue; queue.push({row, column});
        while (!queue.empty()) {
            auto [r, c] = queue.front(); queue.pop();
            for (auto [dr, dc] : std::vector<std::pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}}) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] == '1') {
                    grid[nr][nc] = '0'; queue.push({nr, nc});
                }
            }
        }
    }
    return answer;
}
```

```go [Go]
func islands(grid [][]byte) int {
	answer, directions := 0, [][2]int{{1,0},{-1,0},{0,1},{0,-1}}
	for row := range grid { for column := range grid[0] {
		if grid[row][column] != '1' { continue }
		answer++; grid[row][column] = '0'; queue := [][2]int{{row, column}}
		for len(queue) > 0 { cell := queue[0]; queue = queue[1:]
			for _, d := range directions { nr, nc := cell[0]+d[0], cell[1]+d[1]
				if nr >= 0 && nr < len(grid) && nc >= 0 && nc < len(grid[0]) && grid[nr][nc] == '1' { grid[nr][nc] = '0'; queue = append(queue, [2]int{nr,nc}) }
			}
		}
	} }
	return answer
}
```

:::

</ExerciseSolution>

### 3. 网格最短路

<ExerciseSolution>

把每个可走格子看作节点，上下左右移动看作权重相同的边。起点入队并令距离为 `0`；首次到达邻居时设置 `distance + 1`。BFS 的逐层性质保证第一次到达终点就是最少步数。

时间 `O(mn)`、空间 `O(mn)`。若不同移动代价不相同，普通 BFS 不再适用，应考虑 Dijkstra 或 0-1 BFS。

#### 五语言实现

::: code-group

```java [Java]
static int shortestPath(int[][] grid) {
    if (grid[0][0] == 1) return -1;
    Queue<int[]> queue = new ArrayDeque<>(); queue.offer(new int[]{0, 0, 0}); grid[0][0] = 1;
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        if (cell[0] == grid.length - 1 && cell[1] == grid[0].length - 1) return cell[2];
        for (int[] d : new int[][]{{1,0},{-1,0},{0,1},{0,-1}}) {
            int row = cell[0] + d[0], column = cell[1] + d[1];
            if (row >= 0 && row < grid.length && column >= 0 && column < grid[0].length && grid[row][column] == 0) {
                grid[row][column] = 1; queue.offer(new int[]{row, column, cell[2] + 1});
            }
        }
    }
    return -1;
}
```

```python [Python]
from collections import deque
def shortest_path(grid):
    if grid[0][0] == 1: return -1
    queue = deque([(0, 0, 0)]); grid[0][0] = 1
    while queue:
        row, column, distance = queue.popleft()
        if (row, column) == (len(grid)-1, len(grid[0])-1): return distance
        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
            nr, nc = row + dr, column + dc
            if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == 0:
                grid[nr][nc] = 1; queue.append((nr, nc, distance + 1))
    return -1
```

```javascript [JavaScript]
function shortestPath(grid) {
  if (grid[0][0] === 1) return -1
  const queue = [[0, 0, 0]]; grid[0][0] = 1
  for (let head = 0; head < queue.length; head++) {
    const [row, column, distance] = queue[head]
    if (row === grid.length - 1 && column === grid[0].length - 1) return distance
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr = row + dr, nc = column + dc
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] === 0) {
        grid[nr][nc] = 1; queue.push([nr, nc, distance + 1])
      }
    }
  }
  return -1
}
```

```cpp [C++]
int shortestPath(std::vector<std::vector<int>>& grid) {
    if (grid[0][0] == 1) return -1;
    std::queue<std::tuple<int,int,int>> queue; queue.push({0,0,0}); grid[0][0] = 1;
    while (!queue.empty()) {
        auto [row, column, distance] = queue.front(); queue.pop();
        if (row == static_cast<int>(grid.size())-1 && column == static_cast<int>(grid[0].size())-1) return distance;
        for (auto [dr, dc] : std::vector<std::pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}}) {
            int nr=row+dr,nc=column+dc;
            if(nr>=0&&nr<(int)grid.size()&&nc>=0&&nc<(int)grid[0].size()&&grid[nr][nc]==0){grid[nr][nc]=1;queue.push({nr,nc,distance+1});}
        }
    }
    return -1;
}
```

```go [Go]
func shortestPath(grid [][]int) int {
	if grid[0][0] == 1 { return -1 }
	queue := [][3]int{{0,0,0}}; grid[0][0] = 1
	for len(queue) > 0 { cell := queue[0]; queue = queue[1:]
		if cell[0] == len(grid)-1 && cell[1] == len(grid[0])-1 { return cell[2] }
		for _, d := range [][2]int{{1,0},{-1,0},{0,1},{0,-1}} { nr,nc:=cell[0]+d[0],cell[1]+d[1]
			if nr>=0&&nr<len(grid)&&nc>=0&&nc<len(grid[0])&&grid[nr][nc]==0 { grid[nr][nc]=1; queue=append(queue,[3]int{nr,nc,cell[2]+1}) }
		}
	}
	return -1
}
```

:::

</ExerciseSolution>

### 4. 多源 BFS

<ExerciseSolution>

把所有起点同时以距离 `0` 入队，再进行一次普通 BFS。可以想象多圈水波同时扩散，每个格子第一次被触达时，就是离它最近的源点距离。

典型问题包括“每个房间到最近出口”“腐烂橘子”和“每个格子到最近的 0”。不要从每个源点分别做 BFS，那通常会重复扫描整个图。

#### 五语言实现

::: code-group

```java [Java]
static int[][] nearestSource(int[][] grid) {
    Queue<int[]> queue = new ArrayDeque<>();
    for (int row=0;row<grid.length;row++) for(int column=0;column<grid[0].length;column++) if(grid[row][column]==1) queue.offer(new int[]{row,column}); else grid[row][column]=-1;
    while(!queue.isEmpty()){int[] cell=queue.poll();for(int[] d:new int[][]{{1,0},{-1,0},{0,1},{0,-1}}){int row=cell[0]+d[0],column=cell[1]+d[1];if(row>=0&&row<grid.length&&column>=0&&column<grid[0].length&&grid[row][column]==-1){grid[row][column]=grid[cell[0]][cell[1]]+1;queue.offer(new int[]{row,column});}}}
    return grid;
}
```

```python [Python]
from collections import deque
def nearest_source(grid):
    queue = deque()
    for row in range(len(grid)):
        for column in range(len(grid[0])):
            if grid[row][column] == 1: grid[row][column] = 0; queue.append((row,column))
            else: grid[row][column] = -1
    while queue:
        row,column=queue.popleft()
        for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):
            nr,nc=row+dr,column+dc
            if 0<=nr<len(grid) and 0<=nc<len(grid[0]) and grid[nr][nc]==-1:
                grid[nr][nc]=grid[row][column]+1;queue.append((nr,nc))
    return grid
```

```javascript [JavaScript]
function nearestSource(grid){const queue=[];for(let r=0;r<grid.length;r++)for(let c=0;c<grid[0].length;c++){if(grid[r][c]===1){grid[r][c]=0;queue.push([r,c])}else grid[r][c]=-1}for(let h=0;h<queue.length;h++){const[r,c]=queue[h];for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1]]){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<grid.length&&nc>=0&&nc<grid[0].length&&grid[nr][nc]===-1){grid[nr][nc]=grid[r][c]+1;queue.push([nr,nc])}}}return grid}
```

```cpp [C++]
std::vector<std::vector<int>> nearestSource(std::vector<std::vector<int>> grid){std::queue<std::pair<int,int>>q;for(int r=0;r<(int)grid.size();r++)for(int c=0;c<(int)grid[0].size();c++){if(grid[r][c]==1){grid[r][c]=0;q.push({r,c});}else grid[r][c]=-1;}while(!q.empty()){auto[r,c]=q.front();q.pop();for(auto[dr,dc]:std::vector<std::pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}}){int nr=r+dr,nc=c+dc;if(nr>=0&&nr<(int)grid.size()&&nc>=0&&nc<(int)grid[0].size()&&grid[nr][nc]==-1){grid[nr][nc]=grid[r][c]+1;q.push({nr,nc});}}}return grid;}
```

```go [Go]
func nearestSource(grid [][]int) [][]int {queue:=[][2]int{};for r:=range grid{for c:=range grid[0]{if grid[r][c]==1{grid[r][c]=0;queue=append(queue,[2]int{r,c})}else{grid[r][c]=-1}}};for len(queue)>0{cell:=queue[0];queue=queue[1:];for _,d:=range[][2]int{{1,0},{-1,0},{0,1},{0,-1}}{nr,nc:=cell[0]+d[0],cell[1]+d[1];if nr>=0&&nr<len(grid)&&nc>=0&&nc<len(grid[0])&&grid[nr][nc]==-1{grid[nr][nc]=grid[cell[0]][cell[1]]+1;queue=append(queue,[2]int{nr,nc})}}};return grid}
```

:::

</ExerciseSolution>

### 5. 单词接龙

<ExerciseSolution>

单词是节点；一次只改变一个字母且新单词在词典中，就存在一条边。从起始词 BFS，第一次到达目标词时的层数就是最短转换长度。

生成邻居时逐位置尝试 `a..z`，命中词典后立即从未访问集合移除，防止重复入队。设单词数 `N`、长度 `L`、字母表大小 26，朴素时间约 `O(N · L · 26)`，空间 `O(N)`。

#### 五语言实现

::: code-group

```java [Java]
static int ladderLength(String begin, String end, Set<String> words) {
    Queue<String> queue=new ArrayDeque<>();queue.offer(begin);int steps=1;
    while(!queue.isEmpty()){for(int size=queue.size();size>0;size--){String word=queue.poll();if(word.equals(end))return steps;char[] chars=word.toCharArray();for(int i=0;i<chars.length;i++){char old=chars[i];for(char c='a';c<='z';c++){chars[i]=c;String next=new String(chars);if(words.remove(next))queue.offer(next);}chars[i]=old;}}steps++;}
    return 0;
}
```

```python [Python]
from collections import deque
def ladder_length(begin, end, words):
    words, queue, steps = set(words), deque([begin]), 1
    while queue:
        for _ in range(len(queue)):
            word = queue.popleft()
            if word == end: return steps
            for index in range(len(word)):
                for char in "abcdefghijklmnopqrstuvwxyz":
                    next_word = word[:index] + char + word[index+1:]
                    if next_word in words: words.remove(next_word); queue.append(next_word)
        steps += 1
    return 0
```

```javascript [JavaScript]
function ladderLength(begin,end,words){words=new Set(words);const queue=[begin];let head=0,steps=1;while(head<queue.length){const endOfLevel=queue.length;while(head<endOfLevel){const word=queue[head++];if(word===end)return steps;for(let i=0;i<word.length;i++)for(let code=97;code<=122;code++){const next=word.slice(0,i)+String.fromCharCode(code)+word.slice(i+1);if(words.delete(next))queue.push(next)}}steps++}return 0}
```

```cpp [C++]
int ladderLength(std::string begin,std::string end,std::unordered_set<std::string> words){std::queue<std::string>q;q.push(begin);int steps=1;while(!q.empty()){for(int size=q.size();size>0;--size){auto word=q.front();q.pop();if(word==end)return steps;for(int i=0;i<(int)word.size();i++){char old=word[i];for(char c='a';c<='z';c++){word[i]=c;if(words.erase(word))q.push(word);}word[i]=old;}}++steps;}return 0;}
```

```go [Go]
func ladderLength(begin,end string,words map[string]bool) int {queue,steps:=[]string{begin},1;for len(queue)>0{size:=len(queue);for i:=0;i<size;i++{word:=queue[0];queue=queue[1:];if word==end{return steps};bytes:=[]byte(word);for p:=range bytes{old:=bytes[p];for c:=byte('a');c<='z';c++{bytes[p]=c;next:=string(bytes);if words[next]{delete(words,next);queue=append(queue,next)}};bytes[p]=old}};steps++};return 0}
```

:::

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

#### 五语言实现

::: code-group

```java [Java]
static int zeroOneBfs(List<int[]>[] graph, int start, int target) {
    int[] distance=new int[graph.length];Arrays.fill(distance,Integer.MAX_VALUE);distance[start]=0;Deque<Integer> deque=new ArrayDeque<>();deque.offer(start);
    while(!deque.isEmpty()){int node=deque.pollFirst();for(int[] edge:graph[node]){int next=edge[0],weight=edge[1];if(distance[node]+weight<distance[next]){distance[next]=distance[node]+weight;if(weight==0)deque.offerFirst(next);else deque.offerLast(next);}}}
    return distance[target];
}
```

```python [Python]
from collections import deque
def zero_one_bfs(graph, start, target):
    distance=[float("inf")]*len(graph);distance[start]=0;queue=deque([start])
    while queue:
        node=queue.popleft()
        for next_node,weight in graph[node]:
            if distance[node]+weight<distance[next_node]:
                distance[next_node]=distance[node]+weight
                queue.appendleft(next_node) if weight==0 else queue.append(next_node)
    return distance[target]
```

```javascript [JavaScript]
function zeroOneBfs(graph,start,target){const distance=Array(graph.length).fill(Infinity);distance[start]=0;const deque=[start];while(deque.length){const node=deque.shift();for(const[next,weight]of graph[node])if(distance[node]+weight<distance[next]){distance[next]=distance[node]+weight;weight===0?deque.unshift(next):deque.push(next)}}return distance[target]}
```

```cpp [C++]
int zeroOneBfs(const std::vector<std::vector<std::pair<int,int>>>&graph,int start,int target){std::vector<int>distance(graph.size(),INT_MAX);distance[start]=0;std::deque<int>deque{start};while(!deque.empty()){int node=deque.front();deque.pop_front();for(auto[next,weight]:graph[node])if(distance[node]+weight<distance[next]){distance[next]=distance[node]+weight;if(weight==0)deque.push_front(next);else deque.push_back(next);}}return distance[target];}
```

```go [Go]
func zeroOneBfs(graph [][][2]int,start,target int) int {distance:=make([]int,len(graph));for i:=range distance{distance[i]=int(^uint(0)>>1)};distance[start]=0;deque:=[]int{start};for len(deque)>0{node:=deque[0];deque=deque[1:];for _,edge:=range graph[node]{next,weight:=edge[0],edge[1];if distance[node]+weight<distance[next]{distance[next]=distance[node]+weight;if weight==0{deque=append([]int{next},deque...)}else{deque=append(deque,next)}}}};return distance[target]}
```

:::

</ExerciseSolution>
