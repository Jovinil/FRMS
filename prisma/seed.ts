// prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('>>> PRISMA SEED STARTED <<<');

  // ---------- 1. Barangays ----------
  const barangays = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.barangay.create({
        data: {
          name: `Barangay ${i + 1}`,
          population: 1000 + i * 100,
          location: `Location ${i + 1}`,
          longitude: new Prisma.Decimal(120 + i * 0.01),
          latitude: new Prisma.Decimal(14 + i * 0.01),
          elevation: new Prisma.Decimal(10 + i),
        },
      })
    )
  );
  console.log('Seeded Barangays:', barangays.length);

  // ---------- 2. EvacuationCenter ----------
  // NOTE: evacueesReportId must reference existing EvacueesReport rows.
  // Here we assume you already have EvacueesReport rows with ids 1..10.
  const evacuationCenters = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.evacuationCenter.create({
        data: {
          name: `Evacuation Center ${i + 1}`,
          address: `Evac Center Address ${i + 1}`,
          capacity: 100 + i * 10,
          barangayId: barangays[i % barangays.length].id,
          evacueesReportId: i + 1, // <-- make sure EvacueesReport with this id exists
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
          userId: `user-auth-${i + 1}`, // simple placeholder string
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
          submittedByAuthId: `user-auth-${i + 1}`, // matches placeholder style above
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
