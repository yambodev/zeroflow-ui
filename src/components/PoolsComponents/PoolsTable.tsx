'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockTokens } from '@/mock/tokens'
import { useRouter } from 'next/navigation'

interface PoolData {
  id: number
  pair: string
  version: string
  fee: string
  tvl: string
  apr: string
  volume1d: string
  volume30d: string
  ratio: string
  poolId: string
}

export default function PoolsTable() {
  const router = useRouter()

  const data: PoolData[] = []

  mockTokens.forEach((token) => {
    token.pools?.forEach((pool, index) => {
      data.push({
        id: data.length + 1,
        pair: `${token.slug}/${pool.pairWith}`,
        version: pool.version,
        fee: pool.fee,
        tvl: pool.tvl,
        apr: pool.apr,
        volume1d: pool.volume1d,
        volume30d: pool.volume30d,
        ratio: pool.ratio,
        poolId: `${token.slug}-${pool.pairWith}-${index}`,
      })
    })
  })

  const handleRowClick = (poolId: string) => {
    router.push(`/explore/pools/base/${poolId}`)
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="[&_th]:bg-gray-100 [&_th]:dark:bg-gray-800 [&_tr:hover]:bg-gray-50 [&_tr:hover]:dark:bg-gray-800">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Pool</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Comition</TableHead>
            <TableHead>TVL</TableHead>
            <TableHead>APR</TableHead>
            <TableHead>Vol. 1d</TableHead>
            <TableHead>Vol. 30d</TableHead>
            <TableHead>Vol 1 day/TVL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((pool) => (
            <TableRow
              key={pool.id}
              className="cursor-pointer hover:bg-muted transition"
              onClick={() => handleRowClick(pool.poolId)}
            >
              <TableCell className="font-medium">{pool.id}</TableCell>
              <TableCell className="font-medium">{pool.pair}</TableCell>
              <TableCell>{pool.version}</TableCell>
              <TableCell>{pool.fee}</TableCell>
              <TableCell>{pool.tvl}</TableCell>
              <TableCell>{pool.apr}</TableCell>
              <TableCell>{pool.volume1d}</TableCell>
              <TableCell>{pool.volume30d}</TableCell>
              <TableCell className="items-center justify-center flex">{pool.ratio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
