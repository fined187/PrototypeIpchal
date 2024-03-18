import { TotalResultType } from "@/model/IpchalType";
import Image from "next/image";

interface SingleProps {
  totalResult: TotalResultType;
}

export default function CoverPage({ totalResult }: SingleProps) {
  return (
    <div className="flex flex-col bg-white h-[1300px] md:w-[800px] w-[700px] mx-auto justify-center items-center relative top-[0px]">
      <div className="flex absolute top-[150px] text-center">
        <span className="font-['nanum'] text-[20pt] font-bold">
          {totalResult && totalResult?.courtFullName + " " + totalResult?.caseYear + " - " + totalResult?.caseDetail + "[" + (totalResult?.mulNo === '' ? '1' : totalResult?.mulNo) + "]" + " " + totalResult?.usage}
          <br />
          기일입찰표
        </span>
      </div>
      <div className="flex flex-col absolute top-[500px] w-[350px] justify-start">
        <span className="text-left font-semibold text-[18pt]">
          입찰기일 : {totalResult && totalResult?.biddingDate?.length === 8 ? totalResult?.biddingDate?.substring(0, 4) + "년 " + totalResult?.biddingDate?.substring(4, 6) + "월" + totalResult?.biddingDate?.substring(6, 8) + "일" : totalResult?.biddingDate}
        </span>
        <span className="text-left font-semibold text-[18pt]">
          입찰법원 : {totalResult && totalResult?.reqCourtName}
        </span>
      </div>
      <div className="flex flex-col w-[95%] h-[150px] justify-center items-start border border-black absolute top-[900px] rounded-xl p-[15px]">
        <span className="font-semibold text-[12pt] ">
          - 입찰표는 대법원 표준서식에 따라 만들어졌으나 전산착오 및 오타 등으로 부정확하게 출력될 수 있으므로 제출 전 사건번호, 물건번호, 입찰기일, 입찰보증금 등은 반드시 확인하시기 바랍니다.
        </span>
        <span className="font-semibold text-[12pt] ">
          - 표지는 제출 시 제거하여 주시기 바랍니다.
        </span>
      </div>
      <div className="flex absolute top-[1100px]">
        <img  
          src="https://210.16.195.57:8000/logo"
          alt="logo"
          width="150"
          height="150"
        />
      </div>
    </div>
  )
}