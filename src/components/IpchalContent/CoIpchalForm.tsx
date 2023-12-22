import { GetBiddingInfoType } from "@/interface/IpchalType";

interface CoIpchalFormProps {
  totalResult: GetBiddingInfoType;
}

export default function CoIpchalForm({ totalResult }: CoIpchalFormProps) {
  console.log(totalResult && totalResult);
  return (
    <div className="flex flex-col bg-mybg h-screen md:w-full w-full m-auto relative justify-center items-center border-black border-dashed border-t-[2px] border-b-[2px]">
      <div className="flex flex-col bg-mybg h-screen sm:w-[600px] w-full m-auto relative justify-center items-center">
        <div className="text-[22px] font-bold py-[60px] absolute top-0 bg-mybg">
          공 동 입 찰 신 고 서
        </div>
        <div className="flex justify-end text-right sm:w-[800px] w-full absolute top-[200px] mr-2">
          <span className="text-[15px] font-bold font-nanum">
            수원지방법원 본원 집행관 귀하
          </span>
        </div>
        <div className="flex flex-col gap-[10px] justify-start sm:w-[800px] w-full ml-2">
          <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
            <span className="text-[15px] font-bold font-nanum">
              사건번호
            </span>
            <div className="flex flex-row gap-3">
              <span className="text-[15px] text-red-500 font-bold font-nanum">
                {totalResult && totalResult?.caseYear}
              </span>
              <span className="text-[15px] text-black font-bold font-nanum">
                {' 타경 '}
              </span>
              <span className="text-[15px] text-red-500 font-bold font-nanum">
                {totalResult && totalResult?.caseDetail }
              </span>
              <span className="text-[15px] text-black font-bold">
                {'호'}
              </span>
            </div>
          </div>
          <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
            <span className="text-[15px] font-bold font-nanum">
              물건번호
            </span>
            <span className="text-[15px] text-red-500 font-bold font-nanum">
              {totalResult && totalResult?.mulNo}
            </span>
          </div>
          <div className="flex flex-row w-[100%] sm:gap-[100px] gap-[135px] ">
            <span className="text-[15px] font-bold font-nanum">
              공동입찰자
            </span>
            <span className="text-[15px] text-black font-nanum">
              별지목록과 같음
            </span>
          </div>
          <div className="flex mt-10">
            <span className="text-[15px] font-nanum">
              위 사건에 관하여 공동입찰을 신고합니다.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] justify-center items-center w-[100%] absolute top-[600px] ">
          <span>
            {totalResult && totalResult?.biddingDate.substring(0, 4) + ' 년 ' + totalResult?.biddingDate.substring(4, 6) + ' 월 ' + totalResult?.biddingDate.substring(6, 8) + ' 일'}
          </span>
          <div className="flex flex-row justify-center items-center gap-[10px] w-[100%]">
            <span className="text-[15px] font-nanum">
              신청인
            </span>
            <span className="text-[15px] font-nanum text-red-500 font-bold">
              {totalResult && totalResult?.bidders[0]?.name}
            </span>
            <span className="text-[15px] font-nanum">
              외
            </span>
            <span className="text-[15px] font-nanum text-red-500 font-bold">
              {totalResult && totalResult?.bidders.length - 1}
            </span>
            <span className="text-[15px] font-nanum">
              {' 인(별지목록 기재와 같음)'}
            </span>
          </div>
        </div>
        <div className="flex absolute top-[800px]">
          <div>
            <span className="text-[15px] font-nanum">
              1. 공동입찰을 하는 때에는 입찰표에 각자의 지분을 분명하게 표시하여야 합니다.
              <br />
              2. 별지 공동입찰자 목록과 사이에 공동입찰자 전원이 간인하십시오.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
