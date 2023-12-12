import { biddingInfoState, stepState } from "@/atom";
import { IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ButtonProps {
  prevStepNum: number;
  nextStepNum: number;
  goNext?: boolean;
  setIsWaySelected?: Dispatch<SetStateAction<boolean>>;
  setIsSelected?: Dispatch<SetStateAction<boolean>>;
}

export default function Button({
  prevStepNum,
  nextStepNum,
  setIsWaySelected,
  setIsSelected,
  goNext,
}: ButtonProps) {
  const setStateNum = useSetRecoilState(stepState);
  const stateNum = useRecoilValue(stepState);
  const biddingInfo = useRecoilValue(biddingInfoState);

  return (
    <>
      <div className="flex flex-row gap-2 absolute top-[578px]">
        <button
          type="button"
          className="flex w-[100px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
          onClick={() => setStateNum(prevStepNum)}
        >
          <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
            이전
          </span>
        </button>
        <button
          type="button"
          disabled={goNext}
          className="flex w-[260px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
          onClick={() => {
            (stateNum === 2 && biddingInfo.bidder === "") ? setIsSelected && setIsSelected(false) : (stateNum === 7 && biddingInfo.bidWay === "") ? setIsWaySelected && setIsWaySelected(true) : setStateNum(nextStepNum)
          }}
        >
          <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
            {stateNum <= 3 ? "확인" : "다음"}
          </span>
        </button>
      </div>
    </>
  );
}
