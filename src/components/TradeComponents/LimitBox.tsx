'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ConnectWalletButton from '../ui/connect-wallet-button'
import { SwapBox } from './SwapBox'
import { Card } from '../ui/card'
import { HiArrowsUpDown } from 'react-icons/hi2'

export function LimitBox() {
  const [sellCurrency, setSellCurrency] = useState('ETH')
  const [buyCurrency, setBuyCurrency] = useState('USDT')
  const [selectedDuration, setSelectedDuration] = useState('1 semana')

  // Market price simulation
  const [marketPrice, setMarketPrice] = useState(1742)

  return (
    <div className="text-gray-400 rounded-lg w-full max-w-md">
      {/* Reference price*/}
      <Card className="bg-secondary p-4 rounded-xl m-1 gap-2 relative">
        <p className="text-sm text-gray-400">
          When 1 <span className="text-white text-md font-semibold">{sellCurrency}</span> is worth
        </p>
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
          <p className="text-sm text-gray-400">{buyCurrency}</p>
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

      <SwapBox />

      {/*Expiry Section*/}
      <div className="bg-secondary p-4 rounded-xl mb-4">
        <p className="text-sm text-gray-400">Expiry</p>
        <div className="flex space-x-2 mt-2">
          {['1 día', '1 semana', '1 mes', '1 año'].map((duration) => (
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
      <ConnectWalletButton />
    </div>
  )
}
