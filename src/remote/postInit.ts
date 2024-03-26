import axios from "axios";
import baseApiInstance from "./baseURL";

export default async function postInit(aseUserId: string, infoId: string, caseNo: string, mulSeq: string, biddingDate: string, biddingTime: string) {
  const response = await baseApiInstance.post(`inits`, {
    aesUserId: aseUserId,
    infoId: infoId,
    caseNo: caseNo,
    mulSeq: mulSeq,
    biddingDate: biddingDate,
    biddingTime: biddingTime
  });
  return response.data.data;
}