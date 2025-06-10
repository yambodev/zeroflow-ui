'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ownedProjects, availableProjects } from '@/data/projects'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'

function extractProjectIds(text: string): string[] {
  // Match lines like ID: xyzxyz or ID:xyzxyz
  return (text.match(/ID:\s*([\w-]+)/g) || []).map((line) => line.replace(/ID:\s*/, '').trim())
}

const PLACEHOLDER_IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESeXCnFfppy9XoJCSWulNyG8YUjjCWd1ULA&s'

function KickstartForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '',
    description: '',
    goal: '',
    awards: [
      { title: '', description: '', coin: false, min: '' },
      { title: '', description: '', coin: false, min: '' },
      { title: '', description: '', coin: false, min: '' },
    ],
    coinName: '',
    image: PLACEHOLDER_IMG,
  })
  const [success, setSuccess] = useState(false)

  const handleAwardChange = (idx: number, field: string, value: string | boolean) => {
    setForm((f) => {
      const awards = [...f.awards]
      awards[idx] = { ...awards[idx], [field]: value }
      return { ...f, awards }
    })
  }

  const handleNext = useCallback(() => {
    if (step === 5) {
      setSuccess(true)
    } else {
      setStep((s) => s + 1)
    }
  }, [step])
  const handlePrev = useCallback(() => setStep((s) => Math.max(0, s - 1)), [])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full max-w-xl bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center border-2 border-pink-400">
        {!success ? (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded hover:bg-pink-500/20"
              aria-label="Close form"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6l-12 12" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2 text-pink-400">Kickstart Your Project</h2>
              <div className="w-full mt-4">
                {step === 0 && (
                  <div>
                    <label className="block mb-2 text-lg font-semibold">Project Name</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-lg shadow"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Enter your project's name"
                    />
                  </div>
                )}
                {step === 1 && (
                  <div>
                    <label className="block mb-2 text-lg font-semibold">Project Description</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-lg shadow min-h-[100px]"
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Describe your project"
                    />
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <label className="block mb-2 text-lg font-semibold">Funding Goal (in $WIRE)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-lg shadow"
                      value={form.goal}
                      onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                      placeholder="e.g. 1000"
                      min={0}
                    />
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <label className="block mb-2 text-lg font-semibold">Award Tiers</label>
                    <div className="flex flex-col gap-4">
                      {form.awards.map((award, idx) => (
                        <div key={idx} className="border border-pink-400 rounded-xl p-4 bg-gray-800">
                          <div className="mb-2">
                            <input
                              className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-pink-300 mb-2"
                              value={award.title}
                              onChange={(e) => handleAwardChange(idx, 'title', e.target.value)}
                              placeholder={`Tier ${idx + 1} Title`}
                            />
                            <textarea
                              className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-pink-300 mb-2 min-h-[60px]"
                              value={award.description}
                              onChange={(e) => handleAwardChange(idx, 'description', e.target.value)}
                              placeholder="Description"
                            />
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="checkbox"
                                id={`coin-${idx}`}
                                checked={award.coin}
                                onChange={(e) => handleAwardChange(idx, 'coin', e.target.checked)}
                              />
                              <label htmlFor={`coin-${idx}`} className="text-pink-300">
                                Include custom coin in this tier
                              </label>
                            </div>
                            <input
                              type="number"
                              className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-pink-300"
                              value={award.min}
                              onChange={(e) => handleAwardChange(idx, 'min', e.target.value)}
                              placeholder="Minimum backing in $WIRE"
                              min={0}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div>
                    <label className="block mb-2 text-lg font-semibold">Name Your Coin</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-lg shadow"
                      value={form.coinName}
                      onChange={(e) => setForm((f) => ({ ...f, coinName: e.target.value }))}
                      placeholder="e.g. SynthToken"
                    />
                  </div>
                )}
                {step === 5 && (
                  <div className="flex flex-col items-center">
                    <label className="block mb-2 text-lg font-semibold">Project Image</label>
                    <img
                      src={PLACEHOLDER_IMG}
                      alt="Project"
                      className="w-40 h-40 object-cover rounded-xl border-2 border-pink-400 mb-4"
                    />
                    <div className="text-gray-400 text-sm">(A placeholder image will be used for now)</div>
                  </div>
                )}
              </div>
              <div className="flex w-full justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={step === 0}
                  className="px-6 py-3 rounded-xl bg-gray-700 text-white font-bold text-lg shadow hover:bg-gray-600 transition disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-pink-500 text-white font-bold text-lg shadow hover:bg-pink-400 transition"
                >
                  {step === 5 ? 'Submit' : 'Next'}
                </button>
              </div>
              <div className="mt-4 text-center text-gray-400">Step {step + 1} of 6</div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Project Submitted!</h2>
            <p className="text-lg text-gray-200 mb-6 text-center">
              Your project details have been collected. Thank you for kickstarting your SynthCrafter journey!
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-pink-500 text-white font-bold text-lg shadow hover:bg-pink-400 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SynthCrafting() {
  const [search, setSearch] = useState('Hi, I am looking for some interesting projects to back.')
  const [sessionId, setSessionId] = useState('')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([])
  const [streaming, setStreaming] = useState(false)
  const [streamedMessage, setStreamedMessage] = useState('')
  const [activeProjectIds, setActiveProjectIds] = useState<string[] | null>(null)
  const [animateIn, setAnimateIn] = useState(false)
  const [isInAIAgentChatFlow, setIsInAIAgentChatFlow] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const chatPaneRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const [kickstartOpen, setKickstartOpen] = useState(false)

  useEffect(() => {
    setSessionId(uuidv4() + '-' + uuidv4())
  }, [])

  useEffect(() => {
    if (chatOpen && chatPaneRef.current) {
      chatPaneRef.current.scrollTop = chatPaneRef.current.scrollHeight
    }
  }, [chatOpen, chatHistory, streamedMessage])

  useEffect(() => {
    if (chatOpen && chatInputRef.current) {
      chatInputRef.current.focus()
    }
  }, [chatOpen, streaming, streamedMessage])

  useEffect(() => {
    if (activeProjectIds && activeProjectIds.length > 0) {
      setIsInAIAgentChatFlow(false)
      setAnimateIn(true)
    } else if (activeProjectIds && activeProjectIds.length === 0) {
      setIsInAIAgentChatFlow(false)
      setAnimateIn(false)
    } else {
      setAnimateIn(false)
    }
  }, [activeProjectIds])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    function handleMouseMove(e: MouseEvent) {
      if (!grid) return
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
          ;(card as HTMLElement).style.transition = 'transform 0.2s ease-out'
          ;(card as HTMLElement).style.transform =
            `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.04)`
        } else {
          ;(card as HTMLElement).style.transition = 'transform 0.2s ease-out'
          ;(card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
        }
      })
    }
    function handleMouseLeave() {
      if (!grid) return
      const cards = Array.from(grid.querySelectorAll('.synth-card'))
      cards.forEach((card) => {
        ;(card as HTMLElement).style.transition = 'transform 0.2s ease-out'
        ;(card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      })
    }
    grid.addEventListener('mousemove', handleMouseMove)
    grid.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      grid.removeEventListener('mousemove', handleMouseMove)
      grid.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Filter logic: if activeProjectIds is set, only show those; else, show all available projects
  const filteredProjects =
    activeProjectIds && activeProjectIds.length > 0
      ? availableProjects.filter((p) => activeProjectIds.includes(p.id))
      : availableProjects

  async function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!search.trim()) return
    setChatOpen(true)
    setChatHistory((h) => [...h, { role: 'user', content: search }])
    setSearch('') // Clear input immediately on send
    setStreaming(true)
    setStreamedMessage('')
    setIsInAIAgentChatFlow(true)
    if (chatInputRef.current) {
      chatInputRef.current.focus()
    }
    // Stream from backend
    const res = await fetch('https://zeroflow-backend.onrender.com/demo-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: search, sessionId }),
    })
    if (!res.body) return
    const reader = res.body.getReader()
    let aiMsg = ''
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      const chunk = new TextDecoder().decode(value)
      // Parse streaming format
      chunk.split('data:').forEach((line) => {
        const trimmed = line.trim()
        if (!trimmed || trimmed === '[DONE]') return
        try {
          const json = JSON.parse(trimmed)
          if (json.content) {
            aiMsg += json.content
            setStreamedMessage(aiMsg)
          }
        } catch {}
      })
    }
    setStreaming(false)
    // Remove ID: lines from the AI message for display
    const aiMsgDisplay = aiMsg
      .replace(/["']?ID:\s*[\w-]+["']?/gim, '')
      .replace(/\n{2,}/g, '\n')
      .replace(/ +/g, ' ')
      .trim()
    setChatHistory((h) => [...h, { role: 'ai', content: aiMsgDisplay }])
    setStreamedMessage('')
    // Extract project IDs and filter
    const ids = extractProjectIds(aiMsg)
    if (ids.length > 0) {
      setActiveProjectIds(ids)
      setIsInAIAgentChatFlow(false)
    } else {
      setActiveProjectIds(null) // Show default grid if no recommendations
    }
  }

  // Reset chat and recommendations to default state
  function handleExitChat() {
    setIsInAIAgentChatFlow(false)
    setChatOpen(false)
    setChatHistory([])
    setStreaming(false)
    setStreamedMessage('')
    setActiveProjectIds(null)
  }

  // Add floating animation style
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      {/* Discover New Projects Section */}
      <h1 className="text-3xl font-bold mb-2 mt-30 text-white">Discover New SynthCrafter Projects</h1>
      <h2 className="text-md mb-8 text-gray-300">Explore and back new AI-powered creations</h2>
      {/* Chat/Search Bar */}
      <div className="w-full max-w-5xl flex flex-col items-center mb-8">
        {!chatOpen ? (
          <form onSubmit={handleChatSubmit} className="w-full md:w-2/3 flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ask Zero for recommendations"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-lg shadow"
            />
            <button
              type="submit"
              className="ml-2 px-6 py-3 rounded-xl bg-pink-500 text-white font-bold text-lg shadow hover:bg-pink-400 transition"
            >
              Ask
            </button>
          </form>
        ) : (
          <div className="relative w-full md:w-2/3 bg-gray-900 rounded-xl border border-pink-400 p-4 max-h-96 shadow overflow-hidden">
            {/* X icon top left */}
            <button
              aria-label="Close chat"
              onClick={handleExitChat}
              className="absolute top-2 left-2 z-10 p-1 rounded hover:bg-pink-500/20 focus:outline-none"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L15 15" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
                <path d="M15 5L5 15" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div ref={chatPaneRef} className="flex flex-col gap-4 h-72 overflow-y-auto pr-2">
              {chatHistory.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                  <span
                    className={
                      msg.role === 'user'
                        ? 'bg-pink-500 text-white px-3 py-2 rounded-xl inline-block'
                        : 'bg-gray-800 text-pink-300 px-3 py-2 rounded-xl inline-block'
                    }
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              {streaming && (
                <div className="text-left">
                  <span className="bg-gray-800 text-pink-300 px-3 py-2 rounded-xl inline-block animate-pulse">
                    {streamedMessage}
                  </span>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="flex mt-4">
              <input
                ref={chatInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ask Zero for recommendations"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-lg shadow"
                disabled={streaming}
              />
              <button
                type="submit"
                className="ml-2 px-6 py-3 rounded-xl bg-pink-500 text-white font-bold text-lg shadow hover:bg-pink-400 transition"
                disabled={streaming}
              >
                Ask
              </button>
            </form>
          </div>
        )}
      </div>
      {(!isInAIAgentChatFlow || (activeProjectIds && activeProjectIds.length > 0)) && (
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16 ${filteredProjects.length <= 2 ? 'justify-center' : ''}`}
        >
          {filteredProjects.map((project, idx) => {
            const percentFunded = Math.min(100, Math.round((project.fundingRaised / project.fundingGoal) * 100))
            return (
              <Link
                key={idx}
                href={`/project/${project.id}`}
                className={`block group transition-all duration-400 ${!activeProjectIds && animateIn ? 'opacity-0 animate-fade-in-up' : 'opacity-100'}`}
                style={{ textDecoration: 'none' }}
              >
                <Card className="synth-card bg-gray-700/70 border-2 border-solid border-pink-400 rounded-xl shadow-md p-0 flex flex-col items-center h-full min-h-[390px] hover:shadow-pink-500/30 transition-transform duration-200 cursor-pointer group-hover:scale-[1.02] group-hover:border-pink-500">
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
      )}
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
      {/* Fixed Kickstart Button */}
      <button
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-xl shadow-lg border-2 border-pink-400 hover:scale-105 transition-all animate-float cursor-pointer"
        onClick={() => setKickstartOpen(true)}
      >
        Kickstart Your Project
      </button>
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }
      `}</style>
      <KickstartForm open={kickstartOpen} onClose={() => setKickstartOpen(false)} />
    </div>
  )
}
