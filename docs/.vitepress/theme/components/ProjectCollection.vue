<script setup lang="ts">
import { computed } from 'vue'
import { data as projects } from '../../../projects.data.mts'

const featured = computed(() => projects.filter((project) => project.status === 'featured'))
const active = computed(() => projects.filter((project) => project.status === 'active'))
const archived = computed(() => projects.filter((project) => project.status === 'archived'))

const groups = computed(() => [
  { id: 'featured-projects', title: '重点项目', projects: featured.value },
  { id: 'active-projects', title: '其他项目', projects: active.value },
  { id: 'archived-projects', title: '归档', projects: archived.value }
])
</script>

<template>
  <div class="project-collection">
    <section
      v-for="group in groups"
      v-show="group.projects.length"
      :key="group.id"
      class="project-list-section"
      :aria-labelledby="group.id"
    >
      <h2 :id="group.id">{{ group.title }}</h2>
      <div class="project-list">
        <a
          v-for="project in group.projects"
          :key="project.url"
          class="project-list-item"
          :href="project.url"
          :aria-label="`查看项目：${project.title}`"
        >
          <article>
            <strong class="project-list-item__title">{{ project.title }}</strong>
            <p class="project-list-item__description">{{ project.description }}</p>
            <p v-if="project.tech.length" class="project-list-item__tech">
              {{ project.tech.join(' · ') }}
            </p>
          </article>
          <span class="project-list-item__arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  </div>
</template>
