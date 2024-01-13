<template>
    <div v-if="pending">
        <div>
            <div class="bg-gray-400 w-64 h-64 rounded-xl mb-4 animate-pulse"></div>
            <p class="text-xl text-primary font-bold">Gierka 1</p>
            <p class="text-darker">Lorem ipsum dolor</p>
        </div>
    </div>
    <carousel 
      v-bind="settings"
      :wrap-around="true" 
      :transition="500" 
      :breakpoints="breakpoints"
      :autoplay="2000"
    >
        <slide v-for="(game, idx) in data.data" :key="idx" >
            <div class="carousel__item h-[30rem] hover:shadow-lg hover:shadow-primary/40 duration-100 bg-primary/20 border border-white backdrop-blur-xl rounded-xl p-4">
                <img loading="lazy" class="h-64 w-64 object-cover rounded-xl mb-2" :src="'https://panel.makoto.com.pl'+game.attributes.gameLogo.data.attributes.url " :alt="game.attributes.name"/>
                <p class="text-xl text-primary font-bold mb-4">{{ game.attributes.name }}</p>
                <p class="text-darker text-sm w-64">{{ game.attributes.shortDescription }}</p>
                <a :href="game.attributes.link" target="_blank" class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/60 text-white px-5 py-1 rounded-lg border border-primary">{{ $t('page.home.projects.btn') }}</a>
            </div>
        </slide>

        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
    
    
</template>


<script setup lang="ts">

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


const { data, pending, error } = await useFetch(
    `https://panel.makoto.com.pl/api/games?populate=gameLogo&locale=en`
)

const settings = {
  itemsToShow: 1,
}

const breakpoints= {

  500: {
    itemsToShow: 1.5,
  },
  550: {
    itemsToShow: 2,
  },
  768: {
    itemsToShow: 1.25,
  },
  1024: {
    itemsToShow: 1.7,
  },
  1280: {
    itemsToShow: 2,
  },
  1536: {
    itemsToShow: 2.5,
  },
}

</script>

<style>
.carousel{
    overflow: hidden;
}

.carousel__icon{
    fill: white
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
  overflow: visible;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: scale(1);
}

</style>