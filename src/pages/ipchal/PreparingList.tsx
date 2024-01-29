import { biddingInfoState, stepState } from "@/atom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

export default function PreparingList() {
  const [msg, setMsg] = useState<string>('')
  const [detailList, setDetailList] = useState<string[]>([])
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)

  const handlePreparingMsg = () => {
    if (biddingInfo.bidName.length === 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn[0] === 'I') {
      setMsg('본인이 직접 입찰하셨습니다.')
      setDetailList(['- 신분증', ' - 도장'])
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn[0] === 'I') {
      setMsg(`${biddingInfo.agentName}이 개인의 대리인으로 입찰하셨습니다.`)
      setDetailList(['- 본인의 인감증명서와 본인의 인감이 날인된 위임장', '- 대리인의 도장, 대리인의 신분증'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn.includes('C')) {
      setMsg(`법인명의를 포함한 ${biddingInfo.bidderNum}명의 공동입찰자가 입찰하셨습니다.`)
      setDetailList(['- 공동입찰신고서 (구법사건일 경우: 입찰하기 전에 집행관에게 사전신고 필요)', '- 공동입찰자목록 (상호간의 지분 표시)', '- 불참자의 인감증명서', '- 불참자의 인감이 날인된 위임장', '- 법인의 등기부등본', '- 대표이사의 신분증, 대표이사의 도장'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn.includes('C')) {
      setMsg(`법인명의를 포함한 ${biddingInfo.bidderNum}명의 공동입찰자의 대리인으로 입찰하셨습니다.`)
      setDetailList(['- 법인의 등기부등본', '- 법인 인감증명서, 위임장', '- 대리인의 신분증, 대리인의 도장', '- 공동입찰신고서 (구법사건일 경우: 입찰하기 전에 집행관에게 사전신고 필요)','- 공동입찰자목록 (상호간의 지분 표시)', '- 불참자의 인감증명서', '- 불참자의 인감이 날인된 위임장', '- 법인의 등기부등본', '- 대표이사의 신분증, 대표이사의 도장'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && !biddingInfo.bidCorpYn.includes('C')) {
      setMsg(`${biddingInfo.bidderNum}명의 공동입찰자가 입찰하셨습니다.`)
      setDetailList(['- 공동입찰신고서 (구법사건일 경우: 입찰하기 전에 집행관에게 사전신고 필요)', '- 공동입찰자목록 (상호간의 지분 표시)', '- 불참자의 인감증명서', '- 불참자의 인감이 날인된 위임장'])
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn[0] === 'C') {
      setMsg(`${biddingInfo.agentName}이 법인의 대리인으로 입찰하셨습니다.`)
      setDetailList(['- 법인의 등기부등본', '- 법인 인감증명서, 위임장', '- 대리인의 신분증, 대리인의 도장'])
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn[0] === 'C') {
      setMsg('법인이 입찰하셨습니다.')
      setDetailList(['- 법인의 등기부등본', '- 대표이사의 신분증, 대표이사의 도장'])
    }
  }

  useEffect(() => {
    handlePreparingMsg()
  }, [])

  return (
    <>
      <div className="flex flex-col justify-center w-[100%] h-screen bg-white items-center text-center relative">
        <div className="flex flex-col justify-center items-center md:w-[50%] w-[100%] h-[100%] bg-mybg relative top-[0px]">
          <div className="flex w-[100%] justify-center items-center absolute top-[20px] md:top-[0px]">
            <span className="text-[18pt] font-NanumGothic font-bold">
              입찰시 준비 서류
            </span>
          </div>
          <div className="flex flex-col md:w-[90%] w-[100%] h-[500px] rounded-lg absolute top-[100px] justify-center items-center">
            <div className="flex bg-gray-200 w-[90%] h-[10%] mx-auto rounded-xl justify-center items-center text-center absolute top-[25px]">
              <span className="md:text-[14pt] text-[12pt] font-NanumGothic text-blue-600 font-bold text-center">
                {msg}
              </span>
            </div>
            <div className="flex flex-col border-gray border-[1px] w-[90%] h-[70%] bg-white rounded-xl absolute top-[100px] gap-[10px] p-[15px] overflow-y-scroll">
              <span className="md:text-[14pt] text-[11pt] font-NanumGothic font-semibold text-left">
                - 매수신청보증금(최저매각대금의 10%, 재매각일 경우 법원마다 달라 확인요구 보통 20 ~ 30%)
              </span>
              {detailList.map((item, index) => (
                <div key={index} className="flex flex-col gap-[10px] w-[100%] justify-start">
                  <span className="md:text-[14pt] text-[11pt] font-NanumGothic font-semibold text-left">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-[10px] absolute md:top-[700px] justify-center items-center top-[600px] w-[100%]">
          <button
            type="button"
            className="flex w-[100px] h-[36px] md:w-[10%] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              setStateNum(14)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex w-[230px] h-[37px] md:w-[30%] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              setStateNum(0)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              닫기
            </span>
          </button>
        </div>
      </div>
    </>
  )
}