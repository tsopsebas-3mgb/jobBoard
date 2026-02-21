export const useManageJobs = () => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const success = ref<string | null>(null)

    const updateJob = async (id: number, updates: any) => {
        loading.value = true
        error.value = null
        success.value = null
        try {
            const data = await $fetch(`/api/jobs/${id}`, {
                method: 'PATCH',
                body: updates
            })
            success.value = 'Job updated successfully'
            return data
        } catch (err: any) {
            error.value = err.data?.statusMessage || 'Failed to update job'
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteJob = async (id: number) => {
        loading.value = true
        error.value = null
        success.value = null
        try {
            const data = await $fetch(`/api/jobs/${id}`, {
                method: 'DELETE'
            })
            success.value = 'Job deleted successfully'
            return data
        } catch (err: any) {
            error.value = err.data?.statusMessage || 'Failed to delete job'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        updateJob,
        deleteJob,
        loading,
        error,
        success
    }
}
