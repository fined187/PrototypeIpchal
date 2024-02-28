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
          <div className="flex md:pt-[100px] pt-[50px]">
            <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-NanumGothic not-italic leading-8">
              사건 번호와 입찰일자를 확인해주세요
            </span>
          </div>
          <div className={`flex flex-col md:w-[550px] w-[90%]  bg-white md:mt-[200px] mt-[130px] justify-center items-center rounded-lg absolute overflow-auto`}>
            <div className="flex flex-between relative border-b w-[80%] border-gray-200 h-[50px] mt-4 items-center">
              <div className='flex w-[30%] justify-start items-center'>
                <span className="text-black md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold font-NanumGothic ">
                  법원 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {" : "}
                </span>
              </div>
              <div className='flex md:w-[70%] w-[70%] justify-start items-center'>
                <span className="text-mygray md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold justify-end  font-NanumGothic ">
                  {biddingInfo.courtFullName}
                </span>
              </div>
            </div>
            <div className="flex flex-between  relative border-b w-[80%] border-gray-200 h-[50px] items-center">
              <div className='flex w-[30%] justify-start items-center'>
                <span className="text-black md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold font-NanumGothic ">
                  사건번호 {" : "}
                </span>
              </div>
              <div className='flex w-[70%] justify-start items-center'>
                <span className="text-mygray md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold justify-end font-NanumGothic whitespace-normal text-left">
                  {biddingInfo.sagunNum + '호' + ' ' + biddingInfo.usage}
                </span>
              </div>
            </div>
            <div className="flex flex-between border-b relative w-[80%] border-gray-200 h-[50px] items-center">
              <div className='flex w-[30%] justify-start items-center'>
                <span className="text-black md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold font-NanumGothic">
                  물건번호 {" : "}
                </span>
              </div>
              <div className='flex w-[70%] justify-start items-center'>
                <span className="text-mygray md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold justify-end font-NanumGothic">
                  {biddingInfo.mulNo}
                </span>
              </div>
            </div>
            <div className="flex flex-row border-b relative w-[80%] border-gray-200 h-[50px] items-center">
              <div className='flex w-[30%] justify-start items-center'>
                <span className="text-black md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold font-NanumGothic ">
                  입찰기일 {" : "}
                </span>
              </div>
              <div className='flex w-[70%] justify-start items-center'>
                <span className="text-mygray md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold justify-end  font-NanumGothic ">
                  {biddingInfo.ipchalDate}
                </span>
              </div>
            </div>
            {biddingInfo.usage === ('차량' || '중기') ? (
              <div className="flex flex-row border-b relative w-[80%] border-gray-200 min-h-[75px] items-center pt-4 pb-4">
                <div className='flex w-[30%] justify-start items-center'>
                  <span className="text-black md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold font-NanumGothic ">
                    차량정보 {" : "}
                  </span>
                </div>
                <div className='flex w-[70%] justify-start items-center'>
                  <span className="text-mygray md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold justify-end text-left  font-NanumGothic whitespace-normal">
                    {data.carInfo}
                  </span>
                </div>
              </div>
            ) : (
              null
            )}
            <div className="flex flex-row relative items-center w-[80%] min-h-[60px] pt-4 pb-4">
              <div className='flex w-[30%] justify-start items-center '>
                <span className="text-black md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold font-NanumGothic ">
                  주소 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {" : "}
                </span>
              </div>
              <div className='flex flex-col w-[70%] justify-start items-center'>
                <span className="w-[100%] text-mygray md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold justify-end font-NanumGothic text-left whitespace-normal">
                  {biddingInfo.sagunAddr + (biddingInfo.etcAddress !== '' ? '[일괄]' + biddingInfo.etcAddress : '')}
                </span>
                <span className="w-[100%] text-blue-500 md:text-[1rem] text-[0.8rem] tracking-[-0.45px] font-extrabold justify-end font-NanumGothic text-left whitespace-normal">
                  {biddingInfo.roadAddress}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button nextText='확인' handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
      </div>
    </>
  )
}
