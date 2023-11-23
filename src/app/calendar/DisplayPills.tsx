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
  const [indexOfHours, setIndexOfHours] = useState<number[]>([])
  const [arrOfPillsMiddleHours, setArrOfPillsMiddleHours] = useState<number[]>(
    []
  )

  const arrHours = [
    { hour: "00:00", i: 0 },
    { hour: "04:00", i: 1 },
    { hour: "08:00", i: 2 },
    { hour: "12:00", i: 3 },
    { hour: "16:00", i: 4 },
    { hour: "20:00", i: 5 },
  ]

  const arrFullHours = [
    {
      hour: "00:00",
      value: 0,
    },
    {
      hour: "01:00",
      value: 1,
    },
    {
      hour: "02:00",
      value: 2,
    },
    {
      hour: "03:00",
      value: 3,
    },
    {
      hour: "04:00",
      value: 4,
    },
    {
      hour: "05:00",
      value: 5,
    },
    {
      hour: "06:00",
      value: 6,
    },
    {
      hour: "07:00",
      value: 7,
    },
    {
      hour: "08:00",
      value: 8,
    },
    {
      hour: "09:00",
      value: 9,
    },
    {
      hour: "10:00",
      value: 10,
    },
    {
      hour: "11:00",
      value: 11,
    },
    {
      hour: "12:00",
      value: 12,
    },
    {
      hour: "13:00",
      value: 13,
    },
    {
      hour: "14:00",
      value: 14,
    },
    {
      hour: "15:00",
      value: 15,
    },
    {
      hour: "16:00",
      value: 16,
    },
    {
      hour: "17:00",
      value: 17,
    },
    {
      hour: "18:00",
      value: 18,
    },
    {
      hour: "19:00",
      value: 19,
    },
    {
      hour: "20:00",
      value: 20,
    },
    {
      hour: "21:00",
      value: 21,
    },
    {
      hour: "22:00",
      value: 22,
    },
    {
      hour: "23:00",
      value: 23,
    },
  ]

  useEffect(() => {
    const middleHours = arrFullHours.filter((hour) => hour.value % 4 !== 0)
    console.log(middleHours)

    pills?.map((pill) => {
      middleHours.map((hour) => {
        if (pill.hour === hour.hour) {
          const middleValue = arrFullHours.find(
            (hour) => hour.hour === pill.hour
          )?.value

          const prevValue = Number(middleValue! - 2)

          if (prevValue % 4 === 0) {
            const i = prevValue / 4
            console.log(i)

            setIndexOfHours((prev) =>
              [...prev, i].filter((v, i, a) => a.indexOf(v) === i)
            )
          }
        }
      })
    })
  }, [])

  useEffect(() => {
    console.log(indexOfHours)
  }, [indexOfHours])

  //56px difference between 4 hours
  //1 hour = 14px

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
                  {indexOfHours.map((i, index3) => (
                    <div key={index3}>
                      {i === hour.i && (
                        <div
                          onClick={() => console.log(i)}
                          className="w-3 h-3 rounded-full bg-primary_blue mt-4 ml-[28px]"
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
