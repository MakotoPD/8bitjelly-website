<template>
  <div>
    <div class="page-hero" style="background:var(--cream);border-bottom:2px solid var(--ink);">
      <div class="wrap">
        <span class="eyebrow">{{ locale === 'pl' ? 'Prawo' : 'Legal' }}</span>
        <h1 class="display" style="font-size:clamp(48px,8vw,120px);margin:14px 0 18px;line-height:0.9;">
          {{ locale === 'pl' ? 'Polityka' : 'Privacy' }}
          <em style="color:var(--magenta);">{{ locale === 'pl' ? 'Prywatności' : 'Policy' }}</em>
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
          <p>Niniejsza Polityka Prywatności opisuje, w jaki sposób 8BitJelly (<strong>„my"</strong>, <strong>„nas"</strong>) zbiera, przetwarza i chroni dane osobowe użytkowników serwisu <strong>8bitjelly.com</strong> zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (<strong>RODO</strong>).</p>

          <h2>1. Administrator danych osobowych</h2>
          <p>Administratorem danych osobowych jest:</p>
          <p>
            <strong>8BitJelly</strong><br />
            E-mail: <a href="mailto:hello@8bitjelly.com">hello@8bitjelly.com</a>
          </p>
          <p>W sprawach dotyczących ochrony danych osobowych możesz skontaktować się z nami pod adresem e-mail podanym powyżej.</p>

          <h2>2. Jakie dane zbieramy i w jakim celu</h2>

          <h3>2.1 Formularz kontaktowy</h3>
          <p>Gdy wysyłasz nam wiadomość przez formularz kontaktowy, zbieramy: imię, adres e-mail, numer telefonu (opcjonalnie) oraz treść wiadomości.</p>
          <ul>
            <li><strong>Cel:</strong> udzielenie odpowiedzi na Twoje zapytanie.</li>
            <li><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes — udzielenie odpowiedzi na kontakt zainicjowany przez użytkownika).</li>
            <li><strong>Czas przechowywania:</strong> dane są przechowywane do czasu rozwiązania sprawy, nie dłużej niż 30 dni od ostatniej korespondencji.</li>
            <li><strong>Procesor:</strong> wiadomości są przesyłane za pośrednictwem serwisu <strong>Web3Forms</strong> (Intuition Machines, Inc., USA). Web3Forms przetwarza dane wyłącznie w celu dostarczenia wiadomości i niezwłocznie ją usuwa.</li>
          </ul>

          <h3>2.2 Google Analytics (tylko za Twoją zgodą)</h3>
          <p>Jeśli wyrazisz zgodę, korzystamy z Google Analytics 4 w celu analizy ruchu na stronie. Zbierane są anonimowe dane o odwiedzanych stronach, czasie spędzonym na stronie, typie urządzenia i przeglądarki. Adres IP jest anonimizowany.</p>
          <ul>
            <li><strong>Cel:</strong> zrozumienie, w jaki sposób użytkownicy korzystają z serwisu i jego ulepszanie.</li>
            <li><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a RODO (Twoja zgoda).</li>
            <li><strong>Czas przechowywania:</strong> 26 miesięcy (domyślne ustawienie GA4).</li>
            <li><strong>Procesor:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlandia. Dane mogą być przekazywane do USA na podstawie mechanizmów EU-US Data Privacy Framework.</li>
            <li><strong>Wycofanie zgody:</strong> możesz wycofać zgodę w dowolnym momencie, klikając „Zarządzaj cookies" w stopce strony.</li>
          </ul>

          <h3>2.3 Umami Analytics</h3>
          <p>Korzystamy również z Umami — narzędzia analitycznego nieużywającego plików cookie. Umami zbiera wyłącznie anonimowe, zagregowane dane (liczba odwiedzin, strony) bez możliwości identyfikacji użytkownika.</p>
          <ul>
            <li><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes — optymalizacja techniczna strony).</li>
            <li><strong>Zgoda nie jest wymagana</strong> — Umami nie przetwarza danych osobowych.</li>
          </ul>

          <h3>2.4 Cloudflare Turnstile</h3>
          <p>Formularz kontaktowy i strony logowania są chronione przez Cloudflare Turnstile (Cloudflare, Inc., USA) w celu ochrony przed botami. Turnstile może zbierać dane behawioralne i adres IP w celu weryfikacji, czy jesteś człowiekiem.</p>
          <ul>
            <li><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes — bezpieczeństwo serwisu).</li>
            <li>Polityka prywatności Cloudflare: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a></li>
          </ul>

          <h3>2.5 Logi serwera</h3>
          <p>Hosting serwisu (Railway.app) automatycznie rejestruje standardowe logi serwera, w tym adresy IP, w celu zapewnienia technicznego działania strony. Dane te są przechowywane przez maksymalnie 30 dni i nie są wykorzystywane do identyfikacji użytkowników.</p>

          <h2>3. Pliki cookie</h2>
          <p>Używamy następujących rodzajów plików cookie:</p>
          <table>
            <thead>
              <tr><th>Nazwa</th><th>Rodzaj</th><th>Cel</th><th>Ważność</th></tr>
            </thead>
            <tbody>
              <tr><td><code>i18n_redirected</code></td><td>Niezbędny</td><td>Zapamiętanie wybranego języka</td><td>1 rok</td></tr>
              <tr><td><code>cookie_consent</code></td><td>Niezbędny</td><td>Zapamiętanie Twojej decyzji dot. cookies</td><td>1 rok</td></tr>
              <tr><td><code>_ga</code></td><td>Analityczny (za zgodą)</td><td>Rozróżnianie użytkowników w Google Analytics</td><td>2 lata</td></tr>
              <tr><td><code>_ga_XXXXXXX</code></td><td>Analityczny (za zgodą)</td><td>Utrzymanie sesji Google Analytics</td><td>2 lata</td></tr>
            </tbody>
          </table>
          <p>Możesz zarządzać zgodą na cookies analityczne w dowolnym momencie klikając „Zarządzaj cookies" w stopce strony lub za pomocą ustawień swojej przeglądarki.</p>

          <h2>4. Twoje prawa</h2>
          <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
          <ul>
            <li><strong>Prawo dostępu</strong> (art. 15 RODO) — możesz zażądać kopii swoich danych osobowych.</li>
            <li><strong>Prawo do sprostowania</strong> (art. 16 RODO) — możesz żądać korekty nieprawidłowych danych.</li>
            <li><strong>Prawo do usunięcia</strong> (art. 17 RODO) — możesz zażądać usunięcia swoich danych (tzw. „prawo do bycia zapomnianym").</li>
            <li><strong>Prawo do ograniczenia przetwarzania</strong> (art. 18 RODO).</li>
            <li><strong>Prawo do przenoszenia danych</strong> (art. 20 RODO).</li>
            <li><strong>Prawo do sprzeciwu</strong> (art. 21 RODO) — możesz sprzeciwić się przetwarzaniu na podstawie prawnie uzasadnionego interesu.</li>
            <li><strong>Prawo do wycofania zgody</strong> — w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed wycofaniem.</li>
          </ul>
          <p>Aby skorzystać z powyższych praw, skontaktuj się z nami: <a href="mailto:hello@8bitjelly.com">hello@8bitjelly.com</a>. Odpowiemy w ciągu 30 dni.</p>

          <h2>5. Organ nadzorczy</h2>
          <p>Masz prawo złożyć skargę do organu nadzorczego. W Polsce jest nim:</p>
          <p>
            <strong>Urząd Ochrony Danych Osobowych (UODO)</strong><br />
            ul. Stawki 2, 00-193 Warszawa<br />
            Tel.: 22 531 03 00<br />
            E-mail: <a href="mailto:kancelaria@uodo.gov.pl">kancelaria@uodo.gov.pl</a><br />
            <a href="https://uodo.gov.pl" target="_blank" rel="noopener">uodo.gov.pl</a>
          </p>

          <h2>6. Przekazywanie danych poza EOG</h2>
          <p>Niektórzy nasi procesorzy danych (Google Analytics, Web3Forms, Cloudflare, Railway.app) mają siedziby w USA. Przekazywanie danych odbywa się na podstawie standardowych klauzul umownych (SCC) lub mechanizmu EU-US Data Privacy Framework (DPF), co zapewnia odpowiedni poziom ochrony danych.</p>

          <h2>7. Bezpieczeństwo danych</h2>
          <p>Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych przed nieuprawnionym dostępem, utratą lub ujawnieniem. Komunikacja odbywa się wyłącznie przez szyfrowane połączenie HTTPS.</p>

          <h2>8. Zmiany Polityki Prywatności</h2>
          <p>Możemy aktualizować niniejszą Politykę Prywatności. O istotnych zmianach poinformujemy przez zamieszczenie nowej wersji na tej stronie wraz z nową datą aktualizacji. Zachęcamy do regularnego sprawdzania tej strony.</p>
        </template>

        <!-- ENGLISH VERSION -->
        <template v-else>
          <p>This Privacy Policy describes how 8BitJelly (<strong>"we"</strong>, <strong>"us"</strong>) collects, processes and protects personal data of users of <strong>8bitjelly.com</strong>, in accordance with Regulation (EU) 2016/679 (GDPR).</p>

          <h2>1. Data Controller</h2>
          <p>The data controller is:</p>
          <p>
            <strong>8BitJelly</strong><br />
            Email: <a href="mailto:hello@8bitjelly.com">hello@8bitjelly.com</a>
          </p>
          <p>For any data protection matters, please contact us at the email address above.</p>

          <h2>2. Data We Collect and Why</h2>

          <h3>2.1 Contact Form</h3>
          <p>When you send us a message via the contact form, we collect: your name, email address, phone number (optional), and message content.</p>
          <ul>
            <li><strong>Purpose:</strong> to reply to your inquiry.</li>
            <li><strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest — responding to contact initiated by the user).</li>
            <li><strong>Retention:</strong> data is retained until the matter is resolved, no longer than 30 days from the last communication.</li>
            <li><strong>Processor:</strong> messages are transmitted via <strong>Web3Forms</strong> (Intuition Machines, Inc., USA), which processes data solely for delivery and deletes it promptly.</li>
          </ul>

          <h3>2.2 Google Analytics (with your consent only)</h3>
          <p>If you consent, we use Google Analytics 4 to analyse website traffic. Anonymous data about visited pages, time spent, device type and browser is collected. IP addresses are anonymised.</p>
          <ul>
            <li><strong>Purpose:</strong> understanding how users interact with the site and improving it.</li>
            <li><strong>Legal basis:</strong> Art. 6(1)(a) GDPR (your consent).</li>
            <li><strong>Retention:</strong> 26 months (GA4 default).</li>
            <li><strong>Processor:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Data may be transferred to the USA under the EU-US Data Privacy Framework.</li>
            <li><strong>Withdrawing consent:</strong> you can withdraw at any time by clicking "Manage cookies" in the footer.</li>
          </ul>

          <h3>2.3 Umami Analytics</h3>
          <p>We also use Umami — a cookie-free analytics tool. Umami collects only anonymous, aggregated data (visit counts, pages) without any ability to identify individual users.</p>
          <ul>
            <li><strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest — technical optimisation).</li>
            <li><strong>No consent required</strong> — Umami does not process personal data.</li>
          </ul>

          <h3>2.4 Cloudflare Turnstile</h3>
          <p>The contact form and login pages are protected by Cloudflare Turnstile (Cloudflare, Inc., USA) to prevent spam and abuse. Turnstile may collect behavioural data and IP address to verify you are human.</p>
          <ul>
            <li><strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest — website security).</li>
            <li>Cloudflare privacy policy: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a></li>
          </ul>

          <h3>2.5 Server Logs</h3>
          <p>Our hosting provider (Railway.app) automatically logs standard server data including IP addresses for technical operation. This data is retained for up to 30 days and is not used to identify individual users.</p>

          <h2>3. Cookies</h2>
          <p>We use the following cookies:</p>
          <table>
            <thead>
              <tr><th>Name</th><th>Type</th><th>Purpose</th><th>Expiry</th></tr>
            </thead>
            <tbody>
              <tr><td><code>i18n_redirected</code></td><td>Necessary</td><td>Remember your language preference</td><td>1 year</td></tr>
              <tr><td><code>cookie_consent</code></td><td>Necessary</td><td>Remember your cookie decision</td><td>1 year</td></tr>
              <tr><td><code>_ga</code></td><td>Analytics (consent)</td><td>Distinguish users in Google Analytics</td><td>2 years</td></tr>
              <tr><td><code>_ga_XXXXXXX</code></td><td>Analytics (consent)</td><td>Maintain Google Analytics session</td><td>2 years</td></tr>
            </tbody>
          </table>
          <p>You can manage your cookie consent at any time by clicking "Manage cookies" in the footer, or via your browser settings.</p>

          <h2>4. Your Rights</h2>
          <p>Under GDPR, you have the following rights:</p>
          <ul>
            <li><strong>Right of access</strong> (Art. 15) — you may request a copy of your personal data.</li>
            <li><strong>Right to rectification</strong> (Art. 16) — you may request correction of inaccurate data.</li>
            <li><strong>Right to erasure</strong> (Art. 17) — you may request deletion of your data ("right to be forgotten").</li>
            <li><strong>Right to restriction of processing</strong> (Art. 18).</li>
            <li><strong>Right to data portability</strong> (Art. 20).</li>
            <li><strong>Right to object</strong> (Art. 21) — you may object to processing based on legitimate interest.</li>
            <li><strong>Right to withdraw consent</strong> — at any time, without affecting the lawfulness of prior processing.</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:hello@8bitjelly.com">hello@8bitjelly.com</a>. We will respond within 30 days.</p>

          <h2>5. Supervisory Authority</h2>
          <p>You have the right to lodge a complaint with a supervisory authority. In Poland, this is:</p>
          <p>
            <strong>Urząd Ochrony Danych Osobowych (UODO)</strong><br />
            ul. Stawki 2, 00-193 Warsaw, Poland<br />
            Tel.: +48 22 531 03 00<br />
            Email: <a href="mailto:kancelaria@uodo.gov.pl">kancelaria@uodo.gov.pl</a><br />
            <a href="https://uodo.gov.pl" target="_blank" rel="noopener">uodo.gov.pl</a>
          </p>

          <h2>6. International Data Transfers</h2>
          <p>Some of our data processors (Google Analytics, Web3Forms, Cloudflare, Railway.app) are based in the USA. Transfers are made under Standard Contractual Clauses (SCC) or the EU-US Data Privacy Framework (DPF), ensuring an adequate level of protection.</p>

          <h2>7. Data Security</h2>
          <p>We apply appropriate technical and organisational measures to protect personal data against unauthorised access, loss or disclosure. All communication is encrypted via HTTPS.</p>

          <h2>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy. For material changes, we will post the new version on this page with an updated date. We encourage you to check this page periodically.</p>
        </template>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { locale } = useI18n()
const route = useRoute()

useSeoMeta({
  title: computed(() => locale.value === 'pl' ? 'Polityka Prywatności — 8BitJelly' : 'Privacy Policy — 8BitJelly'),
  description: computed(() => locale.value === 'pl'
    ? 'Polityka prywatności serwisu 8BitJelly. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.'
    : 'Privacy Policy for 8BitJelly. Information about personal data processing in accordance with GDPR.'),
  ogType: 'website',
  ogUrl: computed(() => `https://8bitjelly.com${route.path}`),
})

useHead({
  link: [{ rel: 'canonical', href: computed(() => `https://8bitjelly.com${route.path}`) }],
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid var(--ink);
  border-radius: 12px;
  overflow: hidden;
  margin: 1em 0;
  font-size: 14px;
}
th {
  background: var(--ink);
  color: var(--cream);
  padding: 10px 14px;
  text-align: left;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
td {
  padding: 10px 14px;
  border-top: 1px solid var(--cream-2);
  vertical-align: top;
}
tr:hover td { background: var(--cream-2); }
</style>
