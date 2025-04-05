'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'

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
    <Tabs value={pathname} className="w-fit flex justify-center mb-3">
      <TabsList className="relative flex space-x-2 bg-black p-1 rounded-full">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path

          return (
            <TabsTrigger
              key={tab.path}
              value={tab.path}
              onClick={() => router.push(tab.path)}
              className={`relative px-8 py-2 text-sm rounded-full ${!isActive && 'text-gray-400 hover:text-white cursor-pointer'}`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-full shadow-lg bg-input/50 "
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
