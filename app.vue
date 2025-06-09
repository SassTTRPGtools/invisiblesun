<template>
  <div class="bg-gray-900 min-h-screen">
    <Menu />    <!-- 桌面版：左側邊欄，主內容右移 -->
    <div class="lg:ml-48 ml-0 mb-16 lg:mb-0">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './components/Menu.vue'
import '@/assets/app.css'
</script>
