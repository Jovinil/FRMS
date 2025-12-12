import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const D = (v: string | number) => new Prisma.Decimal(v)

async function main() {
  // ⚠️ Clears existing rows so the seed is repeatable.
  // Remove these if you don't want data wiped each run.
  await prisma.evacuationCenter.deleteMany()
  await prisma.barangay.deleteMany()

  // --- Barangays (sample data; adjust to your real dataset) ---
  const barangays = [
    {
      name: 'San Jose (Poblacion)',
      population: 4200,
      location: 'Virac, Catanduanes',
      longitude: D('124.236900'),
      latitude: D('13.584900'),
      elevation: D('12.5'),
    },
    {
      name: 'San Pablo (Poblacion)',
      population: 3800,
      location: 'Virac, Catanduanes',
      longitude: D('124.239500'),
      latitude: D('13.586400'),
      elevation: D('10.2'),
    },
    {
      name: 'Igang',
      population: 2500,
      location: 'Virac, Catanduanes',
      longitude: D('124.221800'),
      latitude: D('13.565800'),
      elevation: D('18.0'),
    },
    {
      name: 'Balite',
      population: 2100,
      location: 'Virac, Catanduanes',
      longitude: D('124.214900'),
      latitude: D('13.523900'),
      elevation: D('22.0'),
    },
    {
      name: 'Sogod',
      population: 3200,
      location: 'Virac, Catanduanes',
      longitude: D('124.206900'),
      latitude: D('13.545600'),
      elevation: D('15.3'),
    },
    {
      name: 'Santa Cruz',
      population: 2900,
      location: 'Virac, Catanduanes',
      longitude: D('124.194900'),
      latitude: D('13.519000'),
      elevation: D('28.4'),
    },
    {
      name: 'Rawis',
      population: 1600,
      location: 'Virac, Catanduanes',
      longitude: D('124.179900'),
      latitude: D('13.528600'),
      elevation: D('35.0'),
    },
    {
      name: 'Calatagan Proper',
      population: 1900,
      location: 'Virac, Catanduanes',
      longitude: D('124.171500'),
      latitude: D('13.533700'),
      elevation: D('42.1'),
    },
    {
      name: 'San Roque',
      population: 2300,
      location: 'Virac, Catanduanes',
      longitude: D('124.210100'),
      latitude: D('13.559500'),
      elevation: D('14.7'),
    },
    {
      name: 'Palta Small',
      population: 1400,
      location: 'Virac, Catanduanes',
      longitude: D('124.235300'),
      latitude: D('13.582600'),
      elevation: D('9.8'),
    },
  ]

  const createdBarangays = await prisma.barangay.createMany({
    data: barangays,
  })

  // --- Evacuation Centers (not linked; your model has no barangayId yet) ---
  const evacCenters = [
    { name: 'San Jose Barangay Hall Evacuation Center', capacity: 250, latitude: 13.585200, longitude: 124.236600 },
    { name: 'San Pablo Covered Court Evacuation Center', capacity: 350, latitude: 13.586700, longitude: 124.239200 },
    { name: 'Igang Elementary School Evacuation Center', capacity: 300, latitude: 13.566200, longitude: 124.221300 },
    { name: 'Balite Multi-Purpose Hall Evacuation Center', capacity: 200, latitude: 13.524300, longitude: 124.214400 },
    { name: 'Sogod Gymnasium Evacuation Center', capacity: 400, latitude: 13.546000, longitude: 124.206500 },
    { name: 'Santa Cruz Elementary School Evacuation Center', capacity: 280, latitude: 13.519300, longitude: 124.194400 },
  ]

  await prisma.evacuationCenter.createMany({
    data: evacCenters,
  })

  console.log('✅ Seed complete')
  console.log(`- Barangays inserted: ${createdBarangays.count}`)
  console.log(`- Evacuation Centers inserted: ${evacCenters.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
