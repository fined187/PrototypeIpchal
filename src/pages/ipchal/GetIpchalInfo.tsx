import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import Button from '@/components/shared/Button'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function GetIpchalInfo() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, getData] = useState<any>([])
  const router = useRouter()
  const { idcode } = router.query

  const handleConfirm = async () => {
    setLoading(true)
    if (biddingInfo.biddingInfos.length > 1) {
      setTimeout(() => {
        setStateNum(stateNum + 1)
        setLoading(false)
      }, 1000)
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}inits`,
          {
            aesUserId: biddingInfo.aesUserId ?? "",
            infoId: biddingInfo.infoId,
            caseNo: biddingInfo.caseNo,
            mulSeq: biddingInfo.mulSeq,
            biddingDate: biddingInfo.biddingDate,
            biddingTime: biddingInfo.biddingInfos[0].biddingTime,
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
            selectedTime: biddingInfo.biddingInfos[0].biddingTime,
          })
          if (biddingInfo.biddingInfos.length > 1) {
            setTimeout(() => {
              setStateNum(stateNum + 1)
              setLoading(false)
            }, 1000)
          } else {
            setTimeout(() => {
              setStateNum(stateNum + 2)
              setLoading(false)
            }, 1000)
          }
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  const handlePrevStep = () => {
    if (idcode) {
      setStateNum(0)
    } else {
      setStateNum(stateNum - 1)
      setBiddingInfo({
        ...biddingInfo,
        searchResultState: 2,
      })
    }
  }

  const handleNextStep = async () => {
    setLoading(true)
    if (biddingInfo.mstSeq === 0) {
      await handleConfirm()
    } else {
      if (biddingInfo.biddingInfos.length > 1) {
        setTimeout(() => {
          setStateNum(stateNum + 1)
          setLoading(false)
        }, 1000)
      } else {
        setTimeout(() => {
          setStateNum(stateNum + 2)
          setLoading(false)
        }, 1000)
      }
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

  const handleGetCaseCheck = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}cases/checks`,
        {
          infoId: biddingInfo.infoId,
          caseNo: biddingInfo.caseNo,
          mulSeq: biddingInfo.mulSeq,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.status === 200) {
        getData(response.data.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetCaseCheck()
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])

  return (
    <>
      <div id='box' className="flex w-[100%] justify-center bg-white relative">
        {loading && (
          <Spinner />
        )}
        <div className="flex flex-col w-[100%] bg-mybg items-center text-center md:py-[0px] py-[15px] relative">
          <div className="flex flex-col gap-[14px] pt-[50px]">
            <span className="md:text-[32.5px] text-[1.4rem] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic">
              상세 내역을 확인해주세요
            </span>
            <span className="md:text-[18px] text-[0.8rem] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
              선택한 경매 사건이 맞는지 체크합니다
            </span>
          </div>
          <div className={`flex flex-col md:w-[500px] h-[500px] w-[90%] overflow-y-auto gap-[7.5px] bg-mybg mt-[30px]`}>
            <div className="flex flex-col relative h-[80px] items-start justify-start bg-white p-[20px]">
              <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%]">
                법원
              </span>
              <span className="text-black md:text-[20px] text-[0.8rem] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                {biddingInfo.courtFullName}
              </span>
            </div>
            <div className='flex justify-between bg-white p-[20px] h-[80px]'>
              <div className="flex flex-col relative justify-start items-start w-[80%]">
                <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%]">
                  사건번호
                </span>
                <span className="text-black md:text-[20px] text-[0.8rem] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                  {biddingInfo.sagunNum + '호' + ' ' + biddingInfo.usage}
                </span>
              </div>
              <div className="flex flex-col relative justify-start items-start w-[20%]">
                <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%]">
                  물건번호
                </span>
                <span className="text-black md:text-[20px] text-[0.8rem] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                  {biddingInfo.mulNo}
                </span>
              </div>
            </div>
            <div className='flex justify-between bg-white h-[80px] p-[20px]'>
              <div className="flex flex-col relative justify-start items-start w-[80%]">
                <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%]">
                  입찰기일
                </span>
                <span className="text-black md:text-[20px] text-[0.8rem] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                  {biddingInfo.ipchalDate}
                </span>
              </div>
              <div className="flex flex-col relative justify-center items-start w-[20%]">
                <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                  {" "}
                </span>
                <span className="text-black md:text-[20px] text-[0.8rem] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                  {data.dayDay}
                </span>
              </div>
            </div>
            {biddingInfo.usage === ('차량' || '중기') ? (
              <div className="flex flex-col relative h-[80px] items-start justify-start bg-white p-[20px]">
                <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%]">
                  차량정보
                </span>
                <span className="text-black md:text-[20px] text-[0.8rem] font-normal font-['suit'] leading-[135%] tracking-[-1%] text-left" style={{
                color: '#181826',
              }}>
                  {data.carInfo}
                </span>
              </div>
            ) : (
              null
            )}
            <div className="flex flex-col relative items-start justify-center bg-white p-[20px]">
              <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[0.8rem] leading-[130%] tracking-[0%]">
                물건지 주소
              </span>
              <span className="text-black md:text-[20px] text-[0.8rem] font-normal font-['suit'] leading-[135%] tracking-[-1%] text-left" style={{
                color: '#181826',
              }}>
                {biddingInfo.sagunAddr + (biddingInfo.etcAddress !== '' ? '[일괄]' + biddingInfo.etcAddress : '')}
              </span>
              <span className="text-myBlue md:text-[18px] text-[0.8rem] text-left font-normal leading-[135%] tracking-[-1%] ">
                {biddingInfo.roadAddress}
              </span>
            </div>
          </div>
        </div>
        <Button nextText='다음으로' handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
      </div>
    </>
  )
}
