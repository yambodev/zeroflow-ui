'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { IoSwapVerticalSharp } from 'react-icons/io5'
import { TokenSelector } from './TokenSelector'
import ConnectWalletButton from '../ui/connect-wallet-button'

const tokens = [
  { name: 'Ethereum', symbol: 'ETH', address: '', icon: '/eth-logo.svg' },
  { name: 'USDC', symbol: 'USDC', address: '0xA0b8...E848', icon: '/usdc-logo.svg' },
  { name: 'Tether', symbol: 'USDT', address: '0xdAC1...1EC7', icon: '/usdt-logo.svg' },
  { name: 'Wrapped Bitcoin', symbol: 'WBTC', address: '0x2260...C599', icon: '/wbtc-logo.svg' },
  { name: 'Base ETH', symbol: 'ETH', address: '', icon: '/baseeth-logo.svg' },
]

export function SendBox() {
  const [amount, setAmount] = useState('0.00')
  const [isUSD, setIsUSD] = useState(true)
  const [walletAddress, setWalletAddress] = useState('')

  const [selectedToken, setSelectedToken] = useState(tokens[0])

  const exchangeRate = 0.00035

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setAmount(value)
  }
  const toggleCurrency = () => {
    if (isUSD) {
      const ethValue = (parseFloat(amount) * exchangeRate).toFixed(6)
      setAmount(isNaN(parseFloat(ethValue)) ? '0.00' : ethValue)
    } else {
      const usdValue = (parseFloat(amount) / exchangeRate).toFixed(2)
      setAmount(isNaN(parseFloat(usdValue)) ? '0.00' : usdValue)
    }
    setIsUSD(!isUSD)
  }

  return (
    <Card className="bg-gray-800 text-white p-6 rounded-lg space-y-4 w-full max-w-md">
      {/*Send Mount */}
      <div className="text-center">
        <p className="text-gray-400 text-sm text-start">Send</p>
        <div className="flex items-center justify-center text-4xl font-semibold space-x-2">
          <span className="text-gray-500">{isUSD ? 'USD' : 'ETH'}</span>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="bg-transparent border-none outline-none text-white text-4xl font-semibold text-center w-28"
          />
        </div>
        <div className="flex flex-grow items-center justify-center mt-2">
          <p className="text-gray-500 text-sm">
            {isUSD
              ? `${(parseFloat(amount) * exchangeRate || 0).toFixed(6)} ETH`
              : `$${(parseFloat(amount) / exchangeRate || 0).toFixed(2)} USD`}
          </p>
          <button onClick={toggleCurrency} className="text-gray-400 hover:text-white transition">
            <IoSwapVerticalSharp className="ml-2" size={15} />
          </button>
        </div>
      </div>
      {/*Token selector*/}
      <div className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer">
        <TokenSelector onSelectAction={(token) => setSelectedToken(token)} />
      </div>
      {/* Wallet addres*/}
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
    </Card>
  )
}
