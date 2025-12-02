import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@primevue/nuxt-module",
    "@nuxt/fonts",
  ],

  app: {
    head: {
      title: "Semantic Search",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content:
            "web app for searching producs, using semantic search AI features for perfect search",
        },
        { name: "theme-color", content: "#10b8a8" },
      ],
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
    plugins: [tailwindcss()],
  },
});
