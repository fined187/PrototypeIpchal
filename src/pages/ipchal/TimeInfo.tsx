import { biddingInfoState, stepState } from "@/atom"
import Spinner from "@/components/Spinner"
import Button from "@/components/shared/Button"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { useRecoilState } from "recoil"

export default function TimeInfo() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [errorMsg, setErrorMsg] = useState<boolean>(false)
  const [timeClicked, setTimeClicked] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  console.log(biddingInfo)
  const handleConfirm = async (time: string) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}inits`,
        {
          aesUserId: router.query.aesUserId ?? "",
          infoId: biddingInfo.infoId,
          caseNo: biddingInfo.caseNo,
          mulSeq: biddingInfo.mulSeq,
          biddingDate: biddingInfo.biddingDate,
          biddingTime: time,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
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
          setLoading(false)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleNextStep = (time: string) => {
    if (time === '0') {
      setErrorMsg(true)
      return
    } else {
      handleConfirm(time)
    }
  }

  return (
    <div className="flex w-[100%] md:h-screen h-[95vh] bg-mybg justify-center relative">
      {loading && (
        <Spinner />
      )}
      <div className="flex flex-col md:w-[550px] w-[100%] h-[100%] bg-mybg items-center text-center pt-[50px]">
        <div className="flex flex-col gap-[14px]">
          <span className="md:text-[32.5px] text-[1.4rem] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic" style={{
            color: '#181826'
          }}>
            원하시는 경매를 선택하세요
          </span>
          <span className="md:text-[18px] text-[0.8rem] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
            1기일 2회 입찰 사건입니다
            <br />
            오전 기일에 낙찰이 될 경우 오후 기일은 진행하지 않습니다
          </span>
        </div>
        <div className="flex flex-col gap-[7.5px] md:w-[550px] w-[90%] h-[50%] mt-[50px] justify-start items-center rounded-lg border-slate-500">
          <div className={`flex flex-row gap-[25px] justify-center items-center w-[100%] h-[100px] border border-gray-300 rounded-lg cursor-pointer ${(timeClicked === '1000' ) || (biddingInfo.selectedTime === '1000') ? ' bg-mySelect' : 'bg-white'}`} onClick={() => {
            setTimeClicked('1000')
            handleConfirm('1000')
          }}>
            <div className="flex flex-col justify-center items-start w-[40%] ml-[25px]">
              <span className="font-['suit'] md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%] font-medium text-sutTitle">
                입찰시간
              </span>
              <span className={`font-['suit'] md:text-[20px] text-[1rem] font-normal leading-[135%] tracking-[-1%]`} style={{
                color: '#181826'
              }}>
                {'시간 : ' + (biddingInfo.biddingInfos.length > 1) && biddingInfo.biddingInfos[0]?.biddingTime.substring(0, 2) + '시'}
              </span>
            </div>
            <div className={`flex flex-col justify-center items-start w-[60%]`}>
              <span className="font-['suit'] md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%] font-medium text-sutTitle">
                최저가
              </span>
              <div className="flex flex-row justify-start items-start w-[100%]">
                <span className={`font-['suit'] md:text-[20px] text-[1rem] font-normal leading-[135%] tracking-[-1%]`} style={{
                color: '#181826'
              }}>
                  {(biddingInfo.biddingInfos.length > 1) && biddingInfo.biddingInfos[0]?.minimumAmount.toLocaleString('ko-KR') + '원'}
                </span>
                <span className="font-['suit'] text-[20px] leading-[135%] tracking-[-1%] text-myBlue font-normal">
                  (100%)
                </span>
              </div>
            </div>
          </div>
          <div className={`flex flex-row gap-[25px] justify-center items-center w-[100%] h-[100px] cursor-pointer border border-gray-300 rounded-lg ${(timeClicked === '1400') || (biddingInfo.selectedTime === '1400') ? ' bg-mySelect' : 'bg-white'}`} onClick={() => {
            setTimeClicked('1400')
            handleConfirm('1400')
          }}>
            <div className="flex flex-col justify-center items-start w-[40%] ml-[25px]">
              <span className="font-['suit'] md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%] font-medium text-sutTitle">
                입찰시간
              </span>
              <span className={`font-['suit'] md:text-[20px] text-[1rem] font-normal leading-[135%] tracking-[-1%]`} style={{
                color: '#181826'
              }}>
                {'시간 : ' + (biddingInfo.biddingInfos.length > 1) && biddingInfo.biddingInfos[1]?.biddingTime.substring(0, 2) + '시'}
              </span>
            </div>
            <div className={`flex flex-col justify-center items-start w-[60%] `}>
              <span className="font-['suit'] md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%] font-medium text-sutTitle">
                최저가
              </span>
              <div className="flex flex-row justify-start items-start w-[100%]">
                <span className={`font-['suit'] md:text-[20px] text-[1rem] font-normal leading-[135%] tracking-[-1%]`} style={{
                color: '#181826'
              }}>
                  {(biddingInfo.biddingInfos.length > 1) && biddingInfo.biddingInfos[1]?.minimumAmount.toLocaleString('ko-KR') + '원'}
                </span>
                <span className="font-['suit'] text-[20px] leading-[135%] tracking-[-1%] text-myBlue">
                  {(biddingInfo.biddingInfos.length > 1) && '(' + (biddingInfo.biddingInfos[1]?.minimumAmount / biddingInfo.biddingInfos[0]?.minimumAmount * 100).toFixed(0) + '%)'}
                </span>
              </div>
            </div>
          </div>
          {errorMsg && (
            <div className="mt-5">
              <span className="text-[15px] font-bold text-red-500">
                입찰 시간을 선택해주세요
              </span>
            </div>
          )}
        </div>
        <Button 
          nextText="다음으로"
          handleNextStep={() => handleNextStep(biddingInfo.selectedTime)}
          handlePrevStep={() => {
            setStateNum(stateNum - 1)
          }}
        />
      </div>
    </div>
  )
}