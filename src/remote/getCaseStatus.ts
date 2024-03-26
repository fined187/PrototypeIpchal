import baseApiInstance from "./baseURL";

export default async function getCaseStatus(idCode: string) {
  const response = await baseApiInstance.post(`case-status`, {
    idCode: idCode,
  })
  return response.data.data.isBiddingStatus
}