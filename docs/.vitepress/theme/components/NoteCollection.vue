<script setup lang="ts">
import { data as notes } from '../../../notes.data.mts'
</script>

<template>
  <div v-if="notes.length" class="note-list">
    <a
      v-for="note in notes"
      :key="note.url"
      class="note-list-item"
      :href="note.url"
      :aria-label="`阅读：${note.title}`"
    >
      <article>
        <strong class="note-list-item__title">{{ note.title }}</strong>
        <p v-if="note.description" class="note-list-item__description">{{ note.description }}</p>
        <div v-if="note.date || note.tags?.length" class="note-list-item__meta">
          <time v-if="note.date" :datetime="note.date">{{ note.date }}</time>
          <ul v-if="note.tags?.length" aria-label="文章标签">
            <li v-for="tag in note.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
      </article>
      <span class="note-list-item__arrow" aria-hidden="true">→</span>
    </a>
  </div>

  <p v-else class="note-list-empty">这里暂时还没有内容。</p>
</template>
