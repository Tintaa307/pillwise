import prismadb from "@/lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const response = await req.json()
    console.log(response)

    if (!response) {
      throw new Error("Response empty")
    }

    return NextResponse.json({ message: "data recieved", data: response })
  } catch (error) {
    return NextResponse.json({ message: "error" + error }, { status: 500 })
  }
}
