---
sidebar: 'heading'
---

# 使用VuePress的默认主题

- [官方文档地址](https://ecosystem.vuejs.press/zh/themes/default/)


## 1. 使用默认主题
1. 安装默认主题
```bash
# npm命令
npm -i -D @vuepress/theme-default@next
# 或者使用 pnpm命令
pnpm add -D @vuepress/theme-default@next
```

2. 在`docs/.vuepress/config.js`中使用
```ts
import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
    // 在这里添加主题配置
  }),
}
```

## 2. 常用主题配置
### 通用配置
#### colorMode
- 全局默认颜色配置
- 可选值: `'auto'` or `'light'` or `'dark'`
    - 默认值：`'auto'`
- `colorModeSwitch`可以改变

#### externalLinkIcon
- 是否在外部链接的右边显示图标(`↗`)
- 可选值: `true` or `false`

#### home
- 首页的路径，将被用在：
    - 顶部导航栏中 `Logo` 的链接
    - `404页面`的`返回首页`链接


### 顶部导航栏相关
#### navar
- 顶部导航栏
- 可选值:
    - `[]`: 默认值
    - `false`: 禁用顶部导航栏，会影响其他在导航栏上的功能
    - `NavbarOptions`: 
        - 官网其他文档不太好用，了解即可
        - 下面的选项一和二是同一种，选项三是另一种写法。选项三的写法最多嵌套两层。
        - 常用写法如下
    ```JavaScript
    export default {
        theme: defaultTheme({
            navbar: [
                {
                    text: '选项一站内链接',
                    link: '/path_1/your_md_file.md',
                },
                {
                    text: '选项二站外链接',
                    link: 'https://example.com',
                },
                {
                    text: '选项三下拉框',
                    children: [
                        {
                            text: '选项1站内外链接都可',
                            link: '/path_2/your_md_file.md',
                        },
                        {
                            text: '选项2小标题不写也会占空白位',
                            children: [
                                {
                                    text: '嵌套深度最多2层',
                                    link: '/path_3/站内外链接都行.md',
                                },
                            ]
                        }
                    ]
                }
            ]
        }),
    }
    ```

#### colorModeSwitch
- 在顶部导航栏右边展示`白天`和`黑夜`模式的开关- navar为false时不展示

#### logo
- 顶部导航栏左边的logo
- navar为false时不展示
- 可选值: 
    - `null`: 禁用
    - `具体的url`: 站内外资源的url都可以

#### logoDark
- 夜间模式中替换 `logo` 使用。
- navar为false时不展示
- 可选值:
    - `null`: 禁用，会使用`logo`的值。
    - `具体的url`: 站内外资源的url都可以。

#### logoAlt
- 指定`Logo`图片的替代文字
- navar为false时不展示
- 可选值:
    - `null`: 禁用，会使用站点标题
    - `具体的文字`: 不用多说

#### repo
- 仓库链接
- navar为false时不展示
- 放在顶部导航栏的最后
- 可选值: `具体的仓库地址`


### 侧边栏相关
#### sidebar
- 侧边栏配置
- 可通过`sidebar frontmatter`配置覆盖
- 可选值:
    - `false`: 禁用, 我个人不太喜欢侧边栏，就直接禁用了。
    - `heading`: 默认值，采用页面标题
    - `SidebarOptions`: 详见官方文档。
    > https://ecosystem.vuejs.press/zh/themes/default/config.html#sidebar


### 页脚相关配置
#### editLink
- 是否启用`编辑此页`链接
- 可选值：`true`（默认值） or `false`
- 可通过页面的`editLink frontmatter`覆盖


#### lastUpdated
- 是否启用`最近更新时间戳`
- 可选值: 
    - `true`: 默认值, 可通过页面的`lastUpdated frontmatter`覆盖
    - `false`: 全局禁用, 且无法在`locales`或`页面 frontmatter`中启用

#### contributors
- 是否启用`贡献者列表`
- 可选值:
    - `true`: 默认值, 可通过页面的`contributors frontmatter`覆盖
    - `false`: 全局禁用, 且无法在`locales`或`页面 frontmatter`中启用

## 3. 结语
- 以上就是关于VuePress中一些常用的配置了，如果有其他的需求，需要再去看看官方文档啦，找到更多的配置或者自己开发主题。

- 个人喜欢简洁风格，所以把很多的配置都放关掉了，享受沉浸式阅读。
