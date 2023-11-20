"use client"

import React, { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Formik, Form, Field } from "formik"
import { LoginValues } from "@/types/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { AxiosError } from "axios"
import { signIn, useSession } from "next-auth/react"
import { statusAuth } from "@/objects/status"
import Loader from "@/components/web/shared/Loader"
import { GoogleLogo } from "@/components/icons/Icons"

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { status } = useSession()
  const { LOADING } = statusAuth
  const router = useRouter()

  async function loginWithGoogle() {
    setIsLoading(true)
    try {
      await signIn("google").then((response) => {
        if (response?.error) {
          toast.error(response?.error)
        } else {
          toast.success("Te has logueado exitosamente!")
          router.push("/")
        }
      })
    } catch (error) {
      toast.error("Algo salio mal")
    } finally {
      setIsLoading(false)
    }
  }

  const logIn = async (values: LoginValues) => {
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
        .then((response) => {
          if (response?.error) {
            toast.error(response?.error)
          } else {
            toast.success("Te has logueado exitosamente!")
            router.push("/")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.message)
        return
      }
      if (error instanceof AxiosError) {
        toast.error(error.message)
        return
      }
    }
  }

  return (
    <>
      {status === LOADING ? (
        <Loader />
      ) : (
        <main className="absolute w-full h-full top-0 left-0">
          <Toaster />
          <div className="absolute top-6 right-7">
            <strong className="text-4xl text-[#553AFD]">pw</strong>
          </div>
          <div className="w-full flex justify-start mt-40">
            <h1 className="text-3xl font-extrabold ml-12">
              Bienvenido <br /> a{" "}
              <span className="text-[#553AFD]">Pillwise</span>
            </h1>
          </div>
          <div className="mb-10">
            <Formik
              onSubmit={(values) => {
                logIn(values)
              }}
              initialValues={{
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
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
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
                      label="Password"
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
                  <h6 className="text-center text-black mt-7 font-bold text-sm">
                    ¿No tienes una cuenta aún? Registrate{" "}
                    <Link
                      className="text-primary_blue underline"
                      href={"/register"}
                    >
                      aquí
                    </Link>
                  </h6>
                  <div className="w-full flex justify-center items-center text-center flex-row gap-3 mt-7">
                    <div className="w-[40%] h-[1px] bg-black"></div>
                    <small className="font-bold text-sm">O</small>
                    <div className="w-[40%] h-[1px] bg-black"></div>
                  </div>
                  <article className="w-full flex text-center justify-center items-center mt-10">
                    <div
                      className="w-4/5 h-[50px] bg-[#f26161] rounded-lg flex items-center justify-center"
                      onClick={loginWithGoogle}
                    >
                      <GoogleLogo />
                    </div>
                  </article>
                  <button
                    className="w-4/5 h-12 my-8 bg-primary_blue rounded-lg text-white font-semibold text-[24px] cursor-pointer"
                    type="submit"
                  >
                    Continuar
                  </button>
                </Form>
              )}
            </Formik>
            <article className="flex text-center justify-center items-center mb-5 px-5">
              <small className="font-medium text-[13px]">
                Al iniciar sesion aceptas nuestros{" "}
                <span className="font-black italic underline">
                  Terminos y Condiciones
                </span>{" "}
                y{" "}
                <span className="font-black italic underline">
                  Politica de Privacidad
                </span>
                .
              </small>
            </article>
          </div>
        </main>
      )}
    </>
  )
}

export default Login
