import DefaultTheme from 'vitepress/theme'
import MagazineLayout from './MagazineLayout.vue'
import './styles/tokens.css'
import './styles/global.css'
import './styles/home.css'

export default {
  extends: DefaultTheme,
  Layout: MagazineLayout
}
