<script setup lang="ts">
import { 
  Briefcase, 
  MapPin, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Loader,
  AlertCircle,
  Building2,
  Calendar,
  Settings2,
  Banknote,
  Activity,
  Users,
  X,
  User as UserIcon,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  FileText
} from "lucide-vue-next";
import Badge from "~/components/job/Badge.vue";

const { user } = useAuth();
const { deleteJob, loading: actionLoading, error: actionError } = useManageJobs();
const { recApps, RALoading, editApplication } = useApplications();

const formatSalary = (val: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(val);
}

const { data: jobs, pending, refresh } = await useFetch<any>('/api/jobs/myJobs');

// State for viewing applicants
const selectedJobId = ref<number | null>(null);
const showApplicantsModal = ref(false);

const userJobs = computed(() => {
  if (!user.value || !jobs.value?.jobs) return [];
  return jobs.value.jobs.filter((j: any) => j.publisherId === user.value?.id);
});

const getAppCount = (jobId: number) => {
  if (!recApps.value) return 0;
  return recApps.value.filter((app: any) => app.job.id === jobId).length;
};

const jobApplicants = computed(() => {
  if (!selectedJobId.value || !recApps.value) return [];
  return recApps.value.filter((app: any) => app.job.id === selectedJobId.value);
});

const selectedJobTitle = computed(() => {
  return userJobs.value.find(j => j.id === selectedJobId.value)?.title || '';
});

const openApplicants = (id: number) => {
  selectedJobId.value = id;
  showApplicantsModal.value = true;
};

const handleStatusChange = async (appId: number, status: string) => {
  await editApplication(appId, status);
};

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this job listing?')) {
    try {
      await deleteJob(id);
      await refresh();
    } catch (e) {
      console.error(e);
    }
  }
};

