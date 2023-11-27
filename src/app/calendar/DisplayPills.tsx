import React, { useEffect, useState } from "react"
import FormPills from "./Form"
import { IconPlus } from "@tabler/icons-react"
import { PillsProps } from "@/types/types"
import { cn } from "@/lib/utils"
import PillInfo from "@/components/web/pill-info"

type DisplayPillsProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  pills: PillsProps[] | undefined
}

type PillsHoursProps = {
  hour: number
  minutes: number
}

const DisplayPills = ({ pills, open, setOpen }: DisplayPillsProps) => {
  // const [indexOfHours, setIndexOfHours] = useState<number[]>([])
  // const [arrOfPillsMiddleHours, setArrOfPillsMiddleHours] = useState<number[]>(
  //   []
  // )

  const [pillsHours, setPillsHour] = useState<PillsHoursProps[]>([])
  const [userScreenWidht, setUserScreenWidth] = useState<number>(0)
  const [calendarWidth, setCalendarWidth] = useState<number>(0)
  const [oneHourPx, setOneHourPx] = useState<number>(0)
  const [pillInfo, setPillInfo] = useState<PillsProps | undefined>()
  const [pillInfoOpen, setPillInfoOpen] = useState<boolean>(false)

  const arrHours = [
    { hour: "00:00", i: 0 },
    { hour: "04:00", i: 1 },
    { hour: "08:00", i: 2 },
    { hour: "12:00", i: 3 },
    { hour: "16:00", i: 4 },
    { hour: "20:00", i: 5 },
  ]

  useEffect(() => {
    if (pills) {
      const updatedPillsHour = pills.map((pill) => {
        const hour = pill.hour.split(":")[0]
        const minutes = pill.hour.split(":")[1]
        return { hour: Number(hour), minutes: Number(minutes) }
      })

      setPillsHour(updatedPillsHour)
    }
  }, [pills])

  useEffect(() => {
    console.log(pillsHours)
    console.log(pills)
  }, [pillsHours, pills])

  useEffect(() => {
    setUserScreenWidth(window.innerWidth)
    setCalendarWidth(userScreenWidht)
    setOneHourPx(calendarWidth / 6 / 4)
  }, [userScreenWidht, calendarWidth])

  return (
    <section className="w-full h-[70vh] bg-white flex items-center justify-center">
      {pills && pills?.length === 0 ? (
        <>
          {open && <FormPills setOpen={setOpen} />}
          <div
            onClick={() => setOpen(true)}
            className="relative w-[225px] h-[225px] bg-[#CACACA] rounded-full flex items-center justify-center"
          >
            <IconPlus
              onClick={() => setOpen(true)}
              size={150}
              color="#2A0E8F"
              className="font-bold"
            />
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
          <div className="relative w-[95%] h-[300px] grid grid-cols-6 place-items-center bg-gradient-to-r from-50% from-[#d9d9d9] to-[#e2e3db] to-60% rounded-sm">
            <div className="w-full h-full flex items-start justify-start absolute flex-col">
              {pills &&
                pills?.map((pill, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setPillInfo(pill)
                      setPillInfoOpen(true)
                    }}
                    className={cn(
                      "relative w-3 h-3 bg-[#2A0E8F] rounded-full mt-4"
                    )}
                    style={{
                      left:
                        pillsHours[index]?.hour >= 21
                          ? pillsHours[index]?.minutes > 0 ||
                            pillsHours[index]?.hour > 21
                            ? `${
                                oneHourPx * (pillsHours[index]?.hour - 21) -
                                10 +
                                (calendarWidth / 6 / 4) *
                                  (pillsHours[index]?.minutes / 60)
                              }px`
                            : `${
                                (calendarWidth / 6 / 4) *
                                  pillsHours[index]?.hour +
                                oneHourPx * 2 -
                                10 +
                                (calendarWidth / 6 / 4) *
                                  (pillsHours[index]?.minutes / 60)
                              }px`
                          : `${
                              (calendarWidth / 6 / 4) *
                                pillsHours[index]?.hour +
                              oneHourPx * 2 -
                              10 +
                              (calendarWidth / 6 / 4) *
                                (pillsHours[index]?.minutes / 60)
                            }px`,
                    }}
                  />
                ))}
            </div>
            {arrHours.map((hour, index) => (
              <div
                key={index}
                className="w-full h-full flex items-center justify-center"
              >
                <span className="w-[1px] h-full bg-slate-500/40" />
              </div>
            ))}
          </div>
        </div>
      )}
      {pillInfoOpen && (
        <PillInfo {...pillInfo!} setPillInfoOpen={setPillInfoOpen} />
      )}
    </section>
  )
}

export default DisplayPills
