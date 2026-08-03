<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const progress = ref(0)

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div class="reading-progress" aria-hidden="true">
    <span :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<style scoped>
.reading-progress {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  pointer-events: none;
}

.reading-progress span {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left;
  background: linear-gradient(90deg, var(--mag-coral), var(--mag-cobalt), var(--mag-amber));
  box-shadow: 0 0 14px color-mix(in srgb, var(--mag-coral) 70%, transparent);
  transition: transform 80ms linear;
}
</style>
