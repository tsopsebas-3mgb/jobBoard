export default defineEventHandler(async (event) => {
    const userId = getCookie(event, 'auth_token');
    if (!userId) return [];

    const favourites = await prisma.favourite.findMany({
        where: { userId: Number(userId) },
        include: { job: true }
    });

    return favourites.map(f => ({
        ...f.job,
        location: { city: f.job.city, country: f.job.country },
        salary: { min: f.job.minSalary, max: f.job.maxSalary, negotiable: f.job.negotiable }
    }));
});
