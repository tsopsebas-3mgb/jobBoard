import {location} from "@/shared/types/submodels/location";
import {salary} from "@/shared/types/submodels/salary";

export type JobUpdate = {
    title: string,
    description: string,
    contractType: 'CDI' | 'CDD' | 'FREELANCE',
    domain: string,
    location: location,
    salary: salary,
    status: 'active' | 'inactive'
}