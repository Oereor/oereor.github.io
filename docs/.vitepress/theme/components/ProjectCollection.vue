<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as projects } from '../../../projects.data.mts'
import ProjectCard from './ProjectCard.vue'

const props = withDefaults(defineProps<{
  showIntro?: boolean
}>(), {
  showIntro: false
})

const { frontmatter } = useData()
const featured = computed(() => projects.filter((project) => project.status === 'featured'))
const active = computed(() => projects.filter((project) => project.status === 'active'))
const archived = computed(() => projects.filter((project) => project.status === 'archived'))
</script>

<template>
  <main class="project-collection">
    <header v-if="props.showIntro" class="project-index-intro">
      <p class="eyebrow">项目档案</p>
      <h1>{{ frontmatter.title }}</h1>
      <p>{{ frontmatter.description }}</p>
    </header>

    <section v-if="featured.length" class="project-section" aria-labelledby="featured-projects">
      <div class="project-section__heading">
        <h2 id="featured-projects">重点项目</h2>
      </div>
      <div class="project-grid project-grid--featured">
        <ProjectCard
          v-for="project in featured"
          :key="project.url"
          :project="project"
          variant="featured"
        />
      </div>
    </section>

    <section v-if="active.length" class="project-section" aria-labelledby="active-projects">
      <div class="project-section__heading">
        <h2 id="active-projects">更多项目</h2>
      </div>
      <div class="project-grid project-grid--regular">
        <ProjectCard
          v-for="project in active"
          :key="project.url"
          :project="project"
          variant="regular"
        />
      </div>
    </section>

    <section v-if="archived.length" class="project-section project-section--archive" aria-labelledby="archived-projects">
      <div class="project-section__heading">
        <h2 id="archived-projects">归档</h2>
      </div>
      <div class="project-grid">
        <ProjectCard
          v-for="project in archived"
          :key="project.url"
          :project="project"
          variant="archive"
        />
      </div>
    </section>
  </main>
</template>
