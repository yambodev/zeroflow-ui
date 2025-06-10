'use client'

import { mockTokens, Token } from '@/mock/tokens'
import { notFound } from 'next/navigation'
import { TokenChartSection, PoolRightSection, TransactionsTable } from '@/components/PoolsComponents'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function TokenPage() {
  // 1) first hook
  const params = useParams() as { poolId: string }
  const { poolId } = params

  // 2) compute initial values *before* any hook calls below
  const initial = (() => {
    if (typeof poolId !== 'string') return null

    for (const token of mockTokens) {
      for (const pool of token.pools || []) {
        if (pool.poolId === poolId) {
          const base = token
          const quote = mockTokens.find((t) => t.slug === pool.pairWith || t.name === pool.pairWith) ?? null
          if (!quote) return null
          return { base, quote }
        }
      }
    }
    return null
  })()

  // 3) now call your state hooks unconditionally
  const [base, setBaseToken] = useState<Token | null>(initial?.base ?? null)
  const [quote, setQuoteToken] = useState<Token | null>(initial?.quote ?? null)

  // 4) only *after* hooks can you early-return for 404
  if (!initial) {
    return notFound()
  }

  const handleSwapTokens = () => {
    setBaseToken(quote)
    setQuoteToken(base)
  }

  return (
    <div className="flex flex-grow gap-20 md:p-[100px] w-full">
      <div className="h-full w-[70%] flex flex-grow flex-col gap-6">
        <TokenChartSection baseToken={base!} quoteToken={quote!} onSwap={handleSwapTokens} />
        <div className="border-t border-muted my-4 mt-10" />
        <h2 className="text-2xl font-bold text-foreground mt-6">Transactions</h2>
        <TransactionsTable />
      </div>

      <PoolRightSection baseToken={base!} quoteToken={quote!} />
    </div>
  )
}
