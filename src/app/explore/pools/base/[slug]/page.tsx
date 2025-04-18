import { mockTokens } from '@/mock/tokens'
import { notFound } from 'next/navigation'
import { TokenChartSection } from '@/components/PoolsComponents/TokenChartSection'

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
    <div className="p-6 md:p-[100px]">
      <TokenChartSection pair={token.name} version="v3" fee="1%" price={token.price.toFixed(2)} />
    </div>
  )
}
