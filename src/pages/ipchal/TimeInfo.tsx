import { biddingInfoState, stepState } from "@/atom"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

export default function TimeInfo() {
  const biddingInfo = useRecoilValue(biddingInfoState)
  const setBiddingInfo = useSetRecoilState(biddingInfoState)
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const [errorMsg, setErrorMsg] = useState<boolean>(false)
  const [timeClicked, setTimeClicked] = useState('')

  const handleConfirm = async (time: string) => {
    try {
      const response = await axios.post(
        `http://118.217.180.254:8081/ggi/api/bid-form/inits`,
        {
          userId: 'best',
          infoId: biddingInfo.infoId,
          caseNo: biddingInfo.caseNo,
          mulSeq: biddingInfo.mulgunNum,
          biddingDate: biddingInfo.ipchalDate,
          biddingTime: time,
        },
      )
      if (response.status === 200) {
        setBiddingInfo({
          ...biddingInfo,
          mstSeq: response.data.data.mstSeq,
          state: response.data.data.state,
          selectedTime: time,
        })
        setTimeout(() => {
          setStateNum(stateNum + 1)
        }, 1500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextStep = (time: string) => {
    if (time === '') {
      setErrorMsg(true)
      return
    } else {
      handleConfirm(time)
    }
  }

  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative">
      <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center">
        <div className="flex">
          <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
            입찰일에 두 번의 경매가 진행됩니다
            <br />
            원하시는 경매를 선택하세요
          </span>
        </div>
        <div className="flex flex-col gap-10 md:w-[550px] w-[90%] h-[60%] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
          <div className={`flex flex-col justify-center items-center border-4 ${errorMsg ? 'border-red-500' : 'border-mygold'} ${biddingInfo.selectedTime === "1000" ? 'bg-mygold' : 'bg-white'} w-[300px] h-[150px] cursor-pointer`} 
            onClick={() => {
            setTimeClicked('1000')
            handleConfirm('1000')
          }}>
            <span className={`font-NanumGothic text-[20px] font-bold ${biddingInfo.selectedTime === '1000' ? 'text-white' : 'text-mygold'}`}>
              {'시간 : ' + (biddingInfo.biddingInfos.length > 1) && biddingInfo.biddingInfos[0]?.biddingTime.substring(0, 2) + '시'}
            </span>
            <span className={`font-NanumGothic text-[20px] font-bold ${biddingInfo.selectedTime === '1000' ? 'text-white' : 'text-mygold'}`}>
              {'최저가 : ' + (biddingInfo.biddingInfos.length > 1) && biddingInfo.biddingInfos[0]?.minimumAmount.toLocaleString('ko-KR') + '원'}
            </span>
          </div>
          <div className={`flex flex-col justify-center items-center border-4 ${errorMsg ? 'border-red-500' : 'border-mygold'} ${biddingInfo.selectedTime === "1400" ? 'bg-mygold' : 'bg-white'} w-[300px] h-[150px] cursor-pointer`} onClick={() => {
            setTimeClicked('1000')
            handleConfirm('1400')
          }}>
            <span className={`font-NanumGothic text-[20px] font-bold ${biddingInfo.selectedTime === '1400' ? 'text-white' : 'text-mygold'}`}>
              {'시간 : ' + (biddingInfo.biddingInfos.length > 1) && biddingInfo.biddingInfos[1]?.biddingTime.substring(0, 2) + '시'}
            </span>
            <span className={`font-NanumGothic text-[20px] font-bold ${biddingInfo.selectedTime === '1400' ? 'text-white' : 'text-mygold'}`}>
              {'최저가 : ' + (biddingInfo.biddingInfos.length > 1) && biddingInfo.biddingInfos[1]?.minimumAmount.toLocaleString('ko-KR') + '원'}
            </span>
          </div>
          {errorMsg && (
            <div className="mt-5">
              <span className="text-[15px] font-bold text-red-500">
                입찰 시간을 선택해주세요
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-center items-center md:w-[550px] w-[90%] gap-[10px] absolute top-[750px]">
          <button
            type="button"
            className="flex w-[40%] h-[40px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex w-[60%] h-[40px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              handleNextStep(biddingInfo.selectedTime)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              다음
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}