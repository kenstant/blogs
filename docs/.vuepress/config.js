import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

// 定义sourceDir常量，这个路径是相对于 .vuepress/目录的来找的。
const sourceDir = 'docs';

export default defineUserConfig({
    open: true,
    // 部署站点的基础配置
    base: '/blogs/',
    // 打包工具
    bundler: viteBundler(),
    // 主题,可以在里面进行主题的配置
    // 详见文档：https://ecosystem.vuejs.press/zh/themes/default/
    theme: defaultTheme({
        // 是否启用切换颜色模式的功能
        // colorModeSwitch: true,
        // 默认颜色模式：'auto' | 'light' | 'dark'
        colorMode: 'dark',

        // 顶部导航栏配置, 写成数组则开启, 写成false则关闭, 个人觉得顶部导航栏影响阅读
        // 但是关掉之后所有和顶部导航栏相关的都失效，包括colorMode、logo、repo、home、
        navbar: false,
        // 是否在外部链接上显示外部链接图标
        externalLinkIcon: true,
        // 首页的路径,将被用于导航栏中Logo的链接，404页面的【返回首页】链接
        home: '/',
        // 顶部导航栏左端的logo
        logo: null,
        // 夜间模式下的logo，禁用则会使用上面这行 logo 的配置
        logoDark: null,
        // 指定logo图片的替代文字，未指定时，默认与站点标题相同。
        logoAlt: null,
        // 顶部导航栏末端，仓库链接的地址
        repo: null,

        // 侧边栏
        // '搭建博客/使用VuePress搭建博客.md'
        sidebar: false,

        // 页脚相关
        // 是否启用`编辑此页`链接
        editLink: false,
        // 是否启用`最近更新时间戳`
        lastUpdated: true,
        lastUpdatedText: "上次更新时间",
        // 是否启用`贡献者列表`
        contributors: false,
    }),
    // 站点语言
    lang: 'zh-CN',
    // 站点标题
    title: '学渣很忙的博客',
    // 站点描述
    description: '学渣很忙的博客',
    // 最终会生成到<head></head>标签中
    head: [['link', {rel: 'icon', href: 'images/mylogo.png'}]],
    sourceDir,
    // vuepress build 命令的输出目录,默认值
    dest: `${sourceDir}/.vuepress/dist`,
    // 指定临时文件目录,默认值
    temp: `${sourceDir}/.vuepress/.temp`,
    // 指定缓存文件目录,默认值
    cache: `${sourceDir}/.vuepress/.cache`,
    // 指定 Public 文件目录,默认值
    public: `${sourceDir}/.vuepress/public`,
})