onMounted(() => {
  if (!user.value) {
    navigateTo('/login');
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-20 pt-12">
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Settings2 class="w-10 h-10 text-blue-600" />
            Manage Your Listings
          </h1>
          <p class="text-slate-500 font-medium mt-2 text-lg">Edit, delete or view the performance of your job posts.</p>
        </div>
        
        <NuxtLink 
          to="/create" 
          class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Post New Job
        </NuxtLink>
      </div>

      <div v-if="actionError" class="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600">
        <AlertCircle class="w-6 h-6 shrink-0" />
        <p class="font-bold">{{ actionError }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="pending || RALoading" class="flex flex-col items-center justify-center py-32">
        <Loader class="w-12 h-12 text-blue-600 animate-spin" />
        <p class="mt-4 text-slate-500 font-bold">Loading your jobs and applications...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!userJobs.length" class="bg-white p-16 rounded-[40px] shadow-xl shadow-blue-900/5 text-center border border-slate-100">
        <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Briefcase class="w-10 h-10 text-slate-300" />
        </div>
        <h3 class="text-2xl font-black text-slate-900 mb-3">No jobs posted yet</h3>
        <p class="text-slate-500 font-medium mb-10 max-w-sm mx-auto">You haven't posted any job listings. Start hiring today by creating your first post.</p>
        <NuxtLink to="/create" class="inline-flex px-10 py-4 bg-slate-900 text-white font-black rounded-2xl">
          Create First Job
        </NuxtLink>
      </div>

      <!-- Job List -->
      <div v-else class="space-y-6">
        <div 
          v-for="job in userJobs" 
          :key="job.id" 
          class="bg-white p-6 md:p-8 rounded-4xl shadow-sm border border-slate-100 flex flex-col group transition-all hover:shadow-xl hover:shadow-blue-900/5"
        >
          <div class="flex flex-col lg:flex-row lg:items-center gap-6">
            <div class="flex-1 text-center md:text-left">
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h3 class="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {{ job.title }}
                </h3>
                <div class="flex gap-2">
                  <Badge :type="job.contractType" />
                  <span 
                    :class="[
                      'px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest',
                      job.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    ]"
                  >
                    {{ job.status }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm font-bold text-slate-400">
                <div class="flex items-center gap-2">
                  <MapPin class="w-3.5 h-3.5" />
                  <span class="text-slate-600 text-[11px]">{{ job.location.neighborhood }}, {{ job.location.city }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Calendar class="w-3.5 h-3.5" />
                  <span class="text-slate-600 text-[11px]">{{ new Date(job.publishDate).toLocaleDateString() }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Banknote class="w-3.5 h-3.5" />
                  <span class="text-slate-600 text-[11px]">{{ formatSalary(job.minSalary) }} - {{ formatSalary(job.maxSalary) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Users class="w-3.5 h-3.5 text-blue-500" />
                  <span class="text-blue-600 text-[11px]">{{ getAppCount(job.id) }} Applications</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2 border-t lg:border-t-0 pt-4 lg:pt-0">
              <button 
                @click="openApplicants(job.id)"
                class="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-all font-black uppercase tracking-widest text-[10px]"
              >
                <Users class="w-4 h-4" />
                View Applicants ({{ getAppCount(job.id) }})
              </button>
              
              <NuxtLink 
                :to="`/jobs/${job.id}`" 
                class="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all min-w-[90px] justify-center"
              >
                <ExternalLink class="w-4 h-4" />
                <span class="text-[10px] font-black uppercase tracking-widest">View Post</span>
              </NuxtLink>

              <button 
                class="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 hover:text-amber-600 hover:bg-amber-100/50 rounded-xl transition-all min-w-[90px] justify-center"
              >
                <Edit3 class="w-4 h-4" />
                <span class="text-[10px] font-black uppercase tracking-widest">Edit</span>
              </button>

              <button 
                @click="handleDelete(job.id)"
                :disabled="actionLoading"
                class="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50 min-w-[90px] justify-center"
              >
                <Trash2 v-if="!actionLoading" class="w-4 h-4" />
                <Loader v-else class="w-4 h-4 animate-spin" />
                <span class="text-[10px] font-black uppercase tracking-widest">{{ actionLoading ? 'Deleting...' : 'Delete' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Applicants Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showApplicantsModal" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showApplicantsModal = false"></div>
        
        <div class="relative bg-white w-full max-w-3xl max-h-[85vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
          <!-- Modal Header -->
          <div class="p-8 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
            <div>
              <h2 class="text-2xl font-black text-slate-900 tracking-tight">Applicants</h2>
              <p class="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">{{ selectedJobTitle }}</p>
            </div>
            <button @click="showApplicantsModal = false" class="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Modal Content -->
          <div class="flex-1 overflow-y-auto p-8 space-y-6">
            <div v-if="!jobApplicants.length" class="text-center py-12">
              <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users class="w-10 h-10 text-slate-200" />
              </div>
              <p class="text-slate-500 font-black">No one has applied yet.</p>
            </div>

            <div 
              v-for="app in jobApplicants" 
              :key="app.id" 
              class="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-4"
            >
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm font-black text-xl">
                    {{ app.user.name.charAt(0) }}
                  </div>
                  <div>
                    <h4 class="font-black text-slate-900 text-lg">{{ app.user.name }}</h4>
                    <div class="flex items-center gap-3 text-sm text-slate-500 font-bold">
                      <span class="flex items-center gap-1"><Mail class="w-3.5 h-3.5" /> {{ app.user.email }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button 
                    @click="handleStatusChange(app.id, 'accepted')"
                    :class="[
                      'px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2',
                      app.status === 'accepted' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-emerald-100 text-emerald-600 hover:bg-emerald-50'
                    ]"
                  >
                    Accept
                  </button>
                  <button 
                    @click="handleStatusChange(app.id, 'rejected')"
                    :class="[
                      'px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2',
                      app.status === 'rejected' ? 'bg-red-500 border-red-500 text-white' : 'bg-white border-red-100 text-red-600 hover:bg-red-50'
                    ]"
                  >
                    Reject
                  </button>
                </div>
              </div>

              <!-- Cover Letter Section -->
              <div v-if="app.coverLetter" class="bg-white p-5 rounded-2xl border border-slate-100">
                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <FileText class="w-3 h-3" /> Cover Letter
                </p>
                <p class="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{{ app.coverLetter }}</p>
              </div>

              <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                <div :class="[
                  'px-3 py-1 rounded-lg',
                  app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                ]">
                  {{ app.status }}
                </div>
                <div class="text-slate-300">
                  Applied {{ new Date(app.createdAt).toLocaleDateString() }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
