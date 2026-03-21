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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import pastEvents from './past_events.json'
import { cn } from '@/utilities/ui'

type Event = {
  featured?: boolean
  title: string
  date: string
  location: string
  description: string
  image: string
  link: string
  buttonText?: string
}

export default function EventsPage() {
  const [firstEvent, ...restEvents] = pastEvents as Event[]
  let activeEvent = true
  if (Object.values(firstEvent).every((value) => value === '')) {
    activeEvent = false
  }
  restEvents.forEach((event) => {
    event.date = event.date ?? 'Invalid Date'
    event.location = event.location ?? 'Unknown Location'
    event.description = event.description ?? 'No Description Available'
    event.image = event.image ?? '/images/placeholder.png'
    event.link = event.link ?? 'https://www.yoi.dev'
    event.buttonText = event.buttonText ?? 'Sign Up!'
  })

  return (
    <div className="flex w-full flex-col bg-background">
      <main className="z-1 flex-1">
        <Banner
          bg="/heroes/wave.png"
          size="medium"
          title="YOI Events"
          description="We hold a variety of events throughout the year. Check out what events we're currently running or have run in the past!"
        />
        {activeEvent ? (
          <>
            <h1 className="pt-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Current Events
            </h1>
            {headlineEvent(firstEvent)}
          </>
        ) : null}
        <section
          className={cn('flex w-full flex-col items-center px-12', {
            'pt-12': !activeEvent,
          })}
        >
          <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Past Events
          </h1>
          {pastEventsGallery(restEvents)}
        </section>
      </main>
    </div>
  )
}

function pastEventsGallery(restEvents: Event[]) {
  return (
    <Carousel className="h-auto w-[75vw] py-6 sm:mx-24">
      <CarouselContent>
        {restEvents.map((event, index) => (
          <CarouselItem key={index} className="basis-full lg:basis-1/2">
            <Card>
              <Image
                src={event.image}
                alt={event.title}
                width={1280}
                height={720}
                className="h-48 w-full overflow-hidden rounded-t-lg object-cover"
              />
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-medium">
                  {`This event happened on ${formatDate(event.date)}, ${
                    event.location === 'Online' ? 'Online' : `at the ${event.location}`
                  }.`}
                </CardDescription>
                <br />
                Event Description:
                <br />
                <CardDescription>{event.description}</CardDescription>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

function headlineEvent(firstEvent: Event) {
  return (
    <TextSection>
      <TextSectionContent>
        <TextSectionToast>
          {`Happening ${formatDate(firstEvent.date, false)}, ${
            firstEvent.location === 'Online' ? 'Online' : `at the ${firstEvent.location}`
          }`}
        </TextSectionToast>
        <TextSectionTitle>{firstEvent.title}</TextSectionTitle>
        <TextSectionDescription>{firstEvent.description}</TextSectionDescription>
        <TextSectionButton
          href={
            firstEvent.link.startsWith('http://')
              ? `https://${firstEvent.link.slice(7)}`
              : firstEvent.link
          }
        >
          {firstEvent.buttonText ? firstEvent.buttonText : 'Sign up!'}
        </TextSectionButton>
      </TextSectionContent>
      <TextSectionImage
        src={firstEvent.image}
        alt={firstEvent.title}
        width={1280}
        height={720}
        className="rounded-lg"
      />
    </TextSection>
  )
}

function formatDate(dateString: string, includeYear: boolean = true): string {
  const [month, day, year] = dateString.split('-').map(Number)
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return 'Invalid Date'
  }
  const date = new Date(year, month - 1, day)
  if (includeYear) {
    return isNaN(date.getTime())
      ? 'Date Unavailable'
      : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } else {
    return isNaN(date.getTime())
      ? 'Date Unavailable'
      : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }
}
