import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const pagesToPush = [
  { slug: '/', file: 'HomeContent.json', title: 'Home', isHome: true },
  { slug: '/about', file: 'AboutContent.json', title: 'About Us', isHome: false },
  { slug: '/coaching', file: 'CoachingContent.json', title: '1-on-1 Coaching', isHome: false },
  { slug: '/memberships', file: 'MembershipsContent.json', title: 'Memberships', isHome: false },
  { slug: '/blog', file: 'BlogContent.json', title: 'Blog', isHome: false },
  { slug: '/nutrition', file: 'NutritionContent.json', title: 'Nutrition', isHome: false },
  { slug: '/pricing', file: 'PricingContent.json', title: 'Pricing', isHome: false },
  { slug: '/schedule', file: 'ScheduleContent.json', title: 'Schedule', isHome: false },
  { slug: '/trainers', file: 'TrainersContent.json', title: 'Trainers', isHome: false }
];

async function push() {
  console.log("Starting DB push from original visual-data files to Prisma Database...");

  const project = await prisma.liveProject.findFirst();
  if (!project) {
    console.error("No LiveProject found in database!");
    return;
  }

  console.log(`Target project: ${project.name} (${project.id})`);

  for (const pageCfg of pagesToPush) {
    const filePath = join(process.cwd(), 'visual-data', pageCfg.file);
    if (!existsSync(filePath)) {
      console.warn(`File not found: visual-data/${pageCfg.file} (skipping ${pageCfg.slug})`);
      continue;
    }

    const content = JSON.parse(readFileSync(filePath, 'utf8'));

    const existing = await prisma.page.findFirst({
      where: { project_id: project.id, slug: pageCfg.slug }
    });

    if (existing) {
      await prisma.page.update({
        where: { id: existing.id },
        data: {
          content: content,
          title: pageCfg.title,
          is_home_page: pageCfg.isHome,
          updated_at: new Date()
        }
      });
      console.log(`[UPDATED] ${pageCfg.slug} in DB from visual-data/${pageCfg.file}`);
    } else {
      await prisma.page.create({
        data: {
          project_id: project.id,
          slug: pageCfg.slug,
          title: pageCfg.title,
          is_home_page: pageCfg.isHome,
          content: content
        }
      });
      console.log(`[CREATED] ${pageCfg.slug} in DB from visual-data/${pageCfg.file}`);
    }
  }

  console.log("\nDatabase push completed successfully!");
  await prisma.$disconnect();
  await pool.end();
}

push().catch(async (e) => {
  console.error("Failed to push to database:", e);
  await prisma.$disconnect();
  await pool.end();
  process.exit(1);
});

