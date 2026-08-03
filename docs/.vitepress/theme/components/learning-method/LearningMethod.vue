<script setup lang="ts">
import { learningStages } from '../../data/home-content'
</script>

<template>
  <section class="learning-method magazine-section">
    <header class="magazine-section__header">
      <div>
        <p class="section-kicker">ONE IDEA, FIVE LANGUAGES · 统一方法</p>
        <h2>不是五套算法。</h2>
      </div>
      <p>
        先建立语言无关的思维，再观察 Java、Python、JavaScript、C++、Go
        在类型、容器与边界表达上的差异。
      </p>
    </header>

    <div class="learning-method__steps">
      <a
        v-for="stage in learningStages"
        :key="stage.marker"
        :href="stage.route"
        class="method-step"
      >
        <span>{{ stage.marker }}</span>
        <h3>{{ stage.title }}</h3>
        <p>{{ stage.summary }}</p>
        <i aria-hidden="true">→</i>
      </a>
    </div>
  </section>
</template>

<style scoped>
.learning-method {
  padding-block: 2rem 8rem;
}

.learning-method__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-block: 1px solid var(--mag-line);
}

.method-step {
  position: relative;
  min-height: 300px;
  padding: 1.5rem;
  border-right: 1px solid var(--mag-line);
  color: var(--mag-ink);
  transition: background 320ms ease;
}

.method-step:last-child {
  border-right: 0;
}

.method-step:hover {
  background: color-mix(in srgb, var(--mag-cobalt) 7%, var(--mag-paper));
}

.method-step > span {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--mag-ink);
  border-radius: 50%;
  font-family: var(--mag-display);
  font-style: italic;
}

.method-step h3 {
  margin: 5rem 0 0.7rem;
  font-family: var(--mag-display);
  font-size: 1.8rem;
  font-weight: 560;
  line-break: strict;
  text-wrap: balance;
}

.method-step p {
  margin: 0;
  color: var(--mag-muted);
  font-size: 0.86rem;
  line-height: 1.7;
  line-break: strict;
  text-wrap: pretty;
}

.method-step i {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  font-size: 1.4rem;
  font-style: normal;
  transition: transform 240ms ease;
}

.method-step:hover i {
  transform: translateX(6px);
}

@media (max-width: 840px) {
  .learning-method__steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .method-step:nth-child(2) {
    border-right: 0;
  }

  .method-step:nth-child(-n + 2) {
    border-bottom: 1px solid var(--mag-line);
  }
}

@media (max-width: 520px) {
  .learning-method__steps {
    grid-template-columns: 1fr;
  }

  .method-step {
    min-height: 240px;
    border-right: 0;
    border-bottom: 1px solid var(--mag-line);
  }
}
</style>
