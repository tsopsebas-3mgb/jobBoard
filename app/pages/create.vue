<script setup lang="ts">
import { 
  ArrowLeft, 
  Rocket, 
  Building2, 
  MapPin, 
  Banknote, 
  FileText, 
  Type,
  Briefcase,
  Globe,
  Trash2,
  Send
} from "lucide-vue-next"

const { loading, error, postJob } = usePostJob()

const initialState = {
  title: "",
  description: "",
  employer: "",
  contractType: "CDI",
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

const job = reactive({...initialState})

onMounted(() => {
  const savedJob = localStorage.getItem('postJob')
  if (savedJob) {
    try {
      const parsed = JSON.parse(savedJob)
      Object.assign(job, parsed)
    } catch (e) {
      localStorage.removeItem('postJob')
    }
  }
})

watch(job, (newValue) => {
  localStorage.setItem('postJob', JSON.stringify(newValue))
}, { deep: true })

const clearJobInputs = () => {
  Object.assign(job, JSON.parse(JSON.stringify(initialState)))
  localStorage.removeItem('postJob')
}

const handleSubmit = async () => {
  try {
    await postJob(job)
    clearJobInputs()
    navigateTo('/')
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-24 pt-12">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <NuxtLink to="/" class="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm uppercase tracking-widest mb-4 transition-colors">
            <ArrowLeft class="w-4 h-4" />
            Back to Jobs
          </NuxtLink>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">Post a New Job 🚀</h1>
          <p class="text-slate-500 font-medium mt-2 text-lg">Find the perfect candidate for your growing team.</p>
        </div>
        
        <div class="hidden lg:block">
          <div class="bg-blue-600/5 p-6 rounded-[32px] border border-blue-100 flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Rocket class="w-6 h-6" />
            </div>
            <div>
              <p class="text-blue-900 font-black leading-tight">Fast Hiring</p>
              <p class="text-blue-600/70 text-sm font-bold">Avg. 3 days to hire</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="error" class="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600">
        <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Trash2 class="w-5 h-5" />
        </div>
        <p class="font-bold">{{ error }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Section: Basics -->
        <div class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100">
          <h2 class="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Type class="w-6 h-6 text-blue-500" />
            General Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Job Title</label>
              <div class="relative group">
                <Briefcase class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  v-model="job.title" 
                  type="text" 
                  class="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="e.g. Senior Product Designer"
                  required 
                />
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Company Name</label>
              <div class="relative group">
                <Building2 class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  v-model="job.employer" 
                  type="text" 
                  class="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="e.g. Stripe, Inc."
                  required 
                />
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Industry Domain</label>
              <div class="relative group">
                <Globe class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                <input
                  v-model="job.domain" 
                  type="text" 
                  class="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="e.g. Fintech"
                  required 
                />
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Contract Type</label>
              <div class="relative">
                <select 
                  v-model="job.contractType" 
                  class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="CDI">Full-time (CDI)</option>
                  <option value="CDD">Contract (CDD)</option>
                  <option value="FREELANCE">Freelance</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
                <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 space-y-3">
            <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Location Details</label>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 relative group">
                <MapPin class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  v-model="job.location.city" 
                  type="text" 
                  class="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="City"
                  required 
                />
              </div>
              <div class="flex-1 relative group">
                <Globe class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  v-model="job.location.country" 
                  type="text" 
                  class="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="Country"
                  required 
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Compensation -->
        <div class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-xl font-black text-slate-900 flex items-center gap-3">
              <Banknote class="w-6 h-6 text-emerald-500" />
              Compensation
            </h2>
            
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="job.salary.negotiable" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              <span class="ms-3 text-xs font-black uppercase tracking-widest text-slate-500">Negotiable</span>
            </label>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Minimum (FCFA)</label>
              <input 
                v-model.number="job.salary.min" 
                type="number" 
                class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900"
                placeholder="400000"
              />
            </div>
            <div class="space-y-3">
              <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Maximum (FCFA)</label>
              <input 
                v-model.number="job.salary.max" 
                type="number" 
                class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900"
                placeholder="800000"
              />
            </div>
          </div>
        </div>

        <!-- Section: Description -->
        <div class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100">
          <h2 class="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <FileText class="w-6 h-6 text-amber-500" />
            Job Details
          </h2>

          <div class="space-y-3">
            <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Description</label>
            <textarea 
              v-model="job.description" 
              rows="8" 
              class="w-full px-6 py-6 rounded-[32px] bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900 leading-relaxed placeholder:text-slate-300"
              placeholder="Tell us about the role, responsibilities, and requirements..."
              required
            ></textarea>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
          <button 
            type="button" 
            @click="clearJobInputs" 
            class="flex items-center gap-2 px-8 py-4 rounded-2xl text-slate-400 hover:text-red-500 font-black uppercase tracking-widest text-xs transition-colors"
          >
            <Trash2 class="w-4 h-4" />
            Clear Form
          </button>

          <button
            type="submit"
            :disabled="loading"
            class="w-full md:w-auto flex items-center justify-center gap-3 px-12 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black rounded-[24px] shadow-2xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span v-if="loading">Publishing...</span>
            <template v-else>
              <span>Publish Job Listing</span>
              <Send class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>