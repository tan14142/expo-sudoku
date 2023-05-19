import { createContext, ReactNode, useState } from "react"
import { getRow, getColumn, getRegion, getLinks } from "~/Utils"

interface SelectionProviderProps {
  children: ReactNode
}

interface SelectionProps {
  selection: number
  setSelection: (index: number) => void
  row: number[]
  column: number[]
  region: number[]
  links: Set<number>
}

export const SelectionContext = createContext({} as SelectionProps)

export default function SelectionProvider({
  children,
}: SelectionProviderProps) {
  const [index, setIndex] = useState(-1)
  const [row, setRow] = useState<number[]>([])
  const [column, setColumn] = useState<number[]>([])
  const [region, setRegion] = useState<number[]>([])
  const [links, setLinks] = useState<Set<number>>(new Set())

  function setSelection(index: number) {
    setIndex(index)
    setRow(getRow(index))
    setColumn(getColumn(index))
    setRegion(getRegion(index))
    setLinks(getLinks(index))
  }

  return (
    <SelectionContext.Provider
      value={{
        selection: index,
        setSelection,
        row,
        column,
        region,
        links,
      }}>
      {children}
    </SelectionContext.Provider>
  )
}
