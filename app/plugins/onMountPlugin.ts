export default defineNuxtPlugin(async (nuxtApp) => {
    const { user } = useAuth()
    const cookie = useCookie('auth_token')

    // On vérifie si on a un cookie et si l'utilisateur n'est pas déjà chargé
    if (cookie.value && !user.value) {
        try {
            // Utilise useRequestFetch pour que Nuxt transmette automatiquement
            // les cookies au serveur lors de l'appel API interne
            const data = await $fetch('/api/auth/user', {
                headers: useRequestHeaders(['cookie']) as any
            })

            user.value = data
            console.log('Utilisateur restauré au refresh:', user.value)
        } catch (e) {
            console.error('Erreur de restauration de session:', e)
            cookie.value = null
            user.value = null
        }
    }
})