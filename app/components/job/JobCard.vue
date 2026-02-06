<script setup>
import { MapPin, Clock , LucideBookmarkCheck, Bookmark  } from 'lucide-vue-next';
import Badge from "~/components/job/Badge.vue";
import FavMark from "~/components/job/FavMark.vue";

const {addToFav,successMsg,errorMsg,isFav} = useFav();
const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <NuxtLink :to="`/jobs/${job.id}`" class="group relative z-1 bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-1" :title="job.title">
          {{ job.title }}
        </h3>
        <p class="text-sm text-gray-500 mt-1">{{ job.employer }}</p>
      </div>
      <Badge :type="job.contractType" />
    </div>

    <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
      <div class="flex items-center gap-1.5">
        <MapPin class="w-4 h-4" />
        {{ job.location.city }} {{ job.location.country}}
      </div>
      <div class="font-medium text-gray-700">
        {{`${job.salary.min}FCFA`}} - {{`${job.salary.max}FCFA`}}
      </div>
    </div>

    <p class="text-gray-600 text-sm mb-6 line-clamp-2 grow">
      {{ job.description }}
    </p>

    <div class="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4 mt-auto">
      <div class="flex items-center justify-center">
        <Clock class="w-3 h-3 mr-1" />
        {{ timeAgo(job.publishDate) }}
      </div>
      <FavMark :jobId="job.id" />
    </div>
    <p>{{successMsg}}l</p>
    <p>{{errorMsg}}l</p>
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
