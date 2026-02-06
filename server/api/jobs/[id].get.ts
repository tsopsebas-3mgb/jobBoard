import {prisma} from "@/server/utils/prisma";

export default defineEventHandler(async(event):Promise<any> => {
    const idParam = getRouterParam(event,'id')
    const id = parseInt(idParam as string);

    if(!id || isNaN(id)){
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid job ID'
        })
    }
    
    const job = await prisma.job.findUnique({
        where: { id }
    })

    if(!job){
        throw createError({
            statusCode: 404,
            statusMessage: 'Job not found'
        })
    }

    return {
        ...job,
        location: {
            city: job.city,
            country: job.country
        },
        salary: {
            min: job.minSalary,
            max: job.maxSalary,
            negotiable: job.negotiable
        }
    };
})