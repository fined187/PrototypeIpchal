import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import { IpchalType } from '@/interface/IpchalType'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function BiddingPayment() {
  const [isWaySelected, setIsWaySelected] = useState<boolean>(false)
  const setStateNum = useSetRecoilState(stepState)
  const stateNum = useRecoilValue(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)
  const setBiddingForm = useSetRecoilState(biddingInfoState)

  const handleBiddingPayment = async (pay: string) => {
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
        console.log(response)
        setStateNum(stateNum + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <span className="text-lg font-extrabold font-nanum not-italic leading-8">
          보증금 제공 방법을 선택해주세요
        </span>
      </div>
      <div className="flex flex-col gap-10 w-[360px] h-[257px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
        <div
          className={`flex flex-row w-[120px] h-[30px] rounded-md border ${
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
            className={`flex text-[13px] not-italic font-extrabold leading-[13px] tracking-[-0.39px] ${
              biddingForm.bidWay === 'M' ? 'text-white' : 'text-myyellow'
            }`}
          >
            현금/자기앞수표
          </span>
        </div>
        <div
          className={`flex flex-row w-[120px] h-[30px] rounded-md border ${
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
            className={`flex text-[13px] not-italic font-extrabold leading-[13px] tracking-[-0.39px] ${
              biddingForm.bidWay === 'paper'
                ? 'text-white ml-1'
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
      <Button
        prevStepNum={stateNum - 1}
        nextStepNum={stateNum + 1}
        setIsWaySelected={setIsWaySelected}
        handleBiddingPayment={handleBiddingPayment}
      />
    </div>
  )
}
