import { biddingInfoState } from "@/atom";
import { TotalResultType } from "@/model/IpchalType"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function AgentListFormPDF({ totalResult, bidders }: { totalResult: TotalResultType, bidders?: any }) {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState);
  const [mandateList, setMandateList] = useState<any>([])
  const [topHeight, setTopHeight] = useState<any>('')

  const handleMandateList = () => {
    let mandatesList = totalResult?.bidders.filter((item) => item.mandateYn === 'Y')
    setMandateList(mandatesList)
  }

  useEffect(() => {
    handleMandateList()
  }, [])

  const handleTop = () => {
    if (totalResult && totalResult?.bidders.length === 1) {
      setTopHeight('2650px')
    } else if (totalResult && totalResult.bidders.length > 10) {
      setTopHeight(`${(1000 * Math.ceil(totalResult && totalResult?.bidders.length / 10))}px`)
    } else {
      setTopHeight('2000px')
    }
  }
  
  useEffect(() => {
    handleTop()
  }, [])

  return (
    <div className="flex flex-col bg-white relative h-[1300px] w-[800px] mx-auto justify-center items-center scrollbar-hide" style={{
      top: "60px"
    }}>
      <div className="flex flex-col bg-white h-[100%] w-[100%] m-auto relative justify-center items-center">
        <div className="flex w-[100%] absolute top-[5px]">
          <span className="text-[11pt]  font-['batang']">
            (뒷면)
          </span>
        </div>
        <div className="flex flex-col w-[100%] items-center text-center absolute top-[10px]">
          <span className="text-[1.7rem] tracking-[20pt] leading-[23px] font-bold font-['batang']">
            위임장
          </span>
          <div className="flex flex-row w-[100%] h-[150px] border-black border-[2px] absolute top-[80px]">
            <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
              <span className="text-[13pt]  font-['batang']">
                대리인
              </span>
            </div>
            <div className="flex flex-col w-[100%] h-[100%]">
              <div className="flex flex-row w-[100%] h-[33%] border-black border-b-[1px]">
                <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                  <span className="text-[13pt]  font-['batang'] ml-1">
                    성
                  </span>
                  <span className="text-[13pt]  font-['batang'] mr-1">
                    명
                  </span>
                </div>
                <div className="flex justify-between md:gap-[50px] gap-[5%] w-[35%] border-black border-r-[1px] items-center text-center">
                  <div className="flex w-[80%] md:justify-end justify-center">
                    <span className="text-[13pt]  font-['batang']">
                      {totalResult?.agent.name ?? ''}
                    </span>
                  </div>
                  <div className="flex w-[20%]  font-['batang'] justify-end mr-1">
                    <span className="text-[13pt]  font-['batang']">
                      (인)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                  <span className="text-[13pt]  font-['batang'] ml-1">
                    직
                  </span>
                  <span className="text-[13pt]  font-['batang'] mr-1">
                    업
                  </span>
                </div>
                <div className="flex w-[35%] justify-center items-center text-center">
                  <span className="text-[13pt]  font-['batang']">
                    {totalResult && totalResult?.agent.job}
                  </span>
                </div>
              </div>
              <div className="flex w-[100%] h-[33%] border-black border-b-[1px]">
                <div className="flex flex-row w-[100%] h-[100%]">
                  <div className="flex w-[15%] border-black border-r-[1px] items-center justify-center text-center">
                    <span className="text-[13pt] leading-[20px]  font-['batang']">
                      주민등록번호
                    </span>
                  </div>
                  <div className="flex gap-[50px] w-[35%] border-black border-r-[1px] justify-center items-center text-center">
                    <span className="text-[13pt]  font-['batang']">
                      {biddingInfo.agentIdNum.substring(0, 6) + '-' + biddingInfo.agentIdNum.substring(6, 13)}
                    </span>
                  </div>
                  <div className="flex w-[15%] border-black border-r-[1px] justify-center items-center text-center">
                    <span className="text-[13pt] tracking-[1pt] leading-[15px]  font-['batang']">
                      전 화 번 호
                    </span>
                  </div>
                  <div className="flex w-[35%] justify-center items-center text-center">
                    <span className="text-[13pt]  font-['batang']">
                      {totalResult && totalResult?.agent.phoneNo.length === 10 ? totalResult?.agent.phoneNo.substring(0, 2) + '-' + totalResult?.agent.phoneNo.substring(2, 6) + '-' + totalResult?.agent.phoneNo.substring(6, 10) : totalResult?.agent.phoneNo.substring(0, 3) + '-' + totalResult?.agent.phoneNo.substring(3, 7) + '-' + totalResult?.agent.phoneNo.substring(7, 11)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-[100%] h-[33%] ">
                <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                  <span className="text-[13pt]  font-['batang'] ml-1">
                    주
                  </span>
                  <span className="text-[13pt]  font-['batang'] mr-1">
                    소
                  </span>
                </div>
                <div className="flex w-[80%] justify-center items-center text-center">
                  <span className=" font-['batang'] text-[13pt]">
                    {totalResult && totalResult?.agent.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] w-[90%] justify-center items-center text-center absolute top-[300px]">
          <span className="text-[13pt]  font-['batang']">
            위 사람을 대리인으로 정하고 다음 사항을 위임함.
          </span>
          <span className="text-[13pt]  font-['batang']">
            - 다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음 -
          </span>
          <div className="flex flex-row md:w-[100%] justify-center items-center text-center">
            <span className="text-[13pt]  font-['batang']">
              {totalResult && totalResult?.reqCourtName}
            </span>
            <span className="text-[13pt] text-black-500  font-['batang']">
              &nbsp;{totalResult && totalResult?.caseYear}
            </span>
            <span className="text-[13pt]  font-['batang']">
              &nbsp;타경&nbsp;
            </span>
            <span className="text-[13pt] text-black-500  font-['batang']">
              {totalResult && totalResult?.caseDetail}
            </span>
            <span className="text-[13pt]  font-['batang']">
              &nbsp;호 부동산
            </span>
          </div>
          <span className="text-[13pt]  font-['batang']">
            경매사건에 관한 입찰행위 일체
          </span>
        </div>
        <div className="flex flex-col gap-[10px] w-[100%] justify-center items-center absolute top-[500px]">
          {totalResult && totalResult?.bidders.length <= 3 ? (
            Array(3).fill('').map((_, index: any) => {
              return (
                <div key={index} className={`flex w-[100%] h-[150px] border-black border-r-[2px] border-b-[2px] border-l-[2px] border-t-[2px] `}>
                  <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                    <span className="text-[13pt]  font-['batang']">
                      본인
                      <br />
                      {(totalResult.bidders[index]?.peopleSeq) ?? index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%]">
                    <div className="flex flex-row w-[100%] h-[33%] border-black border-b-[1px]">
                      <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt]  font-['batang'] ml-1">
                          성
                        </span>
                        <span className="text-[13pt]  font-['batang'] mr-1">
                          명
                        </span>
                      </div>
                      <div className="flex flex-row md:gap-[50px] gap-[5%] w-[35%] border-black border-r-[1px] justify-center items-center text-center">
                        <div className="flex w-[80%] md:justify-end justify-center">
                          <span className="text-[13pt]  font-['batang']">
                          {mandateList[index]?.name ?? ''}
                          </span>
                        </div>
                        <div className="flex w-[20%]  font-['batang'] justify-end mr-1">
                          <span className="text-[13pt]  font-['batang']">
                            (인)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt]  font-['batang'] ml-1">
                          직
                        </span>
                        <span className="text-[13pt]  font-['batang'] mr-1">
                          업
                        </span>
                      </div>
                      <div className="flex w-[35%] justify-center items-center text-center">
                        <span className="text-[13pt]  font-['batang']">
                        {mandateList[index]?.job ?? ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[100%] h-[33%] border-black border-b-[1px]">
                      <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="flex w-[15%] border-black border-r-[1px] items-center justify-center text-center">
                          <span className="text-[13pt] leading-[20px]  font-['batang']">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex gap-[50px] w-[35%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[13pt]  font-['batang']">
                            {
                              mandateList[index]?.mandateYn === 'Y' ? (biddingInfo.bidCorpYn[mandateList[index].peopleSeq - 1] === 'I' ? (biddingInfo.bidIdNum[mandateList[index].peopleSeq - 1]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[mandateList[index].peopleSeq - 1]?.substring(6, 13)) : (biddingInfo.bidCorpYn[mandateList[index].peopleSeq - 1] === 'C' ? (mandateList[index]?.companyNo?.substring(0, 3) + '-' + mandateList[index]?.companyNo?.substring(3, 5) + '-' + mandateList[index]?.companyNo?.substring(5, 10)) : '')) : ''
                            }
                          </span>
                        </div>
                        <div className="flex w-[15%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[13pt] tracking-[1pt] leading-[15px]  font-['batang']">
                            전 화 번 호
                          </span>
                        </div>
                        <div className="flex w-[35%] justify-center items-center text-center">
                          <span className="text-[13pt]  font-['batang']">
                            {
                              mandateList[index]?.mandateYn === 'Y' ? (mandateList[index]?.phoneNo.length === 10 ? (mandateList[index]?.phoneNo?.substring(0, 2) + '-' + mandateList[index]?.phoneNo?.substring(2, 6) + '-' + mandateList[index]?.phoneNo?.substring(6, 10)) : (
                                mandateList[index]?.phoneNo?.substring(0, 3) + '-' + mandateList[index]?.phoneNo?.substring(3, 7) + '-' + mandateList[index]?.phoneNo?.substring(7, 11)
                              )) : ''
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-[100%] h-[33%] ">
                      <div className="flex justify-between w-[15%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt]  font-['batang'] ml-1">
                          주
                        </span>
                        <span className="text-[13pt]  font-['batang'] mr-1">
                          소
                        </span>
                      </div>
                      <div className="flex w-[85%] justify-center items-center text-center">
                        <span className="text-[13pt]  font-['batang']">
                          {mandateList[index]?.address ?? ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }))
            :
            (bidders.length / 3 === 0 ? bidders && bidders.map((bidder: any, index: any) => {
              return (
                <div key={index} className={`flex w-[100%] h-[150px] border-black border-r-[2px] border-b-[2px] border-l-[2px] border-t-[2px]`}>
                  <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                    <span className="text-[13pt]  font-['batang']">
                      본인
                      <br />
                      {bidder.peopleSeq}
                    </span>
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%]">
                    <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt]  font-['batang'] ml-1">
                          성
                        </span>
                        <span className="text-[13pt]  font-['batang'] mr-1">
                          명
                        </span>
                      </div>
                      <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <div className="flex w-[80%] justify-end">
                          <span className="text-[13pt]  font-['batang']">
                            {(totalResult && totalResult.bidders[index].mandateYn === 'Y' && bidder.name) ?? ''}
                          </span>
                        </div>
                        <div className="flex w-[20%]  font-['batang'] justify-end mr-1">
                          <span className="text-[13pt]  font-['batang']">
                            (인)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt]  font-['batang'] ml-1">
                          직
                        </span>
                        <span className="text-[13pt]  font-['batang'] mr-1">
                          업
                        </span>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <span className="text-[13pt]  font-['batang']">
                          {(totalResult && totalResult.bidders[index].mandateYn === 'Y' && bidder.job) ?? ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="flex w-[20%] border-black border-r-[1px] items-center justify-center text-center">
                          <span className="text-[13pt] tracking-[5pt] leading-[20px]  font-['batang']">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[13pt]  font-['batang']">
                            {
                              totalResult && totalResult.bidders[index].mandateYn === 'Y' ? (biddingInfo.bidCorpYn[index] === 'I' ? (biddingInfo.bidIdNum[index]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[index]?.substring(6, 13)) : (biddingInfo.bidCorpYn[index] === 'C' ? (totalResult.bidders[index]?.companyNo?.substring(0, 3) + '-' + totalResult.bidders[index]?.companyNo?.substring(3, 5) + '-' + totalResult.bidders[index]?.companyNo?.substring(5, 10)) : '')) : ''
                            }
                          </span>
                        </div>
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[13pt] tracking-[5pt] leading-[15px]  font-['batang']">
                            전 화 번 호
                          </span>
                        </div>
                        <div className="flex w-[30%] justify-center items-center text-center">
                          <span className="text-[13pt]  font-['batang']">
                          {
                            totalResult && totalResult.bidders[index].mandateYn === 'Y' ? (totalResult.bidders[index]?.phoneNo.length === 10 ? (totalResult.bidders[index]?.phoneNo?.substring(0, 2) + '-' + totalResult.bidders[index]?.phoneNo?.substring(2, 6) + '-' + totalResult.bidders[index]?.phoneNo?.substring(6, 10)) : (
                              totalResult.bidders[index]?.phoneNo?.substring(0, 3) + '-' + totalResult.bidders[index]?.phoneNo?.substring(3, 7) + '-' + totalResult.bidders[index]?.phoneNo?.substring(7, 11)
                            )) : ''
                          }
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-[100%] h-[40%] ">
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt]  font-['batang'] ml-1">
                          주
                        </span>
                        <span className="text-[13pt]  font-['batang'] mr-1">
                          소
                        </span>
                      </div>
                      <div className="flex w-[80%] justify-center items-center text-center">
                        <span className="text-[12pt]  font-['batang']">
                          {(totalResult && totalResult.bidders[index]?.mandateYn === 'Y' && bidders[index].address) ?? ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }) : 
            Array(Math.ceil(bidders.length / 3) * 3).fill('').map((_, index: any) => {
              return (
                <div key={index} className="flex w-[100%] h-[150px] border-black border-r-[2px] border-b-[2px] border-l-[2px] border-t-[2px]">
                  <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                    <span className="text-[13pt]  font-['batang']">
                      본인
                      <br />
                      {
                        (Math.ceil(bidders.length / 3) * 3) / 3 === 1 ? index + 1 : index + 1 > 3 ? index + 1 - 3 : index + 1
                      }
                    </span>
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%]">
                    <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt]  font-['batang'] ml-1">
                          성
                        </span>
                        <span className="text-[13pt]  font-['batang'] mr-1">
                          명
                        </span>
                      </div>
                      <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <div className="flex w-[80%] justify-end">
                          <span className="text-[13pt]  font-['batang']">
                            {
                              bidders[index]?.name ?? ''
                            }
                          </span>
                        </div>
                        <div className="flex w-[20%]  font-['batang'] justify-end mr-1">
                          <span className="text-[13pt]  font-['batang']">
                            (인)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt]  font-['batang'] ml-1">
                          직
                        </span>
                        <span className="text-[13pt]  font-['batang'] mr-1">
                          업
                        </span>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <span className="text-[13pt]  font-['batang']">
                          {
                            bidders[index]?.job ?? ''
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="flex w-[20%] border-black border-r-[1px] items-center justify-center text-center">
                          <span className="text-[13pt] tracking-[5pt] leading-[20px]  font-['batang']">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[13pt]  font-['batang']">
                            {
                              bidders[index]?.mandateYn === 'Y' ? (biddingInfo.bidCorpYn[bidders[index].peopleSeq - 1] === 'I' ? (biddingInfo.bidIdNum[bidders[index].peopleSeq - 1]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[bidders[index].peopleSeq - 1]?.substring(6, 13)) : (biddingInfo.bidCorpYn[bidders[index].peopleSeq - 1] === 'C' ? (bidders[index]?.companyNo?.substring(0, 3) + '-' + bidders[index]?.companyNo?.substring(3, 5) + '-' + bidders[index]?.companyNo?.substring(5, 10)) : '')) : ''
                            }
                          </span>
                        </div>
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[13pt] tracking-[5pt] leading-[15px]  font-['batang']">
                            전 화 번 호
                          </span>
                        </div>
                        <div className="flex w-[30%] justify-center items-center text-center">
                          <span className="text-[13pt]  font-['batang']">
                            {
                              bidders[index]?.mandateYn === 'Y' ? (bidders[index]?.phoneNo.length === 10 ? (bidders[index]?.phoneNo?.substring(0, 2) + '-' + bidders[index]?.phoneNo?.substring(2, 6) + '-' + bidders[index]?.phoneNo?.substring(6, 10)) : (
                                bidders[index]?.phoneNo?.substring(0, 3) + '-' + bidders[index]?.phoneNo?.substring(3, 7) + '-' + bidders[index]?.phoneNo?.substring(7, 11)
                              )) : ''
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-[100%] h-[40%] ">
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="text-[13pt] font-['batang'] ml-1">
                          주
                        </span>
                        <span className="text-[13pt] font-['batang'] mr-1">
                          소
                        </span>
                      </div>
                      <div className="flex w-[80%] justify-center items-center text-center">
                        <span className="text-[13pt]  font-['batang']">
                          {bidders[index]?.address ?? ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}))}
          <div className="flex flex-col w-[100%] mt-[25px]">
            <span className="text-left font-['batang'] text-[13pt]">
              * 본인의 인감 증명서 첨부
            </span>
            <span className=" font-['batang'] text-[12pt]">
              * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
            </span>
          </div>
          <div className="flex mt-[30px]">
            <span className="text-left font-bold  font-['batang'] text-[1.7rem]">
              {totalResult && totalResult?.reqCourtName + ' 귀중' }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}