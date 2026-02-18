<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
    <!-- Background Decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
    </div>

    <div class="relative w-full max-w-[1000px] flex bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <!-- Left Side: Illustration/Branding (Visible on MD+) -->
      <div class="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-12 relative overflow-hidden">
        <!-- Abstract patterns -->
        <div class="absolute inset-0 opacity-10">
          <div class="grid grid-cols-6 gap-4 transform -rotate-12 scale-150">
            <div v-for="i in 24" :key="i" class="h-24 bg-white rounded-2xl"></div>
          </div>
        </div>
        
        <div class="relative z-10 text-white text-center">
          <div class="mb-8 inline-block p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
            <img src="/img.png" alt="JobBoard Logo" class="w-32 h-auto rounded-xl drop-shadow-2xl" />
          </div>
          <h2 class="text-4xl font-extrabold mb-4 tracking-tight">Connect with Opportunity</h2>
          <p class="text-blue-100 text-lg max-w-xs mx-auto leading-relaxed">
            Your gateway to the best tech jobs and the brightest talent in the industry.
          </p>
        </div>
        
        <!-- Bottom decoration -->
        <div class="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <!-- Right Side: Form -->
      <div class="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div class="max-w-sm mx-auto w-full">
          <div v-if="!user">
            <div class="mb-10 text-center md:text-left">
              <h1 class="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                {{ isNewUser ? 'Create Account' : 'Welcome Back' }}
              </h1>
              <p class="text-slate-500 font-medium">
                {{ isNewUser ? 'Start your journey with us today.' : 'Please enter your credentials to continue.' }}
              </p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <div v-if="isNewUser" class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1">Full Name</label>
                <div class="relative">
                  <input
                    v-model="form.fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  >
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1">Email Address</label>
                <div class="relative">
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="alex@example.com"
                    required
                    class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  >
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex justify-between items-center ml-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
                  <a v-if="!isNewUser" href="#" class="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest">Forgot?</a>
                </div>
                <div class="relative">
                  <input
                    v-model="form.password"
                    type="password"
                    placeholder="••••••••"
                    required
                    class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  >
                </div>
              </div>

              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
              >
                <div v-if="error" class="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <p class="text-red-600 text-xs font-bold">{{ error }}</p>
                </div>
              </Transition>

              <button
                type="submit"
                class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transform transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
              >
                <span>{{ isNewUser ? 'Create Account' : 'Sign In' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>

              <div class="text-center pt-2">
                <p class="text-sm text-slate-500 font-medium">
                  {{ isNewUser ? 'Already have an account?' : "Don't have an account yet?" }}
                  <button
                    type="button"
                    @click="isNewUser = !isNewUser"
                    class="text-blue-600 font-bold hover:text-blue-700 transition-colors ml-1 underline underline-offset-4"
                  >
                    {{ isNewUser ? 'Sign In' : 'Register' }}
                  </button>
                </p>
              </div>
            </form>

            <!-- Footer links -->
            <div class="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <a href="mailto:tsopsebas@mail.com" class="hover:text-blue-600 transition-colors">Support</a>
              <a href="tel:+237655651248" class="hover:text-blue-600 transition-colors">Contact</a>
              <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Home</NuxtLink>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <div class="relative inline-block mb-8">
              <div class="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl rotate-12 absolute inset-0 blur-lg opacity-40"></div>
              <div class="w-24 h-24 bg-white rounded-3xl flex items-center justify-center relative border border-slate-100 shadow-sm">
                <span class="text-4xl font-black text-blue-600">{{ user.name?.charAt(0) || 'U' }}</span>
              </div>
              <div class="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <h2 class="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome, {{ user.name?.split(' ')[0] }}!</h2>
            <p class="text-slate-500 font-medium mb-10">You're signed in and ready to go.</p>

            <NuxtLink
              to="/"
              class="inline-flex items-center justify-center px-10 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all hover:translate-y-[-2px] active:translate-y-0"
            >
              Go to Dashboard
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, login, createUser } = useAuth()
const router = useRouter()

const isNewUser = ref(false)
const form = reactive({ email: '', password: '', fullName: '' })
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  try {
    if (isNewUser.value) {
      await createUser(form)
    } else {
      await login(form)
    }
    
    if (user.value) {
      router.push('/')
    }
  } catch (e: any) {
    error.value = e.message
  }
}
</script>

<style scoped>
/* Custom font or extra styling if needed */
</style>
