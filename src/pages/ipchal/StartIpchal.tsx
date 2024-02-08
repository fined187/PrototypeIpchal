'use client'
import { biddingInfoState, stepState } from '@/atom'
import axios from 'axios'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { calc } from '@chakra-ui/react'

export default function StartIpchal() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  let { idcode } = router.query
  let { startdate } = router.query

  const handleCheck = async () => {
    setLoading(true)
    try {
        const response = await axios.post(
          `http://118.217.180.254:8081/ggi/api/bid-form/checks`,
          {
            idCode: idcode,
            biddingDate: startdate,
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
            caseNo: response.data.data.caseNo,
            infoId: response.data.data.infoId,
            sagunNum:
              response.data.data.caseYear +
              ' 타경 ' +
              response.data.data.caseDetail,
            mulNo: response.data.data.mulNo === '' ? '1' : response.data.data.mulNo,
            mulSeq: response.data.data.mulSeq,
            ipchalDate:
              (response.data.data.startYear) + '년 ' +
              (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) + '월 ' +
              (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay) + '일',
            biddingDate: (response.data.data.startYear) +
            (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) +
            (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay),
            sagunAddr: response.data.data.address,
            usage: response.data.data.usage,
            etcAddress: response.data.data.etcAddress,
            roadAddress: response.data.data.roadAddress,
            biddingInfos: response.data.data.biddingInfos,
            idcode: idcode as string,
            courtFullName: response.data.data.courtFullName,
            reqCourtName: response.data.data.reqCourtName,
          })
          setStateNum(1)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
  }

  const handleNextStep = async () => {
    if (biddingInfo.mstSeq === 0) {
      await handleCheck()
    } else {
      setStateNum(1)
    }
  }

  const deviceHeight: number = typeof window !== 'undefined' ? window.screen.height! : 0
  console.log(deviceHeight)
  return (
    <>
      <div className={`flex w-[100%] justify-center md:h-screen h-[90vh] bg-white relative`} >
        <div className={`flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center gap-[10px]`}>
          <div className="flex md:pt-[100px] pt-[50px]">
            <span className="md:text-[2rem] text-[1.6rem] font-extrabold font-NanumGothic not-italic md:py-[0px] py-[25px]">
              입찰표 작성을 시작합니다
            </span>
          </div>
          {/* <div className="flex">
            <span className="text-[1rem] text-mygray font-bold font-NanumGothic not-italic">
              질문에 답변해 주세요.
            </span>
          </div> */}
          <div className="flex sm:w-[50%] w-[100%] justify-center pt-[30px]">
            <Image
              priority
              src={'/visualImg_big.png'}
              alt="MainImg"
              width={350}
              height={350}
              style={{
                height: 'auto',
                width: 'auto',
              }}
            />
          </div>
          <div
            className="flex bg-mygold w-[180px] h-[46px] rounded-md items-center justify-center cursor-pointer mt-[30px]"
            onClick={async () => {
              await handleNextStep()
            }}
          >
            <span className="text-white md:text-[1.2rem] text-[1rem] font-NanumGothic font-extrabold not-italic leading-4">
              시작하기
            </span>
          </div>
          <div className="flex flex-col w-[80%] justify-center pt-[50px]">
            <span className="md:text-[0.9rem] text-[0.8rem] font-NanumGothic text-mygray font-normal">
              ※ 입찰표의 주민등록번호는 저장하지 않습니다
            </span>
            <span className="md:text-[0.9rem] text-[0.8rem] font-NanumGothic text-mygray font-normal">
              다음 번 입찰표 작성 시, 개인정보를 다시 입력해주셔야합니다.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
