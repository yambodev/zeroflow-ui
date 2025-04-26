'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const mockTransactions = [
  {
    time: '4h',
    type: 'Sell USDC',
    usd: '$112,072.19',
    usdc: '112,060.49',
    eth: '62.3234',
    wallet: '0x5006...a63e',
  },
  {
    time: '4h',
    type: 'Sell USDC',
    usd: '$64,122.97',
    usdc: '64,098.56',
    eth: '35.6687',
    wallet: '0x72bb...5B2A',
  },
  {
    time: '4h',
    type: 'Sell USDC',
    usd: '$21,006.56',
    usdc: '20,995.75',
    eth: '11.6866',
    wallet: '0x4360...B8Dd',
  },
  {
    time: '4h',
    type: 'Sell USDC',
    usd: '$101.10',
    usdc: '101.051',
    eth: '0.05624',
    wallet: '0x2823...76f2',
  },
  {
    time: '4h',
    type: 'Buy USDC',
    usd: '$89.83',
    usdc: '89.733',
    eth: '0.05',
    wallet: '0x3465...C666',
  },
  {
    time: '4h',
    type: 'Buy USDC',
    usd: '$17.94',
    usdc: '17.9197',
    eth: '0.00999',
    wallet: '0xC08E...7320',
  },
  {
    time: '4h',
    type: 'Sell USDC',
    usd: '$47,794.85',
    usdc: '47,765.10',
    eth: '26.5925',
    wallet: '0xAd35...5299',
  },
  {
    time: '4h',
    type: 'Remove',
    usd: '$6,096.63',
    usdc: '3,233.37',
    eth: '1.59209',
    wallet: '0xEF6a...CEBf',
  },
]

export function TransactionsTable() {
  return (
    <div className="p-6 pb-2">
      <div className="overflow-x-auto rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-secondary">
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>USD</TableHead>
              <TableHead>USDC</TableHead>
              <TableHead>ETH</TableHead>
              <TableHead>Wallet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((tx, index) => (
              <TableRow key={index} className="hover:bg-muted/20  transition-colors">
                <TableCell>{tx.time}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'font-medium',
                      tx.type.startsWith('Buy')
                        ? 'text-green-500'
                        : tx.type.startsWith('Sell')
                          ? 'text-red-500'
                          : 'text-foreground',
                    )}
                  >
                    {tx.type}
                  </span>
                </TableCell>
                <TableCell>{tx.usd}</TableCell>
                <TableCell>{tx.usdc}</TableCell>
                <TableCell>{tx.eth}</TableCell>
                <TableCell className="text-muted-foreground">{tx.wallet}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
