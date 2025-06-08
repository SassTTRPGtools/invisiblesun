// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },  
  modules: [
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt', 
  ],
  app: {
    baseURL: '/invisiblesun/', // 請依你的 repo 名稱調整
  },
  nitro: {
    preset: 'static',
    output: {
      dir: './dist'
    }
  },
})
