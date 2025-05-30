'use client'

import { useState } from 'react'
import { SwapBox, TradeContainer } from '@/components/TradeComponents'

import { Token, mockTokens } from '@/mock/tokens'

export default function Swap() {
  const [sellToken, setSellToken] = useState<Token | null>(mockTokens[0])
  const [buyToken, setBuyToken] = useState<Token | null>(null)

  return (
    <TradeContainer>
      <SwapBox
        initialSellToken={sellToken}
        initialBuyToken={buyToken}
        setSellToken={setSellToken}
        setBuyToken={setBuyToken}
      />
    </TradeContainer>
  )
}
