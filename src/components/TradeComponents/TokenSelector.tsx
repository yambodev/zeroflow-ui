'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const tokens = [
  { name: 'Ethereum', symbol: 'ETH', address: '', icon: '/eth-logo.svg' },
  { name: 'USDC', symbol: 'USDC', address: '0xA0b8...E848', icon: '/usdc-logo.svg' },
  { name: 'Tether', symbol: 'USDT', address: '0xdAC1...1EC7', icon: '/usdt-logo.svg' },
  { name: 'Wrapped Bitcoin', symbol: 'WBTC', address: '0x2260...C599', icon: '/wbtc-logo.svg' },
  { name: 'Base ETH', symbol: 'BETH', address: '', icon: '/baseeth-logo.svg' },
]

export function TokenSelector({ onSelectAction }: { onSelectAction: (token: any) => void }) {
  const [selectedToken, setSelectedToken] = useState(tokens[0])

  const handleSelect = (token: any) => {
    setSelectedToken(token)
    onSelectAction(token)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full bg-gray-900 hover:bg-gray-900 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white">{selectedToken.symbol}</span>
          </div>
          <ChevronDown className="text-gray-400" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-black text-white p-2 rounded-lg">
        <Command>
          <CommandInput placeholder="Search tokens..." />
          <CommandGroup>
            {tokens.map((token) => (
              <CommandItem
                key={token.symbol}
                onSelect={() => handleSelect(token)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-800 rounded-md cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-white">{token.name}</span>
                  <span className="text-gray-400 text-xs">
                    {token.symbol} {token.address && `• ${token.address}`}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
