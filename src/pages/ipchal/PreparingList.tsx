import { biddingInfoState, stepState } from "@/atom"
import Button from "@/components/shared/Button"
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
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn[0] === 'C') {
      setMsg('법인이 직접 입찰하셨습니다.')
      setDetailList(['- 법인등기부', '- 대표이사 신분증', '- 대표이사 도장'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && !biddingInfo.bidCorpYn.includes('C')) {
      setMsg(`${biddingInfo.bidderNum} 명이 직접 공동입찰하셨습니다.`)
      setDetailList(['- 신분증', '- 도장', '- 불참자 인감증명서', '- 불참자의 인감이 날인된 위임장', '- 공동입찰신고서', '- 공동입찰자 목록'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && !biddingInfo.bidCorpYn.includes('I')) {
      setMsg(`${biddingInfo.bidderNum} 명의 법인이 직접 공동입찰하셨습니다.`)
      setDetailList(['- 법인등기부', '- 대표이사 신분증', '- 대표이사 도장', '- 불참법인 인감증명서', '- 불참법인의 인감이 날인된 위임장', '- 공동입찰신고서', '- 공동입찰자 목록'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && (biddingInfo.bidCorpYn.includes('I') && biddingInfo.bidCorpYn.includes('C'))) {
      setMsg(`${biddingInfo.bidderNum} 명이 직접 입찰하셨습니다.`)
      setDetailList(['- 신분증', '- 도장', '- 법인등기부', '- 대표이사 신분증', '- 대표이사 도장', '- 불참자 인감증명서', '- 불참자의 인감이 날인된 위임장', '- 공동입찰신고서', '- 공동입찰자 목록', '- 불참법인 인감증명서', '- 불참법인의 인감이 날인된 위임장', '- 불참법인 등기부'])
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn[0] === 'I') {
      setMsg(`${biddingInfo.agentName}님이 대리 입찰하셨습니다.`)
      setDetailList(['- 본인의 인감증명서', '- 본인의 인감이 날인된 위임장', '- 대리인 도장', '- 대리인 신분증'])
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn[0] === 'C') {
      setMsg(`${biddingInfo.agentName}님이 법인 대리입찰하셨습니다.`)
      setDetailList(['- 법인 등기부', '- 법인의 인감증명서', '- 법인의 인감이 날인된 위임장', '- 대리인 도장', '- 대리인 신분증'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && !biddingInfo.bidCorpYn.includes('C')) {
      setMsg(`${biddingInfo.agentName}님이 ${biddingInfo.bidderNum} 명의 대리 공동입찰하셨습니다.`)
      setDetailList(['- 본인의 인감증명서', '- 본인의 인감이 날인된 위임장', '- 대리인 도장', '- 대리인 신분증', '- 공동입찰신고서', '- 공동입찰자 목록'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && !biddingInfo.bidCorpYn.includes('I')) {
      setMsg(`${biddingInfo.agentName}님이 ${biddingInfo.bidderNum} 명의 법인 대리입찰하셨습니다.`)
      setDetailList(['- 법인 등기부', '- 법인의 인감증명서', '- 법인의 인감이 날인된 위임장', '- 대리인 도장', '- 대리인 신분증', '- 공동입찰신고서', '- 공동입찰자 목록'])
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && (biddingInfo.bidCorpYn.includes('I') && biddingInfo.bidCorpYn.includes('C'))) {
      setMsg(`${biddingInfo.agentName}님이 법인을 포함한 ${biddingInfo.bidderNum} 명의 대리 공동입찰하셨습니다.`)
      setDetailList(['- 본인의 인감증명서', '- 본인의 인감이 날인된 위임장', '- 대리인 도장', '- 대리인 신분증', '- 법인 등기부', '- 법인의 인감증명서', '- 법인의 인감이 날인된 위임장', '- 공동입찰신고서', '- 공동입찰자 목록'])
    }
  }

  useEffect(() => {
    handlePreparingMsg()
  }, [])

  const handleHeight = () => {
    let height = window.innerHeight;
    if (document && document.getElementById('box')) {
      const boxElement = document.getElementById('box');
      if (boxElement) {
        boxElement.style.height = height + 'px';
      }
    }
  }

  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])

  return (
    <>
      <div id="box" className="flex flex-col justify-center w-[100%] bg-white items-center text-center relative">
        <div className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-mybg relative">
          <div className="flex flex-col gap-[25px] w-[100%] h-[100%] bg-mybg items-center text-center relative pt-[50px]">
            <span className="md:text-[1.7rem] text-[1.4rem] font-NanumGothic font-bold">
              입찰시 준비를 알려드릴게요
            </span>
            <span className="md:text-[1rem] text-[0.8rem] text-subTitle font-normal font-['suit'] not-italic leading-8">
              지지옥션이 성공적인 낙찰을 응원합니다
            </span>
            <div className="flex flex-col md:w-[550px] w-[100%] h-[500px] rounded-lg items-center">
              <div className="flex bg-gray-200 w-[100%] h-[10%] mx-auto rounded-xl justify-center items-center text-center">
                <span className="text-[1rem] font-NanumGothic text-mygold font-bold text-center">
                  {msg}
                </span>
              </div>
              <div className="flex flex-col border-gray border-[1px] w-[100%] max-h-[70%] mt-[15px] bg-white rounded-xl gap-[10px] p-[15px] overflow-auto">
                <span className="text-[1rem] font-NanumGothic font-semibold text-left">
                  - 매수신청보증금(최저매각대금의 10%, 재매각일 경우 법원마다 달라 확인요구 보통 20 ~ 30%)
                </span>
                {detailList.map((item, index) => (
                  <div key={index} className="flex flex-col gap-[10px] w-[100%] justify-start">
                    <span className="text-[1rem] font-NanumGothic font-semibold text-left">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button 
          nextText="종료하기"
          handleNextStep={() => {
            window && window.close()
          }}
          handlePrevStep={() => {
            setStateNum(stateNum - 1)
          }}
        />
      </div>
    </>
  )
}