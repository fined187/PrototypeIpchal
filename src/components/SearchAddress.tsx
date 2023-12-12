import { BiddingInfoType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PopupContent from "./PopupContent";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SearchAddressProps {
  biddingInfo: BiddingInfoType;
  setBiddingInfo: Dispatch<SetStateAction<BiddingInfoType>>;
  stepNum: number;
  register?: UseFormRegister<BiddingInfoType>;
  errors?: FieldErrors<BiddingInfoType>;
  setError?: any;
}

export default function SearchAddress({
  biddingInfo,
  setBiddingInfo,
  stepNum,
  register,
  errors,
  setError
}: SearchAddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (biddingInfo.bidderAddr[stepNum - 1] === '') return;
    setError && setError('bidderAddr', { type: 'manual', message: '' })

  }, [biddingInfo.bidderAddr[stepNum - 1]])

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
              value={biddingInfo?.bidderAddr[stepNum - 1] === '' ? '' : biddingInfo?.bidderAddr[stepNum - 1]}
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
        <input
          id="bidAddrDetail"
          type="text"
          readOnly
          className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[100%]"
          value={biddingInfo?.bidderAddrDetail[stepNum - 1] === '' ? '' : biddingInfo?.bidderAddrDetail[stepNum - 1]}
        />
      </div>
      {(errors?.bidderAddr?.type === 'required') && (
        <div className="flex w-[100%] justify-start">
          <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
            주소 및 상세주소를 입력해주세요
          </span>
        </div>
      )}
      <PopupContent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        biddingInfo={biddingInfo}
        setBiddingInfo={setBiddingInfo}
        stepNum={stepNum}
      />
    </>
  );
}
