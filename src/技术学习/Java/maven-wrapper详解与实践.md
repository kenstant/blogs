---
slug: maven-wrapper
---

# Maven Wrapper 详解与实践

## 什么是 Maven Wrapper？

Maven Wrapper（Maven 包装器）是一个工具，它允许你在没有安装 Maven 的情况下运行 Maven 项目。
它会自动下载并使用项目指定的 Maven 版本，确保所有开发者使用相同的 Maven 版本，从而避免"在我机器上能跑"的问题。

## Maven Wrapper 的历史

### Takari Maven Wrapper（起源）

Maven Wrapper 最初由 **Takari 团队**开发，旨在为 Maven 项目提供类似于 Gradle Wrapper 的功能。Takari 是一个专注于 Maven 工具和插件的开源项目，由 Maven 的核心贡献者创建。

**Takari Maven Wrapper 的特点**：
- 作为独立的 Maven 插件提供：`io.takari:maven:wrapper`
- 通过 GitHub 托管：`https://github.com/takari/maven-wrapper`
- 使用命令：`mvn -N io.takari:maven:wrapper`

### Apache Maven Wrapper（官方版本）

随着 Maven 社区的发展，**Apache Maven 官方团队**将 Takari 的 Maven Wrapper 整合进了官方的 Maven 项目中。从 Maven 3.7.0 开始，Maven Wrapper 成为 Maven 的官方组件。

**Apache Maven Wrapper 的特点**：
- 作为 Maven 的官方组件，随 Maven 一起维护
- 官方文档：`https://maven.apache.org/wrapper/`
- 使用命令：`mvn wrapper:wrapper`（Maven 3.7.0+）

### 两者的关系

1. **历史渊源**：Apache Maven Wrapper 是基于 Takari Maven Wrapper 发展而来的官方版本
2. **兼容性**：两者生成的 Wrapper 文件格式完全兼容，可以互相使用
3. **当前状态**：
   - **Takari Maven Wrapper**：仍然维护，但主要作为历史兼容性保留
   - **Apache Maven Wrapper**：官方推荐使用，持续更新和维护
4. **迁移建议**：新项目建议使用 Apache Maven Wrapper，老项目可以继续使用 Takari 版本，两者功能相同

### 如何选择？

- **新项目**：使用 `mvn wrapper:wrapper`（Apache 官方版本）
- **已有项目**：如果已经使用 Takari 版本，可以继续使用，也可以迁移到官方版本
- **兼容性**：两者生成的脚本和配置文件格式相同，可以无缝切换

## 为什么需要 Maven Wrapper？

### 传统方式的问题

在没有 Maven Wrapper 之前，开发者需要：

1. **手动安装 Maven**：每个开发者都需要在自己的机器上安装 Maven
2. **版本不一致**：不同开发者可能使用不同版本的 Maven，导致构建结果不一致
3. **环境配置复杂**：需要配置 `MAVEN_HOME` 和 `PATH` 环境变量
4. **CI/CD 配置繁琐**：需要在 CI/CD 环境中安装特定版本的 Maven
5. **settings.xml 配置不统一**：每个开发者使用自己的 `~/.m2/settings.xml`，导致仓库地址、镜像配置、认证信息等不一致，可能引发依赖下载失败、构建速度差异等问题

### Maven Wrapper 的优势

1. **零配置**：克隆项目后即可使用，无需安装 Maven
2. **版本统一**：所有开发者使用相同的 Maven 版本
3. **简化 CI/CD**：CI/CD 环境无需预装 Maven
4. **项目自包含**：Maven 版本信息与项目一起版本控制
5. **settings.xml 统一管理**：通过 `.mvn/maven.config` 指定项目级别的 `settings.xml`，确保所有开发者和 CI/CD 环境使用相同的仓库配置、镜像地址、认证信息等，这是 Maven Wrapper 的核心优势之一

## Maven Wrapper 的工作原理

### 项目结构

首先，让我们看看一个典型的 Maven Wrapper 项目结构：

```
project-root/
├── src/                    # 源代码目录（标准 Maven 项目结构）
├── mvnw                    # Unix/Linux/macOS 脚本
├── mvnw.cmd                # Windows 脚本
├── pom.xml                 # Maven 项目配置
├── settings.xml            # 项目级别的 Maven 配置（可选）
└── .mvn/
    ├── maven.config        # Maven 默认配置（可选）
    └── wrapper/
        ├── maven-wrapper.jar              # Wrapper JAR（自动生成，不提交到版本控制）
        ├── maven-wrapper.properties       # Wrapper 配置（指定 Maven 版本）
        └── MavenWrapperDownloader.java    # 下载器源码（用于自动下载）
```

