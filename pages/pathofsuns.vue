<template>
  <div class="flex flex-col items-center min-h-[70vh] relative">
    <h1 class="text-2xl font-bold z-10 w-full text-center pt-4" style="margin-bottom:10px;">太陽路徑 Path of Suns</h1>
    <button
      class="mb-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      @click="drawToNextSun"
    >
      抽牌並放置
    </button>
    <div class="relative w-full max-w-3xl aspect-[2/1]">
      <img
        :src="`${base}/soothdeck/Path of Suns-Cloth Map-2019-02-13.webp`"
        alt="Path of Suns"
        class="w-full h-auto select-none"
        style="cursor: crosshair;"
      />
      <!-- 放置牌卡的點位 -->
      <template v-for="(pt, idx) in sunPoints" :key="idx">
        <div
          v-if="placedCards[idx]"
          :style="getSunStyle(pt)"
          class="absolute z-30 cursor-pointer group"
          @click.stop="openModal(placedCards[idx])"
        >
          <img
            :src="getImage(placedCards[idx].ori_name)"
            :alt="placedCards[idx].ori_name"
            class="w-30 h-30  group-hover:scale-110 transition"
          />
          <div class="text-xs text-center mt-1 text-black bg-white/80 rounded px-1">{{ pt.name }}</div>
        </div>
      </template>
    </div>
    <SoothModal :open="showModal" :card="selectedCard" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SoothModal from '@/components/SoothModal.vue'
import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const base = config.app && config.app.baseURL ? config.app.baseURL.replace(/\/$/, '') : ''

// 太陽點位與名稱，順序依指定
const sunPoints = [
  { x: 0.466, y: 0.30, name: '銀色太陽' },
  { x: 0.265, y: 0.704, name: '綠色太陽' },
  { x: 0.466, y: 1.114, name: '藍色太陽' },
  { x: 0.265, y: 1.518, name: '靛色太陽' },
  { x: 0.669, y: 1.518, name: '灰色太陽' },
  { x: 0.466, y: 1.924, name: '蒼白太陽' },
  { x: 0.669, y: 2.326, name: '紅色太陽' },
  { x: 0.466, y: 2.73, name: '金色太陽' },
  { x: 0.669, y: 0.706, name: '隱形太陽' }
]
// 抽牌順序對應點位索引
const drawOrder = [0,1,2,3,4,5,6,7,8]

const cards = ref<any[]>([])
const placedCards = ref<any[]>([])
const showModal = ref(false)
const selectedCard = ref<any>(null)

function getSunStyle(pt: {x:number, y:number}) {
  // 以 px 為單位，避免型別錯誤
  return {
    position: 'absolute',
    left: `calc(${pt.x * 100}% - 32px)` as any,
    top: `calc(${pt.y * 100}% - 48px)` as any
  } as any
}

const getImage = (oriName: string) => `${base}/soothdeck/${oriName}.webp`

let cycleIdx = 0
function drawToNextSun() {
  if (cards.value.length === 0) return
  let nextIdx
  if (placedCards.value.length < sunPoints.length) {
    nextIdx = placedCards.value.length
  } else {
    nextIdx = cycleIdx % sunPoints.length
    cycleIdx++
  }
  // 選擇未被放置或即將被覆蓋的牌
  let available = cards.value.filter(card => !placedCards.value.includes(card) || placedCards.value[nextIdx] === card)
  if (available.length === 0) return
  const idx = Math.floor(Math.random() * available.length)
  const card = available[idx]
  if (placedCards.value.length < sunPoints.length) {
    placedCards.value.push(card)
  } else {
    placedCards.value[nextIdx] = card
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
