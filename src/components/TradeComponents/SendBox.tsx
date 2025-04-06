'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { IoSwapVerticalSharp } from 'react-icons/io5'
import ConnectWalletButton from '../ui/connect-wallet-button'
import { Token } from '@/mock/tokens'
import { Button } from '../ui/button'
import { IoIosArrowDown } from 'react-icons/io'
import { TokenSelector } from './TokenSelector'

interface SendBoxProps {
  label: string
  value: string
  currency: string
  isSelected: boolean
}

export function SendBox({ isSelected, currency }: SendBoxProps) {
  const [amount, setAmount] = useState('0.00')
  const [isUSD, setIsUSD] = useState(true)
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [openTokenSelector, setOpenTokenSelector] = useState(false)

  const handleSelectToken = (token: Token) => {
    setSelectedToken(token)
    setOpenTokenSelector(false)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setAmount(value)
  }

  const toggleCurrency = () => {
    const amountNum = parseFloat(amount)
    if (!selectedToken || isNaN(amountNum)) return

    const newAmount = isUSD
      ? (amountNum / selectedToken.price).toFixed(6)
      : (amountNum * selectedToken.price).toFixed(2)

    setAmount(newAmount)
    setIsUSD(!isUSD)
  }

  const displayConvertedValue = () => {
    const amountNum = parseFloat(amount)
    if (!selectedToken || isNaN(amountNum)) return isUSD ? '0.000000' : '$0.00'

    return isUSD
      ? `${(amountNum / selectedToken.price).toFixed(6)} ${selectedToken.slug}`
      : `$${(amountNum * selectedToken.price).toFixed(2)}`
  }

  return (
    <Card className={`p-4 cursor-pointer rounded-xl bg-secondary m-1 w-full`}>
      {/* Send Amount */}
      <div className="text-center">
        <p className="text-gray-400 text-sm text-start">Send</p>
        <div className="flex items-center justify-center text-4xl font-semibold space-x-2">
          <span className="text-gray-600 text-[60px] text-center items-center justify-center flex py-5">
            {isUSD ? 'USD' : selectedToken?.slug || 'TOKEN'}
          </span>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="bg-transparent border-none outline-none text-gray-600 text-[60px] font-semibold text-center w-28"
          />
        </div>
        <div className="flex flex-grow items-center justify-center mt-2">
          <p className="text-gray-500 text-sm">{displayConvertedValue()}</p>
          <button onClick={toggleCurrency} className="text-gray-400 hover:text-white transition">
            <IoSwapVerticalSharp className="ml-2" size={15} />
          </button>
        </div>
      </div>

      {/* Token Selector*/}
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

      {/* Wallet address */}
      <div>
        <p className="text-gray-400 text-sm mb-1">To</p>
        <Input
          type="text"
          placeholder="Wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="bg-gray-900 border-none text-white placeholder-gray-500"
        />
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
