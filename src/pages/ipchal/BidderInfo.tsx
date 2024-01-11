import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import axios from 'axios'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function BidderInfo() {
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const [isSelected, setIsSelected] = useState<boolean>(true)
  const biddingInfo = useRecoilValue(biddingInfoState)
  const setBiddingInfo = useSetRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)

  const handleDeleteAgent = async () => {
    setLoading(true)
    try {
      const response = await axios.delete(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/agents`)
      if (response.status === 200) {
        setBiddingInfo({
          ...biddingInfo,
          bidder: 'self',
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

  return (
    <>
      <div className="flex w-[100%] h-screen bg-white justify-center relative">
        {loading && (
          <Spinner />
        )}
        <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center">
          <div className="flex">
            <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-NanumGothic not-italic leading-8">
              입찰하시는 본인이 맞으신가요?
            </span>
          </div>
          <div className="flex flex-col gap-10 md:w-[550px] w-[90%] md:h-[200px] h-[200px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
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
        <div className="flex flex-row justify-center items-center md:w-[550px] w-[90%] gap-[10px] absolute top-[600px]">
          <button
            type="button"
            className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              setStateNum(stateNum - 1)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex w-[60%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              biddingInfo.bidder === 'self' ? setStateNum(stateNum + 2) : biddingInfo.agentName === '' ? setStateNum(stateNum + 1) : setStateNum(16)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              다음
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
