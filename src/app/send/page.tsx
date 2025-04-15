import { SendBox } from '@/components/TradeComponents/SendBox'
import { TradeTabs } from '@/components/TradeComponents/TradeTabs'

export default function Send() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center pt-20 pb-8 px-4 md:pt-24">
        <div className="w-full max-w-md flex flex-col items-center space-y-6">
          <TradeTabs />
          <SendBox />
        </div>
      </div>
    </div>
  )
}
