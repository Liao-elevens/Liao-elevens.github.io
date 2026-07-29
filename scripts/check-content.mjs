import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = join(projectRoot, 'docs')
const ignoredDirectories = new Set(['.vitepress', 'public'])
const markdownFiles = []
const problems = []

function collectMarkdown(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignoredDirectories.has(entry)) continue

    const absolutePath = join(directory, entry)
    const metadata = statSync(absolutePath)

    if (metadata.isDirectory()) {
      collectMarkdown(absolutePath)
    } else if (extname(entry) === '.md') {
      markdownFiles.push(absolutePath)
    }
  }
}

function resolveMarkdownTarget(sourceFile, rawTarget) {
  const targetWithoutAnchor = rawTarget.split('#')[0].split('?')[0]
  if (!targetWithoutAnchor) return null

  const decodedTarget = decodeURIComponent(targetWithoutAnchor)
  const baseTarget = decodedTarget.startsWith('/')
    ? join(docsRoot, decodedTarget.slice(1))
    : resolve(dirname(sourceFile), decodedTarget)

  const candidates = [
    baseTarget,
    `${baseTarget}.md`,
    join(baseTarget, 'index.md')
  ]

  return candidates.find((candidate) => existsSync(candidate)) ?? baseTarget
}

collectMarkdown(docsRoot)

for (const file of markdownFiles) {
  const content = readFileSync(file, 'utf8')

  if (content.trim().length < 40) {
    problems.push(`${relative(projectRoot, file)} 内容过少`)
  }

  const markdownLinkPattern = /!?\[[^\]]*]\(([^)]+)\)/g
  for (const match of content.matchAll(markdownLinkPattern)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, '')

    if (
      rawTarget.startsWith('http://') ||
      rawTarget.startsWith('https://') ||
      rawTarget.startsWith('mailto:') ||
      rawTarget.startsWith('#')
    ) {
      continue
    }

    const resolvedTarget = resolveMarkdownTarget(file, rawTarget)
    if (resolvedTarget && !existsSync(resolvedTarget)) {
      problems.push(
        `${relative(projectRoot, file)} 存在失效链接：${rawTarget}`
      )
    }
  }
}

const fourLanguageArticles = [
  'docs/algorithm/00-foundations/four-language-basics.md',
  'docs/algorithm/00-foundations/problem-solving-guide.md',
  'docs/algorithm/02-linear-structures/arrays.md',
  'docs/algorithm/02-linear-structures/hash-table.md',
  'docs/algorithm/03-sorting-searching/basic-sorting.md',
  'docs/algorithm/03-sorting-searching/binary-search.md',
  'docs/algorithm/04-techniques/prefix-sum.md',
  'docs/algorithm/04-techniques/two-pointers-window.md',
  'docs/algorithm/05-recursion-search/recursion-backtracking.md',
  'docs/algorithm/06-trees-heaps/binary-tree-traversal.md',
  'docs/algorithm/07-graphs/bfs-traversal.md',
  'docs/algorithm/10-dynamic-programming/dp-fundamentals.md'
]

const requiredCodeFences = ['```java', '```python', '```javascript', '```cpp']
const diagramFiles = [
  'docs/public/diagrams/learning-roadmap.svg',
  'docs/public/diagrams/learning-loop.svg',
  'docs/public/diagrams/find-maximum-flow.svg',
  'docs/public/diagrams/data-structure-decision.svg'
]

for (const article of fourLanguageArticles) {
  const absolutePath = join(projectRoot, article)
  if (!existsSync(absolutePath)) {
    problems.push(`${article} 不存在`)
    continue
  }

  const content = readFileSync(absolutePath, 'utf8')
  for (const codeFence of requiredCodeFences) {
    if (!content.includes(codeFence)) {
      problems.push(`${article} 缺少 ${codeFence.slice(3)} 示例`)
    }
  }
}

for (const diagram of diagramFiles) {
  if (!existsSync(join(projectRoot, diagram))) {
    problems.push(`${diagram} 不存在`)
  }
}

for (const file of markdownFiles) {
  const content = readFileSync(file, 'utf8')
  if (content.includes('```mermaid')) {
    problems.push(
      `${relative(projectRoot, file)} 包含未转换的 Mermaid 代码块`
    )
  }
}

if (problems.length > 0) {
  console.error(`内容检查失败，共 ${problems.length} 项：`)
  for (const problem of problems) console.error(`- ${problem}`)
  process.exit(1)
}

console.log(
  `内容检查通过：${markdownFiles.length} 篇 Markdown，内部链接与四语言核心示例均有效。`
)
