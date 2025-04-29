'use client'

import { useState } from 'react'
import { PoolStatsCard } from '@/components/PoolsComponents'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RiTokenSwapFill } from 'react-icons/ri'
import { MdAdd } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'

const PoolRightSection = () => {
  const [openSwap, setOpenSwap] = useState(false)

  return (
    <div className="h-full flex flex-col w-[30%] gap-5">
      <div className="flex gap-2 flex-row ">
        {openSwap ? (
          <Button
            className="bg-[#181818] hover:bg-[#333] text-lg text-gray-400 w-[50%]  rounded-xl "
            onClick={() => setOpenSwap(false)}
          >
            <IoClose />
            <p>Close</p>
          </Button>
        ) : (
          <Button
            className="bg-pink-500/20 hover:bg-pink-400/20 text-lg w-[50%] text-pink-500 hover:text-pink-400 rounded-xl "
            onClick={() => setOpenSwap(true)}
          >
            <RiTokenSwapFill className="text-2xl" />
            <p>Swap</p>
          </Button>
        )}
        <Button className="bg-pink-500/20 hover:bg-pink-400/20 text-lg w-[50%] text-pink-500 hover:text-pink-400 rounded-xl ">
          <MdAdd />
          <p>Add liquidity</p>
        </Button>
      </div>
      {openSwap ? (
        <></>
      ) : (
        <Card className="bg-muted text-foreground rounded-2xl p-6 w-full shadow-md space-y-2">
          <CardContent className="space-y-6 p-0">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-400">Total APR</p>
              <p className="text-3xl font-semibold">77.24%</p>
            </div>
          </CardContent>
        </Card>
      )}
      <PoolStatsCard />
    </div>
  )
}

export default PoolRightSection
