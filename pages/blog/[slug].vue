<template>
	<div>
		<Head>
			<Title>8BitJelly - Blog</Title>
		</Head>

        <Menu />
		

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
	@apply text-5xl my-4 font-semibold
}
.blogpost h2{
	@apply text-4xl my-4
}
.blogpost h3{
	@apply text-3xl my-4
}
.blogpost h4{
	@apply text-2xl my-4
}
.blogpost p{
	@apply my-4
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


watch(locale, (newLocale, oldLocale) => {
    lang.value = newLocale

	console.log(lang.value)
    fetchBlog()
})
</script>
