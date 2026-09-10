import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import HomeLanding from './components/HomeLanding.vue'
import NoteCollection from './components/NoteCollection.vue'
import ProjectCollection from './components/ProjectCollection.vue'
import ProjectLayout from './components/ProjectLayout.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('project', ProjectLayout)
    app.component('HomeLanding', HomeLanding)
    app.component('NoteCollection', NoteCollection)
    app.component('ProjectCollection', ProjectCollection)
  }
} satisfies Theme
