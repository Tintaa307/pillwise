import { PillsProps } from "@/types/types"
import React, { useState } from "react"
import DeleteForm from "./delete-form"
import { cn } from "@/lib/utils"

type DisplayDaysProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  pills: PillsProps[] | undefined
}

const DisplayDays = ({ pills, open, setOpen }: DisplayDaysProps) => {
  const date = new Date()
  const actualDay = date.getDate()
  const actualWeekDay = date.getDay()
  const actualMonth = date.getMonth()
  const [deleteFormOpen, setDeleteFormOpen] = useState(false)

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ]

  return (
    <section className="w-full h-[30vh] bg-primary_blue flex items-center justify-center flex-col">
      {deleteFormOpen && (
        <DeleteForm pills={pills} setDeleteFormOpen={setDeleteFormOpen} />
      )}
      <div
        className={cn("w-full h-max flex items-start justify-start", {
          "items-center justify-center": pills?.length === 0,
        })}
      >
        <h1
          className={cn("text-white font-bold text-3xl ml-3", {
            "ml-0": pills?.length === 0,
          })}
        >
          Calendario {pills?.length !== 0 && <br />}
          de hoy
        </h1>
      </div>
      <div className="w-full h-max flex items-center justify-center">
        <article className="relative w-full h-max rounded-md flex mt-2">
          {pills?.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <strong className="text-white/60 text-xl font-semibold">
                Aún no tienes pastillas agregadas
              </strong>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-start justify-start flex-col">
              <div className="m-3">
                <h3 className="text-white text-xl font-semibold">
                  {weekDays[actualWeekDay] +
                    " " +
                    actualDay +
                    " de " +
                    months[actualMonth]}
                </h3>
              </div>
              <div className="mb-3">
                <small className="text-white font-normal text-sm ml-3">
                  Pastillas de hoy {`(${pills?.length})`}
                </small>
              </div>
              <div className="relative w-full h-max flex items-start justify-start flex-row gap-2 mt-2">
                <button
                  onClick={() => setOpen(true)}
                  className="w-[25%] h-9 flex items-center justify-center bg-white rounded-sm text-black font-semibold text-base outline-none ml-3"
                >
                  Agregar
                </button>
                <button
                  onClick={() => setDeleteFormOpen(true)}
                  className="w-[25%] h-9 flex items-center justify-center bg-red-600 rounded-sm text-white text-base font-semibold outline-none ml-3"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  )
}

export default DisplayDays
