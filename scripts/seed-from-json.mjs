import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const project = await prisma.liveProject.findFirst();
    if (!project) return;

    // Define mapping from slug to JSON file
    const fileMap = {
      '/': 'HomeContent.json',
      '/blog': 'BlogContent.json',
      '/nutrition': 'NutritionContent.json',
      '/pricing': 'PricingContent.json',
      '/schedule': 'ScheduleContent.json',
      '/trainers': 'TrainersContent.json'
    };

    const visualDataDir = path.join(process.cwd(), 'visual-data');

    for (const [slug, filename] of Object.entries(fileMap)) {
      try {
        const filePath = path.join(visualDataDir, filename);
        const fileData = await fs.readFile(filePath, 'utf-8');
        const content = JSON.parse(fileData);

        await prisma.page.updateMany({
          where: { project_id: project.id, slug: slug },
          data: { content: content }
        });
        
        console.log(`Updated ${slug} using ${filename}!`);
      } catch (err) {
        console.error(`Failed to seed ${slug} from ${filename}:`, err.message);
      }
    }
    
    console.log("Database seeded successfully from JSON files!");
  } catch (error) {
    console.error("Error connecting or querying:", error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
