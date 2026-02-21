import {z} from "zod";
import {prisma} from "@/server/utils/prisma";

const jobUpdateSchema = z.object({
    title: z.string(),
    description: z.string(),
    contractType: z.enum(['CDI', 'CDD', 'FREELANCE']),
    domain: z.string(),
    location: z.object({
        city: z.string(),
        region: z.string(),
        neighborhood: z.string(),
    }),
    salary: z.object({
        min: z.number(),
        max: z.number(),
        negotiable: z.boolean(),
    }),
    status: z.enum(['active', 'inactive']),
}).partial();


export default defineEventHandler(async(event):Promise<any> => {

    const idParams = getRouterParam(event, 'id');
    const id = parseInt(idParams as string);

    if (!id || isNaN(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid job ID'
        });
    }
    const uId = getCookie(event, 'auth_token')
    const userId = Number(uId)

    if (!userId || isNaN(userId)) throw createError({
        statusCode: 401,
        statusMessage: 'User id not found, are you logged in?',
    })
    const body = await readBody(event);
    const parsedBody = jobUpdateSchema.safeParse(body);

    if (!parsedBody.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid job data',
            data: parsedBody.error.format()
        });
    }

    const updates = parsedBody.data;
    
    const data: any = { ...updates };
    if (updates.location) {
        data.city = updates.location.city;
        data.region = updates.location.region;
        data.neighborhood = updates.location.neighborhood;
        delete data.location;
    }
    if (updates.salary) {
        data.minSalary = updates.salary.min;
        data.maxSalary = updates.salary.max;
        data.negotiable = updates.salary.negotiable;
        delete data.salary;
    }

    try {
        const updatedJob = await prisma.job.update({
            where: { id,publisherId:userId },
            data
        });

        return {
            success: true,
            message: 'Job updated successfully',
            data: updatedJob
        };
    } catch (e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Job not found'
        });
    }
})