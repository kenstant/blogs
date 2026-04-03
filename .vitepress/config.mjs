import { defineConfig } from 'vitepress'
import { MermaidMarkdown } from 'vitepress-mermaid'
import path from 'node:path'
import { getAutoRewrites } from './utils/rewrites.js'

const base = '/blogs/';
const srcDir = 'src';

const MERMAID_VIRTUAL = 'virtual:mermaid-config'
const MERMAID_VIRTUAL_RESOLVED = '\0' + MERMAID_VIRTUAL

/**
 * ```mermaid：仅渲染图（与常见 Markdown 里 Mermaid  fenced code 行为一致）。
 * ```mermaid-doc：本站扩展，教学用——先 Shiki 高亮源码，再渲染图（纵向排列）。
 * ```mmd：仅源码高亮、不渲染（vitepress-mermaid 内置）。
 */
function mermaidDocMarkdown(md) {
    const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules)
    MermaidMarkdown(md)
    const mermaidFence = md.renderer.rules.fence.bind(md.renderer.rules)

    const diagramOnly = (id, graphEncoded) => `<Suspense>
<template #default>
<Mermaid id="${id}" class="mermaid" graph="${graphEncoded}"></Mermaid>
</template>
<template #fallback>Loading...</template>
</Suspense>`

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const info = token.info.trim()

        if (info === 'mermaid-doc') {
            const savedInfo = token.info
            token.info = 'mermaid'
            const codeHtml = defaultFence(tokens, idx, options, env, self)
            token.info = savedInfo
            const graphEncoded = encodeURIComponent(token.content)
            return `<div class="mermaid-doc-pair">
<div class="mermaid-doc-pair__source">${codeHtml}</div>
<div class="mermaid-doc-pair__diagram">
<p class="mermaid-doc-pair__caption">渲染结果</p>
${diagramOnly(`mermaid-doc-${idx}`, graphEncoded)}
</div>
</div>`
        }

        return mermaidFence(tokens, idx, options, env, self)
    }
}

/** 仅提供 Mermaid.vue 依赖的 virtual:mermaid-config，不调用 MermaidPlugin（其会 transform app/index.js）。 */
function mermaidConfigVirtualPlugin(userConfig = {}) {
    const config = {
        securityLevel: 'loose',
        startOnLoad: false,
        ...userConfig,
    }
    return {
        name: 'vitepress-mermaid-config-virtual',
        resolveId(id) {
            if (id === MERMAID_VIRTUAL) return MERMAID_VIRTUAL_RESOLVED
        },
        load(id) {
            if (id === MERMAID_VIRTUAL_RESOLVED) {
                return `export default ${JSON.stringify(config)};`
            }
        },
    }
}

export default defineConfig({
    // 自动生成重写规则
    rewrites: getAutoRewrites(path.resolve(process.cwd(), srcDir)),

    // 源文件目录（相对于项目根目录）
    srcDir: srcDir,
    
    // 部署站点的基础配置
    base: base,
    
    // 日志级别：'info' | 'warn' | 'error' | 'silent'
    logLevel: 'error',
    
    // 忽略构建时的死链检查
    ignoreDeadLinks: true,
    
    // 站点语言
    lang: 'zh-CN',
    
    // 站点标题
    title: 'kenstant的博客',
    
    // 站点描述
    description: 'kenstant的博客',
    
    // 最后更新时间
    lastUpdated: true,

    markdown: {
        config(md) {
            mermaidDocMarkdown(md)
        },
    },
    
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
    
    // Vite 配置
    vite: {
        plugins: [
            mermaidConfigVirtualPlugin({
                securityLevel: 'loose',
                startOnLoad: false,
            }),
        ],
        optimizeDeps: {
            // Mermaid / Langium / vscode-jsonrpc：避免浏览器里直接吃到 CJS，导致 default / 命名导出不匹配
            include: [
                '@braintree/sanitize-url',
                '@mermaid-js/parser',
                'cytoscape',
                'cytoscape-cose-bilkent',
                'dayjs',
                'debug',
                'langium',
                'mermaid',
                'vscode-jsonrpc',
            ],
        },
        resolve: {
            alias: {
                'dayjs/plugin/advancedFormat.js': 'dayjs/esm/plugin/advancedFormat',
                'dayjs/plugin/customParseFormat.js': 'dayjs/esm/plugin/customParseFormat',
                'dayjs/plugin/duration.js': 'dayjs/esm/plugin/duration',
                'dayjs/plugin/isoWeek.js': 'dayjs/esm/plugin/isoWeek',
                'cytoscape/dist/cytoscape.umd.js': 'cytoscape/dist/cytoscape.esm.js',
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler' // 使用新的 Sass API
                }
            }
        }
    }
})
