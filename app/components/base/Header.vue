<script setup lang="ts">
import { 
  Briefcase, 
  Bookmark, 
  User2, 
  PlusCircle, 
  Settings2, 
  Compass,
  LayoutDashboard,
  Bell,
  Menu,
  X
} from 'lucide-vue-next'

const { user } = useAuth()
const { favCount } = useFav()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

if (process.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 15
  })
}

const navLinks = [
  { name: 'Explore', to: '/', icon: Compass },
  { name: 'Favorites', to: '/favourites', icon: Bookmark, badge: true },
  { name: 'Manage', to: '/manage', icon: LayoutDashboard, auth: true },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-4 md:px-6',
      isScrolled ? 'pt-3' : 'pt-6 md:pt-8'
    ]"
  >
    <div class="bg-blue-700/50 h-14 pointer-events-none fixed top-0 backdrop-blur-3xl inset-x-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
    <!-- Main Header Pill -->
    <div 
      :class="[
        'max-w-6xl mx-auto rounded-3xl md:rounded-4xl transition-all duration-500 border relative',
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] py-2' 
          : 'bg-white/80 backdrop-blur-xl border-white shadow-xl shadow-blue-900/5 py-3'
      ]"
    >
      <div class="px-4 md:px-8 flex justify-between items-center relative z-10">
        <!-- Logo Section -->
        <NuxtLink to="/" class="flex items-center gap-3 group shrink-0">
          <div :class="[
            'p-2 md:p-2.5 rounded-xl md:rounded-2xl transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:rotate-3',
            isScrolled ? 'bg-blue-500 shadow-blue-500/20' : 'bg-blue-600 shadow-blue-600/20'
          ]">
            <Briefcase class="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span :class="[
            'font-black text-lg md:text-xl tracking-tighter transition-colors duration-500',
            isScrolled ? 'text-white' : 'text-slate-900'
          ]">
            Job<span class="text-blue-500">Connect</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation (Visible on MD+) -->
        <nav class="hidden md:flex items-center gap-1">
          <template v-for="link in navLinks" :key="link.to">
            <NuxtLink 
              v-if="!link.auth || (link.auth && user)"
              :to="link.to" 
              class="flex items-center gap-2.5 px-4 lg:px-6 py-2.5 rounded-2xl text-[13px] font-black transition-all duration-500 relative group"
              :class="[
                $route.path === link.to 
                  ? (isScrolled ? 'bg-white/10 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20')
                  : (isScrolled ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')
              ]"
            >
              <component :is="link.icon" class="w-4 h-4 transition-transform group-hover:scale-110" />
              <span class="uppercase tracking-widest hidden lg:inline">{{ link.name }}</span>
              
              <!-- Indicator for Active -->
              <div v-if="$route.path === link.to" class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-current rounded-full"></div>

              <!-- Favorites Counter -->
              <div v-if="link.badge && favCount > 0" 
                class="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 bg-red-500 text-white text-[9px] font-black rounded-full border-2"
                :class="isScrolled ? 'border-slate-900' : 'border-white'"
              >
                {{ favCount }}
              </div>
            </NuxtLink>
          </template>
        </nav>

        <!-- Action Hub -->
        <div class="flex items-center gap-2 md:gap-4">
          <NuxtLink 
            to="/create" 
            class="hidden xs:flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-[16px] md:rounded-[20px] text-[12px] md:text-[13px] font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20 group uppercase tracking-widest shrink-0"
          >
            <PlusCircle class="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            <span class="hidden sm:inline">Post Job</span>
          </NuxtLink>

          <div class="h-6 w-px bg-slate-200/20 mx-1 hidden sm:block"></div>

          <!-- Profile / Auth Toggle -->
          <NuxtLink 
            :to="user ? '/profile' : '/login'" 
            class="flex items-center gap-2 p-1 rounded-2xl transition-all group shrink-0"
          >
            <div :class="[
              'w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110',
              isScrolled 
                ? 'bg-white/10 text-white group-hover:bg-blue-500' 
                : 'bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'
            ]">
              <User2 class="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div class="hidden sm:flex flex-col items-start pr-2">
              <span :class="[
                'text-[9px] font-black uppercase tracking-widest opacity-50',
                isScrolled ? 'text-slate-400' : 'text-slate-500'
              ]">
                {{ user ? 'Account' : 'Guest' }}
              </span>
              <span :class="[
                'text-xs font-black truncate max-w-[70px]',
                isScrolled ? 'text-white' : 'text-slate-900'
              ]">
                {{ user ? user.name.split(' ')[0] : 'Sign In' }}
              </span>
            </div>
          </NuxtLink>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="toggleMobileMenu"
            :class="[
              'md:hidden p-2 rounded-xl transition-all',
              isScrolled ? 'text-white bg-white/10' : 'text-slate-900 bg-slate-100'
            ]"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-slate-100/10 mt-2 py-4 px-4 space-y-2">
          <template v-for="link in navLinks" :key="link.to">
            <NuxtLink 
              v-if="!link.auth || (link.auth && user)"
              :to="link.to"
              class="flex items-center justify-between p-4 rounded-2xl transition-all"
              :class="[
                $route.path === link.to
                  ? (isScrolled ? 'bg-white/10 text-white' : 'bg-blue-600 text-white')
                  : (isScrolled ? 'text-slate-400' : 'text-slate-600 bg-slate-50')
              ]"
            >
              <div class="flex items-center gap-3">
                <component :is="link.icon" class="w-5 h-5" />
                <span class="font-black uppercase tracking-widest text-sm">{{ link.name }}</span>
              </div>
              <div v-if="link.badge && favCount > 0" class="px-2 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-full">
                {{ favCount }}
              </div>
            </NuxtLink>
          </template>
          
          <NuxtLink 
            to="/create"
            class="flex items-center gap-3 p-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-600/20"
          >
            <PlusCircle class="w-5 h-5" />
            <span>Post a New Job</span>
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </header>
  <!-- Content Spacer -->
  <div :class="['transition-all duration-500', isScrolled ? 'h-24' : 'h-32']"></div>
</template>
