<script setup lang="ts">
import { useData } from 'vitepress'
import { data as notes } from '../../../notes.data.mts'

const { frontmatter } = useData()
</script>

<template>
  <main class="note-collection">
    <header class="note-index-intro">
      <p class="eyebrow">文字记录</p>
      <h1>{{ frontmatter.title }}</h1>
      <p>{{ frontmatter.description }}</p>
    </header>

    <div v-if="notes.length" class="note-list">
      <a
        v-for="note in notes"
        :key="note.url"
        class="note-entry"
        :href="note.url"
        :aria-label="`阅读：${note.title}`"
      >
        <article>
          <h2>{{ note.title }}</h2>
          <p v-if="note.description" class="note-entry__description">{{ note.description }}</p>
          <div v-if="note.date || note.tags?.length" class="note-meta">
            <time v-if="note.date" :datetime="note.date">{{ note.date }}</time>
            <ul v-if="note.tags?.length" aria-label="文章标签">
              <li v-for="tag in note.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </article>
        <span class="note-entry__arrow" aria-hidden="true">→</span>
      </a>
    </div>

    <p v-else class="note-empty">这里暂时还没有内容。</p>
  </main>
</template>
