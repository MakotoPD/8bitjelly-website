// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
		head: {
			title: '8BitJelly - Hobby group game development',
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
					content: 'Our hobby is game development. We are a small but close-knit team who love making games and want to share this with others. The most important thing for us is support, having fun together and being creative while learning new knowledge and skills.'
				},
				{
					name: 'keywords',
					content: 'gamedev, gamedev polish, gamedev poland, game studio, games, game, developers, developer, 8bit, 8bitjelly, unity, unity game development, unity game, indie game, independent game, unity games, game making, fromsoftware games, indie game dev, digital extreme, unity game dev'
				},
				{
					name: 'og:image',
					content: '/og.png'
				},
				{
					name: 'theme-color',
					content: '#feeff5'
				}
			],
			link: [{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.ico'
				},
				{
					rel: 'stylesheet',
					href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
					media: 'print', 
					onload: 'this.media="all"'
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
					href: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
					media: 'print', 
					onload: 'this.media="all"'
				},
				{
					rel: 'canonical',
					href: 'https://8bitjelly.com'
				}
			],

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
		'@nuxtjs/robots',			//robots
		'@nuxtjs/sitemap',			//sitemap	
		'vue3-carousel-nuxt',		//carousel
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

	gtag: {
		id: 'G-PCLLKCCJSV'
	},

	googleFonts: {
		display: 'swap',
		families: {
			Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		}
	},


	robots: {
		UserAgent: '*',
		Disallow: '',
		Sitemap: 'https://8bitjelly.com/sitemap.xml'
	},


	site: {
		sources: [
			'/api/__sitemap__/urls',
		  ]
	},


	css: [
		'@/assets/css/global.css',
	]
})
