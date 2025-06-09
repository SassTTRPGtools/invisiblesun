<template>
  <a-modal 
    :open="open" 
    :footer="null" 
    :width="windowWidth < 768 ? '95vw' : '750px'" 
    centered 
    @cancel="onClose"
    :bodyStyle="{ maxHeight: windowWidth < 768 ? '80vh' : 'auto', overflow: 'auto' }"
  >
    <template #title>
      <span class="text-sm md:text-base">{{ card?.ori_name }} - {{ card?.name }}</span>
    </template>
    <div v-if="card" class="text-black">
      <div class="flex justify-center mb-4">
        <img :src="getImage(card.ori_name)" :alt="card.ori_name" class="w-40 h-40 md:w-48 md:h-48 rounded-lg shadow-md" />
      </div>
      <div class="mb-2 text-base md:text-lg text-center italic text-gray-700">數值：{{ card.value }}</div>
      <div class="mb-2 text-center text-sm md:text-base">
        <span class="font-bold">主題：</span>
        <span v-if="Array.isArray(card.title)">{{ card.title.join(' • ') }}</span>
        <span v-else>{{ card.title }}</span>
      </div>
      <div class="mb-2 text-sm md:text-base"><span class="font-bold">含義：</span>{{ card.mean }}</div>
      <hr class="my-4" />
      <div class="mb-4 whitespace-pre-line text-sm md:text-base">
        <span v-if="Array.isArray(card.explain)">{{ card.explain.join('\n') }}</span>
        <span v-else>{{ card.explain }}</span>
      </div>
      <hr class="my-4" />
      <div class="mb-2 text-sm md:text-base"><span class="font-bold">占卜：</span>{{ card.divination }}</div>
      <div class="mb-2 text-sm md:text-base"><span class="font-bold">遊戲敘述：</span>{{ card.narration }}</div>
      <div class="mb-2 text-sm md:text-base"><span class="font-bold">喜悅：</span>{{ card.joy }}</div>
      <div class="mb-2 text-sm md:text-base"><span class="font-bold">絕望：</span>{{ card.despair }}</div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  open: Boolean,
  card: Object,
})
const emit = defineEmits(['close'])

// 響應式視窗寬度
const windowWidth = ref(768)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  if (process.client) {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', updateWindowWidth)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', updateWindowWidth)
  }
})

function onClose() {
  emit('close')
}
import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const base = config.app && config.app.baseURL ? config.app.baseURL.replace(/\/$/, '') : ''
const getImage = (oriName: string) => `${base}/soothdeck/${oriName}.webp`
</script>
