import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { writeFileSync } from 'fs';
import { join } from 'path';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const outputPath = join(process.cwd(), 'Content-For-Review.txt');

async function run() {
  console.log("Fetching all pages from database...");
  const pages = await prisma.page.findMany();
  
  let output = `======================================\n`;
  output += `     WEBSITE CONTENT FOR REVIEW\n`;
  output += `======================================\n\n`;

  for (const page of pages) {
    const slugName = page.is_home_page ? "HOMEPAGE" : page.slug.replace('/', '').toUpperCase() + " PAGE";
    
    output += `\n\n`;
    output += `################################################################################\n`;
    output += `##\n`;
    output += `##   ${slugName}\n`;
    output += `##\n`;
    output += `################################################################################\n\n`;
    
    const content = page.content;
    if (!content || Object.keys(content).length === 0) {
      output += `(No visual content found for this page)\n`;
      continue;
    }

    // Attempt to format objects dynamically
    for (const [sectionKey, sectionValue] of Object.entries(content)) {
      output += `\n[ ${sectionKey.toUpperCase()} ]\n`;
      
      if (Array.isArray(sectionValue)) {
        sectionValue.forEach((item, i) => {
          output += `Item ${i + 1}:\n`;
          if (typeof item === 'object') {
            for (const [k, v] of Object.entries(item)) {
              if (typeof v === 'string' && !k.toLowerCase().includes('image') && !k.toLowerCase().includes('url') && !k.toLowerCase().includes('href')) {
                output += `- ${k}: ${v.replace(/\n/g, ' ')}\n`;
              }
            }
          } else {
             output += `- ${item}\n`;
          }
          output += `\n`;
        });
      } else if (typeof sectionValue === 'object' && sectionValue !== null) {
        for (const [k, v] of Object.entries(sectionValue)) {
          if (Array.isArray(v)) {
            output += `\n${k}:\n`;
            v.forEach((item, i) => {
              if (typeof item === 'object') {
                output += `  Item ${i+1}:\n`;
                for (const [subK, subV] of Object.entries(item)) {
                   if (typeof subV === 'string' && !subK.toLowerCase().includes('image') && !subK.toLowerCase().includes('url') && !subK.toLowerCase().includes('href')) {
                     output += `  - ${subK}: ${subV.replace(/\n/g, ' ')}\n`;
                   }
                }
              } else {
                 output += `  - ${item}\n`;
              }
            });
          } else if (typeof v === 'object' && v !== null) {
             output += `\n${k}:\n`;
             for (const [subK, subV] of Object.entries(v)) {
               if (typeof subV === 'string' && !subK.toLowerCase().includes('image') && !subK.toLowerCase().includes('url') && !subK.toLowerCase().includes('href')) {
                 output += `  - ${subK}: ${subV.replace(/\n/g, ' ')}\n`;
               }
             }
          } else if (typeof v === 'string' && !k.toLowerCase().includes('image') && !k.toLowerCase().includes('url') && !k.toLowerCase().includes('href')) {
             output += `- ${k}: ${v.replace(/\n/g, ' ')}\n`;
          }
        }
      }
    }
  }

  writeFileSync(outputPath, output, 'utf8');
  console.log("Successfully generated Content-For-Review.txt with ALL pages.");
  await prisma.$disconnect();
}

run().catch(e => {
  console.error("Error generating doc:", e);
  prisma.$disconnect();
  process.exit(1);
});
