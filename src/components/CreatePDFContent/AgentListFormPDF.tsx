import { biddingInfoState } from "@/atom";
import { TotalResultType } from "@/interface/IpchalType"
import { useRecoilState } from "recoil";

export default function AgentListFormPDF({ totalResult, bidders }: { totalResult: TotalResultType, bidders?: any }) {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState);
  return (
    <div className={`flex flex-col bg-white h-[1300px] w-[800px] mx-auto justify-center items-center relative overflow-x-scroll scrollbar-hide`} style={{
      top: totalResult && totalResult?.bidders.length === 1 ? '1300px' : '2000px',
      position: 'relative',
    }}>
      <div className={`flex flex-col bg-white h-[100%] w-[90%] m-auto relative justify-center items-center`}>
        <div className="flex w-[100%] absolute top-[5px]">
          <span className="text-[12pt] font-batang">
            (뒷면)
          </span>
        </div>
        <div className="flex flex-col w-[100%] items-center text-center absolute top-[10px]">
          <span className="text-[18pt] font-batang">
            위임장
          </span>
          <div className="flex flex-row w-[100%] h-[150px] border-black border-[2px] absolute top-[80px]">
            <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
              <span className="text-[12pt] font-batang">
                대리인
              </span>
            </div>
            <div className="flex flex-col w-[100%] h-[100%]">
              <div className="flex flex-row w-[100%] h-[33%] border-black border-b-[1px]">
                <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                  <span className="text-[12pt] font-batang ml-1">
                    성
                  </span>
                  <span className="text-[12pt] font-batang mr-1">
                    명
                  </span>
                </div>
                <div className="flex justify-between md:gap-[50px] gap-[5%]  w-[35%] border-black border-r-[1px] items-center text-center">
                  <div className="flex w-[80%] md:justify-end justify-center">
                    <span className="text-[12pt] font-batang">
                      {totalResult?.agent.name ?? ''}
                    </span>
                  </div>
                  <div className="flex w-[20%] font-batang justify-end mr-1">
                    <span className="text-[12pt] font-batang">
                      (인)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                  <span className="text-[12pt] font-batang ml-1">
                    직
                  </span>
                  <span className="text-[12pt] font-batang mr-1">
                    업
                  </span>
                </div>
                <div className="flex w-[35%] justify-center items-center text-center">
                  <span className="text-[12pt] font-batang">
                    {totalResult && totalResult?.agent.job}
                  </span>
                </div>
              </div>
              <div className="flex w-[100%] h-[33%] border-black border-b-[1px]">
                <div className="flex flex-row w-[100%] h-[100%]">
                  <div className="flex w-[15%] border-black border-r-[1px] items-center justify-center text-center">
                    <span className="text-[12pt] leading-[20px] font-batang">
                      주민등록번호
                    </span>
                  </div>
                  <div className="flex gap-[50px] w-[35%] border-black border-r-[1px] justify-center items-center text-center">
                    <span className="text-[12pt]">
                      {biddingInfo.agentIdNum.substring(0, 6) + '-' + biddingInfo.agentIdNum.substring(6, 13)}
                    </span>
                  </div>
                  <div className="flex w-[15%] border-black border-r-[1px] justify-center items-center text-center">
                    <span className="text-[12pt] tracking-[1pt] leading-[15px] font-batang">
                      전 화 번 호
                    </span>
                  </div>
                  <div className="flex w-[35%] justify-center items-center text-center">
                    <span className="text-[12pt] font-batang">
                      {totalResult && totalResult?.agent.phoneNo.length === 10 ? totalResult?.agent.phoneNo.substring(0, 2) + '-' + totalResult?.agent.phoneNo.substring(2, 6) + '-' + totalResult?.agent.phoneNo.substring(6, 10) : totalResult?.agent.phoneNo.substring(0, 3) + '-' + totalResult?.agent.phoneNo.substring(3, 7) + '-' + totalResult?.agent.phoneNo.substring(7, 11)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-[100%] h-[33%] ">
                <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                  <span className="text-[12pt] font-batang ml-1">
                    주
                  </span>
                  <span className="text-[12pt] font-batang mr-1">
                    소
                  </span>
                </div>
                <div className="flex w-[80%] justify-center items-center text-center">
                  <span className="font-batang text-[12pt]">
                    {totalResult && totalResult?.agent.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] w-[90%] justify-center items-center text-center absolute top-[300px]">
          <span className="text-[12pt] font-batang">
            위 사람을 대리인으로 정하고 다음 사항을 위임함.
          </span>
          <span className="text-[12pt] font-batang">
            다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음
          </span>
          <div className="flex flex-row md:w-[100%] justify-center items-center text-center">
            <span className="text-[12pt] font-batang">
              {totalResult && totalResult?.reqCourtName + ' 본원 ' }
            </span>
            <span className="text-[12pt] text-red-500 font-bold font-batang">
              &nbsp;{totalResult && totalResult?.caseYear}
            </span>
            <span className="text-[12pt] font-batang">
              &nbsp;타경&nbsp;
            </span>
            <span className="text-[12pt] text-red-500 font-bold font-batang">
              {totalResult && totalResult?.caseDetail}
            </span>
            <span className="text-[12pt] font-batang">
              &nbsp;호 부동산
            </span>
          </div>
          <span className="text-[12pt] font-batang">
            경매사건에 관한입찰행위 일체
          </span>
        </div>
        <div className="flex flex-col w-[100%] justify-center items-center absolute top-[500px]">
          {totalResult && totalResult?.bidders.length <= 3 ? (
            totalResult && totalResult?.bidders.map((bidder: any, index: any) => {
              return (
                <div key={index} className={`flex w-[100%] h-[150px] ${index + 1 >= 2 ? 'border-black border-r-[2px] border-b-[2px] border-l-[2px]' : 'border-black border-[2px]'} `}>
                  <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                    <span className="text-[12pt] font-batang">
                      본인
                      <br />
                      {bidder.peopleSeq}
                    </span>
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%]">
                    <div className="flex flex-row w-[100%] h-[33%] border-black border-b-[1px]">
                      <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[12pt] font-batang ml-1">
                          성
                        </span>
                        <span className="text-[12pt] font-batang mr-1">
                          명
                        </span>
                      </div>
                      <div className="flex flex-row md:gap-[50px] gap-[5%] w-[35%] border-black border-r-[1px] justify-center items-center text-center">
                        <div className="flex w-[80%] md:justify-end justify-center">
                          <span className="text-[12pt] font-batang">
                            {bidder.name ?? ''}
                          </span>
                        </div>
                        <div className="flex w-[20%] font-batang justify-end mr-1">
                          <span className="text-[12pt] font-batang">
                            (인)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[12pt] font-batang ml-1">
                          직
                        </span>
                        <span className="text-[12pt] font-batang mr-1">
                          업
                        </span>
                      </div>
                      <div className="flex w-[35%] justify-center items-center text-center">
                        <span className="text-[12pt] font-batang">
                          {bidder.job ?? ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[100%] h-[33%] border-black border-b-[1px]">
                      <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="flex w-[15%] border-black border-r-[1px] items-center justify-center text-center">
                          <span className="text-[12pt] leading-[20px] font-batang">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex gap-[50px] w-[35%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[12pt] font-batang">
                            {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum1[index] + '-' + biddingInfo.bidIdNum2[index] : biddingInfo.bidCorpNum1[index] + '-' + biddingInfo.bidCorpNum2[index] + '-' + biddingInfo.bidCorpNum3[index]}
                          </span>
                        </div>
                        <div className="flex w-[15%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[12pt] tracking-[1pt] leading-[15px] font-batang">
                            전 화 번 호
                          </span>
                        </div>
                        <div className="flex w-[35%] justify-center items-center text-center">
                          <span className="text-[12pt] font-batang">
                            {totalResult && totalResult?.agent.phoneNo.length === 10 ? totalResult?.agent.phoneNo.substring(0, 2) + '-' + totalResult?.agent.phoneNo.substring(2, 6) + '-' + totalResult?.agent.phoneNo.substring(6, 10) : totalResult?.agent.phoneNo.substring(0, 3) + '-' + totalResult?.agent.phoneNo.substring(3, 7) + '-' + totalResult?.agent.phoneNo.substring(7, 11)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-[100%] h-[33%] ">
                      <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[12pt] font-batang ml-1">
                          주
                        </span>
                        <span className="text-[12pt] font-batang mr-1">
                          소
                        </span>
                      </div>
                      <div className="flex w-[85%] justify-center items-center text-center">
                        <span className="text-[12pt] font-batang">
                          {totalResult.bidders[index].address ?? ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }))
            :
            (bidders && bidders?.map((bidder: any, index: any) => {
              return (
                <div key={index} className={`flex w-[100%] h-[150px] ${index + 1 >= 2 ? 'border-black border-r-[2px] border-b-[2px] border-l-[2px]' : 'border-black border-[2px]'} `}>
                  <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                    <span className="text-[12pt] font-batang">
                      본인
                      <br />
                      {bidder.peopleSeq}
                    </span>
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%]">
                    <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[12pt] font-batang ml-1">
                          성
                        </span>
                        <span className="text-[12pt] font-batang mr-1">
                          명
                        </span>
                      </div>
                      <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <div className="flex w-[80%] justify-end">
                          <span className="text-[12pt] font-batang">
                            {bidder.name ?? ''}
                          </span>
                        </div>
                        <div className="flex w-[20%] font-batang justify-end mr-1">
                          <span className="text-[12pt] font-batang">
                            (인)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[12pt] font-batang ml-1">
                          직
                        </span>
                        <span className="text-[12pt] font-batang mr-1">
                          업
                        </span>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <span className="text-[12pt] font-batang">
                          {bidder.job ?? ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="flex w-[20%] border-black border-r-[1px] items-center justify-center text-center">
                          <span className="text-[12pt] tracking-[5pt] leading-[20px] font-batang">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[12pt] font-batang">
                            {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum1[index] + '-' + biddingInfo.bidIdNum2[index] : biddingInfo.bidCorpNum1[index] + '-' + biddingInfo.bidCorpNum2[index] + '-' + biddingInfo.bidCorpNum3[index]}
                          </span>
                        </div>
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[12pt] tracking-[5pt] leading-[15px] font-batang">
                            전 화 번 호
                          </span>
                        </div>
                        <div className="flex w-[30%] justify-center items-center text-center">
                          <span className="text-[12pt] font-batang">
                            {totalResult && totalResult?.agent.phoneNo.length === 10 ? totalResult?.agent.phoneNo.substring(0, 2) + '-' + totalResult?.agent.phoneNo.substring(2, 6) + '-' + totalResult?.agent.phoneNo.substring(6, 10) : totalResult?.agent.phoneNo.substring(0, 3) + '-' + totalResult?.agent.phoneNo.substring(3, 7) + '-' + totalResult?.agent.phoneNo.substring(7, 11)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-[100%] h-[40%] ">
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[12pt] font-batang ml-1">
                          주
                        </span>
                        <span className="text-[12pt] font-batang mr-1">
                          소
                        </span>
                      </div>
                      <div className="flex w-[80%] justify-center items-center text-center">
                        <span className="text-[12pt] font-batang">
                          {bidder.address ?? ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }))
          }
          <div className="flex flex-col justify-center items-center text-center w-[100%] mt-[25px]">
            <span className="font-batang text-[12pt]">
              * 본인의 인감 증명서 첨부
            </span>
            <span className="font-batang text-[12pt]">
              * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
            </span>
          </div>
          <div className="flex mt-[30px]">
            <span className="font-bold font-batang text-[25px]">
              {totalResult && totalResult?.reqCourtName + ' 본원 귀중' }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}