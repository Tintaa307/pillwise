import { PillsFilter, PillsProps } from "@/types/types"
import { createContext, useEffect, useState } from "react"

type FilterContextProps = {
  filterState: PillsFilter
  setFilterState: React.Dispatch<React.SetStateAction<PillsFilter>>
}

export const FilterContext = createContext<FilterContextProps>({
  filterState: {
    name: "",
    recent: false,
    old: false,
    notTaken: false,
    taken: false,
  },
  setFilterState: () => {},
})

export const FilterProvider = ({
  children,
  pills,
  setFilteredPills,
  horaCercana,
}: {
  children: React.ReactNode
  pills: PillsProps[] | undefined
  setFilteredPills: React.Dispatch<
    React.SetStateAction<PillsProps[] | undefined>
  >
  horaCercana: string | undefined
}) => {
  const [filterState, setFilterState] = useState<PillsFilter>({
    name: "",
    recent: false,
    old: false,
    notTaken: false,
    taken: false,
  })

  useEffect(() => {
    if (pills) {
      setFilteredPills(pills)
    }
  }, [pills])

  useEffect(() => {
    console.log(filterState)
  }, [filterState])

  useEffect(() => {
    if (pills) {
      const filtered = pills.filter((pill) => {
        if (filterState.name === "") {
          return pill
        } else if (filterState.name !== "") {
          return pill.name
            .toLowerCase()
            .includes(filterState.name.toLowerCase())
        } else if (filterState.recent) {
          return pills.map((pill) => pill).reverse()
        } else if (filterState.old) {
          return pill
        } else {
          return pill
        }
      })

      setFilteredPills(filtered)
    }
  }, [pills, filterState.name, filterState.recent, filterState.old])

  return (
    <FilterContext.Provider
      value={{
        filterState,
        setFilterState,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
