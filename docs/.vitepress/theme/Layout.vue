<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import NoteHeader from './components/NoteHeader.vue'

const route = useRoute()
const isNotePage = computed(() => /^\/notes\/[^/]+\/?$/.test(route.path))
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <NoteHeader v-if="isNotePage" />
    </template>
  </DefaultTheme.Layout>
</template>
