<script setup lang="ts">
import AlgorithmAtlas from '../algorithm-atlas/AlgorithmAtlas.vue'
import EditorialGrid from '../editorial-grid/EditorialGrid.vue'
import LearningMethod from '../learning-method/LearningMethod.vue'
</script>

<template>
  <main class="home-sections">
    <div class="home-sections__ticker" aria-label="知识库特点">
      <div class="home-sections__ticker-track">
        <span>算法思想</span><i>×</i>
        <span>通俗实例</span><i>×</i>
        <span>五语言对照</span><i>×</i>
        <span>复杂度分析</span><i>×</i>
        <span>边界与错题</span><i>×</i>
        <span>算法思想</span><i>×</i>
        <span>通俗实例</span><i>×</i>
        <span>五语言对照</span><i>×</i>
      </div>
    </div>

    <EditorialGrid />
    <AlgorithmAtlas />
    <LearningMethod />

    <section class="home-sections__manifesto">
      <p class="section-kicker">THE MANIFESTO · 学习宣言</p>
      <blockquote>
        <span>不把答案背进脑中，</span>
        <em>把解决问题的方法留下来。</em>
      </blockquote>
      <p>
        每篇内容都从生活化实例开始，经过手工模拟与伪代码，最后落到
        Java、Python、JavaScript、C++、Go 的可验证实现。
      </p>
      <a class="magazine-link" href="/roadmap/">
        查看完整学习路线
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  </main>
</template>

<style scoped>
.home-sections {
  overflow: hidden;
}

.home-sections__ticker {
  margin: 1rem 0 7rem;
  border-block: 1px solid var(--mag-line);
  overflow: hidden;
  color: var(--mag-ink);
  font-family: var(--mag-display);
  font-size: 0.78rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.home-sections__ticker-track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: 1.6rem;
  padding: 0.95rem 0;
  animation: ticker-shift 28s linear infinite;
}

.home-sections__ticker i {
  color: var(--mag-coral);
  font-style: normal;
}

.home-sections__manifesto {
  max-width: 1180px;
  margin: 0 auto;
  padding: 9rem 1.5rem 10rem;
  text-align: center;
}

.home-sections__manifesto blockquote {
  max-width: 920px;
  margin: 2rem auto 1.7rem;
  border: 0;
  color: var(--mag-ink);
  font-family: var(--mag-display);
  font-size: clamp(2.3rem, 4.3vw, 4.4rem);
  font-weight: 520;
  letter-spacing: -0.04em;
  line-height: 1.08;
  line-break: strict;
  text-wrap: balance;
}

.home-sections__manifesto blockquote span,
.home-sections__manifesto blockquote em {
  display: block;
  white-space: nowrap;
}

.home-sections__manifesto blockquote em {
  color: var(--mag-coral);
  font-style: italic;
}

.home-sections__manifesto > p:not(.section-kicker) {
  max-width: 960px;
  margin: 0 auto 2rem;
  color: var(--mag-muted);
  font-size: 1rem;
  line-height: 1.9;
  line-break: strict;
  text-wrap: pretty;
}

@media (max-width: 760px) {
  .home-sections__manifesto {
    padding-inline: 1rem;
  }

  .home-sections__manifesto blockquote {
    font-size: clamp(1.9rem, 7.5vw, 2.2rem);
  }
}

@keyframes ticker-shift {
  to {
    transform: translateX(-45%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-sections__ticker-track {
    animation: none;
  }
}
</style>
