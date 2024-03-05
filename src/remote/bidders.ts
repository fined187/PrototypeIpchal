import { biddingInfoState } from "@/atom";
import axios from "axios";
import { useRecoilState } from "recoil";

export async function getBidders() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}/bidders`)
  return response.data.data
}