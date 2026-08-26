export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-gtag',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'Titan One': [400],
      'Space Grotesk': [400, 500, 600, 700],
      'Press Start 2P': [400],
      'JetBrains Mono': [400, 600],
      Fraunces: [400, 600, 700],
    },
    display: 'swap',
    preconnect: true,
  },

  gtag: {
    id: 'G-PCLLKCCJSV',
    initCommands: [
      ['consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      }],
    ],
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'pl', name: 'Polski', file: 'pl.json' },
    ],
    defaultLocale: 'en',
    langDir: 'lang/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  image: {
    domains: ['api.8bitjelly.com'],
    format: ['webp', 'jpg', 'png'],
  },

  app: {
    head: {
      title: '8BitJelly - Hobby group game development',
      meta: [
        { name: 'description', content: 'A hobby group of passionate game developers, artists, and musicians making games with love.' },
        { property: 'og:image', content: 'https://8bitjelly.com/og.png' },
        { property: 'og:site_name', content: '8BitJelly' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#FFF1EC' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          'data-website-id': 'f5e6e1c2-8bca-41c2-b6e3-c0f66d215ddf',
          defer: true,
        },
      ],
    },
  },

  site: {
    url: 'https://8bitjelly.com',
    name: '8BitJelly',
  },

  sitemap: {
    sources: ['/api/sitemap/urls'],
    exclude: ['/admin/**'],
    defaults: {
      changefreq: 'monthly',
      priority: 0.6,
    },
    urls: [
      { loc: '/',        priority: 1.0, changefreq: 'weekly'  },
      { loc: '/blog',    priority: 0.8, changefreq: 'weekly'  },
      { loc: '/gallery', priority: 0.6, changefreq: 'monthly' },
      { loc: '/contact', priority: 0.5, changefreq: 'yearly'  },
      { loc: '/privacy', priority: 0.3, changefreq: 'yearly'  },
      { loc: '/terms',   priority: 0.2, changefreq: 'yearly'  },
    ],
  },

  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || 'changeme',
    sessionSecret: process.env.NUXT_SESSION_SECRET || 'default-secret-please-change',
    r2AccountId: process.env.R2_ACCOUNT_ID || '',
    r2AccessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    r2Bucket: process.env.R2_BUCKET || '',
    r2PublicUrl: process.env.R2_PUBLIC_URL || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFromEmail: process.env.RESEND_FROM_EMAIL || 'no-reply@8bitjelly.com',
    appUrl: process.env.APP_URL || 'https://8bitjelly.com',
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || '',
    public: {
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
      web3formsKey: 'd503b806-9e80-42a2-a4e0-5ca88f9da25e',
    },
  },

  components: {
    dirs: [
      { path: '~/components/sections', pathPrefix: false },
      { path: '~/components/admin', pathPrefix: false },
      '~/components',
    ],
  },

  routeRules: {
    '/admin/**': {
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    },
    '/llms-full.txt': {
      headers: { 'Cache-Control': 'public, max-age=3600' },
    },
  },

  future: {
    compatibilityVersion: 4,
  },
})
