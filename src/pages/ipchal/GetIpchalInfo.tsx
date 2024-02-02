import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function GetIpchalInfo() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

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
          `http://118.217.180.254:8081/ggi/api/bid-form/inits`,
          {
            userId: router.query.userId ?? '',
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
  
  return (
    <>
      <div className="flex w-[100%] h-screen justify-center bg-white relative">
        {loading && (
          <Spinner />
        )}
        <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center md:py-[0px] py-[50px]">
          <div className="flex">
            <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-NanumGothic not-italic leading-8">
              사건 번호와 입찰일자를 확인해주세요
            </span>
          </div>
          <div className="flex flex-col md:w-[550px] w-[90%] md:h-[400px] h-[450px] gap-[100px] bg-white absolute top-[120px] justify-center items-center rounded-lg">
            <div className="flex flex-between absolute top-8 border-b w-[80%] border-gray-200">
              <div className='flex md:w-[30%] w-[30%] justify-start'>
                <span className="text-black md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold mb-3 font-NanumGothic leading-9">
                  법원 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {" : "}
                </span>
              </div>
              <div className='flex md:w-[70%] w-[70%] justify-start'>
                <span className="text-mygray md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-NanumGothic leading-9">
                  {biddingInfo.courtFullName}
                </span>
              </div>
            </div>
            <div className="flex flex-between absolute top-24 border-b w-[80%] border-gray-200">
              <div className='flex md:w-[30%] w-[30%] justify-start'>
                <span className="text-black md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold mb-3 font-NanumGothic leading-9">
                  사건번호 {" : "}
                </span>
              </div>
              <div className='flex md:w-[70%] w-[70%] justify-start'>
                <span className="text-mygray md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-NanumGothic leading-9">
                  {biddingInfo.sagunNum + '호' + ' ' + biddingInfo.usage}
                </span>
              </div>
            </div>
            <div className="flex flex-between absolute top-40 border-b w-[80%] border-gray-200">
              <div className='flex md:w-[30%] w-[30%] justify-start'>
                <span className="text-black md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold mb-3 font-NanumGothic leading-9">
                  물건번호 {" : "}
                </span>
              </div>
              <div className='flex md:w-[70%] w-[70%] justify-start'>
                <span className="text-mygray md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-NanumGothic leading-9">
                  {biddingInfo.mulNo}
                </span>
              </div>
            </div>
            <div className="flex flex-row absolute top-56 border-b w-[80%] border-gray-200">
              <div className='flex md:w-[30%] w-[30%] justify-start'>
                <span className="text-black md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold mb-3 font-NanumGothic leading-9">
                  입찰기일 {" : "}
                </span>
              </div>
              <div className='flex md:w-[70%] w-[70%] justify-start'>
                <span className="text-mygray md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-NanumGothic leading-9">
                  {biddingInfo.ipchalDate}
                </span>
              </div>
            </div>
            <div className="flex flex-row absolute top-72 w-[80%] ">
              <div className='flex md:w-[30%] w-[30%] justify-start'>
                <span className="text-black md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold mb-3 font-NanumGothic leading-9">
                  주소 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {" : "}
                </span>
              </div>
              <div className='flex flex-col md:w-[70%] w-[70%] justify-start'>
                <span className="text-mygray md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-NanumGothic text-left leading-9 whitespace-normal">
                  {biddingInfo.sagunAddr + biddingInfo.etcAddress}
                </span>
                <span className="text-blue-500 md:text-[15pt] text-[12pt] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-NanumGothic text-left leading-9 whitespace-normal">
                  {biddingInfo.roadAddress}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center md:w-[550px] w-[90%] gap-[10px] absolute top-[600px]">
          <button
            type="button"
            className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => setStateNum(stateNum - 1)}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex w-[60%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={async () => {
              await handleNextStep()
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              {stateNum <= 3 ? '확인' : stateNum === 10 ? '확인했습니다' : '다음'}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
