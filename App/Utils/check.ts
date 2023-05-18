const rows = Array.from({ length: 9 }, (_, r) =>
  Array.from({ length: 9 }, (_, c) => r * 9 + c),
)
const columns = Array.from({ length: 9 }, (_, r) =>
  Array.from({ length: 9 }, (_, c) => r + c * 9),
)
const regions = Array.from({ length: 9 }, (_, r) =>
  Array.from(
    { length: 9 },
    (_, c) =>
      Math.floor(r / 3) * 27 + (r % 3) * 3 + Math.floor(c / 3) * 9 + (c % 3),
  ),
)

export function getRow(index: number) {
  return rows[Math.floor(index / 9)]
}

export function getColumn(index: number) {
  return columns[index % 9]
}

export function getRegion(index: number) {
  return regions[Math.floor(index / 27) * 3 + Math.floor((index % 9) / 3)]
}

export function getLinks(index: number) {
  const set = new Set([
    ...getRow(index),
    ...getColumn(index),
    ...getRegion(index),
  ])
  set.delete(index)
  return set
}

export function getMissing(puzzle: number[]) {
  return puzzle.reduce((acc, cur, i) => {
    if (!cur) acc.push(i)
    return acc
  }, [] as number[])
}

export function getWhitelist(puzzle: number[], index: number) {
  const whitelist = [
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]
  getLinks(index).forEach(links => (whitelist[puzzle[links]] = false))
  return whitelist.reduce((acc, cur, i) => {
    if (cur) acc.push(i)
    return acc
  }, [] as number[])
}
