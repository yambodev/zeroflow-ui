'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export const useWallet = () => {
  const { address, isConnected } = useAccount()
  const { connectors, connectAsync, isPending } = useConnect()
  const { disconnectAsync } = useDisconnect()

  const connectWallet = async () => {
    const metamask = connectors.find((c) => c.name === 'MetaMask')
    if (metamask) {
      try {
        await connectAsync({ connector: metamask })
      } catch (err) {
        console.error('Wallet connection failed:', err)
      }
    } else {
      console.warn('MetaMask connector not found')
    }
  }

  const disconnectWallet = async () => {
    try {
      await disconnectAsync()
    } catch (err) {
      console.error('Wallet disconnect failed:', err)
    }
  }

  return {
    address,
    isConnected,
    isConnecting: isPending,
    connectWallet,
    disconnectWallet,
  }
}
