// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
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
