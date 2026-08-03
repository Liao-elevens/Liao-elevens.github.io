# Liao · Learning Notes

一个面向算法零基础学习者的个人 GitHub Pages 博客：

- 清爽杂志风视觉；
- Java、Python、JavaScript、C++、Go 五语言对照；
- 从通俗实例、手工模拟和伪代码开始；
- 84 道现有练习均提供默认收起的完整解析，其中 54 道编程练习在题内直接提供五语言实现；
- 覆盖基础、面试、竞赛、数学、理论与工程算法；
- Markdown 作为唯一内容源；
- 推送到 `ai_knowledge` 后自动构建 GitHub Pages。

## 本地阅读

```text
npm install
npm run dev
```

## 完整检查

```text
npm run check
```

## 内容结构


| 路径                 | 用途               |
| ------------------ | ---------------- |
| `docs/algorithm/`  | 算法知识库            |
| `docs/roadmap/`    | 依赖式学习路线          |
| `docs/resources/`  | 第三方课程、动画、题库与文档导航 |
| `docs/blog/`       | 学习文章与个人记录        |
| `docs/frontend/`   | 前端知识预留区          |
| `docs/coverage.md` | 知识库完成度           |
| `templates/`       | 新内容模板            |
| `scripts/`         | 内容质量检查           |

## 评论系统

文章评论使用 giscus，内容保存在仓库的 GitHub Discussions 中。代码已经完成评论页筛选、稳定文章 ID、懒加载和明暗主题同步。

仓库已启用 Discussions，并创建 Announcements 类型的“学习交流”分类。giscus 仅获准访问 `Liao-elevens/Liao-elevens.github.io`，公开的仓库与分类标识已写入 `docs/.vitepress/theme/components/giscus-comments/config.ts`。

每篇开启评论的文章通过稳定的 `commentId` 映射到独立 Discussion；第一次有人发表评论时，giscus 会自动创建对应讨论，不需要预先逐篇建帖。


## GitHub Pages

部署流程位于 `.github/workflows/deploy-pages.yml`。在仓库设置的 Pages 页面中，将发布来源选择为 **GitHub Actions** 后，每次推送 `ai_knowledge` 分支都会自动发布。
