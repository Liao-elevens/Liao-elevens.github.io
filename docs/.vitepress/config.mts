import { defineConfig } from 'vitepress'

const algorithmSidebar = [
  {
    text: '开始学习',
    items: [
      { text: '知识库总览', link: '/algorithm/' },
      { text: '学习路线', link: '/roadmap/' },
      { text: '零基础入门', link: '/algorithm/00-foundations/zero-to-algorithms' },
      { text: '解题方法', link: '/algorithm/00-foundations/problem-solving-guide' },
      { text: '学习资源', link: '/resources/' },
      { text: '完整度矩阵', link: '/coverage' },
      { text: '算法术语表', link: '/glossary' }
    ]
  },
  {
    text: '01 · 基础与分析',
    collapsed: false,
    items: [
      { text: '编程与数学前置', link: '/algorithm/00-foundations/' },
      { text: '算法到底是什么', link: '/algorithm/00-foundations/zero-to-algorithms' },
      { text: '四语言算法基础', link: '/algorithm/00-foundations/four-language-basics' },
      { text: '从读题到调试', link: '/algorithm/00-foundations/problem-solving-guide' },
      { text: '复杂度与正确性', link: '/algorithm/01-complexity/' },
      { text: '认识 Big O', link: '/algorithm/01-complexity/big-o' }
    ]
  },
  {
    text: '02 · 核心数据结构',
    collapsed: false,
    items: [
      { text: '线性结构总览', link: '/algorithm/02-linear-structures/' },
      { text: '数组', link: '/algorithm/02-linear-structures/arrays' },
      { text: '链表、栈与队列', link: '/algorithm/02-linear-structures/linked-stack-queue' },
      { text: '哈希表与集合', link: '/algorithm/02-linear-structures/hash-table' },
      { text: '树与堆', link: '/algorithm/06-trees-heaps/' },
      { text: '图', link: '/algorithm/07-graphs/' },
      { text: '高级数据结构', link: '/algorithm/12-advanced-structures/' }
    ]
  },
  {
    text: '03 · 核心算法方法',
    collapsed: false,
    items: [
      { text: '排序与查找', link: '/algorithm/03-sorting-searching/' },
      { text: '基础排序', link: '/algorithm/03-sorting-searching/basic-sorting' },
      { text: '二分查找', link: '/algorithm/03-sorting-searching/binary-search' },
      { text: '常用技巧', link: '/algorithm/04-techniques/' },
      { text: '前缀和', link: '/algorithm/04-techniques/prefix-sum' },
      { text: '双指针与滑动窗口', link: '/algorithm/04-techniques/two-pointers-window' },
      { text: '递归、搜索与回溯', link: '/algorithm/05-recursion-search/' },
      { text: '递归与回溯入门', link: '/algorithm/05-recursion-search/recursion-backtracking' },
      { text: '二叉树遍历', link: '/algorithm/06-trees-heaps/binary-tree-traversal' },
      { text: '图的 BFS', link: '/algorithm/07-graphs/bfs-traversal' },
      { text: '贪心', link: '/algorithm/09-greedy/' },
      { text: '动态规划', link: '/algorithm/10-dynamic-programming/' },
      { text: '动态规划入门', link: '/algorithm/10-dynamic-programming/dp-fundamentals' }
    ]
  },
  {
    text: '04 · 专题与进阶',
    collapsed: true,
    items: [
      { text: '字符串算法', link: '/algorithm/08-strings/' },
      { text: '数学与数论', link: '/algorithm/11-math/' },
      { text: '计算几何', link: '/algorithm/13-computational-geometry/' },
      { text: '随机与近似算法', link: '/algorithm/14-randomized-approximation/' },
      { text: '工程与海量数据', link: '/algorithm/15-engineering/' },
      { text: '算法理论', link: '/algorithm/16-theory/' }
    ]
  }
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'Liao · Learning Notes',
  titleTemplate: ':title · Liao Learning Notes',
  description: '从零理解算法：Java、Python、JavaScript、C++ 四语言对照的完整算法知识库。',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://liao-elevens.github.io'
  },
  head: [
    ['meta', { name: 'theme-color', content: '#f5f2e9' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  themeConfig: {
    logo: {
      light: '/brand-mark-light.svg',
      dark: '/brand-mark-dark.svg',
      alt: 'Liao Learning Notes'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '算法知识库', link: '/algorithm/', activeMatch: '^/algorithm/' },
      { text: '学习路线', link: '/roadmap/' },
      { text: '学习资源', link: '/resources/' },
      { text: '前端', link: '/frontend/' },
      { text: '文章', link: '/blog/' },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/algorithm/': algorithmSidebar,
      '/roadmap/': algorithmSidebar,
      '/resources/': algorithmSidebar,
      '/frontend/': [
        {
          text: '前端学习',
          items: [{ text: '前端专区', link: '/frontend/' }]
        }
      ],
      '/blog/': [
        {
          text: '学习文章',
          items: [
            { text: '文章首页', link: '/blog/' },
            { text: '为什么建立这座知识库', link: '/blog/why-this-knowledge-base' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liao-elevens/Liao-elevens.github.io' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索知识库',
            buttonAriaLabel: '搜索知识库'
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/Liao-elevens/Liao-elevens.github.io/edit/ai_knowledge/docs/:path',
      text: '在 GitHub 上完善本页'
    },
    footer: {
      message: '用通俗的例子理解算法，用四种语言验证同一种思想。',
      copyright: '© 2026 Liao · Learning Notes'
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '切换为浅色模式',
    darkModeSwitchTitle: '切换为深色模式'
  }
})
