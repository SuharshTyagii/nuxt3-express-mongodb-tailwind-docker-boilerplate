// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/styles.css"],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:8082"
    }
  },
  components: [
    { path: '~/components/Wallet' },
    { path: '~/components/Transactions' },

  ],
  devtools: { enabled: true }
})
