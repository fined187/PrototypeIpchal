import { biddingInfoState, stepState } from '@/atom'
import { Dispatch, SetStateAction } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

interface ButtonProps {
  prevStepNum: number
  nextStepNum: number
  goNext?: boolean
  setIsWaySelected?: Dispatch<SetStateAction<boolean>>
  setIsSelected?: Dispatch<SetStateAction<boolean>>
  handleConfirm?: () => void
  handleBiddingCnt?: () => void
  handleBiddingPrice?: () => void
}

export default function Button({
  prevStepNum,
  nextStepNum,
  setIsWaySelected,
  setIsSelected,
  goNext,
  handleConfirm,
  handleBiddingCnt,
  handleBiddingPrice
}: ButtonProps) {
  const setStateNum = useSetRecoilState(stepState)
  const stateNum = useRecoilValue(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)

  const handleNextStep = async () => {
    if (stateNum === 1 && handleConfirm) {
      await handleConfirm()
    } else if (stateNum === 2 && biddingInfo.bidder === '') {
      setIsSelected && setIsSelected(false)
    } else if (stateNum === 2 && biddingInfo.bidder === 'agent') {
      setStateNum(stateNum + 1)
    } else if (stateNum === 2 && biddingInfo.bidder === 'self') {
      setStateNum(stateNum + 2)
    } else if (stateNum === 3 && biddingInfo.bidder === 'agent') {
      setStateNum(stateNum + 1)
    } else if (stateNum === 4 && biddingInfo.bidder === 'self' && handleBiddingCnt) {
      await handleBiddingCnt()
      setStateNum(stateNum + 1)
    } else if (stateNum === 7 && handleBiddingPrice) {
      handleBiddingPrice()
    } else if (stateNum === 8 && biddingInfo.bidWay === '') {
      setIsWaySelected && setIsWaySelected(true)
    } else {
      setStateNum(stateNum + 1)
    }
  }

  return (
    <>
      <div className="flex flex-row gap-[10px] absolute top-[578px]">
        <button
          type="button"
          className="flex w-[120px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
          onClick={() => setStateNum(prevStepNum)}
        >
          <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
            이전
          </span>
        </button>
        <button
          type="button"
          disabled={goNext}
          className="flex w-[260px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
          onClick={() => {
            handleNextStep()
          }}
        >
          <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
            {stateNum <= 3 ? '확인' : stateNum === 10 ? '확인했습니다' : '다음'}
          </span>
        </button>
      </div>
    </>
  )
}
