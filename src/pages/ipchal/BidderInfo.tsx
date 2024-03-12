import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import Button from '@/components/shared/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function BidderInfo() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [isSelected, setIsSelected] = useState<boolean>(true)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)

  const handleDeleteAgent = async () => {
    setLoading(true)
    try {
      const response = await axios.delete(`https://dev-api.ggi.co.kr:8443/ggi/api/bid-form/${biddingInfo.mstSeq}/agents`)
      if (response.status === 200) {
        setBiddingInfo({
          ...biddingInfo,
          bidder: 'self',
          agentYn: 'N',
          agentName: '',
          agentPhone: '',
          agentAddr: '',
          agentIdNum: '',
          agentIdNum1: '',
          agentIdNum2: '',
          agentJob: '',
          agentPhone1: '',
          agentPhone2: '',
          agentPhone3: '',
          agentRel: '',
          agentAddrDetail: '',
        })
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleNextStep = async () => {
    setLoading(true)
    if (biddingInfo.bidder === 'self') {
      setStateNum(stateNum + 2)
    } else if (biddingInfo.agentName === '' && biddingInfo.bidder === 'agent') {
      setStateNum(stateNum + 1)
    } else if (biddingInfo.agentName !== '' && biddingInfo.bidder === 'agent') {
      setStateNum(16)
    } else if (biddingInfo.bidder === '') {
      setLoading(false)
      setIsSelected(false)
    }
  }
  
  const handlePrevStep = () => {
    if (biddingInfo.biddingInfos.length > 1) {
      setStateNum(stateNum - 1)
    } else {
      setStateNum(stateNum - 2)
    }
  }

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
      <div id='box' className="flex w-[100%] bg-white justify-center relative">
        <div className="flex flex-col w-[100%] h-[100%] bg-mybg items-center text-center md:py-[0px] py-[25px]">
          {loading && (
            <Spinner />
          )}
          <div className="flex flex-col pt-[50px] gap-[14px]">
            <span className="md:text-[32.5px] text-[1.4rem] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic">
              입찰하는 본인이 맞으신가요?
            </span>
            <span className="md:text-[18px] text-[0.8rem] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
              본인이 아닌 경우 대리인을 선택해주세요
            </span>
          </div>
          <div className="flex flex-row md:w-[450px] w-[90%] h-[212.5px] mt-[100px] md:gap-[20px] gap-[22.5px]">
            <div
              className={`flex flex-row md:w-[212.5px] w-[180px] h-[100%] rounded-xl ${
                isSelected ? '' : 'border-red-600 border-[2px]'
              } justify-center items-center cursor-pointer ${
                biddingInfo.bidder === 'self' ? 'bg-mySelect' : 'bg-white'
              } relative`}
              onClick={() => {
                handleDeleteAgent()
                setTimeout(() => { 
                  setStateNum(stateNum + 2)
                  setIsSelected(false)
                }, 1000)
              }}
            >
              <div className={`flex flex-col w-[100%] justify-center items-center border rounded-xl h-[100%]`}>
                <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 45.8333C59.2048 45.8333 66.6667 38.3714 66.6667 29.1667C66.6667 19.9619 59.2048 12.5 50 12.5C40.7953 12.5 33.3334 19.9619 33.3334 29.1667C33.3334 38.3714 40.7953 45.8333 50 45.8333Z" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.6666 87.5V70.8333C16.6666 66.2308 20.3976 62.5 25 62.5H75C79.6025 62.5 83.3333 66.2308 83.3333 70.8333V87.5" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className='flex flex-col gap-[15px] justify-center items-center'>
                  <span
                    className={`flex text-[22.5px] text-black not-italic font-semibold font-['suit'] leading-[135%] tracking-[-1%]`}
                  >
                    본인(입찰자)
                  </span>
                  <span className={`flex md:text-[17px] text-[0.8rem] text-sutTitle not-italic font-normal font-['suit'] leading-[130%] tracking-[-1%]`}>
                    개인 또는 법인
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-row md:w-[212.5px] w-[180px] h-[100%] rounded-xl ${
                isSelected ? '' : 'border-red-600 border-[2px]'
              } justify-center items-center cursor-pointer ${
                biddingInfo.bidder === 'agent' ? 'bg-mySelect' : 'bg-white'
              } relative`}
              onClick={() => {
                setLoading(true)
                setBiddingInfo({
                  ...biddingInfo,
                  bidder: 'agent',
                  agentYn: 'Y',
                })
                setTimeout(() => {
                  setStateNum(stateNum + 1)
                  setIsSelected(false)
                }, 1000)
              }}
            >
              <div className={`flex flex-col w-[100%] justify-center items-center border rounded-xl h-[100%]`}>
                <div className='flex flex-row w-[100%] justify-center items-center'>
                  <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 45.8333C59.2048 45.8333 66.6667 38.3714 66.6667 29.1667C66.6667 19.9619 59.2048 12.5 50 12.5C40.7953 12.5 33.3334 19.9619 33.3334 29.1667C33.3334 38.3714 40.7953 45.8333 50 45.8333Z" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.6666 87.5V70.8333C16.6666 66.2308 20.3976 62.5 25 62.5H75C79.6025 62.5 83.3333 66.2308 83.3333 70.8333V87.5" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="10" height="10" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 9.75H17.5" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round"/>
                      <path d="M9.75 17.5L9.75 2" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <span
                    className={`flex text-[22.5px] text-black not-italic font-semibold font-['suit'] leading-[135%] tracking-[-1%]`}
                  >
                    대리인
                  </span>
                  <div className='flex flex-col justify-center items-center'>
                    <span className={`flex md:text-[17px] text-[0.8rem] text-sutTitle not-italic font-normal font-['suit'] leading-[130%] tracking-[-1%]`}>
                      개인의 대리인 또는
                    </span>
                    <span className={`flex md:text-[17px] text-[0.8rem] text-sutTitle not-italic font-normal font-['suit'] leading-[130%] tracking-[-1%]`}>
                      법인대리인, 공동입찰대리인
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${isSelected ? 'hidden' : 'flex'} mt-[50px]`}>
            <span className="text-[1rem] font-bold text-myRed font-['suit']">
              본인 / 대리인 버튼을 선택해주세요.
            </span>
          </div>
        </div>
        <Button 
          nextText='다음으로'
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      </div>
    </>
  )
}
