<template>
  <div>
    <div class="page-hero" style="background:var(--cream);border-bottom:2px solid var(--ink);">
      <div class="wrap">
        <span class="eyebrow">{{ locale === 'pl' ? 'Prawo' : 'Legal' }}</span>
        <h1 class="display" style="font-size:clamp(48px,8vw,120px);margin:14px 0 18px;line-height:0.9;">
          {{ locale === 'pl' ? 'Regulamin' : 'Terms of' }}
          <em style="color:var(--magenta);">{{ locale === 'pl' ? 'serwisu' : 'Service' }}</em>
        </h1>
        <p style="font-size:16px;color:color-mix(in oklab,var(--ink) 65%,transparent);">
          {{ locale === 'pl' ? 'Ostatnia aktualizacja: 15 maja 2025' : 'Last updated: May 15, 2025' }}
        </p>
      </div>
    </div>

    <section style="padding:60px 0 100px;background:var(--cream);">
      <div class="wrap prose" style="max-width:800px;">

        <!-- POLISH VERSION -->
        <template v-if="locale === 'pl'">
          <p>Niniejszy Regulamin określa zasady korzystania z serwisu internetowego <strong>8bitjelly.com</strong> prowadzonego przez 8BitJelly. Korzystając z serwisu, akceptujesz poniższe warunki.</p>

          <h2>1. Postanowienia ogólne</h2>
          <p>8BitJelly jest hobbystyczną grupą twórców gier. Serwis 8bitjelly.com jest prowadzony niekomercyjnie, wyłącznie w celach informacyjnych i społecznościowych. Serwis jest dostępny bezpłatnie dla wszystkich użytkowników.</p>

          <h2>2. Własność intelektualna</h2>
          <p>Wszelkie treści zamieszczone w serwisie — w tym kod gier, grafiki, muzyka, teksty i materiały wideo — stanowią własność intelektualną 8BitJelly i jej członków, chyba że wyraźnie wskazano inaczej.</p>
          <p>Zabrania się:</p>
          <ul>
            <li>kopiowania, reprodukowania lub rozpowszechniania treści bez pisemnej zgody,</li>
            <li>tworzenia dzieł pochodnych w celach komercyjnych,</li>
            <li>usuwania informacji o prawach autorskich.</li>
          </ul>
          <p>Dozwolone jest udostępnianie linków do serwisu oraz cytowanie krótkich fragmentów z podaniem źródła (zgodnie z art. 29 Ustawy o prawie autorskim i prawach pokrewnych).</p>

          <h2>3. Gry i projekty</h2>
          <p>Gry udostępniane przez 8BitJelly są przeznaczone do użytku niekomercyjnego. Szczegółowe warunki licencji każdej gry są określone na stronie jej dystrybucji (np. itch.io). 8BitJelly zastrzega sobie prawo do modyfikowania, wstrzymania lub usunięcia dostępu do gier bez wcześniejszego powiadomienia.</p>

          <h2>4. Formularz kontaktowy i zgłoszenia użytkowników</h2>
          <p>Wysyłając wiadomość przez formularz kontaktowy, oświadczasz, że podane informacje są prawdziwe. Jeśli przesyłasz nam treści (np. fan art, propozycje), udzielasz nam niewyłącznej, bezterminowej, bezpłatnej licencji na ich prezentację w serwisie i materiałach promocyjnych, zachowując pełne prawa autorskie.</p>

          <h2>5. Zasady społeczności</h2>
          <p>W kontaktach z 8BitJelly oraz w naszej społeczności zobowiązujesz się do:</p>
          <ul>
            <li>zachowania szacunku i kultury osobistej,</li>
            <li>niepublikowania treści obraźliwych, nienawistnych lub nielegalnych,</li>
            <li>nieszkodzenia innym użytkownikom ani serwisom 8BitJelly.</li>
          </ul>

          <h2>6. Prywatność</h2>
          <p>Zasady przetwarzania danych osobowych opisuje <NuxtLink :to="localePath('/privacy')" style="color:var(--magenta);text-decoration:underline;">Polityka Prywatności</NuxtLink>. Korzystając z serwisu, akceptujesz jej postanowienia.</p>

          <h2>7. Wyłączenie odpowiedzialności</h2>
          <p>8BitJelly jest projektem hobbystycznym. Treści serwisu są udostępniane w stanie „takim, jakie są" (<em>as is</em>), bez jakichkolwiek gwarancji. 8BitJelly nie ponosi odpowiedzialności za:</p>
          <ul>
            <li>szkody wynikające z korzystania z serwisu lub gier,</li>
            <li>czasową niedostępność serwisu,</li>
            <li>treści zewnętrznych stron, do których prowadzą linki.</li>
          </ul>
          <p>W maksymalnym zakresie dopuszczalnym przez prawo polskie, odpowiedzialność 8BitJelly jest wyłączona.</p>

          <h2>8. Prawo właściwe</h2>
          <p>Niniejszy Regulamin podlega prawu polskiemu. Wszelkie spory będą rozstrzygane przez sądy powszechne właściwe dla siedziby 8BitJelly.</p>

          <h2>9. Zmiany Regulaminu</h2>
          <p>Zastrzegamy prawo do zmiany niniejszego Regulaminu w dowolnym momencie. Zmiany wchodzą w życie z chwilą opublikowania nowej wersji. Dalsze korzystanie z serwisu po zmianie Regulaminu oznacza jego akceptację.</p>

          <h2>10. Kontakt</h2>
          <p>W sprawach dotyczących niniejszego Regulaminu skontaktuj się z nami:<br />
          E-mail: <a href="mailto:hello@8bitjelly.com">hello@8bitjelly.com</a></p>
        </template>

        <!-- ENGLISH VERSION -->
        <template v-else>
          <p>These Terms of Service govern your use of <strong>8bitjelly.com</strong>, operated by 8BitJelly. By accessing the site, you agree to these terms.</p>

          <h2>1. General</h2>
          <p>8BitJelly is a hobby game development group. The website 8bitjelly.com is operated on a non-commercial basis, for informational and community purposes only. The service is free to use.</p>

          <h2>2. Intellectual Property</h2>
          <p>All content on this site — including game code, artwork, music, written materials and video — is the intellectual property of 8BitJelly and its contributors, unless otherwise stated.</p>
          <p>You may not:</p>
          <ul>
            <li>copy, reproduce or distribute content without written permission,</li>
            <li>create derivative works for commercial purposes,</li>
            <li>remove copyright notices.</li>
          </ul>
          <p>Sharing links to the site and quoting short excerpts with attribution is permitted.</p>

          <h2>3. Games and Projects</h2>
          <p>Games released by 8BitJelly are intended for non-commercial personal use. Specific licence terms for each game are defined on the distribution platform (e.g. itch.io). 8BitJelly reserves the right to modify, suspend or remove access to games without prior notice.</p>

          <h2>4. Contact Form and User Submissions</h2>
          <p>By submitting the contact form, you confirm that the information provided is truthful. If you submit content to us (e.g. fan art, suggestions), you grant us a non-exclusive, royalty-free, perpetual licence to display it on the site and in promotional materials, while retaining full copyright ownership.</p>

          <h2>5. Community Standards</h2>
          <p>When interacting with 8BitJelly or our community, you agree to:</p>
          <ul>
            <li>treat others with respect,</li>
            <li>not post offensive, hateful or illegal content,</li>
            <li>not harm other users or 8BitJelly services.</li>
          </ul>

          <h2>6. Privacy</h2>
          <p>Data processing practices are described in our <NuxtLink :to="localePath('/privacy')" style="color:var(--magenta);text-decoration:underline;">Privacy Policy</NuxtLink>. By using this site, you accept its terms.</p>

          <h2>7. Disclaimer</h2>
          <p>8BitJelly is a hobby project. Content is provided "as is" without any warranties. 8BitJelly is not liable for:</p>
          <ul>
            <li>any damages arising from use of the site or games,</li>
            <li>temporary unavailability of the site,</li>
            <li>content on external sites linked from here.</li>
          </ul>

          <h2>8. Governing Law</h2>
          <p>These Terms are governed by Polish law. Any disputes shall be resolved by Polish courts with jurisdiction over 8BitJelly's location.</p>

          <h2>9. Changes</h2>
          <p>We reserve the right to update these Terms at any time. Changes take effect upon publication. Continued use after changes constitutes acceptance.</p>

          <h2>10. Contact</h2>
          <p>For matters relating to these Terms:<br />
          Email: <a href="mailto:hello@8bitjelly.com">hello@8bitjelly.com</a></p>
        </template>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useSeoMeta({
  title: computed(() => locale.value === 'pl' ? 'Regulamin — 8BitJelly' : 'Terms of Service — 8BitJelly'),
  description: computed(() => locale.value === 'pl'
    ? 'Regulamin serwisu 8BitJelly — zasady korzystania ze strony, własność intelektualna, prywatność.'
    : 'Terms of Service for 8BitJelly — usage rules, intellectual property, and privacy.'),
  ogType: 'website',
  ogUrl: computed(() => `https://8bitjelly.com${route.path}`),
})

useHead({
  link: [{ rel: 'canonical', href: computed(() => `https://8bitjelly.com${route.path}`) }],
})
</script>
