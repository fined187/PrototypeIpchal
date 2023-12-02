import baseApiInstance from "@/pages/api/address";

export const SearchAddress = async () => {
  const param = {
    confmKey: process.env.NEXT_PUBLIC_ADDR_API_KEY,
    returnUrl: 'http://localhost:3000',
    resultType: '4',
    useDetailAddress: 'Y',
  };

  try {
    const res = await baseApiInstance.post(`/addrlink/addrLinkUrl.do?confmKey=${param.confmKey}&returnUrl=${param.returnUrl}&resultType=${param.resultType}&useDetailAddress=${param.useDetailAddress}`)
    if (res) {
      console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};