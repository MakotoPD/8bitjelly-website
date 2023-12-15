<template>
	<div class="relative bg-light w-screen h-screen overflow-hidden">
		<nuxt-img  src="/svg/lines.svg" alt="x" class="absolute right-12 -top-4 z-0 h-[120%]" loading="lazy" />
		<nuxt-img class="z-0 absolute left-0 bottom-0 -translate-x-1/2 scale-[3]" src="/svg/Ellipse 3.svg" alt="circle background" loading="lazy" />
		<Menu class="relative z-[50]" />
		<NuxtErrorBoundary class="relative z-[50]">

			<div class="relative z-[50] mt-24">
				<div class="w-full flex justify-end px-24">
					<div class="flex flex-col justify-center items-center max-w-xl relative">
						<p class="z-0 absolute bottom-1/2 translate-y-1/3 text-[18rem] font-semibold tracking-widest text-transparent text-8xl bg-clip-text bg-gradient-to-b from-darkest/30 to-transparent">{{ error.statusCode }}</p>
						<p class="z-[50] text-5xl font-semibold text-darkest mb-6">{{ $t('page.error.title') }}</p>
						<p class="z-[50] text-lg text-darkest pl-2">{{ $t('page.error.desc') }}</p>
						<p class="text-darkest/40">{{ error.message }}</p>
						<button @click="handleClearError" class="z-[50] bg-primary py-2 px-4 rounded-xl text-white mt-4 duration-300 hover:bg-primary/80 hover:shadow-primary/50 hover:shadow-xl">{{ $t('page.error.btn') }}</button>
					</div>
					<div class="pl-24">
						<img src="/svg/jelly_404_opt.svg" class="h-[36rem]" alt="">
					</div>
				</div>
			</div>



			
		</NuxtErrorBoundary>
	</div>
</template>

<script setup lang="ts">
defineProps(['error'])

const handleClearError = () => clearError({ redirect: '/' })
</script>