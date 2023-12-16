<template>
	<div>
        <div class="mx-auto max-w-[40rem] mt-4 rounded-xl bg-darkest py-12 px-8">
            <form id="messform" @submit.prevent="submitForm">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-white">{{ $t('page.contact.Form.fName') }} </label>
                        <input v-model="fname" type="text" id="first_name" class="border botext-sm rounded-lg  block w-full p-2.5  bg-pink-200  border-pink-600  placeholder-pink-400  text-black  focus:ring-blue-500  focus:border-blue-500" placeholder="Jan" required>
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium   text-white">{{ $t('page.contact.Form.lName') }}</label>
                        <input v-model="lname" type="text" id="last_name" class="border text-sm rounded-lg block w-full p-2.5  bg-pink-200  border-pink-600  placeholder-pink-400  text-black  focus:ring-blue-500  focus:border-blue-500" placeholder="Kowalski" required>
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium  text-white">{{ $t('page.contact.Form.phone') }}<span class="text-pink-600 text-xs px-2">({{ $t('page.contact.Form.optional') }})</span></label>
                        <input v-model="phone" type="tel" id="phone" class="border text-sm rounded-lg block w-full p-2.5  bg-pink-200  border-pink-600  placeholder-pink-400  text-black  focus:ring-blue-500  focus:border-blue-500" placeholder="123-456-789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}">
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium  text-white">{{ $t('page.contact.Form.email') }}</label>
                        <input v-model="email" type="email" id="email" class="border text-sm rounded-lg block w-full p-2.5  bg-pink-200  border-pink-600  placeholder-pink-400  text-black  focus:ring-blue-500  focus:border-blue-500" placeholder="jan.kowal@company.com" required>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="title" class="block mb-2 text-sm font-medium text-white">{{ $t('page.contact.Form.title') }}</label>
                    <select id="title" v-model="subject" required class=" border text-sm rounded-lg block w-full p-2.5 bg-pink-200 border-pink-600 placeholder-pink-400 text-black focus:ring-blue-500 focus:border-blue-500">
                        <option selected value="web">{{ $t('page.contact.Form.Subject.web') }}</option>
                        <option value="graphic">{{ $t('page.contact.Form.Subject.graphic') }}</option>
                        <option value="coop">{{ $t('page.contact.Form.Subject.coop') }}</option>
                        <option value="another">{{ $t('page.contact.Form.Subject.another') }}</option>
                    </select>

                </div>
                <div class="mb-6">						
                    <label for="message" class="block mb-2 text-sm font-medium  text-white">{{ $t('page.contact.Form.mess') }}</label>
                    <textarea v-model="message" id="message" rows="4" class="block p-2.5 w-full text-sm rounded-lg border  bg-pink-200  border-pink-600  placeholder-pink-400  text-black  focus:ring-blue-500  focus:border-blue-500" placeholder="Write your message here..."></textarea>
                </div>  
                
                <div class="mb-6">

                    <vue-hcaptcha @verify="onVerify" @expired="onExpire"  @error="onError" data-theme="dark" sitekey="32d19c18-6642-4cec-9657-1b132dedf61a"></vue-hcaptcha>

                    <Alert v-if="error" :text="error" type="error" />
                    <Alert v-if="expired" text="The challenge has expired!" type="error" />
                </div>
                
                
                <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border rounded focus:ring-3  border-pink-600  focus:ring-blue-600  ring-offset-pink-800" required>
                    </div>
                    <label for="remember" class="ml-2 text-sm font-medium text-gray-900">I agree with the <a href="#" class="hover:underline  text-pink-500">terms and conditions</a>.</label>
                </div>

                <button type="submit" class="bg-[#D891D9]/60 text-white px-5 py-2 rounded-lg border border-[#FD84FF] shadow-[#D891D9]/50 shadow-xl hover:scale-105 duration-150"> <p>{{ $t('page.contact.Form.btn') }}</p> <i class='mt-px bx bx-xs bx-send'></i></button>
                
                <Alert v-if="sendsucces" :text=" $t('page.contact.Form.sendsucces')" type="success" />
                <Alert v-if="senderror" :text="$t('page.contact.Form.senderror')" type="error" />
                <Alert v-if="verifiedError" :text="$t('page.contact.Form.verifiedError')" type="error" />
            
            </form>
		</div>
	</div>
</template>

<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
useHead({
	title: 'Contact - Makoto',
	script: [
		{ src: 'https://web3forms.com/client/script.js', async: true, defer: true },
		{ src: 'https://js.hcaptcha.com/1/api.js', async: true, defer: true}
	]
})



const WEB3FORMS_ACCESS_KEY = "b7b212cb-59d3-431a-8149-4ea3b7fa42cd"

const fname = ref('')
const lname = ref('')
const email = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')


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

	if (email.value != "makotopd@icloud.com") {


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
				subject: subject.value,
				name: fname.value + " " + lname.value,
				email: email.value,
				phone: phone.value,
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