import { biddingInfoState, stepState } from "@/atom"
import Button from "@/components/shared/Button"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

export default function PreparingList() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)

  const [list, setList] = useState<any>({
    topBox: [''],
    middleBox: [''],
    bottomBox: ['']
  })

  const handlePreparingMsg = () => {
    if (biddingInfo.bidName.length === 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn[0] === 'I') {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
      }))
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn[0] === 'C') {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: ['대표이사 신분증', '대표이사 도장'],
        bottomBox: ['매수신청 보증금', '법인등기부',]
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && !biddingInfo.bidCorpYn.includes('C')) {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: ['신분증', '도장'],
        bottomBox: ['매수신청 보증금', '공동입찰신고서', '공동입찰자 목록', '불참자의 인감이 날인된 위임장', '불참자 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && !biddingInfo.bidCorpYn.includes('I')) {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: ['대표이사 신분증', '대표이사 도장'],
        bottomBox: ['매수신청 보증금', '법인등기부', '공동입찰신고서', '공동입찰자 목록', '불참법인의 인감이 날인된 위임장', '불참법인 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && (biddingInfo.bidCorpYn.includes('I') && biddingInfo.bidCorpYn.includes('C'))) {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: [ '신분증', '도장', '대표이사 신분증', '대표이사 도장'],
        bottomBox: ['매수신청 보증금', '법인등기부', '공동입찰신고서', '공동입찰자 목록', '불참자의 인감이 날인된 위임장', '불참법인의 인감이 날인된 위임장', '불참법인 등기부', '불참자 인감증명서', '불참법인 인감증명서']
      }))
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn[0] === 'I') {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: [ '대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '본인의 인감이 날인된 위임장', '본인의 인감증명서']
      }))
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn[0] === 'C') {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: ['대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '법인의 인감이 날인된 위임장', '법인 등기부', '법인의 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && !biddingInfo.bidCorpYn.includes('C')) {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: ['대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '본인의 인감이 날인된 위임장', '공동입찰신고서', '공동입찰자 목록', '본인의 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && !biddingInfo.bidCorpYn.includes('I')) {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: ['대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '법인의 인감이 날인된 위임장', '법인 등기부', '공동입찰신고서', '공동입찰자 목록', '법인의 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && (biddingInfo.bidCorpYn.includes('I') && biddingInfo.bidCorpYn.includes('C'))) {
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: ['대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '본인의 인감이 날인된 위임장', '법인 등기부', '법인의 인감이 날인된 위임장', '공동입찰신고서', '공동입찰자 목록', '본인의 인감증명서', '법인의 인감증명서']
      }))
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
            <span className="md:text-[1.7rem] text-[1.4rem] font-['suit'] font-bold">
              입찰 시 준비를 알려드릴게요
            </span>
            <span className="md:text-[1rem] text-[0.8rem] text-subTitle font-normal font-['suit'] not-italic leading-8">
              지지옥션이 성공적인 낙찰을 응원합니다
            </span>
            <div className="flex flex-col md:w-[550px] w-[90%] h-[500px] rounded-lg items-center">
              <div className="flex flex-col bg-mySelect w-[100%] h-[80px] mx-auto rounded-md justify-start items-start p-[10px]">
                <span className="md:text-[0.9rem] text-[0.7rem] font-['suit'] text-sutTitle font-bold text-left">
                  입찰자
                </span>
                <span className="md:text-[1rem] text-[0.8rem] font-['suit'] text-sutTitle font-bold text-left">
                  {
                    biddingInfo.agentYn === 'Y' ? biddingInfo.bidderNum > 1 ? list.topBox + (biddingInfo.bidName.length > 1 ? ` (본인 ${biddingInfo.bidName[0]} 외 ` + (biddingInfo.bidderNum - 1) + '인)' : `(본인 ${biddingInfo.bidName[0]})`) : list.topBox + `(본인 ${biddingInfo.bidName[0]})` : list.topBox + `(본인 ${biddingInfo.bidCorpYn[0] === 'I' ? biddingInfo.bidName[0] + `(개인)` : biddingInfo.bidName[0] + `(법인)`})`
                  }
                </span>
              </div>
              <div className="flex flex-col border-gray border-[1px] w-[100%] min-h-[75px] max-h-[100px] mt-[15px] bg-white rounded-lg p-[10px] overflow-y-auto">
                <span className="md:text-[0.9rem] text-[0.7rem] font-['suit'] font-bold text-left text-sutTitle">
                  기본 (대리인의 경우 대리인의)
                </span>
                <span className="md:text-[1rem] text-[0.8rem] font-['suit'] font-bold text-left text-sutTitle">
                  {list.middleBox.length > 1 ? list.middleBox.join(', ') : list.middleBox}
                </span>
              </div>
              <div className="flex flex-col border-gray border-[1px] w-[100%] min-h-[100px] max-h-[250px] mt-[15px] bg-white rounded-lg p-[10px] overflow-y-auto gap-[10px]">
                <span className="md:text-[0.9rem] text-[0.7rem] font-['suit'] font-bold text-left text-sutTitle">
                  준비서류
                </span>
                <div className="flex flex-col w-[100%]">
                  {list.bottomBox.length > 1 ? list.bottomBox.map((item: string, index: number) => (
                    <>
                      <li key={index} style={{
                        listStyle: 'none',
                        justifyContent: 'space-between',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'start'
                      }}>
                        <span className="md:text-[1rem] text-[0.8rem] font-['suit'] font-bold text-left text-sutTitle">
                          {item}
                        </span>
                        <span className="md:text-[1rem] text-[0.8rem] font-['suit'] font-bold text-left text-sutTitle">
                          {index === 0 ? biddingInfo.depositPrice.toLocaleString('ko-KR') + '원' : '1부'}
                        </span>
                      </li>
                    </>
                  )) 
                  : list.bottomBox}
                </div>
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