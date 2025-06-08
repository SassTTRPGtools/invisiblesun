<template>
  <nav class="bg-gray-900 text-white shadow mb-6">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="font-bold text-xl tracking-wider">Invisible Sun 工具</div>
      <ul class="flex space-x-6">
        <li>
          <NuxtLink :to="base + '/'" class="hover:text-yellow-300 transition">首頁</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="base + '/soothdeck'" class="hover:text-yellow-300 transition">顯真牌</NuxtLink>
        </li>
        <!-- 可擴充更多選單項目 -->
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRuntimeConfig, onMounted } from '#imports'
const config = useRuntimeConfig()
const isProd = process.env.NODE_ENV === 'production'
const base = isProd && config.app && config.app.baseURL ? config.app.baseURL.replace(/\/$/, '') : ''

onMounted(() => {
  // 自動化檢查 baseURL 是否正確
  // 部屬後可於瀏覽器 console 看到
  // 若 baseURL 為 /invisiblesun/ 則代表 .env.production 有生效
  // 若 baseURL 為 / 則代表本地或 .env 未生效
  // eslint-disable-next-line no-console
  console.log('NUXT_APP_BASE_URL:', config.app.baseURL)
})
</script>

<style scoped>
</style>
