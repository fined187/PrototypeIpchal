import { biddingInfoState, stepState } from "@/atom";
import { GetBiddingInfoType, TotalResultType } from "@/interface/IpchalType";
import { useRecoilValue } from "recoil";

export default function AgentListFormContent({ totalResult }: { totalResult: TotalResultType}) {
  const biddingInfo = useRecoilValue(biddingInfoState);
  const stateNum = useRecoilValue(stepState);
  
  return (
    <div className={`flex flex-col bg-white h-[1300px] w-[100%] mx-auto justify-center items-center relative overflow-x-scroll scrollbar-hide`}>
      <div className={`flex flex-col bg-white ${totalResult && totalResult.bidders.length === 3 ? 'h-[100%]' : totalResult && totalResult.bidders.length === 1 ? 'h-[97%]' : 'h-[94%]'} w-[100%] mx-auto ${totalResult && totalResult.bidders.length === 3 ? 'absolute top-[5px]' : 'absolute top-0'} justify-center items-center`}>
        <div className="flex md:w-[80%] w-[100%] absolute top-0">
          <p className="text-[15px] font-NanumGothic">
            (뒷면)
          </p>
        </div>
        <div className="flex flex-col md:w-[100%] w-[100%] items-center text-center absolute top-[10px]">
          <span className="text-[22px] font-extrabold font-NanumGothic">
            위임장
          </span>
          <div className="flex flex-row md:w-[80%] w-[100%] h-[200px] border-black border-[2px] absolute top-[50px]">
            <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
              <p className="text-[16px]">
                대리인
              </p>
            </div>
            <div className="flex flex-col md:w-[100%] h-[100%]">
              <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                  <p className="text-[16px]">
                    성명
                  </p>
                </div>
                <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                  <p className="text-[16px]">
                    {totalResult && totalResult?.agent.name}
                  </p>
                  <p className="text-[16px]">
                    (인)
                  </p>
                </div>
                <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                  <p className="text-[16px]">
                    직업
                  </p>
                </div>
                <div className="flex w-[30%] justify-center items-center text-center">
                  <p className="text-[16px]">
                    {totalResult && totalResult?.agent.job}
                  </p>
                </div>
              </div>
              <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                <div className="flex flex-row w-[100%] h-[100%]">
                  <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                    <p className="text-[16px]">
                      주민등록번호
                    </p>
                  </div>
                  <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                    <p className="text-[16px]">
                      {biddingInfo.agentIdNum1 + '-' + biddingInfo.agentIdNum2}
                    </p>
                  </div>
                  <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                    <p className="text-[16px]">
                      전 화 번 호
                    </p>
                  </div>
                  <div className="flex w-[30%] justify-center items-center text-center">
                    <p className="text-[16px]">
                      {biddingInfo.agentPhone1 + '-' + biddingInfo.agentPhone2 + '-' + biddingInfo.agentPhone3}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-[100%] h-[40%] ">
                <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                  <p>
                    주 소
                  </p>
                </div>
                <div className="flex w-[80%] justify-center items-center text-center">
                  <p>
                    {totalResult && totalResult?.agent.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[25px] md:w-[100%] justify-center items-center text-center absolute top-[300px]">
          <span className="text-[16px] font-NanumGothic">
            위 사람을 대리인으로 정하고 다음 사항을 위임함.
          </span>
          <span className="text-[16px] font-NanumGothic">
            다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음
          </span>
          <div className="flex flex-row md:w-[100%] justify-center items-center text-center">
            <span className="text-[16px]">
              {totalResult && totalResult?.reqCourtName + ' 본원 ' }
            </span>
            <span className="text-[16px] text-red-500 font-bold">
              &nbsp;{totalResult && totalResult?.caseYear}
            </span>
            <span className="text-[16px]">
              &nbsp;타경&nbsp;
            </span>
            <span className="text-[16px] text-red-500 font-bold">
              {totalResult && totalResult?.caseDetail}
            </span>
            <span className="text-[16px]">
              &nbsp;호
            </span>
          </div>
          <span className="text-[16px]">
            경매사건에 관한입찰행위 일체
          </span>
        </div>
        <div className="flex flex-col md:w-[80%] w-[100%] justify-center items-center absolute top-[500px]">
          {totalResult && totalResult?.bidders.map((_, index) => {
            return (
              <div key={index} className={`flex w-[750px] h-[200px] ${index + 1 >= 2 ? 'border-black border-r-[2px] border-b-[2px] border-l-[2px]' : 'border-black border-[2px]'} `}>
                <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                  <p className="text-[16px]">
                    본인
                    <br />
                    {index + 1}
                  </p>
                </div>
                <div className="flex flex-col w-[750px] h-[100%]">
                  <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                    <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                      <p className="text-[16px]">
                        성명
                      </p>
                    </div>
                    <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                      <p className="text-[16px]">
                        {totalResult && totalResult?.bidders[index].name}
                      </p>
                      <p className="text-[16px]">
                        (인)
                      </p>
                    </div>
                    <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                      <p className="text-[16px]">
                        직업
                      </p>
                    </div>
                    <div className="flex w-[30%] justify-center items-center text-center">
                      <p className="text-[16px]">
                        {totalResult && totalResult?.bidders[index].job}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                    <div className="flex flex-row w-[100%] h-[100%]">
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          주민등록번호
                        </p>
                      </div>
                      <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum1[index] + '-' + biddingInfo.bidIdNum2[index] : biddingInfo.bidCorpNum1[index] + '-' + biddingInfo.bidCorpNum2[index] + '-' + biddingInfo.bidCorpNum3[index]}
                        </p>
                      </div>
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          전 화 번 호
                        </p>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <p className="text-[16px]">
                        {biddingInfo.bidPhone[index].length === 10 ? biddingInfo.bidPhone[index].substring(0, 3) + '-' + biddingInfo.bidPhone[index].substring(3, 6) + '-' + biddingInfo.bidPhone[index].substring(6, 10) : biddingInfo.bidPhone[index].substring(0, 3) + '-' + biddingInfo.bidPhone[index].substring(3, 7) + '-' + biddingInfo.bidPhone[index].substring(7, 11)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-[100%] h-[40%] ">
                    <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                      <p>
                        주 소
                      </p>
                    </div>
                    <div className="flex w-[80%] justify-center items-center text-center">
                      <p>
                        {totalResult && totalResult?.bidders[index].address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="flex flex-col justify-center items-center text-center gap-[25px] w-[800px] mt-[25px]">
            <span>
              * 본인의 인감 증명서 첨부
            </span>
            <span>
              * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
            </span>
            <span className="font-extrabold font-NanumGothic text-[25px]">
              {totalResult && totalResult?.reqCourtName + ' 본원 귀중' }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}