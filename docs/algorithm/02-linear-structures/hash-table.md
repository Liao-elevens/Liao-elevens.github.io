---
title: 哈希表与集合
description: 从储物柜和通讯录理解 Map、Set、哈希函数、冲突与五语言常用写法
---

# 哈希表与集合：给数据贴上快速查找的标签

> 前置知识：变量、数组、循环、函数。建议先读[算法到底是什么](/algorithm/00-foundations/zero-to-algorithms)。

::: tip 配套深化阅读
先理解本文的储物柜例子，再阅读 [labuladong：哈希表核心原理](https://labuladong.online/zh/algo/data-structure-basic/hashmap-basic/)了解哈希函数、桶和冲突处理。
:::

哈希表解决的是一个极常见的问题：

> 我不想从头到尾翻找，能不能根据一个“键”直接找到对应的数据？

## 通俗实例：学校储物柜

假设一间学校有很多储物柜。最笨的办法是把物品随便放，取东西时逐个打开。

更好的办法是给每件物品计算一个柜号：

```text
柜号 = 学号 % 柜子数量
```

学生 `20260123`：

```text
20260123 % 100 = 23
```

以后先去 `23` 号柜找。这种“根据键计算存储位置”的规则就是**哈希函数**。

在程序中，我们通常不自己管理柜子，而是使用语言提供的：

| 需求 | 抽象结构 | Java | Python | JavaScript | C++ |
| --- | --- | --- | --- | --- | --- |
| 键对应值 | Map / 字典 | `HashMap<K,V>` | `dict` | `Map` | `unordered_map<K,V>` |
| 只记录是否存在 | Set / 集合 | `HashSet<T>` | `set` | `Set` | `unordered_set<T>` |

## Map 和 Set 有什么区别

### Map：通讯录

一个名字对应一个电话号码：

```text
"小明" → "138..."
"小红" → "139..."
```

Map 保存的是 `key → value`。

### Set：签到表

只需要知道某人是否来过：

```text
{"小明", "小红", "小刚"}
```

Set 只保存唯一的 key，不关心额外 value。

## 第一个任务：统计每个数字出现次数

输入：

```text
[2, 1, 2, 3, 1, 2]
```

输出：

```text
2 出现 3 次
1 出现 2 次
3 出现 1 次
```

### 手工模拟

准备一张空表 `counts`：

| 当前数字 | 更新前 | 更新后 |
| ---: | --- | --- |
| 2 | `{}` | `{2: 1}` |
| 1 | `{2: 1}` | `{2: 1, 1: 1}` |
| 2 | `{2: 1, 1: 1}` | `{2: 2, 1: 1}` |
| 3 | `{2: 2, 1: 1}` | `{2: 2, 1: 1, 3: 1}` |
| 1 | `{2: 2, 1: 1, 3: 1}` | `{2: 2, 1: 2, 3: 1}` |
| 2 | `{2: 2, 1: 2, 3: 1}` | `{2: 3, 1: 2, 3: 1}` |

### 伪代码

```text
创建空哈希表 counts

遍历每个 number：
    oldCount = counts 中 number 的次数；不存在时当作 0
    counts[number] = oldCount + 1

返回 counts
```

### 五语言实现

::: code-group

```java [Java]
import java.util.HashMap;
import java.util.Map;

static Map<Integer, Integer> countNumbers(int[] numbers) {
    Map<Integer, Integer> counts = new HashMap<>();

    for (int number : numbers) {
        counts.put(number, counts.getOrDefault(number, 0) + 1);
    }
    return counts;
}
```

```python [Python]
def count_numbers(numbers: list[int]) -> dict[int, int]:
    counts: dict[int, int] = {}

    for number in numbers:
        counts[number] = counts.get(number, 0) + 1
    return counts
```

```javascript [JavaScript]
function countNumbers(numbers) {
  const counts = new Map()

  for (const number of numbers) {
    counts.set(number, (counts.get(number) ?? 0) + 1)
  }
  return counts
}
```

```cpp [C++]
#include <unordered_map>
#include <vector>

std::unordered_map<int, int> countNumbers(
    const std::vector<int>& numbers
) {
    std::unordered_map<int, int> counts;

    for (int number : numbers) {
        ++counts[number];
    }
    return counts;
}
```

```go [Go]
func countNumbers(numbers []int) map[int]int {
	counts := make(map[int]int)
	for _, number := range numbers {
		counts[number]++
	}
	return counts
}
```

:::

## 五种语言的关键差异

| 动作 | Java | Python | JavaScript | C++ | Go |
| --- | --- | --- | --- | --- | --- |
| 创建 Map | `new HashMap<>()` | `{}` | `new Map()` | `std::unordered_map` | `make(map[K]V)` |
| 判断 key | `containsKey(k)` | `k in map` | `map.has(k)` | `map.find(k) != map.end()` | `value, exists := map[k]` |
| 读取 value | `get(k)` | `map[k]` | `map.get(k)` | `map.at(k)` | `map[k]` |
| 写入 | `put(k, v)` | `map[k] = v` | `map.set(k, v)` | `map[k] = v` | `map[k] = v` |
| 缺省值 | `getOrDefault` | `get(k, default)` | `get(k) ?? default` | `operator[]` 可创建默认值 | 不存在时返回 value 零值 |

::: warning JavaScript 初学坑
普通对象 `{}` 也能保存键值，但键会受到字符串化、原型属性等规则影响。学习通用哈希表算法时，优先使用 `Map`；只有明确需要普通对象时再使用 `{}`。
:::

::: warning C++ 初学坑
`map[key]` 在 key 不存在时会插入一个默认值。只想查询而不想修改时，使用 `find`；如果确定 key 存在，也可以用 `at`。
:::

::: warning Go 初学坑
读取不存在的 key 会得到 value 类型的零值。需要区分“不存在”和“存在但值为零”时，使用 `value, exists := map[key]`。
:::

## 第二个任务：判断是否有重复元素

输入 `[4, 1, 7, 4]`，因为 `4` 出现两次，所以返回 `true`。

不需要统计次数，只要记录“见过没有”，因此使用 Set。

### 伪代码

```text
创建空集合 seen

遍历每个 number：
    如果 number 已在 seen：
        返回 true
    把 number 加入 seen

返回 false
```

::: code-group

```java [Java]
import java.util.HashSet;
import java.util.Set;

static boolean containsDuplicate(int[] numbers) {
    Set<Integer> seen = new HashSet<>();
    for (int number : numbers) {
        if (!seen.add(number)) {
            return true;
        }
    }
    return false;
}
```

```python [Python]
def contains_duplicate(numbers: list[int]) -> bool:
    seen: set[int] = set()
    for number in numbers:
        if number in seen:
            return True
        seen.add(number)
    return False
```

```javascript [JavaScript]
function containsDuplicate(numbers) {
  const seen = new Set()
  for (const number of numbers) {
    if (seen.has(number)) return true
    seen.add(number)
  }
  return false
}
```

```cpp [C++]
#include <unordered_set>
#include <vector>

bool containsDuplicate(const std::vector<int>& numbers) {
    std::unordered_set<int> seen;
    for (int number : numbers) {
        if (seen.find(number) != seen.end()) {
            return true;
        }
        seen.insert(number);
    }
    return false;
}
```

```go [Go]
func containsDuplicate(numbers []int) bool {
	seen := make(map[int]bool)
	for _, number := range numbers {
		if seen[number] {
			return true
		}
		seen[number] = true
	}
	return false
}
```

:::

## 为什么叫“哈希”

真实的 key 可能是整数、字符串或其他对象。哈希表会通过哈希函数把 key 转换成一个数，再映射到内部位置。

```text
key
  ↓ 哈希函数
哈希值
  ↓ 映射到数组范围
内部桶位置
```

哈希函数应该尽量做到：

1. 同一个 key 每次得到相同结果；
2. 不同 key 尽量均匀分散；
3. 计算速度足够快。

## 哈希冲突是什么

柜子数量有限，不同学号可能得到同一个柜号：

```text
123 % 10 = 3
133 % 10 = 3
```

这叫哈希冲突。成熟语言的哈希容器会在内部解决冲突，常见方式包括：

- 同一个位置使用链式结构保存多个条目；
- 发生冲突后继续寻找下一个空位置；
- 数据变多时扩容并重新分配。

初学阶段不需要自己实现，但要知道：

> 哈希表并不是“没有比较就瞬间找到”，而是用额外空间和良好分布换取平均快速查找。

## 复杂度

| 操作 | 平均情况 | 极端情况 |
| --- | --- | --- |
| 查询 | `O(1)` | `O(n)` |
| 插入 | `O(1)` | `O(n)` |
| 删除 | `O(1)` | `O(n)` |
| 遍历全部 | `O(n)` | `O(n)` |

算法题里通常按平均 `O(1)` 分析。极端退化可能来自大量冲突或恶意构造的数据。

统计 `n` 个数字：

- 时间复杂度：平均 `O(n)`；
- 空间复杂度：最坏 `O(n)`，每个数字都不同。

## 什么时候优先想到哈希表

看到这些信号时可以考虑：

- 统计出现次数；
- 判断某个值是否存在；
- 去除重复；
- 根据 key 快速找 value；
- 找两数之和；
- 按某种特征分组；
- 记录已经访问过的状态。

但哈希表通常**不保证按 key 排序**。如果题目要求有序遍历、查找前驱后继或范围查询，需要考虑有序 Map、树或排序数组。

## 初学者常见错误

1. 把 `key` 和 `value` 写反；
2. 忘记处理 key 不存在的情况；
3. 只记录“出现过”，但题目还需要下标或次数；
4. 遍历 Map 时误以为顺序一定符合题目要求；
5. 使用可变对象作为 key，却没有理解语言的相等与哈希规则；
6. 用哈希表解决本来可直接用小范围数组计数的问题。

## 自测练习

先手工写伪代码，再选最熟悉的语言：

1. 统计字符串中每个字符的次数；
2. 找出数组中第一个重复的数字；
3. 判断两个字符串是否由相同字符重新排列而成；
4. 计算两个数组的公共元素；
5. 返回数组中只出现一次的所有数字。

## 外部辅助

- [Hello 算法：哈希表](https://www.hello-algo.com/chapter_hashing/)：用动画理解桶、冲突与扩容。
- [VisuAlgo：Hash Table](https://visualgo.net/en/hashtable)：交互观察开放寻址和冲突处理。
- [OI Wiki：哈希表](https://oi-wiki.org/ds/hash/)：适合学完本站基础后继续查阅。
- [Java Collections Framework](https://dev.java/learn/api/collections-framework/)：Java 官方集合框架教程。
- [Python 数据结构教程](https://docs.python.org/zh-cn/3/tutorial/datastructures.html)：Python 官方 `list`、`set`、`dict` 说明。
- [MDN：键控集合](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Keyed_collections)：JavaScript `Map` 与 `Set`。
- [cppreference：容器库](https://zh.cppreference.com/w/cpp/container)：C++ 标准容器速查。

## 下一步

- [用哈希表解决“两数之和” →](/algorithm/00-foundations/problem-solving-guide)
- [数组基础 →](/algorithm/02-linear-structures/arrays)
- [前缀和：另一种用空间换查询速度的方法 →](/algorithm/04-techniques/prefix-sum)
