import { cn } from "@/lib/utils"
import React from "react"

const SaveButton = ({ margin }: { margin: string }) => {
  return (
    <div
      className={cn("w-full h-max flex items-center justify-center", margin)}
    >
      <button className="w-[368px] h-[50px] text-white text-lg font-semibold bg-primary_blue rounded-md outline-none">
        Aceptar
      </button>
    </div>
  )
}

export default SaveButton
