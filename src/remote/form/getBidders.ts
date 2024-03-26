import axios from "axios";


export async function getBidders(seq: number, idNum: string[]) {
  const bidderList = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${seq}/bidders`)
  return {
    bidderIdNum1: idNum.map((id) => id?.substring(0, 6)),
    bidderIdNum2: idNum.map((id) => id?.substring(6, 13)),
    ...bidderList.data.data,
  }
}