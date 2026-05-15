<template>
  <div>
    <div class="page-hero" style="background:var(--cream);border-bottom:2px solid var(--ink);">
      <div class="wrap">
        <h1 class="display" style="font-size:clamp(60px,10vw,140px);margin:0;line-height:0.9;">
          {{ $t('terms.title') }} <em style="color:var(--magenta);">{{ $t('terms.titleEm') }}</em>
        </h1>
      </div>
    </div>

    <section style="padding:80px 0 100px;">
      <div class="wrap prose" style="max-width:800px;">
        <h2>1. Introduction</h2>
        <p>Welcome to 8BitJelly. By accessing our website and content, you agree to be bound by these Terms of Service.</p>

        <h2>2. Use of Content</h2>
        <p>All game content, artwork, music, and written material on this website is the intellectual property of 8BitJelly and its contributors. You may not reproduce, distribute, or create derivative works without explicit permission.</p>

        <h2>3. Community Guidelines</h2>
        <p>When interacting with our community, you agree to be respectful, constructive, and welcoming. Harassment, hate speech, or toxic behavior will result in removal from our community.</p>

        <h2>4. User Submissions</h2>
        <p>If you submit content to us (e.g., fan art, suggestions), you grant us a non-exclusive license to use and display it while retaining your copyright.</p>

        <h2>5. Privacy</h2>
        <p>We collect minimal data. Contact form submissions are used only to respond to your inquiry. We do not sell your data to third parties.</p>

        <h2>6. Disclaimer</h2>
        <p>8BitJelly is a hobby project. Content is provided "as is" without warranty of any kind. We are not responsible for any damages arising from the use of our website or games.</p>

        <h2>7. Changes</h2>
        <p>We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of the new terms.</p>

        <p style="color:color-mix(in oklab,var(--ink) 60%,transparent);font-size:14px;margin-top:40px;">Last updated: January 2025</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Terms of Service — 8BitJelly' })
</script>
