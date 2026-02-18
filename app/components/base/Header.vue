<script setup lang="ts">
import { Briefcase, Bookmark, User2, PlusCircle, Home, Heart, LogOut } from 'lucide-vue-next'
const { user } = useAuth()
const { isMobile } = useMobileDetect()
const {favCount} = useFav()

const userName = computed(() => {
  if (!user.value) return 'Login'
  return user.value.name.split(' ')[0]
})

const isScrolled = ref(false)
if (process.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
}
</script>

<template>
  <header 
    :class="[
      'fixed  top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 py-3',
      isScrolled ? 'md:py-2' : 'md:py-4'
    ]"
  >
    <div class="absolute w-full border  ">

    </div>
    <div 
      :class="[
        'max-w-6xl    mx-auto rounded-3xl transition-all duration-300 border border-white/20',
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-white/40 backdrop-blur-md'
      ]"
    >
      <div class="px-6 flex justify-between h-14 md:h-16 items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div class="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/20">
            <Briefcase class="w-5 h-5 text-white" />
          </div>
          <span class="font-black text-xl tracking-tight text-slate-900 hidden xs:block">
            Job<span class="text-blue-600">Connect</span> 🚀
          </span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="flex items-center gap-2 md:gap-4">
          <NuxtLink 
            to="/favourites" 
            class="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-red-500 transition-colors"
            active-class="text-red-500"
          >
            <div class=" relative">
              <div class="flex bounce left-1/2 -translate-x-1/2 z-1 absolute items-center justify-center w-4 border-2 rounded-xl bg-red-500 text-white border-red-500 font-bold  text-xs  ">12</div>
              <Bookmark class="w-6 h-6 z-2 relative bg-white" />
            </div>
            <span>Favorites</span>
          </NuxtLink>

          <NuxtLink 
            to="/create" 
            class="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <PlusCircle class="w-4 h-4" />
            <span class="hidden md:inline">Post Job</span>
          </NuxtLink>

          <div class="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          <NuxtLink 
            to="/login" 
            class="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <User2 class="w-4 h-4" />
            </div>
            <span class="max-w-[80px] truncate">{{ userName }}</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
  <!-- Spacer to prevent content from going under the fixed header -->
  <div class="h-24 md:h-28"></div>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}
</style>


<style scoped>
  .bounce{
    animation:bounce 1.5s infinite ;
  }
  @keyframes bounce {
    0%, 100% {
      transform: translateY(-110%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: none; /* ou translateY(0) */
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
</style>