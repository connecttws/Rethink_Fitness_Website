import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // 1. Get the existing Project
    const project = await prisma.liveProject.findFirst();
    if (!project) {
      console.error("No project found!");
      return;
    }

    const projectId = project.id;
    console.log(`Found project: ${project.name} (${projectId})`);

    // 2. Define the missing pages
    const missingPages = [
      { slug: '/blog', title: 'Blog' },
      { slug: '/nutrition', title: 'Nutrition' },
      { slug: '/pricing', title: 'Pricing' },
      { slug: '/schedule', title: 'Schedule' },
      { slug: '/trainers', title: 'Trainers' }
    ];

    // 3. Insert them if they don't exist
    for (const page of missingPages) {
      const exists = await prisma.page.findFirst({
        where: { project_id: projectId, slug: page.slug }
      });

      if (!exists) {
        await prisma.page.create({
          data: {
            project_id: projectId,
            title: page.title,
            slug: page.slug,
            content: {}, // The Next.js fallback handles the rest!
            is_home_page: false
          }
        });
        console.log(`Created page: ${page.slug}`);
      } else {
        console.log(`Page already exists: ${page.slug}`);
      }
    }
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error connecting or querying:", error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
