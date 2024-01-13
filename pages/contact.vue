<template>
	<div>

		<Head>
			<Title>8BitJelly - {{ $t('page.contact.title') }}</Title>
		</Head>

        <Menu />

        <div class="grid lg:grid-cols-2 pb-24 md:py-24">
            <div class="flex justify-center px-8">
                <Blottie
                    ref="blottie"
                    :loop="true"
                    renderer="svg"
                    path="/8bitjelly-contact.json"
                    :autoplay="true"
                    class="octopus hidden lg:block lg:w-full"
                />
            </div>
            <div class="lg:px-12 flex justify-center lg:justify-start">
                <div class="bg-white/50 py-12 px-4 lg:p-12 rounded-3xl max-w-2xl h-fit">
                    <h2 class="text-4xl font-semibold">{{ $t('page.contact.title') }}</h2>
                    <div class="pt-6">
                        <form id="messform" @submit.prevent="submitForm">

                            <p class="mb-2">{{ $t('page.contact.Form.why') }}</p>

                            <ul class="flex w-full gap-6 flex-wrap">
                                <li>
                                    <input v-model="whymess" type="radio" id="Another" name="Another" value="Another" class="hidden peer" required>
                                    <label for="Another" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-pink-200 rounded-lg cursor-pointer  peer-checked:border-pink-200 peer-checked:text-pink-600 hover:text-gray-600 hover:bg-gray-100">                           
                                        <div class="block">
                                            <div class="w-full text-lg font-semibold">Another</div>
                                        </div>
                                    </label>
                                </li>
                            </ul>



                            <div class="grid gap-6 mb-6 md:grid-cols-2 mt-6">
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-black">{{ $t('page.contact.Form.fName') }} </label>
                                    <input v-model="fname" type="text" id="first_name" class="border botext-sm rounded-lg  block w-full p-2.5  bg-white border-pink-200 placeholder-pink-400 text-black  focus:ring-pink-500  focus:border-pink-500" placeholder="Jan" required>
                                </div>
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-black">{{ $t('page.contact.Form.lName') }}</label>
                                    <input v-model="lname" type="text" id="last_name" class="border text-sm rounded-lg block w-full p-2.5  bg-white border-pink-200 placeholder-pink-400 text-black  focus:ring-pink-500  focus:border-pink-500" placeholder="Kowalski" required>
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-black">{{ $t('page.contact.Form.email') }}</label>
                                    <input v-model="email" type="email" id="email" class="border text-sm rounded-lg block w-full p-2.5  bg-white border-pink-200 placeholder-pink-400 text-black  focus:ring-pink-500  focus:border-pink-500" placeholder="jan.kowal@company.com" required>
                                </div>
                                <div>
                                    <label for="subject" class="block mb-2 text-sm font-medium  text-black">{{ $t('page.contact.Form.subject') }}</label>
                                <input v-model="subject" id="subject" name="subject" rows="4" class="block p-2.5 w-full text-sm rounded-lg border  bg-white border-pink-200 placeholder-pink-400 text-black  focus:ring-pink-500  focus:border-pink-500" placeholder="Title of message" required />
                                </div>
                            </div>

                            <div class="mb-6">				
                                <label for="message" class="block mb-2 text-sm font-medium  text-black">{{ $t('page.contact.Form.mess') }}</label>
                                <textarea v-model="message" id="message" rows="4" class="block p-2.5 w-full text-sm rounded-lg border  bg-white border-pink-200 placeholder-pink-400 text-black  focus:ring-pink-500  focus:border-pink-500" placeholder="Write your message here..."></textarea>
                            </div>
                            
                            
                            <div class="mb-6">

                                <vue-hcaptcha @verify="onVerify" @expired="onExpire"  @error="onError" data-theme="light" sitekey="32d19c18-6642-4cec-9657-1b132dedf61a"></vue-hcaptcha>

                                <Alert v-if="error" :text="error" type="error" />
                                <Alert v-if="expired" text="The challenge has expired!" type="error" />
                            </div>


                            <div class="flex items-start mb-6">
                                <div class="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border rounded focus:ring-3  border-pink-600  focus:ring-pink-600  ring-offset-pink-800" required>
                                </div>
                                <label for="remember" class="ml-2 text-sm font-medium text-gray-900">I agree with the <a href="#" class="hover:underline  text-pink-500">terms and conditions</a>.</label>
                            </div>
                        
                            <button type="submit" class="bg-[#D891D9]/60 text-white px-5 py-2 rounded-lg border border-[#FD84FF] shadow-[#D891D9]/50 shadow-xl hover:scale-105 duration-150 flex gap-x-2 items-center"> <p>{{ $t('page.contact.Form.btn') }}</p> <i class='mt-px bx bx-xs bx-send'></i></button>

                            <Alert v-if="sendsucces" :text=" $t('page.contact.Form.sendsucces')" type="success" />
                            <Alert v-if="senderror" :text="$t('page.contact.Form.senderror')" type="error" />
                            <Alert v-if="verifiedError" :text="$t('page.contact.Form.verifiedError')" type="error" />


                        </form>
                    </div>

                </div>
            </div>
        </div>


        <Foter/>

	</div>
</template>

<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

useHead({
	title: 'BitJelly - Contact',
	script: [
		{ src: 'https://web3forms.com/client/script.js', async: true, defer: true },
		{ src: 'https://js.hcaptcha.com/1/api.js', async: true, defer: true}
	]
})

import { Blottie, type BlottieExpose } from 'blottie'

const blottie = ref<BlottieExpose>()


const { $anime } = useNuxtApp()

onMounted(() => {
    if (window.innerWidth > 768) {
        $anime({ 
            targets: '.octopus',
            keyframes: [
                {translateY: 20},
                {translateY: 0}
            ],
            loop: true,
            easing: 'easeInOutQuad',
            duration: 5000,
        })
    }
})

const WEB3FORMS_ACCESS_KEY = "d503b806-9e80-42a2-a4e0-5ca88f9da25e"

const fname = ref('')
const lname = ref('')
const email = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')

const whymess = ref('')


const verified = ref(false);
const expired = ref(false);
const token = ref("");
const eKey = ref("");
const error = ref("");
const verifiedError = ref(false)
let sendsucces = ref(false)
let senderror = ref(false)

function onVerify(tokenStr: string, ekey: string) {
	verified.value = true;
	token.value = tokenStr;
	eKey.value = ekey;
}

function onExpire() {
	verified.value = false;
	token.value = '';
	eKey.value = '';
	expired.value = true;
	console.log('Expired');
	setTimeout(() => {
		expired.value = false
	}, 10000)
}

function onError(err: string) {
	token.value = '';
	eKey.value = '';
	error.value = err;
	console.log(`Error: ${err}`);
}




const submitForm = async () => {

	if (email.value != "contact@8bitjelly.com") {


		if(verified.value == false){
			verifiedError.value = true
			setTimeout(() => {
				verifiedError.value = false
			}, 10000)
		} else {

			const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				access_key: WEB3FORMS_ACCESS_KEY,
                from_name: 'Formularz kontaktowy - 8BitJelly',
                reason: whymess.value,
				subject: subject.value,
				name: fname.value + " " + lname.value,
				email: email.value,
				message: message.value,
				captcha: token.value
			}),
			});
			const result = await response.json();
			if (result.success) {
				console.log(result);
				console.log('Wiadmość wysłana')
				sendsucces.value = true
			} else if(result.error) {
				console.log('Błąd wysyłania')
				console.log(error.value)
				senderror.value = true
			}
		}
	}
	
}


</script>