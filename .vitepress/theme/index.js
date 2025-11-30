// 导入 Vue 的 h 函数，用于创建虚拟 DOM 节点
import { h } from 'vue'
// 导入 VitePress 的默认主题
import DefaultTheme from 'vitepress/theme'
// 导入我们自定义的首页布局组件
import CustomHomeLayout from './layouts/CustomHomeLayout.vue'
import CustomTocLayout from './layouts/CustomTocLayout.vue'
// 导入返回按钮组件
import BackButton from './components/BackButton.vue'
// 导入全局样式文件
import '../styles/index.scss'

// 导出主题配置对象
export default {
    // extends: 继承默认主题的所有功能
    // 这样我们就有了默认主题的导航栏、侧边栏、页脚等所有组件
    extends: DefaultTheme,
    
    // Layout 函数：定义整个站点的布局结构
    // 这个函数返回一个 Vue 组件，用于包装所有页面
    Layout() {
        // h() 函数语法：h(tag, props, children)
        // - 第一个参数：组件或 HTML 标签
        // - 第二个参数：属性对象（props、class、style、事件等）
        // - 第三个参数：子元素或插槽对象
        return h(DefaultTheme.Layout, null, {
            // 悬浮返回按钮使用固定定位，可以在任何插槽中渲染
            // 使用 layout-bottom 插槽，在所有内容之后渲染
            'layout-bottom': () => h(BackButton),
        })
    },
    
    // enhanceApp 函数：用于增强 Vue 应用实例
    // 这个函数在应用启动时被调用，可以注册全局组件、添加全局属性等
    enhanceApp({ app }) {
        // app.component() 注册全局组件
        // 第一个参数是组件名（字符串），第二个参数是组件定义
        // 注册后，就可以在 frontmatter 中使用 layout: CustomHomeLayout 来使用这个布局
        app.component('CustomHomeLayout', CustomHomeLayout)
        app.component('CustomTocLayout', CustomTocLayout)

        // 你可以在这里注册更多组件，例如：
        // app.component('MyComponent', MyComponent)
        
        // 也可以添加全局属性，例如：
        // app.config.globalProperties.$myProperty = 'value'
    }
}
