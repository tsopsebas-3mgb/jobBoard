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

    const uId = getCookie(event,'auth_token')
    const userId = Number(uId)

    const job = await prisma.job.findUnique({
        where: { id }
    })

    if(!job){
        throw createError({
            statusCode: 404,
            statusMessage: 'Job not found'
        })
    }

    const owned = job.publisherId === userId

    return {
        ...job,
        location: {
            city: job.city,
            region: job.region,
            neighborhood: job.neighborhood
        },
        salary: {
            min: job.minSalary,
            max: job.maxSalary,
            negotiable: job.negotiable
        },
        owned: owned,
    };
})