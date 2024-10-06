<script setup>
import { ref, onMounted, watch } from 'vue'

const prompt = ref('')
const steps = ref(4)
const src = ref('')
const gallery = ref([])
const loading = ref(false)
// Lightbox state
const isLightboxOpen = ref(false)
const currentLightboxIndex = ref(0)

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
    gallery.value.unshift(pathname)
  } catch (error) {
    console.error('Error generating image:', error)
  } finally {
    loading.value = false
  }
}

function openLightbox(index) {
  currentLightboxIndex.value = index
  isLightboxOpen.value = true
}

function nextImage() {
  currentLightboxIndex.value = (currentLightboxIndex.value + 1) % gallery.value.length
}

function prevImage() {
  currentLightboxIndex.value = (currentLightboxIndex.value - 1 + gallery.value.length) % gallery.value.length
}

function handleKeydown(event) {
  if (!isLightboxOpen.value) return
  if (event.key === 'ArrowRight') nextImage()
  if (event.key === 'ArrowLeft') prevImage()
  if (event.key === 'Escape') isLightboxOpen.value = false
}

onMounted(() => {
  fetchGallery()
  window.addEventListener('keydown', handleKeydown)
})

watch(isLightboxOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="home-container">
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
        <div
          v-for="(image, index) in gallery"
          :key="index"
          class="border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
          @click="openLightbox(index)"
        >
          <img :src="`/images/${image}`" alt="Generated image" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Lightbox Modal -->
      <UModal v-model="isLightboxOpen" :ui="{ width: 'max-w-3xl' }">
        <UCard class="relative">
          <img 
            :src="`/images/${gallery[currentLightboxIndex]}`" 
            alt="Lightbox image" 
            class="max-w-full max-h-[80vh] object-contain"
          >
          <div class="absolute top-1/2 left-4 transform -translate-y-1/2">
            <UButton icon="i-heroicons-chevron-left-20-solid" color="white" variant="ghost" @click="prevImage" />
          </div>
          <div class="absolute top-1/2 right-4 transform -translate-y-1/2">
            <UButton icon="i-heroicons-chevron-right-20-solid" color="white" variant="ghost" @click="nextImage" />
          </div>
        </UCard>
      </UModal>
    </div>

  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-image: url('/images/max.jpg'); /* Remove 'public' from the path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white; /* Add this to ensure text is visible */
}

/* Existing styles */
</style>
