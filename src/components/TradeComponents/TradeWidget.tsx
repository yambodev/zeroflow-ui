// src/components/TradeComponents/TradeWidget.tsx
'use client'

import React, { useState } from 'react'
import { TradeContainer } from './TradeContainer'
import { SwapBox, LimitBox, SendBox, BuyBox } from './index'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { Token, mockTokens } from '@/mock/tokens'

type TabType = 'swap' | 'limit' | 'send' | 'buy'

const TABS: { label: string; type: TabType }[] = [
  { label: 'Swap', type: 'swap' },
  { label: 'Limit', type: 'limit' },
  { label: 'Send', type: 'send' },
  { label: 'Buy', type: 'buy' },
]

export const TradeWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('swap')
  const [sellToken, setSellToken] = useState<Token | null>(mockTokens[0])
  const [buyToken, setBuyToken] = useState<Token | null>(null)

  const renderActiveBox = () => {
    switch (activeTab) {
      case 'swap':
        return (
          <SwapBox
            initialSellToken={sellToken}
            initialBuyToken={buyToken}
            setSellToken={setSellToken}
            setBuyToken={setBuyToken}
          />
        )
      case 'limit':
        return <LimitBox />
      case 'send':
        return <SendBox />
      case 'buy':
        return <BuyBox />
    }
  }

  return (
    <TradeContainer widget>
      <Tabs value={activeTab} className="w-fit flex justify-center mb-3">
        <TabsList className="relative flex space-x-2 bg-black p-1 rounded-full">
          {TABS.map(({ label, type }) => {
            const isActive = activeTab === type
            return (
              <TabsTrigger
                key={type}
                value={type}
                onClick={() => setActiveTab(type)}
                className={`relative px-8 py-2 text-sm rounded-full ${
                  !isActive && 'text-gray-400 hover:text-white cursor-pointer'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full shadow-lg bg-input/50"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {renderActiveBox()}
    </TradeContainer>
  )
}
