'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { mockTokens, Token } from '@/mock/tokens'
import { Input } from '../ui/input'

type TokenSelectorProps = {
  onSelectAction: (token: Token) => void
  open: boolean
  onOpenAction: (open: boolean) => void
}

export const TokenSelector = ({ onSelectAction, open, onOpenAction }: TokenSelectorProps) => {
  const [search, setSearch] = useState('')

  const filteredTokens = mockTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.slug.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelectToken = (token: Token) => {
    onSelectAction(token)
    onOpenAction(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenAction}>
      <DialogContent className="min-w-[100px] w-full min-h-[700px] rounded-2xl">
        <DialogTitle>Selecciona un token</DialogTitle>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar token" className="mb-4" />
        <div className="max-h-130 overflow-y-auto space-y-2 custom-scrollbar rounded-lg">
          {filteredTokens.map((token) => (
            <div
              key={token.slug}
              className="flex justify-between items-center p-2 rounded-md hover:bg-muted cursor-pointer"
              onClick={() => handleSelectToken(token)}
            >
              <div>
                <p className="font-medium">{token.name}</p>
                <p className="text-sm text-muted-foreground">{token.slug}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">${token.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
