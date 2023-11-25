import { PillsProps } from "@/types/types"
import axios from "axios"

const pillsAPI = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://pillwise-medicine.vercel.app/api/pills"
      : "http://localhost:3000/api/pills",
})

export const getPills = async (id: string) => {
  const pills = await pillsAPI.get(`/get/${id}`)
  return pills.data
}

export const getPillsByDate = async (id: string, date: string) => {
  const pills = await pillsAPI.get(`/get/${id}/${date}`)
  return pills.data
}

export const createPill = async (pill: PillsProps) => {
  await pillsAPI.post("/create", pill)
}
