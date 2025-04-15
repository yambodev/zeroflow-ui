'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { IoSwapVerticalSharp } from 'react-icons/io5'
import ConnectWalletButton from '../ui/connect-wallet-button'
import { Token, mockTokens } from '@/mock/tokens'
import { SelectTokenButton } from './SelectTokenButton'
import { toFixedIfNecessary } from '@/utils/numberUtils'
import AmountInput from './AmountInput'

export function SendBox() {
  const [amount, setAmount] = useState('0')
  const [isUSD, setIsUSD] = useState(true)
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedToken, setSelectedToken] = useState<Token | null>(mockTokens[1])

  const handleSelectToken = (token: Token) => {
    setSelectedToken(token)
  }

  const toggleCurrency = () => {
    const amountNum = parseFloat(amount)
    if (!selectedToken || isNaN(amountNum)) return

    const newAmount = isUSD
      ? toFixedIfNecessary(amountNum / selectedToken.price, 4)
      : toFixedIfNecessary(amountNum * selectedToken.price, 2)

    setAmount(`${newAmount}`)
    setIsUSD(!isUSD)
  }

  const displayConvertedValue = () => {
    const amountNum = parseFloat(amount)
    if (!selectedToken || isNaN(amountNum)) return isUSD ? '0.00' : '$0'

    return isUSD
      ? `${toFixedIfNecessary(amountNum / selectedToken.price, 4)} ${selectedToken.slug}`
      : `$${toFixedIfNecessary(amountNum * selectedToken.price, 2)}`
  }

  return (
    <Card className="p-4 cursor-pointer rounded-xl bg-secondary m-1 w-full relative">
      {/* Send Amount */}
      <div className="text-center">
        <p className="text-gray-400 text-sm text-start">Send</p>
        <AmountInput value={amount} onValueChange={setAmount} isUSD={isUSD} />
        <div className="flex flex-grow items-center justify-center mt-2">
          <p className="text-gray-500 text-sm">{displayConvertedValue()}</p>
          <button onClick={toggleCurrency} className="text-gray-400 hover:text-white transition">
            <IoSwapVerticalSharp className="ml-2" size={15} />
          </button>
        </div>
      </div>

      <SelectTokenButton token={selectedToken} onTokenSelect={handleSelectToken} label="select token" />
      {/* Wallet address */}
      <div>
        <p className="text-gray-400 text-sm mb-1">To</p>
        <input
          type="text"
          placeholder="Wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="bg-gray-900 border-none text-white placeholder-gray-500"
        />
      </div>
      <ConnectWalletButton />
    </Card>
  )
}
