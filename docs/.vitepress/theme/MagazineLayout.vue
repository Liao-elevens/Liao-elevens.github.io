<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import AmbientBackdrop from './components/ambient-backdrop/AmbientBackdrop.vue'
import HomeSections from './components/home-sections/HomeSections.vue'
import ReadingProgress from './components/reading-progress/ReadingProgress.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <ReadingProgress />
  <AmbientBackdrop />
  <Layout>
    <template #home-features-after>
      <HomeSections />
    </template>
  </Layout>
</template>
