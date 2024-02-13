import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
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
      const response = await axios.delete(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/agents`)
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
        <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center md:py-[0px] py-[25px]">
          {loading && (
            <Spinner />
          )}
          <div className="flex md:pt-[100px] pt-[50px]">
            <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-NanumGothic not-italic leading-8">
              입찰하시는 본인이 맞으신가요?
            </span>
          </div>
          <div className="flex flex-col gap-10 md:w-[550px] w-[90%] md:h-[200px] h-[200px] bg-white justify-center items-center rounded-lg border-slate-500 mt-[60px] ">
            <div
              className={`flex flex-row w-[124px] h-[40px] rounded-sm border ${
                isSelected ? 'border-myyellow border-[2px]' : 'border-red-600 border-[2px]'
              } justify-center items-center cursor-pointer ${
                biddingInfo.bidder === 'self' ? 'bg-myyellow' : 'bg-white'
              } relative`}
              onClick={() => {
                handleDeleteAgent()
                setTimeout(() => {
                  setStateNum(stateNum + 2)
                  setIsSelected(false)
                }, 1000)
              }}
            >
              <div
                className={`${
                  biddingInfo.bidder === 'self'
                    ? 'flex absolute left-[25px]'
                    : 'hidden'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="10"
                  viewBox="0 0 11 10"
                  fill="none"
                >
                  <path
                    d="M1.61523 3.02486L4.15471 7.80153L9.95324 1.46643"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                className={`flex text-[1rem] not-italic font-extrabold font-NanumGothic leading-[13px] tracking-[-0.39px] ${
                  biddingInfo.bidder === 'self' ? 'text-white' : 'text-myyellow'
                }`}
              >
                본인
              </span>
            </div>
            <div
              className={`flex flex-row w-[124px] h-[40px] rounded-sm border ${
                isSelected ? 'border-myyellow border-[2px]' : 'border-red-600 border-[2px]'
              } justify-center items-center cursor-pointer ${
                biddingInfo.bidder === 'agent' ? 'bg-myyellow' : 'bg-white'
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
              <div
                className={`${
                  biddingInfo.bidder === 'agent'
                    ? 'flex absolute left-[20px]'
                    : 'hidden'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="10"
                  viewBox="0 0 11 10"
                  fill="none"
                >
                  <path
                    d="M1.61523 3.02486L4.15471 7.80153L9.95324 1.46643"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                className={`flex text-[1rem] not-italic font-extrabold font-NanumGothic leading-[13px] tracking-[-0.39px] ${
                  biddingInfo.bidder === 'agent'
                    ? 'text-white ml-1'
                    : 'text-myyellow'
                }`}
              >
                대리인
              </span>
            </div>
            <div className={`${isSelected ? 'hidden' : 'flex'}`}>
              <span className="text-[12px] font-bold text-myRed font-NanumGothic leading-[-0.3px] ">
                본인 / 대리인 버튼을 선택해주세요.
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center md:w-[26%] w-[80%] gap-[10px] fixed md:bottom-[80px] bottom-[10px]">
          <button
            type="button"
            className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              biddingInfo.biddingInfos.length > 2 ? setStateNum(stateNum - 1) : setStateNum(stateNum - 2)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic md:text-[1.2rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex w-[60%] md:w-[65%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              handleNextStep()
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic md:text-[1.2rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
              다음
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
