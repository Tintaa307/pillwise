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

    const { sonar, userId } = response

    if (sonar === "sonar") {
      await prismadb.user.update({
        where: {
          id: userId,
        },
        data: {
          sonar: true,
        },
      })
    }

    return NextResponse.json({ message: "sonar guardado", data: response })
  } catch (error) {
    return NextResponse.json({ message: "error" + error }, { status: 500 })
  }
}
