<script setup>
import { computed } from "vue";
import { useData, useRouter, useRoute, withBase } from "vitepress";

const { frontmatter } = useData();
const router = useRouter();
const route = useRoute();

const topic = computed(() => frontmatter.value.topic);
const list = computed(() => frontmatter.value.list || []);

const handleItemLink = (link) => {
  if (!link) return;
  
  // 相对路径：基于当前路径拼接
  if (!link.startsWith('/')) {
    // 移除末尾的 /index.html 或者 /index
    const currentDir = route.path.replace(/\/index\.html?$/, '').replace(/\/$/, '');
    // 移除开头的 ./ 和 末尾的 .md 扩展名
    const cleanLink = link.replace(/^\.\//, '').replace(/\.md$/, '');
    router.go(`${currentDir}/${cleanLink}`);
  } else {
    // 绝对路径
    router.go(withBase(link));
  }
};
</script>

<template>
<!-- 直接返回内容，让 VitePress 的默认 Layout 包装 -->
  <div class="custom-toc-container">
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