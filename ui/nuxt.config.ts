// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/styles.css"],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8082'
    }
  },
  devServer: {
    port: 3001
  },
  components: [
    { path: '~/components/Wallet' },
    { path: '~/components/Transactions' },

  ],
  devtools: { enabled: process.env.DEVTOOLS_ENABLED || true }
})
