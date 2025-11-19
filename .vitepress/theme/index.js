// 导入 Vue 的 h 函数，用于创建虚拟 DOM 节点
import { h } from 'vue'
// 导入 VitePress 的默认主题
import DefaultTheme from 'vitepress/theme'
// 导入我们自定义的首页布局组件
import CustomHomeLayout from './layouts/CustomHomeLayout.vue'
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
            // ========== 插槽说明 ==========
            // 这些插槽都是 VitePress 默认主题（DefaultTheme.Layout）提供的
            // 插槽是 Vue 组件中用于传递内容的方式
            // 格式：'插槽名': () => 返回的内容
            // 插槽名用引号是因为可能包含特殊字符（如连字符）
            // 
            // 官方文档：https://vitepress.dev/guide/extending-default-theme#layout-slots
            
            // page 插槽：用于自定义页面内容区域
            // 当返回 null 时，VitePress 会使用默认的页面渲染逻辑
            // 如果 frontmatter 中指定了 layout: CustomHomeLayout，VitePress 会自动使用那个组件
            page: () => {
                return null  // 使用默认行为
            },
            
            // ========== VitePress 官方提供的其他插槽示例（已注释，需要时可取消注释） ==========
            // 这些插槽都是 VitePress 默认主题内置的，可以直接使用
            
            // 'nav-bar-title-before': () => {
            //     // 在导航栏标题前添加内容（VitePress 官方插槽）
            //     return h('div', { style: { marginRight: '10px' } }, 'Logo')
            // },
            
            // 'nav-bar-title-after': () => {
            //     // 在导航栏标题后添加内容（VitePress 官方插槽）
            //     // h('div', props, children) 创建 div 元素
            //     // - 'div': HTML 标签名
            //     // - { style: {...} }: 属性对象（样式、class、id 等）
            //     // - '自定义内容': 文本内容
            //     return h('div', { 
            //         style: { color: 'red', marginLeft: '10px' } 
            //     }, '自定义内容')
            // },
            
            // 'nav-bar-content-after': () => {
            //     // 在导航栏内容后添加内容（VitePress 官方插槽）
            //     return h('div', '导航栏后的内容')
            // },
            
            // 'sidebar-top': () => {
            //     // 在侧边栏顶部添加内容（VitePress 官方插槽）
            //     return h('div', { class: 'sidebar-ad' }, '侧边栏内容')
            // },
            
            // 'sidebar-bottom': () => {
            //     // 在侧边栏底部添加内容（VitePress 官方插槽）
            //     return h('div', '侧边栏底部内容')
            // },
            
            // 'page-top': () => {
            //     // 在页面顶部添加内容（VitePress 官方插槽）
            //     return h('div', { 
            //         style: { background: '#f0f0f0', padding: '10px' } 
            //     }, '页面顶部横幅')
            // },
            
            // 'page-bottom': () => {
            //     // 在页面底部添加内容（VitePress 官方插槽）
            //     return h('div', '页面底部内容')
            // },
            
            // 'footer-top': () => {
            //     // 在页脚顶部添加内容（VitePress 官方插槽）
            //     return h('div', '页脚顶部内容')
            // },
            
            // 'footer-bottom': () => {
            //     // 在页脚底部添加内容（VitePress 官方插槽）
            //     return h('div', '页脚底部内容')
            // },
        })
    },
    
    // enhanceApp 函数：用于增强 Vue 应用实例
    // 这个函数在应用启动时被调用，可以注册全局组件、添加全局属性等
    enhanceApp({ app }) {
        // app.component() 注册全局组件
        // 第一个参数是组件名（字符串），第二个参数是组件定义
        // 注册后，就可以在 frontmatter 中使用 layout: CustomHomeLayout 来使用这个布局
        app.component('CustomHomeLayout', CustomHomeLayout)
        
        // 你可以在这里注册更多组件，例如：
        // app.component('MyComponent', MyComponent)
        
        // 也可以添加全局属性，例如：
        // app.config.globalProperties.$myProperty = 'value'
    }
}
