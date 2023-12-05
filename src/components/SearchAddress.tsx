import { BiddingInfoType, IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction, useState } from "react";
import PopupContent from "./PopupContent";

interface SearchAddressProps {
  formData: IpchalType;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
  biddingInfo: BiddingInfoType;
  setBiddingInfo: Dispatch<SetStateAction<BiddingInfoType>>;
  stepNum: number;
}

export default function SearchAddress({
  formData,
  setFormData,
  biddingInfo,
  setBiddingInfo,
  stepNum
}: SearchAddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col w-[100%] h-[60px] gap-1">
        <div className="flex">
          <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
            주소
          </span>
        </div>
        <div className="flex flex-row justify-between gap-[5%]">
          <input
            readOnly
            type="text"
            className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[70%]"
            value={biddingInfo?.bidderAddr[stepNum - 1]}
          />
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
          type="text"
          readOnly
          className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[100%]"
          value={biddingInfo?.bidderAddrDetail[stepNum - 1]}
        />
      </div>
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
