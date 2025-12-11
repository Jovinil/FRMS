// prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('>>> PRISMA SEED STARTED <<<');

  // ---------- 1. Barangays (real-ish names) ----------
  const barangaySeedData = [
    {
      name: 'Barangay Sto. Niño',
      population: 18000,
      location: 'Marikina City, Metro Manila',
      longitude: new Prisma.Decimal('121.099'),
      latitude: new Prisma.Decimal('14.637'),
      elevation: new Prisma.Decimal('12'),
    },
    {
      name: 'Barangay Tumana',
      population: 22000,
      location: 'Marikina City, Metro Manila',
      longitude: new Prisma.Decimal('121.095'),
      latitude: new Prisma.Decimal('14.651'),
      elevation: new Prisma.Decimal('10'),
    },
    {
      name: 'Barangay Nangka',
      population: 20000,
      location: 'Marikina City, Metro Manila',
      longitude: new Prisma.Decimal('121.096'),
      latitude: new Prisma.Decimal('14.664'),
      elevation: new Prisma.Decimal('15'),
    },
    {
      name: 'Barangay Malanday',
      population: 21000,
      location: 'Marikina City, Metro Manila',
      longitude: new Prisma.Decimal('121.103'),
      latitude: new Prisma.Decimal('14.667'),
      elevation: new Prisma.Decimal('11'),
    },
    {
      name: 'Barangay San Roque',
      population: 19000,
      location: 'Marikina City, Metro Manila',
      longitude: new Prisma.Decimal('121.092'),
      latitude: new Prisma.Decimal('14.648'),
      elevation: new Prisma.Decimal('13'),
    },
    {
      name: 'Barangay Bagong Silangan',
      population: 40000,
      location: 'Quezon City, Metro Manila',
      longitude: new Prisma.Decimal('121.104'),
      latitude: new Prisma.Decimal('14.701'),
      elevation: new Prisma.Decimal('25'),
    },
    {
      name: 'Barangay Batasan Hills',
      population: 50000,
      location: 'Quezon City, Metro Manila',
      longitude: new Prisma.Decimal('121.079'),
      latitude: new Prisma.Decimal('14.683'),
      elevation: new Prisma.Decimal('30'),
    },
    {
      name: 'Barangay Commonwealth',
      population: 65000,
      location: 'Quezon City, Metro Manila',
      longitude: new Prisma.Decimal('121.071'),
      latitude: new Prisma.Decimal('14.684'),
      elevation: new Prisma.Decimal('28'),
    },
    {
      name: 'Barangay Rosario',
      population: 35000,
      location: 'Pasig City, Metro Manila',
      longitude: new Prisma.Decimal('121.082'),
      latitude: new Prisma.Decimal('14.587'),
      elevation: new Prisma.Decimal('9'),
    },
    {
      name: 'Barangay Bagong Ilog',
      population: 30000,
      location: 'Pasig City, Metro Manila',
      longitude: new Prisma.Decimal('121.071'),
      latitude: new Prisma.Decimal('14.573'),
      elevation: new Prisma.Decimal('8'),
    },
  ];

  const barangays = await Promise.all(
    barangaySeedData.map((b) =>
      prisma.barangay.create({
        data: {
          name: b.name,
          population: b.population,
          location: b.location,
          longitude: b.longitude,
          latitude: b.latitude,
          elevation: b.elevation,
        },
      })
    )
  );

  console.log('Seeded Barangays:', barangays.length);

  // Helper: get barangay id by index (just to be explicit)
  const getBarangayId = (index: number) => barangays[index].id;

  // ---------- 2. EvacuationCenter (real-ish sites) ----------
  // Assumes EvacueesReport with ids 1..10 already exist.
  const evacuationCenterSeedData = [
    {
      name: 'Sto. Niño Elementary School',
      address: 'E. Dela Paz St., Barangay Sto. Niño, Marikina City',
      capacity: 500,
      barangayIndex: 0, // Sto. Niño
      evacueesReportId: 1,
    },
    {
      name: 'Tumana Elementary School',
      address: 'Tumana, Marikina City',
      capacity: 600,
      barangayIndex: 1, // Tumana
      evacueesReportId: 2,
    },
    {
      name: 'Nangka High School Covered Court',
      address: 'Nangka, Marikina City',
      capacity: 450,
      barangayIndex: 2, // Nangka
      evacueesReportId: 3,
    },
    {
      name: 'Malanday Barangay Hall',
      address: 'Malanday, Marikina City',
      capacity: 400,
      barangayIndex: 3, // Malanday
      evacueesReportId: 4,
    },
    {
      name: 'San Roque Elementary School',
      address: 'JP Rizal St., Barangay San Roque, Marikina City',
      capacity: 550,
      barangayIndex: 4, // San Roque
      evacueesReportId: 5,
    },
    {
      name: 'Bagong Silangan Elementary School',
      address: 'Bagong Silangan, Quezon City',
      capacity: 700,
      barangayIndex: 5, // Bagong Silangan
      evacueesReportId: 6,
    },
    {
      name: 'Batasan Hills National High School',
      address: 'IBP Road, Batasan Hills, Quezon City',
      capacity: 800,
      barangayIndex: 6, // Batasan Hills
      evacueesReportId: 7,
    },
    {
      name: 'Commonwealth Elementary School',
      address: 'Commonwealth Ave., Quezon City',
      capacity: 900,
      barangayIndex: 7, // Commonwealth
      evacueesReportId: 8,
    },
    {
      name: 'Rosario Elementary School',
      address: 'Barangay Rosario, Pasig City',
      capacity: 600,
      barangayIndex: 8, // Rosario
      evacueesReportId: 9,
    },
    {
      name: 'Pasig City Sports Center',
      address: 'Caruncho Ave., Barangay Bagong Ilog, Pasig City',
      capacity: 1000,
      barangayIndex: 9, // Bagong Ilog
      evacueesReportId: 10,
    },
  ];

  const evacuationCenters = await Promise.all(
    evacuationCenterSeedData.map((e) =>
      prisma.evacuationCenter.create({
        data: {
          name: e.name,
          address: e.address,
          capacity: e.capacity,
          barangayId: getBarangayId(e.barangayIndex),
          evacueesReportId: e.evacueesReportId,
        },
      })
    )
  );

  console.log('Seeded EvacuationCenters:', evacuationCenters.length);

  // ---------- 3. FirstBarangayFormSubmission ----------
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.firstBarangayFormSubmission.create({
        data: {
          submittedAt: new Date(),
          data: {
            formName: 'FirstBarangayForm',
            submissionNumber: i + 1,
            exampleField: `First form data ${i + 1}`,
          },
        },
      })
    )
  );
  console.log('Seeded FirstBarangayFormSubmission');

  // ---------- 4. SecondBarangayFormSubmission ----------
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.secondBarangayFormSubmission.create({
        data: {
          submittedAt: new Date(),
          data: {
            formName: 'SecondBarangayForm',
            submissionNumber: i + 1,
            exampleField: `Second form data ${i + 1}`,
          },
        },
      })
    )
  );
  console.log('Seeded SecondBarangayFormSubmission');

  // ---------- 5. ThirdBarangayFormSubmission ----------
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.thirdBarangayFormSubmission.create({
        data: {
          submittedAt: new Date(),
          data: {
            formName: 'ThirdBarangayForm',
            submissionNumber: i + 1,
            exampleField: `Third form data ${i + 1}`,
          },
        },
      })
    )
  );
  console.log('Seeded ThirdBarangayFormSubmission');

  // ---------- 6. BarangayFormProgress ----------
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.barangayFormProgress.create({
        data: {
          userId: `user-auth-${i + 1}`, // placeholder string
          latestFormNumber: (i % 3) + 1,
          latestFormSubmissionId: `submission-${i + 1}`,
          latestFormSubmittedAt: new Date(),
        },
      })
    )
  );
  console.log('Seeded BarangayFormProgress');

  // ---------- 7. FirstRdanaSubmission ----------
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.firstRdanaSubmission.create({
        data: {
          submittedAt: new Date(),
          submittedByAuthId: `user-auth-${i + 1}`, // placeholder
          profileMission: {
            missionId: i + 1,
            description: `Mission description ${i + 1}`,
          },
          initialImpact: {
            damageLevel: 'medium',
            householdsAffected: 50 + i,
          },
          healthNutrition: {
            injuries: 5 + i,
            nutritionStatus: 'stable',
          },
          accessibilityPower: {
            roadsAccessible: i % 2 === 0,
            powerStatus: 'intermittent',
          },
          communicationsEvac: {
            networkStatus: 'limited',
            evacCentersOpen: i + 1,
          },
          foodWaterSanitation: {
            foodSupplyDays: 3 + i,
            waterSupplyDays: 2 + i,
          },
          lawOrderShelter: {
            securityIncidents: i,
            sheltersOpen: i + 2,
          },
          livelihoodEngagementOverall: {
            livelihoodsAffected: 10 + i,
            remarks: 'Sample livelihood info',
          },
          protectionEducation: {
            schoolsDamaged: i,
            childrenAffected: 20 + i,
          },
          reliefSrr: {
            reliefDelivered: true,
            reliefDetails: `Relief batch ${i + 1}`,
          },
          submittedBy: {
            name: `Reporter ${i + 1}`,
            role: 'Enumerator',
          },
        },
      })
    )
  );
  console.log('Seeded FirstRdanaSubmission');

  console.log('>>> PRISMA SEED DONE <<<');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
