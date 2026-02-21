import z from "zod"

const initialState = {
    title: "",
    description: "",
    employer: "",
    contractType: "CDI",
    domain: "",
    salary: {
        min: 0,
        max: 0,
        negotiable: true
    },
    location: {
        city: "",
        region: "",
        neighborhood: ""
    },

}

const jobSchema = z.object({
    title:z.string().min(3,'Title should be atleast 3 letters'),
    description:z.string().min(10,'Description should be atleast 10 characters'),
    employer:z.string().min(3,'Employer should be atleast 3 characters'),
    domain:z.string().min(3,'Domain should be atleast 3 characters'),
    salary:z.object({
        min: z.number().min(0,'Minimum salary should be atleast 0'),
        max:z.number().min(0,'Maximum salary should be atleast 0'),
    }),
    location:z.object({
        city:z.string().min(1,'City is required'),
        region:z.string().min(1,'Region is required'),
        neighborhood:z.string().min(1,'Neighborhood is required'),
    }),
}).refine(data => data.salary.max>= data.salary.min,{
    message:"Maximum Salary should be greater than minimum salary",
    path:["salary","max"]
})

export const useJobForm = (existingJob?:any)=> {

    const job = reactive(existingJob ? JSON.parse(JSON.stringify(existingJob)) : { ...initialState })
    const errors = ref<Record<string, string>>({})
    const getError = (path:string) => errors.value[path]
    const validate = (showError=true)=>{
        const result = jobSchema.safeParse(job)
        if (!result.success) {
            if(showError){
                const newErrors:Record<string, string> = {}
                result.error.issues.forEach(issue=>{
                    const path = issue.path.join('.')
                    newErrors[path]= issue.message
                })
                errors.value=newErrors
            }
            return false
        }
        errors.value={}
        return true
    }

    const checkAndSubmit = () => {
        if (!validate(true)) return null
        if (!existingJob && typeof window !== 'undefined') {
            localStorage.removeItem('postJob')
        }
        return toRaw(job)
    }
    const clearJobInputs = () => {
        Object.assign(job, initialState)
        if (!existingJob && typeof window !== 'undefined') {
            localStorage.removeItem('postJob')
        }
        errors.value = {}
    }

    if(!existingJob) {
        onMounted(() => {
            const savedJob = localStorage.getItem('postJob')
            if (savedJob) {
                try {
                    const parsed = JSON.parse(savedJob)
                    Object.assign(job, parsed)
                } catch (e) {
                    localStorage.removeItem('postJob')
                }
            }
        })

        watch(job, (newValue) => {
            localStorage.setItem('postJob', JSON.stringify(newValue))
        }, { deep: true })
    }

    return {
        job,
        errors,
        getError,
        validate,
        checkAndSubmit,
        clearJobInputs
    }
}