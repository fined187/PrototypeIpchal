import getMstSeq from "@/remote/getMstSeq";
import { useQuery } from "react-query";

export default function useMstInfo(mstSeq: number) {
  return useQuery(["mstSeq"], () => getMstSeq(mstSeq))
}