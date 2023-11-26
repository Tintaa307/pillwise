import React, { useEffect, useState } from "react"
import { IconX } from "@tabler/icons-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { Calendar } from "@/components/ui/calendar"
import Dialog from "@/components/web/Dialog"
import { useMutation } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { deletePill } from "@/lib/controllers/pills"
import { PillsProps } from "@/types/types"
import { cn } from "@/lib/utils"

type DeleteFormProps = {
  setDeleteFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  pills: PillsProps[] | undefined
}

const DeleteForm = ({ setDeleteFormOpen, pills }: DeleteFormProps) => {
  const [name, setName] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedHour, setSelectedHour] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const [actualDay, setActualDay] = useState<string>("")
  const [pillsSelected, setPillsSelected] = useState<PillsProps[]>([])
  const [pillSelected, setPillSelected] = useState<PillsProps | undefined>()
  const [idsToDelete, setIdsToDelete] = useState<number[]>([])

  const fecha = new Date()
  const numeroDiaSemana = fecha.getDay()

  const deleletePillMutation = useMutation({
    mutationKey: ["deletePill"],
    mutationFn: async (values: number[]) => {
      await deletePill(values)
    },
    onSuccess: () => {
      toast.success("Pastilla eliminada!")
      router.push("/")
    },
    onError: () => {
      toast.error("Error al crear la pastilla")
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await deleletePillMutation.mutateAsync(idsToDelete!)
    } catch (error) {
      console.log("error")
      toast.error("Algo salio mal")
    }
  }

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

  useEffect(() => {
    if (pillsSelected?.length !== 0) {
      pillsSelected.map((pill) => {
        setIdsToDelete([...idsToDelete!, pill.id!])
      })
    }
  }, [pillsSelected])

  return (
    <main className="w-full h-screen absolute top-0 left-0 z-40 bg-black/40 flex items-center justify-center">
      {dialogOpen && <Dialog handleSubmit={handleSubmit} />}
      <section className="relative w-[95%] min-h-[350px] flex items-center justify-start flex-col bg-white rounded-sm gap-5">
        <h1 className="text-black text-2xl font-semibold mt-5 mb-4">
          Elimina tus pastillas
        </h1>
        <div className="absolute top-5 left-4">
          <IconX
            size={30}
            color="#000"
            onClick={() => setDeleteFormOpen(false)}
          />
        </div>
        <form
          autoComplete="off"
          className="w-full max-h-[550px] flex items-center justify-start flex-col gap-5"
        >
          <div
            className={cn(
              "w-full min-h-[200px] flex flex-col items-center justify-center gap-2",
              {
                "overflow-y-auto": pills?.length! > 4,
              }
            )}
          >
            {pills?.map((pill, index) => (
              <div
                className="w-full flex flex-row gap-2 items-center justify-center"
                key={index}
              >
                <div
                  onClick={() => {
                    const newPillsSelected = pillsSelected.filter(
                      (pill) => pill !== pillSelected
                    )
                    setPillsSelected(newPillsSelected)
                  }}
                  className={cn("w-7 h-7 hidden", {
                    "flex items-center justify-center transition-all duration-200":
                      pillsSelected.includes(pill),
                  })}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full border-[1px] border-black transition-all duration-200",
                      {
                        "bg-green-500 border-white":
                          pillsSelected.includes(pill),
                      }
                    )}
                  ></span>
                </div>
                <div
                  onClick={() => {
                    setPillsSelected([...pillsSelected, pill])
                    setPillSelected(pill)
                  }}
                  className={cn(
                    "w-[80%] h-[80px] flex items-center justify-between rounded-lg bg-transparent transition-colors duration-200 border-[1px] border-black/70",
                    {
                      "bg-primary_blue": pillsSelected.includes(pill),
                    }
                  )}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <strong
                      className={cn("text-black font-semibold text-6xl ml-2", {
                        "text-white transition-all duration-200":
                          pillsSelected.includes(pill),
                      })}
                    >
                      {pill.hour}
                    </strong>
                  </div>
                  <div className="w-full h-full flex items-center justify-center flex-col">
                    <h5
                      className={cn("font-semibold text-black text-lg", {
                        "text-white transition-all duration-200":
                          pillsSelected.includes(pill),
                      })}
                    >
                      {pill.name} <br />
                    </h5>
                    <small
                      className={cn("text-black font-semibold text-xs", {
                        "text-white transition-all duration-200":
                          pillsSelected.includes(pill),
                      })}
                    >
                      {actualDay}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => setDialogOpen(true)}
            className="w-[80%] h-12 bg-red-600 rounded-sm text-white text-lg font-semibold outline-none flex items-center justify-center mb-12"
          >
            Eliminar
          </div>
        </form>
      </section>
    </main>
  )
}

export default DeleteForm
