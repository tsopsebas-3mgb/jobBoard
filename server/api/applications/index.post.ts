export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const jobId = Number(body.jobId)

    if (!jobId || isNaN(jobId)) throw createError({ statusCode: 400, statusMessage: "Job ID Not Found" })

    const id = getCookie(event, 'auth_token')
    const userId = Number(id)

    if (!userId || isNaN(userId)) throw createError({ statusCode: 401, statusMessage: "Are you logged in?" })

    const targetJob = await prisma.job.findUnique({
        where: { id: jobId },
        select: { publisherId: true }
    })

    if (!targetJob) throw createError({ statusCode: 404, statusMessage: "Job not found" })

    if (targetJob.publisherId === userId) {
        throw createError({ statusCode: 403, statusMessage: "You cannot apply to your own job." })
    }

    try {
        return await prisma.application.create({
            data: {
                userId: userId,
                jobId: jobId,
                coverLetter: body.coverLetter || null
            }
        });

    } catch (error: any) {
        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                statusMessage: "You have already applied for this job."
            })
        }

        throw createError({
            statusCode: 500,
            statusMessage: "Something went wrong while applying."
        })
    }
})