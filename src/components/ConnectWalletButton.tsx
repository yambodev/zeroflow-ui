'use client'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

export function ConnectWalletButton() {
  const [selectedWallet, setSelectedWallet] = useState<any>(null)

  const mockWallets = [
    {
      address: '0xe7ac...bf2a',
      username: 'wyqbjswzlqzm',
      created: '5/28/25, 2:24 AM',
      updated: '1/1/70, 12:00 AM',
      cpu: '0 μs',
      net: '0 bytes',
      linked: true,
    },
    {
      address: '0xa4c2...e81f',
      username: 'testuserwallet',
      created: '5/27/25, 3:00 PM',
      updated: '1/1/70, 12:00 AM',
      cpu: '500 μs',
      net: '200 bytes',
      linked: false,
    },
  ]

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="absolute top-0 right-0 m-4 text-pink-500 hover:text-pink-400 cursor-pointer rounded-xl bg-pink-500/20 hover:bg-pink-400/20
                      px-3 py-1 text-[10px] md:px-4 md:py-2 md:text-base"
          >
            Connect Wallet
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-black border-gray-800 text-white w-60">
          {mockWallets.map((wallet, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => setSelectedWallet(wallet)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-800"
            >
              {wallet.address}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={!!selectedWallet} onOpenChange={(open) => !open && setSelectedWallet(null)}>
        <DialogContent className="bg-black border-gray-800 sm:max-w-[425px] text-white">
          <DialogHeader className="relative">
            <DialogTitle className="text-center">Account Found</DialogTitle>
          </DialogHeader>
          {selectedWallet && (
            <div className="space-y-2 px-4 py-2 text-sm">
              <p className="text-gray-400">
                Wire Username: <span className="text-white">{selectedWallet.username}</span>
              </p>
              <p className="text-gray-400">
                Created: <span className="text-white">{selectedWallet.created}</span>
              </p>
              <p className="text-gray-400">
                Last Updated: <span className="text-white">{selectedWallet.updated}</span>
              </p>
              <p className="text-gray-400">
                CPU Available: <span className="text-white">{selectedWallet.cpu}</span>
              </p>
              <p className="text-gray-400">
                NET Available: <span className="text-white">{selectedWallet.net}</span>
              </p>
              <div className="mt-4 bg-gray-900 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Link Status:</p>
                <p className={`text-sm font-semibold ${selectedWallet.linked ? 'text-green-400' : 'text-red-500'}`}>
                  {selectedWallet.linked ? 'Linked' : 'Not Linked'}
                </p>
                <p className="text-xs mt-1">
                  {selectedWallet.linked ? 'Your Ethereum address is linked to your Wire account.' : 'Not linked yet.'}
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button className="flex-1">Change Account</Button>
                <Button variant="destructive" className="flex-1">
                  Disconnect
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
