import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ProjectCollection from './components/ProjectCollection.vue'
import ProjectLayout from './components/ProjectLayout.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('project', ProjectLayout)
    app.component('ProjectCollection', ProjectCollection)
  }
} satisfies Theme
