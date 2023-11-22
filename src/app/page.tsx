"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { statusAuth } from "@/objects/status"
import { motion } from "framer-motion"
import Sidebar from "@/components/web/sidebar/Sidebar"
import Loader from "@/components/web/shared/Loader"
import { PillsProps } from "@/types/types"
import { IconMenu2, IconHistory } from "@tabler/icons-react"
import { useQuery } from "react-query"
import { getPills } from "@/lib/controllers/pills"
import { QueryClient } from "react-query"

export default function Home() {
  const { status, data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { AUTH, NOT_AUTH, LOADING } = statusAuth
  const [auth, setAuth] = useState(NOT_AUTH)
  const queryClient = new QueryClient()
  const router = useRouter()

  const {
    data: pills,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pills"],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const pills = await getPills(session?.user?.id!)
      return pills as PillsProps[]
    },
    onSuccess: () => {
      queryClient.invalidateQueries("pills")
    },
    onError: () => {
      console.log("error")
    },
  })

  useEffect(() => {
    if (status === LOADING) {
      setAuth(LOADING)
    } else if (status === AUTH) {
      setAuth(AUTH)
    } else {
      router.push("/login")
    }
  }, [status])

  if (isLoading) return <Loader />
  else if (isError) console.log(error)

  return (
    <main>
      <>
        {auth === LOADING || loading ? (
          <Loader />
        ) : (
          <main className="w-full h-screen flex items-center justify-center flex-col gap-10">
            <div className="absolute top-5 left-5">
              <IconMenu2
                onClick={() => setIsOpen(true)}
                width={30}
                height={30}
              />
            </div>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="w-full h-full flex items-center text-center justify-start flex-col gap-4">
              <h1 className="text-black font-semibold text-2xl mt-[68px] mb-12">
                Bienvenido, {session?.user.name}
              </h1>
              <div className="w-full h-max flex flex-row justify-center items-center gap-3">
                <div
                  onClick={() => router.push("/history-of-pills")}
                  className="w-[85%] h-[80px] flex items-center justify-center flex-row rounded-lg bg-[#2A0E8F] gap-4"
                >
                  <h5 className="text-white font-semibold text-xl px-1">
                    Registro de pastillas
                  </h5>
                  <IconHistory
                    width={25}
                    hanging={25}
                    className={"text-white text-2xl"}
                  />
                </div>
              </div>
              <motion.div className="w-full h-max flex items-center justify-center flex-col mt-8 gap-4">
                {pills?.map((pill, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: -60 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.3,
                        delay: 0.1 * index,
                        type: "tween",
                      },
                    }}
                    key={index}
                    className="w-[85%] h-[90px] flex items-center justify-between rounded-lg bg-[#2A0E8F]"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <strong className="text-white font-semibold text-6xl ml-2">
                        {pill.hour}
                      </strong>
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <h5 className="font-semibold text-white text-lg">
                        {pill.name} <br />
                      </h5>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </main>
        )}
      </>
    </main>
  )
}
