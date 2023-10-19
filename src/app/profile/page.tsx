"use client"

import { Field, Form, Formik } from "formik"
import { useSession } from "next-auth/react"
import React, { useState } from "react"
import { statusAuth } from "@/objects/status"
import Loader from "@/components/web/shared/Loader"
import { EditUserProps } from "@/types/types"
import toast from "react-hot-toast"
import { QueryClient, useMutation } from "react-query"
import { editUser } from "@/lib/controllers/user"
import { IconUserFilled, IconPencilMinus } from "@tabler/icons-react"

const Profile = () => {
  const { data: session, status } = useSession()
  const { LOADING } = statusAuth
  const [isEditing, setIsIsEditing] = useState(false)
  const queryClient = new QueryClient()

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

  return (
    <>
      {status === LOADING ? (
        <Loader />
      ) : (
        <main className="w-full h-screen bg-indigo-600">
          <div className="w-full h-full flex items-center justify-center flex-col gap-20">
            <picture className="w-48 h-48 rounded-full bg-white border-[2px] border-black">
              <div className="w-full h-full flex items-center justify-center">
                <IconUserFilled
                  width={110}
                  height={110}
                  className={[
                    "ri-user-3-fill",
                    "text-black text-8xl font-bold",
                  ].join(" ")}
                />
              </div>
              <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center float-right -mt-11">
                <IconPencilMinus
                  className={["ri-edit-2-line", "text-black text-2xl"].join(
                    " "
                  )}
                />
              </div>
            </picture>
            <section className="w-full h-max rounded-t-[40px] bg-white flex items-center justify-center ">
              <div className="w-full h-full flex items-center justify-center mt-14">
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
                        <label className="text-black ml-8">
                          Nombre completo
                        </label>
                        <Field
                          name="name"
                          type="text"
                          placeholder={
                            isEditing ? "Write your new full name" : ""
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
                        <label className="text-black ml-8">
                          Correo electronico
                        </label>
                        <Field
                          name="email"
                          type="text"
                          placeholder={isEditing ? "Write your new email" : ""}
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
                          className="w-[45%] h-12 rounded-lg bg-indigo-600 text-white text-xl font-semibold my-12 -mt-1 flex items-center justify-center"
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
                            className="w-[45%] h-12 rounded-lg bg-indigo-600 text-white text-xl font-semibold my-12 -mt-1"
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