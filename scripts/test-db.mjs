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
    const projects = await prisma.liveProject.findMany();
    const pages = await prisma.page.findMany();
    console.log(`Connection successful!`);
    console.log(`Found ${projects.length} projects and ${pages.length} pages in the 'website_builder' schema.`);
    
    if (projects.length > 0) {
      console.log('Projects:', projects.map(p => p.name));
    }
  } catch (error) {
    console.error("Error connecting or querying:", error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
