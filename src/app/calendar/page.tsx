"use client"

import React, { useState } from "react"
import DisplayDays from "./DisplayDays"
import DisplayPills from "./DisplayPills"
import Loader from "@/components/web/shared/Loader"
import { PillsProps } from "@/types/types"
import { QueryClient, useQuery } from "react-query"
import { getPills, getPillsByDate } from "@/lib/controllers/pills"
import { useSession } from "next-auth/react"

const Calendar = () => {
  const { data: session } = useSession()
  const queryClient = new QueryClient()
  const [open, setOpen] = useState(false)
  const date = new Date().toISOString().slice(0, 10)
  const {
    data: pills,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["calendarPills"],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const pills = await getPillsByDate(session?.user?.id!, date)
      return pills as PillsProps[]
    },
    onSuccess: () => {
      queryClient.invalidateQueries("calendarPills")
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
