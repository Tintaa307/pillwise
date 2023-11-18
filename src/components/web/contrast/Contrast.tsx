import { cn } from "@/lib/utils"
import React, { useState } from "react"
import Card from "./Card"

const Contrast = () => {
  const [activeContrast, setActiveContrast] = useState(false)
  const [activeWhitePoint, setActiveWhitePoint] = useState(false)
  return (
    <section className="w-full h-full flex items-center justify-start flex-col gap-8">
      <Card
        active={activeContrast}
        setActive={setActiveContrast}
        title="Incrementar el contraste"
        description="Incrementa el contraste entre el primer plano de la app y los colores del fondo de pantalla."
      />

      <Card
        active={activeWhitePoint}
        setActive={setActiveWhitePoint}
        title="Reducir punto blanco"
        description="Reduce la intensidad del brillo de los colores"
      />
    </section>
  )
}

export default Contrast
