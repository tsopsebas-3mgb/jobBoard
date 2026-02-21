<script setup lang="ts">
import {
  Loader,
  ChevronLeft,
  MapPin,
  Briefcase,
  Banknote,
  Calendar,
  Building2,
  Share2,
  AlertCircle,
    LucideSparkle,
    Send,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    Undo2
} from "lucide-vue-next";
import FavMark from "~/components/job/FavMark.vue";

const route = useRoute();
const id = route.params.id as string;
const { data: job, pending, error } = await useFetch<any>(`/api/jobs/${id}`);

const formatSalary = (val: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(val);
}

const {
  errorMsg,
  successMsg,
  applicationsData,
  appssLoading,
  applyToJob,
  removeApplication
} = useApplications()

const coverLetter = ref('')
const showApplyForm = ref(false)
const applying = ref(false)

const application = computed(() => {
  if(!applicationsData.value || !job.value) return null
  return applicationsData.value.find((app: any) => app.job.id === job.value.id)
})

const handleApply = async () => {
  applying.value = true
  await applyToJob(job.value.id, coverLetter.value)
  applying.value = false
  if(successMsg.value) {
    showApplyForm.value = false
    coverLetter.value = ''
  }
}

const handleWithdraw = async () => {
  if(confirm('Are you sure you want to withdraw your application?')) {
    await removeApplication(application?.value.id)
  }
}

