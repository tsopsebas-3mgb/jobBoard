

export const useFav = () => {
    const {user} = useAuth()
    const isFav = ref(false)
    const successMsg=ref('')
    const errorMsg=ref('')

    const {data:favData, pending:favsLoading, error:errorGF, refresh } =  useFetch('/api/favourites')

    const checkAuth=()=>{
        if(!user.value) return errorMsg.value='veuillez dabord vous connecter'
    }
    const addToFav = async(jobId:number) => {
        successMsg.value = ''
        errorMsg.value = ''

        try {
            checkAuth()
            const data = await $fetch('/api/favourites', {
                method: 'POST',
                body: {jobId}
            })
            if (data && data.favourite) {
                successMsg.value = data.message || 'Ajouté aux favoris'
                isFav.value = true
                await refresh()
            }
        } catch (err: any) {
             errorMsg.value = err.data?.statusMessage || 'Une erreur est survenue, reeseyez dans quelques secondes'
        }
    }
    const removeFromFav = async (jobId:number) => {
        successMsg.value = ''
        errorMsg.value = ''

        try {
            checkAuth()
            const data = await $fetch('/api/favourites', {
                method:'DELETE',
                body:{jobId}
            })
            if (data && data.favourite) {
                successMsg.value=data.message || 'REtiree des favoris'
                isFav.value = false
                await refresh()
            }
        }catch(err: any) {
            errorMsg.value=err.data?.statusMessage || 'Une erreur est survenue'
        }
    }
        const favCount = computed(()=>favData.value?.length)

    return {
        addToFav,
        removeFromFav,
        isFav,
        successMsg,
        errorMsg,
        favData,
        favsLoading,
        errorGF,
        favCount
    }
}