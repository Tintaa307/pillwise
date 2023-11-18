import React, { useContext, useEffect, useState } from "react"
import Selector from "../font-size/Selector"
import SaveButton from "../save-button"
import { cn } from "@/lib/utils"
import { AccesibilityContext } from "@/context/AccesibilityContext"

const TextToSpeech = () => {
  const [active, setActive] = useState<boolean>(false)
  const { handleTextToSpeech } = useContext(AccesibilityContext)

  useEffect(() => {
    handleTextToSpeech()
  }, [active])

  return (
    <section className="w-full h-full flex items-center justify-start flex-col gap-8">
      <div className="w-full h-max flex items-center justify-center flex-col gap-4 mt-12">
        <div className="w-full h-max flex items-center justify-center flex-col gap-6 mt-12">
          <div className="w-[90%] h-[70px] bg-[#D9D9D9] rounded-md flex items-center justify-between">
            <strong className="text-black font-bold text-lg ml-3">
              Activar lector por voz
            </strong>
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
            <p className="text-black font-normal text-sm mx-7">
              El text to speech ayudara a personas con visibilidad baja o nula y
              a personas mayores a guiarlas por la aplicación mediante una voz
              que leera el texto
            </p>
          </div>
        </div>
      </div>
      <SaveButton margin="mt-12" />
    </section>
  )
}

export default TextToSpeech
