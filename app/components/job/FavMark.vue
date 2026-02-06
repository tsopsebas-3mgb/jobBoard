<script setup lang="ts">
import { Bookmark } from 'lucide-vue-next'

const props = defineProps({
  jobId: {
    type: Number,
    required: true
  }
})

const {
  addToFav,
  favData,
  favsLoading
} = await useFav()


const isFavv = computed(() => {
  if (!favData.value) return false

  return favData.value.some(favJob => Number(favJob.id) === Number(props.jobId))
})

const handleFav = async () => {
  await addToFav(props.jobId)
}
</script>

<template>
  <button @click="handleFav" :disabled="favsLoading" class="focus:outline-none">
    <Bookmark
        :class="[
        'transition-colors duration-200',
        isFavv ? 'fill-yellow-400 stroke-yellow-400' : 'fill-transparent stroke-gray-400'
      ]"
    />
  </button>
</template>