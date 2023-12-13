import { biddingInfoState, stepState } from "@/atom";
import Button from "@/components/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function IpchalContent() {
  const stateNum = useRecoilValue(stepState);
  const setStateNum = useSetRecoilState(stepState);
  const biddingInfo = useRecoilValue(biddingInfoState);
  const date = new Date();
  const nowDate = date.getDate();
  const nowMonth = date.getMonth() + 1;
  const nowYear = date.getFullYear();

  console.log(biddingInfo.biddingPrice)

  return (
    <div className="flex w-full h-screen justify-center bg-mybg relative">
      <div className="flex flex-col gap-4 md:w-[520px] w-[100%] h-screen bg-mybg items-center text-center">
        <span className="text-[20px] font-extrabold font-nanum not-italic leading-8">
          입찰표
        </span>
      </div>
      <div className="flex flex-col gap-10 md:w-[500px] w-[400px] h-[360px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500 overflow-scroll md:scrollbar-hide">
        <div className="flex flex-col border border-black w-[395px] h-[360px] relative">
          {/* 최상단 박스 */}
          <div className="flex border-b-[1px] border-black w-full h-[60px] relative">
            <div className="flex absolute top-0 left-0">
              <span className="text-[9px] font-bold">
                (앞면)
              </span>
            </div>
            <div className="flex justify-center items-center text-center mx-auto">
              <span className="font-bold text-[15px]">
                기 일 입 찰 표
              </span>
            </div>
            <div className="flex absolute bottom-0 left-0">
              <span className="text-[9px] font-bold font-nanum">
                집행관 귀하
              </span>
            </div>
            <div className="flex absolute bottom-0 right-0">
              <span className="text-[9px] font-bold font-nanum">
                입찰기일 : {nowYear}년 {nowMonth}월 {nowDate}일
              </span>
            </div>
          </div>
          {/* 2번째 박스 */}
          <div className="flex flex-row border-b-[1px] border-black w-full h-[40px] relative">
            <div className="flex border-r-[1px] border-black justify-center items-center w-[40px]">
              <span className="text-[9px] font-bold font-nanum">
                사 건 
                <br />
                번 호
              </span>
            </div>
            <div className="flex w-[160px] border-r-[1px] border-black justify-center items-center">
              <span className="text-[10px] font-bold font-nanum">
                {biddingInfo.sagunNum}
              </span>
            </div>
            <div className="flex border-r-[1px] border-black justify-center items-center w-[40px]">
              <span className="text-[9px] font-bold font-nanum">
                물 건
                <br />
                번 호
              </span>
            </div>
            <div className="flex w-[160px] justify-center items-center">
              <span className="text-[10px] font-bold font-nanum">
                {biddingInfo.mulgunNum}
              </span>
            </div>
          </div>
          {/* 3번째 박스 */}
          <div className="flex flex-row border-b-[1px] border-black w-full h-[180px] relative">
            <div className="flex w-[20px] border-r-[1px] border-black justify-center items-center text-center">
              <span className="text-[9px] font-bold font-nanum">
                입 찰 자
              </span>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full h-[90px] border-b-[1px] border-black">
                <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center">
                  <span className="text-[10px] font-bold font-nanum">
                    본 인
                  </span>
                </div>
                <div className="flex flex-col w-full h-[90px]">
                  <div className="flex flex-row border-b-[1px] border-black h-[30px]">
                    <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        성 명
                      </span>
                    </div>
                    <div className="flex border-r-[1px] border-black w-[100px] justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        {biddingInfo.bidName[0]}
                      </span>
                    </div>
                    <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        전화번호
                      </span>
                    </div>
                    <div className="flex w-[90px] justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        {biddingInfo.bidPhone[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row border-b-[1px] border-black h-[30px]">
                    <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-bold font-nanum">
                        주민(사업자)
                        <br />
                        등록번호
                      </span>
                    </div>
                    <div className="flex w-[100px] border-r-[1px] border-black justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        {biddingInfo.bidIdNum[0]}
                      </span>
                    </div>
                    <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        법인등록번호
                      </span>
                    </div>
                    <div className="flex w-[80px] justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        {biddingInfo.bidCorpRegiNum[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row h-[30px]">
                    <div className="flex border-r-[1px] w-[60px] border-black justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        주 소
                      </span>
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        {biddingInfo.bidAddr[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full h-[90px] border-b-[1px] border-black">
                <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center">
                  <span className="text-[10px] font-bold font-nanum">
                    대리인
                  </span>
                </div>
                <div className="flex flex-col w-full h-[90px]">
                  <div className="flex flex-row border-b-[1px] border-black h-[30px]">
                    <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        성 명
                      </span>
                    </div>
                    <div className="flex border-r-[1px] border-black w-[100px] justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        -
                      </span>
                    </div>
                    <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-bold font-nanum">
                        본인과의
                        <br />
                        관계
                      </span>
                    </div>
                    <div className="flex w-[90px] justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        -
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row border-b-[1px] border-black h-[30px]">
                    <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-bold font-nanum">
                        주민(사업자)
                        <br />
                        등록번호
                      </span>
                    </div>
                    <div className="flex w-[100px] border-r-[1px] border-black justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        -
                      </span>
                    </div>
                    <div className="flex w-[60px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-bold font-nanum">
                        전화번호
                      </span>
                    </div>
                    <div className="flex w-[90px] justify-center items-center text-center">
                      <span className="text-[9px] font-bold font-nanum">
                        -
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row h-[30px]">
                    <div className="flex border-r-[1px] w-[60px] border-black justify-center items-center">
                      <span className="text-[9px] font-bold font-nanum">
                        주 소
                      </span>
                    </div>
                    <div className="flex w-[260px] justify-center items-center text-center">
                      <span className="text-[9px] font-bold font-nanum">
                        -
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 4번째 박스 */}
          <div className="flex flex-row w-full h-[62px] relative">
            <div className="flex w-[20px] border-r-[1px] border-black justify-center items-center text-center">
              <span className="text-[9px] font-bold font-nanum">
                입 찰 금 액
              </span>
            </div>
            <div className="flex w-[180px] border-r-[2px] border-black">
              <div className="flex flex-col w-[161px] h-[31px] border-b-[1px] border-black">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        천억
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        백억
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        십억
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-end items-end text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        억
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        천만
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        백만
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-center items-center text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        십만
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-end items-end text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        만
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-end items-end text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        천
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-end items-end text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        백
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] border-r-[1px] border-black justify-end items-end text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        십
                      </span>
                    </div>
                    <div className="flex w-[13.5px] h-[31px] justify-end items-end text-center">
                      <span className="text-[9px] font-nanum font-bold">
                        일
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-center text-center h-[31px]">
                    <div className="flex flex-row-reverse items-end text-center">
                      <span className="text-[9px] font-bold ">
                        {biddingInfo.biddingPrice.toString().substring(biddingInfo.biddingPrice.toString().length - 1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button 
        prevStepNum={stateNum - 1}
        nextStepNum={stateNum + 1}
      />
    </div>
  )
}