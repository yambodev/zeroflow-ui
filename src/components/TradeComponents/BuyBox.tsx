'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Token } from '@/mock/tokens'
import { SelectTokenButton } from './SelectTokenButton'
import AmountInput from './AmountInput'

interface BuyBoxProps {
  currency?: string
}

// Predefined amounts
const presetAmounts = [100, 300, 1000]

export function BuyBox({ currency = '$' }: BuyBoxProps) {
  // Define the amount state as a string to work directly with the AmountInput component
  const [amount, setAmount] = useState<string>('1000')
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)

  // Handles the token selection
  const handleSelectToken = (token: Token) => {
    setSelectedToken(token)
  }

  return (
    <Card className="p-4 cursor-pointer rounded-xl bg-secondary m-1 w-full">
      <p className="text-gray-400 text-sm text-start">Buy</p>

      {/* Amount Input */}
      <div className="flex items-center justify-center">
        <AmountInput
          value={amount}
          onValueChange={setAmount}
          isUSD={true}
          currencySymbol={currency} // Use the currency prop to display the symbol
        />
      </div>

      {/* Token Selector */}
      <div className="flex items-center justify-center mt-4">
        <SelectTokenButton token={selectedToken} onTokenSelect={handleSelectToken} label="select token" />
      </div>

      {/* Buttons for predefined amounts */}
      <div className="flex justify-center space-x-3 mt-4">
        {presetAmounts.map((amt) => (
          <Button
            key={amt}
            className={`py-2 px-4 rounded-lg ${amt.toString() === amount ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}
            onClick={() => setAmount(amt.toString())}
          >
            {currency}
            {amt}
          </Button>
        ))}
      </div>
    </Card>
  )
}
