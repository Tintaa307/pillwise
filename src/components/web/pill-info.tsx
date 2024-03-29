import { PillsProps } from "@/types/types"
import React from "react"
import { IconX } from "@tabler/icons-react"

type PillInfoProps = {
  setPillInfoOpen: React.Dispatch<React.SetStateAction<boolean>>
  name: string
  description: string
  date: Date | undefined
  frequency: string
  hour: string
}

const PillInfo = ({
  name,
  setPillInfoOpen,
  date,
  description,
  frequency,
  hour,
}: PillInfoProps) => {
  return (
    <main className="absolute top-0 left-0 bg-black/50 w-full h-screen flex items-center justify-center">
      <section className="relative w-[95%] h-max flex items-start justify-start flex-col bg-white rounded-sm gap-2">
        <div className="absolute top-3 right-3">
          <IconX
            className="w-6 h-6 text-black cursor-pointer"
            onClick={() => setPillInfoOpen(false)}
          />
        </div>
        <div className="w-full h-max flex items-start justify-start flex-col gap-2">
          <h2 className="text-black text-2xl font-semibold mt-4 ml-4">
            Pastilla - {name}
          </h2>
          <p className="text-sm text-black font-semibold ml-4">{description}</p>
        </div>
        <div className="w-full h-max flex items-center justify-center">
          <article className="w-[95%] h-[250px] bg-primary_blue mb-2 rounded-sm flex items-center justify-start flex-col gap-6">
            <h2 className="text-white font-semibold text-xl mt-4">
              Informacion general
            </h2>
            <div className="w-full h-max flex items-start justify-center flex-col gap-5">
              <h3 className="text-white text-semibold text-xl ml-6">
                Fecha: {date?.toString()}
              </h3>
              <h3 className="text-white text-semibold text-xl ml-6">
                Frecuencia: {frequency}
              </h3>
              <h3 className="text-white text-semibold text-xl ml-6">
                Hora: {hour}
              </h3>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default PillInfo
