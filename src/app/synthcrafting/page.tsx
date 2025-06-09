'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ownedProjects, availableProjects } from '@/data/projects'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function SynthCrafting() {
  const [search, setSearch] = useState('')
  const filteredProjects = availableProjects.filter((project) =>
    (project.name + ' ' + project.description).toLowerCase().includes(search.toLowerCase()),
  )
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    function handleMouseMove(e: MouseEvent) {
      const cards = Array.from(grid.querySelectorAll('.synth-card'))
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          let xRotation = (y / rect.height - 0.5) * 20
          let yRotation = (x / rect.width - 0.5) * 20
          xRotation = Math.max(-5, Math.min(5, xRotation))
          yRotation = Math.max(-5, Math.min(5, yRotation))
          card.style.transition = 'transform 0.2s ease-out'
          card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.04)`
        } else {
          card.style.transition = 'transform 0.2s ease-out'
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
        }
      })
    }
    function handleMouseLeave() {
      const cards = Array.from(grid.querySelectorAll('.synth-card'))
      cards.forEach((card) => {
        card.style.transition = 'transform 0.2s ease-out'
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      })
    }
    grid.addEventListener('mousemove', handleMouseMove)
    grid.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      grid.removeEventListener('mousemove', handleMouseMove)
      grid.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      {/* Discover New Projects Section */}
      <h1 className="text-3xl font-bold mb-2 mt-30 text-white">Discover New SynthCrafter Projects</h1>
      <h2 className="text-md mb-8 text-gray-300">Explore and back new AI-powered creations</h2>
      {/* Search Bar */}
      <div className="w-full max-w-5xl flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search SynthCrafter projects..."
          className="w-full md:w-2/3 px-4 py-3 rounded-xl bg-gray-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-lg shadow"
        />
      </div>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
        {filteredProjects.map((project, idx) => {
          const percentFunded = Math.min(100, Math.round((project.fundingRaised / project.fundingGoal) * 100))
          return (
            <Link key={idx} href={`/project/${project.id}`} className="block group" style={{ textDecoration: 'none' }}>
              <Card className="synth-card bg-gray-700/70 border-2 border-dashed border-pink-400 rounded-xl shadow-md p-0 flex flex-col items-center h-full min-h-[390px] hover:shadow-pink-500/30 transition-transform duration-200 cursor-pointer group-hover:scale-[1.02] group-hover:border-pink-500">
                <div className="relative w-full h-32">
                  <Image src={project.thumbnail} alt={project.name} fill className="object-cover rounded-t-xl" />
                </div>
                <div className="p-4 flex flex-col flex-1 w-full items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-pink-300 font-semibold mb-1">
                    {project.type}
                  </span>
                  <h3 className="text-lg font-bold mb-1 text-center">{project.name}</h3>
                  <p className="text-gray-300 mb-1 text-xs text-center flex-1">{project.description}</p>
                  {/* Simplified Progress Bar */}
                  <div className="w-full mb-2">
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full transition-all"
                        style={{ width: `${percentFunded}%` }}
                      />
                    </div>
                    <div className="text-right text-[10px] text-pink-300 mt-1">{percentFunded}% funded</div>
                  </div>
                  <div className="mt-auto w-full">
                    <Link href={`/project/${project.id}`} passHref legacyBehavior>
                      <Button variant="outline" className="border-pink-400 text-pink-300 hover:bg-pink-500/10 w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
      {/* Owned Projects Section */}
      <h1 className="text-4xl font-bold mb-2 text-white">My SynthCrafter Vault</h1>
      <h2 className="text-lg mb-10 text-gray-300">Everything you&apos;ve backed, all in one place.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {ownedProjects.map((project, idx) => (
          <Card key={idx} className="bg-gray-800 rounded-xl shadow-lg p-0 flex flex-col overflow-hidden">
            <div className="relative w-full h-48 mb-2">
              <Image src={project.thumbnail} alt={project.name} fill className="object-cover" priority />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm uppercase tracking-wide text-pink-400 font-semibold">{project.type}</span>
                <Badge variant={project.verified ? 'default' : 'secondary'}>
                  {project.verified ? 'Verified Creator' : 'Unverified'}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
              <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <span className="block text-xs text-gray-400">Tokens Held</span>
                  <span className="font-semibold">{project.tokenAmount}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400">Current Value</span>
                  <span className="font-semibold">{project.tokenValue}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <Button variant="default" className="bg-pink-500 hover:bg-pink-400">
                  Access
                </Button>
                <Button variant="outline" className="border-pink-500 text-pink-400 hover:bg-pink-500/10">
                  Trade
                </Button>
                <Link href={`/project/${project.id}`} passHref legacyBehavior>
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    View Updates
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
