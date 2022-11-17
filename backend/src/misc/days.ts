export const xDays: Function = (x: number) => x * (24 * 60 * 60 * 1000)
export const xDaysLater: Function = (x: number): Date => {
  return new Date(Date.now() + xDays(x))
}
