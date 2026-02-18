<template>
  <footer class="w-full bg-white border-t border-slate-100 mt-20 pb-12 pt-16">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div class="flex items-center gap-2.5">
          <div class="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <Briefcase class="w-5 h-5 text-white" />
          </div>
          <span class="font-black text-xl tracking-tight text-slate-900">
            Job<span class="text-blue-600">Connect</span> 🚀
          </span>
        </div>
        
        <div class="flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Explore</NuxtLink>
          <NuxtLink to="/create" class="hover:text-blue-600 transition-colors">Post a Job</NuxtLink>
          <NuxtLink to="/login" class="hover:text-blue-600 transition-colors">Account</NuxtLink>
        </div>
      </div>
      
      <div class="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 font-medium">
        <p>&copy; {{ new Date().getFullYear() }} JobConnect Platform. Built with ✨ by Sebastien.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-slate-600 transition-colors">Privacy</a>
          <a href="#" class="hover:text-slate-600 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next'
</script>


<style scoped>

</style>