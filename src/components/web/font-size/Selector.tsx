import { cn } from "@/lib/utils"
import React from "react"

type SelectorProps = {
  size: "small" | "medium" | "large"
  selected: "small" | "medium" | "large"
  setSelected: React.Dispatch<
    React.SetStateAction<"small" | "medium" | "large">
  >
}

const Selector = ({ size, selected, setSelected }: SelectorProps) => {
  return (
    <div className="w-1/3 h-full flex items-center justify-center flex-col gap-3">
      <small
        className={cn("text-black font-normal", {
          "text-lg font-medium": size === "small",
          "text-2xl font-semibold": size === "medium",
          "text-4xl font-bold -mt-1": size === "large",
        })}
      >
        a
      </small>
      <div
        onClick={() => setSelected(size)}
        className={cn("w-6 h-6 border-2 border-black rounded-full", {
          "bg-blue-700": size === selected,
        })}
      />
    </div>
  )
}

export default Selector
