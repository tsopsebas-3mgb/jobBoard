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
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'CDD':
      return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'FREELANCE':
      return 'bg-violet-50 text-violet-700 border-violet-100'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-100'
  }
})

const dotColor = computed(() => {
  switch (props.type.toUpperCase()) {
    case 'CDI': return 'bg-emerald-500'
    case 'CDD': return 'bg-amber-500'
    case 'FREELANCE': return 'bg-violet-500'
    default: return 'bg-slate-500'
  }
})
</script>

<template>
  <span :class="['inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border tracking-wide', styles]">
    <span :class="['w-1.5 h-1.5 rounded-full', dotColor]"></span>
    {{ type }}
  </span>
</template>

