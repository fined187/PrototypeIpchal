import axios from "axios";


export async function getBidders(seq: number, idNum: string[]) {
  const bidderList = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${seq}/bidders`)
  return {
    bidderIdNum: idNum,
    ...bidderList.data.data,
  }
}