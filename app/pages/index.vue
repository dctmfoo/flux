<script setup>
import { ref, onMounted } from 'vue'

const prompt = ref('')
const steps = ref(4)
const src = ref('')
const gallery = ref([])
const loading = ref(false)

async function fetchGallery() {
  try {
    gallery.value = await $fetch('/api/list-images')
  } catch (error) {
    console.error('Error fetching gallery:', error)
  }
}

async function generateImage() {
  if (loading.value || !prompt.value) return
  loading.value = true
  try {
    const { pathname } = await $fetch('/api/generate', {
      method: 'POST',
      body: {
        prompt: prompt.value,
        steps: steps.value,
      },
    })
    src.value = `/images/${pathname}`
    gallery.value.unshift(pathname) // Add the newly generated image to the gallery
  } catch (error) {
    console.error('Error generating image:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGallery() // Fetch images from R2 bucket on mount
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4 text-center w-full max-w-[420px] mx-auto p-4 lg:p-0">
    <h1 class="text-3xl font-bold">
      Flux-1 Schell Image Generator
    </h1>
    <form class="w-full" @submit.prevent="generateImage">
      <UTextarea
        v-model="prompt"
        placeholder="Enter a detailed prompt"
        class="w-full mb-4"
        autoresize
      />
      <UFormGroup :label="`Number of steps (${steps})`" class="mb-4">
        <URange
          v-model="steps"
          :min="4"
          :max="8"
        />
      </UFormGroup>
      <UButton
        type="submit"
        color="black"
        block
        :loading="loading"
        :disabled="!prompt"
      >
        Generate
      </UButton>
    </form>

    <img v-if="src" :src="src" class="w-full max-w-[420px] my-4">

    <!-- Gallery Section -->
    <div v-if="gallery.length > 0" class="gallery grid grid-cols-3 gap-4 w-full mt-6">
      <div v-for="(image, index) in gallery" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
        <img :src="`/images/${image}`" alt="Generated image" class="w-full h-full object-cover">
      </div>
    </div>
  </div>
</template>
