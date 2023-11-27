import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
  }

  try {
    const response = await req.json()
    console.log(response)

    if (!response) {
      throw new Error("Response empty")
    }

    const { message } = response

    if (message === "recibido") {
      await prismadb.user.update({
        where: {
          id: 1,
        },
        data: {
          sound: false,
        },
      })
    }

    return NextResponse.json(
      { message: "sonar guardado", data: response },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: "error" + error }, { status: 500 })
  }
}
