import { biddingInfoState } from "@/atom";
import postInit from "@/remote/postInit";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";

interface IUseInits {
  aesUserId: string;
  infoId: string;
  caseNo: string;
  mulSeq: string;
  biddingDate: string;
  biddingTime: string;
}

export default function useInits() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const { mutate } = useMutation(({aesUserId, infoId, caseNo, mulSeq, biddingDate, biddingTime}: IUseInits)  => {
    return postInit(aesUserId, infoId, caseNo, mulSeq, biddingDate, biddingTime);
  }, {
    onSuccess: (response) => {
      setBiddingInfo({
        ...biddingInfo,
        mstSeq: response.mstSeq,
        state: response.state,
        selectedTime: biddingInfo.biddingInfos[0].biddingTime,
      })
    }, 
    onError: (error) => {
      console.log(error)
    }
  })
  return { mutate }
}