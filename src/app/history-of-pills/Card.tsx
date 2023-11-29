"use client"

import { cn } from "@/lib/utils"
import React from "react"

type CardProps = {
  title: string
  hour: string
  state: string
}

const Card = ({ hour, title, state }: CardProps) => {
  return (
    <div
      className={cn(
        "w-[80%] h-14 bg-primary_grey flex items-center justify-evenly rounded-sm gap-7",
        {}
      )}
    >
      <div className="w-1/4 h-full flex items-center justify-center">
        <small className="text-white text-xl font-bold ml-3">{hour}</small>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <strong className="text-white text-lg">{title}</strong>
      </div>
      <div className="w-1/4 h-full flex items-center justify-center">
        <span
          className={cn("w-5 h-5 rounded-full", {
            "bg-green-500": state === "active",
            "bg-red-500": state === "missed",
            "bg-orange-400": state === "pending",
          })}
        />
      </div>
    </div>
  )
}

export default Card
