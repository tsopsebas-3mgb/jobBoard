import { z } from "zod"

const AUSchema = z.object({
    applicationId: z.coerce.number().min(1, 'Application ID is required'),
    status: z.enum(['pending', 'accepted', 'rejected']),
})

export default defineEventHandler(async (event) => {
    const id = getCookie(event, 'auth_token')
    const userId = Number(id)

    if (!userId || isNaN(userId)) throw createError({
        statusCode: 401,
        statusMessage: 'User id not found, are you logged in?',
    })

    const body = await readBody(event)
    const cleanBody = AUSchema.safeParse(body)

    if (!cleanBody.success) throw createError({
        statusCode: 400,
        statusMessage: 'Invalid data',
        data: cleanBody.error.format()
    })

    const { applicationId, status } = cleanBody.data

    const updatedApplication = await prisma.application.updateMany({
        where: {
            id: applicationId,
            job: {
                publisherId: userId,
            }
        },
        data: {
            status: status
        }
    })

    // 4. Vérification du résultat
    if (updatedApplication.count === 0) {
        throw createError({
            statusCode: 403,
            statusMessage: "Application not found or you don't have permission to update it."
        })
    }

    // 5. Retour
    return {
        success: true,
        message: `Le statut de la candidature est maintenant : ${status}`
    }
})