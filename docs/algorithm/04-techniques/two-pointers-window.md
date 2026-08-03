---
title: 双指针与滑动窗口
description: 用两名检查员和可伸缩相框理解双指针与窗口
comments: true
commentId: algorithm-two-pointers-window
---

# 双指针与滑动窗口

::: tip 配套深化阅读
先手工移动本文的左右边界，再阅读 [数组双指针总结](https://labuladong.online/zh/algo/essential-technique/array-two-pointers-summary/)与[滑动窗口框架](https://labuladong.online/zh/algo/essential-technique/sliding-window-framework/)归纳适用信号。
:::

双指针的核心不是“代码里有两个变量”，而是利用问题规律，让两个位置协同移动，避免重复枚举。

## 左右双指针：寻找两数之和

有序数组：

```text
[1, 2, 4, 7, 11, 15]
```

目标和是 `15`。

1. 左指针指向最小值 `1`；
2. 右指针指向最大值 `15`；
3. 和为 `16`，太大，只能让右指针左移；
4. `1 + 11 = 12`，太小，只能让左指针右移；
5. `4 + 11 = 15`，找到。

```text
和太大 → 右指针左移，减小总和
和太小 → 左指针右移，增大总和
```

### 五语言实现

::: code-group

```java [Java]
public static int[] twoSumSorted(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;

    while (left < right) {
        long sum = (long) numbers[left] + numbers[right];
        if (sum == target) {
            return new int[]{left, right};
        }
        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{-1, -1};
}
```

```python [Python]
def two_sum_sorted(numbers: list[int], target: int) -> tuple[int, int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return left, right
        if total < target:
            left += 1
        else:
            right -= 1
    return -1, -1
```

```javascript [JavaScript]
function twoSumSorted(numbers, target) {
  let left = 0
  let right = numbers.length - 1

  while (left < right) {
    const sum = numbers[left] + numbers[right]
    if (sum === target) return [left, right]
    if (sum < target) {
      left += 1
    } else {
      right -= 1
    }
  }
  return [-1, -1]
}
```

```cpp [C++]
#include <utility>
#include <vector>

std::pair<int, int> twoSumSorted(
    const std::vector<int>& numbers,
    int target
) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;

    while (left < right) {
        long long sum =
            static_cast<long long>(numbers[left]) + numbers[right];
        if (sum == target) {
            return {left, right};
        }
        if (sum < target) {
            ++left;
        } else {
            --right;
        }
    }
    return {-1, -1};
}
```

```go [Go]
func twoSumSorted(numbers []int, target int) [2]int {
	left := 0
	right := len(numbers) - 1

	for left < right {
		sum := int64(numbers[left]) + int64(numbers[right])
		if sum == int64(target) {
			return [2]int{left, right}
		}
		if sum < int64(target) {
			left++
		} else {
			right--
		}
	}
	return [2]int{-1, -1}
}
```

:::

暴力枚举所有组合需要 `O(n²)`，双指针只让每个指针单向移动，时间复杂度是 `O(n)`。

## 滑动窗口：可伸缩的相框

滑动窗口用于维护连续区间。把窗口想成放在数组上的相框：

- 右边界向右，窗口扩大；
- 条件不满足时，左边界向右，窗口缩小；
- 移动时只更新离开和进入窗口的元素。

### 实例：和至少为 target 的最短连续子数组

数组元素均为正数：

```text
numbers = [2, 3, 1, 2, 4, 3]
target = 7
```

窗口过程：

```text
[2, 3, 1, 2] 和为 8 → 满足，尝试缩小
   [3, 1, 2] 和为 6 → 不满足，继续扩大
   [3, 1, 2, 4] 和为 10 → 缩小
      [1, 2, 4] 和为 7 → 长度 3
            [4, 3] 和为 7 → 长度 2
```

### 伪代码

```text
left = 0
windowSum = 0
best = 无穷大

让 right 从左到右移动：
    把 numbers[right] 加入窗口

    当窗口和已经满足条件：
        更新最短长度
        移除 numbers[left]
        left 向右移动
```

### Python 参考实现

```python
def min_subarray_length(numbers: list[int], target: int) -> int:
    left = 0
    window_sum = 0
    best = len(numbers) + 1

    for right, number in enumerate(numbers):
        window_sum += number

        while window_sum >= target:
            best = min(best, right - left + 1)
            window_sum -= numbers[left]
            left += 1

    return 0 if best == len(numbers) + 1 else best
```

其他三种语言保持完全相同的窗口状态：

- `left`：窗口左端；
- `right`：窗口右端；
- `windowSum`：窗口内可增量维护的信息；
- `best`：到目前为止的最佳答案。

## 为什么要求正数

正数保证：

- 扩大窗口时，和不会变小；
- 缩小窗口时，和不会变大。

如果允许负数，这个单调规律消失，普通滑动窗口可能漏掉答案。这时要考虑前缀和、单调队列或其他方法。

## 常见错误

1. 把子数组和子序列混淆；窗口必须连续；
2. 忘记从窗口状态中移除左端元素；
3. 只用 `if` 缩小一次，而实际需要 `while` 连续缩小；
4. 没有确认窗口条件是否具有单调性；
5. 计算长度时忘记 `+1`。

## 练习

### 1. 有序数组的两数之和

<ExerciseSolution>

使用左右指针。和太小只能移动左指针增大它，和太大只能移动右指针减小它；相等时返回下标。本文前半部分已有完整五语言实现。时间 `O(n)`、空间 `O(1)`，前提是数组有序。

#### 五语言实现

::: code-group

```java [Java]
public static int[] twoSumSorted(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;

    while (left < right) {
        long sum = (long) numbers[left] + numbers[right];
        if (sum == target) {
            return new int[]{left, right};
        }
        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{-1, -1};
}
```

```python [Python]
def two_sum_sorted(numbers: list[int], target: int) -> tuple[int, int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return left, right
        if total < target:
            left += 1
        else:
            right -= 1
    return -1, -1
```

```javascript [JavaScript]
function twoSumSorted(numbers, target) {
  let left = 0
  let right = numbers.length - 1

  while (left < right) {
    const sum = numbers[left] + numbers[right]
    if (sum === target) return [left, right]
    if (sum < target) {
      left += 1
    } else {
      right -= 1
    }
  }
  return [-1, -1]
}
```

```cpp [C++]
#include <utility>
#include <vector>

std::pair<int, int> twoSumSorted(
    const std::vector<int>& numbers,
    int target
) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;

    while (left < right) {
        long long sum =
            static_cast<long long>(numbers[left]) + numbers[right];
        if (sum == target) {
            return {left, right};
        }
        if (sum < target) {
            ++left;
        } else {
            --right;
        }
    }
    return {-1, -1};
}
```

```go [Go]
func twoSumSorted(numbers []int, target int) [2]int {
	left := 0
	right := len(numbers) - 1

	for left < right {
		sum := int64(numbers[left]) + int64(numbers[right])
		if sum == int64(target) {
			return [2]int{left, right}
		}
		if sum < int64(target) {
			left++
		} else {
			right--
		}
	}
	return [2]int{-1, -1}
}
```

:::


</ExerciseSolution>

### 2. 原地删除有序数组中的重复元素

<ExerciseSolution>

使用快慢指针：快指针寻找新值，慢指针维护去重结果的末尾。发现不同值时，把它写到慢指针位置并推进。完整五语言实现见[数组练习](/algorithm/02-linear-structures/arrays#_2-删除有序数组中的重复项)。时间 `O(n)`、空间 `O(1)`。

#### 五语言实现

::: code-group

```java [Java]
static int removeDuplicates(int[] numbers) {
    if (numbers.length == 0) return 0;
    int write = 1;
    for (int read = 1; read < numbers.length; read++) {
        if (numbers[read] != numbers[write - 1]) numbers[write++] = numbers[read];
    }
    return write;
}
```

```python [Python]
def remove_duplicates(numbers):
    if not numbers:
        return 0
    write = 1
    for read in range(1, len(numbers)):
        if numbers[read] != numbers[write - 1]:
            numbers[write] = numbers[read]
            write += 1
    return write
```

```javascript [JavaScript]
function removeDuplicates(numbers) {
  if (numbers.length === 0) return 0
  let write = 1
  for (let read = 1; read < numbers.length; read++) {
    if (numbers[read] !== numbers[write - 1]) numbers[write++] = numbers[read]
  }
  return write
}
```

```cpp [C++]
int removeDuplicates(std::vector<int>& numbers) {
    if (numbers.empty()) return 0;
    int write = 1;
    for (int read = 1; read < static_cast<int>(numbers.size()); ++read) {
        if (numbers[read] != numbers[write - 1]) numbers[write++] = numbers[read];
    }
    return write;
}
```

```go [Go]
func removeDuplicates(numbers []int) int {
	if len(numbers) == 0 { return 0 }
	write := 1
	for read := 1; read < len(numbers); read++ {
		if numbers[read] != numbers[write-1] {
			numbers[write] = numbers[read]
			write++
		}
	}
	return write
}
```

:::


</ExerciseSolution>

### 3. 无重复字符的最长子字符串

<ExerciseSolution>

窗口 `[left, right]` 保持字符不重复。用哈希表记录每个字符最近出现的位置；若当前字符已在窗口内，直接把 `left` 跳到旧位置后一格。每个字符最多进入和离开窗口一次，时间 `O(n)`、空间 `O(k)`。

`"abba"` 中第二个 `b` 让左边界跳到下标 `2`；最后的 `a` 旧位置已在窗口外，左边界不能倒退。

#### 五语言实现

::: code-group

```java [Java]
static int longestUnique(String s) {
    Map<Character, Integer> last = new HashMap<>(); int left = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (last.containsKey(c)) left = Math.max(left, last.get(c) + 1);
        last.put(c, right); best = Math.max(best, right - left + 1);
    }
    return best;
}
```

```python [Python]
def longest_unique(s):
    last, left, best = {}, 0, 0
    for right, char in enumerate(s):
        if char in last: left = max(left, last[char] + 1)
        last[char] = right; best = max(best, right - left + 1)
    return best
```

```javascript [JavaScript]
function longestUnique(s){const last=new Map();let left=0,best=0;[...s].forEach((c,r)=>{if(last.has(c))left=Math.max(left,last.get(c)+1);last.set(c,r);best=Math.max(best,r-left+1)});return best}
```

```cpp [C++]
int longestUnique(const std::string& s){std::unordered_map<char,int>last;int left=0,best=0;for(int r=0;r<(int)s.size();r++){if(last.count(s[r]))left=std::max(left,last[s[r]]+1);last[s[r]]=r;best=std::max(best,r-left+1);}return best;}
```

```go [Go]
func longestUnique(s string) int {r:=[]rune(s);last:=map[rune]int{};left,best:=0,0;for right,c:=range r{if p,ok:=last[c];ok&&p+1>left{left=p+1};last[c]=right;if right-left+1>best{best=right-left+1}};return best}
```

:::

</ExerciseSolution>

### 4. 最小覆盖子串

<ExerciseSolution>

先统计目标字符串需要的字符频率。右指针扩张窗口，满足全部需求后不断移动左指针缩小，并记录最短答案。不能只比较“不同字符数量”，因为目标可能需要重复字符，例如 `AABC` 需要两个 `A`。

两个指针都只向右移动，时间 `O(n+m)`，哈希表空间 `O(k)`。

#### 五语言实现

::: code-group

```java [Java]
static String minWindow(String s, String target) {
    if (target.isEmpty()) return "";
    Map<Character,Integer> need=new HashMap<>(),window=new HashMap<>();
    for(char c:target.toCharArray()) need.merge(c,1,Integer::sum);
    int left=0,formed=0,bestStart=0,bestLen=Integer.MAX_VALUE;
    for(int right=0;right<s.length();right++){
        char c=s.charAt(right);window.merge(c,1,Integer::sum);
        if(need.containsKey(c)&&window.get(c).equals(need.get(c))) formed++;
        while(formed==need.size()){
            if(right-left+1<bestLen){bestLen=right-left+1;bestStart=left;}
            char out=s.charAt(left++);
            if(need.containsKey(out)&&window.get(out).equals(need.get(out))) formed--;
            window.put(out,window.get(out)-1);
        }
    }
    return bestLen==Integer.MAX_VALUE?"":s.substring(bestStart,bestStart+bestLen);
}
```

```python [Python]
def min_window(s, target):
    if not target: return ""
    need, window, formed, left = Counter(target), defaultdict(int), 0, 0
    best = (float('inf'), 0)
    for right, char in enumerate(s):
        window[char] += 1
        if char in need and window[char] == need[char]: formed += 1
        while formed == len(need):
            if right-left+1 < best[0]: best = (right-left+1, left)
            out = s[left]; left += 1
            if out in need and window[out] == need[out]: formed -= 1
            window[out] -= 1
    return "" if best[0] == float('inf') else s[best[1]:best[1]+best[0]]
```

```javascript [JavaScript]
function minWindow(s,t){if(!t)return'';const need=new Map(),win=new Map();for(const c of t)need.set(c,(need.get(c)??0)+1);let left=0,formed=0,start=0,len=Infinity;for(let right=0;right<s.length;right++){const c=s[right];win.set(c,(win.get(c)??0)+1);if(need.has(c)&&win.get(c)===need.get(c))formed++;while(formed===need.size){if(right-left+1<len){len=right-left+1;start=left}const out=s[left++];if(need.has(out)&&win.get(out)===need.get(out))formed--;win.set(out,win.get(out)-1)}}return len===Infinity?'':s.slice(start,start+len)}
```

```cpp [C++]
std::string minWindow(const std::string&s,const std::string&t){if(t.empty())return"";std::unordered_map<char,int>need,win;for(char c:t)need[c]++;int left=0,formed=0,start=0,len=INT_MAX;for(int r=0;r<(int)s.size();r++){char c=s[r];win[c]++;if(need.count(c)&&win[c]==need[c])formed++;while(formed==(int)need.size()){if(r-left+1<len){len=r-left+1;start=left;}char out=s[left++];if(need.count(out)&&win[out]==need[out])formed--;win[out]--;}}return len==INT_MAX?"":s.substr(start,len);}
```

```go [Go]
func minWindow(s,t string) string {if len(t)==0{return""};need,win:=map[byte]int{},map[byte]int{};for i:=range t{need[t[i]]++};left,formed,start,best:=0,0,0,len(s)+1;for right:=range s{c:=s[right];win[c]++;if need[c]>0&&win[c]==need[c]{formed++};for formed==len(need){if right-left+1<best{best=right-left+1;start=left};out:=s[left];left++;if need[out]>0&&win[out]==need[out]{formed--};win[out]--}};if best>len(s){return""};return s[start:start+best]}
```

:::

</ExerciseSolution>

### 5. 固定窗口的最大平均值

<ExerciseSolution>

先求前 `k` 个元素之和。窗口每右移一步，只减去离开的元素并加上进入的元素，然后更新最大和；最后除以 `k`。不必每个窗口重新求和。

时间 `O(n)`、空间 `O(1)`。必须保证 `1 <= k <= n`。

#### 五语言实现

::: code-group

```java [Java]
static double maxAverage(int[] a,int k){
    long sum=0;for(int i=0;i<k;i++)sum+=a[i];long best=sum;
    for(int i=k;i<a.length;i++){sum+=a[i]-a[i-k];best=Math.max(best,sum);}return (double)best/k;
}
```

```python [Python]
def max_average(a, k):
    total = best = sum(a[:k])
    for i in range(k, len(a)):
        total += a[i] - a[i-k]; best = max(best, total)
    return best / k
```

```javascript [JavaScript]
function maxAverage(a,k){let sum=0;for(let i=0;i<k;i++)sum+=a[i];let best=sum;for(let i=k;i<a.length;i++){sum+=a[i]-a[i-k];best=Math.max(best,sum)}return best/k}
```

```cpp [C++]
double maxAverage(const std::vector<int>&a,int k){long long sum=0;for(int i=0;i<k;i++)sum+=a[i];long long best=sum;for(int i=k;i<(int)a.size();i++){sum+=a[i]-a[i-k];best=std::max(best,sum);}return (double)best/k;}
```

```go [Go]
func maxAverage(a []int,k int) float64 {sum:=0;for i:=0;i<k;i++{sum+=a[i]};best:=sum;for i:=k;i<len(a);i++{sum+=a[i]-a[i-k];if sum>best{best=sum}};return float64(best)/float64(k)}
```

:::

</ExerciseSolution>

### 6. 和至少为目标值的最短连续子数组

<ExerciseSolution>

当数组元素全部为正数时，右边界扩大只会让和增加；一旦达到目标，就持续缩小左边界寻找更短答案。本文已有完整伪代码和 Python 实现，下面补齐其余语言。

时间 `O(n)`、空间 `O(1)`。若允许负数，窗口和不再单调，普通滑动窗口会漏解。

#### 五语言实现

::: code-group

```java [Java]
static int minSubarrayLen(int target,int[] a){
    int left=0,best=Integer.MAX_VALUE;long sum=0;
    for(int right=0;right<a.length;right++){sum+=a[right];while(sum>=target){best=Math.min(best,right-left+1);sum-=a[left++];}}
    return best==Integer.MAX_VALUE?0:best;
}
```

```python [Python]
def min_subarray_len(target, a):
    left = total = 0; best = len(a) + 1
    for right, value in enumerate(a):
        total += value
        while total >= target: best = min(best, right-left+1); total -= a[left]; left += 1
    return 0 if best > len(a) else best
```

```javascript [JavaScript]
function minSubarrayLen(target,a){let left=0,sum=0,best=Infinity;for(let right=0;right<a.length;right++){sum+=a[right];while(sum>=target){best=Math.min(best,right-left+1);sum-=a[left++]}}return best===Infinity?0:best}
```

```cpp [C++]
int minSubarrayLen(int target,const std::vector<int>&a){int left=0,best=INT_MAX;long long sum=0;for(int r=0;r<(int)a.size();r++){sum+=a[r];while(sum>=target){best=std::min(best,r-left+1);sum-=a[left++];}}return best==INT_MAX?0:best;}
```

```go [Go]
func minSubarrayLen(target int,a []int) int {left,sum,best:=0,0,len(a)+1;for right,v:=range a{sum+=v;for sum>=target{if right-left+1<best{best=right-left+1};sum-=a[left];left++}};if best>len(a){return 0};return best}
```

:::

</ExerciseSolution>
