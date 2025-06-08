<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh]">
    <h1 class="text-2xl font-bold mb-6">單獨抽牌</h1>
    <div>
      <img
        v-if="!drawnCard"
        :src="`${base}/soothdeck/backcover.png`"
        alt="抽牌"
        class="w-150 h-150 hover:scale-105 transition"
        @click="drawCard"
      />
      <img
        v-else
        :src="getImage(drawnCard.ori_name)"
        :alt="drawnCard.ori_name"
        class="w-150 h-150 hover:scale-105 transition hover:scale-105 transition"
        @click="openModal(drawnCard)"
      />
    </div>
    <SoothModal :open="showModal" :card="selectedCard" @close="showModal = false" />
    <button
      v-if="drawnCard"
      class="mt-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      @click="drawCard"
    >
      再抽一張
    </button>
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
