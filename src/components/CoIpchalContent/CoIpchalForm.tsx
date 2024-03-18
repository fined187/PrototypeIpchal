import { stepState } from "@/atom";
import { GetBiddingInfoType } from "@/model/IpchalType";
import { useRecoilValue } from "recoil";

interface CoIpchalFormProps {
  totalResult?: GetBiddingInfoType;
}

export default function CoIpchalForm({ totalResult }: CoIpchalFormProps) {
  const stateNum = useRecoilValue(stepState);
  return (
    <div className={`flex flex-col bg-mybg h-[1300px] w-[100%] m-auto relative justify-center items-center ${stateNum === 11 ? '' : 'border-black border-dashed border-t-[2px] border-b-[2px]'} overflow-x-scroll scrollbar-hide`}>
      <div className="flex flex-col bg-mybg h-[100%] md:w-[850px] w-[90%] m-auto relative justify-center items-center">
        <div className="flex flex-col w-[100%] h-[100%] justify-center items-center">
          <div className="md:text-[18pt] text-[18px] py-[60px] leading-[23px] font-batang absolute top-0 bg-mybg">
            공 동 입 찰 신 고 서
          </div>
          <div className="flex justify-end text-right w-[100%] md:w-[80%] absolute top-[200px] mr-2">
            <span className="md:text-[12pt] text-[12px] font-batang">
              {totalResult && totalResult?.reqCourtName + ' 집행관 귀하'}
            </span>
          </div>
          <div className="flex flex-col gap-[10px] justify-start w-[100%] md:w-[80%] ml-2 absolute top-[350px]">
            <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
              <span className="md:text-[12pt] text-[12px] font-bold font-batang">
                사건번호
              </span>
              <div className="flex flex-row gap-3">
                <span className="md:text-[12pt] text-[12px] text-black-500 font-batang">
                  {totalResult && totalResult?.caseYear}
                </span>
                <span className="md:text-[12pt] text-[12px] text-black font-batang">
                  {' 타경 '}
                </span>
                <span className="md:text-[12pt] text-[12px] text-black-500 font-batang">
                  {totalResult && totalResult?.caseDetail }
                </span>
                <span className="md:text-[12pt] text-[12px] text-black ">
                  {'호'}
                </span>
              </div>
            </div>
            <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
              <span className="md:text-[12pt] text-[12px] font-bold font-batang">
                물건번호
              </span>
              <span className="md:text-[12pt] text-[12px] text-black-500 font-batang">
                {totalResult && totalResult?.mulNo === '' ? '1' : totalResult?.mulNo}
              </span>
            </div>
            <div className="flex flex-row w-[100%] sm:gap-[100px] gap-[135px] ">
              <span className="md:text-[12pt] text-[12px] font-bold font-batang">
                공동입찰자
              </span>
              <span className="md:text-[12pt] text-[12px] text-black font-batang">
                별지목록과 같음
              </span>
            </div>
            <div className="flex mt-10">
              <span className="md:text-[12pt] text-[12px] font-batang">
                위 사건에 관하여 공동입찰을 신고합니다.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] text-left justify-center items-center w-[100%] md:w-[80%] absolute top-[600px] ">
            <span className="md:text-[12pt] text-[12px] text-black-500 font-batang">
              {totalResult && totalResult?.biddingDate.substring(0, 4) + ' 년 ' + totalResult?.biddingDate.substring(4, 6) + ' 월 ' + totalResult?.biddingDate.substring(6, 8) + ' 일'}
            </span>
            <div className="flex flex-row justify-center items-center gap-[10px] w-[100%]">
              <span className="md:text-[12pt] text-[12px] font-batang">
                신청인
              </span>
              <span className="text-[12pt] font-batang text-black-500">
                {totalResult && totalResult?.bidders[0]?.name}
              </span>
              <span className="md:text-[12pt] text-[12px] font-batang">
                외
              </span>
              <span className="md:text-[12pt] text-[12px] font-batang text-black-500">
                {totalResult && totalResult?.bidders.length - 1}
              </span>
              <span className="md:text-[12pt] text-[12px] font-batang">
                {' 인(별지목록 기재와 같음)'}
              </span>
            </div>
          </div>
          <div className="flex absolute top-[800px]">
            <div>
              <span className="md:text-[12pt] text-[12px] font-batang">
                ※ 1. 공동입찰을 하는 때에는 {" "}
                <span className="md:text-[12pt] text-[12px] underline underline-offset-1">
                  입찰표에 각자의 지분을 분명하게 표시하여야 합니다.
                </span>
                <br />
                &nbsp;&nbsp; 2. 별지 공동입찰자 목록과 사이에 {" "}
                <span className="md:text-[12pt] text-[12px] underline underline-offset-1">
                  공동입찰자 전원이 간인하십시오.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
