import {z } from "zod";
import {prisma} from "@/server/utils/prisma";

const jobShema = z.object({
    title: z.string().min(3),
    employer: z.string().min(3),
    description: z.string().min(10),
    contractType: z.enum(['CDI','CDD','FREELANCE','INTERNSHIP']),
    domain: z.string().min(3),
    location: z.object({
        city: z.string().min(2),
        region: z.string().min(2),
        neighborhood: z.string().min(2)
    }),
    salary: z.object({
        min: z.number().min(0),
        max: z.number().min(0),
        negotiable: z.boolean()
    }).refine(data => data.max >= data.min, {
        message: 'Max salary must be greater than or equal to min salary',
        path: ['max'],
    })
})
export default defineEventHandler(async(event):Promise<any>=>{
    const body = await readBody(event);
    const parsedBody = jobShema.safeParse(body)
    if(!parsedBody.success){
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid job data',
            data: parsedBody.error.format()
        })
    }
    const cleanBody = parsedBody.data
    const id = getCookie(event,'auth_token')
    const userId = Number(id)

    if (!id || isNaN(userId)) {
        throw createError({
            statusCode: 401, // 401 = Non autorisé
            statusMessage: 'Unauthorized: User not found or invalid token',
        })
    }

    const newJob = await prisma.job.create({
        data: {
            title: cleanBody.title,
            employer: cleanBody.employer,
            description: cleanBody.description,
            contractType: cleanBody.contractType,
            domain: cleanBody.domain,
            city: cleanBody.location.city,
            region: cleanBody.location.region,
            neighborhood: cleanBody.location.neighborhood,
            minSalary: cleanBody.salary.min,
            maxSalary: cleanBody.salary.max,
            negotiable: cleanBody.salary.negotiable,
            publisherId: userId,
            status: 'active'
        }
    })

    return {
        ...newJob,
        location: {
            city: newJob.city,
            region: newJob.region,
            neighborhood: newJob.neighborhood
        },
        salary: {
            min: newJob.minSalary,
            max: newJob.maxSalary,
            negotiable: newJob.negotiable
        }
    }
})