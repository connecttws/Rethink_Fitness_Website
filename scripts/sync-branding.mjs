import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const project = await prisma.liveProject.findFirst();
    if (!project) {
      console.error("No project found!");
      return;
    }

    const contentPath = join(process.cwd(), 'visual-data', 'HomeContent.json');
    const content = JSON.parse(readFileSync(contentPath, 'utf8'));

    await prisma.page.updateMany({
      where: { project_id: project.id, is_home_page: true },
      data: { content: content }
    });

    // Seed sub-pages if they don't exist
    const subpages = [
      { slug: '/blog', title: 'Blog' },
      { slug: '/pricing', title: 'Pricing' },
      { slug: '/nutrition', title: 'Nutrition' },
      { slug: '/schedule', title: 'Class Schedule' },
      { slug: '/trainers', title: 'Trainers' }
    ];

    for (const page of subpages) {
      const existing = await prisma.page.findFirst({
        where: { project_id: project.id, slug: page.slug }
      });
      if (!existing) {
        await prisma.page.create({
          data: {
            project_id: project.id,
            slug: page.slug,
            title: page.title,
            is_home_page: false,
            content: {}
          }
        });
        console.log(`Created sub-page: ${page.slug}`);
      }
    }
    
    console.log("Database synced successfully with new HomeContent.json and sub-pages!");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
