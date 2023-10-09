import { UserValues } from "@/types"
import axios from "axios"

const userAPI = axios.create({
  baseURL: "localhost:3000/api/register",
})

export const createUser = async (user: UserValues) => {
  userAPI.post("/", user)
}
