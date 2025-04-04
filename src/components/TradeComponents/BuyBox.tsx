'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ConnectWalletButton from '../ui/connect-wallet-button'

const amounts = [100, 300, 1000]
const tokens = ['ETH', 'USDC', 'USDT', 'WBTC']

export function BuyBox() {
  const [amount, setAmount] = useState(1000)
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  return (
    <Card className="bg-gray-800 text-gray-400 p-6 rounded-lg space-y-6 w-full max-w-md text-center">
      <p className="text-gray-400 text-sm text-start">Buy</p>
      {/* Amount */}
      <h2 className="text-5xl font-semibold">USD{amount}</h2>

      {/* Token Selector */}

      <div className="flex items-center justify-center">
        <Popover>
          <PopoverTrigger asChild className="flex items-center justify-center">
            <Button className="bg-pink-600 hover:bg-pink-600 text-white py-2 flex items-center justify-center rounded-xl w-[200px]">
              {selectedToken ? selectedToken : 'Selecciona un token'} <ChevronDown className="ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="text-white rounded-lg p-2">
            {tokens.map((token) => (
              <p key={token} onClick={() => setSelectedToken(token)} className="p-2 cursor-pointer rounded-md">
                {token}
              </p>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Amount Selection */}
      <div className="flex justify-center space-x-3">
        {amounts.map((amt) => (
          <Button
            key={amt}
            className={`py-2 px-4 rounded-lg ${amt === amount ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}
            onClick={() => setAmount(amt)}
          >
            USD{amt}
          </Button>
        ))}
      </div>

      <ConnectWalletButton />
    </Card>
  )
}
