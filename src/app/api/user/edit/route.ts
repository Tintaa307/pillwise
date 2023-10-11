import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function PUT(req: Request) {
  try {
    if (req.method !== "PUT")
      return NextResponse.json(
        { message: "method not allowed" },
        { status: 405 }
      )

    const response = await req.json()

    const { name: newName, email: newEmail, oldEmail, oldName } = response

    console.log(response)

    if (!oldEmail || !oldName) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      )
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: oldEmail,
      },
    })

    if (!existingUser) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 400 }
      )
    }

    const updatedUser = await prismadb.user.update({
      where: {
        email: oldEmail,
      },
      data: {
        name: newName ? newName : oldName,
        email: newEmail ? newEmail : oldEmail,
      },
    })

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Something went wrong with the update" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: "error" + error }, { status: 500 })
  }
}
