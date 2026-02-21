export const useApplications = () => {
    const { user } = useAuth()
    const errorMsg = ref('')
    const successMsg = ref('')

    const { data: applicationsData, pending: appssLoading, error: errFetchingApps, refresh: refreshApps } = useFetch('/api/applications')

    const { data: recApps, pending: RALoading, error, refresh: refreshRA } = useFetch('/api/applications/received')

    const applyToJob = async (jobId: string | number, coverLetter?: string) => {
        errorMsg.value = ''
        successMsg.value = ''

        if (!user.value) {
            errorMsg.value = 'Veuillez d\'abord vous connecter'
            return
        }

        try {
            const data = await $fetch('/api/applications', {
                method: 'POST',
                body: { jobId, coverLetter }
            })
            successMsg.value = 'Candidature envoyée avec succès'
            await refreshApps()
        } catch (error: any) {
            errorMsg.value = error.data?.statusMessage || error.message
        }
    }

    const removeApplication = async (applicationId: string | number) => {
        errorMsg.value = ''
        successMsg.value = ''

        try {
            const data = await $fetch(`/api/applications`, {
                method: 'DELETE',
                body: { applicationId }
            })
            successMsg.value = data.message
                await refreshApps()
        } catch (error: any) {
            errorMsg.value = error.data?.statusMessage || error.message
        }
    }

    const editApplication = async (applicationId: string | number, status: string) => {
        errorMsg.value = ''
        successMsg.value = ''

        try {
            const data = await $fetch(`/api/applications`, {
                method: 'PATCH',
                body: { applicationId, status }
            })
            successMsg.value = data.message
            await refreshRA()
        } catch (error: any) {
            errorMsg.value = error.data?.statusMessage || error.message
        }
    }

    return {
        errorMsg,
        successMsg,
        applicationsData,
        appssLoading,
        recApps,
        RALoading,
        applyToJob,
        removeApplication,
        editApplication
    }
}