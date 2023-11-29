"use client"

import React, { useEffect, useState } from "react"
import { IconReload, IconMusic } from "@tabler/icons-react"
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import axios from "axios"
import { useSession } from "next-auth/react"
import Map from "@/components/web/Map"

const Gps = () => {
  const { data: session } = useSession()
  const [sound, setSound] = useState(false)
  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition)
    } else {
      const x: HTMLDivElement = document.createElement("div")
      x.innerHTML = "Geolocation is not supported by this browser."
    }
  }, [])

  function getPosition(position: GeolocationPosition) {
    setLat(position.coords.latitude)
    setLong(position.coords.longitude)
  }

  const handleSubmit = () => {
    try {
      axios
        .post("/api/hardware", {
          message: "sonar",
          userId: session?.user?.id,
        })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setSound(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session?.user.id) {
      try {
        axios
          .get(`/api/sound/${session?.user.id}`)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }, [sound])

  return (
    <>
      <main className="w-full h-screen flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-start flex-col gap-12">
          <div className="w-full h-max flex items-center justify-center">
            <h1 className="text-black text-3xl font-semibold mt-12">
              Busca tu pastillero
            </h1>
          </div>
          <section className="relative w-[90%] h-[40%] border-[1.5px] border-black rounded-sm">
            <Map lat={lat} long={long} />
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
              <button
                onClick={handleSubmit}
                className="w-[350px] h-[50px] bg-primary_blue text-white text-lg font-medium rounded-xl flex items-center justify-start"
              >
                <IconMusic className="absolute mx-4" />
                <span className="w-full flex items-center justify-center">
                  Sonar
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Gps
