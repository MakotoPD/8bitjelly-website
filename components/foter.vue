<template>
    <div class="bg-[#A48DA1] py-4 px-6">
        <div class="block md:hidden">
            <div class="w-full flex justify-center mb-8 mt-4">
                <nuxt-img class="h-16" loading="lazy" src="/logo_white.svg" alt="8BitJelly"/>
            </div>

            <div class="flex flex-wrap justify-center gap-x-3 gap-y-2 mx-8 text-white">
                <NuxtLink to="#">{{ $t('menu.join') }}</NuxtLink>
                <!-- <NuxtLink to="#">{{ $t('menu.blog') }}</NuxtLink> -->
                <NuxtLink to="#">{{ $t('menu.about') }}</NuxtLink>
                <NuxtLink to="#">{{ $t('menu.projects') }}</NuxtLink>
                <NuxtLink to="#">{{ $t('menu.policy') }}</NuxtLink>
            </div>

            <div>
                <div class="mt-2 flex justify-center items-center space-x-2 ">
                    <label for="lang" class="text-white/70 text-sm">Select language:</label>
                    <select id="lang" v-model="locale" class="bg-white/40 rounded-lg text-black px-2">
                        <option class="" value="en">en</option>
                        <option class="" value="pl">pl</option>
                    </select>
                </div>
            </div>

            <hr class="border-darker border-1 mx-8 my-4">
        
            <p class="text-darker text-center mb-4">© 2024 8BitJelly. MIT</p>

            <div class="flex justify-center gap-x-4">
                <NuxtLink target="_blank" to="https://www.instagram.com/8bitjelly/">
                    <nuxt-img class="h-6" alt="instagram" src="/svg/instagram-logo-duotone.svg" />
                </NuxtLink>
                <NuxtLink target="_blank" to="https://www.facebook.com/8bitjelly">
                    <nuxt-img class="h-6" alt="facebook" src="/svg/facebook-logo-duotone.svg" />
                </NuxtLink>
                <NuxtLink target="_blank" to="https://github.com/8bitjelly">
                    <nuxt-img class="h-6" alt="github" src="/svg/github-logo-duotone.svg" />
                </NuxtLink>
            </div>
        </div>

        <div class="hidden md:block pt-8">
            <div class="container mx-auto flex justify-between">
                <div>
                    <nuxt-img class="h-16" loading="lazy" src="/logo_white.svg" alt="8BitJelly"/>
                </div>
                <div>
                    <div class="flex gap-x-4 text-white">
                        <NuxtLink :to="localePath('/contact')">{{ $t('menu.join') }}</NuxtLink>
                        <NuxtLink :to="localePath('/blog')">{{ $t('menu.blog') }}</NuxtLink>
                        <NuxtLink :to="localePath('/gallery')">{{ $t('menu.gallery') }}</NuxtLink>
                        <NuxtLink :to="localePath('/#about')">{{ $t('menu.about') }}</NuxtLink>
                        <NuxtLink :to="localePath('/#priorities')">{{ $t('menu.projects') }}</NuxtLink>
                        <NuxtLink :to="localePath('/terms')">{{ $t('menu.policy') }}</NuxtLink>
                        
                    </div>
                    <div v-if="useRoute().params.slug == undefined"  class="mt-2 flex justify-end items-center space-x-2 ">
                        <label for="lang" class="text-white/70 text-sm">Select language:</label>
                        <select id="lang" v-model="locale" class="bg-white/40 rounded-lg text-black px-2">
                            <option class="" value="en">en</option>
                            <option class="" value="pl">pl</option>
                        </select>
                    </div>
                </div>

            </div>
            <hr class="border-darker border-1 mx-8 my-4">
            <div class="container mx-auto flex justify-between">
                <div>
                    <p class="text-darker text-center mb-4">© 2024 8BitJelly. MIT</p>
                </div>
                <div class="flex gap-x-3">
                    <NuxtLink target="_blank" to="https://www.instagram.com/8bitjelly/">
                        <nuxt-img class="h-6" src="/svg/instagram-logo-duotone.svg" />
                    </NuxtLink>
                    <NuxtLink target="_blank" to="https://www.facebook.com/8bitjelly">
                        <nuxt-img class="h-6" src="/svg/facebook-logo-duotone.svg" />
                    </NuxtLink>
                    <NuxtLink target="_blank" to="https://github.com/8bitjelly">
                        <nuxt-img class="h-6" src="/svg/github-logo-duotone.svg" />
                    </NuxtLink>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { useI18n, useLocalePath } from '#imports'

const { locale } = useI18n()

const localePath = useLocalePath()
</script>