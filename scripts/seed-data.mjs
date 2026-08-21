import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// BLOG DATA
const blogContent = {
  featuredPost: {
    id: 'feat-1',
    category: 'Training',
    title: '5 Myths About Hypertrophy You Need to Stop Believing',
    excerpt: 'Are you still training in the "hypertrophy zone" of 8-12 reps exclusively? Our head coach breaks down the latest sports science research on muscle growth and why you might be leaving gains on the table.',
    image: '/Images/Galley/DS9A8021.jpg',
    author: 'Marcus Vance',
    authorImg: '/Images/Galley/DS9A7984.jpg',
    date: 'August 12, 2026',
  },
  recentPosts: [
    {
      id: 1,
      category: 'Nutrition',
      title: 'The Ultimate Guide to Pre-Workout Fueling',
      excerpt: 'Stop eating heavy meals 30 minutes before training. Discover the optimal timing and macro ratios to ensure maximum energy without the sluggishness.',
      image: '/Images/Galley/DS9A8024.jpg',
      author: 'Sarah Jenkins',
      authorImg: '/Images/Galley/DS9A7985.jpg',
      date: 'August 08, 2026',
    },
    {
      id: 2,
      category: 'Recovery',
      title: 'Why Sleep is Your Strongest Performance Enhancer',
      excerpt: 'You break muscle down in the gym, but you build it in bed. A deep dive into sleep architecture and how to optimize your circadian rhythm.',
      image: '/Images/Galley/DS9A8025.jpg',
      author: 'David Chen',
      authorImg: '/Images/Galley/DS9A7986.jpg',
      date: 'August 03, 2026',
    }
  ]
};

// PRICING DATA
const pricingContent = {
  pricingPlans: [
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 49,
      annualPrice: 39,
      features: ['Access to gym equipment', 'Locker room access', '1 Group class per week'],
      isPopular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyPrice: 89,
      annualPrice: 75,
      features: ['Unlimited gym access', 'Unlimited group classes', 'Sauna & Spa access', '1 PT session per month'],
      isPopular: true,
    },
    {
      id: 'elite',
      name: 'Elite',
      monthlyPrice: 149,
      annualPrice: 125,
      features: ['Everything in Pro', '4 PT sessions per month', 'Custom Nutrition plan', 'Priority class booking'],
      isPopular: false,
    },
  ],
  featureComparison: [
    { feature: 'Open Gym Access', basic: true, pro: true, elite: true },
    { feature: 'Locker & Showers', basic: true, pro: true, elite: true },
    { feature: 'Group Classes', basic: '1/week', pro: 'Unlimited', elite: 'Unlimited' }
  ],
  faqs: [
    {
      q: 'Are there any hidden initiation fees?',
      a: 'No! We believe in transparent pricing. The price you see is the price you pay. There are zero initiation, maintenance, or hidden fees.'
    }
  ]
};

// SCHEDULE DATA
const scheduleContent = {
  fullScheduleData: [
    { time: '06:00 AM', class: 'HIIT Burn', trainer: 'Sarah Jenkins', duration: '45 Min', spots: 5 },
    { time: '07:30 AM', class: 'Powerlifting', trainer: 'Marcus Vance', duration: '60 Min', spots: 2 },
    { time: '09:00 AM', class: 'Yoga Flow', trainer: 'David Chen', duration: '60 Min', spots: 12 },
    { time: '12:00 PM', class: 'Lunchtime Express', trainer: 'Sarah Jenkins', duration: '30 Min', spots: 8 }
  ],
  classDescriptions: [
    {
      name: 'HIIT Burn',
      intensity: 'High Intensity',
      description: 'A 45-minute high-intensity interval training session designed to torch calories and build cardiovascular endurance. Expect fast-paced rounds of burpees, sprints, and kettlebell swings.'
    }
  ]
};

// TRAINERS DATA
const trainersContent = {
  detailedTrainers: [
    {
      id: 1,
      name: 'Marcus Vance',
      specialty: 'Strength & Conditioning',
      image: '/Images/Galley/DS9A7984.jpg',
      bio: 'Marcus is a former Olympic weightlifter with over 10 years of experience turning beginners into absolute beasts. His philosophy is rooted in mastering the basic compound movements before progressing to complex lifts.',
      certifications: ['Olympic Weightlifting L2', 'NASM CPT', 'Precision Nutrition L1'],
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      specialty: 'HIIT & Endurance',
      image: '/Images/Galley/DS9A7985.jpg',
      bio: 'Sarah brings an infectious high-energy approach to every session. She specializes in pushing your cardiovascular limits and incinerating fat fast.',
      certifications: ['CrossFit L2', 'ACE Certified Personal Trainer', 'Kettlebell Athletics'],
    }
  ]
};

const pageContentMap = {
  '/blog': blogContent,
  '/pricing': pricingContent,
  '/schedule': scheduleContent,
  '/trainers': trainersContent
};

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const project = await prisma.liveProject.findFirst();
    if (!project) return;

    for (const [slug, content] of Object.entries(pageContentMap)) {
      await prisma.page.updateMany({
        where: { project_id: project.id, slug: slug },
        data: { content: content }
      });
      console.log(`Updated ${slug} with JSON data!`);
    }
    
    console.log("Database seeded successfully with JSON data!");
  } catch (error) {
    console.error("Error connecting or querying:", error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
