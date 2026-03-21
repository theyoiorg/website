import Banner from '@/components/banners/banner'
import 'material-icons/iconfont/round.css'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-yoi-white dark:bg-yoi-black">
      <main className="z-1 flex-1">
        <Banner
          bg="/heroes/shaun-low-v8Un2Roo1Ak-unsplash.jpg"
          size="medium"
          title="For the Ocean."
          description="YOI aims to provide young individuals from all around the globe, regardless of their background, with opportunities to expand their knowledge, gain experience in youth-led advocacy, access resources, and collaborate with others in all fields relating to our ocean."
        />
        <section className="items-center justify-between px-5 py-10 pb-20 lg:px-10">
          <h1 className="text-center text-3xl font-medium sm:text-4xl xl:text-4xl/none">
            Our Principles
          </h1>
          <div className="px-auto flex flex-col gap-20 pt-12 sm:flex-row sm:px-60">
            <MissionStatement IconComponent={SchoolIcon} title="Educate">
              We provide resources and opportunities for young individuals to learn about the ocean.
            </MissionStatement>
            <MissionStatement IconComponent={ForumIcon} title="Discuss">
              We encourage open dialogue about ocean issues and potential solutions.
            </MissionStatement>
            <MissionStatement IconComponent={CampaignIcon} title="Advocate">
              We advocate for change and empower youth to take action.
            </MissionStatement>
          </div>
        </section>
      </main>
    </div>
  )
}

function MissionStatement({
  IconComponent,
  title,
  children,
}: {
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center sm:w-[30%]">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yoi-blue-4">
        <IconComponent className="size-14 fill-yoi-white" />
      </div>
      <h2 className="pt-2 text-2xl font-medium sm:text-3xl">{title}</h2>
      <p className="pt-5 text-lg">{children}</p>
    </div>
  )
}

function SchoolIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960" fill="none">
      <path d="M242-249q-20-11-31-29.5T200-320v-192l-96-53q-11-6-16-15t-5-20q0-11 5-20t16-15l338-184q9-5 18.5-7.5T480-829q10 0 19.5 2.5T518-819l381 208q10 5 15.5 14.5T920-576v256q0 17-11.5 28.5T880-280q-17 0-28.5-11.5T840-320v-236l-80 44v192q0 23-11 41.5T718-249L518-141q-9 5-18.5 7.5T480-131q-10 0-19.5-2.5T442-141L242-249Zm238-203 274-148-274-148-274 148 274 148Zm0 241 200-108v-151l-161 89q-9 5-19 7.5t-20 2.5q-10 0-20-2.5t-19-7.5l-161-89v151l200 108Zm0-241Zm0 121Zm0 0Z" />
    </svg>
  )
}

function ForumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960" fill="none">
      <path d="M280-240q-17 0-28.5-11.5T240-280v-80h520v-360h80q17 0 28.5 11.5T880-680v503q0 27-24.5 37.5T812-148l-92-92H280Zm-40-200-92 92q-19 19-43.5 8.5T80-377v-463q0-17 11.5-28.5T120-880h520q17 0 28.5 11.5T680-840v360q0 17-11.5 28.5T640-440H240Zm360-80v-280H160v280h440Zm-440 0v-280 280Z" />
    </svg>
  )
}

function CampaignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960" fill="none">
      <path d="M840-440h-80q-17 0-28.5-11.5T720-480q0-17 11.5-28.5T760-520h80q17 0 28.5 11.5T880-480q0 17-11.5 28.5T840-440ZM664-288q10-14 26-16t30 8l64 48q14 10 16 26t-8 30q-10 14-26 16t-30-8l-64-48q-14-10-16-26t8-30Zm120-424-64 48q-14 10-30 8t-26-16q-10-14-8-30t16-26l64-48q14-10 30-8t26 16q10 14 8 30t-16 26ZM200-360h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l139-84q20-12 40.5 0t20.5 35v338q0 23-20.5 35t-40.5 0l-139-84h-40v120q0 17-11.5 28.5T240-200q-17 0-28.5-11.5T200-240v-120Zm240-22v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z" />
    </svg>
  )
}
