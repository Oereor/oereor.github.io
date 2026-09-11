import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import HomeLanding from './components/HomeLanding.vue'
import NoteCollection from './components/NoteCollection.vue'
import ProjectCollection from './components/ProjectCollection.vue'
import ProjectMeta from './components/ProjectMeta.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeLanding', HomeLanding)
    app.component('NoteCollection', NoteCollection)
    app.component('ProjectCollection', ProjectCollection)
    app.component('ProjectMeta', ProjectMeta)
  }
} satisfies Theme
