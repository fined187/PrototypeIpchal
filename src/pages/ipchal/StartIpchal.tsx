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
  const [biddingStatus, setBiddingStatus] = useState(false)
  
  useEffect(() => {
    const { userId } = router.query
    const { idcode } = router.query
    if (userId) {
      setBiddingInfo({
        ...biddingInfo,
        aesUserId: userId as string,
      })
    }
    const handleGetBiddingStatus = async (idCode: string) => {
      if (idcode) {
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
            setBiddingInfo({
              ...biddingInfo,
              idcode: idCode,
            })
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        setBiddingStatus(true)
      }
    } 
    handleGetBiddingStatus(idcode as string)
  }, [router.query.idcode, router.query.userId])
  
  const handleStart = async () => {
    setLoading(true)
    if (!biddingStatus) {
      alert('입찰기일이 지났거나 현재 입찰 중인 사건이 아닙니다.')
    } else {
      if (biddingInfo.idcode !== "") {
        setStateNum(2)
        setLoading(false)
      } else if (biddingInfo.idcode === "") {
        setStateNum(stateNum + 1)
        setBiddingInfo({
          ...biddingInfo,
          searchResultState: 1,
        })
        setLoading(false)
      } else if (biddingInfo.idcode !== "") {
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

  return (
    <>
      <div className="flex w-[100%] h-[100%] justify-center bg-mybg relative" >
        <div className={`flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center gap-[10px]`}>
          <div className='flex pt-[50px]'>
            <img
              src={'/images/TopLogo.png'}
              alt="logo"
              width={60}
              height={52.5}
            />
          </div>
          <div className="flex">
            <span className="md:text-[40px] text-[28px] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic" style={{
              color: '#181826'
            }}>
              입찰표 작성을 시작합니다
            </span>
          </div>
          <div className="flex">
            <span className="text-[18px] leading-[135%] tracking-[-1%] text-sutTitle font-normal font-['suit'] not-italic">
              누구나 쉽게 써보는 경매 입찰표
            </span>
          </div>
          <div className='flex mt-[30px]'>
            <img 
              src="/images/MainLogo.png"
              alt="logo"
              width={310}
              height={230}
            />
          </div>
          <div
            className="flex flex-col bg-myBlue w-[180px] h-[46px] rounded-full items-center justify-center cursor-pointer md:mt-[70px] mt-[20px]"
            onClick={handleStart}
          >
            <span className="text-white md:text-[20px] text-[18px] font-['suit'] leading-[135%] tracking-[-2%] font-bold not-italic">
              입찰표 작성하기
            </span>
          </div>
          <div className="flex flex-col justify-center mt-[20px]">
            <span className="md:text-[15px] text-[14px] leading-[135%] tracking-[-1%] font-['suit'] text-mygray font-medium text-center">
              입력하신 주민등록번호 등 개인정보는 저장되지 않으며,
            </span>
            <span className="md:text-[15px] text-[14px] leading-[135%] tracking-[-1%] font-['suit'] text-mygray font-medium text-center">
              새로운 입찰표 작성 시 재입력하셔야 합니다.
            </span>
          </div>
          <div className='flex justify-center items-center mt-[20px]'>
            <span className="font-['suit'] md:text-[15px] text-[14px] font-normal leading-[135%] tracking-[-1%] text-sutTitle">
              (주)지지옥션
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
