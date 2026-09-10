<script setup lang="ts">
import { Content, useData } from 'vitepress'
import type { ProjectData } from '../project'
import { projectStatusLabels } from '../project'

const { frontmatter } = useData<ProjectData>()
</script>

<template>
  <main class="project-layout">
    <header class="project-hero">
      <span class="project-status" :class="`project-status--${frontmatter.status}`">
        {{ projectStatusLabels[frontmatter.status] }}
      </span>
      <h1>{{ frontmatter.title }}</h1>
      <p class="project-hero__description">{{ frontmatter.description }}</p>

      <div class="project-hero__actions">
        <a
          v-if="frontmatter.website"
          class="project-button project-button--primary"
          :href="frontmatter.website"
          target="_blank"
          rel="noopener noreferrer"
        >访问网站 <span aria-hidden="true">↗</span></a>
        <a
          class="project-button"
          :href="frontmatter.github"
          target="_blank"
          rel="noopener noreferrer"
        >GitHub <span aria-hidden="true">↗</span></a>
      </div>

      <ul class="tech-list project-hero__tech" aria-label="使用技术">
        <li v-for="item in frontmatter.tech" :key="item">{{ item }}</li>
      </ul>
    </header>

    <Content class="vp-doc project-content" />
  </main>
</template>
