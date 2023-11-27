import { NextResponse } from "next/server"
import prismadb from "@/lib/db"
import { PillsProps } from "@/types/types"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (req.method !== "PUT")
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })

  try {
    const { id } = params
    const response = await req.json()

    console.log(response)

    if (!id) {
      return NextResponse.json({ error: "Empty data" }, { status: 400 })
    }

    if (!response) {
      return NextResponse.json({ error: "Empty data" }, { status: 400 })
    }

    const getUserPills = (await prismadb.pills.findMany({
      where: {
        userId: id,
      },
    })) as PillsProps[]

    if (!getUserPills) {
      return NextResponse.json({ message: "no rutines" }, { status: 400 })
    }

    const pill = getUserPills.find(
      (pill) => pill?.hour === response.hour && pill?.hour === response.hour
    )

    if (!pill) {
      return NextResponse.json({ message: "Rutine not found" }, { status: 404 })
    }

    const updatePill = await prismadb.pills.update({
      where: {
        id: pill!.id,
      },
      data: {
        name: response.name,
        hour: response.hour,
        frequency: response.frequency,
      },
    })

    if (!updatePill) {
      return NextResponse.json({ message: "error updating" }, { status: 400 })
    }

    console.log(updatePill)

    return NextResponse.json(
      { message: "Pill update succesfully" },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
