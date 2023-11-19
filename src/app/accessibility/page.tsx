"use client"

import React from "react"
import {
  IconWorld,
  IconBulb,
  IconZoomScan,
  IconTextScan2,
  IconDragDrop,
  IconChevronRight,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import ArrowBackButton from "@/components/web/arrow-back-button"

const Accessibility = () => {
  const router = useRouter()
  const arrItems = [
    {
      icon: <IconWorld size={30} className="text-primary_blue" />,
      title: "Idioma",
      path: "/accessibility/language",
    },
    {
      icon: <IconBulb size={30} className="text-primary_blue" />,
      title: "Contraste",
      path: "/accessibility/contrast",
    },
    {
      icon: <IconZoomScan size={30} className="text-primary_blue" />,
      title: "Tamaño fuente",
      path: "/accessibility/font-size",
    },
    {
      icon: <IconTextScan2 size={30} className="text-primary_blue" />,
      title: "Lector por voz",
      path: "/accessibility/voice-reader",
    },
    {
      icon: <IconDragDrop size={30} className="text-primary_blue" />,
      title: "Animaciones",
      path: "/accessibility/animations",
    },
  ]

  return (
    <main className="w-full h-screen flex items-center justify-center flex-col bg-primary_blue">
      <ArrowBackButton route="/" />
      <div className="w-full h-[25%] flex items-center justify-center">
        <h1 className="text-white font-bold text-4xl">Accesibilidad</h1>
      </div>
      <section className="w-full h-[75%] flex items-center justify-start bg-white rounded-t-3xl">
        <div className="w-full h-full">
          <ul className="w-full h-max flex items-center justify-center flex-col mt-8">
            {arrItems.map((item, index) => (
              <li
                onClick={() => router.push(item.path)}
                key={index}
                className="relative w-full h-20 flex items-center justify-start flex-row hover:bg-black/10"
              >
                <div className="mx-8">{item.icon}</div>
                <span
                  className="w-full flex items-center
                 justify-start text-black text-xl font-semibold"
                >
                  {item.title}
                </span>
                <div>
                  <IconChevronRight
                    className="absolute flex top-[34%] right-6 text-primary_blue"
                    size={30}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Accessibility
