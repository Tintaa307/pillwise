"use client"

import React, { useContext, useEffect, useState } from "react"
import ArrowBackButton from "@/components/web/arrow-back-button"
import { IconAdjustmentsHorizontal } from "@tabler/icons-react"
import { useSession } from "next-auth/react"
import { QueryClient, useQuery } from "react-query"
import { getPills } from "@/lib/controllers/pills"
import { PillsProps } from "@/types/types"
import Loader from "@/components/web/shared/Loader"
import Card from "./Card"
import Filter from "./Filter"
import { cn } from "@/lib/utils"
import { FilterContext, FilterProvider } from "@/context/FilterContext"

const HistoryPills = () => {
  const { data: session } = useSession()
  const queryClient = new QueryClient()
  const [open, setOpen] = useState(false)
  const date = new Date().toISOString().slice(0, 10)
  const [pillsHours, setPillsHour] = useState<string[]>([])
  const [horaCercana, setHoraCercana] = useState<string | undefined>("")
  const fecha = new Date()
  const minutesOfDate = fecha.getMinutes()
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [filteredPills, setFilteredPills] = useState<PillsProps[]>()

  const {
    data: pills,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["historyPills"],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const pills = await getPills(session?.user?.id!)
      return pills as PillsProps[]
    },
    onSuccess: () => {
      queryClient.invalidateQueries("historyPills")
    },
    onError: () => {
      console.log("error")
    },
  })

  useEffect(() => {
    if (pills) {
      const hours = pills?.map((pill) => pill.hour)
      console.log(hours)
      setPillsHour(hours!)
    }
    console.log(pills)
  }, [pills])

  useEffect(() => {
    console.log(pillsHours)
  }, [pillsHours])

  function obtenerProximaHoraMasCercana(horasAComparar: string[]) {
    const ahora = new Date()
    const horaActual = ahora.getHours()
    const minutosActuales = ahora.getMinutes()
    const tiempoActual = horaActual * 60 + minutosActuales

    const horasFuturas = horasAComparar
      .map((hora) => {
        const [horaStr, minutosStr] = hora.split(":")
        const tiempo = Number(horaStr) * 60 + Number(minutosStr)
        return tiempo > tiempoActual ? tiempo : Infinity
      })
      .filter((tiempo) => tiempo !== Infinity)

    const proximaHora = Math.min(...horasFuturas)

    const horas = Math.floor(proximaHora / 60)
    const minutos = proximaHora % 60
    const proximaHoraFormateada = `${horas
      .toString()
      .padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`

    return proximaHoraFormateada
  }

  useEffect(() => {
    if (pillsHours) {
      const proximaHora = obtenerProximaHoraMasCercana(pillsHours)
      console.log(proximaHora)
      setHoraCercana(proximaHora)
    }
  }, [pillsHours, minutesOfDate])

  useEffect(() => {
    console.log("filtered pills: ", filteredPills)
  }, [filteredPills])

  if (isLoading) return <Loader />
  else if (isError) console.log(error)

  return (
    <FilterProvider
      pills={pills}
      setFilteredPills={setFilteredPills}
      horaCercana={horaCercana}
    >
      <main
        className={cn("relative w-full h-screen", {
          "overflow-hidden": openFilter === true,
        })}
      >
        {openFilter && <Filter setOpenFilter={setOpenFilter} />}
        <ArrowBackButton route="/" className="text-black" />
        <div className="absolute right-3 top-5">
          <IconAdjustmentsHorizontal
            onClick={() => setOpenFilter(true)}
            size={30}
          />
        </div>
        <div className="w-full h-full flex items-center justify-start flex-col gap-12">
          <div className="mt-20">
            <h1 className="text-black font-bold text-2xl">
              Historial de pastillas
            </h1>
          </div>
          <section className="w-full h-max flex items-center justify-center flex-col gap-5">
            {filteredPills &&
              filteredPills.map((pill, index) => (
                <Card
                  key={index}
                  state={
                    pill.hour === horaCercana!
                      ? "active"
                      : pill.hour < horaCercana!
                      ? "missed"
                      : "pending"
                  }
                  title={pill.name}
                  hour={pill.hour}
                />
              ))}
          </section>
        </div>
      </main>
    </FilterProvider>
  )
}

export default HistoryPills
