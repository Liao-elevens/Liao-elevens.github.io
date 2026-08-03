<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    eyebrow?: string
  }>(),
  {
    title: '查看完整解答与讲解',
    eyebrow: 'ANSWER'
  }
)
</script>

<template>
  <details class="exercise-solution">
    <summary class="exercise-solution__summary">
      <span class="exercise-solution__eyebrow">{{ eyebrow }}</span>
      <span class="exercise-solution__title">{{ title }}</span>
      <span class="exercise-solution__icon" aria-hidden="true"></span>
    </summary>

    <div class="exercise-solution__content">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.exercise-solution {
  margin: 1.35rem 0 2rem;
  border: 1px solid var(--mag-line);
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--mag-coral) 9%, transparent),
      transparent 42%
    ),
    color-mix(in srgb, var(--vp-c-bg-soft) 72%, transparent);
  box-shadow: 6px 6px 0 color-mix(in srgb, var(--mag-ink) 7%, transparent);
}

.exercise-solution__summary {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.85rem;
  min-height: 58px;
  padding: 0.8rem 1rem;
  cursor: pointer;
  list-style: none;
  color: var(--mag-ink);
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.exercise-solution__summary::-webkit-details-marker {
  display: none;
}

.exercise-solution__summary:hover {
  background: color-mix(in srgb, var(--mag-coral) 9%, transparent);
}

.exercise-solution__summary:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--mag-cobalt) 55%, transparent);
  outline-offset: 3px;
}

.exercise-solution__eyebrow {
  color: var(--mag-coral);
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.exercise-solution__title {
  font-size: 0.92rem;
  font-weight: 760;
}

.exercise-solution__icon {
  position: relative;
  width: 18px;
  height: 18px;
}

.exercise-solution__icon::before,
.exercise-solution__icon::after {
  position: absolute;
  inset: 50% auto auto 50%;
  width: 12px;
  height: 1.5px;
  background: currentColor;
  content: '';
  transform: translate(-50%, -50%);
  transition: transform 180ms ease;
}

.exercise-solution__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.exercise-solution[open] .exercise-solution__icon::after {
  transform: translate(-50%, -50%) rotate(0deg);
}

.exercise-solution__content {
  border-top: 1px solid var(--mag-line);
  padding: 0.35rem 1.2rem 1.2rem;
}

.exercise-solution__content :deep(> :first-child) {
  margin-top: 1rem;
}

.exercise-solution__content :deep(> :last-child) {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .exercise-solution__summary {
    grid-template-columns: 1fr auto;
  }

  .exercise-solution__eyebrow {
    display: none;
  }

  .exercise-solution__content {
    padding-inline: 0.9rem;
  }
}
</style>
