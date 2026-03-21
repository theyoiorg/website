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
} from '@/components/text-section'

export default async function Home() {
  const payload = await getPayload({ config })
  const joinOptionsGlobal = await payload.findGlobal({ slug: 'join-options' })
  const joinOptions = joinOptionsGlobal.options ?? []

  return (
    <div className="flex w-full flex-col bg-yoi-white dark:bg-yoi-black">
      <main className="z-1 flex-1">
        <Banner
          bg="/heroes/whale.png"
          title="Join Our Mission"
          description="Our mission is to educate the public about ocean threats and empower today's youth through advocacy of existing and potential solutions."
        />
        <section className="w-full pb-12 md:pb-24 lg:pb-32">
          {joinOptions.map((option) => (
            <TextSection key={option.title ?? ''} imageLeft={option.imageLeft ?? false}>
              <TextSectionContent>
                <TextSectionTitle>{option.title ?? ''}</TextSectionTitle>
                <TextSectionDescription>{option.description ?? ''}</TextSectionDescription>
                <TextSectionButton href={option.link ?? ''}>Learn More</TextSectionButton>
              </TextSectionContent>
              <TextSectionImage src={option.image ?? ''} alt={option.title ?? ''} />
            </TextSection>
          ))}
        </section>
      </main>
    </div>
  )
}
