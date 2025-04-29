'use client'

import React, { ReactNode } from 'react'
import ConnectWalletButton from '../ui/connect-wallet-button'

interface TradeContainerProps {
  children: ReactNode
}

export const TradeContainer: React.FC<TradeContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center pt-20 pb-8 px-4 md:pt-24">
        <div className="w-full max-w-md flex flex-col items-center space-y-6">
          {children}
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  )
}
