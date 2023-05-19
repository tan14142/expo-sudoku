import { getMissing, getWhitelist } from "~/Utils"

export default function solve(puzzle: number[]) {
  const missing = getMissing(puzzle)
  const stack = puzzle.slice()
  const whitelist: number[][] = []
  let i = 0

  while (i < missing.length) {
    if (!whitelist[i]) {
      whitelist[i] = getWhitelist(stack, missing[i])
    }
    if (whitelist[i].length) {
      stack[missing[i]] = whitelist[i].pop() as number
      i++
    } else {
      stack[missing[i]] = 0
      delete whitelist[i]

      if (--i === -1) {
        throw new Error("No solution found")
      }
    }
  }

  return stack
}
