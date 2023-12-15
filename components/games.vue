<template>
    <div v-if="pending">
        <div>
            <div class="bg-gray-400 w-64 h-64 rounded-xl mb-4 animate-pulse"></div>
            <p class="text-xl text-primary font-bold">Gierka 1</p>
            <p class="text-darker">Lorem ipsum dolor</p>
        </div>
    </div>
    <Swiper
        v-else
        :height="300"
        :modules="[
            SwiperAutoplay,
            SwiperNavigation,
            SwiperScrollbar,
        ]"
        :scrollbar="true"
        :breakpoints="{
            500: {
                slidesPerView: 2,
                spaceBetween: 5
            },
            800: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1400:{
                slidesPerView: 3,
                spaceBetween: 10
            }

        }"
        :loop="true"
        :autoplay="{
            delay: 1000
        }"
    >
        <SwiperSlide v-for="(game, idx) in data.data" :key="idx" >
            <a :href="game.attributes.link" target="_blank" class="swiper-slide !h-[28rem] hover:shadow-xl hover:shadow-primary/40 duration-100 bg-primary/20 border border-white backdrop-blur-xl rounded-xl p-4">
                <nuxt-img loading="lazy" class="h-64 w-64 object-cover rounded-xl mb-2" :src="'http://141.145.197.144:1337'+game.attributes.gameLogo.data.attributes.url " :alt="game.attributes.name"/>
                <p class="text-xl text-primary font-bold mb-4">{{ game.attributes.name }}</p>
                <p class="text-darker text-sm w-64">{{ game.attributes.shortDescription }}</p>
            </a>
        </SwiperSlide>
    </Swiper>
    
    
</template>


<script setup lang="ts">
const { data, pending, error } = await useFetch(
    `http://141.145.197.144:1337/api/games?populate=gameLogo&locale=en`
)
</script>