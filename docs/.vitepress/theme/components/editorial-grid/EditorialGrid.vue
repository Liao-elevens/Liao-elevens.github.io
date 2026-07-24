<script setup lang="ts">
import { editorialFeatures } from '../../data/home-content'
</script>

<template>
  <section class="editorial-grid magazine-section">
    <header class="magazine-section__header">
      <div>
        <p class="section-kicker">CURATED FOR BEGINNERS · 本期精选</p>
        <h2>先读懂，再写出。</h2>
      </div>
      <p>
        从最值得优先理解的文章开始。每个主题都包含直觉、模拟、伪代码、
        四语言实现、复杂度与易错点。
      </p>
    </header>

    <div class="editorial-grid__issues">
      <a
        v-for="(feature, index) in editorialFeatures"
        :key="feature.route"
        :href="feature.route"
        class="editorial-card"
        :class="{ 'editorial-card--lead': index === 0 }"
      >
        <div class="editorial-card__topline">
          <span>{{ feature.eyebrow }}</span>
          <span>0{{ index + 1 }}</span>
        </div>
        <div class="editorial-card__graphic" aria-hidden="true">
          <span>{{ index === 0 ? '½' : index === 1 ? '{ }' : '→' }}</span>
          <i />
        </div>
        <div class="editorial-card__copy">
          <p>{{ feature.meta }}</p>
          <h3>{{ feature.title }}</h3>
          <span>{{ feature.summary }}</span>
        </div>
        <b aria-hidden="true">阅读专题 ↗</b>
      </a>
    </div>
  </section>
</template>

<style scoped>
.editorial-grid__issues {
  display: grid;
  grid-template-columns: 1.45fr 1fr 1fr;
  gap: 1rem;
}

.editorial-card {
  position: relative;
  display: flex;
  min-height: 490px;
  flex-direction: column;
  padding: 1.25rem;
  border: 1px solid var(--mag-line);
  background: color-mix(in srgb, var(--mag-paper) 90%, transparent);
  color: var(--mag-ink);
  overflow: hidden;
  transition:
    transform 420ms var(--mag-ease),
    box-shadow 420ms var(--mag-ease),
    border-color 420ms var(--mag-ease);
}

.editorial-card:hover {
  border-color: var(--mag-ink);
  box-shadow: 0 28px 70px color-mix(in srgb, var(--mag-ink) 12%, transparent);
  transform: translateY(-8px);
}

.editorial-card__topline {
  display: flex;
  justify-content: space-between;
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.12em;
}

.editorial-card__graphic {
  position: relative;
  display: grid;
  min-height: 210px;
  flex: 1;
  place-items: center;
  color: var(--mag-coral);
  font-family: var(--mag-display);
  font-size: clamp(5rem, 10vw, 9rem);
  line-height: 1;
}

.editorial-card__graphic i {
  position: absolute;
  width: 130px;
  height: 130px;
  border: 1px solid currentColor;
  border-radius: 50%;
  opacity: 0.45;
  animation: editorial-orbit 9s linear infinite;
}

.editorial-card:nth-child(2) .editorial-card__graphic {
  color: var(--mag-cobalt);
}

.editorial-card:nth-child(3) .editorial-card__graphic {
  color: var(--mag-amber);
}

.editorial-card__copy {
  padding-top: 1.3rem;
  border-top: 1px solid var(--mag-line);
}

.editorial-card__copy p,
.editorial-card b {
  margin: 0 0 0.8rem;
  color: var(--mag-muted);
  font-size: 0.68rem;
  font-weight: 720;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.editorial-card__copy h3 {
  margin: 0 0 0.8rem;
  font-family: var(--mag-display);
  font-size: clamp(1.7rem, 2.7vw, 2.65rem);
  font-weight: 580;
  letter-spacing: -0.035em;
  line-height: 1.08;
}

.editorial-card__copy span {
  color: var(--mag-muted);
  font-size: 0.9rem;
  line-height: 1.7;
}

.editorial-card b {
  margin: 1.2rem 0 0;
  color: var(--mag-ink);
}

@keyframes editorial-orbit {
  50% {
    transform: rotate(180deg) scale(1.18);
    border-radius: 38%;
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 840px) {
  .editorial-grid__issues {
    grid-template-columns: 1fr;
  }

  .editorial-card {
    min-height: 420px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .editorial-card__graphic i {
    animation: none;
  }
}
</style>
