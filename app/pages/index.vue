<script setup lang="ts">
import { Loader, Search, Sparkles, SlidersHorizontal, X } from "lucide-vue-next";

const {
  jobsData,
  areJobsLoading,
  errorFetchingJobs,
  refresh,
  page,
  queryDomain,
  queryType 
} = await useJobs()

const clearFilters = () => {
  queryType.value = ''
  queryDomain.value = ''
  refresh()
}
</script>

<template>
  <div class="pb-20">
    <!-- Hero Section -->
    <section class="relative pt-12 pb-24 overflow-hidden">
      <!-- Background elements -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div class="max-w-6xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-widest mb-8 animate-bounce">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Over 2,000+ New Jobs Today</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
          Find your next <span class="text-blue-600 relative inline-block">
            career move
            <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9C118.5 3 239.5 3 355 9" stroke="#2563EB" stroke-width="6" stroke-linecap="round"/>
            </svg>
          </span> 🚀
        </h1>
        
        <p class="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          The best platform to discover high-quality opportunities in tech, design, and beyond.
        </p>

        <!-- Search Bar -->
        <div class="max-w-3xl mx-auto">
          <div class="bg-white p-2 rounded-[32px] shadow-2xl shadow-blue-900/10 border border-slate-100 flex flex-col md:flex-row items-stretch gap-2 transition-all focus-within:ring-4 focus-within:ring-blue-500/5">
            <div class="flex-1 relative flex items-center">
              <Search class="absolute left-6 h-5 w-5 text-slate-400" />
              <input
                v-model="queryDomain"
                type="text"
                placeholder="Job title, keywords, or company..."
                class="w-full pl-14 pr-4 py-5 bg-transparent border-none focus:ring-0 text-slate-900 font-bold placeholder:text-slate-400"
              />
            </div>
            
            <div class="h-12 w-px bg-slate-100 mx-2 hidden md:block self-center"></div>
            
            <div class="flex items-center gap-2 p-2">
              <div class="relative min-w-35 flex items-center justify-end ">
                <SlidersHorizontal class=" absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <select 
                  v-model="queryType"
                  class="w-full pl-10 pr-8 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-slate-700 appearance-none cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="CDI">Full-time (CDI)</option>
                  <option value="CDD">Contract (CDD)</option>
                  <option value="FREELANCE">Freelance</option>
                </select>
              </div>
              
              <button
                @click="refresh"
                class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-blue-600/20"
              >
                Search
              </button>
            </div>
          </div>
          
          <div v-if="queryDomain || queryType" class="mt-6 flex justify-center">
            <button 
              @click="clearFilters"
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              <X class="w-3.5 h-3.5" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">Recent Opportunities ✨</h2>
          <p class="text-slate-500 font-medium">Discover the latest jobs posted in the last 24 hours.</p>
        </div>
        
        <div class="flex items-center gap-3">
          <div class="px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm text-sm font-bold text-slate-600">
            {{ jobsData?.meta?.total || 0 }} Positions Found
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="areJobsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        <div v-for="i in 6" :key="i" class="h-[320px] bg-white rounded-3xl border border-slate-100"></div>
      </div>

      <!-- Results -->
      <div v-else-if="jobsData?.jobs?.length" class="space-y-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <JobCard v-for="job in jobsData.jobs" :key="job.id" :job="job" />
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-6 pt-12 border-t border-slate-100">
          <button 
            @click="page--" 
            :disabled="page <= 1" 
            class="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="flex items-center gap-2">
            <span class="text-sm font-black text-slate-400 uppercase tracking-widest">Page</span>
            <span class="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-black shadow-lg shadow-blue-600/20">
              {{ page }}
            </span>
            <span class="text-sm font-black text-slate-400 uppercase tracking-widest">of {{ jobsData.meta?.totalPages }}</span>
          </div>
          
          <button 
            @click="page++" 
            :disabled="page >= jobsData.meta?.totalPages" 
            class="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
        <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Search class="w-10 h-10 text-slate-300" />
        </div>
        <h3 class="text-2xl font-black text-slate-900 mb-3 tracking-tight">No jobs found 🔍</h3>
        <p class="text-slate-500 font-medium mb-8 max-w-xs mx-auto">We couldn't find any positions matching your search. Try different keywords.</p>
        <button 
          @click="clearFilters"
          class="px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-2xl font-black transition-all shadow-xl"
        >
          Browse All Jobs
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.selection-blue::selection {
  background-color: #dbeafe;
  color: #1e40af;
}
</style>


<style scoped>
/* Dans votre CSS (ou <style scoped>) */
.custom-select {
  /* 1. Enlever le style par défaut du navigateur */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* 2. Votre style joli */
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  color: #333;
  width: 100%;
  cursor: pointer;

  /* 3. Remettre une flèche personnalisée (SVG encodé en base64 ici pour l'exemple) */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

/* On peut styliser le focus */
.custom-select:focus {
  outline: none;
  border-color: #3b82f6; /* Bleu */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>