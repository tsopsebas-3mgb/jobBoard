<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const styles = computed(() => {
  switch (props.type.toUpperCase()) {
    case 'CDI':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'CDD':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'FREELANCE':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
})
</script>

<template>
  <span :class="['px-2.5 py-0.5 rounded-full text-xs font-medium border', styles]">
    {{ type }}
  </span>
</template>
