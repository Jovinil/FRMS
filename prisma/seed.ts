import { PrismaClient, Prisma, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // -------------------------
  // 1) Seed Barangays
  // -------------------------
  const barangays: Prisma.BarangayCreateManyInput[] = [
    {
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
  ]

  // createMany is fast; if you rerun seed, it may duplicate unless you clear first
  await prisma.barangay.createMany({ data: barangays })

  // Grab created barangays (for IDs)
  const [b1, b2, b3] = await prisma.barangay.findMany({
    orderBy: { createdAt: 'asc' },
    take: 3,
  })

  // -------------------------
  // 2) Seed Evacuation Centers
  // -------------------------
  await prisma.evacuationCenter.createMany({
    data: [
      {
        name: 'Virac Municipal Gymnasium',
        capacity: 800,
        latitude: 13.5845,
        longitude: 124.2382,
      },
      {
        name: 'Virac Central School (Covered Court)',
        capacity: 600,
        latitude: 13.5832,
        longitude: 124.2359,
      },
      {
        name: 'Barangay Multi-Purpose Hall',
        capacity: 250,
        latitude: 13.5807,
        longitude: 124.2420,
      },
    ],
  })

  // -------------------------
  // 3) Seed Users (3 separate inserts)
  // -------------------------.

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
