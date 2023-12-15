<template>
    <div>
        <div class="w-screen lg:w-[calc(100vw-300px)] h-[calc(100vh-100px)] pr-6 pb-6 border-b-2 border-r md:border-r-2 border-[#4d404e55] rounded-br-[110px]">
        
            <div class="relative w-full h-full bg-[#4D404E] rounded-br-[90px]">
                <div class="absolute left-0 top-0 w-full h-full rounded-br-[90px] overflow-hidden">
                    <nuxt-img class="z-0 absolute right-0 top-0 w-1/2 md:w-1/4" src="/svg/Ellipse.svg" alt="circle background" loading="lazy" />
                    <nuxt-img class="z-0 absolute right-0 bottom-0 translate-x-1/2 scale-[3]" src="/svg/Ellipse 3.svg" alt="circle background" loading="lazy" />
                    <nuxt-img class="z-0 absolute left-0 bottom-0 w-3/4 md:w-1/3" src="/svg/Ellipse 5.svg" alt="circle background" loading="lazy" />
                </div>


                <div class="z-50 h-auto flex w-full py-4 px-2 pr-4 justify-between md:justify-start md:gap-x-12 md:pl-16 lg:pl-24 items-center">
                    <button @click="openMenu()" class="z-[50] block md:hidden">
                        <nuxt-img class="w-10" src="/svg/list-bold.svg" loading="lazy" quality="40" />
                    </button>
                    <div class="menu md:hidden translate-x-[-110%] duration-300 z-50 absolute bg-white w-[calc(100%-100px)] h-auto left-2 top-2 py-20 px-12 rounded-3xl rounded-br-[40px] flex flex-col gap-y-3">
                        
                        <button @click="closeMenu()" class="absolute left-4 top-4"> <nuxt-img class="w-10" src="/svg/x-bold.svg" /> </button>
                        <NuxtLink @click="closeMenu()" to="#projects" class="text-xl font-semibold">{{ $t('menu.projects') }}</NuxtLink>
                        <NuxtLink @click="closeMenu()" to="#tech" class="text-xl font-semibold">{{ $t('menu.tech') }}</NuxtLink>
                        <NuxtLink @click="closeMenu()" to="#about" class="text-xl font-semibold">{{ $t('menu.about') }}</NuxtLink>
                        <NuxtLink @click="closeMenu()" to="#" class="text-xl font-semibold">{{ $t('menu.blog') }}</NuxtLink>
                        
                        <div class="absolute w-full left-0 bottom-4">
                            <hr class="mx-4" />
                            <div class="mt-2 flex justify-center items-center space-x-2 ">
                                <label for="lang" class="text-black/70 text-sm">Select language:</label>
                                <select id="lang" v-model="locale" class="bg-primary/40 rounded-lg text-black px-2">
                                    <option class="" value="en">en</option>
                                    <option class="" value="pl">pl</option>
                                </select>
                            </div>
                        </div>  
                        
                    </div>

                    <NuxtLink to="/" class="z-[50]">
                        <nuxt-img class="h-10" src="logo_white.svg" loading="lazy" quality="40" />
                    </NuxtLink>


                    <div class="hidden md:flex gap-x-12">
                        <NuxtLink to="#projects" class="text-white text-xl z-50">{{ $t('menu.projects') }}</NuxtLink>
                        <NuxtLink to="#tech" class="text-white text-xl z-50">{{ $t('menu.tech') }}</NuxtLink>
                        <NuxtLink to="#about" class="text-white text-xl z-50">{{ $t('menu.about') }}</NuxtLink>
                        <NuxtLink to="#" class="text-white text-xl z-50">{{ $t('menu.blog') }}</NuxtLink>
                        <div class="hidden xl:flex justify-center items-center space-x-2 ">
                            <label for="lang" class="text-white/90 text-sm">Select language:</label>
                            <select id="lang" v-model="locale" class="bg-primary/80 rounded-lg text-white px-2 z-50">
                                <option class="" value="en">EN</option>
                                <option class="" value="pl">PL</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="z-10 mt-20 flex flex-col justify-center md:pl-16 lg:pl-24 max-w-3xl">
                    <div class="px-4 flex flex-col gap-y-2 md:px-0 md:gap-y-5 lg:gap-y-6">
                        <p class="z-10 text-primary font-bold">- {{ $t('page.home.sub') }}</p>
                        <h1 class="z-10 text-light text-4xl font-bold leading-tight md:text-4xl lg:text-6xl">{{ $t('page.home.title') }}</h1>
                        <p class="z-10 text-light/80 text-md font-light max-w-lg">{{ $t('page.home.desc') }}</p>
                        <a href="#projects" class="readmore mt-2 py-1 px-4 text-white w-fit flex gap-x-2 items-center">
                            {{  $t('page.home.btn') }} <img class="h-7" src="/svg/arrow-bend-right-down-bold.svg" alt="">
                        </a>
                    </div>
                </div>
                
                <img class="while z-0 absolute scale-150 md:scale-100 -right-12 bottom-12 w-1/2 md:-right-1/4 md:-bottom-12" src="/whale-inverted.png" />
            </div>

        
        </div>
    </div>

</template>

<style>
.readmore{
    border-radius: 14px;
    border: 1px solid #FD84FF;

    background: rgba(216, 145, 217, 0.75);

    box-shadow: 0px 6px 20px 3px rgba(216, 145, 217, 0.50);
    backdrop-filter: blur(2.5px);
}
</style>

<script lang="ts" setup>
import { useI18n, useLocalePath } from '#imports'

const { locale } = useI18n()

const localePath = useLocalePath()

const { $anime } = useNuxtApp()



onMounted(() => {

    console.log(window.innerWidth)

    if (window.innerWidth < 768) {
        $anime({ 
            targets: '.while',
            keyframes: [
                {translateY: 50, scale: [1.5, 1.5]},
                {translateY: 0, scale: [1.5, 1.5]},
            ],
            loop: true,
            easing: 'easeInOutQuad',
            duration: 5000,
        })
    }else{
        $anime({ 
            targets: '.while',
            keyframes: [
                {translateY: 50, scale: [1, 1]},
                {translateY: 0, scale: [1, 1]},
            ],
            loop: true,
            easing: 'easeInOutQuad',
            duration: 5000,
        })
    }

  })




let closeMenu = () => {
    let menu = document.querySelector('.menu')
    menu?.classList.add('translate-x-[-110%]')
}

let openMenu = () => {
    let menu = document.querySelector('.menu')
    menu?.classList.remove('translate-x-[-110%]')
}

</script>