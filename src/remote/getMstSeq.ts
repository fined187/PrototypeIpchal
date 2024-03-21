import axios from "axios"

export default async function getMstSeq(mstSeq: number) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${mstSeq}`)
  return response.data.data
}