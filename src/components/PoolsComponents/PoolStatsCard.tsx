'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

export function PoolStatsCard() {
  const usdc = 29.4
  const eth = 51.3
  const total = usdc + eth
  const usdcPercent = (usdc / total) * 100

  return (
    <Card className="bg-muted text-foreground rounded-2xl p-6 py-8 w-full shadow-md space-y-2">
      <CardHeader className="p-0">
        <h2 className="text-2xl font-semibold text-foreground">Stats</h2>
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        {/* Pool balances */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400">Pool balance</p>
          <div className="flex justify-between text-sm font-medium">
            <span>{usdc}M USDC</span>
            <span>{eth}K ETH</span>
          </div>
          <div className="h-2 bg-muted-foreground/10 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${usdcPercent}%` }} />
          </div>
        </div>

        {/* TVL */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400">TVL</p>
          <div className="flex items-center justify-between gap-2">
            <div className="text-3xl font-semibold">$116.5M</div>
            <div className="justify-start items-start flex flex-grow">
              <div className="text-green-500 text-lg flex items-end font-medium">
                <IoMdArrowDropup />
              </div>
              <div className="text-gray-400 flex text-start items-start text-sm font-medium">11.48%</div>
            </div>
          </div>
        </div>

        {/* 24H Volume */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400">24H Volume</p>
          <div className="flex items-center justify-between gap-2">
            <div className="text-3xl font-semibold">$155.9M</div>
            <div className="justify-start items-start flex flex-grow">
              <div className="text-red-500 text-lg flex items-end font-medium">
                <IoMdArrowDropdown />
              </div>
              <div className="text-gray-400 flex text-start items-start text-sm font-medium">38.23%</div>
            </div>
          </div>
        </div>

        {/* 24H Fees */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400">24H Fees</p>
          <p className="text-3xl font-semibold">$77.9K</p>
        </div>
      </CardContent>
    </Card>
  )
}
