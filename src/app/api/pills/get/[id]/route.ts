import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (req.method !== "GET")
      return NextResponse.json(
        { message: "method not allowed" },
        { status: 405 }
      )

    if (!params.id)
      return NextResponse.json(
        { message: "You are not logged" },
        { status: 400 }
      )

    const pills = await prismadb.pills.findMany({
      where: {
        userId: Number(params.id),
      },
    })

    if (!pills) {
      return NextResponse.json(
        { message: "You don't have any pills" },
        { status: 400 }
      )
    }

    return NextResponse.json(pills, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
