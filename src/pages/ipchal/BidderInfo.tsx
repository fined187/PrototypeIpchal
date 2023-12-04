import { stepState } from "@/atom";
import Button from "@/components/Button";
import { IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
interface BidderInfoProps {
  formData: IpchalType;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
}

export default function BidderInfo({ formData, setFormData }: BidderInfoProps) {
  const stateValue = useRecoilValue(stepState);
  const setStateNum = useSetRecoilState(stepState);
  const [isSelected, setIsSelected] = useState<boolean>(true);

  return (
    <>
      <div className="flex justify-center relative">
        <div className="flex flex-col w-full h-screen bg-mybg items-center text-center-500">
          <div className="flex">
            <span className="text-lg font-extrabold font-nanum not-italic leading-8	">
              입찰하시는 본인이 맞으신가요?
            </span>
          </div>
          <div className="flex flex-col gap-10 w-[327px] h-[257px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
            <div
              className={`flex flex-row w-[70px] h-[30px] rounded-md border ${
                isSelected ? "border-myyellow" : "border-red-600"
              } justify-center items-center cursor-pointer ${
                formData.bidder === "self" ? "bg-myyellow" : "bg-white"
              } relative`}
              onClick={() => {
                setFormData({
                  ...formData,
                  bidder: "self",
                });
                setTimeout(() => {
                  setStateNum(stateValue + 1);
                }, 300);
              }}
            >
              <div
                className={`${
                  formData.bidder === "self" ? "flex absolute left-2" : "hidden"
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
                  formData.bidder === "self" ? "text-white" : "text-myyellow"
                }`}
              >
                본인
              </span>
            </div>
            <div
              className={`flex flex-row w-[70px] h-[30px] rounded-md border ${
                isSelected ? "border-myyellow" : "border-red-600"
              } justify-center items-center cursor-pointer ${
                formData.bidder === "agent" ? "bg-myyellow" : "bg-white"
              } relative`}
              onClick={() => {
                setFormData({
                  ...formData,
                  bidder: "agent",
                });
                setTimeout(() => {
                  setStateNum(stateValue + 1);
                }, 300);
              }}
            >
              <div
                className={`${
                  formData.bidder === "agent"
                    ? "flex absolute left-1"
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
                  formData.bidder === "agent"
                    ? "text-white ml-1"
                    : "text-myyellow"
                }`}
              >
                대리인
              </span>
            </div>
            <div className={`${isSelected ? "hidden" : "flex"}`}>
              <span className="text-[10px] font-medium text-myRed font-nanum leading-[-0.3px] ">
                버튼을 선택해주세요.
              </span>
            </div>
          </div>
        </div>
        <Button
          prevStepNum={stateValue - 1}
          nextStepNum={stateValue + 1}
          formData={formData}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      </div>
    </>
  );
}
