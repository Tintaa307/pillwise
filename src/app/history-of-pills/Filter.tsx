import React, { useContext, useEffect, useState } from "react"
import { IconSearch, IconX } from "@tabler/icons-react"
import { FilterContext } from "@/context/FilterContext"
import { cn } from "@/lib/utils"

type FilterProps = {
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
}

const Filter = ({ setOpenFilter }: FilterProps) => {
  const { setFilterState, filterState } = useContext(FilterContext)
  const [name, setName] = useState<string>("")
  const [recent, setRecent] = useState<boolean>(false)
  const [old, setOld] = useState<boolean>(false)
  const [notTaken, setNotTaken] = useState<boolean>(false)
  const [taken, setTaken] = useState<boolean>(false)

  useEffect(() => {
    console.log(filterState)
  }, [filterState])

  const handleSendFilter = () => {
    setFilterState({
      name: name,
      recent: recent,
      old: old,
      notTaken: notTaken,
      taken: taken,
    })
    setOpenFilter(false)
  }

  useEffect(() => {
    console.log(filterState)
  }, [filterState])

  return (
    <main className="w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black/50 z-50">
      <section className="relative w-[95%] h-max bg-white rounded-md flex items-center justify-start flex-col gap-12">
        <div className="absolute top-8 left-5">
          <IconX
            onClick={() => setOpenFilter(false)}
            size={25}
            className="text-black"
          />
        </div>
        <div className="w-full h-max flex items-center justify-center">
          <h1 className="text-black text-2xl font-semibold mt-7">
            Filtrar por
          </h1>
        </div>
        <div className="relative w-full h-full flex items-center justify-start flex-col">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[83%] h-12 rounded-md text-black text-lg font-normal px-12 outline-none border-none bg-[#D9D9D9]"
            placeholder="Nombre"
          />
          <IconSearch size={25} className="absolute left-12 top-3 text-black" />
        </div>
        <div className="w-full h-full flex items-center justify-center flex-row gap-4">
          <span
            onClick={() => setRecent(!recent)}
            className={cn(
              "w-[40%] h-12 bg-[#d9d9d9] text-black font-semibold text-lg rounded-md flex items-center justify-center transition-colors duration-200",
              {
                "bg-primary_blue text-white transition-colors duration-200":
                  recent,
              }
            )}
          >
            Más recientes
          </span>
          <span
            onClick={() => setOld(!old)}
            className={cn(
              "w-[40%] h-12 bg-[#d9d9d9] text-black font-semibold text-lg rounded-md flex items-center justify-center transition-colors duration-200",
              {
                "bg-primary_blue text-white transition-colors duration-200":
                  old,
              }
            )}
          >
            Mas antiguos
          </span>
        </div>
        <div className="w-full h-full flex items-center justify-center flex-row gap-4">
          <span
            onClick={() => setNotTaken(!notTaken)}
            className={cn(
              "w-[40%] h-12 bg-[#d9d9d9] text-black font-semibold text-lg rounded-md flex items-center justify-center transition-colors duration-200",
              {
                "bg-primary_blue text-white transition-colors duration-200":
                  notTaken,
              }
            )}
          >
            No tomadas
          </span>
          <span
            onClick={() => setTaken(!taken)}
            className={cn(
              "w-[40%] h-12 bg-[#d9d9d9] text-black font-semibold text-lg rounded-md flex items-center justify-center transition-colors duration-200",
              {
                "bg-primary_blue text-white transition-colors duration-200":
                  taken,
              }
            )}
          >
            Tomadas
          </span>
        </div>
        <div className="w-full h-max flex items-center justify-center">
          <button
            onClick={handleSendFilter}
            className="w-[83%] h-12 bg-primary_blue outline-none text-white text-lg font-semibold border-none my-2 mb-4 rounded-md"
          >
            Filtrar
          </button>
        </div>
      </section>
    </main>
  )
}

export default Filter
