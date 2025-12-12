import { PrismaClient, Prisma, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // -------------------------
  // 1) Seed Barangays
  // -------------------------
  const barangays: Prisma.BarangayCreateManyInput[] = [
    {
      region: 'Region V (Bicol Region)',
      name: 'San Roque',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 1',
      population: 3200,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.237900'),
      latitude: new Prisma.Decimal('13.584200'),
      elevation: new Prisma.Decimal('12.0'),
    },
    {
      region: 'Region V (Bicol Region)',
      name: 'Sogod',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 2',
      population: 2800,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.241200'),
      latitude: new Prisma.Decimal('13.579800'),
      elevation: new Prisma.Decimal('9.0'),
    },
    {
      region: 'Region V (Bicol Region)',
      name: 'Igang',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 3',
      population: 4100,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.229600'),
      latitude: new Prisma.Decimal('13.590300'),
      elevation: new Prisma.Decimal('18.0'),
    },

    // +7 more barangays (Virac area, sample coords)
    {
      region: 'Region V (Bicol Region)',
      name: 'Calatagan Proper',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 1',
      population: 3600,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.233700'),
      latitude: new Prisma.Decimal('13.589000'),
      elevation: new Prisma.Decimal('14.0'),
    },
    {
      region: 'Region V (Bicol Region)',
      name: 'Rawis',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 2',
      population: 2950,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.246200'),
      latitude: new Prisma.Decimal('13.583900'),
      elevation: new Prisma.Decimal('8.0'),
    },
    {
      region: 'Region V (Bicol Region)',
      name: 'Pajo Baguio',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 3',
      population: 2100,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.252300'),
      latitude: new Prisma.Decimal('13.591200'),
      elevation: new Prisma.Decimal('22.0'),
    },
    {
      region: 'Region V (Bicol Region)',
      name: 'Sto. Cristo',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 1',
      population: 2600,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.240800'),
      latitude: new Prisma.Decimal('13.574700'),
      elevation: new Prisma.Decimal('7.0'),
    },
    {
      region: 'Region V (Bicol Region)',
      name: 'Biga',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 2',
      population: 1900,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.220900'),
      latitude: new Prisma.Decimal('13.586600'),
      elevation: new Prisma.Decimal('16.0'),
    },
    {
      region: 'Region V (Bicol Region)',
      name: 'San Isidro',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 3',
      population: 2400,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.226700'),
      latitude: new Prisma.Decimal('13.579100'),
      elevation: new Prisma.Decimal('11.0'),
    },
    {
      region: 'Region V (Bicol Region)',
      name: 'Bigaa',
      province: 'Catanduanes',
      city: 'Virac',
      purok: 'Purok 1',
      population: 1750,
      location: 'Virac, Catanduanes',
      longitude: new Prisma.Decimal('124.235100'),
      latitude: new Prisma.Decimal('13.595000'),
      elevation: new Prisma.Decimal('20.0'),
    },
  ]

  await prisma.barangay.createMany({ data: barangays })

  // Grab the 3 barangays you want for user assignment (stable even after re-seeding)
  const picked = await prisma.barangay.findMany({
    where: { name: { in: ['San Roque', 'Sogod', 'Igang'] } },
    select: { id: true, name: true },
  })

  const b1 = picked.find((b) => b.name === 'San Roque') ?? null
  const b2 = picked.find((b) => b.name === 'Sogod') ?? null
  const b3 = picked.find((b) => b.name === 'Igang') ?? null

  // -------------------------
  // 2) Seed Evacuation Centers
  // -------------------------
  await prisma.evacuationCenter.createMany({
    data: [
      { name: 'Virac Municipal Gymnasium', capacity: 800, latitude: 13.5845, longitude: 124.2382 },
      { name: 'Virac Central School (Covered Court)', capacity: 600, latitude: 13.5832, longitude: 124.2359 },
      { name: 'Barangay Multi-Purpose Hall', capacity: 250, latitude: 13.5807, longitude: 124.2420 },

      // +7 more evacuation centers (sample)
      { name: 'Virac Town Plaza Covered Court', capacity: 500, latitude: 13.5840, longitude: 124.2405 },
      { name: 'Catanduanes State University Gym', capacity: 900, latitude: 13.5799, longitude: 124.2371 },
      { name: 'Virac North Elementary School', capacity: 400, latitude: 13.5888, longitude: 124.2338 },
      { name: 'Virac South Elementary School', capacity: 350, latitude: 13.5768, longitude: 124.2415 },
      { name: 'Community Center – Rawis', capacity: 220, latitude: 13.5844, longitude: 124.2460 },
      { name: 'Community Center – Calatagan', capacity: 300, latitude: 13.5892, longitude: 124.2334 },
      { name: 'Barangay Health & Evac Hub', capacity: 180, latitude: 13.5910, longitude: 124.2292 },
    ],
  })

  // -------------------------
  // 3) Seed Users (3 separate inserts)
  // -------------------------

  await prisma.user.create({
    data: {
      name: 'MDRRMO Staff 1',
      email: 'halbred8@gmail.com',
      password: 'password',
      status: 'active',
      role: Role.MDRRMO,
      barangayId: b1?.id ?? null,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Barangay Official 1',
      email: 'jovinilavila123@gmail.com',
      password: 'password',
      status: 'active',
      role: Role.BARANGAY_OFFICIAL,
      barangayId: b2?.id ?? null,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Admin 1',
      email: 'test@gmail.com',
      password: 'password',
      status: 'active',
      role: Role.ADMIN,
      barangayId: b3?.id ?? null,
    },
  })

  console.log('✅ Seed completed.')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
