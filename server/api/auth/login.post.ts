
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const user = await prisma.user.findFirst({
        where:{
            email: body.email,
        }
    })
    if(!user){
        throw createError({
            statusCode:404,
            statusMessage: "User Not Found, Do you have an account wit this email?",
        })
    }
    if (user?.password !== body.password) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Email ou mot de passe invalide'
        })
    }


    setCookie(event,'auth_token',String(user.id),{
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
    })

    return {
        id: user.id,
        email: user.email,
        name: user.name,
    }

})