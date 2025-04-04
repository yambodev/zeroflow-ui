'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowDown } from 'react-icons/fa6'
import ConnectWalletButton from '../ui/connect-wallet-button'
import { Card } from '../ui/card'
import { IoIosArrowDown } from 'react-icons/io'

export function SwapBox() {
  const [sellValue, setSellValue] = useState('')
  const [buyValue, setBuyValue] = useState('')
  const [sellCurrency, setSellCurrency] = useState('ETH')
  const [buyCurrency, setBuyCurrency] = useState('Select token')
  const [selected, setSelected] = useState('sell')

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
      {/* Card (Sell) */}
      <Card className={`p-4 cursor-pointer rounded-xl ${selected === 'sell' ? 'bg-background' : 'bg-secondary'} m-1`}>
        <div className="rounded-xl gap-3 flex flex-col">
          <p className="text-sm">Sell</p>
          <input
            ref={sellInputRef}
            type="number"
            value={sellValue}
            disabled={selected !== 'sell'}
            onChange={(e) => setSellValue(e.target.value)}
            className="bg-transparent w-full text-3xl outline-none"
            placeholder="0"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">$0</p>
            <button
              className={`flex items-center ${selected === 'buy' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-secondary hover:bg-[#333]'}  text-sm px-3 py-1 rounded-full`}
            >
              {sellCurrency}
              <span className="ml-1">
                <IoIosArrowDown />
              </span>
            </button>
          </div>
        </div>
      </Card>

      {/* Swap button */}
      <div className="flex justify-center z-10 absolute w-full left-0 top-[calc(50%-46px)]">
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

      {/* Card (Buy) */}
      <Card className={`p-4 cursor-pointer rounded-xl ${selected === 'buy' ? 'bg-background' : 'bg-secondary'} m-1`}>
        <div className="rounded-xl gap-3 flex flex-col">
          <p className="text-sm">Buy</p>
          <input
            ref={buyInputRef}
            type="number"
            value={buyValue}
            disabled={selected !== 'buy'}
            onChange={(e) => setBuyValue(e.target.value)}
            className="bg-transparent w-full text-3xl outline-none"
            placeholder="0"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">$0</p>
            <button
              className={`flex items-center ${selected === 'sell' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-secondary hover:bg-[#333]'}  text-white text-sm px-3 py-1 rounded-full`}
            >
              {buyCurrency}
              <span className="ml-1">
                <IoIosArrowDown />
              </span>
            </button>
          </div>
        </div>
      </Card>

      <ConnectWalletButton />
    </div>
  )
}