const owned = computed(() => {})
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-20">
    <div class="max-w-5xl mx-auto px-6 pt-8">
      <!-- Top Navigation -->
      <div class="flex justify-between items-center mb-10">
        <NuxtLink
          to="/"
          class="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
        >
          <ChevronLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Explore</span>
        </NuxtLink>

        <div class="flex items-center gap-3">
          <button class="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <Share2 class="w-5 h-5" />
          </button>
          <FavMark v-if="job" :jobId="job.id" />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex flex-col items-center justify-center py-32">
        <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="mt-4 text-slate-500 font-bold">Fetching details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error || !job" class="bg-white p-12 rounded-[40px] shadow-xl shadow-blue-900/5 text-center border border-slate-100">
        <div class="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle class="w-10 h-10" />
        </div>
        <h2 class="text-2xl font-black text-slate-900 mb-2">Job listing not found</h2>
        <p class="text-slate-500 mb-8 max-w-sm mx-auto">This position may have been filled or is no longer available.</p>
        <NuxtLink to="/" class="inline-flex px-8 py-3 bg-slate-900 text-white font-black rounded-2xl">
          Return Home
        </NuxtLink>
      </div>

      <!-- Job Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Left Column: Main Info -->
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-8 md:p-12 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Building2 class="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {{ job.title }}
                </h1>
                <p class="text-lg font-bold text-blue-600">{{ job.employer }}</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-3 mb-12">
              <div class="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl text-xs font-black text-slate-600 uppercase tracking-widest border border-slate-100">
                <Briefcase class="w-3.5 h-3.5 text-blue-500" />
                {{ job.contractType }}
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl text-xs font-black text-slate-600 uppercase tracking-widest border border-slate-100">
                <MapPin class="w-3.5 h-3.5 text-emerald-500" />
                {{ job.location?.neighborhood }}, {{ job.location?.city }} ({{ job.location?.region }})
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl text-xs font-black text-slate-600 uppercase tracking-widest border border-slate-100">
                <Calendar class="w-3.5 h-3.5 text-amber-500" />
                Posted {{ timeAgo(job.publishDate) }}
              </div>
            </div>

            <div class="prose prose-slate max-w-none">
              <h3 class="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                Job Description 📝
              </h3>
              <div class="text-slate-600 leading-loose text-lg whitespace-pre-line space-y-4">
                {{ job.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Stats & CTA -->
        <div class="space-y-6">
          <div class="bg-white p-8 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100">
            <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Compensation</h4>
            <div class="mb-2">
              <span class="text-3xl font-black text-slate-900">{{ formatSalary(job.salary.min) }}</span>
              <span v-if="job.salary.max" class="text-slate-400 text-lg font-bold"> / month</span>
            </div>
            <p v-if="job.salary.negotiable" class="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-xl">
              <LucideSparkle class="w-3 h-3" /> Negotiable
            </p>

            <!-- Status Messages -->
            <div v-if="successMsg" class="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-sm font-bold flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4" />
              {{ successMsg }}
            </div>
            <div v-if="errorMsg" class="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-2">
              <AlertCircle class="w-4 h-4" />
              {{ errorMsg }}
            </div>

            <div class="mt-10 space-y-4">
              <!-- Already Applied State -->
              <div v-if="application" class="space-y-4">
                <div 
                  :class="[
                    'p-6 rounded-3xl border flex flex-col items-center text-center gap-3',
                    application.status === 'accepted' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                    application.status === 'rejected' ? 'bg-red-50 border-red-100 text-red-700' :
                    application.status==='pending'?'bg-amber-50 border-amber-100 text-amber-700':''
                  ]"
                >
                  <div 
                    :class="[
                      'w-12 h-12 rounded-2xl flex items-center justify-center',
                      application.status === 'accepted' ? 'bg-emerald-500 text-white' :
                      application.status === 'rejected' ? 'bg-red-500 text-white' :
                      'bg-amber-500 text-white'
                    ]"
                  >
                    <CheckCircle2 v-if="application.status === 'accepted'" class="w-6 h-6" />
                    <XCircle v-else-if="application.status === 'rejected'" class="w-6 h-6" />
                    <Clock v-else class="w-6 h-6" />
                  </div>
                  <div>
                    <p class="font-black uppercase tracking-widest text-[10px]">Application Status</p>
                    <p class="text-xl font-black capitalize">{{ application.status }}</p>
                  </div>
                </div>

                <button 
                  v-if="application.status === 'pending'"
                  @click="handleWithdraw"
                  class="w-full py-4 bg-white border-2 border-red-50 text-red-500 hover:bg-red-50 font-black rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Undo2 class="w-4 h-4" />
                  Withdraw Application
                </button>
              </div>

              <!-- Application Form -->
              <div v-else-if="showApplyForm" class="space-y-4">
                <div class="space-y-3">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                    <FileText class="w-3 h-3" />
                    Cover Letter (Optional)
                  </label>
                  <textarea 
                    v-model="coverLetter"
                    rows="5"
                    class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-900 text-sm leading-relaxed"
                    placeholder="Briefly explain why you're a good fit..."
                  ></textarea>
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="showApplyForm = false"
                    class="flex-1 py-4 bg-slate-50 text-slate-600 font-black rounded-2xl hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleApply"
                    :disabled="applying"
                    class="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Loader v-if="applying" class="w-4 h-4 animate-spin" />
                    <Send v-else class="w-4 h-4" />
                    {{ applying ? 'Sending...' : 'Submit Application' }}
                  </button>
                </div>
              </div>

              <!-- Initial Apply Button -->
              <button
                v-else
                @click="showApplyForm = true"
                class="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <PlusCircle class="w-5 h-5" />
                Apply for this Position
              </button>

              <button class="w-full py-5 bg-white border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 text-slate-900 font-black rounded-2xl transition-all">
                Send a Message
              </button>
            </div>

            <p class="text-[10px] text-center mt-6 text-slate-400 font-bold uppercase tracking-widest">
              Secured by JobConnect 🔒
            </p>
          </div>

          <div class="bg-indigo-600 p-8 rounded-[40px] text-white overflow-hidden relative group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <h4 class="text-xl font-black mb-2 relative z-10">Safe Job Guarantee</h4>
            <p class="text-indigo-100 text-sm font-medium relative z-10 leading-relaxed">
              We verify every employer to ensure your safety and career growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>