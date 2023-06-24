// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/styles.css"],
  app: {
    head: {
      title: 'Wallet Assignment - HighLevel'
    }
  },

  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE
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
