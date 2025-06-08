// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt',
  ],
  css: ['~/assets/app.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
  },
  hooks: {
    'app:mounted'() {
      // 自動化檢查 baseURL 是否正確
      // 部屬後可於瀏覽器 console 看到
      // 若 baseURL 為 /invisiblesun/ 則代表 .env.production 有生效
      // 若 baseURL 為 / 則代表本地或 .env 未生效
      // eslint-disable-next-line no-console
      console.log('NUXT_APP_BASE_URL:', process.env.NUXT_APP_BASE_URL)
    }
  },
  nitro: {
    preset: 'static',
    output: {
      dir: './dist'
    }
  },
})
