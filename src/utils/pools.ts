// utils/pools.ts
export function parsePoolId(poolId: string): { slug: string; pairWith: string; index: number } | null {
  const parts = poolId.split('-')
  if (parts.length < 3) return null

  const index = parseInt(parts[parts.length - 1])
  const pairWith = parts.slice(-2, -1)[0]
  const slug = parts.slice(0, -2).join('-')

  if (isNaN(index)) return null
  return { slug, pairWith, index }
}
