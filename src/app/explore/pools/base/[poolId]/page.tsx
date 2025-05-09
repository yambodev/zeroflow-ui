'use client'

import { mockTokens } from '@/mock/tokens'
import { notFound } from 'next/navigation'
import { TokenChartSection, PoolRightSection, TransactionsTable } from '@/components/PoolsComponents'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function TokenPage() {
  const { poolId } = useParams()

  if (typeof poolId !== 'string') return notFound()

  let foundPool = null
  let baseToken = null
  let quoteToken = null

  for (const token of mockTokens) {
    for (const pool of token.pools || []) {
      if (pool.poolId === poolId) {
        foundPool = pool
        baseToken = token
        quoteToken = mockTokens.find((t) => t.slug === pool.pairWith || t.name === pool.pairWith)
        break
      }
    }
    if (foundPool) break
  }

  if (!foundPool || !baseToken || !quoteToken) return notFound()

  const [base, setBaseToken] = useState(baseToken)
  const [quote, setQuoteToken] = useState(quoteToken)

  const handleSwapTokens = () => {
    setBaseToken(quote)
    setQuoteToken(base)
  }

  return (
    <div className="flex flex-grow gap-20 md:p-[100px] w-full">
      <div className="h-full w-[70%] flex flex-grow flex-col gap-6">
        <TokenChartSection baseToken={base} quoteToken={quote} onSwap={handleSwapTokens} />
        <div className="border-t border-muted my-4 mt-10" />
        <h2 className="text-2xl font-bold text-foreground mt-6">Transactions</h2>
        <TransactionsTable />
      </div>

      <PoolRightSection baseToken={base} quoteToken={quote} />
    </div>
  )
}
