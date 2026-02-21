export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const domain = query.domain ? String(query.domain) : undefined;
    const type = query.type ? String(query.type) : undefined;

    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.max(1, parseInt(query.limit as string) || 10);
    const skip = (page - 1) * limit;


    const where = {
        status: 'active',
        AND: [
            domain ? {
                OR: [
                    { title: { contains: domain } },
                    { description: { contains: domain } },
                    { domain: { contains: domain } },
                ]
            } : {},
            type ? { contractType: type } : {}
        ]
    };

    const [total, jobs] = await Promise.all([
        prisma.job.count({ where }),
        prisma.job.findMany({
            where,
            orderBy: { publishDate: 'desc' },
            skip,
            take: limit
        })
    ]);

    return {
        jobs: jobs.map(job => ({
            ...job,
            location: { city: job.city, region: job.region, neighborhood: job.neighborhood },
            salary: { min: job.minSalary, max: job.maxSalary, negotiable: job.negotiable }
        })),
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };
});