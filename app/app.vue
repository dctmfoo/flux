<script setup>
useSeoMeta({
  title: 'Flux-1 Schell Image Generator',
  description: 'Generate images with Flux-1 Schell and save them to your Cloudflare R2 bucket',
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
/* Remove any global styles that might interfere with our background image */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
