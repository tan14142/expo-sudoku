import { getWhitelist } from "~/Utils"
import solve from "./solve"

let random = async () => Math.random()

function createRandomFunc(seed: string, increment = 0) {
  const encoder = new TextEncoder()

  return async function () {
    const data = encoder.encode(seed + increment++)
    const buffer = await window.crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(buffer))
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("")
    const decimalPart = parseInt(hashHex.slice(0, 8), 16)
    return decimalPart / Math.pow(2, 32)
  }
}

async function pickRandom(solution: number[], whitelist: number[][], index: number) {
  if (!whitelist[index]) {
    whitelist[index] = getWhitelist(solution, index).reduce<number[]>((acc, cur, i) => {
      if (cur) acc.push(i)
      return acc
    }, [])
  }

  if (whitelist[index].length) {
    return whitelist[index].splice(Math.floor((await random()) * whitelist[index].length), 1)[0]
  }

  return 0
}

async function getPuzzle(solution: number[], clues: number) {
  const picks = Array.from({ length: 81 }, (_, i) => i)
  let total = 81

  for (let i = picks.length - 1; i > 0; i--) {
    const j = Math.floor((await random()) * (i + 1))
    ;[picks[i], picks[j]] = [picks[j], picks[i]]
  }

  while (clues < total && picks.length) {
    const pick = picks.pop() as number
    const backup = solution[pick]
    const whitelist = getWhitelist(solution, pick)
    let isUnique = true

    for (let k = 1; k < 10; k++) {
      if (whitelist[k] && k !== backup) {
        try {
          solution[pick] = k
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

async function getSolution() {
  const stack: number[] = []
  const whitelist: number[][] = []

  while (stack.length < 81) {
    let pick = await pickRandom(stack, whitelist, stack.length)

    if (pick === 0) {
      stack.pop()
      whitelist.pop()
      continue
    }

    stack.push(pick)
  }

  return stack
}

export default async function generate(
  clues: number,
  seed?: any,
  increment = 0,
): Promise<{
  puzzle: number[]
  solution: number[]
}> {
  if (clues < 20) {
    throw new Error("Too few clues, minimum is 20")
  }

  if (seed) {
    random = createRandomFunc(seed + increment)
  }

  try {
    const solution = await getSolution()
    const puzzle = await getPuzzle(solution.slice(), clues)
    return { puzzle, solution }
  } catch {
    return generate(clues, seed, increment + 1)
  }
}
