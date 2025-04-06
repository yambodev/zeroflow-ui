'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ConnectWalletButton from '../ui/connect-wallet-button'
import { Token } from '@/mock/tokens'
import { TokenSelector } from './TokenSelector'
import { IoIosArrowDown } from 'react-icons/io'

interface BuyBoxProps {
  label: string
  value: string
  currency: string
  isSelected: boolean
}

const amounts = [100, 300, 1000]

export function BuyBox({ isSelected, currency }: BuyBoxProps) {
  const [amount, setAmount] = useState(1000)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [openTokenSelector, setOpenTokenSelector] = useState(false)

  const handleSelectToken = (token: Token) => {
    setSelectedToken(token)
    setOpenTokenSelector(false)
  }

  return (
    <Card className={`p-4 cursor-pointer rounded-xl bg-secondary m-1 w-full`}>
      <p className="text-gray-400 text-sm text-start">Buy</p>
      {/* Amount */}
      <h2 className="text-[80px] text-gray-600 font-semibold text-center">USD{amount}</h2>

      {/* Token Selector */}

      <div className="flex items-center justify-center">
        <Button
          className={`flex items-center gap-2 ${isSelected ? 'bg-secondary hover:bg-[#333]' : 'bg-pink-500 hover:bg-pink-600'} text-sm px-3 py-1 rounded-full`}
          onClick={() => setOpenTokenSelector(true)}
        >
          {!selectedToken && <span className="text-bold">Select Token</span>}
          <span>{selectedToken ? selectedToken.slug : currency}</span>
          <IoIosArrowDown className="ml-1" />
        </Button>
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
      {openTokenSelector && (
        <TokenSelector
          open={openTokenSelector}
          onOpenAction={setOpenTokenSelector}
          onSelectAction={handleSelectToken}
        />
      )}
    </Card>
  )
}
