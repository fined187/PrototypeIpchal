import getMstSeq from "@/remote/getMstSeq";
import { useQuery } from "react-query";

export default function useMstSeq(mstSeq: number) {
  return useQuery(['mstSeq', mstSeq], () => getMstSeq(mstSeq), {
    enabled: !!mstSeq
  })
}