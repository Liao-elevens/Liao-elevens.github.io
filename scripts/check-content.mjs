import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = join(projectRoot, 'docs')
const ignoredDirectories = new Set(['.vitepress', 'public'])
const markdownFiles = []
const problems = []
const commentIds = new Map()
let exerciseCount = 0
let solutionCount = 0

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

  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/u)?.[1] ?? ''
  const commentsEnabled = /^comments:\s*true\s*$/mu.test(frontmatter)
  const commentId = frontmatter.match(/^commentId:\s*(\S+)\s*$/mu)?.[1]

  if (commentsEnabled && !commentId) {
    problems.push(`${relative(projectRoot, file)} 已启用评论但缺少 commentId`)
  }

  if (commentId) {
    const previousFile = commentIds.get(commentId)
    if (previousFile) {
      problems.push(
        `${relative(projectRoot, file)} 与 ${previousFile} 使用了重复 commentId：${commentId}`
      )
    } else {
      commentIds.set(commentId, relative(projectRoot, file))
    }
  }

  const openingSolutions = content.match(/<ExerciseSolution(?:\s|>)/gu) ?? []
  const closingSolutions = content.match(/<\/ExerciseSolution>/gu) ?? []
  solutionCount += openingSolutions.length

  if (openingSolutions.length !== closingSolutions.length) {
    problems.push(
      `${relative(projectRoot, file)} 的 ExerciseSolution 开始与结束标签数量不一致`
    )
  }

  if (/<ExerciseSolution[^>]*\sopen(?:\s|=|>)/u.test(content)) {
    problems.push(`${relative(projectRoot, file)} 存在默认展开的练习答案`)
  }

  const lines = content.split('\n')
  for (let index = 0; index < lines.length; index++) {
    if (!/^## (练习|自测|自测练习)$/u.test(lines[index])) continue

    let sectionEnd = index + 1
    while (sectionEnd < lines.length && !/^## /u.test(lines[sectionEnd])) {
      sectionEnd++
    }

    const sectionLines = lines.slice(index + 1, sectionEnd)
    const headingIndexes = []
    for (let offset = 0; offset < sectionLines.length; offset++) {
      if (/^### /u.test(sectionLines[offset])) headingIndexes.push(offset)
    }

    for (let headingIndex = 0; headingIndex < headingIndexes.length; headingIndex++) {
      const start = headingIndexes[headingIndex]
      const end = headingIndexes[headingIndex + 1] ?? sectionLines.length
      const heading = sectionLines[start].replace(/^###\s+/u, '')
      const answerBlock = sectionLines.slice(start + 1, end).join('\n')

      if (/^\d+\./u.test(heading)) exerciseCount++

      if (!answerBlock.includes('<ExerciseSolution')) {
        problems.push(
          `${relative(projectRoot, file)} 的“${heading}”缺少折叠解答`
        )
        continue
      }

      const readableAnswer = answerBlock
        .replace(/<\/?ExerciseSolution[^>]*>/gu, '')
        .replace(/[`#*:|>-]/gu, '')
        .trim()
      if (readableAnswer.length < 60) {
        problems.push(
          `${relative(projectRoot, file)} 的“${heading}”解答内容过少`
        )
      }
    }
  }
}

if (exerciseCount < 84) {
  problems.push(`练习完整度下降：当前只识别到 ${exerciseCount} 道，基线为 84 道`)
}

const fiveLanguageArticles = [
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

const requiredCodeFences = [
  '```java',
  '```python',
  '```javascript',
  '```cpp',
  '```go'
]
const diagramFiles = [
  'docs/public/diagrams/learning-roadmap.svg',
  'docs/public/diagrams/learning-loop.svg',
  'docs/public/diagrams/find-maximum-flow.svg',
  'docs/public/diagrams/data-structure-decision.svg'
]

for (const article of fiveLanguageArticles) {
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

  const codeGroups = content.split('::: code-group').slice(1)
  for (const [index, codeGroup] of codeGroups.entries()) {
    const groupBody = codeGroup.split('\n:::')[0]
    if (!groupBody.includes('```go')) {
      problems.push(`${article} 的第 ${index + 1} 个语言切换组缺少 Go`)
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
  `内容检查通过：${markdownFiles.length} 篇 Markdown，${exerciseCount} 道练习、${solutionCount} 个折叠解答，内部链接与五语言核心示例均有效。`
)
