import axios from "axios";

export default async function postInit(aseUserId: string, infoId: string, caseNo: string, mulSeq: string, biddingDate: string, biddingTime: string) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}inits`, {
    aesUserId: aseUserId ?? "",
    infoId: infoId,
    caseNo: caseNo,
    mulSeq: mulSeq,
    biddingDate: biddingDate,
    biddingTime: biddingTime
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data.data;
}