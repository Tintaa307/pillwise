"use client"

import React, { useEffect, useState } from "react"
import Language from "@/components/web/language/Language"
import Animations from "@/components/web/animations/Animations"
import Contrast from "@/components/web/contrast/Contrast"
import FontSize from "@/components/web/font-size/FontSize"
import TextToSpeech from "@/components/web/text-to-speech/TextToSpeech"
import ArrowBackButton from "@/components/web/arrow-back-button"

const Config = ({ params }: { params: { slug: string } }) => {
  const [renderElement, setRenderElement] = useState<string>()

  useEffect(() => {
    setRenderElement(params.slug)
  }, [params.slug])

  const title = params.slug.charAt(0).toLocaleUpperCase()
  return (
    <main className="w-full h-screen flex items-center justify-center flex-col bg-primary_blue">
      <ArrowBackButton route="/accessibility" />
      <div className="w-full h-[25%] flex items-center justify-center">
        <h1 className="text-white text-3xl font-semibold">
          {title + params.slug.slice(1, params.slug.length)}
        </h1>
      </div>
      <section className="w-full h-[75%] flex items-center justify-center bg-white rounded-3xl">
        {renderElement === "language" && <Language />}
        {renderElement === "animations" && <Animations />}
        {renderElement === "contrast" && <Contrast />}
        {renderElement === "font-size" && <FontSize />}
        {renderElement === "voice-reader" && <TextToSpeech />}
      </section>
    </main>
  )
}

export default Config
