export const dynamic = 'force-dynamic'

import config from '@payload-config'
import { getPayload } from 'payload'
import Banner from '@/components/banners/banner'
import PersonCard from '@/components/person'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default async function Home() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'team-members', limit: 1000 })

  const departments: Record<string, { order: number; people: typeof result.docs }> = {}
  for (const member of result.docs) {
    const dept = member.department
    if (!departments[dept]) {
      departments[dept] = { order: member.departmentOrder ?? 0, people: [] }
    }
    departments[dept].people.push(member)
  }

  const sortedDepts = Object.entries(departments).sort(([, a], [, b]) => a.order - b.order)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-yoi-white dark:bg-yoi-black">
      <main className="z-1 flex-1">
        <Banner
          bg="/heroes/blue_mountains.png"
          title="We're creating oceanic stewards."
          description="Our mission is to educate the public about ocean threats and empower today's youth through advocacy of existing and potential solutions."
        />
        <section className="w-screen items-center justify-between px-5 py-10 pb-20 lg:px-10">
          <h1 className="text-center text-3xl font-medium sm:text-4xl xl:text-4xl/none">
            Meet Our Team
          </h1>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={sortedDepts.map(([dept]) => dept)}
          >
            {sortedDepts.map(([dept, { people }], index) => (
              <AccordionItem value={dept} key={index}>
                <AccordionTrigger className="text-2xl">
                  <div className="pl-4">{dept}</div>
                </AccordionTrigger>
                <AccordionContent className="px-12 lg:px-14">
                  <Carousel>
                    <CarouselContent className="flex">
                      {people.map((person, i) => (
                        <CarouselItem
                          key={i}
                          className="flex space-y-2 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
                        >
                          <PersonCard
                            picture={person.image ?? ''}
                            name={person.name}
                            pronouns={person.pronouns ?? ''}
                            role={person.role}
                            description={person.description ?? ''}
                            className="basis-1/2 space-y-2 lg:basis-1/3 2xl:basis-1/4"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  )
}
