'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    name: 'DreamFrame: The Infinite Odyssey',
    type: 'AI Movie',
    description: 'A feature-length AI-generated sci-fi adventure that evolves with every viewing.',
    thumbnail: '/dreamframe.png',
    tokenAmount: 120,
    tokenValue: '$480',
    creator: 'CineSynth Studios',
    verified: true,
  },
  {
    name: 'UltiBot - Bitcoin & ETH Trader',
    type: 'Trading AI Agent',
    description: 'An intelligent agent designed to trade Bitcoin and Ethereum on the Wire Network.',
    thumbnail: '/tradingbot.png',
    tokenAmount: 200,
    tokenValue: '$800',
    creator: 'Agentic Labs',
    verified: true,
  },
  {
    name: 'NeuroQuest: The Mind Labyrinth',
    type: 'AI Game',
    description: 'An ever-expanding puzzle adventure where the AI adapts the world to your play style.',
    thumbnail: '/neuroquest.png',
    tokenAmount: 75,
    tokenValue: '$300',
    creator: 'GameForge AI',
    verified: false,
  },
]
const availableProjects = [
  {
    name: "John's SynthVerse",
    type: 'Virtual World',
    description: "Step into John Doe's world, offering exclusive access to a vast, immersive virtual experience.",
    thumbnail: '/john.jpg',
  },
  {
    name: 'Unbounded',
    type: 'AI Music Album',
    description: 'Experience the 5th album from the visionary artist SynthWave.',
    thumbnail: '/unbounded.png',
  },
  {
    name: 'WaitLineBot',
    type: 'Call Center Agent',
    description:
      'An AI agent designed to wait on long call center lines for you, notifying you when a human is available.',
    thumbnail: '/bot.jpeg',
  },
]

export default function SynthCrafting() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      {/* Discover New Projects Section */}
      <h1 className="text-3xl mt-[100px] font-bold mb-2 text-white">Discover New SynthCrafter Projects</h1>
      <h2 className="text-md mb-8 text-gray-300">Explore and back new AI-powered creations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
        {availableProjects.map((project, idx) => (
          <Card
            key={idx}
            className="bg-gray-700/70 border-2 border-dashed border-pink-400 rounded-xl shadow-md p-0 flex flex-col items-center hover:shadow-pink-500/30 transition-shadow cursor-pointer"
          >
            <div className="relative w-full h-32">
              <Image src={project.thumbnail} alt={project.name} fill className="object-cover rounded-t-xl" />
            </div>
            <div className="p-4 flex flex-col flex-1 w-full items-center">
              <span className="text-xs uppercase tracking-wide text-pink-300 font-semibold mb-1">{project.type}</span>
              <h3 className="text-lg font-bold mb-1 text-center">{project.name}</h3>
              <p className="text-gray-300 mb-3 text-xs text-center flex-1">{project.description}</p>
              <div className="mt-auto w-full">
                <Button variant="outline" className="border-pink-400 text-pink-300 hover:bg-pink-500/10 w-full">
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* Owned Projects Section */}
      <h1 className="text-4xl font-bold mb-2 text-white">My SynthCrafter Vault</h1>
      <h2 className="text-lg mb-10 text-gray-300">Everything you&apos;ve backed, all in one place.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {projects.map((project, idx) => (
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
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  View Updates
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
