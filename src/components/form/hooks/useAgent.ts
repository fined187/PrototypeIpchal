import getAgents from "@/remote/form/getAgent";
import { useQuery } from "react-query";

export default function useAgent(seq: number, idNum: string) {
  return useQuery(['agent', seq], () => getAgents(seq, idNum));
}