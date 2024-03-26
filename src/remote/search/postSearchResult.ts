import baseApiInstance from "../baseURL";

export default async function postSearchResult(infoId: string, caseNo: string, mulSeq: string) {
  const response = await baseApiInstance.post(`cases/checks`, {
    infoId,
    caseNo,
    mulSeq
  })
  console.log(response.data)
  return response.data
}