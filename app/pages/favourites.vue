<script setup lang="ts">
import { Bookmark,BookmarkCheck, Briefcase, Search, ArrowRight } from 'lucide-vue-next'
import JobCard from '~/components/job/JobCard.vue'

const { favData, favsLoading, errorGF } =  useFav()
const { user } = useAuth()

watchEffect(() => {
  if (!user.value && !favsLoading.value) {
    navigateTo('/login')
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-24 pt-12">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            My Favorites <BookmarkCheck class="w-8 h-8 text-red-500 " />
          </h1>
          <p class="text-slate-500 font-medium mt-2 text-lg">Manage the opportunities you've saved for later.</p>
        </div>
        
        <div v-if="favData?.length" class="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm font-bold text-slate-600">
          {{ favData.length }} Saved Position{{ favData.length > 1 ? 's' : '' }}
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="favsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        <div v-for="i in 3" :key="i" class="h-[320px] bg-white rounded-[40px] border border-slate-100"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="errorGF" class="bg-red-50 p-8 rounded-[40px] border border-red-100 text-center">
        <p class="text-red-600 font-bold">Failed to load your favorites. Please try again later.</p>
      </div>

      <!-- Content -->
      <div v-else>
        <div v-if="favData?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <JobCard v-for="job in favData" :key="job.id" :job="job" />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200 shadow-xl shadow-blue-900/5">
          <div class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Heart class="w-10 h-10 text-red-300" />
          </div>
          <h3 class="text-2xl font-black text-slate-900 mb-3 tracking-tight">Your wishlist is empty 💖</h3>
          <p class="text-slate-500 font-medium mb-10 max-w-xs mx-auto">Start exploring and save jobs that catch your eye to see them here.</p>
          
          <NuxtLink 
            to="/" 
            class="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:translate-y-[-2px]"
          >
            <span>Explore Jobs</span>
            <ArrowRight class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
