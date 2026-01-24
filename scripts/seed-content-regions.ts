/**
 * Content Regions Seed Script
 * 
 * This script seeds initial content regions from website-content.md into the database.
 * 
 * Usage:
 *   npx tsx scripts/seed-content-regions.ts
 * 
 * Environment Variables Required:
 *   - DATABASE_URL: PostgreSQL connection string
 * 
 * Story: 6.3 - Content Region Database Schema
 */

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { CONTENT_REGIONS } from '../lib/constants/content-regions';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
config({ path: envPath });

// Initialize Prisma Client with adapter (required for Prisma 7)
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is missing. Check .env.local');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Initial content data from website-content.md
 * 
 * This content is extracted from the approved website-content.md file.
 * Content is stored as JSON in the database.
 */
const INITIAL_CONTENT: Record<string, { text?: string; images?: never[] }> = {
  // About Us Page Content
  'about-welcome': {
    text: `Welcome to the website of EXCEL Community School (ECS). We hope that the information provided here will be informative enough to help you have a better understanding of our school, its programmes, facilities and staff.

You will also find here information on the achievements of our children and the exciting opportunities we provide. Here at ECS, we strive to make each family feel welcome as we work together to prepare our children for the future.

In line with our Motto, A passion to Excel, we are passionate about creating a learning environment that helps build the confidence of the child and stimulate their young minds to bring out the creativity in them through our rich curriculum.

We invite you to explore our website and enjoy our rich gallery which contains memorable photos of school activities and events. Feel free to leave comments and suggestions in the comments sections provided at the bottom of this page.`,
  },
  'about-vision': {
    text: `Our Vision is to become the preferred school which is welcoming and supportive of every child to explore and develop their individual talent in confidence, whilst upholding the schools values of integrity, tolerance, dignity and respect.`,
  },
  'about-mission': {
    text: `Our mission is to provide high-quality education in a safe and happy learning environment that builds a foundation for life-long learning.`,
  },
  'about-values': {
    text: `Our values are integrity, tolerance, dignity, and respect. These values influence the way of life at Excel Community School as we strive to create a friendly, safe, and happy learning environment for our staff, students, and parents.

We put the students at the center of all that we do because we believe that in the right learning environment, all persons have the capacity develop their talents and inherent potentials.`,
  },
  'about-opening-hours': {
    text: `Monday - Friday: 7.00 - 18.30`,
  },

  // Programmes Page Content
  'programmes-preschool': {
    text: `Excel Community School has adopted the Developmental Approach Program (DAP) for the preschool children aged 1-3 years and the Ghana Education Service (GES) Curriculum is followed in delivering instruction to children in kindergarten through to the Junior High School.

The Developmental Approach Program through interactive and active processes rather than through passive and receptive processes.`,
  },
  'programmes-primary': {
    text: `It is our aim that every child develops their full potential.

The curriculum was developed with this objective in focus. Our planning ensures that students have a wide range of experiences that inform, excite and prepare them for the next stage of their schooling.

Field Trips are organized to expose the students to the practical`,
  },
  'programmes-jhs': {
    text: `The Junior High School(JHS) is from JHS One to JHS Three`,
  },
  'programmes-jhs-subjects': {
    text: `The subjects offered at the JHS are: English Language, Mathematics, Social Studies, Religious and Moral Education (RME), Integrated Science, Home Economics, ICT, Creative Arts, French, Pre – Technical Skills, Ghanaian Language (Twi / Ga)`,
  },

  // Homepage Content
  'home-establishment': {
    text: `EXCEL COMMUNITY SCHOOL was established in September 2011 as a pre-school with forty (40) pupils. Nine years on, the school has an enrollment of over six hundred and fifty-four (654) students between the ages of one (1) and twelve (12). Our children come from diverse racial, cultural and religious backgrounds.`,
  },
  'home-vision': {
    text: `Our Vision is to become the preferred school which is welcoming and supportive of every child to explore and develop their individual talent in confidence, whilst upholding the schools values of integrity, tolerance, dignity and respect.`,
  },
  'home-mission': {
    text: `Our mission is to provide high quality education in a safe and happy learning environment that builds a foundation for life-long learning.`,
  },
  'home-core-values': {
    text: `Dignity and Respect: Through our quality learning and teaching, we seek to develop in each child a sense of achievement and self-esteem.

Integrity: We believe that our students must be truthful at all times. They must speak what they think and do what they speak.

Tolerance: We believe that students must learn to be accommodating and respectful of each other in all situations.`,
  },

  // Resources Pages Content (placeholders - can be updated later)
  'resources-classroom': {
    text: `Our classrooms are designed to provide a comfortable and conducive learning environment for students.`,
  },
  'resources-library': {
    text: `Our library provides students with access to a wide range of books and learning resources.`,
  },
  'resources-ict-lab': {
    text: `Our ICT lab is equipped with modern computers and internet connectivity to support digital learning.`,
  },
  'resources-canteen': {
    text: `Our canteen provides nutritious meals for students throughout the school day.`,
  },
  'resources-sick-bay': {
    text: `Our sick bay is staffed with qualified healthcare personnel to attend to students' health needs.`,
  },
  'resources-transport': {
    text: `We provide safe and reliable transportation services for students.`,
  },

  // Media/Events Content
  'events-content': {
    text: `Our school hosts various events and activities throughout the year, including cultural celebrations, sports events, and educational trips.`,
  },

  // Admissions Content
  'admissions-requirements': {
    text: `Admission to all academic levels is highly competitive. Admission forms can be purchased and filled online or from the administration office.

Completed forms can be emailed or hand-delivered to the office of the school administrator. The following documents must accompany the admission form:

- A copy of student's birth certificate
- A copy of child's immunization card (weighing card)
- A passport sized photo

The school conducts entrance examinations in Mathematics and English language for students seeking admission to Grade 1 through to Junior High School.

For admission into Kindergarten, it is a requirement for the child to be assessed in English and Mathematics. Children seeking admission to the Primary or J.H.S are required to provide their cumulative Record Booklet from their former school.`,
  },
  'admissions-process': {
    text: `The admission process involves submitting the completed admission form along with required documents, followed by an assessment or entrance examination depending on the grade level.`,
  },
};

async function main() {
  console.log('🌱 Seeding content regions...\n');

  let createdCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Seed each content region
  for (const region of CONTENT_REGIONS) {
    try {
      // Check if region already exists
      const existing = await prisma.contentRegion.findUnique({
        where: { regionId: region.id },
      });

      if (existing) {
        console.log(`⏭️  Skipped: ${region.id} (already exists)`);
        skippedCount++;
        continue;
      }

      // Get initial content for this region (or use empty/default)
      const initialContent = INITIAL_CONTENT[region.id] || {
        text: region.type === 'text' ? '' : undefined,
        images: region.type === 'image_gallery' ? [] : undefined,
      };

      // Create content region
      const contentRegion = await prisma.contentRegion.create({
        data: {
          regionId: region.id,
          type: region.type,
          page: region.page,
          position: region.position,
          content: initialContent,
          status: 'published',
          version: 1,
        },
      });

      console.log(`✅ Created: ${region.id} (${region.label})`);
      createdCount++;
    } catch (error) {
      console.error(`❌ Error creating ${region.id}:`, error);
      errorCount++;
    }
  }

  console.log('\n📊 Seeding Summary:');
  console.log(`   ✅ Created: ${createdCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);

  if (errorCount === 0) {
    console.log('\n✅ Content regions seeded successfully!');
  } else {
    console.log('\n⚠️  Some content regions failed to seed. Please check the errors above.');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding content regions:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
