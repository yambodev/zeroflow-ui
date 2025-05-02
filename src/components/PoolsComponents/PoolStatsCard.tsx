'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Token } from '@/mock/tokens'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

type PoolStatsCardProps = {
  base: Token
  quote: Token
}

export default function PoolStatsCard({ base, quote }: PoolStatsCardProps) {
  const pools = base.pools ?? []
  const matchedPool = pools.find((p) => p.pairWith === quote.slug) ?? pools[0]

  const parseUSD = (val: string) => parseFloat(val.replace(/[$MK]/g, '').trim())
  const baseAmount = parseUSD(matchedPool?.tvl ?? '0')
  const quoteAmount = baseAmount * parseFloat(matchedPool?.ratio ?? '1')
  const total = baseAmount + quoteAmount
  const basePercent = total > 0 ? (baseAmount / total) * 100 : 0

  return (
    <Card className="bg-muted text-foreground rounded-2xl p-6 py-8 w-full shadow-md space-y-2">
      <CardHeader className="p-0">
        <h2 className="text-2xl font-semibold text-foreground">
          Stats ({base.slug}/{quote.slug})
        </h2>
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        {/* Pool balances */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400">Pool balance</p>
          <div className="flex justify-between text-sm font-medium">
            <span>
              {baseAmount.toFixed(1)}M {base.slug}
            </span>
            <span>
              {quoteAmount.toFixed(1)}K {quote.slug}
            </span>
          </div>
          <div className="h-2 bg-muted-foreground/10 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${basePercent}%` }} />
          </div>
        </div>

        {/* TVL */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400">TVL</p>
          <div className="flex items-center justify-between gap-2">
            <div className="text-3xl font-semibold">{matchedPool?.tvl}</div>
            <div className="flex text-green-500 items-center">
              <IoMdArrowDropup />
              <span className="text-sm text-gray-400 ml-1">11.48%</span>
            </div>
          </div>
        </div>

        {/* Volume */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400">24H Volume</p>
          <div className="flex items-center justify-between gap-2">
            <div className="text-3xl font-semibold">{matchedPool?.volume1d}</div>
            <div className="flex text-red-500 items-center">
              <IoMdArrowDropdown />
              <span className="text-sm text-gray-400 ml-1">38.23%</span>
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400">24H Fees</p>
          <p className="text-3xl font-semibold">$77.9K</p>
        </div>
      </CardContent>
    </Card>
  )
}
