export function toFixedIfNecessary(value: string | number, dp: number) {
  return +parseFloat(`${value}`).toFixed(dp)
}
