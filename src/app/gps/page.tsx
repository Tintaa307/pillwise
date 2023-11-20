"use client"

import React from "react"
import { IconReload, IconMusic } from "@tabler/icons-react"
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const Gps = () => {
  if (typeof window === "undefined") return null
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-start flex-col gap-12">
        <div className="w-full h-max flex items-center justify-center">
          <h1 className="text-black text-3xl font-semibold mt-12">
            Busca tu pastillero
          </h1>
        </div>
        <section className="relative w-[90%] h-[40%] border-[1.5px] border-black rounded-sm">
          <MapContainer
            className="w-full h-full"
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </section>
        <div className="w-full h-max flex items-center justify-center flex-col gap-4">
          <div>
            <button className="w-[350px] h-[50px] bg-primary_blue text-white text-lg font-medium rounded-xl flex items-center justify-start">
              <IconReload className="absolute mx-4" />
              <span className="w-full flex items-center justify-center">
                Refrescar
              </span>
            </button>
          </div>
          <div>
            <button className="w-[350px] h-[50px] bg-primary_blue text-white text-lg font-medium rounded-xl flex items-center justify-start">
              <IconMusic className="absolute mx-4" />
              <span className="w-full flex items-center justify-center">
                Sonar
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Gps
