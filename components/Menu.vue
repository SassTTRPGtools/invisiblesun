<template>
  <nav class="fixed top-0 left-0 h-full w-48 bg-gray-900 text-white shadow flex flex-col z-40">
    <div class="font-bold text-xl tracking-wider px-6 py-6 border-b border-gray-800">Invisible Sun 工具</div>
    <ul class="flex-1 flex flex-col space-y-2 px-4 py-6">
      <li>
        <NuxtLink to="/" class="block py-2 px-3 rounded hover:bg-yellow-300 hover:text-gray-900 transition">首頁</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/soothdeck" class="block py-2 px-3 rounded hover:bg-yellow-300 hover:text-gray-900 transition">顯真牌</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/draw" class="block py-2 px-3 rounded hover:bg-yellow-300 hover:text-gray-900 transition">單獨抽牌</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/pathofsuns" class="block py-2 px-3 rounded hover:bg-yellow-300 hover:text-gray-900 transition">太陽路徑</NuxtLink>
      </li>
      <!-- 可擴充更多選單項目 -->
    </ul>
  </nav>
</template>

<script setup lang="ts">
// ...existing code...
</script>

<style scoped>
nav {
  min-width: 12rem;
}
</style>
