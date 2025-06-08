<template>
  <nav class="bg-gray-900 text-white shadow mb-6">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="font-bold text-xl tracking-wider">Invisible Sun 工具</div>
      <ul class="flex space-x-6">
        <li>
          <NuxtLink :to=" '/'" class="hover:text-yellow-300 transition">首頁</NuxtLink>
        </li>
        <li>
          <NuxtLink :to=" '/soothdeck'" class="hover:text-yellow-300 transition">顯真牌</NuxtLink>
        </li>
        <li>
          <NuxtLink :to=" '/draw'" class="hover:text-yellow-300 transition">單獨抽牌</NuxtLink>
        </li>
        <!-- 可擴充更多選單項目 -->
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>
