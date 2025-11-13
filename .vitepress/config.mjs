import { defineConfig } from 'vitepress'

export default defineConfig({
    // 源文件目录（相对于项目根目录）
    srcDir: 'src',
    
    // 部署站点的基础配置
    base: '/blogs/',
    
    // 忽略构建时的死链检查（迁移初期更方便）
    ignoreDeadLinks: true,
    
    // 站点语言
    lang: 'zh-CN',
    
    // 站点标题
    title: 'kenstant的博客',
    
    // 站点描述
    description: 'kenstant的博客',
    
    // 最后更新时间
    lastUpdated: true,
    
    // 主题配置
    themeConfig: {
        // 顶部导航栏关闭
        nav: [],
        
        // 侧边栏关闭（空数组表示不显示侧边栏）
        sidebar: [],
        
        // 是否显示搜索框
        search: {
            provider: 'local'
        },
        
        // 社交链接
        socialLinks: [],
        
        // 页脚
        footer: {
            message: '飞光飞光，劝尔一杯酒。',
            copyright: 'Copyright © 2024'
        },
        
        // 编辑链接（禁用）
        editLink: false,
        
        // 最后更新时间文本
        lastUpdatedText: '上次更新时间',
        
        // 返回顶部按钮
        returnToTopLabel: '返回顶部',
        
        // 深色模式切换
        appearance: true,
        
        // 文档外部链接图标
        externalLinkIcon: true
    },
    
    // 头部配置
    head: [
        ['link', { rel: 'icon', href: '/icons/favicon.ico' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' }],
        ['link', { rel: 'manifest', href: '/icons/site.webmanifest' }]
    ],
    
    // Markdown 配置 - 使其更接近 Typora 的解析效果
    markdown: {
        // 代码块行号
        lineNumbers: true,
        
        // 图片配置
        image: {
            // 懒加载图片
            lazyLoading: true
        },
        
        // 自定义 markdown-it 配置
        config: (md) => {
            
            // 注意：VitePress 默认已支持以下 GFM 特性：
            // - 任务列表（- [ ] 和 - [x]）
            // - 表格
            // - 删除线（~~text~~）
            // - 自动链接
            // - 代码块语法高亮
        }
    }
})


