import Banner from '@/components/banners/banner'

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-yoi-white dark:bg-yoi-black">
      <main className="z-1 flex-1">
        <Banner
          bg="/heroes/boat_on_water.jpg"
          title="Donate to The YOI"
          description="Thank you for your interest in donating! At this time, we are unable to accept donations. Please check back later."
        />
      </main>
    </div>
  )
}
