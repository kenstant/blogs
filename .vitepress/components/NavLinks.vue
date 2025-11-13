<template>
  <nav class="nav-links">
    <div class="nav-links-container">
      <a v-if="showHome" href="/blogs/" class="nav-link nav-link-home">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>回到首页</span>
      </a>
      
      <a v-if="showParent" :href="parentPath" class="nav-link nav-link-parent">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        <span>上一级</span>
      </a>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

// 判断是否显示"回到首页"（非首页时显示）
const showHome = computed(() => {
  const path = route.path
  return path !== '/blogs/' && path !== '/blogs' && path !== '/blogs/index.html'
})

// 判断是否显示"上一级"（非首页且非一级目录时显示）
const showParent = computed(() => {
  const path = route.path
  if (path === '/blogs/' || path === '/blogs' || path === '/blogs/index.html') return false
  
  // 移除 base 路径和文件名
  let relativePath = path.replace(/^\/blogs\//, '').replace(/\/index\.html$/, '').replace(/\.html$/, '')
  const segments = relativePath.split('/').filter(Boolean)
  
  return segments.length > 1 // 至少有两级路径才显示"上一级"
})

// 计算上一级路径
const parentPath = computed(() => {
  const path = route.path
  let relativePath = path.replace(/^\/blogs\//, '').replace(/\/index\.html$/, '').replace(/\.html$/, '')
  const segments = relativePath.split('/').filter(Boolean)
  
  if (segments.length <= 1) return '/blogs/'
  
  // 移除最后一段
  segments.pop()
  const parent = segments.join('/')
  return '/blogs/' + parent + '/'
})
</script>

<style scoped>
.nav-links {
  margin: 24px 0;
  padding: 16px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.nav-links-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: var(--vp-c-bg-soft-up);
  border-color: #006644;
  color: #006644;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 102, 68, 0.1);
}

.nav-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* 深色模式适配 */
.dark .nav-link {
  background-color: var(--vp-c-bg-alt);
}

.dark .nav-link:hover {
  background-color: var(--vp-c-bg);
}
</style>

