<template>
  <div class="flex image items-center justify-center min-h-screen ">
    <div v-if="!user" class="bg-blue-200/50  p-8 rounded-3xl border-double border-5  border-blue-500  w-full max-w-md">
      <h1 class="text-2xl text-blue-950/70 font-bold mb-6 text-center">Connexion</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div v-if="isNewUser">
          <label class="block text-sm font-medium pl-3 text-gray-700">Full Name</label>
          <input v-model="form.fullName" type="text" required class="w-full border p-2 rounded-full px-5 text-white mt-1 backdrop-brightness-70 outline-0">
        </div>

        <div>
          <label class="block text-sm font-medium pl-3 text-gray-700">Email</label>
          <input v-model="form.email" type="email" required class="w-full p-2 rounded-full px-5 text-white mt-1 backdrop-brightness-70 outline-0">
        </div>

        <div>
          <label class="block text-sm pl-3 font-medium text-gray-700">Mot de passe</label>
          <input v-model="form.password" type="password" required class="w-full p-2 rounded-full px-5 text-white mt-1 backdrop-brightness-70 outline-0">
        </div>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

        <button
            type="submit" class="w-4/5 mt-10 block mx-auto rounded-full font-semibold bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
        <div v-if="!isNewUser" class="flex items-center gap-2 justify-center text-sm text-gray-700">
          <span>Pas encore de compte ?</span>
          <NuxtLink
              @click="isNewUser = !isNewUser"
              class="text-blue-600 cursor-pointer font-semibold hover:underline">S'inscrire</NuxtLink>
        </div>
        <div v-else class="flex items-center gap-2 justify-center text-sm text-gray-700">
          <span>Jai deja un compte</span>
          <NuxtLink
              @click="isNewUser = !isNewUser"
              class="text-blue-600 cursor-pointer font-semibold hover:underline">Se connecter</NuxtLink>
        </div>
      </form>
      <div class="mt-30 text-center text-sm text-gray-500 backdrop-blur-2xl gap-1 flex  w-fit mx-auto px-4 py-1 rounded-full bg-white border border-gray-200">
        <a href="mailto:tsopsebas@mail.com" class="font-mono">tsopsebas@gmail.com</a>|<a href="tel:+237655651248" class="font-mono font-bold  ">655 65 12 48</a>
      </div>
    </div>
    <div v-else
      class="felx flex-col items-start justify-center p-8 rounded-3xl border-double border-5  border-blue-500  w-full max-w-md bg-blue-200/50 "
    >
      <div class="flex flex-col items-start justify-center gap-4">
        <div class="flex flex-wrap items-start justify-center">
          <p class="backdrop-blur-xl rounded-full px-2 py-1 text-white font-bold backdrop-brightness-80  ">{{user.name}}</p>
          <p>{{}}</p>
        </div>
        <NuxtLink to="/" class="bg-blue-600 mx-auto hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition">
          Aller à l'accueil
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user,login, createUser } = useAuth()
const router = useRouter()

const isNewUser:Ref<boolean> = ref(false)

const form = reactive({ email: '', password: '', fullName: ''})
const error = ref('')

 const handleLogin = async () => {
  try {
    isNewUser.value? await createUser(form): await login(form)
     user.value && router.push('/')
  } catch (e: any) {
    error.value = e.message
  }

}

</script>
<style scoped>
.image {
  background-image: url('/img.png');
  background-size:50%;
  background-position: center;
}
</style>