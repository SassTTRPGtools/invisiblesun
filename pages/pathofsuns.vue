<template>
  <div class="flex flex-row items-start min-h-[70vh] w-full max-w-6xl mx-auto pt-4 gap-4">
    <!-- 左側：按鈕區，完全置中，pad-left 10px -->
    <div class="flex flex-col justify-center items-center w-1/5 min-w-[120px] h-[80vh] pl-[10px]">
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 w-full"
        @click="onDrawClick"
      >
        抽牌並放置
      </button>
    </div>
    <!-- 中間：地圖與牌卡點位，圖片完整顯示不裁切 -->
    <div class="relative flex-1 max-w-2xl min-w-[400px] overflow-auto flex items-center justify-center" style="height: 80vh;">
      <div class="relative w-full h-full flex items-center justify-center">
        <img
          :src="`${base}/soothdeck/Path of Suns-Cloth Map-2019-02-13.webp`"
          alt="Path of Suns"
          class="max-w-full max-h-full object-contain select-none"
          style="display: block; margin: 0 auto; background: #fff;"
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
              class="w-17 h-17 group-hover:scale-110 transition"
            />
            <div class="text-xs text-center mt-1 text-black bg-white/80 rounded px-1">{{ pt.name }}</div>
          </div>
        </template>
      </div>
    </div>
    <!-- 右側：預留區塊 -->
    <div class="w-1/4 min-w-[200px]">
      <a-card bordered>
        <template #title>
          <div class="text-center font-bold text-base">目前路徑&效果</div>
        </template>
        <template v-if="placedCards.length > 0">
          <div class="flex flex-col items-center">
            <div class="mb-2 font-bold text-lg text-gray-800">{{ sunPoints[lastPlacedIdx].name }}</div>
            <div class="font-semibold text-base text-center mb-1">{{ placedCards[lastPlacedIdx].name }}</div>
            <div class="font-semibold text-base text-center mb-1">{{ placedCards[lastPlacedIdx].effect }}</div>
            <!-- 右側卡片區塊備註顯示 -->
            <div class="font-semibold text-base text-center mb-1" v-html="getNote(placedCards[lastPlacedIdx].effect, lastPlacedIdx)"></div>
          </div>
        </template>
        <template v-else>
          <div class="text-gray-500">這裡可放說明、資訊或互動內容</div>
        </template>
      </a-card>
    </div>
    <SoothModal :open="showModal" :card="selectedCard" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SoothModal from '@/components/SoothModal.vue'
import { useRuntimeConfig } from '#imports'
import type { CSSProperties } from 'vue'
const config = useRuntimeConfig()
const base = config.app && config.app.baseURL ? config.app.baseURL.replace(/\/$/, '') : ''

// 太陽點位與名稱，順序依指定
const sunPoints = [
  { x: 0.528, y: 0.132, name: '銀色太陽' },
  { x: 0.387, y: 0.264, name: '綠色太陽' },
  { x: 0.526, y: 0.398, name: '藍色太陽' },
  { x: 0.387, y: 0.529, name: '靛色太陽' },
  { x: 0.665, y: 0.530, name: '灰色太陽' },
  { x: 0.526, y: 0.661, name: '蒼白太陽' },
  { x: 0.665, y: 0.793, name: '紅色太陽' },
  { x: 0.526, y: 0.924, name: '金色太陽' },
  { x: 0.665, y: 0.264, name: '隱形太陽' }
]
// 抽牌順序對應點位索引
const drawOrder = [0,1,2,3,4,5,6,7,8]

const cards = ref<any[]>([])
const placedCards = ref<any[]>([])
const showModal = ref(false)
const selectedCard = ref<any>(null)
const lastPlacedIdx = ref(0)

function getSunStyle(pt: {x:number, y:number}): CSSProperties {
  // 以百分比定位，確保在容器縮放時點位不跑版
  return {
    position: 'absolute',
    left: `calc(${pt.x * 100}% - 48px)`,
    top: `calc(${pt.y * 100}% - 48px)`
  }
}

const getImage = (oriName: string) => `${base}/soothdeck/${oriName}.webp`

let cycleIdx = 0
function drawToNextSun(extraDraw = false) {
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
  lastPlacedIdx.value = nextIdx

  // 若抽到特殊效果，立即再抽一次
  if (!extraDraw && (card.effect === '行家' || (card.effect === '友伴' && placedCards.value.length === 1 && nextIdx === 0))) {
    // 行家：擺另一張卡到下一個太陽
    // 友伴：首抽在銀色太陽立即在下個太陽再出一張牌
    setTimeout(() => drawToNextSun(true), 1000)
  }
}

function openModal(card: any) {
  selectedCard.value = card
  showModal.value = true
}

// 備註自動判斷
function getNote(effect: string, idx: number): string {
  if (/^[\u4e00-\u9fa5]+\/[\u4e00-\u9fa5]+$/.test(effect)) {
    return '強化：效果+1 或是 費用-1<br>弱化：效果-1 或是 費用+1';
  }
  switch (effect) {
    case '君權':
      return '所有動作 +1，如果心性與卡族有連結則 +2';
    case '讎家':
      return '所有動作 −1，如果心性與卡族有連結則 −2';
    case '衛士':
      return '如果心性與卡族有連結則所有動作 +2';
    case '學徒':
      return '如果心性與卡族有連結則所有動作 −1';
    case '友伴': {
      if (idx === 0) {
        return '複製之前已出牌的效果<br>（如果這是首抽在銀色太陽上的話，則立即在下個太陽上再出一張牌）';
      } else {
        // 取得上一張牌的效果與說明
        const prev = placedCards.value[idx - 1];
        const prevNote: string = prev ? getNote(prev.effect, idx - 1) : '';
        return `複製之前已出牌的效果<br>${prev ? prev.effect : ''}` + (prevNote ? `<br>${prevNote}` : '');
      }
    }
    case '行家':
      return '擺另一張卡到下一個太陽';
    default:
      return '';
  }
}

onMounted(async () => {
  if (process.client) {
    const res = await fetch(`${base}/soothdeck/soothdeck.json`)
    cards.value = await res.json()
  }
})

function onDrawClick() {
  drawToNextSun();
}
</script>
