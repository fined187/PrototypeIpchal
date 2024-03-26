import getChecks from "@/remote/getChecks";
import { useMutation } from "react-query";

export default function useChecks() {
  const { mutate } = useMutation(({idCode}: {idCode: string}) => {
    return getChecks(idCode);
  }, {
    onSuccess: (response) => {
      return response
    }
  })

  return { mutate, onSuccess: (response: any) => response };
}