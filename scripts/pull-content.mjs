import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { writeFileSync } from 'fs';
import { join } from 'path';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const homeContentPath = join(process.cwd(), 'visual-data', 'HomeContent.json');
const blogContentPath = join(process.cwd(), 'visual-data', 'BlogContent.json');

async function pull() {
  console.log("Pulling content from Prisma Database...");

  const homePage = await prisma.page.findFirst({ where: { is_home_page: true } });
  if (homePage && homePage.content) {
    writeFileSync(homeContentPath, JSON.stringify(homePage.content, null, 2), 'utf8');
    console.log("Successfully updated visual-data/HomeContent.json");
  } else {
    console.log("No Home Page data found.");
  }

  const blogPage = await prisma.page.findFirst({ where: { slug: "/blog" } });
  if (blogPage && blogPage.content) {
    writeFileSync(blogContentPath, JSON.stringify(blogPage.content, null, 2), 'utf8');
    console.log("Successfully updated visual-data/BlogContent.json");
  } else {
    console.log("No Blog Page data found.");
  }
  
  await prisma.$disconnect();
}

pull().catch(e => {
  console.error("Failed to pull:", e);
  prisma.$disconnect();
  process.exit(1);
});
