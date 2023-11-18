import axios from "axios"

const pillsAPI = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://pillwise-medicine.vercel.app/api/pills"
      : "http://localhost:5000/api/pills",
})

export const getPills = async (id: string) => {
  const pills = await pillsAPI.get(`/get/${id}`)
  return pills.data
}
