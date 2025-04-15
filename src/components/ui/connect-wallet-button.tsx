import React from 'react'
import { Button } from '@/components/ui/button'

const ConnectWalletButton = () => {
  return (
    <>
      <Button className="bg-pink-700/20 hover:bg-pink-600/25 w-full py-6 text-lg text-pink-500 rounded-full cursor-pointer mt-1">
        Connect Wallet
      </Button>
    </>
  )
}

export default ConnectWalletButton
