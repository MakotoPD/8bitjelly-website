<template>
    <div class="h-14 py-4 ">
        <div class="flex justify-center items-center gap-x-4">
            <NuxtLink to="#tech" class="text-lg font-semibold">{{ $t('menu.tech') }}</NuxtLink>
            <NuxtLink to="#" class="text-lg font-semibold">{{ $t('menu.blog') }}</NuxtLink>
            <NuxtLink to="/" >
                <nuxt-img class="h-12" loading="lazy" src="/logo_black.svg" alt="8BitJelly"/>
            </NuxtLink>
            <NuxtLink to="/#about" class="text-lg font-semibold">{{ $t('menu.about') }}</NuxtLink>
            <NuxtLink to="#projects" class="text-lg font-semibold">{{ $t('menu.projects') }}</NuxtLink>
        </div>
    </div>
</template>