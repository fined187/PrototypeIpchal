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
          <div className="flex flex-col gap-[10px] pt-[50px]">
            <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-['suit'] not-italic">
              상세 내역을 확인해주세요
            </span>
            <span className="md:text-[1rem] text-[0.8rem] font-normal font-['suit'] not-italic text-sutTitle">
              선택한 경매 사건이 맞는지 체크합니다
            </span>
          </div>
          <div className={`flex flex-col md:w-[500px] h-[350px] w-[90%] overflow-y-auto gap-[5px] bg-mybg mt-[30px]`}>
            <div className="flex flex-col relative h-[100px] items-start justify-start bg-white pt-[10px] pl-[25px] pb-[10px]">
              <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] tracking-[-0.45px] font-bold">
                법원
              </span>
              <span className="text-black md:text-[1rem] text-[0.8rem] font-bold font-['suit']">
                {biddingInfo.courtFullName}
              </span>
            </div>
            <div className='flex justify-between bg-white pt-[10px] pl-[25px] h-[100px] pb-[10px]'>
              <div className="flex flex-col relative justify-start items-start w-[80%]">
                <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                  사건번호
                </span>
                <span className="text-black md:text-[1rem] text-[0.8rem] font-bold">
                  {biddingInfo.sagunNum + '호' + ' ' + biddingInfo.usage}
                </span>
              </div>
              <div className="flex flex-col relative justify-start items-start w-[20%]">
                <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                  물건번호
                </span>
                <span className="text-black md:text-[1rem] text-[0.8rem] font-bold">
                  {biddingInfo.mulNo}
                </span>
              </div>
            </div>
            <div className='flex justify-between bg-white pt-[10px] pl-[25px] h-[100px] pb-[10px]'>
              <div className="flex flex-col relative justify-start items-start w-[80%]">
                <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                  입찰기일
                </span>
                <span className="text-black md:text-[1rem] text-[0.8rem] font-bold">
                  {biddingInfo.ipchalDate}
                </span>
              </div>
              <div className="flex flex-col relative justify-center items-start w-[20%]">
                <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                  {" "}
                </span>
                <span className="text-black md:text-[1rem] text-[0.8rem] font-bold">
                  {data.dayDay}
                </span>
              </div>
            </div>
            {biddingInfo.usage === ('차량' || '중기') ? (
              <div className="flex flex-col relative h-[100px] items-start justify-start bg-white pt-[10px] pl-[25px] pb-[10px]">
                <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                  차량정보
                </span>
                <span className="text-black md:text-[1rem] text-[0.8rem] font-bold">
                  {data.carInfo}
                </span>
              </div>
            ) : (
              null
            )}
            <div className="flex flex-col relative items-start justify-center bg-white pt-[10px] pb-[10px] pl-[25px]">
              <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                물건지 주소
              </span>
              <span className="text-black md:text-[1rem] text-[0.8rem] font-bold text-left">
                {biddingInfo.sagunAddr + (biddingInfo.etcAddress !== '' ? '[일괄]' + biddingInfo.etcAddress : '')}
              </span>
              <span className="text-myBlue md:text-[1rem] text-[0.8rem] font-bold text-left">
                {biddingInfo.roadAddress}
              </span>
            </div>
          </div>
        </div>
        <Button nextText='확인' handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
      </div>
    </>
  )
}
