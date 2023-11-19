"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import {
  IconRadar2,
  IconCalendarDue,
  IconSmartHome,
  IconMessage,
  IconUser,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react"

const Menu = () => {
  const [selected, setSelected] = useState("/")
  const pathname = usePathname()

  // const handleSelected = (e: MouseEvent<HTMLLIElement>) => {
  //   const clicked = e.target as HTMLLIElement
  //   const elementId = clicked.id
  //   setSelected(elementId)
  // }

  const navIcons = [
    {
      id: "1",
      name: "Gps",
      icon: (
        <IconRadar2
          id="1"
          width={28}
          height={28}
          className={cn("text-black", {
            "text-primary_blue": "/gps" === pathname,
          })}
        />
      ),
      url: "/gps",
    },
    {
      id: "2",
      name: "Calendar",
      icon: (
        <IconCalendarDue
          id="2"
          width={28}
          height={28}
          className={cn("text-black", {
            "text-primary_blue": "/calendar" === pathname,
          })}
        />
      ),
      url: "/calendar",
    },
    {
      id: "3",
      name: "Home",
      icon: (
        <IconSmartHome
          id="3"
          width={28}
          height={28}
          className={cn("text-black", {
            "text-primary_blue": "/" === pathname,
          })}
        />
      ),
      url: "/",
    },
    {
      id: "4",
      name: "Chat",
      icon: (
        <IconMessage
          id="4"
          width={28}
          height={28}
          className={cn("text-black", {
            "text-primary_blue": "/chat" === pathname,
          })}
        />
      ),
      url: "https://pillwise-chat.vercel.app/",
    },
    {
      id: "5",
      name: "Profile",
      icon: (
        <IconUser
          id="5"
          width={28}
          height={28}
          className={cn("text-black", {
            "text-primary_blue": "/profile" === pathname,
          })}
        />
      ),
      url: "/profile",
    },
  ]

  return (
    <>
      {pathname !== "/login" && pathname !== "register" ? (
        <header
          className={cn(
            "fixed bottom-0 left-0 w-full h-16 z-40 bg-white shadow-[0_0_10px_#00000040]",
            {
              "translate-y-0 transition-all duration-200": open,
              "translate-y-full transition-all duration-200": !open,
            }
          )}
        >
          <nav className="w-full h-full flex items-center justify-center">
            <ul className="w-full flex flex-row justify-between px-5 items-center">
              {navIcons.map((icon, index) => (
                <div key={index}>
                  <li
                    onClick={() => setSelected(icon.url)}
                    className="flex justify-center items-center gap-1 flex-col"
                  >
                    <Link className="mt-2" href={icon.url}>
                      {icon.icon}
                    </Link>
                    <small className="text-black font-semibold">
                      {icon.name}
                    </small>
                  </li>
                </div>
              ))}
            </ul>
          </nav>
        </header>
      ) : null}
    </>
  )
}

export default Menu
