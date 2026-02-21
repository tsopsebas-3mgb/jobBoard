import { PrismaClient } from '@prisma/client'
import { fakerFR as faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('♻️ Nettoyage de la base de données...')
  await prisma.favourite.deleteMany({})
  await prisma.application.deleteMany({})
  await prisma.job.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('👤 Création d\'un utilisateur Admin...')
  const admin = await prisma.user.create({
    data: {
      email: 'contact@jobboard.fr',
      name: 'Direction RH',
      password: 'password123', // En prod, utilise bcrypt
    }
  })

  const contractTypes = ['CDI', 'CDD', 'FREELANCE', 'INTERNSHIP']
  const domains = ['IT', 'Marketing', 'Vente', 'Finance', 'Design', 'Santé']
  
  const CAMEROON_LOCATIONS = [
    { city: "Douala", region: "Littoral" },
    { city: "Yaoundé", region: "Centre" },
    { city: "Garoua", region: "Nord" },
    { city: "Bamenda", region: "Nord-Ouest" },
    { city: "Maroua", region: "Extrême-Nord" },
    { city: "Bafoussam", region: "Ouest" },
    { city: "Ngaoundéré", region: "Adamaoua" },
    { city: "Bertoua", region: "Est" },
    { city: "Buea", region: "Sud-Ouest" },
    { city: "Ebolowa", region: "Sud" }
  ]

  const CAMEROON_QUARTIERS = [
    "Akwa", "Bonapriso", "Bastos", "Messa", "Essos", "Biyem-Assi", "Ngousso", "Bali", "Bonamoussadi", "Kotto", "Logpom", "Santa Barbara"
  ]

  // Templates pour des descriptions plus réalistes en Français
  const intros = [
    "Nous recherchons un profil passionné pour le poste de",
    "Opportunité exceptionnelle à saisir en tant que",
    "Rejoignez notre équipe en pleine croissance comme",
    "Sous la responsabilité du directeur technique, vous interviendrez en tant que"
  ]

  const totalJobs = 4500
  const batchSize = 150 // Augmenté pour la performance

  console.log(`🚀 Génération de ${totalJobs} jobs...`)

  for (let i = 0; i < totalJobs; i += batchSize) {
    const jobs = Array.from({ length: batchSize }).map(() => {
      const title = faker.person.jobTitle()
      const minSalary = faker.number.int({ min: 30, max: 55 }) * 10000
      const location = faker.helpers.arrayElement(CAMEROON_LOCATIONS)

      return {
        title: title,
        employer: faker.company.name(),
        // Description mixant template FR et lorem
        description: `${faker.helpers.arrayElement(intros)} ${title}. \n\n${faker.lorem.paragraphs(2)}`,
        contractType: faker.helpers.arrayElement(contractTypes),
        domain: faker.helpers.arrayElement(domains),
        city: location.city,
        region: location.region,
        neighborhood: faker.helpers.arrayElement(CAMEROON_QUARTIERS),
        minSalary: minSalary,
        maxSalary: minSalary + faker.number.int({ min: 5, max: 25 }) * 1000,
        negotiable: faker.datatype.boolean(),
        status: 'active',
        publishDate: faker.date.recent({ days: 60 }),
        publisherId: admin.id // ✅ Obligatoire selon ton schéma
      }
    })

    await prisma.job.createMany({
      data: jobs
    })

    // Log propre avec pourcentage
    const progress = Math.round(((i + batchSize) / totalJobs) * 100)
    console.log(`▓ ${progress}% | Insérés : ${i + batchSize} / ${totalJobs}`)
  }

  console.log('✅ Seed terminé avec succès !')
}

main()
    .catch((e) => {
      console.error('❌ Erreur durant le seed:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })