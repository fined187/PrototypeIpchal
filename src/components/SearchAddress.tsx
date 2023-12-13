import { AgentInfoType, BiddingInfoType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PopupContent from "./PopupContent";
import { FieldErrors, UseFormRegister, UseFormSetError } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { biddingInfoState } from "@/atom";

interface SearchAddressProps {
  biddingInfo?: BiddingInfoType;
  setBiddingInfo?: Dispatch<SetStateAction<BiddingInfoType>>;
  stepNum?: number;
  register?: UseFormRegister<BiddingInfoType>;
  errors?: FieldErrors<BiddingInfoType>;
  setError?: UseFormSetError<BiddingInfoType>;
  agentInfo?: AgentInfoType;
  setAgentInfo?: Dispatch<SetStateAction<AgentInfoType>>;
  agentRegister?: UseFormRegister<AgentInfoType>;
  agentErrors?: FieldErrors<AgentInfoType>;
  agentSetError?: UseFormSetError<AgentInfoType>;
}

export default function SearchAddress({
  biddingInfo,
  setBiddingInfo,
  stepNum,
  register,
  errors,
  setError,
  agentInfo,
  setAgentInfo,
  agentRegister,
  agentErrors,
  agentSetError,
}: SearchAddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const setBiddingForm = useSetRecoilState(biddingInfoState);
  const biddingForm = useRecoilValue(biddingInfoState);

  useEffect(() => {
    if (stepNum && biddingForm.bidAddr[stepNum - 1] === '') return;
    if (agentSetError) {
      agentSetError && agentSetError('agentAddr', { type: 'manual', message: '' })
    }
    if (setError !== undefined) {
      setError('bidderAddr', { type: 'manual', message: '' })
    }

  }, [stepNum && biddingForm.bidAddr[stepNum - 1], agentSetError, setError]);

  return (
    <>
      <div className="flex flex-col w-[100%] h-[60px] gap-1">
        <div className="flex">
          <label htmlFor="addr" className="text-[10px] font-nanum not-italic font-extrabold text-left">
            주소
          </label>
        </div>
        <div className="flex flex-row justify-between gap-[5%]">
          {register && (
            <input
              {...register("bidderAddr", { required: true })}
              id="bidderAddr"
              readOnly
              type="text"
              className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[70%]"
              value={stepNum && biddingForm.bidAddr[stepNum - 1] === '' ? '' : stepNum && biddingForm.bidAddr[stepNum - 1]}
            />
          )}
          {agentRegister && (
            <input
              {...agentRegister("agentAddr", { required: true })}
              id="agentAddr"
              readOnly
              type="text"
              className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[70%]"
              value={agentInfo && agentInfo.agentAddr === '' ? '' : agentInfo && agentInfo.agentAddr}
            />
          )}
          <button
            className="text-white text-[12px] bg-myyellow rounded-md font-nanum not-italic font-bold w-[25%]"
            onClick={handleModal}
          >
            주소검색
          </button>
        </div>
      </div>
      <div className="flex flex-col w-[100%] h-[60px] gap-1">
        <div className="flex">
          <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
            상세주소
          </span>
        </div>
        {register && (
          <input
            id="bidAddrDetail"
            type="text"
            readOnly
            className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[100%]"
            value={stepNum && biddingForm.bidAddrDetail[stepNum - 1] === '' ? '' : stepNum && biddingForm.bidAddrDetail[stepNum - 1]}
          />
        )}
        {agentRegister && (
          <input
            id="agentAddrDetail"
            type="text"
            readOnly
            className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[100%]"
            value={agentInfo && agentInfo.agentAddrDetail === '' ? '' : agentInfo && agentInfo.agentAddrDetail}
          />
        )}
      </div>
      {(errors?.bidderAddr?.type === 'required') && (
        <div className="flex w-[100%] justify-start">
          <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
            주소 및 상세주소를 입력해주세요
          </span>
        </div>
      )}
      {(agentErrors?.agentAddr?.type === 'required') && (
        <div className="flex w-[100%] justify-start">
          <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
            주소 및 상세주소를 입력해주세요
          </span>
        </div>
      )}
      {stepNum && biddingInfo && setBiddingInfo && (
        <PopupContent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          biddingInfo={biddingInfo}
          setBiddingInfo={setBiddingInfo}
          stepNum={stepNum}
        />
      )}
      {agentInfo && setAgentInfo && (
        <PopupContent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          biddingInfo={biddingInfo}
          setBiddingInfo={setBiddingInfo}
          stepNum={stepNum}
          agentInfo={agentInfo}
          setAgentInfo={setAgentInfo}
        />
      )}
    </>
  );
}
