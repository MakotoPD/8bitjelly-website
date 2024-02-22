<template>
    <div class="overflow-x-hidden">

        <Landing />

        <Priorities/>

        <div id="projects" class="md:grid grid-cols-2 mt-24 container mx-auto">
            <div class="flex justify-center items-cente">
                <img loading="lazy" class="whale w-full h-full object-contain" src="/whale.png" />
            </div>
            <div class="mt-24 md:mt-0">
                <div class="px-4 flex flex-col gap-y-2 mb-8">
                    <p class="z-10 text-primary font-bold">- {{ $t('page.home.projects.sub') }}</p>
                    <h3 class="z-10 text-darker text-4xl font-bold leading-tight">{{ $t('page.home.projects.title') }}</h3>
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
                <h3 class="z-10 text-darker text-4xl font-bold leading-tight">{{ $t('page.home.about.title') }}</h3>
                <p class="z-10 text-darker/80 text-md font-light max-w-xl">{{ $t('page.home.about.desc') }}</p>
            </div>

            <div class="overflow-hidden px-4 lg:px-0 ">
                <ul class="scrollbar mask pb-4 w-full gap-6 flex flex-nowrap items-center mb-8 whitespace-nowrap overflow-x-scroll lg:overflow-x-auto box-content">
                    <li>
                        <input v-model="filter" type="radio" id="filters-all" name="filters" value="All" class="hidden peer" checked>
                        <label for="filters-all" class="inline-flex items-center justify-between w-full py-1 px-4 text-white bg-primary/20 border border-pink-600 rounded-lg cursor-pointer peer-checked:bg-primary peer-checked:text-white duration-150">                           
                                <div class="w-full">{{ $t('filter.all') }}</div>
                        </label>
                    </li>
                    <li>
                        <input v-model="filter" type="radio" id="filters-2d" name="filters" value="2D" class="hidden peer">
                        <label for="filters-2d" class="inline-flex items-center justify-between w-full py-1 px-4 text-white bg-primary/20 border border-pink-600 rounded-lg cursor-pointer peer-checked:bg-primary peer-checked:text-white duration-150">                           
                                <div class="w-full">{{ $t('filter.2d') }}</div>
                        </label>
                    </li>
                    <li>
                        <input v-model="filter" type="radio" id="filters-3d" name="filters" value="3D" class="hidden peer">
                        <label for="filters-3d" class="inline-flex items-center justify-between w-full py-1 px-4 text-white bg-primary/20 border border-pink-600 rounded-lg cursor-pointer peer-checked:bg-primary peer-checked:text-white duration-150">                           
                                <div class="w-full">{{ $t('filter.3d') }}</div>
                        </label>
                    </li>
                    <li>
                        <input v-model="filter" type="radio" id="filters-concept" name="filters" value="Concept" class="hidden peer">
                        <label for="filters-concept" class="inline-flex items-center justify-between w-full py-1 px-4 text-white bg-primary/20 border border-pink-600 rounded-lg cursor-pointer peer-checked:bg-primary peer-checked:text-white duration-150">                           
                                <div class="w-full">{{ $t('filter.concept') }}</div>
                        </label>
                    </li>
                    <li>
                        <input v-model="filter" type="radio" id="filters-programmer" name="filters" value="Programmer" class="hidden peer">
                        <label for="filters-programmer" class="inline-flex items-center justify-between w-full py-1 px-4 text-white bg-primary/20 border border-pink-600 rounded-lg cursor-pointer peer-checked:bg-primary peer-checked:text-white duration-150">                           
                                <div class="w-full">{{ $t('filter.program') }}</div>
                        </label>
                    </li>
                    <li>
                        <input v-model="filter" type="radio" id="filters-game" name="filters" value="Gamedesign" class="hidden peer">
                        <label for="filters-game" class="inline-flex items-center justify-between w-full py-1 px-4 text-white bg-primary/20 border border-pink-600 rounded-lg cursor-pointer peer-checked:bg-primary peer-checked:text-white duration-150">                           
                                <div class="w-full">{{ $t('filter.game') }}</div>
                        </label>
                    </li>
                    <li>
                        <input v-model="filter" type="radio" id="filters-web" name="filters" value="Web" class="hidden peer">
                        <label for="filters-web" class="inline-flex items-center justify-between w-full py-1 px-4 text-white bg-primary/20 border border-pink-600 rounded-lg cursor-pointer peer-checked:bg-primary peer-checked:text-white duration-150">                           
                                <div class="w-full">{{ $t('filter.web') }}</div>
                        </label>
                    </li>

                </ul>
            </div>

            <div class="flex flex-wrap justify-center gap-x-4 gap-y-6 mb-24">
                <div v-for="osoba in osoby.data" :data-filter="osoba.attributes.Filtry" class="p-4 rounded-xl bg-primary/20 max-w-sm relative">
                    <div class="mb-4 h-40">
                        <img loading="lazy" class="h-40 rounded-lg" :src="'https://panel.8bitjelly.com'+osoba.attributes.Avatar.data.attributes.url " :alt="osoba.attributes.Nick"/>
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
                        <a v-if="osoba.attributes.Facebook" :href="osoba.attributes.Facebook" target="_blank">
                            <img class="h-6" src="/icons/facebook.svg" alt="">
                        </a>
                        <a v-if="osoba.attributes.Itchio" :href="osoba.attributes.Itchio" target="_blank">
                            <img class="h-6" src="/icons/itchio.svg" alt="">
                        </a>
                        <a v-if="osoba.attributes.Artstation" :href="osoba.attributes.Artstation" target="_blank">
                            <img class="h-6" src="/icons/artstation.svg" alt="">
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
const filter = ref('All')


const fetchPeopleByLang = async () => {
    const { data, pending } = await useFetch(
        `https://panel.8bitjelly.com/api/osobies?populate=Avatar&locale=${lang.value}&filters[filtry][$contains]=${filter.value}`
    )
    osoby.value = data.value
}


await fetchPeopleByLang();

watch(filter, (newfilter) => {
    filter.value = newfilter

    fetchPeopleByLang()
})


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



<style>


@media (max-width: 1023px) { 
    .mask{
        mask-image: linear-gradient(90deg, transparent 0% , rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 90%, transparent 100%);
    }

    .scrollbar::-webkit-scrollbar {
        width: 8px;
    }

    .scrollbar::-webkit-scrollbar-track {
        background: #ffe1ed;
    }

    /* Handle */
    .scrollbar::-webkit-scrollbar-thumb {
        background: rgb(241 93 156 / 0.2);
        border-radius: 8px;
    }

    /* Handle on hover */
    .scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgb(241 93 156 / 0.3);
    }
}

</style>
