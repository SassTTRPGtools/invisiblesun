<template>

</template>

<script setup lang="ts">
// 這裡可以加入組件邏輯
if (process.client) {
  // 檢查 window.__NUXT__ 是否存在再存取 app.baseURL
  if (window.__NUXT__ && window.__NUXT__.app && window.__NUXT__.app.baseURL) {
    console.log('baseURL:', window.__NUXT__.app.baseURL)
  } else {
    console.log('baseURL 無法取得，window.__NUXT__ 結構如下:', window.__NUXT__)
  }
}
</script>

<style scoped>
h1 {
  color: #00dc82;
}
</style>
