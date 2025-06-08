<template>
  <a-modal :open="open" :footer="null" width="750px" centered @cancel="onClose">
    <template #title>
      <span>{{ card?.ori_name }} - {{ card?.name }}</span>
    </template>
    <div v-if="card" class="text-black">
      <img :src="getImage(card.ori_name)" :alt="card.ori_name" class="w-180 h-180" />
      <div class="mb-2 text-lg text-center italic text-gray-700">數值：{{ card.value }}</div>
      <div class="mb-2 text-center">
        <span class="font-bold">主題：</span>
        <span v-if="Array.isArray(card.title)">{{ card.title.join(' • ') }}</span>
        <span v-else>{{ card.title }}</span>
      </div>
      <div class="mb-2"><span class="font-bold">含義：</span>{{ card.mean }}</div>
      <hr class="my-4" />
      <div class="mb-4 whitespace-pre-line">
        <span v-if="Array.isArray(card.explain)">{{ card.explain.join('\n') }}</span>
        <span v-else>{{ card.explain }}</span>
      </div>
      <hr class="my-4" />
      <div class="mb-2"><span class="font-bold">占卜：</span>{{ card.divination }}</div>
      <div class="mb-2"><span class="font-bold">遊戲敘述：</span>{{ card.narration }}</div>
      <div class="mb-2"><span class="font-bold">喜悅：</span>{{ card.joy }}</div>
      <div class="mb-2"><span class="font-bold">絕望：</span>{{ card.despair }}</div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  open: Boolean,
  card: Object,
})
const emit = defineEmits(['close'])
function onClose() {
  emit('close')
}
import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const base = config.app && config.app.baseURL ? config.app.baseURL.replace(/\/$/, '') : ''
const getImage = (oriName: string) => `${base}/soothdeck/${oriName}.webp`
</script>
