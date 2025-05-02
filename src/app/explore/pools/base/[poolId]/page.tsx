'use client'

import { mockTokens } from '@/mock/tokens'
import { notFound } from 'next/navigation'
import { TokenChartSection, PoolRightSection, TransactionsTable } from '@/components/PoolsComponents'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface TokenPageProps {
  params: {
    poolId: string
  }
}

export default function TokenPage() {
  const { poolId } = useParams()

  const token = mockTokens.find(
    (t) =>
      `${t.slug}-${t.pools?.find((pool) => pool.pairWith)!.pairWith}-${t.pools?.findIndex((pool) => pool.pairWith === t.pools?.[0].pairWith)}` ===
      poolId,
  )
  if (!token || !token.pools?.length) return notFound()

  const defaultPair = token.pools[0]
  const pairToken = mockTokens.find((t) => t.slug === defaultPair.pairWith || t.name === defaultPair.pairWith)

  if (!pairToken) return notFound()

  const [baseToken, setBaseToken] = useState(token)
  const [quoteToken, setQuoteToken] = useState(pairToken)

  const handleSwapTokens = () => {
    setBaseToken(quoteToken)
    setQuoteToken(baseToken)
  }

  return (
    <div className="flex flex-grow gap-20 md:p-[100px] w-full">
      <div className="h-full w-[70%] flex flex-grow flex-col gap-6">
        <TokenChartSection baseToken={baseToken} quoteToken={quoteToken} onSwap={handleSwapTokens} />
        <div className="border-t border-muted my-4 mt-10" />
        <h2 className="text-2xl font-bold text-foreground mt-6">Transactions</h2>
        <TransactionsTable />
      </div>

      <PoolRightSection baseToken={baseToken} quoteToken={quoteToken} />
    </div>
  )
}
