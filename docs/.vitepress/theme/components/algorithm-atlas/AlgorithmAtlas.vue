<script setup lang="ts">
import { algorithmCategories } from '../../data/home-content'
</script>

<template>
  <section class="algorithm-atlas">
    <div class="algorithm-atlas__inner magazine-section">
      <header class="algorithm-atlas__header">
        <p class="section-kicker">THE COMPLETE ATLAS · 完整知识图谱</p>
        <h2>一张地图，<br><i>看见算法全貌。</i></h2>
        <p>
          主线覆盖基础、面试、竞赛与工程算法；高级和专题内容不会阻挡初学主线，
          但始终在地图中保留位置。
        </p>
      </header>

      <div class="algorithm-atlas__list">
        <a
          v-for="category in algorithmCategories"
          :key="category.number"
          :href="category.route"
          class="atlas-row"
          :data-accent="category.accent"
        >
          <span class="atlas-row__number">{{ category.number }}</span>
          <div class="atlas-row__main">
            <h3>{{ category.title }}</h3>
            <p>{{ category.summary }}</p>
          </div>
          <div class="atlas-row__meta">
            <span>{{ category.level }}</span>
            <strong>{{ category.topics }}+</strong>
            <i aria-hidden="true">↗</i>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.algorithm-atlas {
  margin: 9rem 0;
  background: var(--mag-ink);
  color: var(--mag-paper);
}

.algorithm-atlas__inner {
  padding-block: 8rem;
}

.algorithm-atlas__header {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem 4rem;
  margin-bottom: 4rem;
}

.algorithm-atlas__header .section-kicker {
  grid-column: 1 / -1;
  color: color-mix(in srgb, var(--mag-paper) 56%, transparent);
}

.algorithm-atlas__header h2 {
  margin: 0;
  color: var(--mag-paper);
  font-family: var(--mag-display);
  font-size: clamp(3.1rem, 7vw, 6.6rem);
  font-weight: 520;
  letter-spacing: -0.06em;
  line-height: 0.9;
}

.algorithm-atlas__header h2 i {
  color: var(--mag-amber);
  font-weight: 450;
}

.algorithm-atlas__header > p {
  max-width: 520px;
  align-self: end;
  margin: 0;
  color: color-mix(in srgb, var(--mag-paper) 66%, transparent);
  line-height: 1.9;
}

.algorithm-atlas__list {
  border-top: 1px solid color-mix(in srgb, var(--mag-paper) 20%, transparent);
}

.atlas-row {
  display: grid;
  grid-template-columns: 70px 1fr auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--mag-paper) 20%, transparent);
  color: var(--mag-paper);
  transition:
    padding 340ms var(--mag-ease),
    background 340ms var(--mag-ease);
}

.atlas-row:hover {
  padding-inline: 1.25rem;
  background: color-mix(in srgb, var(--mag-paper) 6%, transparent);
}

.atlas-row__number {
  color: var(--mag-amber);
  font-family: var(--mag-display);
  font-size: 1.1rem;
  font-style: italic;
}

.atlas-row__main h3 {
  margin: 0 0 0.35rem;
  font-family: var(--mag-display);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 520;
  letter-spacing: -0.025em;
}

.atlas-row__main p {
  margin: 0;
  color: color-mix(in srgb, var(--mag-paper) 58%, transparent);
  font-size: 0.85rem;
}

.atlas-row__meta {
  display: grid;
  grid-template-columns: 64px 72px 24px;
  align-items: center;
  gap: 1rem;
  font-size: 0.72rem;
  text-align: right;
}

.atlas-row__meta strong {
  font-family: var(--mag-display);
  font-size: 1.35rem;
}

.atlas-row__meta i {
  font-size: 1.2rem;
  font-style: normal;
  transition: transform 240ms ease;
}

.atlas-row:hover .atlas-row__meta i {
  transform: rotate(45deg);
}

@media (max-width: 720px) {
  .algorithm-atlas__inner {
    padding-block: 5.5rem;
  }

  .algorithm-atlas__header {
    grid-template-columns: 1fr;
  }

  .atlas-row {
    grid-template-columns: 42px 1fr;
  }

  .atlas-row__main p,
  .atlas-row__meta span {
    display: none;
  }

  .atlas-row__meta {
    grid-column: 2;
    grid-template-columns: 1fr 24px;
    justify-self: stretch;
    text-align: left;
  }
}
</style>
