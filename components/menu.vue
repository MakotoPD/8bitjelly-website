<template>
    <div class="h-14 py-4 ">
        <div class="flex justify-center items-center gap-x-4">
            <NuxtLink :to="localePath('/#tech')" class="text-lg font-semibold">{{ $t('menu.tech') }}</NuxtLink>
            <NuxtLink :to="localePath('/')" >
                <nuxt-img class="h-12" loading="lazy" src="/logo_black.svg" alt="8BitJelly"/>
            </NuxtLink>
            <NuxtLink :to="localePath('/#about')" class="text-lg font-semibold">{{ $t('menu.about') }}</NuxtLink>
            <NuxtLink :to="localePath('/#projects')" class="text-lg font-semibold">{{ $t('menu.projects') }}</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>