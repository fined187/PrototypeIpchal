'use client'
import { biddingInfoState, stepState } from '@/atom'
import axios from 'axios'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function StartIpchal() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { userId } = router.query
  const [biddingStatus, setBiddingStatus] = useState(false)

  useEffect(() => {
    const { idcode } = router.query
    const handleGetBiddingStatus = async (idCode: string) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}case-status`,
          {
            idCode: idCode,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (response.status === 200) {
          setBiddingStatus(response.data.data.isBiddingStatus)
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error)
      }
    } 
    if (idcode) {
      handleGetBiddingStatus(idcode as string)
    } else {
      setBiddingStatus(true)
    }
  }, [router.query.idcode])

  const handleStart = async () => {
    setLoading(true)
    if (!biddingStatus) {
      alert('입찰기일이 지났거나 현재 입찰 중인 사건이 아닙니다.')
    } else {
      if (userId && biddingInfo.idcode !== "") {
        setBiddingInfo({
          ...biddingInfo,
          aesUserId: userId as string
        })
        setStateNum(2)
        setLoading(false)
      } else if (userId && biddingInfo.idcode === "") {
        setBiddingInfo({
          ...biddingInfo,
          aesUserId: userId as string
        })
        setStateNum(stateNum + 1)
        setBiddingInfo({
          ...biddingInfo,
          searchResultState: 1,
        })
        setLoading(false)
      } else if (!userId && biddingInfo.idcode !== "") {
        setStateNum(2)
        setLoading(false)
      } else {
        setStateNum(stateNum + 1)
        setBiddingInfo({
          ...biddingInfo,
          searchResultState: 1,
        })
        setLoading(false)
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

  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])

  return (
    <>
      <div id='box' className={`flex w-[100%] justify-center bg-white relative`} >
        <div className={`flex flex-col w-[100%] h-[100%] bg-mybg items-center text-center gap-[10px]`}>
          <div className="flex md:pt-[100px] pt-[50px]">
            <span className="md:text-[2rem] text-[1.6rem] font-extrabold font-NanumGothic not-italic md:py-[0px] py-[25px]">
              입찰표 작성을 시작합니다
            </span>
          </div>
          <div className="flex">
            <span className="text-[1rem] text-mygray font-bold font-NanumGothic not-italic">
              질문에 답변해 주세요.
            </span>
          </div>
          <div className="flex sm:w-[50%] w-[100%] justify-center pt-[30px]">
            <Image
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
            onClick={handleStart}
          >
            <span className="text-white md:text-[1.2rem] text-[1rem] font-NanumGothic font-extrabold not-italic leading-4">
              시작하기
            </span>
          </div>
          <div className="flex flex-col w-[80%] justify-center pt-[50px]">
            <span className="md:text-[0.9rem] text-[0.8rem] font-NanumGothic text-mygray font-normal">
              ※ 입찰표의 주민등록번호는 저장하지 않습니다.
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
