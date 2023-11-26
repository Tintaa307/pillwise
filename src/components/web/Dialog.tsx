import { PillsProps } from "@/types/types"
import React from "react"

type DialogProps = {
  handleSubmit: (e: any) => void
}

const Dialog = ({ handleSubmit }: DialogProps) => {
  return (
    <main className="w-full h-screen bg-black/60 absolute top-0 left-0 z-50 flex items-center justify-center">
      <div className="w-[97%] h-[180px] bg-[#13131A] flex items-start justify-start flex-col rounded-sm border-[1px] border-white/40">
        <header className="w-full h-max flex items-start justify-start">
          <nav className="w-full h-max flex items-start justify-start flex-col gap-2">
            <h1 className="text-white text-xl font-semibold ml-3 mt-4">
              ¿Estás seguro de esto?
            </h1>
            <p className="text-white/60 text-[14px] font-normal ml-4">
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              su pastilla.
            </p>
          </nav>
        </header>
        <div className="w-full h-full flex items-end justify-end">
          <button
            onClick={handleSubmit}
            className="w-[100px] h-10 bg-red-600 rounded-sm text-white text-base font-semibold mr-3 mb-3"
          >
            Confimar
          </button>
          <button className="w-[100px] h-10 bg-transparent rounded-sm text-white text-base font-semibold mr-3 mb-3 border-[1px] border-white/40">
            Cancelar
          </button>
        </div>
      </div>
    </main>
  )
}

export default Dialog
