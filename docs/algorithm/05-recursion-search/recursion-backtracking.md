---
title: 递归与回溯入门
description: 用走迷宫和选择清单理解递归、状态、选择与撤销
comments: true
commentId: algorithm-recursion-backtracking
---

# 递归与回溯：选择之后，还能回来

::: tip 配套深化阅读
如果递归调用过程仍然抽象，先阅读 [labuladong：理解递归](https://labuladong.online/zh/algo/essential-technique/understand-recursion/)；能画出递归树后再进入[回溯框架](https://labuladong.online/zh/algo/essential-technique/backtrack-framework/)。
:::

递归是函数处理一个规模更小的同类问题；回溯是在递归树上尝试选择，并在返回时撤销选择。

## 通俗实例：搭配一份早餐

有三样食物：

```text
[面包, 鸡蛋, 牛奶]
```

每样都可以“选择”或“不选择”。所有组合包括：

```text
[]
[面包]
[鸡蛋]
[牛奶]
[面包, 鸡蛋]
[面包, 牛奶]
[鸡蛋, 牛奶]
[面包, 鸡蛋, 牛奶]
```

对每个位置都做两次选择，形成一棵二叉决策树。

## 递归的三个必要部分

| 部分 | 含义 |
| --- | --- |
| 当前状态 | 已经处理到哪个位置、当前选了什么 |
| 递归推进 | 处理下一个更小的子问题 |
| 终止条件 | 所有位置已经决定，记录答案 |

## 回溯骨架

```text
搜索(index, path)：
    如果 index 等于元素数量：
        记录 path
        返回

    不选择当前元素
    搜索(index + 1, path)

    选择当前元素
    把当前元素加入 path
    搜索(index + 1, path)
    从 path 中移除当前元素
```

最后一步移除元素，就是“回溯”：恢复进入当前分支之前的状态。

## 五语言实现：生成所有子集

::: code-group

```java [Java]
import java.util.ArrayList;
import java.util.List;

public class Subsets {
    public static List<List<Integer>> buildSubsets(int[] numbers) {
        List<List<Integer>> result = new ArrayList<>();
        search(numbers, 0, new ArrayList<>(), result);
        return result;
    }

    private static void search(
        int[] numbers,
        int index,
        List<Integer> path,
        List<List<Integer>> result
    ) {
        if (index == numbers.length) {
            result.add(new ArrayList<>(path));
            return;
        }

        search(numbers, index + 1, path, result);

        path.add(numbers[index]);
        search(numbers, index + 1, path, result);
        path.remove(path.size() - 1);
    }
}
```

```python [Python]
def build_subsets(numbers: list[int]) -> list[list[int]]:
    result: list[list[int]] = []
    path: list[int] = []

    def search(index: int) -> None:
        if index == len(numbers):
            result.append(path.copy())
            return

        search(index + 1)

        path.append(numbers[index])
        search(index + 1)
        path.pop()

    search(0)
    return result
```

```javascript [JavaScript]
function buildSubsets(numbers) {
  const result = []
  const path = []

  function search(index) {
    if (index === numbers.length) {
      result.push([...path])
      return
    }

    search(index + 1)

    path.push(numbers[index])
    search(index + 1)
    path.pop()
  }

  search(0)
  return result
}
```

```cpp [C++]
#include <vector>

void search(
    const std::vector<int>& numbers,
    int index,
    std::vector<int>& path,
    std::vector<std::vector<int>>& result
) {
    if (index == static_cast<int>(numbers.size())) {
        result.push_back(path);
        return;
    }

    search(numbers, index + 1, path, result);

    path.push_back(numbers[index]);
    search(numbers, index + 1, path, result);
    path.pop_back();
}

std::vector<std::vector<int>> buildSubsets(
    const std::vector<int>& numbers
) {
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    search(numbers, 0, path, result);
    return result;
}
```

```go [Go]
func buildSubsets(numbers []int) [][]int {
	result := [][]int{}
	path := []int{}

	var search func(int)
	search = func(index int) {
		if index == len(numbers) {
			snapshot := append([]int(nil), path...)
			result = append(result, snapshot)
			return
		}

		search(index + 1)

		path = append(path, numbers[index])
		search(index + 1)
		path = path[:len(path)-1]
	}

	search(0)
	return result
}
```

:::

## 为什么记录答案时必须复制 path

`path` 会被后续分支反复修改。如果只把同一个可变对象放入答案，最后可能得到许多份相同内容。

| 语言 | 复制方法 |
| --- | --- |
| Java | `new ArrayList<>(path)` |
| Python | `path.copy()` |
| JavaScript | `[...path]` |
| C++ | `result.push_back(path)` 按值复制 |
| Go | `append([]int(nil), path...)` |

## 复杂度

`n` 个元素有 `2ⁿ` 个子集。仅输出所有答案就需要：

- 时间复杂度：`O(n × 2ⁿ)`，复制每个子集需要时间；
- 递归栈：`O(n)`；
- 结果空间：`O(n × 2ⁿ)`。

## 常见错误

- 没有终止条件；
- 递归参数没有向终止条件靠近；
- 做出选择后忘记撤销；
- 记录答案时没有复制可变路径；
- 把回溯用于本来可以直接计算的问题；
- 忘记去重相同元素产生的重复方案。

## 练习

### 1. 生成所有排列

<ExerciseSolution>

**状态**是当前排列 `path`，**选择**是尚未使用的元素。每层选择一个未使用元素，加入路径后递归；返回时撤销选择。路径长度等于元素数量时复制到答案。

```text
backtrack(path, used):
    如果 path.length == n：记录 path 的副本并返回
    遍历每个下标 i：
        如果 used[i]：跳过
        used[i] = true，path 加入 nums[i]
        backtrack(path, used)
        path 删除末尾，used[i] = false
```

共有 `n!` 个答案，复制答案后时间 `O(n · n!)`，递归路径和标记空间 `O(n)`。输入含重复元素时先排序，并跳过“同层前一个相同但未使用”的选择，避免重复排列。

#### 五语言实现

::: code-group

```java [Java]
static List<List<Integer>> permutations(int[] numbers){List<List<Integer>>answer=new ArrayList<>();permute(numbers,new boolean[numbers.length],new ArrayList<>(),answer);return answer;}
static void permute(int[] numbers,boolean[] used,List<Integer> path,List<List<Integer>> answer){if(path.size()==numbers.length){answer.add(new ArrayList<>(path));return;}for(int i=0;i<numbers.length;i++){if(used[i])continue;used[i]=true;path.add(numbers[i]);permute(numbers,used,path,answer);path.remove(path.size()-1);used[i]=false;}}
```

```python [Python]
def permutations(numbers):
    answer, used = [], [False] * len(numbers)
    def search(path):
        if len(path) == len(numbers): answer.append(path.copy()); return
        for index, value in enumerate(numbers):
            if used[index]: continue
            used[index] = True; path.append(value); search(path); path.pop(); used[index] = False
    search([])
    return answer
```

```javascript [JavaScript]
function permutations(numbers){const answer=[],used=Array(numbers.length).fill(false);function search(path){if(path.length===numbers.length){answer.push([...path]);return}for(let i=0;i<numbers.length;i++){if(used[i])continue;used[i]=true;path.push(numbers[i]);search(path);path.pop();used[i]=false}}search([]);return answer}
```

```cpp [C++]
void permute(const std::vector<int>&numbers,std::vector<bool>&used,std::vector<int>&path,std::vector<std::vector<int>>&answer){if(path.size()==numbers.size()){answer.push_back(path);return;}for(int i=0;i<(int)numbers.size();i++){if(used[i])continue;used[i]=true;path.push_back(numbers[i]);permute(numbers,used,path,answer);path.pop_back();used[i]=false;}}
std::vector<std::vector<int>> permutations(const std::vector<int>&numbers){std::vector<std::vector<int>>answer;std::vector<int>path;std::vector<bool>used(numbers.size());permute(numbers,used,path,answer);return answer;}
```

```go [Go]
func permutations(numbers []int) [][]int {answer:=[][]int{};used:=make([]bool,len(numbers));path:=[]int{};var search func();search=func(){if len(path)==len(numbers){copyPath:=append([]int(nil),path...);answer=append(answer,copyPath);return};for i,value:=range numbers{if used[i]{continue};used[i]=true;path=append(path,value);search();path=path[:len(path)-1];used[i]=false}};search();return answer}
```

:::

</ExerciseSolution>

### 2. 组合总和

<ExerciseSolution>

先排序候选数。状态是剩余目标 `remain` 和本层允许开始选择的下标 `start`。选中一个数后，如果题目允许重复使用，就仍从当前下标递归；不允许重复则从 `i + 1` 开始。

```text
backtrack(start, remain):
    remain == 0：记录路径副本
    遍历 i 从 start 开始：
        如果 candidates[i] > remain：停止本层
        选择 candidates[i]
        backtrack(i, remain - candidates[i])
        撤销选择
```

排序后的提前停止就是剪枝。复杂度取决于候选数和目标值，最坏为指数级；路径深度最多约为 `target / minCandidate`。

#### 五语言实现

::: code-group

```java [Java]
static List<List<Integer>> combinationSum(int[] candidates,int target){Arrays.sort(candidates);List<List<Integer>>answer=new ArrayList<>();combine(candidates,target,0,new ArrayList<>(),answer);return answer;}
static void combine(int[] candidates,int remain,int start,List<Integer>path,List<List<Integer>>answer){if(remain==0){answer.add(new ArrayList<>(path));return;}for(int i=start;i<candidates.length&&candidates[i]<=remain;i++){path.add(candidates[i]);combine(candidates,remain-candidates[i],i,path,answer);path.remove(path.size()-1);}}
```

```python [Python]
def combination_sum(candidates, target):
    candidates.sort(); answer = []
    def search(remain, start, path):
        if remain == 0: answer.append(path.copy()); return
        for index in range(start, len(candidates)):
            value = candidates[index]
            if value > remain: break
            path.append(value); search(remain - value, index, path); path.pop()
    search(target, 0, [])
    return answer
```

```javascript [JavaScript]
function combinationSum(candidates,target){candidates.sort((a,b)=>a-b);const answer=[];function search(remain,start,path){if(remain===0){answer.push([...path]);return}for(let i=start;i<candidates.length&&candidates[i]<=remain;i++){path.push(candidates[i]);search(remain-candidates[i],i,path);path.pop()}}search(target,0,[]);return answer}
```

```cpp [C++]
void combine(const std::vector<int>&candidates,int remain,int start,std::vector<int>&path,std::vector<std::vector<int>>&answer){if(remain==0){answer.push_back(path);return;}for(int i=start;i<(int)candidates.size()&&candidates[i]<=remain;i++){path.push_back(candidates[i]);combine(candidates,remain-candidates[i],i,path,answer);path.pop_back();}}
std::vector<std::vector<int>> combinationSum(std::vector<int>candidates,int target){std::sort(candidates.begin(),candidates.end());std::vector<std::vector<int>>answer;std::vector<int>path;combine(candidates,target,0,path,answer);return answer;}
```

```go [Go]
func combinationSum(candidates []int,target int)[][]int{sort.Ints(candidates);answer:=[][]int{};path:=[]int{};var search func(int,int);search=func(remain,start int){if remain==0{answer=append(answer,append([]int(nil),path...));return};for i:=start;i<len(candidates)&&candidates[i]<=remain;i++{path=append(path,candidates[i]);search(remain-candidates[i],i);path=path[:len(path)-1]}};search(target,0);return answer}
```

:::

</ExerciseSolution>

### 3. 电话号码字母组合

<ExerciseSolution>

建立数字到字母的映射，例如 `2 → abc`。递归层数对应数字位置，每层从该数字的字母集合中选一个。走完所有数字后记录字符串。

```text
backtrack(index):
    index == digits.length：记录当前字符串
    遍历 map[digits[index]] 中的字母：
        加入字母
        backtrack(index + 1)
        删除字母
```

若每个数字最多对应 4 个字母，长度为 `n` 时最多产生 `4ⁿ` 个结果，生成结果的时间为 `O(n · 4ⁿ)`。空输入返回空列表，而不是包含空字符串的列表。

#### 五语言实现

::: code-group

```java [Java]
static List<String> letterCombinations(String digits){if(digits.isEmpty())return List.of();String[]map={"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};List<String>answer=new ArrayList<>();letters(digits,0,new StringBuilder(),map,answer);return answer;}
static void letters(String digits,int index,StringBuilder path,String[]map,List<String>answer){if(index==digits.length()){answer.add(path.toString());return;}for(char letter:map[digits.charAt(index)-'0'].toCharArray()){path.append(letter);letters(digits,index+1,path,map,answer);path.deleteCharAt(path.length()-1);}}
```

```python [Python]
def letter_combinations(digits):
    if not digits: return []
    mapping = {"2":"abc","3":"def","4":"ghi","5":"jkl","6":"mno","7":"pqrs","8":"tuv","9":"wxyz"}; answer=[]
    def search(index, path):
        if index == len(digits): answer.append("".join(path)); return
        for letter in mapping[digits[index]]: path.append(letter); search(index+1,path); path.pop()
    search(0,[]); return answer
```

```javascript [JavaScript]
function letterCombinations(digits){if(!digits)return[];const map={2:'abc',3:'def',4:'ghi',5:'jkl',6:'mno',7:'pqrs',8:'tuv',9:'wxyz'},answer=[];function search(index,path){if(index===digits.length){answer.push(path.join(''));return}for(const letter of map[digits[index]]){path.push(letter);search(index+1,path);path.pop()}}search(0,[]);return answer}
```

```cpp [C++]
void letters(const std::string&digits,int index,std::string&path,const std::vector<std::string>&map,std::vector<std::string>&answer){if(index==(int)digits.size()){answer.push_back(path);return;}for(char letter:map[digits[index]-'0']){path.push_back(letter);letters(digits,index+1,path,map,answer);path.pop_back();}}
std::vector<std::string> letterCombinations(const std::string&digits){if(digits.empty())return{};std::vector<std::string>map{"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"},answer;std::string path;letters(digits,0,path,map,answer);return answer;}
```

```go [Go]
func letterCombinations(digits string)[]string{if digits==""{return nil};mapping:=[]string{"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};answer:=[]string{};path:=[]byte{};var search func(int);search=func(index int){if index==len(digits){answer=append(answer,string(path));return};for _,letter:=range[]byte(mapping[digits[index]-'0']){path=append(path,letter);search(index+1);path=path[:len(path)-1]}};search(0);return answer}
```

:::

</ExerciseSolution>

### 4. N 皇后

<ExerciseSolution>

逐行放皇后。三个集合分别记录已占用的列 `col`、主对角线 `row-col` 和副对角线 `row+col`。某位置三者都未占用才可以选择。

```text
backtrack(row):
    row == n：记录棋盘
    遍历 col：
        如果列或两条对角线冲突：跳过
        标记冲突并放置皇后
        backtrack(row + 1)
        撤销皇后和三个标记
```

搜索上界约为 `O(n!)`，三个集合把冲突检查从扫描棋盘降为平均 `O(1)`。`n=2`、`n=3` 无解，`n=1` 有一个解。

#### 五语言实现

::: code-group

```java [Java]
static List<List<String>> solveNQueens(int n){List<List<String>>answer=new ArrayList<>();placeQueens(0,n,new HashSet<>(),new HashSet<>(),new HashSet<>(),new int[n],answer);return answer;}
static void placeQueens(int row,int n,Set<Integer>columns,Set<Integer>diagonal1,Set<Integer>diagonal2,int[]queens,List<List<String>>answer){if(row==n){List<String>board=new ArrayList<>();for(int column:queens)board.add(".".repeat(column)+"Q"+".".repeat(n-column-1));answer.add(board);return;}for(int column=0;column<n;column++){if(columns.contains(column)||diagonal1.contains(row-column)||diagonal2.contains(row+column))continue;columns.add(column);diagonal1.add(row-column);diagonal2.add(row+column);queens[row]=column;placeQueens(row+1,n,columns,diagonal1,diagonal2,queens,answer);columns.remove(column);diagonal1.remove(row-column);diagonal2.remove(row+column);}}
```

```python [Python]
def solve_n_queens(n):
    answer, columns, diagonal1, diagonal2, queens = [], set(), set(), set(), [-1] * n
    def search(row):
        if row == n: answer.append(["."*column+"Q"+"."*(n-column-1) for column in queens]); return
        for column in range(n):
            if column in columns or row-column in diagonal1 or row+column in diagonal2: continue
            columns.add(column); diagonal1.add(row-column); diagonal2.add(row+column); queens[row]=column; search(row+1); columns.remove(column); diagonal1.remove(row-column); diagonal2.remove(row+column)
    search(0); return answer
```

```javascript [JavaScript]
function solveNQueens(n){const answer=[],columns=new Set(),d1=new Set(),d2=new Set(),queens=Array(n);function search(row){if(row===n){answer.push(queens.map(c=>'.'.repeat(c)+'Q'+'.'.repeat(n-c-1)));return}for(let c=0;c<n;c++){if(columns.has(c)||d1.has(row-c)||d2.has(row+c))continue;columns.add(c);d1.add(row-c);d2.add(row+c);queens[row]=c;search(row+1);columns.delete(c);d1.delete(row-c);d2.delete(row+c)}}search(0);return answer}
```

```cpp [C++]
void queens(int row,int n,std::unordered_set<int>&columns,std::unordered_set<int>&d1,std::unordered_set<int>&d2,std::vector<int>&placed,std::vector<std::vector<std::string>>&answer){if(row==n){std::vector<std::string>board(n,std::string(n,'.'));for(int r=0;r<n;r++)board[r][placed[r]]='Q';answer.push_back(board);return;}for(int c=0;c<n;c++){if(columns.count(c)||d1.count(row-c)||d2.count(row+c))continue;columns.insert(c);d1.insert(row-c);d2.insert(row+c);placed[row]=c;queens(row+1,n,columns,d1,d2,placed,answer);columns.erase(c);d1.erase(row-c);d2.erase(row+c);}}
```

```go [Go]
func solveNQueens(n int)[][]string{answer:=[][]string{};columns,d1,d2:=map[int]bool{},map[int]bool{},map[int]bool{};placed:=make([]int,n);var search func(int);search=func(row int){if row==n{board:=make([]string,n);for r,c:=range placed{line:=make([]byte,n);for i:=range line{line[i]='.'};line[c]='Q';board[r]=string(line)};answer=append(answer,board);return};for c:=0;c<n;c++{if columns[c]||d1[row-c]||d2[row+c]{continue};columns[c],d1[row-c],d2[row+c]=true,true,true;placed[row]=c;search(row+1);delete(columns,c);delete(d1,row-c);delete(d2,row+c)}};search(0);return answer}
```

:::

</ExerciseSolution>

### 5. 数独求解

<ExerciseSolution>

先为每一行、列和九宫格建立已使用数字集合。选择一个空格，尝试 `1..9` 中不冲突的数字；填入后递归，失败则恢复空格。为了明显加速，应优先选择“候选数字最少”的空格。

```text
solve():
    找到候选最少的空格；若没有空格则成功
    遍历该格的候选数字：
        写入数字并更新行/列/宫标记
        如果 solve() 成功：返回 true
        清空格子并撤销标记
    返回 false
```

最坏复杂度是指数级，粗略上界 `O(9^e)`，`e` 为空格数；约束传播和选择最少候选格是关键剪枝。输入本身冲突时应直接判定无解。

#### 五语言实现

::: code-group

```java [Java]
static boolean solveSudoku(char[][] board){for(int row=0;row<9;row++)for(int column=0;column<9;column++)if(board[row][column]=='.'){for(char value='1';value<='9';value++){if(!valid(board,row,column,value))continue;board[row][column]=value;if(solveSudoku(board))return true;board[row][column]='.';}return false;}return true;}
static boolean valid(char[][]board,int row,int column,char value){for(int i=0;i<9;i++)if(board[row][i]==value||board[i][column]==value||board[row/3*3+i/3][column/3*3+i%3]==value)return false;return true;}
```

```python [Python]
def solve_sudoku(board):
    def valid(row,column,value):
        return all(board[row][i]!=value and board[i][column]!=value and board[row//3*3+i//3][column//3*3+i%3]!=value for i in range(9))
    for row in range(9):
        for column in range(9):
            if board[row][column] != ".": continue
            for value in "123456789":
                if valid(row,column,value):
                    board[row][column]=value
                    if solve_sudoku(board): return True
                    board[row][column]="."
            return False
    return True
```

```javascript [JavaScript]
function solveSudoku(board){function valid(r,c,v){for(let i=0;i<9;i++)if(board[r][i]===v||board[i][c]===v||board[Math.floor(r/3)*3+Math.floor(i/3)][Math.floor(c/3)*3+i%3]===v)return false;return true}for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(board[r][c]==='.'){for(let v=1;v<=9;v++){const value=String(v);if(valid(r,c,value)){board[r][c]=value;if(solveSudoku(board))return true;board[r][c]='.'}}return false}return true}
```

```cpp [C++]
bool valid(const std::vector<std::vector<char>>&board,int row,int column,char value){for(int i=0;i<9;i++)if(board[row][i]==value||board[i][column]==value||board[row/3*3+i/3][column/3*3+i%3]==value)return false;return true;}
bool solveSudoku(std::vector<std::vector<char>>&board){for(int row=0;row<9;row++)for(int column=0;column<9;column++)if(board[row][column]=='.'){for(char value='1';value<='9';value++)if(valid(board,row,column,value)){board[row][column]=value;if(solveSudoku(board))return true;board[row][column]='.';}return false;}return true;}
```

```go [Go]
func solveSudoku(board [][]byte)bool{valid:=func(row,column int,value byte)bool{for i:=0;i<9;i++{if board[row][i]==value||board[i][column]==value||board[row/3*3+i/3][column/3*3+i%3]==value{return false}};return true};for row:=0;row<9;row++{for column:=0;column<9;column++{if board[row][column]!='.'{continue};for value:=byte('1');value<='9';value++{if valid(row,column,value){board[row][column]=value;if solveSudoku(board){return true};board[row][column]='.'}};return false}};return true}
```

:::

</ExerciseSolution>

### 6. 单词搜索

<ExerciseSolution>

从每个与单词首字符相同的格子出发 DFS。状态包括当前位置和即将匹配的字符下标；同一条路径中不能重复使用格子，因此进入时标记、离开时恢复。

```text
dfs(row, col, index):
    越界、字符不同或已访问：false
    index == word.length - 1：true
    标记当前格
    在上下左右递归匹配 index + 1
    恢复当前格
    返回四个方向是否有一个成功
```

棋盘 `m × n`、单词长度 `L` 时，最坏时间 `O(mn · 3ᴸ)`：第一步后通常不能立刻走回原格，所以后续最多约三个方向；递归空间 `O(L)`。

#### 五语言实现

::: code-group

```java [Java]
static boolean wordSearch(char[][]board,String word){for(int row=0;row<board.length;row++)for(int column=0;column<board[0].length;column++)if(find(board,word,row,column,0))return true;return false;}
static boolean find(char[][]board,String word,int row,int column,int index){if(index==word.length())return true;if(row<0||row>=board.length||column<0||column>=board[0].length||board[row][column]!=word.charAt(index))return false;char saved=board[row][column];board[row][column]='#';boolean found=find(board,word,row+1,column,index+1)||find(board,word,row-1,column,index+1)||find(board,word,row,column+1,index+1)||find(board,word,row,column-1,index+1);board[row][column]=saved;return found;}
```

```python [Python]
def word_search(board, word):
    def find(row,column,index):
        if index == len(word): return True
        if not (0<=row<len(board) and 0<=column<len(board[0])) or board[row][column] != word[index]: return False
        saved=board[row][column];board[row][column]="#"
        found=any(find(row+dr,column+dc,index+1) for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)))
        board[row][column]=saved;return found
    return any(find(row,column,0) for row in range(len(board)) for column in range(len(board[0])))
```

```javascript [JavaScript]
function wordSearch(board,word){function find(row,column,index){if(index===word.length)return true;if(row<0||row>=board.length||column<0||column>=board[0].length||board[row][column]!==word[index])return false;const saved=board[row][column];board[row][column]='#';const found=find(row+1,column,index+1)||find(row-1,column,index+1)||find(row,column+1,index+1)||find(row,column-1,index+1);board[row][column]=saved;return found}return board.some((line,row)=>line.some((_,column)=>find(row,column,0)))}
```

```cpp [C++]
bool find(std::vector<std::vector<char>>&board,const std::string&word,int row,int column,int index){if(index==(int)word.size())return true;if(row<0||row>=(int)board.size()||column<0||column>=(int)board[0].size()||board[row][column]!=word[index])return false;char saved=board[row][column];board[row][column]='#';bool found=find(board,word,row+1,column,index+1)||find(board,word,row-1,column,index+1)||find(board,word,row,column+1,index+1)||find(board,word,row,column-1,index+1);board[row][column]=saved;return found;}
```

```go [Go]
func wordSearch(board [][]byte,word string)bool{var find func(int,int,int)bool;find=func(row,column,index int)bool{if index==len(word){return true};if row<0||row>=len(board)||column<0||column>=len(board[0])||board[row][column]!=word[index]{return false};saved:=board[row][column];board[row][column]='#';found:=find(row+1,column,index+1)||find(row-1,column,index+1)||find(row,column+1,index+1)||find(row,column-1,index+1);board[row][column]=saved;return found};for row:=range board{for column:=range board[0]{if find(row,column,0){return true}}};return false}
```

:::

</ExerciseSolution>
