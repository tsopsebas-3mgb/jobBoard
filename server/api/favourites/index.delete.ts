
export default defineEventHandler(async (event)=>{
    const id = getCookie(event,'auth_token')
    const userId = Number(id)
    if(!userId) throw createError({
        statusCode: 401,
        statusMessage: 'Login first'
    })
    const body = await readBody(event)
    const jobId = Number(body.jobId)
    const deletedFav = await prisma.favourite.delete({
        where: {
            userId_jobId:{
                userId: userId,
                jobId:jobId
            }
        }
    })

    return {
        message:'Job removed from Favourites succesfully',
        favourite:deletedFav,
    }

})