<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">顯真牌一覽</h1>
    <div class="grid grid-cols-5 grid-rows-5 gap-4">
      <div v-for="card in cards.slice(0, 25)" :key="card.ori_name" class="bg-white rounded-lg shadow hover:shadow-lg transition p-2 flex flex-col items-center">
        <img :src="getImage(card.ori_name)" :alt="card.ori_name" class="w-36 h-36 cursor-pointer" @click="openModal(card)" />
        <div class="text-base font-semibold mb-1 text-center">{{ card.ori_name }}</div>
        <div class="text-gray-700 text-xs mb-1 text-center">{{ card.name }}</div>
        <div class="text-gray-500 text-xs text-center">{{ card.desc }}</div>
      </div>
    </div>
    <!-- Modal -->
    <a-modal v-model:open="showModal" :footer="null" width="750px" centered>
      <template #title>
        <span>{{ selectedCard?.ori_name }} - {{ selectedCard?.name }}</span>
      </template>
      <div v-if="selectedCard" class="text-black">
        <img :src="getImage(selectedCard.ori_name)" :alt="selectedCard.ori_name" class="w-180 h-180" />
        <div class="mb-2 text-lg text-center italic text-gray-700">數值：{{ selectedCard.value }}</div>
        <div class="mb-2 text-center">
          <span class="font-bold">主題：</span>
          <span v-if="Array.isArray(selectedCard.title)">{{ selectedCard.title.join(' • ') }}</span>
          <span v-else>{{ selectedCard.title }}</span>
        </div>
        <div class="mb-2"><span class="font-bold">含義：</span>{{ selectedCard.mean }}</div>
        <hr class="my-4" />
        <div class="mb-4 whitespace-pre-line">
          <span v-if="Array.isArray(selectedCard.explain)">{{ selectedCard.explain.join('\n') }}</span>
          <span v-else>{{ selectedCard.explain }}</span>
        </div>
        <hr class="my-4" />
        <div class="mb-2"><span class="font-bold">占卜：</span>{{ selectedCard.divination }}</div>
        <div class="mb-2"><span class="font-bold">遊戲敘述：</span>{{ selectedCard.narration }}</div>
        <div class="mb-2"><span class="font-bold">喜悅：</span>{{ selectedCard.joy }}</div>
        <div class="mb-2"><span class="font-bold">絕望：</span>{{ selectedCard.despair }}</div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'ant-design-vue'

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
  // Nuxt 3 靜態資源應放在 public 目錄，assets 目錄不會被直接公開
  const res = await fetch(`${base}/soothdeck.json`)
  cards.value = await res.json()
})
</script>

<style scoped>
</style>
