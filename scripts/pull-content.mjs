import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { writeFileSync } from 'fs';
import { join } from 'path';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const pageFileMap = {
  '/': 'HomeContent-copy.json',
  '/blog': 'BlogContent-copy.json',
  '/pricing': 'PricingContent-copy.json',
  '/schedule': 'ScheduleContent-copy.json',
  '/trainers': 'TrainersContent-copy.json',
  '/nutrition': 'NutritionContent-copy.json',
  '/about': 'AboutContent-copy.json',
  '/coaching': 'CoachingContent-copy.json',
  '/memberships': 'MembershipsContent-copy.json'
};

async function pull() {
  console.log("Pulling content from Prisma Database into copy files (backup mode)...");

  const project = await prisma.liveProject.findFirst();
  if (!project) {
    console.error("No LiveProject found in database!");
    return;
  }

  const pages = await prisma.page.findMany({
    where: { project_id: project.id }
  });

  console.log(`Found ${pages.length} pages in DB for project: ${project.name}`);

  for (const page of pages) {
    const defaultFilename = page.slug === '/' 
      ? 'HomeContent-copy.json' 
      : `${page.slug.replace(/^\//, '').charAt(0).toUpperCase() + page.slug.replace(/^\//, '').slice(1)}Content-copy.json`;
    const targetFile = pageFileMap[page.slug] || defaultFilename;
    const targetPath = join(process.cwd(), 'visual-data', targetFile);

    if (page.content && Object.keys(page.content).length > 0) {
      writeFileSync(targetPath, JSON.stringify(page.content, null, 2), 'utf8');
      console.log(`Saved backup of [${page.slug}] -> visual-data/${targetFile}`);
    } else {
      writeFileSync(targetPath, JSON.stringify({}, null, 2), 'utf8');
      console.log(`Saved empty backup of [${page.slug}] -> visual-data/${targetFile}`);
    }
  }

  console.log("\nDatabase content successfully pulled as backup into -copy.json files!");
  console.log("Original files (e.g. HomeContent.json) were NOT modified.\n");
  
  await prisma.$disconnect();
  await pool.end();
}

pull().catch(async (e) => {
  console.error("Failed to pull:", e);
  await prisma.$disconnect();
  await pool.end();
  process.exit(1);
});

