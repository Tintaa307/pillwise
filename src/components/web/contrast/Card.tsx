import { cn } from "@/lib/utils"
import React, { SetStateAction } from "react"

type CardProps = {
  active: boolean
  setActive: React.Dispatch<SetStateAction<boolean>>
  title: string
  description: string
}

const Card = ({ active, setActive, title, description }: CardProps) => {
  return (
    <div className="w-full h-max flex items-center justify-center flex-col gap-6 mt-12">
      <div className="w-[90%] h-[70px] bg-[#D9D9D9] rounded-md flex items-center justify-between">
        <strong className="text-black font-bold text-lg ml-3">{title}</strong>
        <span
          className={cn(
            "w-16 h-8 bg-[#949494] mr-3 rounded-full flex items-center justify-start transition-all duration-200",
            {
              "justify-end transition-all duration-200 bg-blue-600": active,
            }
          )}
        >
          <div
            onClick={() => setActive(!active)}
            className="w-[26px] h-[26px] bg-white rounded-full mx-1 transition-all duration-200"
          />
        </span>
      </div>
      <div className="w-full h-max flex items-center justify-start">
        <p className="text-black font-normal text-sm mx-7">{description}</p>
      </div>
    </div>
  )
}

export default Card
