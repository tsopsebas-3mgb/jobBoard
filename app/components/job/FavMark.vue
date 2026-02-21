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
  removeFromFav,
  favData,
  favsLoading
} =  useFav()


const isFavv = computed(() => {
  if (!favData.value) return false

  return favData.value.some(favJob => Number(favJob.id) === Number(props.jobId))
})

const handleFav = async (e: Event) => {
  isFavv.value? await removeFromFav(props.jobId) : await addToFav(props.jobId)
}
</script>

<template>
  <button 
    @click.prevent.stop="handleFav"
    :disabled="favsLoading" 
    class="group/fav p-2 rounded-xl transition-all duration-300 hover:bg-red-50 active:scale-90 disabled:opacity-50"
  >
    <Bookmark
      :class="[
        'w-5 h-5 transition-all duration-300',
        isFavv ? 'fill-red-500 stroke-red-500 scale-110' : 'fill-transparent stroke-slate-400 group-hover/fav:stroke-red-400'
      ]"
    />
  </button>
</template>