import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import * as Yup from "yup"
import { Calendar } from "@/components/ui/calendar"
import { useSession } from "next-auth/react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useMutation } from "react-query"
import { createPill } from "@/lib/controllers/pills"
import { PillsProps } from "@/types/types"
import { IconX } from "@tabler/icons-react"

interface PillsStateProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FormPills = ({ setOpen }: PillsStateProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const router = useRouter()
  const [selectedHour, setSelectedHour] = useState("")
  const [selectedFrecuency, setSelectedFrecuency] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    if (selectedHour.length === 2) {
      setSelectedHour(selectedHour + ":")
    }
  }, [selectedHour])

  useEffect(() => {
    console.log(selectedFrecuency)
  }, [selectedFrecuency])

  const frequency = [
    {
      id: 1,
      name: "Cada 2 horas",
      value: "2h",
    },
    {
      id: 2,
      name: "Cada 4 horas",
      value: "4h",
    },
    {
      id: 3,
      name: "Cada 8 horas",
      value: "8h",
    },
    {
      id: 4,
      name: "Cada 12 horas",
      value: "12h",
    },
    {
      id: 5,
      name: "Una vez por dia",
      value: "1d",
    },
    {
      id: 6,
      name: "Una vez por semana",
      value: "1s",
    },
    {
      id: 7,
      name: "Una vez por mes",
      value: "1m",
    },
    {
      id: 8,
      name: "Una vez por año",
      value: "1a",
    },
  ]

  const createPillMutation = useMutation({
    mutationKey: ["createPill"],
    mutationFn: async (values: PillsProps) => {
      await createPill(values)
    },
    onSuccess: () => {
      toast.success("Pastilla agregada!")
      router.push("/")
    },
    onError: () => {
      toast.error("Error al crear la pastilla")
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await createPillMutation.mutateAsync({
        name: title,
        description: description,
        date: selectedDate ? selectedDate : new Date(),
        hour: selectedHour,
        frequency: selectedFrecuency,
        userId: session?.user.id,
      })
    } catch (error) {
      console.log("error")
      toast.error("Algo salio mal")
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.4, type: "tween" } }}
      className="w-full h-screen bg-[#0000007c] flex items-center justify-center absolute top-0 left-0 z-30"
    >
      <Toaster />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, transition: { duration: 0.4, type: "tween" } }}
        className="w-[95%] h-[550px] flex bg-white items-center justify-start flex-col rounded-[15px]"
      >
        <nav className="w-full h-max flex items-center justify-center">
          <IconX
            onClick={() => setOpen(false)}
            className={"absolute left-7 mt-4"}
            size={30}
          />
          <div className="h-max w-max mt-5">
            <h1 className="text-[26px] font-semibold">Añadir pastilla</h1>
          </div>
        </nav>
        <div className="w-full h-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="w-full h-full flex items-center justify-center flex-col gap-5"
          >
            <input
              className="w-[80%] h-12 border-2 border-[#2A0E8F] rounded-sm px-2 text-black font-normal text-lg outline-none"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre..."
            />

            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-[80%] h-12 border-2 border-[#2A0E8F] rounded-sm px-2 text-black font-normal text-lg outline-none"
              name="description"
              type="text"
              placeholder="Descripcion..."
            />

            <div className="w-[80%] h-12 border-2 border-[#2A0E8F] rounded-sm px-2 text-black font-normal text-lg outline-none flex items-center justify-evenly gap-2">
              <span className="text-[#949494] text-base">A partir</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    value={"2021-09-01"}
                    placeholder="Date..."
                    className="w-[40%] h-3/4 rounded-md text-base font-bold text-black bg-[#C4C4C4] focus:border-2 focus:border-[#2A0E8F] outline-none transition-colors duration-200"
                    name="date"
                  >
                    {!selectedDate
                      ? new Date().toLocaleDateString()
                      : selectedDate.toLocaleDateString()}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    initialFocus
                    onSelect={(date) => setSelectedDate(date)}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="w-1/3 h-3/4 rounded-md text-lg font-bold text-black bg-[#C4C4C4] focus:border-2 focus:border-[#2A0E8F] outline-none transition-colors duration-200"
                    name="hour"
                  >
                    {!selectedHour ? "00:00" : selectedHour}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <input
                    type="time"
                    placeholder="12:00"
                    onChange={(e: any) => setSelectedHour(e.target.value)}
                    name="hour"
                    className="w-[150px] h-11 border-2 border-[#2A0E8F] rounded p-1 flex items-center text-center font-bold text-black text-xl justify-center outline-none"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-[80%] h-12 border-2 border-[#2A0E8F] rounded-sm px-2 text-[#949494] font-normal text-lg outline-none flex items-center justify-start"
                  name="frecuency"
                >
                  Repetir{" "}
                  {
                    frequency.find((item) => item.value === selectedFrecuency)
                      ?.name
                  }
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="center">
                <select
                  name="frecuency"
                  value={selectedFrecuency}
                  onChange={(e) => setSelectedFrecuency(e.target.value)}
                  className="w-full h-max border-2 border-[#2A0E8F] outline-none text-black font-semibold rounded-sm p-1"
                >
                  {frequency.map((item) => (
                    <option
                      className="border-2 border-[#2A0E8F] outline-none text-black font-semibold rounded-sm p-1"
                      value={item.value}
                      onChange={() => setSelectedFrecuency(item.value)}
                      key={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </PopoverContent>
            </Popover>
            <button
              type="submit"
              className="w-[80%] h-12 bg-[#2A0E8F] rounded-sm text-white text-lg font-semibold outline-none"
            >
              Agregar
            </button>
          </form>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default FormPills
