---
slug: spring-ai-intro
---

# Spring AI 入门

:::warning
版本信息如下：
JDK=`21`
Spring Boot=`3.5.9`
Spring AI=`1.1.2`

:::

## pom.xml
```xml
<properties>
    <java.version>21</java.version>
    <spring-ai.version>1.1.2</spring-ai.version>
</properties>
<dependencies>
    <!-- 省略掉其他的依赖，快速demo可以直接使用官方initializer，核心依赖如下 -->
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-starter-model-openai</artifactId>
    </dependency>
    <!-- 如果要使用不同的模型提供商，需要引入不同的依赖，例如 anthropic、deepseek -->
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-starter-model-anthropic</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-starter-model-deepseek</artifactId>
    </dependency>
</dependencies>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>${spring-ai.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## 简单使用
主要是使用`ChatClient`对象来完成调用，获取方式有两种：
- Spring Boot的自动配置，会自动注入`ChatClient.Builder`对象（默认）。
- 当然也可以自己编码实例化这个对象。

### 使用自动注入
这里直接给出官方的样例代码:
```Java
@RestController
class MyController {

    private final ChatClient chatClient;

    public MyController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @GetMapping("/ai")
    String generation(String userInput) {
        return this.chatClient.prompt()
            .user(userInput)
            .call()
            .content();
    }
}
```
其中`call()`方法像大模型发送请求，`content()`方法以字符串的方式返回大模型的响应。

## 多模型使用
先手动禁用`ChatClient.Builder`的自动配置，这样才能手动创建多个`ChatClient`对象:
::: code-group
```properties [application.properties]
spring.ai.chat.client.enabled=false
```

```yml [application.yml]
spring:
  ai:
    chat:
      client:
        enabled: false
```
:::