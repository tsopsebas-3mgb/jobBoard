import type {JobUpdate} from "@/server/utils/models/job_update";

export const usePostJob = () => {

    const loading = ref(false);
    const error = ref<string | null>(null);


    const postJob = async (job:any) => {
        loading.value = true;
        error.value = null;
        try {
            return await $fetch('/api/jobs', {
                method: 'POST',
                body: job
            });
        } catch (err) {
            error.value = (err as Error).message;
            console.error(error);
            throw error;

        } finally {
            loading.value = false;
        }

    }
    return {
        loading,
        error,
        postJob
    }
}