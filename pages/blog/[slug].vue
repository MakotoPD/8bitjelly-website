<template>
	<div>
		<Head>
			<Title>8BitJelly - Blog</Title>
		</Head>

        <Menu />
		

		<div class="container mx-auto px-4 my-16 min-h-screen max-w-screen-lg">

			<div v-for="wpis in blog.data">

				<div v-for="text in wpis.attributes.zawartosc">

					<h1 class="text-6xl my-4" v-if="text.type == 'heading' && text.level == 1"> <span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }" >{{ x.text }}</span></h1>
					<h2 class="text-5xl my-4" v-if="text.type == 'heading' && text.level == 2"><span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }">{{ x.text }}</span></h2>
					<h3 class="text-4xl my-4" v-if="text.type == 'heading' && text.level == 3"><span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }">{{ x.text }}</span></h3>
					<h4 class="text-3xl my-4" v-if="text.type == 'heading' && text.level == 4"><span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }">{{ x.text }}</span></h4>
					<h5 class="text-2xl my-4" v-if="text.type == 'heading' && text.level == 5"><span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }">{{ x.text }}</span></h5>
					<h6 class="text-xl my-4" v-if="text.type == 'heading' && text.level == 6"><span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }">{{ x.text }}</span></h6>

					<code v-if="text.type == 'code'" class="px-1 py-0.5 bg-darker/20 rounded-md"><span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }">{{ x.text }}</span></code>

					<p class="text-md" v-if="text.type == 'paragraph'"><span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }">{{ x.text }}</span></p>

					<p v-if="text.type == 'quote'" class="border-l-4 border-l-darker/20 pl-2"><span v-for="x in text.children" :class="{ 'font-semibold': x.bold, 'italic': x.italic, 'underline': x.underline, 'line-through': x.strikethrough }">{{ x.text }}</span></p>


					<ul class="list list-disc list-inside" v-if="text.type == 'list' && text.format == 'unordered'">
						<li v-for="x in text.children">{{ x.children[0].text }}</li>
					</ul>

					<ol class="list list-decimal list-inside" v-if="text.type == 'list' && text.format == 'ordered'">
						<li v-for="x in text.children">{{ x.children[0].text }}</li>
					</ol>

					<img class="my-2 rounded-xl" v-if="text.type == 'image'" :src="text.image.url" :alt="text.image.name">



				</div>

				<p class="mt-8 text-sm bg-primary/30 px-2 py-1 rounded-lg border border-darker/30 w-fit">{{ wpis.attributes.autor }}, {{ wpis.attributes.publishedAt.split('T')[0] }}</p>

			</div>

		</div>

		<Foter/>
	</div>
</template>

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
