import type {
  AlgorithmCategory,
  EditorialFeature,
  LearningStage
} from '../types/content'

export const algorithmCategories: AlgorithmCategory[] = [
  {
    number: '01',
    title: '基础与复杂度',
    summary: '从循环、递归、数学语言到 Big O 与正确性证明。',
    route: '/algorithm/00-foundations/',
    level: '前置',
    topics: 28,
    accent: 'amber'
  },
  {
    number: '02',
    title: '数据结构',
    summary: '数组、链表、哈希、树、堆、图与高级索引结构。',
    route: '/algorithm/02-linear-structures/',
    level: '核心',
    topics: 54,
    accent: 'cobalt'
  },
  {
    number: '03',
    title: '算法技巧',
    summary: '排序、二分、双指针、窗口、前缀和与单调结构。',
    route: '/algorithm/03-sorting-searching/',
    level: '核心',
    topics: 61,
    accent: 'coral'
  },
  {
    number: '04',
    title: '搜索与图论',
    summary: 'DFS、BFS、回溯、最短路、网络流与图的结构性质。',
    route: '/algorithm/05-recursion-search/',
    level: '进阶',
    topics: 49,
    accent: 'mint'
  },
  {
    number: '05',
    title: '贪心与动态规划',
    summary: '从状态定义与选择证明，进入背包、区间和树形 DP。',
    route: '/algorithm/09-greedy/',
    level: '进阶',
    topics: 47,
    accent: 'violet'
  },
  {
    number: '06',
    title: '数学与专题',
    summary: '字符串、数论、计算几何、随机算法与工程场景。',
    route: '/algorithm/08-strings/',
    level: '专题',
    topics: 73,
    accent: 'rose'
  }
]

export const editorialFeatures: EditorialFeature[] = [
  {
    eyebrow: '本期主专题',
    title: '算法到底是什么？从生活步骤开始',
    summary: '不从术语和模板开始：先用泡茶、购物车和寻找最大值理解输入、输出、变量与循环。',
    route: '/algorithm/00-foundations/zero-to-algorithms',
    meta: '零基础 · 第一课'
  },
  {
    eyebrow: '方法论',
    title: '一套算法，五种语言',
    summary: '算法思想只有一套，Java、Python、JavaScript、C++、Go 只是不同的表达工具。',
    route: '/algorithm/00-foundations/four-language-basics',
    meta: '语言对照 · 必读'
  },
  {
    eyebrow: '学习资源',
    title: '动画、课程和题库应该怎么选',
    summary: '按学习阶段筛选 Hello 算法、VisuAlgo、OI Wiki、MIT 课程与四语言官方文档。',
    route: '/resources/',
    meta: '精选链接 · 2026 核验'
  }
]

export const learningStages: LearningStage[] = [
  {
    marker: 'A',
    title: '读懂问题',
    summary: '用自然语言复述输入、输出、限制与目标。',
    route: '/algorithm/00-foundations/'
  },
  {
    marker: 'B',
    title: '手工模拟',
    summary: '先让小数据在纸上走一遍，再提炼重复步骤。',
    route: '/roadmap/#统一学习闭环'
  },
  {
    marker: 'C',
    title: '写出伪代码',
    summary: '暂时忘记语言语法，只保留算法真正需要的动作。',
    route: '/algorithm/00-foundations/four-language-basics'
  },
  {
    marker: 'D',
    title: '五语言验证',
    summary: '对照容器、类型和边界差异，确认思想保持一致。',
    route: '/coverage'
  }
]
