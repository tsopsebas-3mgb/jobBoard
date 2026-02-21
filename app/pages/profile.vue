<script setup lang="ts">
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  ChevronRight, 
  Briefcase, 
  Heart, 
  ShieldCheck,
  Building2
} from "lucide-vue-next";

const { user, fetchUser } = useAuth();
const { favCount } = useFav();

// Assuming we want a count of jobs posted by the user
const { data: jobsData } = await useFetch<any>('/api/jobs');
const userJobsCount = computed(() => {
  if (!user.value || !jobsData.value?.jobs) return 0;
  return jobsData.value.jobs.filter((j: any) => j.publisherId === user.value?.id).length;
});

const handleLogout = async () => {
  // Clearing auth cookie (Assuming there's a logout endpoint or just client-side clear)
  document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  user.value = null;
  navigateTo('/login');
};

onMounted(async () => {
  if (!user.value) {
    await fetchUser();
    if (!user.value) navigateTo('/login');
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-20 pt-12">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Profile Header -->
      <div class="bg-white p-10 md:p-14 rounded-[50px] shadow-xl shadow-blue-900/5 border border-slate-100 mb-10 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        
        <div class="relative flex flex-col md:flex-row items-center gap-10">
          <div class="relative">
            <div class="w-32 h-32 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[40px] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-blue-600/30">
              {{ user?.name?.charAt(0) || 'U' }}
            </div>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-2xl border-4 border-white flex items-center justify-center">
              <ShieldCheck class="w-5 h-5 text-white" />
            </div>
          </div>

          <div class="text-center md:text-left">
            <h1 class="text-4xl font-black text-slate-900 mb-2 tracking-tight">
              {{ user?.name }}
            </h1>
            <p class="text-lg font-bold text-blue-600 mb-6">{{ user?.email }}</p>
            
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <div class="px-5 py-2.5 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-slate-100 flex items-center gap-2">
                <Calendar class="w-3.5 h-3.5" />
                Joined {{ user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <NuxtLink 
          to="/manage" 
          class="bg-white p-8 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100 group transition-all hover:scale-[1.02] hover:border-blue-500"
        >
          <div class="flex justify-between items-start mb-6">
            <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Briefcase class="w-7 h-7" />
            </div>
            <ChevronRight class="w-6 h-6 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 class="text-3xl font-black text-slate-900 mb-1">{{ userJobsCount }}</h3>
          <p class="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Jobs Posted</p>
        </NuxtLink>

        <NuxtLink 
          to="/favourites" 
          class="bg-white p-8 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100 group transition-all hover:scale-[1.02] hover:border-rose-500"
        >
          <div class="flex justify-between items-start mb-6">
            <div class="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
              <Heart class="w-7 h-7" />
            </div>
            <ChevronRight class="w-6 h-6 text-slate-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 class="text-3xl font-black text-slate-900 mb-1">{{ favCount || 0 }}</h3>
          <p class="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Saved Listings</p>
        </NuxtLink>
      </div>

      <!-- Account Settings / Actions -->
      <div class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100">
        <h2 class="text-xl font-black text-slate-900 mb-8 px-2 flex items-center gap-3">
          <Settings2 class="w-6 h-6 text-slate-400" />
          Account Actions
        </h2>

        <div class="space-y-4">
          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-[28px] transition-all group"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-red-100/50">
                <LogOut class="w-6 h-6" />
              </div>
              <span class="font-black text-lg">Sign Out</span>
            </div>
            <ChevronRight class="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Settings2 } from "lucide-vue-next";
</script>
