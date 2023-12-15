<template>
    <div class="overflow-x-hidden">

        <Landing />

        <div id="projects" class="md:grid grid-cols-2 mt-24 container mx-auto">
            <div class="flex justify-center items-cente">
                <img loading="lazy" class="whale w-full h-full" src="/whale.png" />
            </div>
            <div class="mt-24 md:mt-0">
                <div class="px-4 flex flex-col gap-y-2 mb-8">
                    <p class="z-10 text-primary font-bold">- {{ $t('page.home.projects.sub') }}</p>
                    <h1 class="z-10 text-darker text-4xl font-bold leading-tight">{{ $t('page.home.projects.title') }}</h1>
                    <p class="z-10 text-darker/80 text-md font-light">{{ $t('page.home.projects.desc') }}</p>
                </div>

                <Games />
            </div>
        </div>
        
        <div id="tech" class="mt-24 flex justify-center md:block md:px-4">
            <Tech />
        </div>

        <div id="about" class="mt-24 container mx-auto">
            <div class="px-4 flex flex-col gap-y-2 mb-8">
                <p class="z-10 text-primary font-bold">- {{ $t('page.home.about.sub') }}</p>
                <h1 class="z-10 text-darker text-4xl font-bold leading-tight">{{ $t('page.home.about.title') }}</h1>
                <p class="z-10 text-darker/80 text-md font-light max-w-xl">{{ $t('page.home.about.desc') }}</p>
            </div>

            <div class="flex flex-wrap justify-center gap-x-4 gap-y-6 mb-24">
                <div v-for="osoba in osoby.data" class="p-4 rounded-xl bg-primary/20 max-w-sm relative">
                    <div class="mb-4 h-40">
                        <img loading="lazy" class="h-40 rounded-lg" :src="'https://panel.makoto.com.pl'+osoba.attributes.Avatar.data.attributes.url " :alt="osoba.attributes.Nick"/>
                    </div>
                    <div class="mb-8">
                        <div><span class="text-darker font-semibold text-xl">{{ osoba.attributes.Nick}}</span> | <span class="text-primary">{{ osoba.attributes.Stanowisko }}</span></div>
                        <p class="text-darker text-xs md:text-sm">{{ osoba.attributes.Opis }}</p>
                    </div>
                    <div class="mt-4 flex gap-3 items-end absolute bottom-4 left-4">
                        <a v-if="osoba.attributes.Linkedin" :href="osoba.attributes.Linkedin" target="_blank">
                            <img class="h-6" src="/icons/linkedin.svg" alt="">
                        </a>    
                        <a v-if="osoba.attributes.Instagram" :href="osoba.attributes.Instagram" target="_blank">
                            <img class="h-6" src="/icons/instagram.svg" alt="">
                        </a>
                        <a v-if="osoba.attributes.GitHub" :href="osoba.attributes.GitHub" target="_blank">
                            <img class="h-6" src="/icons/github.svg" alt="">
                        </a>
                        <a v-if="osoba.attributes.Website" :href="osoba.attributes.Website" target="_blank">
                            <img class="h-6" src="/icons/globe.svg" alt="">
                        </a>
                        <a v-if="osoba.attributes.XTwitter" :href="osoba.attributes.XTwitter" target="_blank">
                            <img class="h-6 py-1" src="/icons/X.svg" alt="">
                        </a>
                        <a v-if="osoba.attributes.TikTok" :href="osoba.attributes.TikTok" target="_blank">
                            <img class="h-6" src="/icons/tiktok.svg" alt="">
                        </a>
                    </div>
                   
                </div>

            </div>
        </div>

        <Foter />
    </div>
</template> 


<script setup lang="ts">
const { locale } = useI18n()
const { $anime } = useNuxtApp()

const osoby = ref()
const lang = ref(locale.value)


const fetchPeopleByLang = async () => {
    const { data, pending } = await useFetch(
        `https://panel.makoto.com.pl/api/osobies?populate=Avatar&locale=${lang.value}`
    )
    osoby.value = data.value
}


await fetchPeopleByLang();

watch(locale, (newLocale, oldLocale) => {
    lang.value = newLocale


    fetchPeopleByLang()
})

onMounted(()=> {
    
    $anime({ 
        targets: '.whale',
        keyframes: [
            {translateY: 30},
            {translateY: 0},
        ],
        loop: true,
        delay: 700,
        easing: 'easeInOutQuad',
        duration: 3000,
    })
})



</script>