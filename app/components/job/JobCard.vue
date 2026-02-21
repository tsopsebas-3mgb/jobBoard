<script setup>
import { MapPin, Clock, Banknote } from 'lucide-vue-next';
import Badge from "~/components/job/Badge.vue";
import FavMark from "~/components/job/FavMark.vue";

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(amount)
}
</script>

<template>
  <NuxtLink 
    :to="`/jobs/${job.id}`" 
    class="group relative bg-white rounded-3xl border border-slate-100 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
  >
    <!-- Card Accent -->
    <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150 group-hover:bg-blue-100/50"></div>

    <div class="relative z-10">
      <div class="flex justify-between items-start mb-5">
        <div class="flex-1 mr-4">
          <h3 class="font-black text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight mb-1">
            {{ job.title }}
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-slate-400">{{ job.employer }}</span>
          </div>
        </div>
        <Badge :type="job.contractType" />
      </div>

      <div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
        <div class="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl">
          <MapPin class="w-3.5 h-3.5 text-blue-500" />
          {{ job.location.neighborhood }}, {{ job.location.city }}
        </div>
        <div class="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl">
          <Banknote class="w-3.5 h-3.5 text-emerald-500" />
          {{ formatCurrency(job.salary.min) }} +
        </div>
      </div>

      <p class="text-slate-600 text-sm mb-8 line-clamp-3 grow leading-relaxed">
        {{ job.description }}
      </p>

      <div class="flex items-center justify-between border-t border-slate-50 pt-5 mt-auto">
        <div class="flex items-center text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
          <Clock class="w-3.5 h-3.5 mr-1.5 text-slate-300" />
          {{ timeAgo(job.publishDate) }}
        </div>
        
        <div class="flex items-center gap-2">
          <FavMark :jobId="job.id" />
          <div class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-45">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>


<style scoped>
  .bookmark {
    animation: ease-in 0.5s grow-y forwards;
  }
  @keyframes grow-y {
    0% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(2) translateY(25%);
    }
    100% {
      transform: scaleY(1);
    }
  }
</style>
