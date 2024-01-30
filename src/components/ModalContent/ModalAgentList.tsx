import { biddingInfoState } from "@/atom"
import { useRecoilState } from "recoil"

export default function ModalAgentList() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  return (
    <div className={`flex flex-col bg-mybg h-[1600px] w-[100%] md:w-[90%] m-auto justify-center items-center absolute ${biddingInfo.agentName !== '' ? 'top-[700px]' : 'top-[3600px]'}`}>
      <div className="flex w-[100%] absolute top-0">
        <span className="md:text-[12pt] text-[10px] font-batang">
          (뒷면)
        </span>
      </div>
      <div className="flex flex-col w-[100%] items-center text-center absolute top-[50px]">
        <span className="md:text-[18pt] text-[18px] font-batang">
          위임장
        </span>
        <div className="flex flex-row w-[100%] h-[200px] border-black border-[2px] absolute top-[100px]">
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
              <div className="flex flex-row md:gap-[50px] gap-[5%] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                <div className="flex w-[80%] md:justify-end justify-center">
                  <span className="md:text-[12pt] text-[12px] font-batang">
                    {biddingInfo.agentName ?? ''}
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
                  {biddingInfo.agentJob}
                </span>
              </div>
            </div>
            <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
              <div className="flex flex-row w-[100%] h-[100%]">
                <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                  <span className="md:text-[12pt] text-[12px] leading-[20px] font-batang">
                    주민등록번호
                  </span>
                </div>
                <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                  <span className="md:text-[16px] text-[12px]">
                    {biddingInfo.agentIdNum1 + '-' + biddingInfo.agentIdNum2}
                  </span>
                </div>
                <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                  <span className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                    전 화 번 호
                  </span>
                </div>
                <div className="flex w-[30%] justify-center items-center text-center">
                  <span className="md:text-[12pt] text-[12px] font-batang">
                    {biddingInfo.agentPhone1 + '-' + biddingInfo.agentPhone2 + '-' + biddingInfo.agentPhone3}
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
                  {biddingInfo.agentAddr}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[25px] w-[100%] justify-center items-center text-center absolute top-[400px]">
        <span className="md:text-[12pt] text-[14px] font-batang">
          위 사람을 대리인으로 정하고 다음 사항을 위임함.
        </span>
        <span className="md:text-[12pt] text-[14px] font-batang">
          다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음
        </span>
        <div className="flex flex-row w-[100%] justify-center items-center text-center">
          <span className="md:text-[12pt] text-[14px] font-batang">
            {biddingInfo.reqCourtName + ' 본원 '}
          </span>
          <span className="md:text-[12pt] text-[14px] text-red-500 font-bold font-batang">
            &nbsp;{biddingInfo.caseNo.substring(0, 4)}&nbsp;
          </span>
          <span className="md:text-[12pt] text-[14px] font-batang">
            &nbsp;타경&nbsp;
          </span>
          <span className="md:text-[12pt] text-[14px] text-red-500 font-bold font-batang">
            {biddingInfo.caseNo.substring(4, 11)}
          </span>
          <span className="md:text-[12pt] text-[14px] font-batang">
            &nbsp;호
          </span>
        </div>
        <span className="md:text-[12pt] text-[14px] font-batang">
          경매사건에 관한입찰행위 일체
        </span>
      </div>
      <div className="flex flex-col w-[100%] justify-center items-center absolute top-[650px]">
        {biddingInfo.bidName.map((_, index) => {
          return (
            <div key={index} className={`flex w-[100%] h-[200px] ${index + 1 >= 2 ? 'border-black border-r-[2px] border-b-[2px] border-l-[2px]' : 'border-black border-[2px]'} `}>
              <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                <span className="md:text-[12pt] text-[14px] font-batang">
                  본인
                  <br />
                  {index + 1}
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
                  <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                    <div className="flex w-[80%] md:justify-end justify-center">
                      <span className="md:text-[12pt] text-[12px] font-batang">
                        {biddingInfo.bidName[index]}
                      </span>
                    </div>
                    <div className="flex w-[20%] font-batang justify-end mr-1">
                      <span className="md:text-[12pt] text-[12px] font-batang">
                        (인)
                      </span>
                    </div>
                  </div>
                  <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                    <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                      직
                    </span>
                    <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                      업
                    </span>
                  </div>
                  <div className="flex w-[30%] justify-center items-center text-center">
                    <span className="md:text-[12pt] text-[12px] font-batang">
                      {biddingInfo.bidJob[index]}
                    </span>
                  </div>
                </div>
                <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                  <div className="flex flex-row w-[100%] h-[100%]">
                    <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                      <span className="md:text-[12pt] text-[12px] leading-[20px] font-batang">
                        주민등록번호
                      </span>
                    </div>
                    <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang">
                        {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum[index]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[index]?.substring(6, 13) : biddingInfo.bidCorpYn[index] === 'C' ? biddingInfo.bidCorpNum[index]?.substring(0, 3) + '-' + biddingInfo.bidCorpNum[index]?.substring(3, 5) + '-' + biddingInfo.bidCorpNum[index]?.substring(5, 10) : ''}
                      </span>
                    </div>
                    <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                      <span className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                        전 화 번 호
                      </span>
                    </div>
                    <div className="flex w-[30%] justify-center items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang">
                        {biddingInfo.bidPhone[index].length === 10 ? biddingInfo.bidPhone[index].substring(0, 2) + '-' + biddingInfo.bidPhone[index].substring(2, 6) + '-' + biddingInfo.bidPhone[index].substring(6, 10) : biddingInfo.bidPhone[index].substring(0, 3) + '-' + biddingInfo.bidPhone[index].substring(3, 7) + '-' + biddingInfo.bidPhone[index].substring(7, 11)}
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
                      {biddingInfo.bidAddr[index]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="flex flex-col justify-center items-center text-center gap-[25px] w-[800px] mt-[25px]">
          <span className="font-batang md:text-[12pt] text-[12px]">
            * 본인의 인감 증명서 첨부
          </span>
          <span className="font-batang md:text-[12pt] text-[12px]">
            * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
          </span>
          <span className="font-extrabold font-batang md:text-[25px] text-[20px]">
            {biddingInfo.reqCourtName + ' 본원 귀중'}
          </span>
        </div>
      </div>
    </div>
  )
}