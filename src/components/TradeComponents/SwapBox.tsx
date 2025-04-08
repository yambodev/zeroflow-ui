'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowDown } from 'react-icons/fa6'
import { SwapCard } from './SwapCard'
import { Token, mockTokens } from '@/mock/tokens'

export interface SwapBoxProps {
  initialSelected?: 'sell' | 'buy'
  initialBuyToken: Token | null
  initialSellToken: Token | null
}

export function SwapBox({
  initialSelected = 'sell',
  initialSellToken = mockTokens[1],
  initialBuyToken = null,
}: SwapBoxProps) {
  const [selected, setSelected] = useState<'sell' | 'buy'>(initialSelected)
  const [sellToken, setSellToken] = useState<Token | null>(initialSellToken)
  const [buyToken, setBuyToken] = useState<Token | null>(initialBuyToken)

  // States for the input values (as strings) from each card
  const [sellValue, setSellValue] = useState<string>('') // Value from sell card
  const [buyValue, setBuyValue] = useState<string>('') // Value from buy card

  // Refs for input fields
  const sellInputRef = useRef<HTMLInputElement>(null)
  const buyInputRef = useRef<HTMLInputElement>(null)

  // Function to swap tokens (and clear the input values)
  const swapCurrencies = () => {
    setSellToken(buyToken)
    setBuyToken(sellToken)
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
    if (selected === 'sell' && sellToken && buyToken) {
      const numericSell = Number(sellValue)
      if (!isNaN(numericSell)) {
        // Conversion: value in USD from sell token divided by buy token price
        const converted = (numericSell * sellToken.price) / buyToken.price
        setBuyValue(converted.toString())
      } else {
        setBuyValue('')
      }
    }
  }, [sellValue, sellToken, buyToken, selected])

  // Conversion logic when the buy card is active:
  // When the buy value changes, update the sell value accordingly.
  useEffect(() => {
    if (selected === 'buy' && sellToken && buyToken) {
      const numericBuy = Number(buyValue)
      if (!isNaN(numericBuy)) {
        // Conversion: value in USD from buy token divided by sell token price
        const converted = (numericBuy * buyToken.price) / sellToken.price
        setSellValue(converted.toString())
      } else {
        setSellValue('')
      }
    }
  }, [buyValue, sellToken, buyToken, selected])

  return (
    <div className="text-gray-300 rounded-xl space-y-4 w-full max-w-md relative">
      {/* Sell Card */}
      <SwapCard
        label="Sell"
        isSelected={selected === 'sell'}
        inputRef={sellInputRef}
        token={sellToken}
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
        token={buyToken}
        value={buyValue}
        onValueChange={setBuyValue}
        setToken={setBuyToken}
      />
    </div>
  )
}
