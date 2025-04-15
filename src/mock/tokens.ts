export type Token = {
  name: string
  slug: string
  price: number
}

export const mockTokens: Token[] = [
  { name: 'USD Coin', slug: 'USDC', price: 1.0 },
  { name: 'Ethereum', slug: 'ETH', price: 3450.25 },
  { name: 'Tether', slug: 'USDT', price: 1.0 },
  { name: 'Wrapped Bitcoin', slug: 'WBTC', price: 65250.75 },
  { name: 'Base ETH', slug: 'bETH', price: 3450.25 },
  { name: 'Coinbase Wrapped BTC', slug: 'cbBTC', price: 65100.0 },
  { name: 'Plume coin', slug: 'plume', price: 600.0 },
  { name: 'Maker coin', slug: 'Maker', price: 0.000001678 },
  { name: 'Pepe Coin', slug: 'Pepe', price: 6554100.0 },
  { name: 'Mog Coin', slug: 'Mog', price: 12125100.0 },
]
