<template>
    <!-- <div class="h-14 py-4 ">
        <div class="hidden md:flex justify-center items-center gap-x-4">
            <NuxtLink :to="localePath('/#join')" class="text-lg font-semibold">{{ $t('menu.join') }}</NuxtLink>
            <NuxtLink :to="localePath('/')" >
                <nuxt-img class="h-12" loading="lazy" src="/logo_black.svg" alt="8BitJelly"/>
            </NuxtLink>
            <NuxtLink :to="localePath('/#about')" class="text-lg font-semibold">{{ $t('menu.about') }}</NuxtLink>
            <NuxtLink :to="localePath('/#projects')" class="text-lg font-semibold">{{ $t('menu.projects') }}</NuxtLink>
        </div>

        <header id="mobileNav" class="ease-in-out duration-300 z-[100] grid grid-cols-5 gap-3 bg-primary/40 backdrop-blur-md fixed bottom-2 left-1/2 -translate-x-1/2 py-2 px-4 md:hidden w-11/12 border border-primary rounded-2xl">
			<NuxtLink :to="localePath('/#join')" class="mobileMenu py-1 flex flex-col -space-y-0.5 items-center">
				<i class='text-black/90 bx-sm bx bx-code-alt'></i>
				<p class="text-black/80 text-xs text-center">{{ $t('menu.join') }}</p>
			</NuxtLink>
			<NuxtLink :to="localePath('/#priorities')" class="mobileMenu py-1 flex flex-col -space-y-0.5 items-center">
				<i class='text-black/90 bx-sm bx bxs-pyramid'></i>
				<p class="text-black/80 text-xs text-center">{{ $t('menu.priorities') }}</p>
			</NuxtLink>
			<NuxtLink :to="localePath('/')" class="mobileMenu py-1 flex flex-col -space-y-0.5 items-center">
				<i class='text-black/90 bx-sm bx bxs-home-alt-2'></i>
				<p class="text-black/80 text-xs text-center">Home</p>
			</NuxtLink>
			<NuxtLink :to="localePath('/#about')" class="mobileMenu py-1 flex flex-col -space-y-0.5 items-center">
				<i class='text-black/90 bx-sm bx bxs-user-account'></i>
				<p class="text-black/80 text-xs text-center">{{ $t('menu.about') }}</p>
			</NuxtLink>
            <NuxtLink :to="localePath('/#projects')" class="mobileMenu py-1 flex flex-col -space-y-0.5 items-center">
				<i class='text-black/90 bx-sm bx bx-cube'></i>
				<p class="text-black/80 text-xs text-center">{{ $t('menu.projects') }}</p>
			</NuxtLink>
		</header>
    </div> -->

	<div class="w-[calc(100vw-30px)] lg:w-[calc(100vw-300px)] h-20 pr-2 pb-2 border-b-2 border-r md:border-r-2 border-[#4d404e55] rounded-br-[50px]">
        <div class="relative w-full h-full bg-[#4D404E] rounded-br-[45px]">
			<div class="absolute left-0 top-0 w-full h-full rounded-br-[45px] overflow-hidden">
				<nuxt-img class="z-0 absolute right-0 bottom-0 translate-x-1/2 scale-[3]" src="/svg/Ellipse3.svg" alt="circle background" loading="lazy" />
				<nuxt-img class="z-0 absolute left-0 bottom-0 w-3/4 md:w-1/3" src="/svg/Ellipse5.svg" alt="circle background" loading="lazy" />
			</div>

			<div class="z-50 h-auto flex w-full py-4 px-2 pr-4 justify-between md:justify-start md:gap-x-12 md:pl-16 items-center">
				<button @click="openMenu()" class="z-[50] block md:hidden">
					<nuxt-img class="w-8" src="/svg/list-bold.svg" loading="lazy" quality="40" />
				</button>
				<div class="menu md:hidden translate-x-[-110%] duration-300 z-50 absolute bg-white w-[calc(100%-100px)] h-auto left-2 top-2 py-20 px-12 rounded-3xl rounded-br-[40px] flex flex-col gap-y-3">
					
					<button @click="closeMenu()" class="absolute left-4 top-4"> <nuxt-img class="w-10" src="/svg/x-bold.svg" /> </button>
					<NuxtLink @click="closeMenu()" :to="localePath('/#about')" class="text-xl font-semibold">{{ $t('menu.about') }}</NuxtLink>
					<NuxtLink @click="closeMenu()" :to="localePath('/#priorities')" class="text-xl font-semibold">{{ $t('menu.priorities') }}</NuxtLink>
					<NuxtLink @click="closeMenu()" :to="localePath('/blog')" class="text-xl font-semibold">{{ $t('menu.blog') }}</NuxtLink>
					<NuxtLink @click="closeMenu()" :to="localePath('/gallery')" class="text-xl font-semibold">{{ $t('menu.gallery') }}</NuxtLink>
					<NuxtLink @click="closeMenu()" :to="localePath('/#join')" class="text-xl font-semibold">{{ $t('menu.join') }}</NuxtLink>
					
					<div v-if="useRoute().params.slug == undefined" class="absolute w-full left-0 bottom-4">
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

				<NuxtLink :to="localePath('/')" class="z-[50]">
					<nuxt-img class="h-8" src="logo_white.svg" loading="lazy" quality="40" />
				</NuxtLink>


				<div class="hidden md:flex gap-x-8">
					<NuxtLink :to="localePath('/#about')" class="text-white text-lg z-50 whitespace-nowrap">{{ $t('menu.about') }}</NuxtLink>
					<NuxtLink :to="localePath('/#priorities')" class="text-white text-lg z-50 whitespace-nowrap">{{ $t('menu.priorities') }}</NuxtLink>
					<NuxtLink :to="localePath('/blog')" class="text-white text-lg z-50 whitespace-nowrap">{{ $t('menu.blog') }}</NuxtLink>
					<NuxtLink :to="localePath('/gallery')" class="text-white text-xl z-50 whitespace-nowrap">{{ $t('menu.gallery') }}</NuxtLink>
					<NuxtLink :to="localePath('/#join')" class="text-white text-lg z-50 whitespace-nowrap">{{ $t('menu.join') }}</NuxtLink>
					<div v-show="useRoute().params.slug == undefined" class="hidden xl:flex justify-center items-center space-x-2 ">
						<label for="lang" class="text-white/90 text-sm">Lang:</label>
						<select id="lang" v-model="locale" class="bg-primary/80 rounded-lg text-white px-2 z-50">
							<option class="" value="en">EN</option>
							<option class="" value="pl">PL</option>
						</select>
					</div>
				</div>
            </div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n, useLocalePath } from '#imports'


const { locale } = useI18n()

const localePath = useLocalePath()


let closeMenu = () => {
    let menu = document.querySelector('.menu')
    menu?.classList.add('translate-x-[-110%]')
}

let openMenu = () => {
    let menu = document.querySelector('.menu')
    menu?.classList.remove('translate-x-[-110%]')
}
</script>

