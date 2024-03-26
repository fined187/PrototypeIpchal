import baseApiInstance from "./baseURL";

export default async function postChecks(infoId: string, caseNo: string, mulSeq: string) {
  const response = await baseApiInstance.post(`cases/checks`, {
    infoId: infoId,
    caseNo: caseNo,
    mulSeq: mulSeq,
  });
  return response.data.data;
}