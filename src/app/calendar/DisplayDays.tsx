import { PillsProps } from "@/types/types"
import React from "react"

const DisplayDays = ({ pills }: { pills: PillsProps[] | undefined }) => {
  return (
    <section className="w-full h-[40vh] bg-primary_blue flex items-center justify-start flex-col">
      <div className="w-full h-max flex items-center justify-center">
        <h1 className="text-white font-bold text-3xl mt-6">
          Calendario de hoy
        </h1>
      </div>
      <div className="w-full h-max flex items-center justify-center">
        <article className="w-[85%] h-[200px] bg-white/80 rounded-md flex mt-10">
          {pills?.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <strong className="text-black text-xl font-semibold">
                Aún no tienes pastillas agregadas
              </strong>
            </div>
          ) : (
            <div></div>
          )}
        </article>
      </div>
    </section>
  )
}

export default DisplayDays
