import { biddingInfoState } from "@/atom";
import postSearchResult from "@/remote/search/postSearchResult";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";

export default function useSearchResult() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const { mutate } = useMutation(({infoId, caseNo, mulSeq}: {infoId: string, caseNo: string, mulSeq: string}) => {
    return postSearchResult(infoId, caseNo, mulSeq)
  }, {
    onSuccess: (response) => {
      setBiddingInfo({
        ...biddingInfo,
        infoId: response.data.data.infoId,
        caseNo: response.data.data.caseNo,
        mulSeq: response.data.data.mulSeq,
        biddingDate: (response.data.data.startYear) +
        (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) +
        (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay),
        courtFullName: response.data.data.courtFullName,
        reqCourtName: response.data.data.reqCourtName,
        mulNo: response.data.data.mulNo === '' ? '1' : response.data.data.mulNo,
        sagunNum:
            response.data.data.caseYear +
            ' 타경 ' +
            response.data.data.caseDetail,
        ipchalDate: (response.data.data.startYear) + '년 ' +
        (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) + '월 ' +
        (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay) + '일',
        sagunAddr: response.data.data.address,
        usage: response.data.data.usage,
        etcAddress: response.data.data.etcAddress,
        roadAddress: response.data.data.roadAddress,
        biddingInfos: response.data.data.biddingInfos,
      })
    }, onError: (error) => {
      console.log(error)
    }
  })
  return { mutate }
}