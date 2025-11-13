---
sidebar: 'heading'
---

# 将博客部署到GitHub Pages

- 书接上回，我们使用`VuePress`生成了一个**`仅供本地访问的博客`**，接下来就是将博客部署到服务器上了，本文记录了部署到`GitHub Pages`的过程。

- `GitHub`在国内访问时灵时不灵，如果没有梯子或者网络不好一直连不上`GitHub`的，可以不用往下看了。
- 没使用过`GitHub`可以不用往下看了。

## 1. 前言

- 为什么选择`GitHub Pages`？
  - 穷，没钱买`服务器、域名、CDN、OSS`。
- 优缺点：
  - 优点：免费。
  - 缺点：国内可能会访问不到。



## 2. 将项目托管到GitHub

### 2.1 创建远程仓库

- 此处就不贴图了，给出建议配置如下：

  - 新建GitHub项目仓库，项目名为`blogs`。

  - 设置仓库为`Public`。

  - 可以不用添加`README`文件。

  - 添加`.gitignore`文件，并选择`Node`作为`.gitignore`的模版。

  - 可以不添加`license`。

  - 点击创建即可。



### 2.2 对远程仓库进行设置

新建仓库之后会有一个`main`分支，我们用来存放源文件，所以需要**`使用其他分支`**来存放`VuePress`编译后的文件。

当然也可以选择不存放源文件，直接使用`main`分支存放编译后的文件。

- 新建分支
  - 名称随意，这里叫`gh-pages`。
- 启用`Pages`
  - 点击`Settings`选项卡。
  - 左侧边栏点击`Pages`选项卡。
  - `Build and deployment`下
    - `Source`选择`Deploy from a branch`。
    - `Branch`选择`gh-pages`分支，目录选`/(root)`。这里会出现一个`/docs`目录，我们在这个分支下没建这个目录，所以不选。
    - 点击`save`按钮。



### 2.3 创建本地仓库并关联远程仓库

- 进入本地VuePress项目目录(有`packaeg.json`的目录），我这里是`[前缀]/vuepress-my-blogs`，请将`[前缀]`替换为你自己的路径。

  ```bas
  # cd /path/to/your/local/folder
  cd [前缀]/vuepress-my-blogs
  ```

- 初始化本地仓库

```bash
git init
```

- 修改名称为`main`分支（可忽略）

```bash
# git init默认会创建一个名为master的本地分支，可以使用如下命令修改分支名，没强迫症可以不修改
# git branch -m <name>
git branch -m main
```

- 添加远程仓库

```bash
# git remote add origin https://github.com/username/repo.git
# 可以使用ssh地址，也可以使用https地址
git remote add origin git@github.com:XueZhaHenMang/blogs.git
```

- 检查远程仓库，确保`origin`指向远程仓库地址URL

```bash
git remote -v
```

- 拉取远程分支内容

```bash
# git pull [<options>] [<remote repository name>] [<remote branch name>]
git pull --rebase origin main
```

- 将如下文件添加进`.gitignore`文件中

```bash
echo "# VuePress 默认临时文件目录" >> .gitignore
echo ".vuepress/.temp" >> .gitignore
echo "# VuePress 默认缓存目录" >> .gitignore
echo ".vuepress/.cache" >> .gitignore
echo "# VuePress 默认构建生成的静态文件目录" >> .gitignore
echo ".vuepress/dist" >> .gitignore

# 如果前面选了`Node`作为.gitignore文件的模版的话，里面一般都包含了 node_modules/ 文件夹了。
# 如果 .gitignore 文件中没有 node_modules/，可以将其添加进去
echo "# 存放依赖文件的目录" >> .gitignore
echo "node_modules/" >> .gitignore
```

- 查看文件状态

```bash
git status
```

- 对已修改文件进行追踪

```bash
git add .
# 可以再使用 git status 确认哪些被追踪了，忽略文件不会显示。
```

- 设置当前仓库的用户名和邮箱（可忽略）

```bash
# 如果有配置全局的名称，以下两个操作可不做
git config user.name "你的名字"
git config user.email "你的邮箱地址"
```

- 对已追踪的修改文件进行提交

```bash
git commit -m "初始化仓库，第一次提交文件"
```

- 推送到远程分支

```bash
# 建立本地main分支与远程上游main分支的跟踪,并进行推送
# git push --set-upstream origin <本地分支名>:<远程分支名>
git push --set-upstream origin main:main
```

- 检查远程仓库的`main`分支，如果有刚刚推送的文件，那么这一步就成功了。



#### 2.4 配置GitHub Actions

我们只需要写一个`workflows`文件，会自动触发`GitHub Actions`。

- 进入本地VuePress项目目录(有`packaeg.json`的目录），我这里是`[前缀]/vuepress-my-blogs`，请将`[前缀]`替换为你自己的路径。

```bash
# cd /path/to/your/local/folder
cd [前缀]/vuepress-my-blogs
```

- 创建`.github/workflows/build-vuepress.yml`文件，文件名可以更改。

```bash
mkdir -p .github/workflows
touch .github/workflows/build-vuepress.yml
```

- 将以下内容写入`.github/workflows/build-vuepress.yml`中

```yml
name: build-vuepress

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

permissions:
  contents: write
  deployments: write
  pages: write

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          # 选择要使用的 pnpm 版本
          version: 8
          # 使用 pnpm 安装依赖
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          # 选择要使用的 node 版本
          node-version: 20
          # 缓存 pnpm 依赖
          cache: pnpm

      # 运行构建脚本
      - name: Build VuePress site
        run: pnpm docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v4
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

- 将修改的文件提交并推送到远程

```bash
# 对修改文件添加追踪
git add .
# 提交修改
git commit -m "添加github workflows文件"
# 推送到远程
git push
```

- 检查远程仓库的构建过程
  - 推送本次修改之后，github会自动触发`actions`的执行。
  - 点击`Actions`选项卡，如果看到`workflow`运行成功。
  - `https://yourname.github.io/blogs/`能够成功访问，则表示成功。



## 3. 结语

- 现在我们的博客可以在网上访问了。
- 接下来可以做的事情
  1. 可以继续翻阅`VuePress`的文档，做一些个性化设计。
  2. 可以往里面添加自己的`Markdown`内容啦。
  3. 可以搞个图床，存放文档中的图片。
  4. 可以买一个域名，添加`CNAME`解析，解决国内访问的问题。
  5. 可以考虑加上`Google analysis`看看访问情况。
  6. 可以考虑加上广告等等。
  7. 当然也可以考虑将博客部署到其他服务器上，不过就要面对备案、流量等问题了。

