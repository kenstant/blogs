<script setup>
import { computed, ref } from "vue";
import { useData, useRoute, useRouter, withBase } from "vitepress";

const { frontmatter } = useData();
const route = useRoute();
const router = useRouter();

// 悬浮状态
const isHovered = ref(false);

// 计算返回路径：获取上一级路径或返回首页
// 注意：route.path 已经包含了 base 路径（如 /blogs/投资记录/经验教训）
const backPath = computed(() => {
  const path = route.path;
  // 分割路径段，过滤空字符串
  const pathSegments = path.split('/').filter(Boolean);
  
  // 如果路径段数大于 1，去掉最后一个路径段，返回上一级
  if (pathSegments.length > 1) {
    pathSegments.pop();
    return '/' + pathSegments.join('/') + '/';
  }
  
  // 如果只有一层（如 /blogs/），返回首页
  // 首页路径就是 base 路径，即第一个路径段 + /
  return '/' + (pathSegments[0] || '') + '/';
});

// 判断是否应该显示返回按钮
// 不显示的情况：首页、目录页（使用 CustomTocLayout 或 CustomHomeLayout）
const shouldShow = computed(() => {
  const layout = frontmatter.value.layout;
  
  // 如果是自定义布局页面（首页或目录页），不显示返回按钮
  if (layout === 'CustomHomeLayout') {
    return false;
  }
  
  // 如果是首页路径，不显示
  const path = route.path;
  // 检查是否是首页（可能是 /blogs/ 或 /blogs/index.html）
  const pathSegments = path.split('/').filter(Boolean);
  if (pathSegments.length <= 1 || (pathSegments.length === 2 && pathSegments[1] === 'index.html')) {
    return false;
  }
  
  // 其他情况都显示
  return true;
});

const handleBack = () => {
  // route.path 已经包含了 base，所以直接使用计算出的路径即可
  // router.go() 会自动处理路径
  router.go(backPath.value);
};
</script>

<template>
  <div 
    v-if="shouldShow" 
    class="back-button-floating"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- 悬浮球 -->
    <div class="floating-ball" :class="{ 'expanded': isHovered }" @click="handleBack">
      <span class="back-icon">←</span>
      <span class="back-text">返回</span>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/back-button.scss";
</style>

