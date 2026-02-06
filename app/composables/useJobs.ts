
import type { Job } from "@/server/utils/models/job";
export const useJobs = async () => {

    const page = ref(1);
    const queryDomain = ref('');
    const queryType = ref('');

    const {
        data: jobsData,
        pending: areJobsLoading,
        error: errorFetchingJobs,
        refresh
    } = await useFetch<{ jobs: Job[], meta: any }>('/api/jobs', {
        query: {
            page: page,
            domain: queryDomain,
            type: queryType
        },
        watch: [page, queryDomain, queryType],
        lazy:true
    });

    console.log('useJobs - jobsData:', jobsData.value);

    return {
        jobsData,
        areJobsLoading,
        errorFetchingJobs,
        refresh,

        page,
        queryDomain,
        queryType
    };
}