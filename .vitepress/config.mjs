import { defineConfig } from 'vitepress'

const base = '/blogs/';

export default defineConfig({
    // 源文件目录（相对于项目根目录）
    srcDir: 'src',
    
    // 部署站点的基础配置
    base: base,
    
    // 日志级别：'info' | 'warn' | 'error' | 'silent'
    // 设置为 'warn' 可以减少控制台的配置层信息输出
    logLevel: 'error',
    
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

        // 目录，false则禁用，true在左侧，left也在左侧，全局禁用设置outline: false.
        aside: true,
        
        // 是否显示搜索框
        search: {
            provider: 'local'
        },
        
        // 社交链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/kenstant' },
        ],
        
        // 页脚
        footer: {
            message: "我与我周旋久，宁做我",
            copyright: 'Copyright © 2025'
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
        ['link', { rel: 'icon', href: `${base}icons/favicon.ico` }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${base}icons/favicon-16x16.png` }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${base}icons/favicon-32x32.png` }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}icons/apple-touch-icon.png` }],
        ['link', { rel: 'manifest', href: `${base}icons/site.webmanifest` }]
    ],
    
    
    // Vite 配置 - 解决 Sass 弃用警告
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler' // 使用新的 Sass API
                }
            }
        }
    }
})


