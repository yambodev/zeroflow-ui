import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { Button } from '../ui/button'
import { TokenSelector } from './TokenSelector'
import { Token } from '@/mock/tokens'

interface SelectTokenButtonProps {
  label: string | undefined
  onTokenSelect: (token: Token) => void
  token: Token | null
}

export function SelectTokenButton({ label = 'select token', token, onTokenSelect }: SelectTokenButtonProps) {
  const [openTokenSelector, setOpenTokenSelector] = useState(false)

  const handleSelectToken = (token: Token) => {
    setOpenTokenSelector(false)
    onTokenSelect(token)
  }

  return (
    <>
      <Button
        className={`flex items-center ${
          token ? 'bg-secondary hover:bg-[#333]' : 'bg-pink-500 hover:bg-pink-600'
        } text-sm px-3 py-1 rounded-full text-white`}
        onClick={() => setOpenTokenSelector(true)}
      >
        {token ? token.slug : label}
        <span className="ml-1">
          <IoIosArrowDown />
        </span>
      </Button>
      {openTokenSelector && (
        <TokenSelector
          open={openTokenSelector}
          onOpenAction={setOpenTokenSelector}
          onSelectAction={handleSelectToken}
        />
      )}
    </>
  )
}
