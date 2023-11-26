"use client"

import React, { useState } from "react"
import { Formik, Form, Field } from "formik"
import { UserValues } from "@/types/types"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import { z } from "zod"
import axios from "axios"
import Link from "next/link"
import { useMutation } from "react-query"
import { createUser } from "@/lib/controllers/user"

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const createUserMutation = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (values: UserValues) => {
      await createUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    },
    onSuccess: () => {
      toast.success("Usuario creado!")
      router.push("/")
    },
    onError: () => {
      toast.error("Error al crear el usuario")
    },
  })

  const handleSubmit = async (values: UserValues) => {
    if (values.password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden")
    } else {
      setIsLoading(true)
      try {
        await createUserMutation.mutateAsync(values)
      } catch (error) {
        console.log("error")
        toast.error("Algo salio mal")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <main className="absolute w-full h-full top-0 left-0">
      <Toaster />
      <div className="absolute top-6 right-7">
        <strong className="text-4xl text-primary_blue">pw</strong>
      </div>
      <div className="w-full flex justify-start mt-40">
        <h1 className="text-3xl font-extrabold ml-12">
          Crea tu cuenta <br /> de{" "}
          <span className="text-primary_blue">Pillwise</span>
        </h1>
      </div>
      <div className="mb-10">
        <Formik
          onSubmit={(values) => {
            handleSubmit(values)
          }}
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
        >
          {({ errors, touched, values }) => (
            <Form
              autoComplete="off"
              className="flex flex-col justify-center items-center mt-8"
            >
              <div className="my-2">
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre completo..."
                  className="w-80 h-12 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary_blue text-lg font-semibold px-2"
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <div className="mt-3 text-red-600 text-lg text-center">
                    {errors.name}
                  </div>
                ) : null}
              </div>
              <div className="my-2">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email..."
                  className="w-80 h-12 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary_blue text-lg font-semibold px-2"
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <div className="mt-3 text-red-600 text-lg text-center">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="my-2">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña..."
                  className="w-80 h-12 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary_blue text-lg font-semibold px-2"
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <div className="mt-3 text-red-600 text-lg text-center">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div className="my-2">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                  placeholder="Confirma contraseña..."
                  className="w-80 h-12 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary_blue text-lg font-semibold px-2"
                />
              </div>
              <button
                className="absolute bottom-20 w-4/5 h-12 bg-primary_blue rounded-lg text-white font-semibold text-[24px] cursor-pointer"
                type="submit"
              >
                Registrate
              </button>
            </Form>
          )}
        </Formik>
        <h6 className="text-center text-black mt-7 font-bold text-sm">
          ¿Ya tienes una cuenta? Inicia sesion{" "}
          <Link className="text-primary_blue underline" href={"/login"}>
            aquí
          </Link>
        </h6>
      </div>
    </main>
  )
}

export default Register
