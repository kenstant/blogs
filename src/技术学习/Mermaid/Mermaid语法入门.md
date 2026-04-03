---
slug: mermaid-syntax-intro
---

# Mermaid 语法入门

[Mermaid](https://mermaid.js.org/) 是一种用**纯文本**描述图表的标记语言。把图和文档一起放进 Git、在 Markdown 里直接写、评审时还能看 diff，是它最常见的使用动机。

本文按「能照着写」的目标整理常用语法；更完整的说明以[官方文档](https://mermaid.js.org/intro/)为准。

## 在 Markdown 里怎么用

与 GitHub、多数编辑器一致，**` ```mermaid `** 代码块通常**只渲染成图**，不重复展示源码：

```mermaid
flowchart LR
  A[写文本] --> B[渲染成图]
```

本博客在需要「对照源码」时，另约定一种围栏语言 **` ```mermaid-doc `**：会先显示与 `mermaid` 相同的高亮源码，再在下方显示渲染结果。下文语法示例均使用 `mermaid-doc`。

在线试写可使用 [Mermaid Live Editor](https://mermaid.live/)。

---

## 1. 流程图（flowchart）

### 方向

| 关键字 | 含义 |
|--------|------|
| `TB` / `TD` | 自上而下 |
| `BT` | 自下而上 |
| `LR` | 从左到右 |
| `RL` | 从右到左 |

### 节点形状与连线

```mermaid-doc
flowchart TD
  id1[矩形]
  id2(圆角矩形)
  id3([体育场形])
  id4{菱形判断}
  id5((圆形))
  id1 --> id2
  id2 -.-> id3
  id3 ==> id4
  id4 -->|是| id5
  id4 -->|否| id1
```

### 子图（subgraph）

```mermaid-doc
flowchart TB
  subgraph 前端
    A[页面] --> B[请求]
  end
  subgraph 后端
    C[API] --> D[数据库]
  end
  B --> C
```

---

## 2. 时序图（sequenceDiagram）

描述参与者之间**按时间**的交互：

```mermaid-doc
sequenceDiagram
  participant 用户
  participant 前端
  participant API
  用户->>前端: 提交表单
  前端->>+API: POST /orders
  API-->>-前端: 201
  前端-->>用户: 提示成功
```

- `participant`：声明参与者。  
- `->` / `-->`：实线 / 虚线消息；`>>` 为异步风格箭头（视渲染版本略有差异）。  
- `+` / `-`：可表示激活条（调用期间）。

---

## 3. 类图（classDiagram）

适合表达面向对象结构：

```mermaid-doc
classDiagram
  class Animal {
    +String name
    +move()
  }
  class Dog {
    +bark()
  }
  Animal <|-- Dog
```

关系符号很多（关联、聚合、组合等），需要时查[类图语法页](https://mermaid.js.org/syntax/classDiagram.html)。

---

## 4. 状态图（stateDiagram-v2）

适合订单、工单等**状态迁移**：

```mermaid-doc
stateDiagram-v2
  [*] --> 待支付
  待支付 --> 已支付: 支付成功
  已支付 --> 已发货: 发货
  已发货 --> [*]
  待支付 --> 已取消: 超时或用户取消
```

---

## 5. ER 图（erDiagram）

快速画表之间的实体关系：

```mermaid-doc
erDiagram
  USER ||--o{ ORDER : places
  USER {
    string id PK
    string email
  }
  ORDER {
    string id PK
    string user_id FK
  }
```

---

## 6. 甘特图（gantt）

项目排期、里程碑：

```mermaid-doc
gantt
  title 示例迭代
  dateFormat YYYY-MM-DD
  section 设计
  需求评审 :a1, 2026-04-01, 3d
  方案设计 :a2, after a1, 5d
  section 开发
  编码实现 :a3, after a2, 10d
```

---

## 7. 饼图（pie）

```mermaid-doc
pie title 时间分配（示例）
  "开发" : 50
  "会议" : 25
  "文档" : 25
```

---

## 8. 思维导图（mindmap）

较新的 Mermaid 版本支持（若本地不渲染，多半是版本或环境未开启）：

```mermaid-doc
mindmap
  root((Mermaid))
    流程图
    时序图
    类图
    状态图
```

---

## 实用建议

1. **节点 ID** 建议用英文、数字、下划线，显示文字放在 `[]`、`()` 等括号内。  
2. **特殊字符**：标签内容可用英文双引号包裹。  
3. **版本差异**：新图表类型在旧环境可能报错；以你使用的 Mermaid 版本为准。  
4. **调试**：语法错误时渲染器会提示；先在 Live Editor 验证再贴进长文。  

## 速查表

| 类型 | 关键字 | 典型场景 |
|------|--------|----------|
| 流程图 | `flowchart` | 分支、业务流程 |
| 时序图 | `sequenceDiagram` | 调用链、前后端协作 |
| 类图 | `classDiagram` | 领域模型 |
| 状态图 | `stateDiagram-v2` | 生命周期 |
| ER 图 | `erDiagram` | 表关系草图 |
| 甘特图 | `gantt` | 排期 |
| 饼图 | `pie` | 简单占比 |

---

## 参考链接

- [Mermaid 官方文档](https://mermaid.js.org/)  
- [Mermaid Live Editor](https://mermaid.live/)  
