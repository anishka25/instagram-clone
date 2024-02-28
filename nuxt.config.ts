// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 devtools: { enabled: true }, 
 css : ['~/assets/css/main.css'],
 runtimeConfig: {
   databaseUrl: ''
 },

 nitro: {
       moduleSideEffects: ["lucia/polyfill/node"]
   },

 modules: ["@nuxtjs/tailwindcss", "nuxt-icon"]
})