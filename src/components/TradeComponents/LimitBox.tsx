'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SwapBox } from './SwapBox'
import { Card } from '../ui/card'
import { HiArrowsUpDown } from 'react-icons/hi2'
import { mockTokens, Token } from '@/mock/tokens'
import { SelectTokenButton } from './SelectTokenButton'

export function LimitBox() {
  const [sellToken, setSellToken] = useState<Token | null>(mockTokens[1])
  const [buyToken, setBuyToken] = useState<Token | null>(mockTokens[2])

  const [selectedDuration, setSelectedDuration] = useState('1 semana')

  // Market price simulation
  const [marketPrice, setMarketPrice] = useState(1742)

  return (
    <div className="text-gray-400 rounded-lg w-full max-w-md mb-1">
      {/* Reference price*/}
      <Card className="bg-secondary p-4 rounded-xl m-1 gap-2 relative">
        <div className="text-sm text-gray-400 flex flex-grow">
          When 1{' '}
          <div className="-mt-[6px]">
            <SelectTokenButton
              token={sellToken}
              onTokenSelect={setSellToken}
              label={sellToken?.slug || 'Select'}
              variant="secondary"
            />
          </div>
          is worth
        </div>
        {/* 
        <h2 className="text-3xl font-semibold">{marketPrice.toFixed(1)}</h2> */}
        <input
          type="number"
          value={marketPrice}
          onChange={(e) => setMarketPrice(parseInt(e.target.value))}
          className="bg-transparent w-full text-3xl font-semibold outline-none"
          placeholder="0"
        />
        <div className="flex flex-col gap-1 text-gray-400 items-end absolute right-5 top-5">
          <HiArrowsUpDown />
          <SelectTokenButton
            token={buyToken}
            onTokenSelect={setBuyToken}
            label={buyToken?.slug || 'Select'}
            variant="secondary"
          />
        </div>

        {/*settings button*/}
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            className="px-4 py-1 rounded-full border border-gray-500 bg-gray-600 hover:text-gray-500 hover:bg-gray-600/80"
          >
            Market
          </Button>
          {['+1%', '+5%', '+10%'].map((percentage) => (
            <Button
              key={percentage}
              variant="secondary"
              className="px-3 py-1 rounded-full border border-gray-600 hover:text-gray-500"
            >
              {percentage}
            </Button>
          ))}
        </div>
      </Card>

      <SwapBox
        initialBuyToken={buyToken}
        initialSellToken={sellToken}
        setSellToken={setSellToken}
        setBuyToken={setBuyToken}
      />

      {/*Expiry Section*/}
      <div className="bg-secondary p-4 rounded-xl">
        <p className="text-sm text-gray-400">Expiry</p>
        <div className="flex space-x-2 mt-2">
          {['1 day', '1 week', '1 month', '1 year'].map((duration) => (
            <Button
              key={duration}
              variant="secondary"
              className={`px-3 py-1 rounded-full border border-gray-600 hover:text-gray-500 ${selectedDuration === duration ? 'bg-gray-600 hover:bg-gray-600/80' : ''}`}
              onClick={() => setSelectedDuration(duration)}
            >
              {duration}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
