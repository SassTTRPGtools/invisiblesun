<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
    <h1 class="text-3xl md:text-5xl font-bold mb-4 text-white">Invisible Sun 工具</h1>
    <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
      歡迎使用 Invisible Sun 遊戲工具！這裡提供了顯真牌查看、單獨抽牌和太陽路徑等功能。
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl">
      <!-- 顯真牌 -->
      <NuxtLink to="/soothdeck" class="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition group">
        <div class="text-center">
          <svg class="w-12 h-12 mx-auto mb-4 text-blue-400 group-hover:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-white mb-2">顯真牌</h2>
          <p class="text-gray-400 text-sm">查看所有顯真牌的詳細資訊</p>
        </div>
      </NuxtLink>
      
      <!-- 單獨抽牌 -->
      <NuxtLink to="/draw" class="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition group">
        <div class="text-center">
          <svg class="w-12 h-12 mx-auto mb-4 text-green-400 group-hover:text-green-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-white mb-2">單獨抽牌</h2>
          <p class="text-gray-400 text-sm">隨機抽取一張顯真牌</p>
        </div>
      </NuxtLink>
      
      <!-- 太陽路徑 -->
      <NuxtLink to="/pathofsuns" class="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition group">
        <div class="text-center">
          <svg class="w-12 h-12 mx-auto mb-4 text-yellow-400 group-hover:text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-white mb-2">太陽路徑</h2>
          <p class="text-gray-400 text-sm">在太陽路徑上進行抽牌</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
h1 {
  color: #00dc82;
}
</style>
