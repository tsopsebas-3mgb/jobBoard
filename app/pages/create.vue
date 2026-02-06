<script setup lang="ts">

const { loading, error, postJob } = usePostJob()


const initialState = {
  title: "",
  description: "",
  employer: "",
  contractType: "",
  domain: "",
  salary: {
    min: 0,
    max: 0,
    negotiable: true
  },
  location: {
    city: "",
    country: ""
  }
}

const job = reactive(initialState)


onMounted(() => {
  const savedJob = localStorage.getItem('postJob')
  if (savedJob) {
    try {
      const parsed = JSON.parse(savedJob)
      // Merge saved data into the reactive object
      Object.assign(job, parsed)
    } catch (e) {
      console.error("Failed to parse saved job draft", e)
      localStorage.removeItem('postJob')
    }
  }
})

// 3. Persist to Local Storage
watch(job, (oldValue,newValue) => {
        if(JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          localStorage.setItem('postJob', JSON.stringify(newValue))
        }
  }, { deep: true })

const clearJobInputs = () => {
  // Reset fields to initial state
  Object.assign(job, JSON.parse(JSON.stringify(initialState)))
  // Clear local storage so it doesn't reappear on reload
  localStorage.removeItem('postJob')
}

const handleSubmit = async () => {
  try {
    await postJob(job)
    navigateTo('/')
    clearJobInputs()

  } catch (e) {
    // Error is already handled by usePostJob's destructured 'error' ref usually,
    // but we catch here to prevent navigation if it fails.
    console.error(e)
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Publier une nouvelle offre</h1>
      <p class="text-gray-500 mt-2">Remplissez les informations ci-dessous pour toucher des milliers de candidats.</p>
    </div>

    <div v-if="error" class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Informations générales</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Titre du poste</label>
            <input v-model="job.title" type="text" class="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary/50 shadow-sm pt-2.5 pb-1.5 px-3 border" placeholder="ex: Senior Frontend Dev" required />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Entreprise</label>
            <input v-model="job.employer" type="text" class="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary/50 shadow-sm pt-2.5 pb-1.5 px-3 border" placeholder="ex: TechCorp" required />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Domaine</label>
            <input v-model="job.domain" type="text" class="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary/50 shadow-sm pt-2.5 pb-1.5 px-3 border" placeholder="ex: Développement Web" required />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Type de contrat</label>
            <select v-model="job.contractType" class="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary/50 shadow-sm pt-2.5 pb-1.5 px-3 border bg-white">
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="FREELANCE">Freelance</option>
              <option value="INTERNSHIP">Stage</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Localisation</label>
            <div class="w-full flex items-center justify-center gap-2 rounded-lg border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 shadow-sm pt-2.5 pb-1.5 px-3 border">
              <input v-model="job.location.city" type="text" placeholder="Ville (ex. Yaoundé)" class="w-full outline-none bg-transparent" required/>
              <span class="text-gray-300">|</span>
              <input v-model="job.location.country" type="text" placeholder="Pays (ex. Cameroun)" class="w-full outline-none bg-transparent" required/>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Rémunération</h2>

        <div class="flex items-center gap-2 mb-4">
          <input v-model="job.salary.negotiable" type="checkbox" id="isNegotiable" class="rounded border-gray-300 text-primary focus:ring-primary" />
          <label for="isNegotiable" class="text-sm text-gray-700">Salaire négociable / Tarif journalier</label>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Minimum</label>
            <input v-model.number="job.salary.min" type="number" class="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary/50 shadow-sm pt-2.5 pb-1.5 px-3 border" placeholder="ex: 45000" />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Maximum</label>
            <input v-model.number="job.salary.max" type="number" class="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary/50 shadow-sm pt-2.5 pb-1.5 px-3 border" placeholder="ex: 60000" />
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Détails du poste</h2>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Description complète</label>
          <textarea v-model="job.description" rows="6" class="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary/50 shadow-sm py-2.5 px-3 border" placeholder="Décrivez le poste, les responsabilités et le profil recherché..." required></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-4 pt-4 border-t border-gray-100">
        <button type="button" @click="clearJobInputs" class="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          Réinitialiser
        </button>

        <button
            type="submit"
            :disabled="loading"
            class="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="loading">Publication...</span>
          <span v-else>Publier l'offre</span>
        </button>
      </div>
    </form>
  </div>
</template>