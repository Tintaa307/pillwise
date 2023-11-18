"use client"

import { IconArrowBack } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import React from "react"

const ArrowBackButton = ({ route }: { route: string }) => {
  const router = useRouter()
  return (
    <div className="absolute top-3 left-3">
      <IconArrowBack
        onClick={() => router.push(route)}
        className="text-white"
        size={40}
      />
    </div>
  )
}

export default ArrowBackButton
