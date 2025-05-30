'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CopyIcon } from 'lucide-react'
import { PiLinkSimpleBold } from 'react-icons/pi'
import { Token } from '@/mock/tokens'

type PoolLinksCardProps = {
  baseToken: Token
  quoteToken: Token
}

const generateMockAddress = (key: string) => `0x${key.slice(0, 4)}...${key.slice(-4)}`

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text)
}

const LinkRow = ({ label, address }: { label: string; address: string }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2">
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="bg-secondary hover:bg-secondary/60 border rounded-md px-2 py-0.5 text-xs text-muted-foreground w-full">
        {address}
      </span>
      <Button variant="ghost" size="icon" onClick={() => handleCopy(address)} className="rounded-full bg-secondary">
        <CopyIcon className="w-4 h-4" />
      </Button>
      <Button
        className="rounded-full bg-secondary"
        variant="ghost"
        size="icon"
        onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
      >
        <PiLinkSimpleBold className="w-4 h-4" />
      </Button>
    </div>
  </div>
)

export const PoolLinksCard = ({ baseToken, quoteToken }: PoolLinksCardProps) => {
  const pool = baseToken.pools?.find((pool) => pool.pairWith === quoteToken.slug)

  if (!pool) return null

  const poolAddress = generateMockAddress(pool.poolId)
  const baseAddress = generateMockAddress(baseToken.slug)
  const quoteAddress = generateMockAddress(quoteToken.slug)

  return (
    <Card className="bg-background text-foreground rounded-2xl p-4 w-full shadow-md">
      <CardContent className="space-y-4 p-0">
        <h3 className="text-lg font-semibold text-wite">Links</h3>
        <div className="space-y-3">
          <LinkRow label={`${baseToken.slug} / ${quoteToken.slug}`} address={poolAddress} />
          <LinkRow label={`${baseToken.slug}`} address={baseAddress} />
          <LinkRow label={`${quoteToken.slug}`} address={quoteAddress} />
        </div>
      </CardContent>
    </Card>
  )
}
