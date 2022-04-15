import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import installDirective from '@/directives'
import installIcons from './icons'
import './assets/scss/index.scss'
import 'element-plus/dist/index.css'

import i18n from '@/i18n'
import './permission'

const app = createApp(App)

// 导入 本地svg图标 并注册全局svg-icon组件
installIcons(app)
installDirective(app)

app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
