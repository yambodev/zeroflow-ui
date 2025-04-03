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
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.path}
            value={tab.path}
            onClick={() => console.log('holis')}
            className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 
              ${
                pathname === tab.path
                  ? 'bg-white text-black font-semibold scale-105 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:scale-105'
              }`}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
