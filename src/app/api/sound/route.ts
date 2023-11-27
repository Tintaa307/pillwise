import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function GET(req: Request) {
  try {
    const user = await prismadb.user.findOne({
      where: {
        id: 1,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "error" + error }, { status: 500 })
  }
}
