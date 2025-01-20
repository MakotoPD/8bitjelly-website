<template>
	<div>
		<Head>
			<Title>8BitJelly - Blog</Title>
		</Head>

		<div class="container mx-auto px-4 my-16 min-h-screen max-w-screen-lg">

			<div v-for="wpis in blog.data">

				<div class="blogpost" v-html="wpis.attributes.blog"></div>

				<p class="mt-8 text-sm bg-primary/30 px-2 py-1 rounded-lg border border-darker/30 w-fit">{{ wpis.attributes.autor }}, {{ wpis.attributes.publishedAt.split('T')[0] }}</p>

			</div>

		</div>

		<Foter/>
	</div>
</template>

<style>
.blogpost h1{
	@apply text-5xl my-4 font-semibold text-primary border-l-4 border-primary pl-4 relative -left-4
}
.blogpost h2{
	@apply text-4xl my-4 text-darker/80
}
.blogpost h3{
	@apply text-3xl my-4 text-darker/80
}
.blogpost h4{
	@apply text-2xl my-4
}
.blogpost p{
	@apply my-4
}

.blogpost img{
	@apply my-4 rounded-2xl
}

@media screen and (max-width:800px) {
	.blogpost h1{
		@apply text-3xl
	}
	.blogpost h2{
		@apply text-2xl
	}
	.blogpost h3{
		@apply text-xl
	}
	.blogpost h4{
		@apply text-lg
	}
}

</style>

<script setup lang="ts">
definePageMeta({
  layout: 'post'
})

const route = useRoute()

const { slug } = useRoute().params;
const { locale } = useI18n()

const blog = ref()
const lang = ref(locale.value)


const fetchBlog = async () => {
	if (lang.value == 'pl') {
		const { data, pending } = await useFetch(
			`https://panel.8bitjelly.com/api/blogs?populate=*&filters[slug][$eq]=${slug}&locale=pl`
		)

		blog.value = data.value
		

	} else {
		const { data, pending } = await useFetch(
			`https://panel.8bitjelly.com/api/blogs?populate=*&filters[slug][$eq]=${slug}`
		)

		blog.value = data.value

	}


}

await fetchBlog();


useHead({
	script: [
		{ type:"application/ld+json", children: `{
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://8bitjelly.com${route.fullPath}"
				},
				"headline": "${blog.value.data[0].attributes.Tytul}",
				"description": "${blog.value.data[0].attributes.blog.replace(/<[^>]*>?/gm, ' ').substring('0', '150').replace(blog.value.data[0].attributes.Tytul, '')}",
				"image": "https://panel.8bitjelly.com${blog.value.data[0].attributes.zdjecie.data.attributes.formats.small.url}",  
				"author": {
					"@type": "Organization",
					"name": "8BitJelly",
					"url": "https://8bitjelly.com"
				},  
				"publisher": {
					"@type": "Organization",
					"name": "8BitJelly",
					"logo": {
					"@type": "ImageObject",
					"url": "https://8bitjelly.com/_vercel/image?url=%2Flogo_white.svg&w=1536&q=40"
					}
				},
				"datePublished": "2024-11-18"
			}` 
		}
	]
})

watch(locale, (newLocale, oldLocale) => {
    lang.value = newLocale

	console.log(lang.value)
    fetchBlog()
})
</script>
