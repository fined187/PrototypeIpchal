import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function BidderCnt() {
  const[stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<boolean>(false)

  const handleBiddingCnt = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
      return
    } else {
      try {
        const response = await axios.put(
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidder-count`,
          {
            bidderCount: Number(e.target.value),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (response.status === 200) {
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  const handleBiddingCntNextBtn = async () => {
    try {
      const response = await axios.put(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidder-count`, {
        bidderCount: biddingInfo.bidderNum,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleErrorOk = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    if (e.target.value === '' || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
      setErrorMsg(true)
      setLoading(false)
      return
    } 
    if (biddingInfo.bidName.length > 0 && biddingInfo.bidName[0] !== '') {
      handleBiddingCnt(e)
      setTimeout(() => {
        setLoading(false)
        setStateNum(15)
      }, 1000)
    } else {
      handleBiddingCnt(e)
      setTimeout(() => {
        setLoading(false)
        setStateNum(6)
      }, 1000)
    }
  }

  const handleNextStep = async () => {
    if (biddingInfo.bidderNum > 0 && biddingInfo.bidName.length === 0) {
      setStateNum(stateNum + 1)
      await handleBiddingCntNextBtn()
    } else if (biddingInfo.bidName.length > 0 && biddingInfo.bidName[0] !== '') {
      setStateNum(15)
      await handleBiddingCntNextBtn()
    } else if (biddingInfo.bidderNum === 0 || biddingInfo.bidderNum === undefined) {
      alert('입찰자는 1명 이상이어야 합니다')
    } else {
      setStateNum(stateNum + 1)
    }
  }

  return (
    <>
      <div className="flex w-[100%] md:h-screen h-[90vh] bg-white justify-center relative">
        <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center md:py-[0px] py-[25px]">
          <div className="flex md:pt-[100px] pt-[50px]">
            <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
              입찰하시는 분이 몇 명 이신가요?
            </span>
          </div>
          <div className="flex flex-col gap-10 md:w-[550px] w-[90%] h-[257px] bg-white mt-[50px] justify-center items-center rounded-lg border-slate-500">
            {loading && (
              <Spinner />
            )}
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center">
                <span className="md:text-[1.1rem] text-[1rem] font-semibold mr-5">
                  입찰자 수
                </span>
                <input
                  id='bidderNum'
                  className="w-[100px] h-[40px] border-2 border-myyellow text-center focus:outline-none"
                  type="text"
                  value={biddingInfo.bidderNum > 0 ? biddingInfo.bidderNum : ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setBiddingInfo({
                      ...biddingInfo,
                      bidderNum: Number(e.target.value),
                      bidCorpYn: Array(Number(e.target.value)).fill('I'),
                    })
                    handleErrorOk(e)
                  }}
                />
                <span className="md:text-[1.1rem] text-[1rem] font-bold font-NanumGothic leading-[30px] ml-2">
                  명
                </span>
              </div>
              {errorMsg && (
                <div className="mt-5">
                  <span className="md:text-[0.9rem] text-[0.8rem] font-NanumGothic font-bold text-red-500">
                    입찰자는 1명 이상이어야 합니다
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row fixed items-center md:w-[26%] w-[80%] md:bottom-[80px] bottom-[10px]  gap-[10px] ">
          <button
            type="button"
            className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              biddingInfo.bidder === 'agent' ? setStateNum(16) : setStateNum(3)
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
