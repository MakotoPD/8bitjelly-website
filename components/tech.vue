<template>
    <div style="z-index: 1;" class="tech overflow-hidden mx-4 md:mx-0 rounded-[44px] md:rounded-[64px] bg-darkest py-24 px-4">
        <div style="z-index: 2;" class=" flex flex-col items-center gap-y-10">
            <h2 class="text-white font-semibold text-5xl md:text-8xl title">{{ $t('page.home.tech.title') }}</h2>
            <p 
                class="text-light text-center"
            >
                {{ $t('page.home.tech.desc1') }} <br/>
                {{ $t('page.home.tech.desc2') }}
            </p>
            <!-- <button 
                class="bg-[#D891D9]/60 text-white px-5 py-2 rounded-lg border border-[#FD84FF] shadow-[#D891D9]/50 shadow-xl hover:scale-105 duration-150"
            >
                {{ $t('page.home.tech.btn') }}
            </button> -->
        </div>

        <div style="z-index: -1;" class="blocks absolute left-0 top-0 w-full h-full">

            <div class="el left-1/4 text-primary text-3xl font-semibold opacity-40 rounded-xl h-28 w-28 flex items-center justify-center bg-[#A38A99]/40 absolute">
                <p>C#</p>
            </div>
            <div class="el top-1/4 left-8 md:left-24 text-primary text-3xl font-semibold opacity-40 rounded-xl h-28 w-28 flex items-center justify-center bg-[#A38A99]/40 absolute">
                <p>PHP</p>
            </div>
            <div class="el bottom-4 left-4 md:left-[18%] text-primary text-3xl font-semibold opacity-40 rounded-xl h-28 w-28 flex items-center justify-center bg-[#A38A99]/40 absolute">
                <p>Nuxt</p>
            </div>
            <div class="el bottom-8 left-1/3 text-primary text-3xl font-semibold opacity-40 rounded-xl h-28 w-28 flex items-center justify-center bg-[#A38A99]/40 absolute">
                <p>Unity</p>
            </div>
            <div class="el top-1/3 right-1/3 text-primary text-3xl font-semibold opacity-40 rounded-xl h-28 w-28 flex items-center justify-center bg-[#A38A99]/40 absolute">
                <p>Vue.js</p>
            </div>
            <div class="el top-8 md:top-[20%] right-[20%] text-primary text-3xl font-semibold opacity-40 rounded-xl h-28 w-28 flex items-center justify-center bg-[#A38A99]/40 absolute">
                <p>docker</p>
            </div>
            <div class="el bottom-1/3 right-4 md:right-24 text-primary text-3xl font-semibold opacity-40 rounded-xl h-28 w-28 flex items-center justify-center bg-[#A38A99]/40 absolute">
                <p>.net</p>
            </div>
            <div class="el bottom-5 md:bottom-12 right-8 md:right-1/4 text-primary text-3xl font-semibold opacity-40 rounded-xl h-28 w-28 flex items-center justify-center bg-[#A38A99]/40 absolute">
                <p>vite</p>
            </div>



        </div>
    </div>
</template>

<style scoped>
.tech{
    position: relative;
}

.tech::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
	background: radial-gradient(60% 80% at 50% 100%, rgba(239, 140, 241, 0.25) 0%, rgba(77, 64, 78, 0) 100%);
}
</style>


<script setup lang="ts">
const { $anime } = useNuxtApp()

onMounted(() => {
    $anime({ 
        targets: '.blocks .el',
        keyframes: [
            {translateY: 50},
            {translateY: 0},
        ],
        loop: true,
        easing: 'easeInOutQuad',
        delay: function(el, i) { return i * 200 },
        duration: 5000,
    })
  })

</script>