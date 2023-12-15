// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
		head: {
			title: '8BitJelly - 😊',
			htmlAttrs: {
				lang: 'en',
			},
			meta: [{
					charset: 'utf-8'
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				},
				{
					name: 'format-detection',
					content: 'telephone=no'
				},
				{
					name: 'description',
					content: ''
				},
				{
					name: 'keywords',
					content: ''
				},
				{
					name: 'og:image',
					content: '/og.png'
				}
			],
			link: [{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.ico'
				},
				{
					rel: 'alternate',
					hreflang: 'pl',
					href: 'https://www.8bitjelly.com/pl'
				},
				{
					rel: 'alternate',
					hreflang: 'en-GB',
					href: 'https://www.8bitjelly.com/'
				},
				{
					rel: 'stylesheet',
					href: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
				}
			],
			script: [{
				src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
			}]
		},

	},
	modules: [
		'@nuxtjs/tailwindcss', 		//css framework
		'@nuxtjs/i18n', 			//i18n for multilang page
		'nuxt-gtag', 				//gtag google analytics
		'@nuxtjs/google-fonts',   	//google fonts
		'@nuxt/image',				//images
		'@hypernym/nuxt-anime',		//animations  https://github.com/hypernym-studio/nuxt-anime  https://animejs.com/documentation/
		'nuxt-swiper',				//swiper		https://nuxt.com/modules/swiper
	],

	tailwindcss: {
		configPath: 'tailwind.config',
	},


	i18n: {
		locales: [{
				code: 'en',
				iso: 'en-US',
				file: 'en.json'
			},
			{
				code: 'pl',
				iso: 'pl-PL',
				file: 'pl.json'
			}
		],
		langDir: 'lang/',
		defaultLocale: 'en',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
		}
	},

	googleFonts: {
		display: 'swap',
		families: {
			Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		}
	},


	css: [
		'@/assets/css/global.css',
	]
})
