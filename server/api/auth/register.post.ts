import { prisma } from "@/server/utils/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const alreadyUser = await prisma.user.findFirst({
        where: { email: body.email }
    });

    if (alreadyUser) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Un user avec cet email existe deja'
        });
    }


    const newUser = await prisma.user.create({
        data: {
            name: body.fullName,
            email: body.email,
            password: body.password,
        }
    });


    setCookie(event, 'auth_token', String(newUser.id), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });

    return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
    };
});
