<script setup lang="ts">
import { data as notes } from '../../../notes.data.mts'
import { data as projects } from '../../../projects.data.mts'

const recentNotes = notes.slice(0, 3)
const currentProjects = projects.filter((project) => project.status !== 'archived')
</script>

<template>
  <main class="home-landing">
    <header class="home-intro">
      <h1>oereor's Blog</h1>
      <p>在消失之前记录下一些东西。</p>
    </header>

    <div class="home-grid">
      <section class="home-section home-section--notes" aria-labelledby="recent-notes-heading">
        <div class="home-section__heading">
          <h2 id="recent-notes-heading">最近随笔</h2>
          <a href="/notes/">查看全部 <span aria-hidden="true">→</span></a>
        </div>

        <div v-if="recentNotes.length" class="home-note-list">
          <a
            v-for="note in recentNotes"
            :key="note.url"
            class="home-note"
            :href="note.url"
            :aria-label="`阅读：${note.title}`"
          >
            <article>
              <div class="home-note__header">
                <h3>{{ note.title }}</h3>
                <time v-if="note.date" :datetime="note.date">{{ note.date }}</time>
              </div>
              <p v-if="note.description">{{ note.description }}</p>
            </article>
            <span class="home-item-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section class="home-section home-section--projects" aria-labelledby="current-projects-heading">
        <div class="home-section__heading">
          <h2 id="current-projects-heading">项目</h2>
          <a href="/projects/">查看全部 <span aria-hidden="true">→</span></a>
        </div>

        <div class="home-project-list">
          <a
            v-for="project in currentProjects"
            :key="project.url"
            class="home-project"
            :class="{ 'home-project--featured': project.status === 'featured' }"
            :href="project.url"
            :aria-label="`查看项目：${project.title}`"
          >
            <article>
              <div class="home-project__title">
                <h3>{{ project.title }}</h3>
                <span v-if="project.status === 'featured'" class="home-project__badge">重点</span>
              </div>
              <p>{{ project.description }}</p>
              <p v-if="project.status === 'featured'" class="home-project__tech">
                {{ project.tech.join(' · ') }}
              </p>
            </article>
            <span class="home-item-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  </main>
</template>
