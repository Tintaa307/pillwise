import React from "react"
import { IconReload, IconMusic } from "@tabler/icons-react"

const Gps = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-start flex-col gap-12">
        <div className="w-full h-max flex items-center justify-center">
          <h1 className="text-black text-3xl font-semibold mt-12">
            Busca tu pastillero
          </h1>
        </div>
        <section className="w-[90%] h-[40%] border-[1.5px] border-black rounded-sm"></section>
        <div className="w-full h-max flex items-center justify-center flex-col gap-4">
          <div>
            <button className="w-[350px] h-[50px] bg-primary_blue text-white text-lg font-medium rounded-xl flex items-center justify-start">
              <IconReload className="absolute mx-4" />
              <span className="w-full flex items-center justify-center">
                Refrescar
              </span>
            </button>
          </div>
          <div>
            <button className="w-[350px] h-[50px] bg-primary_blue text-white text-lg font-medium rounded-xl flex items-center justify-start">
              <IconMusic className="absolute mx-4" />
              <span className="w-full flex items-center justify-center">
                Sonar
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Gps