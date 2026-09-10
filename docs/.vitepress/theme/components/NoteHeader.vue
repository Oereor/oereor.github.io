<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const date = computed(() => {
  const value = frontmatter.value.date
  if (!value) return undefined
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value)
})

const tags = computed(() => Array.isArray(frontmatter.value.tags) ? frontmatter.value.tags : [])
</script>

<template>
  <header class="note-header">
    <p class="eyebrow">随笔</p>
    <h1>{{ frontmatter.title }}</h1>
    <p v-if="frontmatter.description" class="note-header__description">
      {{ frontmatter.description }}
    </p>
    <div v-if="date || tags.length" class="note-meta note-header__meta">
      <time v-if="date" :datetime="date">{{ date }}</time>
      <ul v-if="tags.length" aria-label="文章标签">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </header>
</template>
