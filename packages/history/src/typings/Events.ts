export type Events<F> = {
  length: number
  push: (fn: F) => () => void
  call: (arg: any) => void
}
