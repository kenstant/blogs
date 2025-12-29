<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useHandleLink } from '../handleLink'

const { frontmatter } = useData();
const handleLink = useHandleLink();

// 从 frontmatter 中获取配置
const header = computed(() => frontmatter.value.header || {})
const cards = computed(() => frontmatter.value.cards || [])
</script>

<template>
  <!-- 直接返回内容，让 VitePress 的默认 Layout 包装 -->
  <div class="custom-home-container">
    <!-- 标题区域 -->
    <div class="custom-home-hero" v-if="header.name || header.text">
      <h1 class="custom-home-name" v-if="header.name">{{ header.name }}</h1>
      <p class="custom-home-text" v-if="header.text">{{ header.text }}</p>
    </div>

    <!-- 卡片区域 -->
    <div class="custom-home-features" v-if="cards.length > 0">
      <div class="custom-features-grid">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="custom-feature-card"
          @click="handleLink(card.link)"
        >
          <div class="custom-card-icon" v-if="card.icon">{{ card.icon }}</div>
          <h3 class="custom-card-title" v-if="card.title">{{ card.title }}</h3>
          <p class="custom-card-details" v-if="card.details">{{ card.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/homepage.scss";
</style>

