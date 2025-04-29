import { mockTokens } from '@/mock/tokens'
import { notFound } from 'next/navigation'
import { TokenChartSection, PoolRightSection, TransactionsTable } from '@/components/PoolsComponents'

interface TokenPageProps {
  params: {
    slug: string
  }
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { slug } = await Promise.resolve(params)

  const token = mockTokens.find((t) => t.slug === slug)

  if (!token) {
    return notFound()
  }

  return (
    <div className="flex flex-grow gap-20 md:p-[100px] w-full">
      {/*Left section */}
      <div className="h-full w-[70%] flex flex-grow flex-col gap-6">
        <TokenChartSection pair={token.name} version="v3" fee="1%" price={token.price.toFixed(2)} />
        <div className="border-t border-muted my-4 mt-10" />
        <h2 className="text-2xl font-bold text-foreground mt-6">Transactions</h2>
        <TransactionsTable />
      </div>
      {/*right Section */}
      <PoolRightSection />
    </div>
  )
}
