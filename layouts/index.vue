<template>
	<slot />
</template>


<script setup lang="ts">
useHead({
	script: [
		{
			type: 'application/ld+json',
			children: '{"@context": "https://schema.org","@type": "Corporation","name": "8BitJelly","alternateName": "8bitjelly","url": "https://8bitjelly.com/","logo": "https://8bitjelly.com/logo_white.svg","sameAs": ["https://www.facebook.com/8bitjelly","https://www.github.com/8bitjelly","https://www.8bitjelly.com","https://www.instagram.com/8bitjelly"],"keywords": "gamedev, gamedev polish, gamedev poland, game studio, games, game, developers, developer, 8bit, 8bitjelly, unity, unity game development, unity game, indie game, independent game, unity games, game making, fromsoftware games, indie game dev, digital extreme, unity game dev"}'
		}
	
	]
})
</script>