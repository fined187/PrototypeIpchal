import { biddingInfoState, stepState } from '@/atom'
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

interface ButtonProps {
  prevStepNum: number
  nextStepNum?: number
  goNext?: boolean
  setIsWaySelected?: Dispatch<SetStateAction<boolean>>
  setIsSelected?: Dispatch<SetStateAction<boolean>>
  handleConfirm?: () => void
  handleBiddingCnt?: (e: ChangeEvent<HTMLInputElement>) => void
  handleBiddingPrice?: () => void
  handleBiddingPayment?: (pay: string) => void
  handleUploadFile?: () => void
  isFileCreated?: boolean
  handleShare?: () => void
  errorMsg?: boolean
  handleErrorOk?: () => void
}

export default function Button({
  prevStepNum,
  setIsWaySelected,
  setIsSelected,
  goNext,
  handleConfirm,
  handleBiddingCnt,
  handleBiddingPrice,
  handleBiddingPayment,
  handleUploadFile,
  isFileCreated,
  handleShare,
  errorMsg,
  handleErrorOk
}: ButtonProps) {
  const setStateNum = useSetRecoilState(stepState)
  const stateNum = useRecoilValue(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)

  const handleNextStep = async (e: ChangeEvent<HTMLInputElement>) => {
    if (stateNum === 1) {
      biddingInfo.biddingInfos.length > 1 ? setStateNum(stateNum + 1) : setStateNum(stateNum + 2)
    } else if (stateNum === 2 && biddingInfo.bidder === '') {
      setIsSelected && setIsSelected(false)
    } else if (stateNum === 2 && biddingInfo.bidder === 'agent') {
      setStateNum(stateNum + 1)
    } else if (stateNum === 2 && biddingInfo.bidder === 'self') {
      setStateNum(stateNum + 2)
    } else if (stateNum === 3 && biddingInfo.bidder === 'agent') {
      setStateNum(stateNum + 1)
    } else if (
      stateNum === 4 &&
      handleBiddingCnt && handleErrorOk
    ) {
      handleErrorOk()
      await handleBiddingCnt(e)
    } else if (stateNum === 6) {
      handleShare && handleShare()
      setStateNum(stateNum + 1)
    } else if (stateNum === 7 && handleBiddingPrice) {
      handleBiddingPrice()
    } else if (stateNum === 8 && biddingInfo.bidWay === '') {
      setIsWaySelected && setIsWaySelected(true)
      handleBiddingPayment && handleBiddingPayment(biddingInfo.bidWay)
    } else if (stateNum === 12 && isFileCreated) {
      handleUploadFile && handleUploadFile()
      setStateNum(stateNum + 1)
    } else {
      setStateNum(stateNum + 1)
    }
  }

  const handlePrevStep = () => {
    if (stateNum === 11 && isFileCreated) {
      alert('파일이 생성되어 이전 단계로 되돌아갈 수 없습니다.')
    } else {
      setStateNum(prevStepNum)
    }
  }

  return (
    <div className="flex flex-row fixed items-center md:w-[26%] w-[80%] md:bottom-[80px] bottom-[10px] gap-[10px] ">
      <button
        type="button"
        className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
        onClick={handlePrevStep}
      >
        <span className="text-white font-extrabold font-NanumGothic md:text-[1.1rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
          이전
        </span>
      </button>
      <button
        type="button"
        disabled={goNext}
        className="flex w-[60%] md:w-[65%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
        onClick={(e: any) => {
          handleNextStep(e)
        }}
      >
        <span className="text-white font-extrabold font-NanumGothic md:text-[1.1rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
          {stateNum <= 3 ? '확인' : stateNum === 10 ? '확인했습니다' : '다음'}
        </span>
      </button>
    </div>
  )
}
