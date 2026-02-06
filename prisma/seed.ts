import { PrismaClient } from '@prisma/client'
import { fakerFR as faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('Suppression des anciens jobs...')
  await prisma.job.deleteMany({})

  console.log('Génération de 4500 jobs...')

  const contractTypes = ['CDI', 'CDD', 'FREELANCE']
  const domains = ['IT', 'Marketing', 'Vente', 'Finance', 'Design', 'Ingénierie', 'Santé']

  const batchSize = 100
  const totalJobs = 4500

  for (let i = 0; i < totalJobs; i += batchSize) {
    const jobs = Array.from({ length: batchSize }).map(() => {
      const minSalary = faker.number.int({ min: 25, max: 60 }) * 1000
      return {
        title: faker.person.jobTitle(),
        employer: faker.company.name(),
        description: faker.lorem.paragraphs(2),
        contractType: faker.helpers.arrayElement(contractTypes),
        domain: faker.helpers.arrayElement(domains),
        city: faker.location.city(),
        country: 'France',
        minSalary: minSalary,
        maxSalary: minSalary + faker.number.int({ min: 5, max: 20 }) * 1000,
        negotiable: faker.datatype.boolean(),
        status: 'active',
        publishDate: faker.date.recent({ days: 30 })
      }
    })

    await prisma.job.createMany({
      data: jobs
    })
    console.log(`Insérés : ${i + batchSize} / ${totalJobs}`)
  }

  console.log('Seed terminé avec succès !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
