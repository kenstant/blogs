<script setup>
import { computed } from "vue";
import {useData, useRoute, useRouter, withBase} from "vitepress";

const { frontmatter } = useData();
const route = useRoute();
const router = useRouter();

const topic = computed(() => frontmatter.value.topic);
const list = computed(() => frontmatter.value.list || []);

// 计算返回路径：获取上一级路径或返回首页
const backPath = computed(() => {
  const path = route.path;
  // 分割路径段，过滤空字符串
  const pathSegments = path.split('/').filter(Boolean);
  
  if (pathSegments.length > 1) {
    // 去掉最后一个路径段，返回上一级
    pathSegments.pop();
    return '/' + pathSegments.join('/') + '/';
  }
  // 如果只有一层，返回首页
  return '/';
});

const handleItemLink = (link) => {
  if (link) {
    router.go(withBase(link));
  }
}

const handleBack = () => {
  router.go(withBase(backPath.value));
}
</script>

<template>
<!-- 直接返回内容，让 VitePress 的默认 Layout 包装 -->
  <div class="custom-toc-container">
    <!-- 返回按钮 -->
    <div class="custom-toc-back" @click="handleBack">
      <span class="back-icon">←</span>
      <span class="back-text">返回</span>
    </div>
    <!-- 主题 -->
    <div class="custom-toc-topic" v-if="topic">{{ topic }}</div>
    <!-- 列表 -->
    <div class="custom-toc-list" v-if="list.length > 0">
      <div
          class="custom-toc-item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleItemLink(item.link)"
      >
        <!-- 条目 -->
        <div class="custom-toc-item-title" v-if="item.title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/toc-page.scss";
</style>