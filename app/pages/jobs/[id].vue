<script setup lang="ts">
import {
  Loader,
  ArrowBigLeft,
  MapPin,
  Briefcase,
  Banknote,
  Calendar,
  Bookmark
} from "lucide-vue-next";
import FavMark from "~/components/job/FavMark.vue";

const {successMsg,errorMsg,isFav,addToFav} = useFav()

const route = useRoute();
// On récupère l'ID
const id = route.params.id as string;

// On renomme 'data' en 'job' pour que ce soit plus clair dans le template
const { data: job, pending, error } = await useFetch(`/api/jobs/${id}`);

// Petite fonction pour formater le salaire (ex: 38000 -> 38k)
const formatSalary = (val: number) => {
  return Math.round(val / 1000) + 'k';
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">

    <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium">
      <ArrowBigLeft class="w-5 h-5"/>
      <span>Retour aux offres</span>
    </NuxtLink>

    <div v-if="pending" class="flex justify-center py-20">
      <Loader class="animate-spin text-blue-600 w-10 h-10" />
    </div>

    <div v-else-if="error || !job" class="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
      <p class="font-bold">Oups ! Impossible de charger l'offre.</p>
      <p class="text-sm opacity-80 mt-1">{{ error?.message || "Offre introuvable" }}</p>
    </div>

    <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

      <div class="p-8 border-b border-gray-100 bg-gray-50/50">
        <div class="flex flex-col md:flex-row justify-between items-start gap-6">

          <div class="space-y-3">
            <h1 class="text-3xl font-extrabold text-gray-900 leading-tight">
              {{ job.title }}
            </h1>

            <div class="flex flex-wrap gap-3 text-sm">
              <span class="inline-flex items-center px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-700">
                <Briefcase class="w-3 h-3 mr-1.5"/> {{ job.contractType }}
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full font-bold bg-purple-100 text-purple-700">
                {{ job.domain }}
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
                <MapPin class="w-3 h-3 mr-1.5"/> {{ job.location?.city }}, {{ job.location?.country }}
              </span>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm min-w-[180px]">
            <div class="text-sm text-gray-500 mb-1 flex items-center gap-1">
              <Banknote class="w-4 h-4"/> Salaire annuel
            </div>
            <div class="text-2xl font-bold text-gray-900">
              {{ formatSalary(job.salary.min) }} - {{ formatSalary(job.salary.max) }} <span class="text-lg text-blue-600/15 transition-all duration-300 ">FCFA</span>
            </div>
            <div v-if="job.salary.negotiable" class="text-xs text-green-600 font-bold mt-1 bg-green-50 inline-block px-2 py-0.5 rounded">
              Négociable
            </div>
          </div>

        </div>
      </div>

      <div class="p-8 flex flex-wrap">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar class="w-5 h-5 text-gray-400"/>
          Description du poste
        </h3>
        <p class="text-green-600">{{successMsg}}</p>
        <p class="text-red-600 ">{{errorMsg}}</p>
        <p class="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
          {{ job.description }}
        </p>

        <div class="mt-10 flex items-center justify-between pt-8 border-t border-gray-100 w-full ">
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-transform transform hover:-translate-y-0.5 active:scale-95">
            Postuler maintenant
          </button>
          <FavMark :jobId="job.id" />
        </div>
      </div>

    </div>
  </div>
</template>