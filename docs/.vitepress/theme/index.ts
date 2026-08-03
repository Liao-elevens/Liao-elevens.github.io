import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MagazineLayout from './MagazineLayout.vue'
import ExerciseSolution from './components/exercise-solution/ExerciseSolution.vue'
import './styles/tokens.css'
import './styles/global.css'
import './styles/home.css'
import './styles/diagrams.css'

export default {
  extends: DefaultTheme,
  Layout: MagazineLayout,
  enhanceApp({ app }) {
    app.component('ExerciseSolution', ExerciseSolution)
  }
} satisfies Theme
