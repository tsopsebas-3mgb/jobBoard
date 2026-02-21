export default defineEventHandler (async (event)=>{
    const id = getCookie(event, 'auth_token')
    const userId = Number(id)

    if (!userId || isNaN(userId)) throw createError({
        statusCode: 401,
        statusMessage: 'User id not found, are you logged in?',
    })

    return await prisma.application.findMany({
        where: {
            job: {
                publisherId: userId,
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            job: {
                select: {
                    id: true,
                    title: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

})