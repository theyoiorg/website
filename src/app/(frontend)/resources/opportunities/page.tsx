import Banner from '@/components/banners/banner'
import OpportunityCard, { OpportunityInfo } from '@/components/opportunity'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/range-slider'
import opportunities from './opportunity_db_2.json'

export default function OpportunitiesPage() {
  return (
    <main className="flex w-full flex-col bg-background">
      <section className="z-1 flex-1">
        <Banner
          bg="/projects/ocg-saving-the-ocean-xch7jXAaqqo-unsplash.jpg"
          title="Help Us Make a Difference"
          description="Help us fulfil our mission to educate the public and empower today's youth. Discover opportunities to get involved."
        />
        <div className="mx-auto grid grid-cols-1 gap-8 px-12 py-8 md:py-12 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Search Options</h2>
            <Input
              className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              placeholder="Search opportunities..."
              type="search"
            />
            <Accordion type="multiple">
              <AccordionItem value="category">
                <AccordionTrigger className="flex w-full justify-between">Category</AccordionTrigger>
                <AccordionContent className="mb-4 space-y-2 p-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox id="category-advocacy" />
                    Advocacy
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox id="category-education" />
                    Education
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox id="category-contest" />
                    Contest/ Competition
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox id="category-cleanup" />
                    Clean-up
                  </Label>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="location">
                <AccordionTrigger className="flex w-full justify-between">Location</AccordionTrigger>
                <AccordionContent className="mb-4 space-y-2 p-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox id="location-physical" />
                    In-Person
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox id="location-digital" />
                    Digital
                  </Label>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="age">
                <AccordionTrigger className="flex w-full justify-between">
                  Age Requirement
                </AccordionTrigger>
                <AccordionContent className="mb-2 p-2">
                  <Slider min={0} max={25} minStepsBetweenThumbs={0} step={1} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sort">
                <AccordionTrigger className="flex w-full justify-between">Sort</AccordionTrigger>
                <AccordionContent className="mb-4 p-2">
                  <RadioGroup defaultValue="newest">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="newest" id="r1" />
                      <Label htmlFor="r1">Newest First</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oldest" id="r2" />
                      <Label htmlFor="r2">Oldest First</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="alphabet" id="r3" />
                      <Label htmlFor="r3">Alphabetically</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 2xl:grid-cols-4">
            {(opportunities as unknown as OpportunityInfo[]).map((item, index) => (
              <OpportunityCard key={index} opportunityData={item} className="" />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
