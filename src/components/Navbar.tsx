import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { cn } from '@/lib/utils'
import { AiOutlineSwap, AiOutlineBarChart, AiOutlineSend, AiOutlineCreditCard } from 'react-icons/ai'

export function Navbar() {
  return (
    <>
      <header className="absolute top-0 left-0 p-4 flex space-x-4">
        <Link href="/" legacyBehavior passHref>
          <h2 className="text-xl mt-0.5 font-semibold text-white cursor-pointer hover:underline">ZeroFlow</h2>
        </Link>
        <div className="flex justify-center w-full">
          <NavigationMenu className="gap-3 list-none">
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={navigationMenuTriggerStyle()}>
                    Trade
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem
                    asChild
                    className="flex items-center px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
                  >
                    <Link href="/swap" className="flex items-center space-x-3 w-full">
                      <AiOutlineSwap size={20} className="text-gray-400" />
                      <span>Swap</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="flex items-center px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
                  >
                    <Link href="/limit" className="flex items-center space-x-3 w-full">
                      <AiOutlineBarChart size={20} className="text-gray-400" />
                      <span>Limit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="flex items-center px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
                  >
                    <Link href="/send" className="flex items-center space-x-3 w-full">
                      <AiOutlineSend size={20} className="text-gray-400" />
                      <span>Send</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="flex items-center px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
                  >
                    <Link href="/buy" className="flex items-center space-x-3 w-full">
                      <AiOutlineCreditCard size={20} className="text-gray-400" />
                      <span>Buy</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent hover:bg-gray-800 hover:text-purple-400 text-white border-0',
                  )}
                >
                  Trade
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pools" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent hover:bg-gray-800 hover:text-purple-400 text-white border-0',
                  )}
                >
                  Pools
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </header>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="absolute top-0 right-0 m-4 text-white cursor-pointer rounded-xl bg-violet-800
                      px-3 py-1 text-[10px] md:px-4 md:py-2 md:text-base"
          >
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-black border-gray-800 sm:max-w-[425px]">
          <DialogHeader className="relative">
            <DialogTitle className="text-white text-center">Connect Wallet</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <Button variant="outline" className="w-full cursor-pointer text-black border-gray-700 hover:bg-gray-800">
              WalletConnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
