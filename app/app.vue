<script setup>
import { useAuth } from '#imports'

useSeoMeta({
  title: 'Flux-1 Schell Image Generator',
  description: 'Generate images with Flux-1 Schell and save them to your Cloudflare R2 bucket',
})

const { status, data: session, signIn, signOut } = useAuth()
</script>

<template>
  <div>
    <div class="auth-buttons">
      <template v-if="status === 'authenticated'">
        <p>Welcome, {{ session?.user?.name }}</p>
        <UButton @click="signOut({ callbackUrl: '/' })">Logout</UButton>
      </template>
      <UButton v-else @click="signIn('github')">Login with GitHub</UButton>
    </div>
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

.auth-buttons {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