**关键点**：
- `mvnw` 和 `mvnw.cmd` 位于项目根目录，是 Maven Wrapper 的入口脚本
- `.mvn` 目录是 Maven Wrapper 的标志，用于识别项目根目录
- `settings.xml` 可以放在项目根目录，通过 `.mvn/maven.config` 引用

Maven Wrapper 包含以下核心组件：

### 1. 包装器脚本

Maven Wrapper 提供了两个脚本文件，它们功能完全相同，只是针对不同的操作系统：

- **`mvnw`**（Unix/Linux/macOS）：Shell 脚本，用于 Unix 类系统（包括 Linux 和 macOS）
- **`mvnw.cmd`**（Windows）：批处理脚本，用于 Windows 系统

:::info

`mvnw` 和 `mvnw.cmd` 是同一个工具的不同平台版本，功能完全一致。在 Unix/Linux/macOS 上使用 `./mvnw`，在 Windows 上使用 `mvnw.cmd`（或 `mvnw`，如果配置了 Git Bash 等环境）。

:::



这些脚本会：
- 通过向上查找 `.mvn` 目录来确定项目根目录（`.mvn` 目录是 Maven Wrapper 的标志，只存在于项目根目录）
- 检查是否存在 `maven-wrapper.jar`
- 如果不存在，自动下载 `maven-wrapper.jar`
- 执行 Maven 命令

### 2. 配置文件

#### `.mvn/wrapper/maven-wrapper.properties`

这个文件定义了 Maven 和 Wrapper 的版本信息：

```properties
distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip
wrapperUrl=https://repo.maven.apache.org/maven2/io/takari/maven-wrapper/0.5.6/maven-wrapper-0.5.6.jar
```

- **`distributionUrl`**：指定要使用的 Maven 版本
- **`wrapperUrl`**：指定 Maven Wrapper 的下载地址

#### `.mvn/maven.config`

这个文件可以配置 Maven 的默认命令行参数。

:::tip

3.8.x 及以下的版本不支持使用注释，3.9.x 及之后的版本支持使用注释，并且推荐每个参数单独一行。

:::

