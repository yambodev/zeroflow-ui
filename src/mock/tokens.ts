export type PoolMeta = {
  poolId: string
  pairWith: string
  version: string
  fee: string
  tvl: string
  apr: string
  volume1d: string
  volume30d: string
  ratio: string
}

export type Token = {
  name: string
  slug: string
  price: number
  pools?: PoolMeta[]
}

export const mockTokens: Token[] = [
  {
    name: 'USD Coin',
    slug: 'USDC',
    price: 1.0,
    pools: [
      {
        poolId: 'eth-usdc-v3',
        pairWith: 'ETH',
        version: 'v3',
        fee: '0.05%',
        tvl: '$148.0 M',
        apr: '23.139%',
        volume1d: '$187.6 M',
        volume30d: '$9587.3 M',
        ratio: '1.27',
      },
      {
        poolId: 'wbtc-usdc-v3',
        pairWith: 'WBTC',
        version: 'v3',
        fee: '0.3%',
        tvl: '$132.6 M',
        apr: '17.746%',
        volume1d: '$21.5 M',
        volume30d: '$1096.7 M',
        ratio: '0.16',
      },
      {
        poolId: 'dai-usdc-v3',
        pairWith: 'DAI',
        version: 'v3',
        fee: '0.3%',
        tvl: '$132.6 M',
        apr: '17.746%',
        volume1d: '$21.5 M',
        volume30d: '$1096.7 M',
        ratio: '0.16',
      },
    ],
  },
  {
    name: 'Ethereum',
    slug: 'ETH',
    price: 3450.25,
    pools: [
      {
        poolId: 'eth-usdc-v3',
        pairWith: 'USDC',
        version: 'v3',
        fee: '0.05%',
        tvl: '$148.0 M',
        apr: '23.139%',
        volume1d: '$187.6 M',
        volume30d: '$9587.3 M',
        ratio: '1.27',
      },
      {
        poolId: 'eth-usdt-v3',
        pairWith: 'USDT',
        version: 'v3',
        fee: '0.3%',
        tvl: '$140.0 M',
        apr: '19.000%',
        volume1d: '$15.0 M',
        volume30d: '$600.0 M',
        ratio: '0.11',
      },
      {
        poolId: 'eth-wbtc-v3',
        pairWith: 'WBTC',
        version: 'v3',
        fee: '0.3%',
        tvl: '$132.6 M',
        apr: '17.746%',
        volume1d: '$21.5 M',
        volume30d: '$1096.7 M',
        ratio: '0.16',
      },
    ],
  },
  {
    name: 'Tether',
    slug: 'USDT',
    price: 1.0,
    pools: [
      {
        poolId: 'eth-usdt-v3',
        pairWith: 'ETH',
        version: 'v3',
        fee: '0.3%',
        tvl: '$140.0 M',
        apr: '19.000%',
        volume1d: '$15.0 M',
        volume30d: '$600.0 M',
        ratio: '0.11',
      },
      {
        poolId: 'usdt-wbtc-v3',
        pairWith: 'WBTC',
        version: 'v3',
        fee: '0.3%',
        tvl: '$132.6 M',
        apr: '17.746%',
        volume1d: '$21.5 M',
        volume30d: '$1096.7 M',
        ratio: '0.16',
      },
    ],
  },
  {
    name: 'Wrapped Bitcoin',
    slug: 'WBTC',
    price: 65250.75,
    pools: [
      {
        poolId: 'wbtc-usdc-v3',
        pairWith: 'USDC',
        version: 'v3',
        fee: '0.3%',
        tvl: '$132.6 M',
        apr: '17.746%',
        volume1d: '$21.5 M',
        volume30d: '$1096.7 M',
        ratio: '0.16',
      },
      {
        poolId: 'eth-wbtc-v3',
        pairWith: 'ETH',
        version: 'v3',
        fee: '0.3%',
        tvl: '$132.6 M',
        apr: '17.746%',
        volume1d: '$21.5 M',
        volume30d: '$1096.7 M',
        ratio: '0.16',
      },
      {
        poolId: 'usdt-wbtc-v3',
        pairWith: 'USDT',
        version: 'v3',
        fee: '0.3%',
        tvl: '$132.6 M',
        apr: '17.746%',
        volume1d: '$21.5 M',
        volume30d: '$1096.7 M',
        ratio: '0.16',
      },
      {
        poolId: 'cbBTC-wbtc-v3',
        pairWith: 'cbBTC',
        version: 'v3',
        fee: '0.3%',
        tvl: '$132.6 M',
        apr: '17.746%',
        volume1d: '$21.5 M',
        volume30d: '$1096.7 M',
        ratio: '0.16',
      },
    ],
  },
  {
    name: 'Coinbase Wrapped BTC',
    slug: 'cbBTC',
    price: 65100.0,
  },
  {
    name: 'Plume coin',
    slug: 'plume',
    price: 600.0,
  },
  {
    name: 'Maker coin',
    slug: 'Maker',
    price: 0.000001678,
  },
  {
    name: 'Pepe Coin',
    slug: 'Pepe',
    price: 6554100.0,
  },
  {
    name: 'Mog Coin',
    slug: 'Mog',
    price: 12125100.0,
  },
]
