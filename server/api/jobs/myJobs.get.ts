export default defineEventHandler(async (event)=>{
    const id = getCookie(event, 'auth_token')
    const userId = Number(id)

    if (!userId || isNaN(userId)) throw createError({
        statusCode: 401,
        statusMessage: 'User id not found, are you logged in?',
    })

    const Jobs = await prisma.job.findMany({
        where: {publisherId:userId },
        orderBy:{
            publishDate:'desc',
        },
        include: {
            _count :{
                select:{applications:true}
            }
        }
    })

    const userJobs = Jobs.map(job=>{
        const { city, region, neighborhood, minSalary, maxSalary, negotiable, _count, ...rest } = job;
        return {
            ...rest,
            location: { city, region, neighborhood },
            salary: {
                min: minSalary,
                max: maxSalary,
                negotiable
            },
            applicantCount: _count.applications
        }
    })
    return {
        userJobs
    }
})