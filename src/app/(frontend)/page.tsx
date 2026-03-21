export const dynamic = 'force-dynamic'

import config from '@payload-config'
import { getPayload } from 'payload'
import Banner from '@/components/banners/banner'
import {
  TextSection,
  TextSectionButton,
  TextSectionContent,
  TextSectionDescription,
  TextSectionImage,
  TextSectionTitle,
  TextSectionToast,
} from '@/components/text-section'
import PersonMiniCard from '@/components/person-mini'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Link from 'next/link'

export default async function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex-1 flex-col">
        <Banner
          bg="/heroes/dark_sea.png"
          title={'Learn.\nDiscuss.\nAdvocate.'}
          description="The Youth Oceanic Initiative was founded to educate younger generations about the oceans. Join us and help us educate the next generation of ocean stewards."
          buttonName="Check out our Instagram!"
          buttonLink="https://www.instagram.com/youth_oceanic_initiative/"
        />
        <TextSection>
          <TextSectionImage alt="World Ocean Day 2024 Thumbnail" src="/projects/WOD2024-thumb.png" />
          <TextSectionContent>
            <TextSectionToast>Featured Project</TextSectionToast>
            <TextSectionTitle>World Ocean Day 2024 Zine</TextSectionTitle>
            <TextSectionDescription>
              In celebration of World Ocean Day 2024, YOI organized a competition inviting artists
              and writers to contribute their creations for inclusion in a zine, with the added
              incentive of a prize draw. The initiative garnered over 20 entries globally,
              culminating in the presentation of the zine at YOI&apos;s World Ocean Day 2024 live
              webinar on June 8th, 2024.
            </TextSectionDescription>
            <TextSectionButton href="/projects/WOD2024">Learn More</TextSectionButton>
          </TextSectionContent>
        </TextSection>
        <TeamSection />
        <MainNewsletterSection />
      </main>
      <DrawerNewsletterSection />
    </div>
  )
}

async function TeamSection() {
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
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl">Our Team</h2>
          <p className="mx-auto max-w-[75%] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our team is composed of a diverse group of students all passionate about the ocean.
          </p>
        </div>
        <Accordion
          type="multiple"
          defaultValue={sortedDepts.map(([dept]) => dept)}
        >
          {sortedDepts.map(([dept, { people }], index) => (
            <AccordionItem value={dept} key={index}>
              <AccordionTrigger className="text-2xl">
                <div className="pl-4">{dept}</div>
              </AccordionTrigger>
              <AccordionContent className="max-w-[99vw] justify-center lg:w-[75vw]">
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {people.map((person, i) => (
                      <div key={i} className="flex">
                        <PersonMiniCard
                          name={person.name}
                          pronouns={person.pronouns ?? ''}
                          role={person.role}
                          picture={person.image ?? ''}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button className="mx-auto w-[20em]">
          <Link href="/about/team">Meet Our Full Team</Link>
        </Button>
      </div>
    </section>
  )
}

function MainNewsletterSection() {
  return (
    <section className="w-full border-t py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-medium tracking-tighter md:text-4xl/tight">Stay Connected</h2>
          <p className="mx-auto max-w-[75%] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Sign up for our monthly newsletter, <em>The Maritime Logs</em>, to stay up-to-date on
            our latest initiatives and events.
          </p>
        </div>
        <iframe
          title="Newsletter Signup"
          src="https://docs.google.com/forms/d/e/1FAIpQLSeIC4kudhR1aTVW7c05KNqz4GNrKgTIuOnEDcYz2ILAFt9r5A/viewform?embedded=true"
          width="100%"
          height="640"
          className="width-full sm:width-9/12 mx-auto"
        >
          Loading…
        </iframe>
      </div>
    </section>
  )
}

function DrawerNewsletterSection() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-4 right-4 z-50 sm:hidden" variant="outline">
          <div className="flex content-center items-center gap-2 align-middle">
            Sign up for our newsletter!
            <MailIcon className="h-4 w-4" />
            <span className="sr-only">Open newsletter signup</span>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:hidden">
        <DrawerHeader>
          <DrawerTitle>
            Sign up for <em>The Maritime Logs</em>
          </DrawerTitle>
          <DrawerDescription className="mx-auto w-[85%]">
            Stay up-to-date with our latest news and events with our monthly newsletter.
          </DrawerDescription>
        </DrawerHeader>
        <iframe
          title="Newsletter Signup"
          src="https://docs.google.com/forms/d/e/1FAIpQLSeIC4kudhR1aTVW7c05KNqz4GNrKgTIuOnEDcYz2ILAFt9r5A/viewform?embedded=true"
          width="100%"
          height="340"
          className="width-full sm:width-9/12 mx-auto"
        >
          Loading…
        </iframe>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
