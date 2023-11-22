import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function POST(req: Request) {
  try {
    if (req.method !== "POST")
      return NextResponse.json(
        { message: "method not allowed" },
        { status: 405 }
      )

    const response = await req.json()

    if (!response) {
      throw new Error("Response is empty")
    }

    const { title, description, date, frequency, hour, userId } = response

    console.log("response: ", response)

    console.log("userId", typeof userId)

    if (!response) {
      throw new Error("Response is empty")
    }

    const addPills = await prismadb.pills.create({
      data: {
        name: title,
        description: description,
        frequency: frequency,
        hour: hour,
        date: date,
        userId: userId,
      },
    })

    if (!addPills) {
      throw new Error("Error al guardar la pastilla")
    }

    return NextResponse.json({
      message: "Tu pastilla se ha guardado con exito.",
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    )
  }
}
