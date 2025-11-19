import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@primevue/nuxt-module",
  ],

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },

  css: ["~/assets/css/global.scss"],

  image: {
    domains: ["https://images.unsplash.com"],
  },

  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    redisUrl: process.env.REDIS_URL,
    redisDbKey: process.env.REDIS_DATA_KEY,
    public: {},
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/css/utils.scss" as *;
          `,
        },
      },
    },
  },
});
