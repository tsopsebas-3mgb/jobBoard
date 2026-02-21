export default defineEventHandler( async (event)=>{

    const id = getCookie(event,'auth_token')
    const userId = Number(id)

    if(!userId || isNaN(userId)) throw createError({
        statusCode:401,
        statusMessage:'Are you logged in?'
    })

    const body = await readBody(event);
    const applicationId = Number(body.applicationId)

    if(!applicationId || isNaN(applicationId)) throw createError(`applicationId ${applicationId} not found`);

    const delApplication = await prisma.application.deleteMany({
        where:{
            id: applicationId,
            userId
        }
    })
    if (delApplication.count === 0) {
        throw createError({
            statusCode: 403, // 403 Forbidden ou 404 Not Found
            statusMessage: 'Application not found or you do not have permission to delete it'
        })
    }
    return {
        success: true,
        message: "Candidature supprimée avec succès"
    }

})