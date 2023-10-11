import axios from "axios"

const pillsAPI = axios.create({
  baseURL: "http://localhost:3000/api/pills",
})

export const getPills = async (id: string) => {
  const pills = await pillsAPI.get(`/get/${id}`)
  return pills.data
}
