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
    const uId = getCookie(event, 'auth_token')
    const userId = Number(uId)

    if (!userId || isNaN(userId)) throw createError({
        statusCode: 401,
        statusMessage: 'User id not found, are you logged in?',
    })
    try {
        const deletedJob = await prisma.job.delete({
            where: { id,publisherId:userId },
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