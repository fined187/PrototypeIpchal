import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import axios from 'axios'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function BiddingPayment() {
  const [isWaySelected, setIsWaySelected] = useState<boolean>(false)
  const setStateNum = useSetRecoilState(stepState)
  const stateNum = useRecoilValue(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)
  const setBiddingForm = useSetRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)

  const handleBiddingPayment = async (pay: string) => {
    setLoading(true)
    try {
      const response = await axios.put(
        `http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/payments`,
        {
          bidPrice: biddingForm.biddingPrice,
          bidDeposit: biddingForm.depositPrice,
          depositType: pay,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false)
          setStateNum(stateNum + 1)
        }, 1000)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative">
      {loading && (
        <Spinner />
      )}
      <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center">
        <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
          보증금 제공 방법을 선택해주세요
        </span>
      </div>
      <div className="flex flex-col gap-10 md:w-[550px] w-[90%] min-h-[257px] max-h-[600px] h-[300px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
        <div
          className={`flex flex-row w-[140px] h-[40px] rounded-md border-2 ${
            isWaySelected ? 'border-red-600' : 'border-myyellow'
          } justify-center items-center cursor-pointer ${
            biddingForm.bidWay === 'M' ? 'bg-myyellow' : 'bg-white'
          } relative`}
          onClick={async () => {
            setBiddingForm({
              ...biddingForm,
              bidWay: 'M',
            })
            await handleBiddingPayment('M')
          }}
        >
          <div className={`${biddingForm.bidWay === 'M' ? 'flex' : 'hidden'}`}>
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
            className={`flex text-[15px] not-italic font-extrabold leading-[13px] tracking-[-0.39px] ${
              biddingForm.bidWay === 'M' ? 'text-white' : 'text-myyellow'
            }`}
          >
            현금/자기앞수표
          </span>
        </div>
        <div
          className={`flex flex-row w-[140px] h-[40px] rounded-md border-2 ${
            isWaySelected ? 'border-red-600' : 'border-myyellow'
          } justify-center items-center cursor-pointer ${
            biddingForm.bidWay === 'W' ? 'bg-myyellow' : 'bg-white'
          } relative`}
          onClick={async () => {
            setBiddingForm({
              ...biddingForm,
              bidWay: 'W',
            })
            await handleBiddingPayment('W')
          }}
        >
          <div className={`${biddingForm.bidWay === 'W' ? 'flex' : 'hidden'}`}>
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
            className={`flex text-[15px] not-italic font-extrabold leading-[13px] tracking-[-0.39px] ${
              biddingForm.bidWay === 'W'
                ? 'text-white'
                : 'text-myyellow'
            }`}
          >
            보증서
          </span>
        </div>
        {isWaySelected && (
          <div className="flex">
            <span className="text-[12px] font-bold text-myRed font-nanum leading-[-0.3px] ">
              버튼을 선택해주세요.
            </span>
          </div>
        )}
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
          onClick={async () => {
            await handleBiddingPayment(biddingForm.bidWay)
          }}
        >
          <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
            {stateNum <= 3 ? '확인' : stateNum === 10 ? '확인했습니다' : '다음'}
          </span>
        </button>
      </div>
    </div>
  )
}
