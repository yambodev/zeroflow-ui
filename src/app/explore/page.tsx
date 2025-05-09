import { PoolsTable } from '@/components/PoolsComponents/PoolsTable'

export default function Explorerl() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-16 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="w-full lg:w-auto"></div>
        </div>
      </div>
      <div className="mt-8 sm:mt-12">
        <div className="overflow-x-auto items-center justify-center flex">
          <PoolsTable />
        </div>
      </div>
    </div>
  )
}
