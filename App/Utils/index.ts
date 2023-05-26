export const rows = Array.from({ length: 9 }, (_, r) =>
  Array.from({ length: 9 }, (_, c) => r * 9 + c),
)
export const columns = Array.from({ length: 9 }, (_, r) =>
  Array.from({ length: 9 }, (_, c) => r + c * 9),
)
export const regions = Array.from({ length: 9 }, (_, r) =>
  Array.from(
    { length: 9 },
    (_, c) => Math.floor(r / 3) * 27 + (r % 3) * 3 + Math.floor(c / 3) * 9 + (c % 3),
  ),
)

export const links = Array.from({ length: 81 }, (_, i) => {
  const row = rows[Math.floor(i / 9)]
  const column = columns[i % 9]
  const region = regions[Math.floor(i / 27) * 3 + Math.floor((i % 9) / 3)]
  const set = new Set([...row, ...column, ...region])
  set.delete(i)
  return set
})

export function getMissing(puzzle: number[]) {
  return puzzle.reduce((acc, cur, i) => {
    if (!cur) acc.push(i)
    return acc
  }, [] as number[])
}

export function getWhitelist(puzzle: number[], index: number) {
  const whitelist = [false, true, true, true, true, true, true, true, true, true]
  links[index].forEach(link => (whitelist[puzzle[link]] = false))
  return whitelist.reduce((acc, cur, i) => {
    if (cur) acc.push(i)
    return acc
  }, [] as number[])
}

export function hasDuplicateInTriplet(nums: number[]) {
  const triplets = nums.reduce(
    (acc, cur, i) => {
      cur && acc[(i / 3) | 0].add(cur)
      return acc
    },
    [new Set(), new Set(), new Set()] as Set<number>[],
  )

  const lengthBefore = triplets.reduce((acc, cur) => acc + cur.size, 0)
  const lengthAfter = triplets.reduce((acc, cur) => {
    cur.forEach(v => acc.add(v))
    return acc
  }, new Set()).size

  return lengthBefore > lengthAfter
}
