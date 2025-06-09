<template>  <!-- 桌面版：左側固定側邊欄 -->
  <nav 
    class="lg:flex fixed top-0 left-0 h-screen w-48 bg-gray-900 text-white shadow-lg flex-col z-50" 
    id="desktop-nav"
  >
    <div class="font-bold text-xl tracking-wider px-6 py-6 border-b border-gray-800">Invisible Sun 工具</div>    <ul class="flex-1 flex flex-col space-y-2 px-4 py-6">
      <li>
        <NuxtLink 
          to="/" 
          class="block py-2 px-3 rounded transition cursor-pointer select-none"
          active-class="bg-yellow-300 text-gray-900"
          exact-active-class="bg-yellow-300 text-gray-900"
          :class="$route.path === '/' ? 'bg-yellow-300 text-gray-900' : 'hover:bg-yellow-300 hover:text-gray-900'"
          @click="handleNavigation('/')"
        >
          首頁
        </NuxtLink>
      </li>
      <li>
        <NuxtLink 
          to="/soothdeck" 
          class="block py-2 px-3 rounded transition cursor-pointer select-none"
          active-class="bg-yellow-300 text-gray-900"
          :class="$route.path === '/soothdeck' ? 'bg-yellow-300 text-gray-900' : 'hover:bg-yellow-300 hover:text-gray-900'"
          @click="handleNavigation('/soothdeck')"
        >
          顯真牌
        </NuxtLink>
      </li>
      <li>
        <NuxtLink 
          to="/draw" 
          class="block py-2 px-3 rounded transition cursor-pointer select-none"
          active-class="bg-yellow-300 text-gray-900"
          :class="$route.path === '/draw' ? 'bg-yellow-300 text-gray-900' : 'hover:bg-yellow-300 hover:text-gray-900'"
          @click="handleNavigation('/draw')"
        >
          單獨抽牌
        </NuxtLink>
      </li>
      <li>
        <NuxtLink 
          to="/pathofsuns" 
          class="block py-2 px-3 rounded transition cursor-pointer select-none"
          active-class="bg-yellow-300 text-gray-900"
          :class="$route.path === '/pathofsuns' ? 'bg-yellow-300 text-gray-900' : 'hover:bg-yellow-300 hover:text-gray-900'"
          @click="handleNavigation('/pathofsuns')"
        >
          太陽路徑
        </NuxtLink>
      </li>
    </ul>
  </nav>  <!-- 手機版：底部固定導航 -->
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-lg z-50 border-t border-gray-700">
    <ul class="flex justify-around items-center py-2">
      <li class="flex-1">
        <NuxtLink 
          to="/" 
          class="flex flex-col items-center py-2 px-1 text-xs rounded transition cursor-pointer select-none"
          active-class="bg-gray-800 text-yellow-300"
          exact-active-class="bg-gray-800 text-yellow-300"
          :class="$route.path === '/' ? 'bg-gray-800 text-yellow-300' : 'hover:bg-gray-800'"
          @click="handleNavigation('/')"
        >
          <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          <span>首頁</span>
        </NuxtLink>
      </li>
      <li class="flex-1">
        <NuxtLink 
          to="/soothdeck" 
          class="flex flex-col items-center py-2 px-1 text-xs rounded transition cursor-pointer select-none"
          active-class="bg-gray-800 text-yellow-300"
          :class="$route.path === '/soothdeck' ? 'bg-gray-800 text-yellow-300' : 'hover:bg-gray-800'"
          @click="handleNavigation('/soothdeck')"
        >
          <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
          </svg>
          <span>顯真牌</span>
        </NuxtLink>
      </li>
      <li class="flex-1">
        <NuxtLink 
          to="/draw" 
          class="flex flex-col items-center py-2 px-1 text-xs rounded transition cursor-pointer select-none"
          active-class="bg-gray-800 text-yellow-300"
          :class="$route.path === '/draw' ? 'bg-gray-800 text-yellow-300' : 'hover:bg-gray-800'"
          @click="handleNavigation('/draw')"
        >
          <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
          </svg>
          <span>抽牌</span>
        </NuxtLink>
      </li>
      <li class="flex-1">
        <NuxtLink 
          to="/pathofsuns" 
          class="flex flex-col items-center py-2 px-1 text-xs rounded transition cursor-pointer select-none"
          active-class="bg-gray-800 text-yellow-300"
          :class="$route.path === '/pathofsuns' ? 'bg-gray-800 text-yellow-300' : 'hover:bg-gray-800'"
          @click="handleNavigation('/pathofsuns')"
        >
          <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>太陽路徑</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from '#app'

const route = useRoute()

// 使用 Nuxt 3 的 navigateTo 函數
const handleNavigation = (path: string) => {
  console.log('導航到:', path)
  navigateTo(path)
}
</script>

<style scoped>
/* 桌面版和手機版導航的顯示控制 */
#desktop-nav {
  display: none;
}

@media (min-width: 1024px) {
  #desktop-nav {
    display: flex !important;
  }
}

@media (max-width: 1023px) {
  #desktop-nav {
    display: none !important;
  }
}

nav {
  min-width: 12rem;
}
</style>
