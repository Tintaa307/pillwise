import Image from "next/image"
import React, { useState } from "react"

const Language = () => {
  const [actualLang, setActualLang] = useState("es")
  const images = [
    {
      path: "/spain-flag.avif",
      title: "Español",
      lang: "es",
    },
    {
      path: "/england-flag.jpg",
      title: "Ingles",
      lang: "en",
    },
    {
      path: "/france-flag.png",
      title: "Frances",
      lang: "fr",
    },
    {
      path: "/italy-flag-2.jpg",
      title: "Italiano",
      lang: "ita",
    },
  ]
  return (
    <section className="w-full h-full flex items-center justify-start flex-col gap-12">
      <div className="w-full h-max flex items-center justify-center text-center mt-8">
        <h2 className="w-[70%] text-black text-2xl font-semibold">
          Selecciona tu idioma preferido
        </h2>
      </div>
      <div className="w-full h-max grid grid-cols-2 place-content-center gap-12">
        {images.map((image, index) => (
          <picture
            onClick={() => setActualLang(image.lang)}
            className="w-[100%] h-max flex items-center justify-center flex-col gap-2"
            key={index}
          >
            <Image
              width={120}
              height={120}
              src={image.path}
              className="rounded-sm border-[4px] border-black"
              alt="idioma a seleccionar"
            />
            <small className="text-black font-semibold text-lg">
              {image.title}
              {actualLang === image.lang && " (actual)"}
            </small>
          </picture>
        ))}
      </div>
    </section>
  )
}

export default Language
