<script setup lang="ts">
import type { ProjectData } from '../project'
import { projectStatusLabels } from '../project'

defineProps<{
  project: ProjectData
  variant: 'featured' | 'regular' | 'archive'
}>()
</script>

<template>
  <article class="project-card" :class="`project-card--${variant}`">
    <div class="project-card__header">
      <span class="project-status" :class="`project-status--${project.status}`">
        {{ projectStatusLabels[project.status] }}
      </span>
      <ul class="tech-list" aria-label="使用技术">
        <li v-for="item in project.tech" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="project-card__content">
      <h2><a :href="project.url">{{ project.title }}</a></h2>
      <p>{{ project.description }}</p>
    </div>

    <div class="project-card__actions">
      <a class="text-link" :href="project.url">查看项目</a>
      <a
        v-if="project.website"
        class="text-link text-link--external"
        :href="project.website"
        target="_blank"
        rel="noopener noreferrer"
      >访问网站 <span aria-hidden="true">↗</span></a>
      <a
        class="text-link text-link--external"
        :href="project.github"
        target="_blank"
        rel="noopener noreferrer"
      >GitHub <span aria-hidden="true">↗</span></a>
    </div>
  </article>
</template>
