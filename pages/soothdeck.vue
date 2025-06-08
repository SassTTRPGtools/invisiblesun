<template>
  <div class="p-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] pl-[20px]">
    <h1 class="text-3xl font-bold mb-6 text-center">顯真牌一覽</h1>
    <div class="grid grid-cols-5 grid-rows-5 gap-4 justify-center items-center">
      <div v-for="card in cards.slice(0, 60)" :key="card.ori_name" class="bg-white rounded-lg shadow hover:shadow-lg transition p-2 flex flex-col items-center">
        <img :src="getImage(card.ori_name)" :alt="card.ori_name" class="w-36 h-36 cursor-pointer" @click="openModal(card)" />
        <div class="text-base font-semibold mb-1 text-center">{{ card.ori_name }}</div>
        <div class="text-gray-700 text-xs mb-1 text-center">{{ card.name }}</div>
        <div class="text-gray-500 text-xs text-center">{{ card.desc }}</div>
      </div>
    </div>
    <SoothModal :open="showModal" :card="selectedCard" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SoothModal from '@/components/SoothModal.vue'

const cards = ref<any[]>([])
const showModal = ref(false)
const selectedCard = ref<any>(null)

import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const base = config.app && config.app.baseURL ? config.app.baseURL.replace(/\/$/, '') : ''

const getImage = (oriName: string) => {
  return `${base}/soothdeck/${oriName}.webp`
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

<style scoped>
</style>
