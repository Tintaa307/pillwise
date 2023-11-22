import React from "react"
import ArrowBackButton from "@/components/web/arrow-back-button"
import { IconAdjustmentsHorizontal } from "@tabler/icons-react"
import Card from "./Card"

const HistoryPills = () => {
  return (
    <main className="relative w-full h-screen">
      <ArrowBackButton route="/" className="text-black" />
      <div className="absolute right-3 top-5">
        <IconAdjustmentsHorizontal size={30} />
      </div>
      <div className="w-full h-full flex items-center justify-start flex-col gap-12">
        <div className="mt-20">
          <h1 className="text-black font-bold text-2xl">
            Historial de pastillas
          </h1>
        </div>
        <section className="w-full h-max flex items-center justify-center flex-col gap-2">
          <Card state={"active"} title={"Tafirol"} hour={"13:00"} />
          <Card state={"missed"} title={"Tafirol"} hour={"13:00"} />
          <Card state={"pending"} title={"Tafirol"} hour={"13:00"} />
          <Card state={"pending"} title={"Tafirol"} hour={"13:00"} />
          <Card state={"missed"} title={"Tafirol"} hour={"13:00"} />
          <Card state={"active"} title={"Tafirol"} hour={"13:00"} />
          <Card state={"missed"} title={"Tafirol"} hour={"13:00"} />
        </section>
      </div>
    </main>
  )
}

export default HistoryPills
