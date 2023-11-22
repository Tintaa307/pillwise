"use client"

import { cn } from "@/lib/utils"
import { IconArrowBack } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import React from "react"

const ArrowBackButton = ({
  route,
  className,
}: {
  route: string
  className?: string
}) => {
  const router = useRouter()
  return (
    <div className="absolute top-3 left-3">
      <IconArrowBack
        onClick={() => router.push(route)}
        className={cn("text-white", className)}
        size={40}
      />
    </div>
  )
}

export default ArrowBackButton
