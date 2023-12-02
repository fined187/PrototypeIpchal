import { stepState } from "@/atom";
import { IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ButtonProps {
  prevStepNum: number;
  nextStepNum: number;
  isSelected?: boolean;
  formData?: IpchalType;
  setIsSelected?: Dispatch<SetStateAction<boolean>>;
}

export default function Button({ prevStepNum, nextStepNum, isSelected, formData, setIsSelected }: ButtonProps) {
  const setStateNum = useSetRecoilState(stepState);
  const stateNum = useRecoilValue(stepState);

  const handleNextStep = () => {
    if (typeof setIsSelected !== 'undefined' && typeof formData !== 'undefined') {
      if (formData?.bidder === '') {
        setIsSelected(false);
      } else {
        setIsSelected(true);
        setStateNum(nextStepNum);
      }
    }
  }

  return (
    <>
      <div className="flex flex-row gap-2 absolute top-[578px]">
        <button type="button" className="flex w-[82px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer" onClick={() => setStateNum(prevStepNum)}>
          <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">이전</span>
        </button>
        <button type="button" className="flex w-[229px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer" onClick={() => {
          stateNum === 2 ? handleNextStep() : setStateNum(nextStepNum)
        }}
        >
          <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">{stateNum <= 3 ? '확인' : '다음'}</span>
        </button>
      </div>
    </>
  )
}