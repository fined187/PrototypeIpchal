import postInit from "@/remote/postInit";
import { useMutation } from "react-query";

interface IUseInits {
  aesUserId: string;
  infoId: string;
  caseNo: string;
  mulSeq: string;
  biddingDate: string;
  biddingTime: string;
}

export default function useInits() {
    return useMutation(({ aesUserId, infoId, caseNo, mulSeq, biddingDate, biddingTime }: IUseInits) => {
      return postInit(aesUserId, infoId, caseNo, mulSeq, biddingDate, biddingTime);
    });
}