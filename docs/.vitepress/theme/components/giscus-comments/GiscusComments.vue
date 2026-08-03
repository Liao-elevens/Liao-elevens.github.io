<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { giscusSiteConfig, isGiscusConfigured } from './config'
import type {
  CommentFrontmatter,
  GiscusTheme,
  GiscusThemeMessage
} from './types'

const { frontmatter, isDark } = useData()
const route = useRoute()
const container = ref<HTMLElement | null>(null)

const commentSettings = computed(
  () => frontmatter.value as CommentFrontmatter
)
const isEnabled = computed(() => commentSettings.value.comments === true)
const commentId = computed(
  () => commentSettings.value.commentId?.trim() || route.path
)
const isConfigured = isGiscusConfigured(giscusSiteConfig)

function currentTheme(): GiscusTheme {
  return isDark.value ? 'dark_dimmed' : 'light'
}

function clearComments(): void {
  container.value?.replaceChildren()
}

function mountComments(): void {
  if (!container.value || !isEnabled.value || !isConfigured) return

  clearComments()
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.dataset.repo = giscusSiteConfig.repo
  script.dataset.repoId = giscusSiteConfig.repoId
  script.dataset.category = giscusSiteConfig.category
  script.dataset.categoryId = giscusSiteConfig.categoryId
  script.dataset.mapping = 'specific'
  script.dataset.term = commentId.value
  script.dataset.strict = '1'
  script.dataset.reactionsEnabled = '1'
  script.dataset.emitMetadata = '0'
  script.dataset.inputPosition = 'top'
  script.dataset.theme = currentTheme()
  script.dataset.lang = 'zh-CN'
  script.dataset.loading = 'lazy'
  container.value.append(script)
}

function syncTheme(): void {
  const frame = container.value?.querySelector<HTMLIFrameElement>('.giscus-frame')
  if (!frame?.contentWindow) return

  const message: GiscusThemeMessage = {
    giscus: {
      setConfig: {
        theme: currentTheme()
      }
    }
  }
  frame.contentWindow.postMessage(message, 'https://giscus.app')
}

watch(
  () => route.path,
  async () => {
    await nextTick()
    mountComments()
  }
)
watch(isDark, syncTheme)

onMounted(mountComments)
onBeforeUnmount(clearComments)
</script>

<template>
  <section v-if="isEnabled" class="giscus-comments" aria-labelledby="comments-title">
    <header class="giscus-comments__header">
      <p>DISCUSSION · 学习交流</p>
      <h2 id="comments-title">留下问题，也留下你的思路</h2>
      <span>评论会公开保存在 GitHub Discussions；发表内容需要登录 GitHub。</span>
    </header>

    <div v-if="isConfigured" ref="container" class="giscus-comments__frame"></div>
    <div v-else class="giscus-comments__pending" role="status">
      <strong>评论功能正在等待仓库配置</strong>
      <span>启用 GitHub Discussions 并创建评论分类后，这里会自动显示评论框。</span>
    </div>
  </section>
</template>

<style scoped>
.giscus-comments {
  margin-top: 4.5rem;
  border-top: 1px solid var(--mag-line);
  padding-top: 1.75rem;
}

.giscus-comments__header {
  margin-bottom: 1.5rem;
}

.giscus-comments__header p {
  margin: 0 0 0.45rem;
  color: var(--mag-coral);
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.giscus-comments__header h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: clamp(1.55rem, 3vw, 2.2rem);
}

.giscus-comments__header span {
  display: block;
  margin-top: 0.55rem;
  color: var(--mag-muted);
  font-size: 0.82rem;
  line-height: 1.65;
}

.giscus-comments__frame {
  min-height: 180px;
}

.giscus-comments__pending {
  display: grid;
  gap: 0.35rem;
  border: 1px dashed var(--mag-line);
  padding: 1.15rem;
  background: color-mix(in srgb, var(--mag-cobalt) 5%, transparent);
}

.giscus-comments__pending strong {
  font-size: 0.9rem;
}

.giscus-comments__pending span {
  color: var(--mag-muted);
  font-size: 0.8rem;
  line-height: 1.65;
}
</style>
