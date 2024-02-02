import { biddingInfoState } from "@/atom"
import { useRecoilState } from "recoil"

export default function ModalCoIpchalForm() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  return (
    <div className={`flex flex-col bg-mybg h-[1300px] md:w-[90%] w-[100%] m-auto absolute top-[650px] justify-center items-center `}>
      <div className="flex flex-col bg-mybg h-[100%] w-[100%] m-auto relative justify-center items-center">
        <div className="flex flex-col w-[100%] h-[100%] justify-center items-center">
          <div className="md:text-[18pt] text-[18px] py-[60px] leading-[23px] font-batang absolute top-0 bg-mybg">
            공 동 입 찰 신 고 서
          </div>
          <div className="flex justify-end text-right w-[100%] absolute top-[200px] mr-2">
            <span className="md:text-[12pt] text-[12px] font-batang">
              {biddingInfo.reqCourtName + ' 본원 집행관 귀하'}
            </span>
          </div>
          <div className="flex flex-col gap-[10px] justify-start w-[100%] ml-2 absolute top-[350px]">
            <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
              <span className="md:text-[12pt] text-[12px] font-bold font-batang">
                사건번호
              </span>
              <div className="flex flex-row gap-3">
                <span className="md:text-[12pt] text-[12px] text-black-500 font-bold font-batang">
                  {biddingInfo.sagunNum + '호'}
                </span>
              </div>
            </div>
            <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
              <span className="md:text-[12pt] text-[12px] font-bold font-batang">
                물건번호
              </span>
              <span className="md:text-[12pt] text-[12px] text-black-500 font-bold font-batang">
                {biddingInfo.mulNo === '' ? '1' : biddingInfo.mulNo}
              </span>
            </div>
            <div className="flex flex-row w-[100%] sm:gap-[100px] gap-[135px] ">
              <span className="md:text-[12pt] text-[12px] font-bold font-batang">
                공동입찰자
              </span>
              <span className="md:text-[12pt] text-[12px] text-black font-bold font-batang">
                별지목록과 같음
              </span>
            </div>
            <div className="flex mt-10">
              <span className="md:text-[12pt] text-[12px] font-batang">
                위 사건에 관하여 공동입찰을 신고합니다.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] justify-center items-center w-[100%] md:w-[80%] absolute top-[600px] ">
            <span className="md:text-[12pt] text-[12px] text-black-500 font-bold font-batang">
              {biddingInfo.ipchalDate}
            </span>
            <div className="flex flex-row justify-center items-center gap-[10px] w-[100%]">
              <span className="md:text-[12pt] text-[12px] font-batang">
                신청인
              </span>
              <span className="text-[12pt] font-batang text-black-500 font-bold">
                {biddingInfo.bidName[0]}
              </span>
              <span className="md:text-[12pt] text-[12px] font-batang">
                외
              </span>
              <span className="md:text-[12pt] text-[12px] font-batang text-black-500 font-bold">
                {biddingInfo.bidName.length - 1}
              </span>
              <span className="md:text-[12pt] text-[12px] font-batang">
                {' 인(별지목록 기재와 같음)'}
              </span>
            </div>
          </div>
          <div className="flex absolute top-[800px] text-left">
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
  )
}