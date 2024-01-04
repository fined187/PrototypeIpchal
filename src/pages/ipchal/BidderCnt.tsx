import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function BidderCnt() {
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)
  const setBiddingInfo = useSetRecoilState(biddingInfoState)

  const [errorMsg, setErrorMsg] = useState<boolean>(false)

  const handleBiddingNum = (e: HTMLInputElement) => {
    const value = e.value
    setBiddingInfo({
      ...biddingInfo,
      bidderNum: parseInt(value),
    })
  }

  const handleErrorOk = () => {
    if (biddingInfo.bidderNum <= 0 || biddingInfo.bidderNum === undefined || biddingInfo.bidderNum === null || isNaN(biddingInfo.bidderNum)) {
      setErrorMsg(true)
      alert('입찰자는 1명 이상이어야 합니다')
      return
    } else {
      setErrorMsg(false)
    }
  }

  const handleBiddingCnt = async () => {
    try {
      const response = await axios.put(
        `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidder-count`,
        {
          bidderCount: biddingInfo.bidderNum,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.status === 200) {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleBiddingCntChange = async () => {
    let bidderCnt = (document.getElementById('bidderNum') as HTMLInputElement)?.value
    console.log(bidderCnt)
    if (parseInt(bidderCnt) > 0) {
      await handleBiddingCnt()
      setTimeout(() => {
        setStateNum(stateNum + 1)
      }, 1000)
    }
  }

  return (
    <>
      <div className="flex w-[100%] h-screen bg-white justify-center relative">
        <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center">
          <div className="flex">
            <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
              입찰하시는 분이 몇 명 이신가요?
            </span>
          </div>
          <div className="flex flex-col gap-10 md:w-[550px] w-[90%] h-[257px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
            <div className="absolute top-[113px]">
              <div className="flex flex-row justify-center items-center">
                <span className="text-[20px] font-semibold mr-5">
                  입찰자 수
                </span>
                <input
                  id='bidderNum'
                  className="w-[100px] h-[40px] border-2 border-myyellow text-center focus:outline-none"
                  type="text"
                  value={biddingInfo.bidderNum > 0 ? biddingInfo.bidderNum : ''}
                  onChange={(e) => {
                    handleBiddingNum(e.target)
                    handleBiddingCntChange()
                  }}
                />
                <span className="text-[20px] font-bold font-NanumGothic leading-[30px] ml-2">
                  명
                </span>
              </div>
              {errorMsg && (
                <div className="mt-5">
                  <span className="text-[12px] font-semibold text-red-500">
                    입찰자는 1명 이상이어야 합니다
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          prevStepNum={biddingInfo.bidder === 'agent' ?  stateNum - 1 : stateNum - 2}
          nextStepNum={stateNum + 1}
          handleBiddingCnt={handleBiddingCnt}
          handleErrorOk={handleErrorOk}
          errorMsg={errorMsg}
        />
      </div>
    </>
  )
}
