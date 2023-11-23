import React, { useEffect, useState } from "react"
import FormPills from "./Form"
import { IconPlus } from "@tabler/icons-react"
import { PillsProps } from "@/types/types"

type DisplayPillsProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  pills: PillsProps[] | undefined
}

const DisplayPills = ({ pills, open, setOpen }: DisplayPillsProps) => {
  const arrHours = [
    { hour: "00:00", i: 0 },
    { hour: "04:00", i: 1 },
    { hour: "08:00", i: 2 },
    { hour: "12:00", i: 3 },
    { hour: "16:00", i: 4 },
    { hour: "20:00", i: 5 },
  ]

  const arrFullHours = []

  //56px difference between 4 hours
  //1 hour = 14px

  useEffect(() => {
    console.log(pills)
  }, [pills])

  useEffect(() => {
    console.log("display Pills: ", open)
  }, [open])

  return (
    <section className="w-full h-[70vh] bg-white flex items-center justify-center">
      {pills?.length === 0 ? (
        <>
          <div
            onClick={() => setOpen(true)}
            className="w-[225px] h-[225px] bg-[#CACACA] rounded-full flex items-center justify-center"
          >
            <IconPlus size={150} color="#2A0E8F" className="font-bold" />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col">
          {open && <FormPills setOpen={setOpen} />}
          <header className="w-[95%] h-max flex items-center justify-center">
            <nav className="w-full h-max grid grid-cols-6 place-items-center">
              {arrHours.map((hour, index) => (
                <div
                  key={index}
                  className="w-full h-full flex items-center justify-center"
                >
                  <span className="font-semibold">{hour.hour}</span>
                </div>
              ))}
            </nav>
          </header>
          <div className="relative w-[95%] h-[300px] grid grid-cols-6 place-items-center bg-gray-400/20 rounded-sm">
            {arrHours.map((hour, index) => (
              <div
                key={index}
                className="w-full h-full flex items-center justify-center"
              >
                <span className="w-[1px] h-full bg-slate-500/40">
                  {pills?.map((pill, index2) => (
                    <div key={index2}>
                      {hour.hour === pill.hour && (
                        <div
                          onClick={() => console.log(pill)}
                          className="w-3 h-3 rounded-full bg-primary_blue mt-4"
                        />
                      )}
                    </div>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default DisplayPills
