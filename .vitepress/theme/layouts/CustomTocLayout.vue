<script setup>
import { computed } from "vue";
import { useData } from "vitepress";
import { useHandleLink } from "../handleLink";

const { frontmatter } = useData();
const handleLink = useHandleLink();

const topic = computed(() => frontmatter.value.topic);
const list = computed(() => frontmatter.value.list || []);
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
          @click="handleLink(item.link)"
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