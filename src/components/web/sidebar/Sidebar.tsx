"use client"

import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from "react"
import {
  IconMoon,
  IconSmartHome,
  IconBulb,
  IconAddressBook,
  IconUserHeart,
} from "@tabler/icons-react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const router = useRouter()

  const sideBarItems = [
    {
      id: 1,
      title: "Inicio",
      icon: <IconSmartHome className="text-black text-2xl font-semibold" />,
      path: "/",
    },
    {
      id: 2,
      title: "Creditos",
      icon: <IconBulb className="text-black text-2xl font-semibold" />,
      path: "/credits",
    },
    {
      id: 3,
      title: "Contacto",
      icon: <IconAddressBook className="text-black text-2xl font-semibold" />,
      path: "/contact",
    },
    {
      id: 4,
      title: "Accesibilidad",
      icon: <IconUserHeart className="text-black text-2xl font-semibold" />,
      path: "/accessibility",
    },
  ]

  return (
    <aside
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      className={cn(
        "absolute top-0 left-0 w-[70%] h-screen bg-white drop-shadow-custom z-40 flex flex-col shadow-[0_0_13px_#00000040]",
        {
          "translate-x-0 transition-all duration-700": isOpen,
          "-translate-x-full transition-all duration-700 shadow-none": !isOpen,
        }
      )}
    >
      <nav className="w-full h-40 flex items-center">
        <IconMoon
          width={40}
          height={40}
          className={"text-black font-normal ml-5"}
        />
      </nav>
      <div className="w-full h-full mt-8">
        <div className="w-[90%] h-max border-t-0 border-l-0 border-r-0 border-[1px] border-b-black mx-3">
          <h2 className="text-black text-3xl font-semibold ml-2 my-4">
            Indice
          </h2>
        </div>
        <div className="w-full h-full mt-4">
          <ul className="w-full h-full flex flex-col">
            {sideBarItems.map((item, index) => {
              return (
                <li
                  onClick={() => {
                    setIsOpen(false)
                    router.push(item.path)
                  }}
                  key={index}
                  className="h-max flex flex-row my-3 gap-2 ml-5"
                >
                  {item.icon}
                  <small className="text-black font-semibold text-2xl">
                    {item.title}
                  </small>
                </li>
              )
            })}
            <button
              className="absolute bottom-10 w-4/5 h-12 rounded-lg bg-[#2A0E8F] flex items-center justify-center text-white font-semibold text-lg ml-7"
              onClick={() => signOut({ callbackUrl: "/register" })}
            >
              signOut
            </button>
          </ul>
        </div>
      </div>
      <div className="absolute w-full h-max bottom-0 left-0"></div>
    </aside>
  )
}

export default Sidebar
