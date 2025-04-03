'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function TradeTabs() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { label: 'Swap', path: '/swap' },
    { label: 'Limit', path: '/limit' },
    { label: 'Send', path: '/send' },
    { label: 'Buy', path: '/buy' },
  ]

  return (
    <Tabs value={pathname} className="w-full flex justify-center">
      <TabsList className="relative flex space-x-2 bg-black p-1 rounded-full">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path

          return (
            <TabsTrigger
              key={tab.path}
              value={tab.path}
              onClick={() => router.push(tab.path)}
              className={`relative px-8 py-2 text-sm rounded-full text-gray-800 hover:text-white transition-all duration-300 ${
                isActive ? 'bg-white text-white font-semibold shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
