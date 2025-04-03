'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'

export function LimitBox() {
  const [sellValue, setSellValue] = useState('')
  const [buyValue, setBuyValue] = useState('')
  const [sellCurrency, setSellCurrency] = useState('USDC')
  const [buyCurrency, setBuyCurrency] = useState('ETH')
  const [selectedDuration, setSelectedDuration] = useState('1 semana')

  // Market price simulation
  const [marketPrice, setMarketPrice] = useState(0.000556891)

  // Swap coins function
  const swapCurrencies = () => {
    setSellCurrency(buyCurrency)
    setBuyCurrency(sellCurrency)
    setSellValue(buyValue)
    setBuyValue(sellValue)
  }

  return (
    <div className="bg-gray-800 text-gray-400 p-6 rounded-lg space-y-6 w-full max-w-md text-center">
      {/* Reference price*/}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-400">
          When 1 <span className="text-blue-400">{sellCurrency}</span> costs
        </p>
        <h2 className="text-3xl font-semibold">{marketPrice.toFixed(9)}</h2>
        <p className="text-sm text-gray-400">ETH</p>

        {/*settings button*/}
        <div className="flex space-x-2 mt-3">
          <Button variant="secondary" className="bg-gray-800 px-4 py-1 rounded-lg">
            Market
          </Button>
          {['+1%', '+5%', '+10%'].map((percentage) => (
            <Button key={percentage} variant="secondary" className="bg-gray-800 px-3 py-1 rounded-lg">
              {percentage}
            </Button>
          ))}
        </div>
      </div>

      {/* Sell Section*/}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-400">Sell</p>
        <input
          type="number"
          value={sellValue}
          onChange={(e) => setSellValue(e.target.value)}
          className="bg-transparent w-full text-2xl outline-none"
          placeholder="0"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">USD 0</p>
          <select
            value={sellCurrency}
            onChange={(e) => setSellCurrency(e.target.value)}
            className="bg-gray-800 px-3 py-1 rounded-lg"
          >
            <option value="USDC">USDC</option>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
          </select>
        </div>
      </div>

      {/* Swap Button*/}
      <div className="flex justify-center mb-4">
        <Button variant="secondary" className="bg-gray-800 hover:bg-gray-600 p-2 rounded-full" onClick={swapCurrencies}>
          <ArrowDown size={20} />
        </Button>
      </div>

      {/*Buy Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-400">Buy</p>
        <input
          type="number"
          value={buyValue}
          onChange={(e) => setBuyValue(e.target.value)}
          className="bg-transparent w-full text-2xl outline-none"
          placeholder="0"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">USD 0</p>
          <select
            value={buyCurrency}
            onChange={(e) => setBuyCurrency(e.target.value)}
            className="bg-gray-800 px-3 py-1 rounded-lg"
          >
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
            <option value="BTC">BTC</option>
          </select>
        </div>
      </div>

      {/*Veciation Section*/}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-400">Veciation</p>
        <div className="flex space-x-2 mt-2">
          {['1 día', '1 semana', '1 mes', '1 año'].map((duration) => (
            <Button
              key={duration}
              variant="secondary"
              className={`px-3 py-1 rounded-lg ${selectedDuration === duration ? 'bg-gray-700' : 'bg-gray-800'}`}
              onClick={() => setSelectedDuration(duration)}
            >
              {duration}
            </Button>
          ))}
        </div>
      </div>

      {/*Conect wallet button*/}
      <Button className="bg-pink-600/40 hover:bg-pink-500/50 w-full py-3 text-lg text-pink-600 rounded-lg cursor-pointer">
        Conect Wallet
      </Button>
    </div>
  )
}
