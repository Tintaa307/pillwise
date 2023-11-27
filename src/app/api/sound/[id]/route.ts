import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (req.method !== "GET")
    return NextResponse.json({ message: "method not allowed" }, { status: 405 })
  try {
    const { id } = params

    console.log(id)

    if (!id)
      return NextResponse.json(
        { message: "You are not logged" },
        { status: 400 }
      )

    const user = await prismadb.user.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: "You don't have any pills" },
        { status: 400 }
      )
    }

    console.log(user)

    return NextResponse.json({ sonando: user.sound }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "error" + error }, { status: 500 })
  }
}
