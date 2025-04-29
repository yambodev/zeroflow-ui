'use client'

import React, { ReactNode } from 'react'
import ConnectWalletButton from '../ui/connect-wallet-button'
import { TradeTabs } from './TradeTabs'

interface TradeContainerProps {
  children: ReactNode
  widget?: boolean
}

export const TradeContainer: React.FC<TradeContainerProps> = ({ children, widget }) => {
  return (
    <div
      className={` ${!widget && 'bg-gradient-to-b min-h-screen  from-black to-gray-900 pt-20 md:pt-24 pb-8  px-4'} text-white flex flex-col`}
    >
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-md flex flex-col items-center space-y-6">
          {!widget && <TradeTabs />}
          {children}
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  )
}
