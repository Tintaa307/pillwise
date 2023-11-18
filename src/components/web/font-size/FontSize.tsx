import React, { useState } from "react"
import Selector from "./Selector"

const FontSize = () => {
  const [selected, setSelected] = useState<"small" | "medium" | "large">(
    "medium"
  )
  return (
    <section className="w-full h-full flex items-center justify-center flex-col">
      <div className="w-full h-max flex items-center justify-center flex-col gap-4">
        <div className="w-[80%] h-28 flex items-center justify-center flex-row bg-[#D9D9D9] rounded-md">
          <Selector
            selected={selected}
            setSelected={setSelected}
            size="small"
          />
          <Selector
            selected={selected}
            setSelected={setSelected}
            size="medium"
          />
          <Selector
            selected={selected}
            setSelected={setSelected}
            size="large"
          />
        </div>
        <div className="w-full flex items-center justify-start">
          <p className="text-black font-normal text-base mx-12">
            El aumento del tamaño de la fuente, servirá para las personas que
            tengan visión restringida y se les dificulte leer desde lejos
          </p>
        </div>
      </div>
    </section>
  )
}

export default FontSize
