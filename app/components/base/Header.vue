<script setup lang="ts">
import { Briefcase,User2,LayersPlusIcon } from 'lucide-vue-next'
  const {user} = useAuth()
  const { isMobile } = useMobileDetect()
  const userName = computed(() => {
    if (!user.value) return 'login'
    if (isMobile.value && user.value.name.length > 5) {
      return user.value.name.slice(0, 5) + '...'
    }
    return user.value.name
  })
</script>

<template>
  <header class="bg-white border-b w-full border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Briefcase class="w-6 h-6 text-primary" />
          </div>
          <span class="font-bold text-xl tracking-tight text-gray-900">JobBoard</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="flex items-center gap-4">
          <NuxtLink to="/" class="text-sm border-3 rounded-full px-3 border-slate-200 bg-slate-100 hover:bg-blue-50 duration-200 font-medium text-gray-600 hover:text-primary transition-all hidden sm:block">
            Offres
          </NuxtLink>
            <NuxtLink to="/login" class=" flex hover:gap-5 transition-all duration-200 gap-2 px-3 items-center relative rounded-full p-2 bg-primary hover:bg-blue-700 text-white ">
              <User2 />
              <span class="font-semibold px-1 ">{{userName}} </span>
          </NuxtLink>
          <NuxtLink to="/create" class=" flex gap-2 transition-all duration-200 hover:gap-5 px-3 items-center relative rounded-full p-2 bg-primary hover:bg-blue-700 text-white ">
            <LayersPlusIcon class="" />
            <span v-if="!isMobile" >Publier une offre</span>
          </NuxtLink>
          <NuxtLink to="/">

          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>