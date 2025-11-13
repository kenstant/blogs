import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NavLinks from '../components/NavLinks.vue'
import '../styles/index.scss'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // 在页面内容底部添加导航链接
            'doc-after': () => h(NavLinks)
        })
    },
    enhanceApp({ app, router, siteData }) {
        const modules = import.meta.glob('../components/**/*.vue', { eager: true })
        for (const [path, mod] of Object.entries(modules)) {
            const component = mod && mod.default
            if (!component) continue
            const filename = (path.split('/').pop() || '')
            const name = filename.replace(/\.vue$/, '')
            if (name) app.component(name, component)
        }
    }
}

