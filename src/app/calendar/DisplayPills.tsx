import React, { useState } from "react"
import FormPills from "./Form"
import { IconPlus } from "@tabler/icons-react"
import { PillsProps } from "@/types/types"

const DisplayPills = ({ pills }: { pills: PillsProps[] | undefined }) => {
  const [open, setOpen] = useState(false)

  const arrHours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]

  const colsNumber = 6

  return (
    <section className="w-full h-[60vh] bg-white flex items-center justify-center">
      {pills?.length === 0 ? (
        <>
          <div
            onClick={() => setOpen(true)}
            className="w-[225px] h-[225px] bg-[#CACACA] rounded-full flex items-center justify-center"
          >
            <IconPlus size={150} color="#2A0E8F" className="font-bold" />
          </div>
          {open && <FormPills setOpen={setOpen} />}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <header className="w-[95%] h-max flex items-center justify-center">
            <nav className="w-full h-max grid grid-cols-6 place-items-center">
              {arrHours.map((hour, index) => (
                <div
                  key={index}
                  className="w-full h-full flex items-center justify-center"
                >
                  <span className="font-semibold">{hour}</span>
                </div>
              ))}
            </nav>
          </header>
          <div className="relative w-[95%] h-[400px] grid grid-cols-6 place-items-center bg-gray-400/20 rounded-sm">
            {Array.from(Array(colsNumber), (_, i) => (
              <div
                key={i}
                className="w-full h-full flex items-center justify-center"
              >
                <span className="w-[1px] h-full bg-slate-500/40"></span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default DisplayPills
