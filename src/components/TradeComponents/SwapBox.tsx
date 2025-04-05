'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowDown } from 'react-icons/fa6'
import { SwapCard } from './SwapCard'

export interface SwapBoxProps {
  initialSellValue?: string
  initialBuyValue?: string
  initialSellCurrency?: string
  initialBuyCurrency?: string
  initialSelected?: 'sell' | 'buy'
}

export function SwapBox({
  initialSellValue = '',
  initialBuyValue = '',
  initialSellCurrency = 'ETH',
  initialBuyCurrency = 'Select token',
  initialSelected = 'sell',
}: SwapBoxProps) {
  const [sellValue, setSellValue] = useState(initialSellValue)
  const [buyValue, setBuyValue] = useState(initialBuyValue)
  const [sellCurrency, setSellCurrency] = useState(initialSellCurrency)
  const [buyCurrency, setBuyCurrency] = useState(initialBuyCurrency)
  const [selected, setSelected] = useState(initialSelected)

  const sellInputRef = useRef<HTMLInputElement>(null)
  const buyInputRef = useRef<HTMLInputElement>(null)

  const swapCurrencies = () => {
    setSellCurrency(buyCurrency)
    setBuyCurrency(sellCurrency)
    setSellValue(buyValue)
    setBuyValue(sellValue)
    setSelected(selected === 'sell' ? 'buy' : 'sell')
  }

  useEffect(() => {
    if (selected === 'sell') {
      sellInputRef.current?.focus()
    } else {
      buyInputRef.current?.focus()
    }
  }, [selected])

  return (
    <div className="text-gray-300 rounded-xl space-y-4 w-full max-w-md relative">
      {/* Sell Card */}
      <SwapCard
        label="Sell"
        value={sellValue}
        onValueChange={(e) => setSellValue(e.target.value)}
        currency={sellCurrency}
        isSelected={selected === 'sell'}
        inputRef={sellInputRef}
      />

      {/* Swap button */}
      <div className="flex justify-center z-10 absolute w-full left-0 top-[calc(50%-21px)]">
        <Button
          variant="secondary"
          className="bg-[#181818] hover:bg-[#333] cursor-pointer py-4 px-2 rounded-xl border-4 border-background shadow-md"
          onClick={swapCurrencies}
        >
          <span className="w-5 h-5 flex justify-center items-center">
            <FaArrowDown className="w-5" />
          </span>
        </Button>
      </div>

      {/* Buy Card */}
      <SwapCard
        label="Buy"
        value={buyValue}
        onValueChange={(e) => setBuyValue(e.target.value)}
        currency={buyCurrency}
        isSelected={selected === 'buy'}
        inputRef={buyInputRef}
      />
    </div>
  )
}
