import { stepState } from "@/atom";
import Button from "@/components/Button";
import { IpchalType } from "@/interface/IpchalType";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface BiddingPaymentProps {
  formData: IpchalType;
  setFormData: React.Dispatch<React.SetStateAction<IpchalType>>;
}

export default function BiddingPayment({ formData, setFormData }: BiddingPaymentProps) {
  const [isWaySelected, setIsWaySelected] = useState<boolean>(false);
  const setStateNum = useSetRecoilState(stepState);
  const stateNum = useRecoilValue(stepState);

  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <span className="text-lg font-extrabold font-nanum not-italic leading-8">
          보증금 제공 방법을 선택해주세요
        </span>
      </div>
      <div className="flex flex-col gap-10 w-[360px] h-[257px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
        <div
          className={`flex flex-row w-[120px] h-[30px] rounded-md border ${
            isWaySelected ? "border-red-600" : "border-myyellow"
          } justify-center items-center cursor-pointer ${
            formData.bidWay === "cash" ? "bg-myyellow" : "bg-white"
          } relative`}
          onClick={() => {
            setFormData({
              ...formData,
              bidWay: "cash",
            });
            setStateNum(stateNum + 1);
          }}
        >
          <div
            className={`${
              formData.bidWay === "cash" ? "flex" : "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
            >
              <path
                d="M1.61523 3.02486L4.15471 7.80153L9.95324 1.46643"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            className={`flex text-[13px] not-italic font-extrabold leading-[13px] tracking-[-0.39px] ${
              formData.bidWay === "cash" ? "text-white" : "text-myyellow"
            }`}
          >
            현금/자기앞수표
          </span>
        </div>
        <div
          className={`flex flex-row w-[120px] h-[30px] rounded-md border ${
            isWaySelected ? "border-red-600" : "border-myyellow"
          } justify-center items-center cursor-pointer ${
            formData.bidWay === "paper" ? "bg-myyellow" : "bg-white"
          } relative`}
          onClick={() => {
            setFormData({
              ...formData,
              bidWay: "paper",
            });
            setStateNum(stateNum + 1);
          }}
        >
          <div
            className={`${
              formData.bidWay === "paper"
                ? "flex"
                : "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
            >
              <path
                d="M1.61523 3.02486L4.15471 7.80153L9.95324 1.46643"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            className={`flex text-[13px] not-italic font-extrabold leading-[13px] tracking-[-0.39px] ${
              formData.bidWay === "paper"
                ? "text-white ml-1"
                : "text-myyellow"
            }`}
          >
            보증서
          </span>
        </div>
        {isWaySelected && (
          <div className='flex'>
            <span className="text-[12px] font-bold text-myRed font-nanum leading-[-0.3px] ">
              버튼을 선택해주세요.
            </span>
          </div>
        )}
      </div>
      <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} setIsWaySelected={setIsWaySelected} />
    </div>
  )
};