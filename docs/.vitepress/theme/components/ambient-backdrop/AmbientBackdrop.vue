<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

function updatePointer(event: PointerEvent) {
  document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
  document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
}

onMounted(() => window.addEventListener('pointermove', updatePointer, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('pointermove', updatePointer))
</script>

<template>
  <div class="ambient-backdrop" aria-hidden="true">
    <span class="ambient-backdrop__pointer" />
    <span class="ambient-backdrop__orb ambient-backdrop__orb--one" />
    <span class="ambient-backdrop__orb ambient-backdrop__orb--two" />
    <span class="ambient-backdrop__grain" />
  </div>
</template>

<style scoped>
.ambient-backdrop,
.ambient-backdrop span {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.ambient-backdrop {
  z-index: -1;
  overflow: hidden;
}

.ambient-backdrop__pointer {
  background: radial-gradient(
    440px circle at var(--pointer-x, 50vw) var(--pointer-y, 30vh),
    color-mix(in srgb, var(--mag-cobalt) 9%, transparent),
    transparent 72%
  );
  transition: opacity 240ms ease;
}

.ambient-backdrop__orb {
  width: 32rem;
  height: 32rem;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.1;
  animation: ambient-drift 18s ease-in-out infinite alternate;
}

.ambient-backdrop__orb--one {
  top: 10%;
  left: -15rem;
  background: var(--mag-coral);
}

.ambient-backdrop__orb--two {
  top: auto;
  right: -14rem;
  bottom: -8rem;
  left: auto;
  background: var(--mag-cobalt);
  animation-delay: -8s;
}

.ambient-backdrop__grain {
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
}

@keyframes ambient-drift {
  to {
    transform: translate3d(6rem, 4rem, 0) scale(1.15);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-backdrop__orb {
    animation: none;
  }
}
</style>
