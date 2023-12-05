import { stepState } from "@/atom";
import Button from "@/components/Button";
import { IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

interface BidderDetailProps {
  formData: IpchalType;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
}

export default function ShareInfo({ formData, setFormData }: BidderDetailProps) {
  console.log(formData);
  const stateNum = useRecoilValue(stepState);
  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col w-full items-center">
        {Array.from(formData?.bidderNum).map((_, index) => (
          <div className="flex w-[80%]" key={index}>
            <span>
              
            </span>
          </div>
        ))}
        <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} />
      </div>
    </div>
  )
}