> 全部命令行参数参考[maven文档](https://maven.apache.org/ref/3.9.6/maven-embedder/cli.html)

**完整配置示例**：

::: code-group
```properties [.mvn/maven.config]
# settings.xml文件的读取位置
--settings=./settings.xml

# 线程数
--threads=1

# 跳过测试，包括编译和运行(高优先级),如果想仅跳过测试的运行，请使用`-DskipTests=true`(同时写的优先级更低)
-Dmaven.test.skip=true
# -DskipTests=true

# 这里指定你本地的maven仓库（默认值是`~/.m2/repository`，mac可以不配，windows可以设置到其他目录避免C盘爆满)
# -Dmaven.repo.local=/Users/kenstant/develop/maven_repository
```
:::

**关键优势**：通过在 `.mvn/maven.config` 中指定 `--settings=./settings.xml`，可以将 `settings.xml` 文件放在项目根目录，与项目一起进行版本控制。这样：
- ✅ 所有开发者使用相同的仓库配置
- ✅ 统一的镜像地址（如国内镜像加速）
- ✅ 统一的认证信息（私有仓库访问）
- ✅ CI/CD 环境自动使用相同配置
- ✅ 避免因配置差异导致的构建问题

**重要提示**：
- 路径 `./settings.xml` 中的 `./` 指的是 Maven 的当前工作目录（项目根目录），而不是 `.mvn` 目录
- 短参数可以使用 `-s./settings.xml` 或 `-s=./settings.xml` 两种写法
- 长参数只允许 `--settings=./settings.xml` 这种写法

### 3. 自动下载机制

当 `maven-wrapper.jar` 不存在时，脚本会：

1. 首先尝试使用 `wget` 下载
2. 如果没有 `wget`，尝试使用 `curl` 下载
3. 如果都没有，使用 Java 编译并运行 `MavenWrapperDownloader.java` 来下载

## 实际项目配置示例

### 单模块项目

对于单模块项目，Maven Wrapper 的配置非常简单，所有文件都在项目根目录：

```
single-module-project/
├── mvnw
├── mvnw.cmd
├── pom.xml
├── settings.xml
└── .mvn/
    ├── maven.config
    └── wrapper/
        ├── maven-wrapper.jar
        ├── maven-wrapper.properties
        └── MavenWrapperDownloader.java
```

### 多模块项目

对于多模块项目（Maven Multi-Module Project），Maven Wrapper 应该放在**父项目（Parent Project）的根目录**，而不是子模块中。

**正确的项目结构**：

```
multi-module-project/
├── mvnw                    # 在父项目根目录
├── mvnw.cmd                # 在父项目根目录
├── pom.xml                 # 父 POM（packaging 为 pom）
├── settings.xml            # 在父项目根目录
├── .mvn/                   # 在父项目根目录
│   ├── maven.config
│   └── wrapper/
│       ├── maven-wrapper.jar
│       ├── maven-wrapper.properties
│       └── MavenWrapperDownloader.java
├── module-a/               # 子模块 A
│   └── pom.xml
├── module-b/               # 子模块 B
│   └── pom.xml
└── module-c/               # 子模块 C
    └── pom.xml
```

**关键点**：
- ✅ Maven Wrapper 文件（`mvnw`、`mvnw.cmd`、`.mvn` 目录）只放在父项目根目录
- ✅ 子模块不需要单独的 Maven Wrapper 文件
- ✅ 在父项目根目录执行 `./mvnw` 命令，会自动处理所有子模块
- ✅ `settings.xml` 也放在父项目根目录，所有子模块共享同一配置

**使用示例**：

```bash
# 在父项目根目录执行，会构建所有子模块
./mvnw clean install

# 只构建特定子模块
./mvnw clean install -pl module-a

# 构建特定子模块及其依赖
./mvnw clean install -pl module-a -am
```

**为什么不在子模块中放置 Maven Wrapper？**
- Maven 多模块项目的构建是从父项目开始的，子模块是作为父项目的一部分被构建
- 在子模块中执行 `mvnw` 时，脚本会向上查找 `.mvn` 目录，最终找到父项目的配置
- 如果每个子模块都有自己的 Maven Wrapper，会造成配置冗余和不一致

::: code-group
```bash [mvnw脚本关键部分]
# 通过向上查找 .mvn 目录来确定项目根目录
# 逻辑：从当前目录开始，逐级向上查找，直到找到包含 .mvn 目录的目录，该目录即为项目根目录
find_maven_basedir() {
  basedir="$1"
  wdir="$1"
  while [ "$wdir" != '/' ] ; do
    if [ -d "$wdir"/.mvn ] ; then
      basedir=$wdir
      break
    fi
    wdir=`cd "$wdir/.."; pwd`
  done
  echo "${basedir}"
}

# 自动下载 maven-wrapper.jar
if [ -r "$BASE_DIR/.mvn/wrapper/maven-wrapper.jar" ]; then
    echo "Found .mvn/wrapper/maven-wrapper.jar"
else
    echo "Couldn't find .mvn/wrapper/maven-wrapper.jar, downloading it ..."
    # 从 maven-wrapper.properties 读取下载地址
    # 使用 wget 或 curl 下载
fi
```

```batch [mvnw.cmd脚本关键部分]
@REM 通过向上查找 .mvn 目录来确定项目根目录
:findBaseDir
IF EXIST "%WDIR%"\.mvn goto baseDirFound
cd ..
IF "%WDIR%"=="%CD%" goto baseDirNotFound
set WDIR=%CD%
goto findBaseDir

@REM 自动下载 maven-wrapper.jar
if exist %WRAPPER_JAR% (
    echo Found %WRAPPER_JAR%
) else (
    echo Couldn't find %WRAPPER_JAR%, downloading it ...
    powershell -Command "&{$webclient = new-object System.Net.WebClient; ...}"
)
```
:::

## 使用方法

### 基本用法

使用 Maven Wrapper 与使用普通 Maven 命令完全相同，只需要将 `mvn` 替换为 `./mvnw`（Unix/Linux/macOS）或 `mvnw.cmd`（Windows）：

```bash
# 编译项目
./mvnw clean compile

# 运行测试
./mvnw test

# 打包项目
./mvnw clean package

# 安装到本地仓库
./mvnw clean install

# 运行 Spring Boot 应用
./mvnw spring-boot:run
```

### Windows 使用

在 Windows 上，使用 `mvnw.cmd`：

```cmd
mvnw.cmd clean compile
mvnw.cmd clean package
```

### 查看有效配置

```bash
# 查看有效的 Maven 设置
./mvnw help:effective-settings -X

# 查看有效的 POM
./mvnw help:effective-pom
```

## 高级配置

### 自定义 Maven 仓库

如果项目需要从私有 Maven 仓库下载，可以通过环境变量配置：

```bash
export MVNW_REPOURL=https://your-private-repo.com/repository/maven-public
```

### 配置下载认证

如果需要认证才能下载 Maven Wrapper：

```bash
export MVNW_USERNAME=your-username
export MVNW_PASSWORD=your-password
```

### 启用详细日志

```bash
export MVNW_VERBOSE=true
./mvnw clean compile
```

## 如何为项目添加 Maven Wrapper

### 方法一：使用 Spring Initializr

如果你使用 Spring Initializr 创建项目，可以直接勾选 "Add Maven Wrapper" 选项。

### 方法二：使用 Maven 插件

在已有项目中，可以使用 Maven Wrapper 插件。有两种方式：

#### 方式 A：Apache 官方版本（推荐）

**Maven 3.7.0+** 可以使用官方内置的 Wrapper 插件：

```bash
# 使用默认 Maven 版本
mvn wrapper:wrapper

# 指定 Maven 版本
mvn wrapper:wrapper -Dmaven=3.9.6
```

#### 方式 B：Takari 版本（兼容旧版本）

如果使用的是 Maven 3.7.0 以下的版本，可以使用 Takari 的插件：

```bash
# 使用默认 Maven 版本
mvn -N io.takari:maven:wrapper

# 指定 Maven 版本
mvn -N io.takari:maven:wrapper -Dmaven=3.9.6
```

**说明**：
- `-N` 参数表示非递归模式（non-recursive），只在当前项目执行，不处理子模块
- 两种方式生成的 Wrapper 文件格式完全相同，可以互相兼容
- 新项目推荐使用 Apache 官方版本（`mvn wrapper:wrapper`）

### 方法三：手动添加

1. 创建 `.mvn/wrapper` 目录
2. 下载 `maven-wrapper.jar` 和 `maven-wrapper.properties`
3. 添加 `mvnw` 和 `mvnw.cmd` 脚本
4. 添加 `MavenWrapperDownloader.java`（可选，用于自动下载）

## 最佳实践

### 1. 版本控制

将以下文件提交到版本控制系统：

- ✅ `mvnw` 和 `mvnw.cmd` 脚本
- ✅ `.mvn/wrapper/maven-wrapper.properties`
- ✅ `.mvn/wrapper/MavenWrapperDownloader.java`
- ✅ `.mvn/maven.config`（如果使用）

**不要提交**：
- ❌ `.mvn/wrapper/maven-wrapper.jar`（会自动下载）

### 2. 统一 Maven 版本

在团队中统一使用相同的 Maven 版本，确保构建一致性。

### 3. 统一 settings.xml 配置

**这是 Maven Wrapper 最重要的优势之一**。通过 `.mvn/maven.config` 指定项目级别的 `settings.xml`：

```properties
# settings.xml文件的读取位置（注意：./ 指的是项目根目录，不是 .mvn 目录）
--settings=./settings.xml

# 线程数（根据机器性能调整）
--threads=4

# 跳过测试（根据实际情况选择）
-Dmaven.test.skip=true
```

然后在项目根目录创建 `settings.xml`，配置统一的：
- 仓库地址和镜像（如阿里云、华为云等国内镜像）
- 私有仓库认证信息
- 代理配置
- 其他 Maven 设置

将 `settings.xml` 提交到版本控制系统，确保团队所有成员和 CI/CD 环境使用完全相同的配置，避免"在我机器上能跑"的问题。

**多模块项目注意**：`settings.xml` 和 `.mvn/maven.config` 都放在父项目根目录，所有子模块共享同一配置。

### 4. CI/CD 集成

在 CI/CD 脚本中直接使用 `./mvnw`，无需安装 Maven：

```yaml
# GitHub Actions 示例
- name: Build with Maven
  run: ./mvnw clean package
```

## 常见问题

### Q: mvnw 脚本没有执行权限？

```bash
chmod +x mvnw
```

### Q: 下载 Maven 很慢？

可以配置使用国内镜像，修改 `.mvn/wrapper/maven-wrapper.properties`：

```properties
distributionUrl=https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip
```

### Q: 如何更新 Maven 版本？

修改 `.mvn/wrapper/maven-wrapper.properties` 中的 `distributionUrl`，指向新的 Maven 版本。

### Q: Windows 上无法执行 mvnw.cmd？

确保文件没有被重命名，保持为 `mvnw.cmd`。

## 总结

Maven Wrapper 是现代 Java 项目的最佳实践之一，它：

- ✅ 简化了项目设置流程
- ✅ 确保了构建环境的一致性（Maven 版本 + settings.xml 配置）
- ✅ 降低了新开发者的上手成本
- ✅ 简化了 CI/CD 配置
- ✅ **统一管理 settings.xml，确保仓库、镜像、认证等配置一致**

通过使用 Maven Wrapper，你的项目可以真正做到"开箱即用"，任何克隆项目的人都可以立即开始构建，无需担心 Maven 版本或配置问题。特别是通过项目级别的 `settings.xml` 统一配置，彻底解决了因配置差异导致的构建不一致问题。

---

**参考资源**：

- [Maven Wrapper 官方文档](https://maven.apache.org/wrapper/)
- [Maven Wrapper GitHub](https://github.com/takari/maven-wrapper)
- [Maven 官方文档](https://maven.apache.org/)
