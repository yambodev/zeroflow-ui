'use client'

import { useState } from 'react'
import { SwapBox } from '@/components/TradeComponents/SwapBox'
import { TradeTabs } from '@/components/TradeComponents/TradeTabs'
import ConnectWalletButton from '@/components/ui/connect-wallet-button'
import { Token, mockTokens } from '@/mock/tokens'

export default function Swap() {
  const [sellToken, setSellToken] = useState<Token | null>(mockTokens[0])
  const [buyToken, setBuyToken] = useState<Token | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center pt-20 pb-8 px-4 md:pt-24">
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <TradeTabs />
          <SwapBox
            initialSellToken={sellToken}
            initialBuyToken={buyToken}
            setSellToken={setSellToken}
            setBuyToken={setBuyToken}
          />
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  )
}
