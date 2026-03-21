import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

async function seed() {
  const payload = await getPayload({ config })

  // ---- Team Members ----
  const execsData = require(path.resolve(__dirname, '../app/(frontend)/about/yoi-execs.json'))
  for (let deptIndex = 0; deptIndex < execsData.length; deptIndex++) {
    const dept = execsData[deptIndex]
    for (const person of dept.people) {
      await payload.create({
        collection: 'team-members',
        data: {
          name: person.name,
          role: person.role,
          pronouns: person.pronouns ?? '',
          department: dept.department,
          departmentOrder: deptIndex,
          image: person.image ?? '',
          description: person.description ?? '',
        },
      })
    }
  }
  console.log('✅ Team members seeded')

  // ---- Projects ----
  const projectsData = require(path.resolve(__dirname, '../app/(frontend)/projects/projects.json'))
  for (let i = 0; i < projectsData.length; i++) {
    const project = projectsData[i]
    await payload.create({
      collection: 'projects',
      data: {
        title: project.title,
        description: project.description ?? '',
        image: project.image ?? '',
        link: project.link ?? '',
        type: project.type ?? 'other',
        status: project.status ?? 'active',
        tags: (project.tags ?? []).map((tag: string) => ({ tag })),
        order: i,
      },
    })
  }
  console.log('✅ Projects seeded')

  // ---- Events ----
  const eventsData = require(path.resolve(__dirname, '../app/(frontend)/join/events/past_events.json'))
  for (const event of eventsData) {
    if (!event.title) continue
    await payload.create({
      collection: 'events',
      data: {
        title: event.title,
        description: event.description ?? '',
        image: event.image ?? '',
        location: event.location ?? '',
        date: event.date ?? '',
        link: event.link ?? '',
        buttonText: event.buttonText ?? '',
      },
    })
  }
  console.log('✅ Events seeded')

  // ---- Opportunities ----
  const opportunitiesData = require(path.resolve(
    __dirname,
    '../app/(frontend)/resources/opportunities/opportunity_db_2.json',
  ))
  for (const opp of opportunitiesData) {
    await payload.create({
      collection: 'opportunities',
      data: {
        title: opp.title,
        posted: opp.posted ?? '',
        deadline: opp.deadline ?? '',
        location: opp.location ?? '',
        description: opp.description ?? '',
        providerName: opp.provider?.name ?? '',
        providerUrl: opp.provider?.url ?? '',
        link: opp.link ?? '',
        tags: (opp.tags ?? []).map((tag: string) => ({ tag })),
        requirements: (opp.requirements ?? []).map((req: string) => ({ requirement: req })),
        open: opp.availability?.open ?? true,
      },
    })
  }
  console.log('✅ Opportunities seeded')

  // ---- Chapters ----
  const chaptersData = require(path.resolve(
    __dirname,
    '../app/(frontend)/join/chapters/chapters.json',
  ))
  for (const feature of chaptersData.features) {
    const props = feature.properties
    const [lon, lat] = feature.geometry.coordinates
    await payload.create({
      collection: 'chapters',
      data: {
        title: props.title,
        description: props.description ?? '',
        instagram: props.instagram ?? '',
        email: props.email ?? '',
        longitude: lon,
        latitude: lat,
      },
    })
  }
  console.log('✅ Chapters seeded')

  // ---- JoinOptions global ----
  const joinOptionsData = require(path.resolve(
    __dirname,
    '../app/(frontend)/join/join-options.json',
  ))
  await payload.updateGlobal({
    slug: 'join-options',
    data: {
      options: joinOptionsData.map((opt: {
        title: string
        description: string
        link: string
        image: string
        imageLeft: boolean
      }) => ({
        title: opt.title,
        description: opt.description,
        link: opt.link,
        image: opt.image,
        imageLeft: opt.imageLeft ?? false,
      })),
    },
  })
  console.log('✅ JoinOptions global seeded')

  console.log('\n🌊 All data seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
