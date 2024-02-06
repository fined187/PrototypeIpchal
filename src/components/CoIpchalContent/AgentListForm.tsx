import { biddingInfoState } from "@/atom";
import { TotalResultType } from "@/interface/IpchalType";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function AgentListForm({ totalResult, index, bidders }: { totalResult: TotalResultType, index?: number, bidders?: any }) {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState);
  const [mandateList, setMandateList] = useState<any>([])

  const handleMandateList = () => {
    let mandatesList = totalResult?.bidders.filter((item) => item.mandateYn === 'Y')
    setMandateList(mandatesList)
  }

  useEffect(() => {
    handleMandateList()
  }, [])

  console.log('mandateList', mandateList)
  console.log(bidders && bidders)
  return (
    <div className={`flex flex-col bg-white h-[1300px] md:w-[50%] w-[100%] mx-auto justify-center items-center relative overflow-x-scroll scrollbar-hide`}>
      <div className="flex flex-col bg-mybg h-[100%] w-[100%] m-auto relative justify-center items-center">
        <div className="flex md:w-[80%] w-[100%] absolute top-[5px]">
          <span className="md:text-[12pt] text-[10px] font-batang">
            (뒷면)
          </span>
        </div>
        <div className="flex flex-col md:w-[80%] w-[100%] items-center text-center absolute top-[10px]">
          <span className="md:text-[18pt] text-[18px] font-batang">
            위임장
          </span>
          <div className="flex flex-row w-[100%] h-[150px] border-black border-[2px] absolute top-[80px]">
            <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
              <span className="md:text-[12pt] text-[11pt] font-batang">
                대리인
              </span>
            </div>
            <div className="flex flex-col w-[100%] h-[100%]">
              <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                  <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                    성
                  </span>
                  <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                    명
                  </span>
                </div>
                <div className="flex justify-between md:gap-[50px] gap-[5%] w-[30%] border-black border-r-[1px] items-center text-center">
                  <div className="flex w-[80%] md:justify-end justify-center">
                    <span className="md:text-[12pt] text-[12px] font-batang">
                      {totalResult?.agent.name ?? ''}
                    </span>
                  </div>
                  <div className="flex w-[20%] font-batang justify-end mr-1">
                    <span className="md:text-[12pt] text-[12px] font-batang">
                      (인)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                  <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                    직
                  </span>
                  <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                    업
                  </span>
                </div>
                <div className="flex w-[30%] justify-center items-center text-center">
                  <span className="md:text-[12pt] text-[12px] font-batang">
                    {totalResult && totalResult?.agent.job}
                  </span>
                </div>
              </div>
              <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                <div className="flex flex-row w-[100%] h-[100%]">
                  <div className="flex w-[20%] border-black border-r-[1px] items-center justify-center text-center">
                    <span className="md:text-[12pt] text-[12px] leading-[20px] font-batang">
                      주민등록번호
                    </span>
                  </div>
                  <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                    <span className="md:text-[16px] text-[12px]">
                      {biddingInfo.agentIdNum.substring(0, 6) + '-' + biddingInfo.agentIdNum.substring(6, 13)}
                    </span>
                  </div>
                  <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                    <span className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                      전 화 번 호
                    </span>
                  </div>
                  <div className="flex w-[30%] justify-center items-center text-center">
                    <span className="md:text-[12pt] text-[12px] font-batang">
                      {totalResult && totalResult?.agent.phoneNo.length === 10 ? totalResult?.agent.phoneNo.substring(0, 2) + '-' + totalResult?.agent.phoneNo.substring(2, 6) + '-' + totalResult?.agent.phoneNo.substring(6, 10) : totalResult?.agent.phoneNo.substring(0, 3) + '-' + totalResult?.agent.phoneNo.substring(3, 7) + '-' + totalResult?.agent.phoneNo.substring(7, 11)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-[100%] h-[40%] ">
                <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                  <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                    주
                  </span>
                  <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                    소
                  </span>
                </div>
                <div className="flex w-[80%] justify-center items-center text-center">
                  <span className="font-batang md:text-[12pt] text-[12px]">
                    {totalResult && totalResult?.agent.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[25px] w-[100%] justify-center items-center text-center absolute top-[300px]">
          <span className="md:text-[12pt] text-[14px] font-batang">
            위 사람을 대리인으로 정하고 다음 사항을 위임함.
          </span>
          <span className="md:text-[12pt] text-[14px] font-batang">
            - 다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음 -
          </span>
          <div className="flex flex-row md:w-[100%] justify-center items-center text-center">
            <span className="md:text-[12pt] text-[14px] font-batang">
              {totalResult && totalResult?.reqCourtName}
            </span>
            <span className="md:text-[12pt] text-[14px] text-black-500 font-bold font-batang">
              &nbsp;{totalResult && totalResult?.caseYear}
            </span>
            <span className="md:text-[12pt] text-[14px] font-batang">
              &nbsp;타경&nbsp;
            </span>
            <span className="md:text-[12pt] text-[14px] text-black-500 font-bold font-batang">
              {totalResult && totalResult?.caseDetail}
            </span>
            <span className="md:text-[12pt] text-[14px] font-batang">
              &nbsp;호 부동산
            </span>
          </div>
          <span className="md:text-[12pt] text-[14px] font-batang">
            경매사건에 관한 입찰행위 일체
          </span>
        </div>
        <div className="flex flex-col gap-[10px] w-[100%] justify-center items-center absolute top-[550px]">
        {totalResult && totalResult?.bidders.length <= 3 ? (
          Array(3).fill('').map((_, index: any) => {
            return (
              <div key={index} className={`flex md:w-[80%] w-[100%] h-[150px] border-black border-r-[2px] border-b-[2px] border-l-[2px] border-t-[2px] `}>
                <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                  <span className="md:text-[12pt] text-[14px] font-batang">
                    본인
                    <br />
                    {(totalResult.bidders[index]?.peopleSeq) ?? index + 1}
                  </span>
                </div>
                <div className="flex flex-col w-[750px] h-[100%]">
                  <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                    <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                        성
                      </span>
                      <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                        명
                      </span>
                    </div>
                    <div className="flex flex-row md:gap-[50px] gap-[5%] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                      <div className="flex w-[80%] md:justify-end justify-center">
                        <span className="md:text-[12pt] text-[12px] font-batang">
                          {mandateList[index]?.name ?? ''}
                        </span>
                      </div>
                      <div className="flex w-[20%] font-batang justify-end mr-1">
                        <span className="md:text-[12pt] text-[12px] font-batang">
                          (인)
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                        직
                      </span>
                      <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                        업
                      </span>
                    </div>
                    <div className="flex w-[30%] justify-center items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang">
                        {mandateList[index]?.job ?? ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                    <div className="flex flex-row w-[100%] h-[100%]">
                      <div className="flex w-[20%] border-black border-r-[1px] items-center justify-center text-center">
                        <span className="md:text-[12pt] text-[12px] leading-[20px] font-batang">
                          주민등록번호
                        </span>
                      </div>
                      <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <span className="md:text-[12pt] text-[12px] font-batang">
                          {
                            mandateList[index]?.mandateYn === 'Y' ? (biddingInfo.bidCorpYn[mandateList[index].peopleSeq - 1] === 'I' ? (biddingInfo.bidIdNum[mandateList[index].peopleSeq - 1]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[mandateList[index].peopleSeq - 1]?.substring(6, 13)) : (biddingInfo.bidCorpYn[mandateList[index].peopleSeq - 1] === 'C' ? (mandateList[index]?.companyNo?.substring(0, 3) + '-' + mandateList[index]?.companyNo?.substring(3, 5) + '-' + mandateList[index]?.companyNo?.substring(5, 10)) : '')) : ''
                          }
                        </span>
                      </div>
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <span className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                          전 화 번 호
                        </span>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <span className="md:text-[12pt] text-[12px] font-batang">
                          {
                            mandateList[index]?.mandateYn === 'Y' ? (mandateList[index]?.phoneNo.length === 10 ? (mandateList[index]?.phoneNo?.substring(0, 2) + '-' + mandateList[index]?.phoneNo?.substring(2, 6) + '-' + mandateList[index]?.phoneNo?.substring(6, 10)) : (
                              mandateList[index]?.phoneNo?.substring(0, 3) + '-' + mandateList[index]?.phoneNo?.substring(3, 7) + '-' + mandateList[index]?.phoneNo?.substring(7, 11)
                            )) : ''
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-[100%] h-[40%] ">
                    <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                        주
                      </span>
                      <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                        소
                      </span>
                    </div>
                    <div className="flex w-[80%] justify-center items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang">
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
              <div key={index} className={`flex md:w-[80%] w-[100%] h-[150px] border-black border-r-[2px] border-b-[2px] border-l-[2px] border-t-[2px] `}>
                <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                  <span className="md:text-[12pt] text-[12px] font-batang">
                    본인
                    <br />
                    {bidder.peopleSeq}
                  </span>
                </div>
                <div className="flex flex-col w-[750px] h-[100%]">
                  <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                    <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                        성
                      </span>
                      <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                        명
                      </span>
                    </div>
                    <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                      <div className="flex w-[80%] justify-end">
                        <span className="md:text-[12pt] text-[12px] font-batang">
                          {(totalResult && totalResult.bidders[index].mandateYn === 'Y' && bidder.name) ?? ''}
                        </span>
                      </div>
                      <div className="flex w-[20%] font-batang justify-end mr-1">
                        <span className="md:text-[12pt] text-[12px] font-batang">
                          (인)
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                        직
                      </span>
                      <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                        업
                      </span>
                    </div>
                    <div className="flex w-[30%] justify-center items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang">
                        {(totalResult && totalResult.bidders[index].mandateYn === 'Y' && bidder.job) ?? ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                    <div className="flex flex-row w-[100%] h-[100%]">
                      <div className="flex w-[20%] border-black border-r-[1px] items-center justify-center text-center">
                        <span className="md:text-[12pt] text-[12px] leading-[20px] font-batang">
                          주민등록번호
                        </span>
                      </div>
                      <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <span className="md:text-[12pt] text-[12px] font-batang">
                          {
                            totalResult && totalResult.bidders[index].mandateYn === 'Y' ? (biddingInfo.bidCorpYn[index] === 'I' ? (biddingInfo.bidIdNum[index]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[index]?.substring(6, 13)) : (biddingInfo.bidCorpYn[index] === 'C' ? (totalResult.bidders[index]?.companyNo?.substring(0, 3) + '-' + totalResult.bidders[index]?.companyNo?.substring(3, 5) + '-' + totalResult.bidders[index]?.companyNo?.substring(5, 10)) : '')) : ''
                          }
                        </span>
                      </div>
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <span className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                          전 화 번 호
                        </span>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <span className="md:text-[12pt] text-[12px] font-batang">
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
                      <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                        주
                      </span>
                      <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                        소
                      </span>
                    </div>
                    <div className="flex w-[80%] justify-center items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang">
                        {(totalResult && totalResult.bidders[index]?.mandateYn === 'Y' && bidders[index].address) ?? ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          : Array(Math.ceil(bidders.length / 3) * 3).fill('').map((_, index: any) => {      //  3으로 나눈 몫을 올림한 값에 3을 곱한 값 => 3의 배수로 만들어주기 위함
            return (
              <div key={index} className={`flex md:w-[80%] w-[100%] h-[150px] border-black border-r-[2px] border-b-[2px] border-l-[2px] border-t-[2px] `}>
                <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                  <span className="text-[12pt] font-batang">
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
                          {
                            bidders[index]?.name ?? ''
                          }
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
                        {
                          bidders[index]?.job ?? ''
                        }
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
                          {
                            bidders[index]?.mandateYn === 'Y' ? (biddingInfo.bidCorpYn[bidders[index].peopleSeq - 1] === 'I' ? (biddingInfo.bidIdNum[bidders[index].peopleSeq - 1]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[bidders[index].peopleSeq - 1]?.substring(6, 13)) : (biddingInfo.bidCorpYn[bidders[index].peopleSeq - 1] === 'C' ? (bidders[index]?.companyNo?.substring(0, 3) + '-' + bidders[index]?.companyNo?.substring(3, 5) + '-' + bidders[index]?.companyNo?.substring(5, 10)) : '')) : ''
                          }
                        </span>
                      </div>
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <span className="text-[12pt] tracking-[5pt] leading-[15px] font-batang">
                          전 화 번 호
                        </span>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <span className="text-[12pt] font-batang">
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
                      <span className="text-[12pt] font-batang ml-1">
                        주
                      </span>
                      <span className="text-[12pt] font-batang mr-1">
                        소
                      </span>
                    </div>
                    <div className="flex w-[80%] justify-center items-center text-center">
                      <span className="text-[12pt] font-batang">
                        {bidders[index]?.address ?? ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}))
        }
          <div className="flex flex-col justify-center w-[80%] mt-[25px]">
            <span className="text-left font-batang md:text-[12pt] text-[12px]">
              * 본인의 인감 증명서 첨부
            </span>
            <span className="text-left font-batang md:text-[12pt] text-[12px]">
              * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
            </span>
            <span className="text-center font-extrabold font-batang md:text-[25px] text-[20px] mt-[20px]">
              {totalResult && totalResult?.reqCourtName + ' 귀중' }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}