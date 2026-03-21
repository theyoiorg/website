import Banner from '@/components/banners/banner'
import ProjectCard from '@/components/project-card'
import projects from './projects.json'

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-yoi-white dark:bg-yoi-black">
      <main className="z-1 flex-1">
        <Banner
          bg="/heroes/cloth_fish.png"
          title="What we're doing"
          description="Our mission is to educate the public about ocean threats and empower today's youth through advocacy of existing and potential solutions."
        />
        <section className="w-full py-12 pt-24 sm:pt-12 md:py-24 lg:py-32">
          <h1 className="-mt-12 pb-12 text-center text-3xl font-bold sm:text-4xl xl:text-4xl/none">
            Our Projects
          </h1>
          <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3">
            {projects.map((e, index) => (
              <ProjectCard
                key={index}
                title={e.title}
                description={e.description}
                image={e.image}
                link={e.link}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
