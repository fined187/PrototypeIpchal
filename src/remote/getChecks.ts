import baseApiInstance from "./baseURL";

export default async function getChecks(idCode: string) {
  const response = await baseApiInstance.post('checks', {
    idCode: idCode,
  })
  return response.data.data
}