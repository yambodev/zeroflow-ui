import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { AiOutlineSwap, AiOutlineBarChart, AiOutlineSend, AiOutlineCreditCard } from 'react-icons/ai'
import { ConnectWalletButton } from './ConnectWalletButton'

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href="/explorer">
                    <Button variant="ghost" className={navigationMenuTriggerStyle()}>
                      Explorer
                    </Button>
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem
                    asChild
                    className="flex items-center px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
                  >
                    <Link href="explorer/pools" className="flex items-center space-x-3 w-full">
                      <AiOutlineSwap size={20} className="text-gray-400" />
                      <span>pools</span>
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
              <Link href="/positions">
                <Button variant="ghost" className={navigationMenuTriggerStyle()}>
                  Pool
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </header>
      <ConnectWalletButton />
    </>
  )
}
