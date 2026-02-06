

export const useFav = async() => {
    const {user} = useAuth()
    const isFav = ref(false)
    const successMsg=ref('')
    const errorMsg=ref('')

    const addToFav = async(jobId:number) => {
        successMsg.value = ''
        errorMsg.value = ''

        try {
            if(!user.value) return errorMsg.value='veuillez dabord vous connecter'
            const data = await $fetch('/api/favourites', {
                method: 'POST',
                body: {jobId}
            })
            if (data && data.favourite) {
                successMsg.value = data.message || 'Ajouté aux favoris'
                isFav.value = true
            }
        } catch (err: any) {
             errorMsg.value = err.data?.statusMessage || 'Une erreur est survenue'
        }
    }
    const {data:favData, pending:favsLoading, error:errorGF } = await useFetch('/api/favourites')
    return {
        addToFav,
        isFav,
        successMsg,
        errorMsg,
        favData,
        favsLoading,
        errorGF
    }
}