import { useState } from 'react'
import { Card } from '../ui/card'
import { IoIosArrowDown } from 'react-icons/io'
import { TokenSelector } from './TokenSelector'
import { Token } from '@/mock/tokens'
import { Button } from '../ui/button'

interface SwapCardProps {
  label: string
  value: string
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  currency: string
  isSelected: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
}

export function SwapCard({ label, value, onValueChange, currency, isSelected, inputRef }: SwapCardProps) {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [openTokenSelector, setOpenTokenSelector] = useState(false)

  const handleSelectToken = (token: Token) => {
    setSelectedToken(token)
    setOpenTokenSelector(false)
  }

  return (
    <Card className={`p-4 cursor-pointer rounded-xl ${isSelected ? 'bg-background' : 'bg-secondary'} m-1`}>
      <div className="rounded-xl gap-3 flex flex-col">
        <p className="text-sm">{label}</p>
        <input
          ref={inputRef}
          type="number"
          value={value}
          disabled={!isSelected}
          onChange={onValueChange}
          className="bg-transparent w-full text-3xl outline-none"
          placeholder="0"
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">$0</p>
          <Button
            className={`flex items-center ${isSelected ? 'bg-secondary hover:bg-[#333]' : 'bg-pink-500 hover:bg-pink-600'} text-sm px-3 py-1 rounded-full`}
            onClick={() => setOpenTokenSelector(true)}
          >
            {selectedToken ? selectedToken.slug : currency}
            <span className="ml-1">
              <IoIosArrowDown />
            </span>
          </Button>
        </div>
      </div>
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
