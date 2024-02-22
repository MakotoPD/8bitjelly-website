<template>
    <div id="priorities" class="container mx-auto mt-24">

        <div>
            <div class="px-4 flex flex-col gap-y-2">
                <p class="z-10 text-primary font-bold">- {{ $t('page.home.priorities.sub') }}</p>
                <h3 class="z-10 text-darker text-4xl font-bold leading-tight">{{ $t('page.home.priorities.title') }}</h3>
                <p class="z-10 text-darker/80 text-md font-light">{{ $t('page.home.priorities.desc') }}</p>
            </div>
        </div>
        <div class="grid  md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-24 xl:gap-40 2xl:gap-64 mt-8">
            <div v-for="game in games.data" v-on:mouseenter="showgame($event)" v-on:mouseleave="hidegame($event)" class="w-full h-[33rem] rounded-3xl overflow-hidden relative">
                <div class="opacity-0 duration-100">
                    <div class="p-4 pt-8">
                        <p class="text-2xl text-white font-bold mb-4">{{ game.attributes.Title }}</p>
                        <p class="text-light text-sm mb-4">{{ game.attributes.shortdesc }}</p>
                    </div>


                    <div class="-z-10 absolute left-4 bottom-4 flex gap-2">
                        <p v-for="tag in game.attributes.Tags" class="text-white text-sm bg-darkest/50 border-2 border-primary/60 rounded-full px-2 py-0.5">{{tag}}</p>
                    </div>

                    <div  class="-z-40 absolute top-0 right-0 h-full w-full bg-black/60"></div>
                </div>


                <img v-if="game.attributes.image.data" class="-z-50 absolute top-0 right-0 h-full w-full object-cover" :src="'https://panel.8bitjelly.com'+game.attributes.image.data.attributes.url" alt="">
                <img v-else class="-z-50 absolute top-0 right-0 h-full w-full object-cover" src="/unknown.png" alt="">
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const games = ref()
const lang = ref(locale.value)

const fetchGameByLang = async () => {
    const { data, pending } = await useFetch(
        `https://panel.8bitjelly.com/api/priority-games?populate=image&locale=${lang.value}`
    )
    games.value = data.value

}

await fetchGameByLang()


watch(locale, (newLocale, oldLocale) => {
    lang.value = newLocale


    fetchGameByLang()
})


let showgame = (e) => {
    e.toElement.childNodes[0].classList.remove('opacity-0')
}

let hidegame = (e) => {
    e.fromElement.childNodes[0].classList.add('opacity-0')
}

</script>