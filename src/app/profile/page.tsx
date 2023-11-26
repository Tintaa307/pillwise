"use client"

import { Field, Form, Formik } from "formik"
import { useSession } from "next-auth/react"
import React, { useEffect, useRef, useState } from "react"
import { statusAuth } from "@/objects/status"
import Loader from "@/components/web/shared/Loader"
import { EditUserProps } from "@/types/types"
import toast from "react-hot-toast"
import { QueryClient, useMutation } from "react-query"
import { editUser } from "@/lib/controllers/user"
import { IconUserFilled, IconPencilMinus } from "@tabler/icons-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const Profile = () => {
  const { data: session, status } = useSession()
  const { LOADING } = statusAuth
  const [isEditing, setIsIsEditing] = useState(false)
  const queryClient = new QueryClient()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")

  const updateUserMutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (values: EditUserProps) => {
      await editUser({
        name: values.name,
        email: values.email,
        oldEmail: session?.user?.email,
        oldName: session?.user?.name,
      })
    },
    onSuccess: () => {
      toast.success("Usuario actualizado")
      queryClient.invalidateQueries("updateUser")
    },
    onError: () => {
      toast.error("Error al actualizar el usuario")
    },
  })

  const handleSubmit = async (values: EditUserProps) => {
    try {
      await updateUserMutation.mutateAsync(values)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("userImage")
    if (storedImageUrl) {
      setImageUrl(storedImageUrl)
    }
  }, [])

  const handleFileChange = () => {
    if (fileRef.current && fileRef.current.files) {
      setFile(fileRef.current.files[0])
      const objectUrl = URL.createObjectURL(fileRef.current.files[0])
      setImageUrl(objectUrl)

      // Guardar la imagen en el localStorage
      localStorage.setItem("userImage", objectUrl)
    }
  }

  return (
    <>
      {status === LOADING ? (
        <Loader />
      ) : (
        <main className="w-full h-screen bg-primary_blue">
          <div className="w-full h-full flex items-center justify-center flex-col">
            <picture className="w-full h-[35%] flex items-center justify-center">
              <div
                className={cn(
                  "relative w-48 h-48 bg-white rounded-full border-[2px] border-black",
                  {
                    "bg-transparent": imageUrl,
                  }
                )}
              >
                <div
                  className={cn(
                    "w-full h-full flex items-center justify-center bg-[#707070]/30 rounded-full overflow-hidden",
                    {
                      "bg-transparent": imageUrl,
                    }
                  )}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="User image"
                      width={200}
                      height={200}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-black/80 text-7xl font-bold">P</span>
                  )}
                </div>
                <div className="relative w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center float-right -mt-11 z-20">
                  <IconPencilMinus
                    onClick={() => fileRef.current?.click()}
                    className={["ri-edit-2-line", "text-black text-2xl"].join(
                      " "
                    )}
                  />
                  <input
                    onChange={handleFileChange}
                    ref={fileRef}
                    type="file"
                    className="hidden"
                  />
                </div>
              </div>
            </picture>
            <section className="w-full h-[65%] rounded-t-[40px] bg-white flex items-center justify-center ">
              <div className="w-full h-full flex items-center justify-center">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                  }}
                  onSubmit={(values) => {
                    console.log(values)
                    handleSubmit(values)
                  }}
                >
                  {({ values, touched, errors }) => (
                    <Form
                      autoComplete="off"
                      className="w-full h-full flex items-center justify-center flex-col"
                    >
                      <div className="w-full h-max flex flex-col my-5">
                        <label className="text-black ml-8 font-semibold text-lg">
                          Nombre completo*
                        </label>
                        <Field
                          name="name"
                          type="text"
                          placeholder={
                            isEditing ? "Nuevo nombre completo..." : ""
                          }
                          disabled={isEditing ? "" : "disabled"}
                          value={isEditing ? values.name : session?.user?.name}
                          className="w-4/5 h-10 border-b-[2px] border-t-0 border-l-0 border-r-0 focus:ring-0 focus:border-b-[#727272] border-[#727272] outline-none text-black text-lg font-bold mx-8 my-4"
                        />
                        {errors.name && touched.name ? (
                          <div className="text-red-500 text-sm font-bold ml-8">
                            {errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-full h-max flex flex-col my-5">
                        <label className="text-black ml-8 font-semibold text-lg">
                          Correo electronico*
                        </label>
                        <Field
                          name="email"
                          type="text"
                          placeholder={isEditing ? "Nuevo email..." : ""}
                          value={
                            isEditing ? values.email : session?.user?.email
                          }
                          disabled={isEditing ? "" : "disabled"}
                          className="w-4/5 h-10 border-b-[2px] border-t-0 border-l-0 border-r-0 focus:ring-0 focus:border-b-[#727272] border-[#727272] outline-none text-black text-lg font-bold mx-8 my-4"
                        />
                        {errors.name && touched.name ? (
                          <div className="text-red-500 text-sm font-bold ml-8">
                            {errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-full flex items-center justify-center flex-row gap-6">
                        <div
                          onClick={() => setIsIsEditing(!isEditing)}
                          className="w-[45%] h-12 rounded-lg bg-primary_blue text-white text-xl font-semibold my-12 -mt-1 flex items-center justify-center"
                        >
                          {isEditing ? (
                            <span>Volver</span>
                          ) : (
                            <span>Editar Perfil</span>
                          )}
                        </div>
                        {isEditing ? (
                          <button
                            type="submit"
                            className="w-[45%] h-12 rounded-lg bg-primary_blue text-white text-xl font-semibold my-12 -mt-1"
                          >
                            Enviar
                          </button>
                        ) : null}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  )
}

export default Profile
