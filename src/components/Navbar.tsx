import { biddingInfoState, stepState } from '@/atom'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'


export default function Navbar() {
  const [statusBar, setStatusBar] = useState<number>(0)
  const [menuTitle, setMenuTitle] = useState<string>('')
  const stepStateNum = useRecoilValue(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)
  const updateMenuTitle = () => {
    if (stepStateNum === 0) {
      setMenuTitle('')
    } else if (stepStateNum === 1) {
      setMenuTitle('사건번호 입찰일자 확인')
    } else if (stepStateNum === 2 && biddingForm.biddingInfos.length > 1) {
      setMenuTitle('경매 시간 선택')
    } else if (stepStateNum === 2 && biddingForm.biddingInfos.length === 1) {
      setMenuTitle('사건 정보 확인')
    } else if (stepStateNum === 3) {
      setMenuTitle('대리인 확인')
    } else if (stepStateNum === 4 && biddingForm.bidder === 'agent') {
      setMenuTitle('대리인 정보 입력')
    } else if (stepStateNum === 5) {
      setMenuTitle('입찰자 수')
    } else if (stepStateNum === 6 && biddingForm.bidder === 'agent') {
      setMenuTitle('입찰자 대리인 정보')
    } else if (stepStateNum === 6 && biddingForm.bidder === 'self') {
      setMenuTitle('입찰자 정보 입력')
    } else if (stepStateNum === 7 && biddingForm.bidderNum > 1) {
      setMenuTitle('공동 입찰자 지분')
    } else if (stepStateNum === 8) {
      setMenuTitle('입찰 가격')
    } else if (stepStateNum === 9) {
      setMenuTitle('보증금 제공 방법')
    } else if (stepStateNum === 10) {
      setMenuTitle('입찰표 입력 완료')
    } else if (stepStateNum === 11) {
      setMenuTitle('입찰표 확인')
    } else if (stepStateNum === 12) {
      setMenuTitle('파일 만들기')
    } else if (stepStateNum === 13) {
      setMenuTitle('입찰표 파일 공유')
    } else if (stepStateNum === 14) {
      setMenuTitle('입찰표 작성 완료')
    } else if (stepStateNum === 15) {
      setMenuTitle('입찰자 정보 입력')
    } else if (stepStateNum === 16) {
      setMenuTitle('대리인 정보 입력')
    } else if (stepStateNum === 17) {
      setMenuTitle('입찰시 준비 서류')
    } else if (stepStateNum === 18) {
      setMenuTitle('대리 입찰인 선택')
    }
  }

  const handleProgressBar = () => {
    if (stepStateNum === 0) {
      setStatusBar(0)
    } else if ((stepStateNum >= 1 && stepStateNum <= 3)) {
      setStatusBar(10)
    } else if ((stepStateNum >= 4 && stepStateNum <= 6) || stepStateNum === 18 || (stepStateNum >= 15 && stepStateNum <= 16)) {
      setStatusBar(30)
    } else if ((stepStateNum >= 7 && stepStateNum <= 9)) {
      setStatusBar(50)
    } else if ((stepStateNum >= 10 && stepStateNum <= 12)) {
      setStatusBar(70)
    } else if ((stepStateNum >= 13 && stepStateNum <= 14)) {
      setStatusBar(90)
    } else if ((stepStateNum === 17)) {
      setStatusBar(100)
    }
  }

  useEffect(() => {
    updateMenuTitle()
    handleProgressBar()
  }, [stepStateNum])

  return (
    <div className="flex justify-between absolute w-[100%] md:w-[50%] md:h-[100px] h-[50px] left-[50%] bg-mybg mx-auto" style={{
      transform: 'translateX(-50%)',
      zIndex: 10,
    }}>
      <div className="flex rounded-lg w-[30%] h-[20px] justify-start relative md:top-[20px] top-[10px] left-[10px] md:ml-5">
        <div className="w-full z-1 bg-gray-300 h-[100%] rounded-full relative top-0">
          <div className={`${stepStateNum === 0 ? 'w-[0%]' : `w-[${statusBar}%]`} z-2 h-full justify-center items-center text-center text-xs text-white bg-myyellow rounded-full relative top-[0px] transition-all animate-pulse`}>
          </div>
        </div>
      </div>
      {stepStateNum === 0 ? (
        <div className="flex flex-row-reverse mr-5 relative top-[10px] ">
          <div className="flex w-30 h-10">
            <Image
              src={'/toplogo_red.png'}
              alt="logo"
              width={100}
              height={100}
              style={{
                width: 'auto',
                height: 'auto',
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-row-reverse justify-start w-[50%] relative top-[10px] mr-2">
          <div className="flex relative ml-1">
            <div className='flex'>
              <svg
                width="20"
                height="20"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="5.09865"
                  cy="5.23146"
                  r="3.84084"
                  stroke="#C39A28"
                />
              </svg>
            </div>
            <div className="flex absolute top-0 left-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.08879 1.26965C8.49937 2.0671 5.06283 5.89755 3.74544 7.69235L0.55957 3.03791"
                  stroke="#C39A28"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className='flex mt-1'>
            <span className="text-mygold text-sm font-extrabold font-nanumGothic leading-3 not-italic">
              {menuTitle}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
