# 使用VuePress搭建博客

本文记录一下使用`VuePress`搭建博客的过程，其实VuePress官网有，我也是根据官方文档来做的。



## 1. 前言

- 为什么选自己搭博客？
  - 作为程序员需要经常学习，好记性不如烂笔头，又比较喜欢用`Markdown`做笔记。
  - 不想把文档放到第三方软件上，可能会收费、跑路。
  - 方便移动端阅读。
  - 希望能对其他人有所帮助。
- 为什么选`VuePress`？
  - 没有为什么，主流方案搜索一下就那么几种，感觉`VuePress`比较匹配我的需求。
- 会用到的技术：
  - `VuePress`基于`Vue`框架。
  - `Vue`是`JavaScript`语言的框架。
  - 非浏览器环境下使用`JavaScript`可以使用`Node.js`，`Node.js`是一个开源的`JavaScript`运行时环境。
  - `Node.js`附带了包管理工具`npm`，但是`npm`有一些缺点，我会使用`pnpm`作为包管理工具。
  - 安装`Node.js`可以使用`nvm`，`nvm`是管理`Node.js`版本的工具。
- 我搭建时使用的是`mac`电脑。



## 2. 使用`nvm`安装`Node.js`

- 官网地址：https://nodejs.org/zh-cn/download/package-manager
- mac下直接执行命令：

```bash
# 安装 fnm (快速 Node 管理器)
curl -fsSL https://fnm.vercel.app/install | bash

# 激活 fnm
source ~/.bashrc

# 下载并安装 Node.js
fnm use --install-if-missing 22

# 验证环境中是否存在正确的 Node.js 版本
node -v # 应该打印 `v22.11.0`

# 验证环境中是否存在正确的 npm 版本
npm -v # 应该打印 `10.9.0`
```



## 3. 安装`VuePress`

- 官网地址：https://vuepress.vuejs.org/zh/guide/getting-started.html
- 采用`pnpm`作为包管理工具
- 尽量会和官网不一样，可以看出哪些地方是可以变的。

### 3.1 命令行手动创建

- 创建并进入一个新目录

```bash
mkdir vuepress-my-blogs
cd vuepress-my-blogs
```

- 初始化项目

```bash
# 会生成 package.json 文件
pnpm init
```

- 安装`VuePress`

```bash
# 安装 vuepress 和 vue
pnpm add -D vuepress@next vue
# 安装打包工具和主题
pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next
# 下面这个官方文档没有给，如果不加，后面运行时会报错
pnpm add -D sass-embedded
```

- 创建`docs`目录和`docs/.vuepress`目录
  - `docs`目录用来存放Markdown文件，同时作为VuePress的源文件目录。
  - `docs/.vuepress`目录，放置`VuePress`的配置文件，后续会生成如下文件夹：
    - `docs/.vuepress/.temp`：VuePress 默认临时文件目录
    - `docs/.vuepress/.cache`：VuePress 默认缓存目录
    - `docs/.vuepress/dist`：VuePress 默认构建生成的静态文件目录

```bash
mkdir docs
mkdir docs/.vuepress
```

- 创建`VuePress`配置文件`docs/.vuepress/config.js`，并写入配置

```bash
touch docs/.vuepress/config.js
```

- 写入配置到`docs/.vuepress/config.js`中

```ts
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // 这里的base是官方文档没有讲清楚的地方，当然有可能是我不会前端没用过vue所以不知道。
  // 后续我准备放在 我github的blogs仓库下，通过https://yourname.github.io/blogs 访问，所以这里写成 '/blogs/' 。
  // 如果你通过 http://yourname.githug.io/ 访问，则写成 '/'
  // 其他的部署情况，请按需设置，不知道就写默认值 '/' ,后面有需要再修改
  base: '/blogs/',
  bundler: viteBundler(),
  theme: defaultTheme(),
})
```

- 创建你的第一篇文档

```bash
# docs目录下的README.md文档会生成index.html，也就是首页
echo '# 你好，欢迎来到首页' > docs/README.md
```



### 3.2 目录结构

以上步骤完成后目录如下：

```txt
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
└─ package.json
```





## 4. 开始使用`VuePress`

### 4.1 启动开发服务器

- 在`package.json`中添加如下内容：

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

完整`package.json`文件内容如下，形式差不多就可以，版本号可能会有所变动：

```json
{
  "name": "vuepress-my-blogs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@vuepress/bundler-vite": "2.0.0-rc.18",
    "@vuepress/theme-default": "2.0.0-rc.61",
    "sass-embedded": "^1.81.0",
    "vue": "^3.5.13",
    "vuepress": "2.0.0-rc.18"
  }
}
```

- 运行`docs:dev`脚本启动开发服务器:

```bash
pnpm docs:dev
```

VuePress 会在 http://localhost:8080 启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新。



### 4.2 构建你的网站

- 运行`docs:build`脚本可以构建你的网站：

```bash
pnpm docs:build
```

在 `docs/.vuepress/dist` 目录中可以找到构建生成的静态文件。你可以查看 [部署](https://vuepress.vuejs.org/zh/guide/deployment.html) 来了解如何部署你的网站。



## 5. 结语

- 至此，我们已经有了一个**`仅供本地访问`**的博客站点了。

- 接下来应该把博客部署到服务器上了，会有很多种方案：
  - 可以参考官方文档：https://vuepress.vuejs.org/zh/guide/deployment.html
  - 甚至我觉得直接把构建生成的`docs/.vuepress/dist`目录下的文件全部放上一台真实服务器，再加一个`Nginx`也可以运行。
  - 当然我暂时会把内容部署到`GitHub Pages`上。





