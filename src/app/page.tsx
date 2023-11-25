"use client"

import React, { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { statusAuth } from "@/objects/status"
import { motion } from "framer-motion"
import Sidebar from "@/components/web/sidebar/Sidebar"
import Loader from "@/components/web/shared/Loader"
import { PillsProps } from "@/types/types"
import { IconMenu2, IconHistory } from "@tabler/icons-react"
import { useInfiniteQuery } from "react-query"
import {
  getPills,
  getPillsByDate,
  getPillsByDateAndScroll,
} from "@/lib/controllers/pills"
import { QueryClient } from "react-query"
import { cn } from "@/lib/utils"

export default function Home() {
  const { status, data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { AUTH, NOT_AUTH, LOADING } = statusAuth
  const [auth, setAuth] = useState(NOT_AUTH)
  const queryClient = new QueryClient()
  const router = useRouter()
  const date = new Date().toISOString()
  const [horaCercana, setHoraCercana] = useState<string | undefined>("")
  const [actualDay, setActualDay] = useState<string>("")
  const pillDivRef = useRef<HTMLDivElement | null>(null)

  const fecha = new Date()
  const numeroDiaSemana = fecha.getDay()

  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ]

  useEffect(() => {
    const diaSemanaActual = diasSemana[numeroDiaSemana]
    setActualDay(diaSemanaActual)
  }, [fecha])

  const {
    data: pills,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pills"],
    enabled: !!session?.user?.id,
    queryFn: async ({ pageParam = 1 }) => {
      const pills = await getPillsByDateAndScroll(
        session?.user?.id!,
        date,
        pageParam
      )
      return pills as PillsProps[]
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    onSuccess: () => {
      queryClient.invalidateQueries("pills")
    },
    onError: () => {
      console.log("error")
    },
    initialData: {
      pages: [],
      pageParams: [1],
    },
  })

  // Obtén la hora actual
  const horaActual = new Date().getHours()
  const [pillsHours, setPillsHour] = useState<string[]>([])

  useEffect(() => {
    if (pills) {
      const hours = pills?.pages.map((page) => page.map((pill) => pill.hour))
      const hour = hours[0]?.map((h) => h)
      if (pills.pages.length > 1) {
        const hour2 = hours[hours.length - 1]?.map((h) => h)
        hour?.push(...hour2!)
      }
      setPillsHour(hour!)
    }
    console.log(pills)
  }, [pills?.pages.length])

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
  }, [pillsHours])

  useEffect(() => {
    if (status === LOADING) {
      setAuth(LOADING)
    } else if (status === AUTH) {
      setAuth(AUTH)
    } else {
      router.push("/login")
    }
  }, [status])

  if (isLoading) return <Loader />
  else if (isError) console.log(error)

  return (
    <main>
      <>
        {auth === LOADING || loading ? (
          <Loader />
        ) : (
          <main className="w-full h-screen flex items-center justify-center flex-col gap-10">
            <div className="absolute top-5 left-5">
              <IconMenu2
                onClick={() => setIsOpen(true)}
                width={30}
                height={30}
              />
            </div>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="w-full h-full flex items-center text-center justify-start flex-col gap-4">
              <h1 className="text-black font-semibold text-2xl mt-[68px] mb-12">
                Bienvenido, {session?.user.name}
              </h1>
              <div className="w-full h-max flex flex-row justify-center items-center gap-3">
                <div
                  onClick={() => router.push("/history-of-pills")}
                  className="w-[85%] h-[80px] flex items-center justify-center flex-row rounded-lg bg-[#2A0E8F] gap-4"
                >
                  <h5 className="text-white font-semibold text-xl px-1">
                    Registro de pastillas
                  </h5>
                  <IconHistory
                    width={25}
                    hanging={25}
                    className={"text-white text-2xl"}
                  />
                </div>
              </div>
              <motion.div className="relative w-full h-max flex items-center justify-center flex-col mt-8 gap-4">
                {pills?.pages.map((page, index) => (
                  <div
                    ref={pillDivRef}
                    className={cn(
                      "w-full h-max flex items-center justify-center flex-col gap-4",
                      {
                        hidden:
                          index === pills?.pages.length - 1 &&
                          pillDivRef.current?.children.length === 0,
                      }
                    )}
                    key={index}
                  >
                    {page.map((pill, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: -60 }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.3,
                            delay: 0.1 * index,
                            type: "tween",
                          },
                        }}
                        viewport={{ once: true }}
                        key={i}
                        className={cn(
                          "w-[85%] h-[90px] flex items-center justify-between rounded-lg bg-primary_grey transition-colors duration-200",
                          {
                            "bg-primary_blue transition-colors duration-200":
                              pill.hour === horaCercana,
                          }
                        )}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <strong className="text-white font-semibold text-6xl ml-2">
                            {pill.hour}
                          </strong>
                        </div>
                        <div className="w-full h-full flex items-center justify-center flex-col">
                          <h5 className="font-semibold text-white text-lg">
                            {pill.name} <br />
                          </h5>
                          <small className="text-white font-semibold text-xs">
                            {actualDay}
                          </small>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
                {pills?.pages[0]?.length! >= 5 && (
                  <div className="w-[85%] h-max flex items-end justify-end mb-20">
                    <button
                      onClick={() => {
                        fetchNextPage()
                      }}
                      disabled={isFetchingNextPage}
                      className="text-sm font-semibold text-blue-600 bg-transparent border-none outline-none"
                    >
                      {isFetchingNextPage
                        ? "Cargando..."
                        : (pills?.pages.length ?? 0) < 3
                        ? "Ver más..."
                        : "No hay más pastillas"}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </main>
        )}
      </>
    </main>
  )
}
