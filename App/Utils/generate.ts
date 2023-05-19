import { getWhitelist } from "~/Utils"
import solve from "./solve"

function pickRandom(solution: number[], whitelist: number[][], index: number) {
  if (!whitelist[index]) {
    whitelist[index] = getWhitelist(solution, index)
  }

  if (whitelist[index].length) {
    return whitelist[index].splice(
      Math.floor(Math.random() * whitelist[index].length),
      1,
    )[0]
  }

  return 0
}

function getPuzzle(solution: number[], clues: number) {
  const picks = Array.from({ length: 81 }, (_, i) => i)
  let total = 81

  for (let i = picks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[picks[i], picks[j]] = [picks[j], picks[i]]
  }

  while (clues < total && picks.length) {
    const pick = picks.pop() as number
    const backup = solution[pick]
    let isUnique = true

    for (const num of getWhitelist(solution, pick)) {
      if (num !== backup) {
        try {
          solution[pick] = num
          solve(solution.slice())
          solution[pick] = backup
          isUnique = false
          break
        } catch {}
      }
    }

    if (isUnique) {
      solution[pick] = 0
      total--
    }
  }

  if (clues === total) {
    return solution
  }

  throw new Error("No puzzle found")
}

function getSolution() {
  const stack: number[] = []
  const whitelist: number[][] = []

  while (stack.length < 81) {
    let pick = pickRandom(stack, whitelist, stack.length)

    if (pick === 0) {
      stack.pop()
      whitelist.pop()
      continue
    }

    stack.push(pick)
  }

  return stack
}

export default function generate(clues: number): {
  puzzle: number[]
  solution: number[]
} {
  if (clues < 20) {
    throw new Error("Too few clues, minimum is 20")
  }

  try {
    const solution = getSolution()
    const puzzle = getPuzzle(solution.slice(), clues)
    return { puzzle, solution }
  } catch {
    return generate(clues)
  }
}
