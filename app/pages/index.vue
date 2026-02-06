<script setup lang="ts">
import { Loader,Search,ArrowBigLeft,ArrowBigRight } from "lucide-vue-next";

const  {
  jobsData,
  areJobsLoading,
  errorFetchingJobs,
  refresh,

  page,
  queryDomain,
  queryType } = await useJobs()


</script>

<template>
  <div class="flex flex-col justify-center items-center ">
    <!-- Hero Section -->
    <div class="bg-white border-b border-gray-100 py-16 sm:py-24">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          Trouvez le job de vos <span class="text-primary">rêves</span>
        </h1>
        <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Explorez des centaines d'opportunités dans la tech, le design et le marketing. Votre prochaine aventure commence ici.
        </p>

        <div class="relative max-w-2xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search class="h-5 w-5 text-gray-400" />
          </div>
          <input
              v-model="queryDomain"
              type="text"
              class="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              placeholder="Mots-clés, poste ou entreprise..."
          />

          <div class="absolute inset-y-2 flex  right-2">
            <select v-model="queryType"
            class=" custom-select h-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/50 shadow-sm py-2.5 px-3 border bg-white mr-2">
              <option value="">TYPE</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="FREELANCE">Freelance</option>
            </select>
            <button
                @click="()=>{
                  queryType=''
                  queryDomain=''
                  refresh()
            }"
                class="h-full bg-primary hover:bg-blue-700 text-white px-6 rounded-xl font-medium transition-colors">
              Effacer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex justify-between   items-end mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Dernières offres</h2>
        <h1 class="flex  bg-conic-0 from-transparent via-slate-900 vvia-transparent  shadow-slate-900 shadow-2xl text-slate-900 opacity-20 animate-spin rounded-full fixed z-999 top-1/2 left-1/2 -translate-1/2">
           <Loader
               v-if="areJobsLoading"
               class="   size-50    "
               @click="refresh()" />
        </h1>

        <span class="text-gray-500 text-sm">{{ jobsData?.meta?.total || 'aucun' }} poste{{jobsData?.meta?.total? 's':''}} trouvé{{jobsData?.meta?.total? 's':''}}</span>
      </div>

      <div v-if="jobsData?.jobs?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard v-for="job in jobsData.jobs" :key="job.id" :job="job" />
        <div class="w-full md:col-span-2 lg:col-span-3 gap-3 flex justify-center items-center " >
          <button @click="page--" :disabled="page <= 1" class="disabled:opacity-30">
            <ArrowBigLeft />
          </button>
          <span class="border-3 rounded-full p-2 font-bold text-primary ">
            {{page}} / {{ jobsData.meta?.totalPages }}
          </span>
          <button @click="page++" :disabled="page >= jobsData.meta?.totalPages" class="disabled:opacity-30">
            <ArrowBigRight />
          </button>
        </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
        <div class="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">Aucun résultat</h3>
        <p class="text-gray-500">Essayez d'autres mots-clés ou parcourez toutes les offres.</p>
        <button  class="mt-4 text-primary font-medium hover:underline">
          Effacer la recherche
        </button>
      </div>
    </div>

  </div>
</template>

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