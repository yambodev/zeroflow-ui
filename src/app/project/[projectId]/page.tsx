import { ownedProjects, availableProjects } from '@/data/projects'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
  // params is now awaited by Next.js app router
  const project = [...ownedProjects, ...availableProjects].find((p) => p.id === params.projectId)

  if (!project) {
    notFound()
  }

  const percentFunded = Math.min(100, Math.round((project.fundingRaised / project.fundingGoal) * 100))

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-lg p-8 mt-24 flex flex-col items-center">
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
          <Image src={project.thumbnail} alt={project.name} fill className="object-cover" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">{project.name}</h1>
        <span className="text-md uppercase tracking-wide text-pink-400 font-semibold mb-2 block text-center">
          {project.type}
        </span>
        <p className="text-gray-300 mb-4 text-center">{project.description}</p>
        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-pink-400 font-semibold">{project.fundingRaised} $WIRE raised</span>
            <span className="text-gray-300">Goal: {project.fundingGoal} $WIRE</span>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${percentFunded}%` }}
            />
          </div>
          <div className="text-right text-xs text-gray-400 mt-1">{percentFunded}% funded</div>
        </div>
        {/* Back this Project Button */}
        <Button className="w-full bg-pink-500 hover:bg-pink-400 mb-8 font-bold text-lg py-3 rounded-xl shadow-md text-white">
          Back this Project
        </Button>
        {/* Awards Section */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-pink-300">Backing Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.awards.map((award, idx) => (
              <div
                key={idx}
                className="bg-gray-900 rounded-lg p-4 flex flex-col items-center border border-pink-500/30"
              >
                <div className="text-pink-400 font-bold text-lg mb-2">{award.name}</div>
                <div className="text-gray-300 text-sm mb-2 text-center">{award.description}</div>
                <div className="text-xs text-pink-300 font-semibold">Min. Backing: {award.minAmount} $WIRE</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
