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
import data from '../yoi-execs.json'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-background">
      <main className="z-1 flex-1">
        <Banner
          bg="/heroes/blue_mountains.png"
          title="We're creating oceanic stewards."
          description="Our mission is to educate the public about ocean threats and empower today's youth through advocacy of existing and potential solutions."
        />
        <section className="w-screen items-center justify-between px-5 py-10 pb-20 lg:px-10">
          <h1 className="text-center text-3xl font-bold sm:text-4xl xl:text-4xl/none">
            Meet Our Team
          </h1>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={data.map((department) => department.department)}
          >
            {data.map((department, index) => (
              <AccordionItem value={department.department} key={index}>
                <AccordionTrigger className="text-2xl">
                  <div className="pl-4">{department.department}</div>
                </AccordionTrigger>
                <AccordionContent className="px-12 lg:px-14">
                  <Carousel>
                    <CarouselContent className="flex">
                      {department.people.map((person, i) => (
                        <CarouselItem
                          key={i}
                          className="flex space-y-2 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
                        >
                          <PersonCard
                            picture={person.image}
                            name={person.name}
                            pronouns={person.pronouns}
                            role={person.role}
                            description={person.description}
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
