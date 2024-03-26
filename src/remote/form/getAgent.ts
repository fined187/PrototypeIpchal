import { biddingInfoState } from "@/atom"
import axios from "axios"
import { useRecoilState } from "recoil"

export default async function getAgents(seq: number, idNum: string) {
  const agentList = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${seq}/agents`)
  return {
    agentIdNum: idNum,
    ...agentList.data.data,
  }
}