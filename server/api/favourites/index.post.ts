import { prisma } from "@/server/utils/prisma";

export default defineEventHandler(async (event) => {

    const userId = getCookie(event, 'auth_token');
    if (!userId) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Vous devez être connecté pour ajouter un favori'
        });
    }

    const body = await readBody(event);
    const jobId = body.jobId;

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