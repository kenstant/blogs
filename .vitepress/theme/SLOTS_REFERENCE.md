# VitePress 默认主题插槽参考

## 什么是插槽？

插槽（Slots）是 VitePress 默认主题提供的扩展点，允许你在特定位置插入自定义内容，而无需修改主题源码。

## 插槽来源

**重要**：这些插槽都是 **VitePress 官方默认主题提供的**，不是我们自己定义的。

你可以在 VitePress 官方文档中找到完整的插槽列表：
- 官方文档：https://vitepress.dev/guide/extending-default-theme#layout-slots

## 常用插槽列表

### 导航栏相关插槽

```javascript
Layout() {
    return h(DefaultTheme.Layout, null, {
        // 在导航栏标题前添加内容
        'nav-bar-title-before': () => h('div', '标题前的内容'),
        
        // 在导航栏标题后添加内容
        'nav-bar-title-after': () => h('div', '标题后的内容'),
        
        // 在导航栏内容后添加内容
        'nav-bar-content-after': () => h('div', '导航栏后的内容'),
    })
}
```

**位置示意**：
```
[Logo] [nav-bar-title-before] [站点标题] [nav-bar-title-after] [导航菜单] [nav-bar-content-after]
```

### 侧边栏相关插槽

```javascript
Layout() {
    return h(DefaultTheme.Layout, null, {
        // 在侧边栏顶部添加内容
        'sidebar-top': () => h('div', '侧边栏顶部'),
        
        // 在侧边栏底部添加内容
        'sidebar-bottom': () => h('div', '侧边栏底部'),
    })
}
```

**位置示意**：
```
┌─────────────┐
│ sidebar-top │
├─────────────┤
│  侧边栏内容  │
├─────────────┤
│sidebar-bottom│
└─────────────┘
```

### 页面内容相关插槽

```javascript
Layout() {
    return h(DefaultTheme.Layout, null, {
        // 完全自定义页面内容
        'page': () => h('div', '页面内容'),
        
        // 在页面顶部添加内容
        'page-top': () => h('div', '页面顶部'),
        
        // 在页面底部添加内容
        'page-bottom': () => h('div', '页面底部'),
    })
}
```

**位置示意**：
```
┌─────────────┐
│  page-top   │
├─────────────┤
│   页面内容   │
│   (page)    │
├─────────────┤
│ page-bottom │
└─────────────┘
```

### 页脚相关插槽

```javascript
Layout() {
    return h(DefaultTheme.Layout, null, {
        // 在页脚顶部添加内容
        'footer-top': () => h('div', '页脚顶部'),
        
        // 在页脚底部添加内容
        'footer-bottom': () => h('div', '页脚底部'),
    })
}
```

## 如何确认插槽是否存在？

### 方法 1：查看官方文档
访问 VitePress 官方文档：https://vitepress.dev/guide/extending-default-theme#layout-slots

### 方法 2：查看源码
查看 `node_modules/vitepress/dist/client/theme-default/Layout.vue` 文件，查找 `<slot>` 标签

### 方法 3：尝试使用
如果插槽不存在，内容不会被渲染，但也不会报错

## 实际使用示例

### 示例 1：在导航栏标题后添加徽章

```javascript
Layout() {
    return h(DefaultTheme.Layout, null, {
        'nav-bar-title-after': () => {
            return h('span', {
                style: {
                    background: '#006644',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    marginLeft: '8px'
                }
            }, 'NEW')
        },
        page: () => null
    })
}
```

### 示例 2：在侧边栏顶部添加搜索框

```javascript
import SearchBox from './components/SearchBox.vue'

Layout() {
    return h(DefaultTheme.Layout, null, {
        'sidebar-top': () => h(SearchBox),
        page: () => null
    })
}
```

### 示例 3：在页面顶部添加公告横幅

```javascript
Layout() {
    return h(DefaultTheme.Layout, null, {
        'page-top': () => {
            return h('div', {
                style: {
                    background: '#fff3cd',
                    border: '1px solid #ffc107',
                    padding: '10px',
                    textAlign: 'center',
                    color: '#856404'
                }
            }, '⚠️ 网站维护中，部分功能可能不可用')
        },
        page: () => null
    })
}
```

## 注意事项

1. **插槽名必须完全匹配**：大小写敏感，必须使用连字符（kebab-case）
2. **插槽函数必须返回内容**：返回 `null` 表示不渲染任何内容
3. **可以同时使用多个插槽**：在同一个对象中定义多个插槽
4. **插槽内容可以是组件**：使用 `h(YourComponent)` 而不是 `h('div', ...)`

## 总结

- ✅ `nav-bar-title-after` 是 VitePress 官方提供的插槽
- ✅ 所有插槽都是 VitePress 默认主题内置的
- ✅ 你可以直接使用这些插槽，无需额外配置
- ✅ 插槽名必须用引号包裹（因为包含连字符）

