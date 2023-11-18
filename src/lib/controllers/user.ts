import { EditUserProps, UserValues } from "@/types/types"
import axios from "axios"

const userAPI = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://pillwise-medicine.vercel.app/api/pills"
      : "http://localhost:3000/api/",
})

export const createUser = async (user: UserValues) => {
  userAPI.post("/register", user)
}

export const editUser = async (user: EditUserProps) => {
  userAPI.put("/user/edit", user)
}
