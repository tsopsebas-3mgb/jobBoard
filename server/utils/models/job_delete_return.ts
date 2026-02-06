import {Job} from "@/shared/types/job";

export type JobDeleteReturn = {
    success: boolean
    message: string
    data: Job
}