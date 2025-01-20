<template>
	<div >
		<Head>
			<Title>8BitJelly - Blog</Title>
		</Head>


		<div class="container mx-auto mt-24 mb-24 min-h-screen">
			<h1 class="text-5xl font-semibold text-darkest ml-8">{{ $t('page.blog.newest') }}</h1>

			<div class="py-8">
				<p class="text-lg font-semibold text-darker/60">{{ $t('page.blog.tags') }}:</p>
				<div class="flex gap-2 pt-2">
					<button class="px-3 py-0.5 bg-darkest/15 border-2 border-darkest/60 rounded-lg duration-150 hover:bg-darkest/50 hover:border-darkest/0 hover:text-white" data-tag-name="All" @click="filterBlog">All</button>
					<div v-for="tag in tags.data">
						<button
							v-if="tag.attributes.name != 'All'"
							class="px-3 py-0.5 bg-darkest/15 border-2 border-darkest/60 rounded-lg duration-150 hover:bg-darkest/50 hover:border-darkest/0 hover:text-white"
							:data-tag-name="tag.attributes.name"
							@click="filterBlog"
						>
							{{tag.attributes.name}}
						</button>
					</div>
					
				</div>
			</div>

			<div class="mt-8 px-8 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

				<NuxtLink :to="localePath('/blog/'+wpis.attributes.slug)" v-for="wpis in blog.data" 
					class="relative pb-4 md:pb-4 w-full bg-primary/20 rounded-2xl md:rounded-3xl border border-primary/50 hover:scale-105 duration-75">
					<img class="rounded-xl md:rounded-3xl mb-2 h-44 w-full object-cover" :src="'https://panel.8bitjelly.com'+wpis.attributes.zdjecie.data.attributes.formats.small.url" :alt="wpis.attributes.zdjecie.data.attributes.name">
					<p class="text-start px-4 text-sm text-darker/60">{{ wpis.attributes.autor }}・{{ wpis.attributes.publishedAt.split('T')[0] }}</p>
					<div class="mx-4">
						<p class="text-lg text-black/90">{{ wpis.attributes.Tytul }}</p>
					</div>
					<p class="px-4 text-sm text-darker/60">{{ wpis.attributes.blog.replace(/<[^>]*>?/gm, ' ').substring('0', '150').replace(wpis.attributes.Tytul, '') }}...</p>
					
					<div class="flex px-4 pt-2 gap-1">
						<div v-for="tag in  wpis.attributes.tags.data">
							<p v-if="tag.attributes.name != 'All'" class="px-2 py-0.5 bg-darker/30 rounded-full text-sm text-darker flex items-center gap-0.5">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#542137" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
								{{ tag.attributes.name }}
							</p>
						</div>
					</div>

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
const tags = ref()
const filterByTags = ref('filters[tags][name][$eq]=All')



const fetchBlog = async () => {
    const { data, pending } = await useFetch(
        `https://panel.8bitjelly.com/api/blogs?sort[0]=createdAt:desc&locale[0]=${lang.value}&${filterByTags.value}&populate[tags][fields][0]=name&populate[zdjecie]=true&fields[0]=Tytul&fields[1]=autor&fields[2]=locale&fields[3]=publishedAt&fields[4]=blog&fields[5]=slug`
    )
    blog.value = data.value

	console.log(data.value)
}

const filterBlog = async (e) => {
	filterByTags.value = 'filters[tags][name][$eq]='
	filterByTags.value = filterByTags.value+e.srcElement.dataset.tagName
	console.log(filterByTags.value)

	await fetchBlog();
}

const fetchTags = async () => {
    const { data, pending } = await useFetch(
        `https://panel.8bitjelly.com/api/blog-tags?locale[0]=${lang.value}&fields[0]=name&sort[0]=name:asc`
    )
    tags.value = data.value


	console.log('tags')
	console.log(data.value)
}


await fetchBlog();
await fetchTags();

watch(locale, (newLocale, oldLocale) => {
    lang.value = newLocale


    fetchBlog();
	fetchTags();
})
</script>