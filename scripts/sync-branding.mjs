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
    
    console.log("Database synced successfully with new HomeContent.json!");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
