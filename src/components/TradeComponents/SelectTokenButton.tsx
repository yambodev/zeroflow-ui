'use client'

import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { Button } from '../ui/button'
import { TokenSelector } from './TokenSelector'
import { Token } from '@/mock/tokens'
import { cn } from '@/lib/utils'

interface SelectTokenButtonProps {
  label: string | undefined
  onTokenSelect: (token: Token) => void
  token: Token | null
  variant?: 'default' | 'secondary'
}

export function SelectTokenButton({ label = 'select token', token, onTokenSelect, variant }: SelectTokenButtonProps) {
  const [openTokenSelector, setOpenTokenSelector] = useState(false)

  const handleSelectToken = (token: Token) => {
    setOpenTokenSelector(false)
    onTokenSelect(token)
  }

  return (
    <>
      <Button
        className={cn(
          'flex items-center text-sm px-3 py-1 rounded-full transition-colors ',
          variant === 'secondary'
            ? 'bg-transparent hover:bg-transparent text-[15px] text-white'
            : token
              ? 'bg-secondary hover:bg-[#333] text-white border-gray-200 border border-gray-600'
              : 'bg-pink-500 hover:bg-pink-600 text-white border-white',
        )}
        onClick={() => setOpenTokenSelector(true)}
      >
        {token ? token.slug : label}
        {variant !== 'secondary' && (
          <span className="ml-1">
            <IoIosArrowDown />
          </span>
        )}
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
