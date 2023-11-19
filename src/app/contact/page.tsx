"use client"

import React from "react"
import { IconPhone, IconMessage } from "@tabler/icons-react"
import ArrowBackButton from "@/components/web/arrow-back-button"
import toast, { Toaster } from "react-hot-toast"
import { redirect } from "next/navigation"
import Link from "next/link"

type MessageProps = {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as MessageProps

    console.log(data)

    if (data.name || data.email || data.message) {
      toast.success("Mensaje enviado correctamente")
      e.currentTarget.reset()
    } else {
      toast.error("Por favor rellene todos los campos")
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center flex-col bg-primary_blue">
      <Toaster />
      <div className="w-full h-[28%] flex items-center justify-center flex-row gap-8">
        <div className="w-[118px] h-[118px] bg-white rounded-sm flex items-center justify-center flex-col gap-2">
          <span className="w-16 h-16 bg-primary_blue rounded-full flex items-center justify-center">
            <IconPhone className="text-white font-bold" size={30} />
          </span>
          <small className="text-black text-lg font-semibold">Telefono</small>
        </div>

        <Link
          target="_blank"
          href={
            "https://api.whatsapp.com/send?phone=+5491144489123&text=Necesito ayuda con pillwise."
          }
        >
          <div className="w-[118px] h-[118px] bg-white rounded-sm flex items-center justify-center flex-col gap-2">
            <span className="w-16 h-16 bg-primary_blue rounded-full flex items-center justify-center">
              <IconMessage className="text-white font-bold" size={30} />
            </span>
            <small className="text-black text-lg font-semibold">Whatsapp</small>
          </div>
        </Link>
      </div>

      <div className="w-full h-[72%] flex items-center justify-start flex-col bg-white rounded-t-3xl">
        <div className="w-full flex items-center justify-center h-max mt-6">
          <h2 className="text-black text-3xl font-bold">Contáctanos</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="w-full h-max flex items-center justify-center flex-col gap-6 mt-6"
        >
          <div className="w-full h-max flex items-center justify-start flex-col gap-1">
            <div className="w-full h-max flex items-start justify-start">
              <label
                className="text-black font-bold text-lg ml-8"
                htmlFor="name"
              >
                Nombre*
              </label>
            </div>
            <input
              className="w-[85%] h-14 border-none rounded-md outline-none shadow-[2px_4px_8px_#707070] text-black font-semibold px-4 border-[1px] border-[#707070]"
              placeholder="Escriba su nombre"
              name="name"
              type="text"
            />
          </div>
          <div className="w-full h-max flex items-center justify-start flex-col gap-1">
            <div className="w-full h-max flex items-start justify-start">
              <label
                className="text-black font-bold text-lg ml-8"
                htmlFor="email"
              >
                Email*
              </label>
            </div>
            <input
              className="w-[85%] h-14 border-none rounded-md outline-none shadow-[2px_4px_8px_#707070] text-black font-semibold px-4 border-[1px] border-[#707070]"
              placeholder="Escriba su email"
              name="email"
              type="email"
            />
          </div>
          <div className="w-full h-max flex items-center justify-start flex-col gap-1">
            <div className="w-full h-max flex items-start justify-start">
              <label
                className="text-black font-bold text-lg ml-8"
                htmlFor="message"
              >
                Mensaje*
              </label>
            </div>
            <textarea
              className="w-[85%] h-24 border-none rounded-md outline-none shadow-[2px_4px_8px_#707070] text-black font-semibold px-4 py-2 border-[1px] border-[#707070]"
              placeholder="Escriba su mensaje"
              name="message"
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <button className="w-[85%] h-14 rounded-md outline-none border-none bg-primary_blue text-white text-lg font-normal">
            Enviar
          </button>
        </form>
      </div>
      <ArrowBackButton route="/" />
    </main>
  )
}

export default Contact
