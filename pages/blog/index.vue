<template>
	<div >
		<Head>
			<Title>8BitJelly - Blog</Title>
		</Head>

        <Menu />
		

		<div class="container mx-auto mt-24 mb-24 min-h-screen">
			<h1 class="text-5xl font-semibold text-darkest ml-8">Blog</h1>

			<div class="mt-8 px-8 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<div class="animate-pulse flex items-center justify-center pb-2 md:pb-4 w-full h-16 md:h-auto bg-primary/20 rounded-2xl md:rounded-3xl border border-primary/50">
					<p class="text-darker text-xl animate-pulse	"> {{ $t('page.blog.new') }}</p>
				</div>

				<NuxtLink :to="localePath('/blog/'+wpis.attributes.slug)" v-for="wpis in blog.data" 
					class="relative pb-4 md:pb-4 w-full bg-primary/20 rounded-2xl md:rounded-3xl border border-primary/50 hover:scale-105 duration-75">
					<img class="rounded-xl md:rounded-3xl mb-2 h-44 w-full object-cover" :src="'https://panel.8bitjelly.com'+wpis.attributes.zdjecie.data.attributes.formats.small.url" :alt="wpis.attributes.zdjecie.data.attributes.name">
					<p class="text-start px-4 text-sm text-darker/60">{{ wpis.attributes.autor }}・{{ wpis.attributes.publishedAt.split('T')[0] }}</p>
					<div class="mx-4">
						<p class="text-lg text-black/90">{{ wpis.attributes.Tytul }}</p>
					</div>
					<p class="px-4 text-sm text-darker/60">{{ wpis.attributes.blog.replace(/<[^>]*>?/gm, ' ').substring('0', '150').replace(wpis.attributes.Tytul, '') }}...</p>
				</NuxtLink>
				
			</div>

		</div>

		<Foter/>
	</div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const blog = ref()
const lang = ref(locale.value)


const fetchBlog = async () => {
    const { data, pending } = await useFetch(
        `https://panel.8bitjelly.com/api/blogs?populate=zdjecie&locale=${lang.value}&sort[1]=createdAt:desc&fields[0]=Tytul&fields[1]=autor&fields[2]=locale&fields[3]=publishedAt&fields[4]=slug&fields[5]=blog`
    )
    blog.value = data.value


	console.log(data.value)
}


await fetchBlog();


watch(locale, (newLocale, oldLocale) => {
    lang.value = newLocale


    fetchBlog()
})
</script>