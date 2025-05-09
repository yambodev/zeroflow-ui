'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { LuPackageSearch } from 'react-icons/lu'
// import { TbArrowForwardUp } from 'react-icons/tb'
import { HiMiniArrowsUpDown } from 'react-icons/hi2'
import { IoArrowRedoSharp } from 'react-icons/io5'
import { Token } from '@/mock/tokens'

const timeRanges = ['1H', '1D', '1W', '1M', '1Y'] as const
type TimeRange = (typeof timeRanges)[number]

const dummyData: Record<TimeRange, number[]> = {
  '1H': [5, 7, 3, 4, 6],
  '1D': [10, 25, 15, 40, 5],
  '1W': [20, 5, 35, 10, 10, 25, 30, 15, 20, 10, 12, 6, 2],
  '1M': [10, 20, 15, 30, 25, 5, 12, 8, 18, 9],
  '1Y': [30, 40, 35, 50, 45, 55, 60],
}

const dummyDates: Record<TimeRange, string[]> = {
  '1H': ['11:00', '11:15', '11:30', '11:45', '12:00'],
  '1D': ['8AM', '10AM', '12PM', '2PM', '4PM'],
  '1W': [
    'Apr 10',
    'Apr 11',
    'Apr 11',
    'Apr 12',
    'Apr 12',
    'Apr 13',
    'Apr 13',
    'Apr 14',
    'Apr 15',
    'Apr 15',
    'Apr 16',
    'Apr 16',
    'Apr 17',
  ],
  '1M': ['Apr 1', 'Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 28', 'Apr 29', 'Apr 30', 'May 1'],
  '1Y': ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
}

export default function TokenChartSection({
  baseToken,
  quoteToken,
  price,
  fee = '1%',
  version = 'v3',
  onSwap,
}: {
  baseToken: Token
  quoteToken: Token
  price?: number
  fee?: string
  version?: string
  onSwap: () => void
}) {
  const [range, setRange] = useState<TimeRange>('1W')
  const values = dummyData[range]
  const labels = dummyDates[range]
  const max = Math.max(...values)

  return (
    <Card className="bg-background w-full mx-auto text-foreground p-4">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div className="flex gap-3">
            <CardTitle className="text-xl">
              {baseToken.slug}/{quoteToken.slug}
            </CardTitle>
            <div className="flex gap-2 items-center mt-1 text-muted-foreground text-xs">
              <span className="bg-muted rounded-sm px-2 py-0.5">{version}</span>
              <span className="bg-muted rounded-sm px-2 py-0.5">{fee}</span>
              <HiMiniArrowsUpDown className="w-5 h-5 cursor-pointer" onClick={onSwap} />
            </div>
          </div>
          {/* íconos */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-3xl font-bold">${price ?? baseToken.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">{range === '1W' ? 'Past week' : 'Last period'}</p>
        </div>
        <div className="relative h-52 flex items-end gap-1 mb-4 overflow-x-auto scrollbar-hide px-1">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col justify-end items-center flex-1 h-full">
              <div
                className="w-[40px] rounded-xs bg-pink-500 transition-all"
                style={{ height: `${(v / max) * 100}%`, minHeight: '4px' }}
              ></div>
              <span className="text-xs text-muted-foreground mt-1">{labels[i]}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-start gap-2">
          {timeRanges.map((t) => (
            <Button
              key={t}
              variant={t === range ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setRange(t)}
              className="rounded-full px-3 text-[0.65rem] sm:text-xs"
            >
              {t}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
