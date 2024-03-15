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
      //  개인 입찰자 1인
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: ['신분증', '도장'],
        bottomBox: ['매수신청 보증금']
      }))
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn[0] === 'C') {
      // 법인 입찰자 1인
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: ['대표이사 신분증', '대표이사 도장'],
        bottomBox: ['매수신청 보증금', '법인등기부',]
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && !biddingInfo.bidCorpYn.includes('C')) {
      //  2인 이상 공동입찰자
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: ['신분증', '도장'],
        bottomBox: ['매수신청 보증금', '불참자의 인감이 날인된 위임장', '불참자 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && !biddingInfo.bidCorpYn.includes('I')) {
      // 2인 이상 법인 공동입찰자
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: ['대표이사 신분증', '대표이사 도장'],
        bottomBox: ['매수신청 보증금', '법인등기부', '불참법인의 인감이 날인된 위임장', '불참법인 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '' && (biddingInfo.bidCorpYn.includes('I') && biddingInfo.bidCorpYn.includes('C'))) {
      //  2인 이상 개인, 법인 공동입찰자
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.bidName.map((item: string) => item),
        middleBox: [ '신분증', '도장', '대표이사 신분증', '대표이사 도장'],
        bottomBox: ['매수신청 보증금', '법인등기부', '불참자의 인감이 날인된 위임장', '불참법인의 인감이 날인된 위임장', '불참법인 등기부', '불참자 인감증명서', '불참법인 인감증명서']
      }))
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn[0] === 'I') {
      //  대리인 + 개인입찰자 1인
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: [ '대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '본인의 인감이 날인된 위임장', '본인의 인감증명서']
      }))
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '' && biddingInfo.bidCorpYn[0] === 'C') {
      //  대리인 + 법인입찰자 1인
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: ['대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '법인의 인감이 날인된 위임장', '법인 등기부', '법인의 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && !biddingInfo.bidCorpYn.includes('C')) {
      //  대리인 + 2인 이상 공동입찰자(개인)
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: ['대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '본인의 인감이 날인된 위임장', '본인의 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && !biddingInfo.bidCorpYn.includes('I')) {
      //  대리인 + 2인 이상 공동입찰자(법인)
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: ['대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '법인의 인감이 날인된 위임장', '법인 등기부', '법인의 인감증명서']
      }))
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '' && (biddingInfo.bidCorpYn.includes('I') && biddingInfo.bidCorpYn.includes('C'))) {
      //  대리인 + 2인 이상 공동입찰자(개인, 법인)
      setList((prev: any) => ({
        ...prev,
        topBox: biddingInfo.agentName,
        middleBox: ['대리인 도장', '대리인 신분증'],
        bottomBox: ['매수신청 보증금', '본인의 인감이 날인된 위임장', '법인 등기부', '법인의 인감이 날인된 위임장', '본인의 인감증명서', '법인의 인감증명서']
      }))
    }
  }

  const ipchalName = () => {
    if (biddingInfo.bidName.length === 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn[0] === 'I') {
      return "본인 " + biddingInfo.bidName[0] + '(개인)'
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName === '' && biddingInfo.bidCorpYn[0] === 'C') {
      return "본인 " + biddingInfo.bidName[0] + '(법인)'
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName === '') {
      return "본인 " + biddingInfo.bidName[0] + ' 외 ' + (biddingInfo.bidName.length - 1) + '인'
    } else if (biddingInfo.bidName.length === 1 && biddingInfo.agentName !== '') {
      return "대리인 " + biddingInfo.agentName + "(본인 " + biddingInfo.bidName[0] + ")"
    } else if (biddingInfo.bidName.length > 1 && biddingInfo.agentName !== '') {
      return "대리인 " + biddingInfo.agentName + "(본인 " + biddingInfo.bidName[0] + " 외 " + (biddingInfo.bidName.length - 1) + "인)"
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
          <div className="flex flex-col md:gap-[14px] gap-[5px] w-[100%] h-[100%] bg-mybg items-center text-center relative pt-[50px]">
            <span className="md:text-[32.5px] text-[20px] font-bold leading-[135%] tracking-[-1%] font-['suit'] not-italic">
              입찰 시 준비서류를 알려드릴게요
            </span>
            <span className="md:text-[18px] text-[16px] text-sutTitle font-medium font-['suit'] leading-[135%] tracking-[-1%] not-italic">
              지지옥션이 성공적인 낙찰을 응원합니다
            </span>
            <div className="flex flex-col md:w-[550px] w-[90%] h-[500px] rounded-lg items-center mt-[20px]">
              <div className="flex flex-col bg-mySelect w-[100%] h-[80px] mx-auto rounded-md justify-start items-start p-[20px] border border-black">
                <span className="md:text-[17px] text-[15px] font-['suit'] font-medium leading-[130%] tracking-[0px] text-left" style={{
                  color: "#545492"
                }}>
                  입찰자
                </span>
                <span className="md:text-[20px] leading-[135%] tracking-[-1%] text-[16px] font-['suit'] text-black font-normal text-left">
                  {
                    ipchalName()
                  }
                </span>
              </div>
              <div className="flex flex-col w-[100%] min-h-[75px] max-h-[100px] mt-[15px] bg-white rounded-lg overflow-y-auto p-[20px]">
                <span className="md:text-[17px] text-[15px] font-['suit'] font-medium leading-[130%] tracking-[0px] text-left" style={{
                  color: "#545492"
                }}>
                  기본 (대리인의 경우 대리인의)
                </span>
                <span className="md:text-[20px] leading-[135%] tracking-[-1%] text-[16px] font-['suit'] text-black font-normal text-left">
                  {list.middleBox.length > 1 ? list.middleBox.join(', ') : list.middleBox}
                </span>
              </div>
              <div className="flex flex-col w-[100%] min-h-[100px] max-h-[250px] mt-[15px] bg-white rounded-lg p-[20px] overflow-y-auto gap-[10px]">
                <span className="md:text-[17px] text-[15px] font-['suit'] font-medium leading-[130%] tracking-[0px] text-left" style={{
                  color: "#545492"
                }}>
                  준비서류
                </span>
                <div className="flex flex-col w-[100%]">
                  {list.bottomBox.map((item: string, index: number) => (
                    <>
                      <li key={index} style={{
                        listStyle: 'none',
                        justifyContent: 'space-between',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'start'
                      }}>
                        <span className="md:text-[20px] leading-[135%] tracking-[-1%] text-[16px] font-['suit'] text-black font-normal text-left">
                          {item}
                        </span>
                        <span className="md:text-[20px] leading-[135%] tracking-[-1%] text-[16px] font-['suit'] text-black font-normal text-left">
                          {index === 0 ? biddingInfo.depositPrice.toLocaleString('ko-KR') + '원' : '1부'}
                        </span>
                      </li>
                    </>
                  )) 
                  }
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