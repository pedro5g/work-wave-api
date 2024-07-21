import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const jobs = [
    {
      jobName: 'Software Engineer',
      companyName: 'Tech Corp',
      description: 'Develop and maintain software applications.',
      status: true,
      shipping: 'whatsapp',
      authorId: '623befb4-fc01-41d4-bfbf-dc1482a3a88b',
    },
    {
      jobName: 'Product Manager',
      companyName: 'Innovate Ltd',
      description: 'Lead product development and strategy.',
      status: true,
      shipping: 'levar',
      authorId: '623befb4-fc01-41d4-bfbf-dc1482a3a88b',
    },
    {
      jobName: 'Data Scientist',
      companyName: 'Data Solutions',
      description: 'Analyze and interpret complex data.',
      status: true,
      shipping: 'whatsapp',
      authorId: '623befb4-fc01-41d4-bfbf-dc1482a3a88b',
    },
  ]

  // Repeat and adjust job entries to make 30
  const additionalJobs = Array.from({ length: 27 }, (_, i) => ({
    jobName: `Job Title ${i + 4}`,
    companyName: ['Tech Corp', 'Innovate Ltd', 'Data Solutions'][i % 3],
    description: `Job description for Job Title ${i + 4}`,
    status: true,
    shipping: i % 2 === 0 ? 'whatsapp' : 'levar',
    authorId:
      i % 2 === 0
        ? '623befb4-fc01-41d4-bfbf-dc1482a3a88b'
        : '623befb4-fc01-41d4-bfbf-dc1482a3a88b',
  }))

  jobs.push(...additionalJobs)

  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
