
export default defineEventHandler(async(event)=>{

    const cookieId = getCookie(event,'auth_token');
    if(!cookieId) return null
    const user = await prisma.user.findUniqueOrThrow({
        where: {id: Number(cookieId)},
        select: {
            id: true,
            email: true,
            name: true,
        }
    }).catch(()=>{
        throw createError({
            statusCode:401,
            statusMessage: 'Session invalide ou utilisateur introuvable'        })
    })
    if (!user) {
        deleteCookie(event, 'auth_token'); // Nettoyage du cookie invalide
        return null;
    }

    return user
})