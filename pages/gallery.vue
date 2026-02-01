<template>
	<div>
		<Head>
			<Title>8BitJelly - Gallery</Title>
		</Head>
		
		<div class="container mx-auto mt-24 mb-24">
			<h1 class="text-5xl font-semibold text-darkest ml-12">{{ $t('menu.gallery') }}</h1>


			<div v-for="galeria in gallery.data" class="mt-24">
				<h1 class="text-3xl font-semibold text-darkest drop-shadow-lg">{{ galeria.attributes.tytulGry }}</h1>

				<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4 md:px-0">
					<img v-for="zdjecie in galeria.attributes.zdjecia.data" loading="lazy" :src="'https://api.8bitjelly.com'+zdjecie.attributes.formats.small.url" :alt="zdjecie.attributes.name" class="rounded-xl">
				</div>
			</div>
			
		</div>

		<Foter/>
	</div>

</template>

<script setup lang="ts">
const { locale } = useI18n()

const gallery = ref()
const lang = ref(locale.value)


const fetchGallery = async () => {
    const { data, pending } = await useFetch(
        `https://api.8bitjelly.com/api/galerias?populate=zdjecia`
    )
    gallery.value = data.value

	console.log(data.value)
}


await fetchGallery();


watch(locale, (newLocale, oldLocale) => {
    lang.value = newLocale


    fetchGallery()
})

</script>