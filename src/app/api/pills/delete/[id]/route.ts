import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (req.method !== "DELETE")
    return NextResponse.json({ message: "method not allowed" }, { status: 405 })

  try {
    if (!params.id)
      return NextResponse.json(
        { message: "You are not logged" },
        { status: 400 }
      )

    const idsString = params.id

    console.log(idsString, typeof idsString)

    const idsArray = idsString.split(",").map((id) => Number(id))

    await prismadb.pills.deleteMany({
      where: {
        id: {
          in: idsArray,
        },
      },
    })

    return NextResponse.json(
      { message: "Pastillas eliminadas correctamente" },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
