import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  connectors: [metaMask()],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})
