import { mockTokens } from '@/mock/tokens'
import { notFound } from 'next/navigation'
import { TokenChartSection } from '@/components/PoolsComponents/TokenChartSection'
import { PoolStatsCard } from '@/components/PoolsComponents/PoolStatsCard'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TransactionsTable } from '@/components/PoolsComponents/TransactionsTable'
import { RiTokenSwapFill } from 'react-icons/ri'
import { MdAdd } from 'react-icons/md'

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
      <div className="h-full w-full flex flex-col gap-6">
        <TokenChartSection pair={token.name} version="v3" fee="1%" price={token.price.toFixed(2)} />
        <div className="border-t border-muted my-4 mt-10" />
        <h2 className="text-2xl font-bold text-foreground mt-6">Transactions</h2>
        <TransactionsTable />
      </div>
      {/*right Section */}
      <div className="h-full flex flex-col w-full gap-5">
        <div className="flex flex-grow gap-5 w-[180px]">
          <Button className="bg-pink-500/20 hover:bg-pink-400/20 text-lg w-full flex flex-grow text-pink-500 hover:text-pink-400 rounded-xl h-[40px]">
            <RiTokenSwapFill />
            <p>Swap</p>
          </Button>
          <Button className="bg-pink-500/20 hover:bg-pink-400/20 w-full text-lg text-pink-500 hover:text-pink-400 rounded-xl h-[40px]">
            <MdAdd />
            <p>Add liquidity</p>
          </Button>
        </div>
        <Card className="bg-muted text-foreground rounded-2xl p-6 w-full max-w-sm shadow-md space-y-2">
          <CardContent className="space-y-6 p-0">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-400">Total APR</p>
              <p className="text-3xl font-semibold">77.24%</p>
            </div>
          </CardContent>
        </Card>
        <PoolStatsCard />
      </div>
    </div>
  )
}
