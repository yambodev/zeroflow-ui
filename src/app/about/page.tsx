export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-8 mt-30">About ZeroFlow</h1>
        <div className="space-y-6">
          <p className="text-lg">
            ZeroFlow is a next-generation decentralized exchange focused on providing fee-less trading experiences for
            crypto enthusiasts. Built on the robust wire.network, we are an ecosystem designed to revolutionize the way
            you trade.
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent animate-gradient">
              <br />
              <br />
              With zero gas fees, zero bridging, and zero intermediaries, we are the future of crypto trading.
            </span>
          </p>
          <p className="text-lg">
            Our mission is to make cryptocurrency trading accessible to everyone by eliminating traditional barriers
            like high fees and complex interfaces.
          </p>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <div className="text-center space-y-2">
              <p>Zero trading fees</p>
              <p>Simple and intuitive interface</p>
              <p>Multi-chain support</p>
              <p>Secure trading environment</p>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Our Ecosystem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">ZeroFlow DEX</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Agent Launchpad (Auto Trading)</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Whitelabeled Swaps</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Yielding and Cross-staking</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Wire.network Trading API</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Bridgeless OTC Swaps</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Equity based Stablecoins</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">More TBD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
