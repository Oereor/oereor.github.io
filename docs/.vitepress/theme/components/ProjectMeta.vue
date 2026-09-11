<script setup lang="ts">
import { useData } from 'vitepress'
import type { ProjectData } from '../project'
import { projectStatusLabels } from '../project'

const { frontmatter } = useData<ProjectData>()
</script>

<template>
  <div class="project-meta" aria-label="项目元数据">
    <p class="project-meta__summary">
      <span v-if="frontmatter.status">{{ projectStatusLabels[frontmatter.status] }}</span>
      <template v-if="frontmatter.status && frontmatter.tech?.length"> · </template>
      <span v-if="frontmatter.tech?.length">{{ frontmatter.tech.join(' · ') }}</span>
    </p>
    <div v-if="frontmatter.website || frontmatter.github" class="project-meta__links">
      <a
        v-if="frontmatter.website"
        :href="frontmatter.website"
        target="_blank"
        rel="noopener noreferrer"
      >访问网站</a>
      <a
        v-if="frontmatter.github"
        :href="frontmatter.github"
        target="_blank"
        rel="noopener noreferrer"
      >GitHub</a>
    </div>
  </div>
</template>
