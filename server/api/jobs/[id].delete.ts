import {prisma} from "@/server/utils/prisma";

export default defineEventHandler(async(event):Promise<any> => {
    const idParams = getRouterParam(event, 'id');
    const id = parseInt(idParams as string);

    if (!id || isNaN(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid job ID'
        });
    }

    try {
        const deletedJob = await prisma.job.delete({
            where: { id }
        });

        return {
            success: true,
            message: 'Job deleted successfully',
            data: deletedJob
        };
    } catch (e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Job not found'
        });
    }
})