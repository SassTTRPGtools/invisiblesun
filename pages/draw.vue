<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] p-4">
    <h1 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white text-center">單獨抽牌</h1>
    <div class="mb-4">
      <img
        v-if="!drawnCard"
        :src="`${base}/soothdeck/backcover.png`"
        alt="抽牌"
        class="w-32 h-32 md:w-48 md:h-48 hover:scale-105 transition cursor-pointer rounded-lg shadow-lg"
        @click="drawCard"
      />
      <img
        v-else
        :src="getImage(drawnCard.ori_name)"
        :alt="drawnCard.ori_name"
        class="w-32 h-32 md:w-48 md:h-48 hover:scale-105 transition cursor-pointer rounded-lg shadow-lg"
        @click="openModal(drawnCard)"
      />
    </div>
    <button
      v-if="drawnCard"
      class="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm md:text-base"
      @click="drawCard"
    >
      再抽一張
    </button>
    <SoothModal :open="showModal" :card="selectedCard" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SoothModal from '@/components/SoothModal.vue'
import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const base = config.app && config.app.baseURL ? config.app.baseURL.replace(/\/$/, '') : ''

const cards = ref<any[]>([])
const drawnCard = ref<any>(null)
const showModal = ref(false)
const selectedCard = ref<any>(null)

const getImage = (oriName: string) => `${base}/soothdeck/${oriName}.webp`

function drawCard() {
  if (cards.value.length > 0) {
    const idx = Math.floor(Math.random() * cards.value.length)
    drawnCard.value = cards.value[idx]
    openModal(drawnCard.value)
  }
}

function openModal(card: any) {
  selectedCard.value = card
  showModal.value = true
}

onMounted(async () => {
  if (process.client) {
    const res = await fetch(`${base}/soothdeck/soothdeck.json`)
    cards.value = await res.json()
  }
})
</script>
