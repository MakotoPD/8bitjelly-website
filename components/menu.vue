<template>
    <div class="h-14 py-4 ">
        <div class="hidden md:flex justify-center items-center gap-x-4">
            <NuxtLink :to="localePath('/#tech')" class="text-lg font-semibold">{{ $t('menu.tech') }}</NuxtLink>
            <NuxtLink :to="localePath('/#')" class="text-lg font-semibold">{{ $t('menu.blog') }}</NuxtLink>
            <NuxtLink :to="localePath('/')" >
                <nuxt-img class="h-12" loading="lazy" src="/logo_black.svg" alt="8BitJelly"/>
            </NuxtLink>
            <NuxtLink :to="localePath('/#about')" class="text-lg font-semibold">{{ $t('menu.about') }}</NuxtLink>
            <NuxtLink :to="localePath('/#projects')" class="text-lg font-semibold">{{ $t('menu.projects') }}</NuxtLink>
        </div>

        <header id="mobileNav" class="ease-in-out duration-300 z-[100] grid grid-cols-5 gap-3 bg-primary/40 backdrop-blur-md fixed bottom-2 left-1/2 -translate-x-1/2 py-2 px-4 md:hidden w-11/12 border border-primary rounded-2xl">
			<NuxtLink :to="localePath('/#tech')" class="mobileMenu py-1 flex flex-col -space-y-0.5 items-center">
				<i class='text-black/90 bx-sm bx bx-code-alt'></i>
				<p class="text-black/80 text-xs text-center">{{ $t('menu.tech') }}</p>
			</NuxtLink>
			<NuxtLink :to="localePath('/#')" class="mobileMenu py-1 flex flex-col -space-y-0.5 items-center">
				<i class='text-black/90 bx-sm bx bxs-pyramid'></i>
				<p class="text-black/80 text-xs text-center">{{ $t('menu.blog') }}</p>
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
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

<style>

.router-link-active.mobileMenu{
	@apply bg-white/40 rounded-lg shadow-lg;
}

.router-link-active.mobileMenu i {
	color: rgb(0, 0, 0, 0.9) !important;
}

.router-link-active.mobileMenu p {
	color: rgb(0, 0, 0, 0.9) !important;
}

</style>
