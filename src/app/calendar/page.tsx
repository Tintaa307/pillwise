"use client"

import React, { useState } from "react"
import DisplayDays from "./DisplayDays"
import DisplayPills from "./DisplayPills"
import Loader from "@/components/web/shared/Loader"
import { PillsProps } from "@/types/types"
import { QueryClient, useQuery } from "react-query"
import { getPills } from "@/lib/controllers/pills"
import { useSession } from "next-auth/react"

const Calendar = () => {
  const { data: session } = useSession()
  const queryClient = new QueryClient()
  const [open, setOpen] = useState(false)
  const {
    data: pills,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pills"],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const pills = await getPills(session?.user?.id!)
      return pills as PillsProps[]
    },
    onSuccess: () => {
      queryClient.invalidateQueries("pills")
    },
    onError: () => {
      console.log("error")
    },
  })

  if (isLoading) return <Loader />
  else if (isError) console.log(error)

  return (
    <main className="w-full h-screen">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <DisplayDays setOpen={setOpen} open={open} pills={pills} />
        <DisplayPills setOpen={setOpen} open={open} pills={pills} />
      </div>
    </main>
  )
}

export default Calendar
