import { prisma } from "@/server/utils/prisma";

export default defineEventHandler(async (event) => {

    const id = getCookie(event, 'auth_token');
    const userId = Number(id)
    if (!userId) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Vous devez être connecté pour ajouter un favori'
        });
    }

    const body = await readBody(event);
    const jobId = Number(body.jobId);

    const alreadyExists = await prisma.favourite.findUnique({
        where: {
            userId_jobId:{
                userId: userId,
                jobId: jobId,
            }
        }
    })
    if(alreadyExists) throw createError({
        statusCode: 409,
        statusMessage:'Already a fav'
    })
    const newFav = await prisma.favourite.create({
        data: {
            userId: Number(userId),
            jobId: Number(jobId)
        }
    });

    return {
        message: "Job ajouté aux favoris avec succès",
        favourite: newFav
    };
});