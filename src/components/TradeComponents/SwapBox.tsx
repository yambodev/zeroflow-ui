'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowDown } from 'react-icons/fa6'
import { SwapCard } from './SwapCard'
import { Token } from '@/mock/tokens'

export interface SwapBoxProps {
  initialSelected?: 'sell' | 'buy'
  initialBuyToken: Token | null
  initialSellToken: Token | null
  setSellToken: React.Dispatch<React.SetStateAction<Token | null>>
  setBuyToken: React.Dispatch<React.SetStateAction<Token | null>>
}

export function SwapBox({
  initialSelected = 'sell',
  initialSellToken,
  initialBuyToken,
  setSellToken,
  setBuyToken,
}: SwapBoxProps) {
  const [selected, setSelected] = useState<'sell' | 'buy'>(initialSelected)

  // Controlled input values
  const [sellValue, setSellValue] = useState<string>('')
  const [buyValue, setBuyValue] = useState<string>('')

  // Input refs
  const sellInputRef = useRef<HTMLInputElement>(null)
  const buyInputRef = useRef<HTMLInputElement>(null)

  // Swap function
  const swapCurrencies = () => {
    setSellToken(initialBuyToken)
    setBuyToken(initialSellToken)
    setSelected(selected === 'sell' ? 'buy' : 'sell')
    setSellValue('')
    setBuyValue('')
  }

  // Focus the active input field when selected card changes
  useEffect(() => {
    if (selected === 'sell') {
      sellInputRef.current?.focus()
    } else {
      buyInputRef.current?.focus()
    }
  }, [selected])

  // Conversion logic when the sell card is active:
  // When the sell value changes, update the buy value based on token prices.
  useEffect(() => {
    if (selected === 'sell' && initialSellToken && initialBuyToken) {
      const numericSell = Number(sellValue)
      if (!isNaN(numericSell)) {
        const converted = (numericSell * initialSellToken.price) / initialBuyToken.price
        setBuyValue(converted.toString())
      } else {
        setBuyValue('')
      }
    }
  }, [sellValue, initialSellToken, initialBuyToken, selected])

  // Conversion logic when the buy card is active:
  // When the buy value changes, update the sell value accordingly.
  useEffect(() => {
    if (selected === 'buy' && initialSellToken && initialBuyToken) {
      const numericBuy = Number(buyValue)
      if (!isNaN(numericBuy)) {
        const converted = (numericBuy * initialBuyToken.price) / initialSellToken.price
        setSellValue(converted.toString())
      } else {
        setSellValue('')
      }
    }
  }, [buyValue, initialSellToken, initialBuyToken, selected])

  return (
    <div className="text-gray-300 rounded-xl space-y-4 w-full max-w-md relative mb-1">
      {/* Sell Card */}
      <SwapCard
        label="Sell"
        isSelected={selected === 'sell'}
        inputRef={sellInputRef}
        token={initialSellToken}
        value={sellValue}
        onValueChange={setSellValue}
        setToken={setSellToken}
      />

      {/* Swap Button */}
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
        isSelected={selected === 'buy'}
        inputRef={buyInputRef}
        token={initialBuyToken}
        value={buyValue}
        onValueChange={setBuyValue}
        setToken={setBuyToken}
      />
    </div>
  )
}
