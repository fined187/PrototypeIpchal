import { biddingInfoState, stepState } from '@/atom'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function Navbar() {
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
      setMenuTitle('대리인 확인')
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
      setMenuTitle('입찰표 정보 입력')
    } else if (stepStateNum === 16) {
      setMenuTitle('대리인 정보 입력')
    } else if (stepStateNum === 17) {
      setMenuTitle('입찰시 준비 서류')
    } else if (stepStateNum === 18) {
      setMenuTitle('대리 입찰인 선택')
    }
  }

  useEffect(() => {
    updateMenuTitle()
  }, [stepStateNum])

  return (
    <div className={`flex relative w-[100%] md:w-[50%] md:h-[100px] h-[10%] bg-mybg justify-center items-center mx-auto`}>
      {stepStateNum === 0 ? (
        <div className="flex flex-row-reverse relative w-[100%] mr-5">
          <div className="flex">
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
        <>
          <div className="nav__bar-title">
            <div className="flex relative mr-5 mt-5">
              <div>
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
            <span className="text-mygold text-sm font-extrabold font-nanumGothic mt-6 leading-3 not-italic">
              {menuTitle}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
